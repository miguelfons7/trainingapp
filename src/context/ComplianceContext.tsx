import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import type { ComplianceItem } from '../types'
import { useAuth } from './AuthContext'
import { supabase } from '../lib/supabase'

interface ComplianceContextValue {
  items: ComplianceItem[]
  pendingItems: ComplianceItem[]
  acknowledgeItem: (itemId: string) => void
  isAcknowledged: (itemId: string) => boolean
  /** Admin only: create a new announcement visible to all users */
  createItem: (item: Omit<ComplianceItem, 'id' | 'acknowledgedBy' | 'createdAt'>) => void
  /** Admin only: delete a custom announcement (seed items cannot be deleted) */
  deleteItem: (itemId: string) => void
  /** Returns true if the item was created by an admin (not a seed item) */
  isCustomItem: (itemId: string) => boolean
}

const ComplianceContext = createContext<ComplianceContextValue | undefined>(
  undefined,
)

export function ComplianceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [items, setItems] = useState<ComplianceItem[]>([])
  const [seedIds, setSeedIds] = useState<Set<string>>(new Set())

  const userId = user?.id ?? ''

  // Fetch all compliance items + acknowledgements from Supabase
  useEffect(() => {
    if (!user) return

    async function load() {
      // Fetch items
      const { data: itemRows } = await supabase
        .from('compliance_items')
        .select('*')
        .order('created_at', { ascending: false })

      // Fetch all acknowledgements
      const { data: ackRows } = await supabase
        .from('compliance_acknowledgements')
        .select('item_id, user_id')

      if (!itemRows) return

      // Track seed IDs
      const seeds = new Set(itemRows.filter((r) => r.is_seed).map((r) => r.id))
      setSeedIds(seeds)

      // Group acks by item_id
      const acksByItem: Record<string, string[]> = {}
      for (const ack of ackRows ?? []) {
        if (!acksByItem[ack.item_id]) acksByItem[ack.item_id] = []
        acksByItem[ack.item_id].push(ack.user_id)
      }

      // Resolve creator names for non-seed items
      const creatorIds = itemRows
        .filter((r) => r.created_by && !r.is_seed)
        .map((r) => r.created_by!)
      let creatorMap: Record<string, string> = {}
      if (creatorIds.length > 0) {
        const { data: creators } = await supabase
          .from('profiles')
          .select('id, email')
          .in('id', creatorIds)
        creators?.forEach((c) => {
          creatorMap[c.id] = c.email
        })
      }

      // Map to ComplianceItem shape
      const mapped: ComplianceItem[] = itemRows.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        details: row.details,
        requiredBy: row.required_by,
        priority: row.priority as 'high' | 'medium',
        acknowledgedBy: acksByItem[row.id] ?? [],
        createdBy: row.created_by ? creatorMap[row.created_by] : undefined,
        createdAt: row.created_at,
      }))

      setItems(mapped)
    }

    load()
  }, [user])

  const isAcknowledged = useCallback(
    (itemId: string): boolean => {
      const item = items.find((i) => i.id === itemId)
      return item ? item.acknowledgedBy.includes(userId) : false
    },
    [items, userId],
  )

  const pendingItems = items.filter(
    (item) => !item.acknowledgedBy.includes(userId),
  )

  const acknowledgeItem = useCallback(
    (itemId: string) => {
      if (!userId) return

      // Optimistic update
      setItems((prev) =>
        prev.map((item) => {
          if (item.id === itemId && !item.acknowledgedBy.includes(userId)) {
            return { ...item, acknowledgedBy: [...item.acknowledgedBy, userId] }
          }
          return item
        }),
      )

      // Persist to Supabase
      supabase
        .from('compliance_acknowledgements')
        .insert({ item_id: itemId, user_id: userId })
        .then(({ error }) => {
          if (error) {
            // Rollback on error
            setItems((prev) =>
              prev.map((item) => {
                if (item.id === itemId) {
                  return {
                    ...item,
                    acknowledgedBy: item.acknowledgedBy.filter(
                      (id) => id !== userId,
                    ),
                  }
                }
                return item
              }),
            )
          }
        })
    },
    [userId],
  )

  const createItem = useCallback(
    (
      itemData: Omit<ComplianceItem, 'id' | 'acknowledgedBy' | 'createdAt'>,
    ) => {
      const newId = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

      // Optimistic update
      const optimistic: ComplianceItem = {
        ...itemData,
        id: newId,
        acknowledgedBy: [],
        createdAt: new Date().toISOString(),
      }
      setItems((prev) => [optimistic, ...prev])

      // Persist to Supabase
      supabase
        .from('compliance_items')
        .insert({
          id: newId,
          title: itemData.title,
          description: itemData.description,
          details: itemData.details,
          required_by: itemData.requiredBy,
          priority: itemData.priority,
          created_by: userId || null,
          is_seed: false,
        })
        .then(({ error }) => {
          if (error) {
            // Rollback
            setItems((prev) => prev.filter((i) => i.id !== newId))
          }
        })
    },
    [userId],
  )

  const deleteItem = useCallback(
    (itemId: string) => {
      // Don't allow deleting seed items
      if (seedIds.has(itemId)) return

      // Capture for rollback
      const deletedItem = items.find((i) => i.id === itemId)
      if (!deletedItem) return

      // Optimistic removal
      setItems((prev) => prev.filter((i) => i.id !== itemId))

      // Persist to Supabase (CASCADE deletes acknowledgements)
      supabase
        .from('compliance_items')
        .delete()
        .eq('id', itemId)
        .then(({ error }) => {
          if (error) {
            // Rollback
            setItems((prev) => [...prev, deletedItem])
          }
        })
    },
    [seedIds, items],
  )

  const isCustomItem = useCallback(
    (itemId: string): boolean => !seedIds.has(itemId),
    [seedIds],
  )

  return (
    <ComplianceContext.Provider
      value={{
        items,
        pendingItems,
        acknowledgeItem,
        isAcknowledged,
        createItem,
        deleteItem,
        isCustomItem,
      }}
    >
      {children}
    </ComplianceContext.Provider>
  )
}

export function useCompliance(): ComplianceContextValue {
  const ctx = useContext(ComplianceContext)
  if (!ctx) {
    throw new Error('useCompliance must be used within a ComplianceProvider')
  }
  return ctx
}
