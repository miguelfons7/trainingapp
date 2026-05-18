import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import type { ComplianceItem, ComplianceStatus } from '../types'
import { useAuth } from './AuthContext'
import { supabase } from '../lib/supabase'

interface ComplianceContextValue {
  items: ComplianceItem[]
  pendingItems: ComplianceItem[]
  acknowledgeItem: (itemId: string) => void
  isAcknowledged: (itemId: string) => boolean
  /** Admin only: create a new announcement */
  createItem: (item: Omit<ComplianceItem, 'id' | 'acknowledgedBy' | 'createdAt' | 'updatedAt' | 'updatedBy'>) => void
  /** Admin only: update an existing announcement */
  updateItem: (itemId: string, updates: Partial<Pick<ComplianceItem, 'title' | 'description' | 'details' | 'priority' | 'requiredBy' | 'status' | 'scheduledAt' | 'departments'>>) => void
  /** Admin only: delete a custom announcement (seed items cannot be deleted) */
  deleteItem: (itemId: string) => void
  /** Returns true if the item was created by an admin (not a seed item) */
  isCustomItem: (itemId: string) => boolean
  /** Log an action to the audit trail */
  logAudit: (action: string, entityType: string, entityId: string, entityTitle?: string, details?: Record<string, unknown>) => void
}

const ComplianceContext = createContext<ComplianceContextValue | undefined>(
  undefined,
)

export function ComplianceProvider({ children }: { children: ReactNode }) {
  const { user, isAdmin } = useAuth()
  const [items, setItems] = useState<ComplianceItem[]>([])
  const [seedIds, setSeedIds] = useState<Set<string>>(new Set())

  const userId = user?.id ?? ''

  // Fetch all compliance items + acknowledgements from Supabase
  useEffect(() => {
    if (!user) return

    async function load() {
      // Fetch items — RLS filters: users see only 'live', admins see all
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

      // Resolve creator and updater names for non-seed items
      const personIds = new Set<string>()
      for (const r of itemRows) {
        if (r.created_by && !r.is_seed) personIds.add(r.created_by)
        if (r.updated_by) personIds.add(r.updated_by)
      }
      let personMap: Record<string, string> = {}
      if (personIds.size > 0) {
        const { data: people } = await supabase
          .from('profiles')
          .select('id, email')
          .in('id', [...personIds])
        people?.forEach((c) => {
          personMap[c.id] = c.email
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
        createdBy: row.created_by ? personMap[row.created_by] : undefined,
        createdAt: row.created_at,
        status: (row.status || 'live') as ComplianceStatus,
        scheduledAt: row.scheduled_at ?? undefined,
        departments: row.departments ?? [],
        updatedAt: row.updated_at,
        updatedBy: row.updated_by ? personMap[row.updated_by] : undefined,
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

  // For regular users, only show live items as pending
  const pendingItems = items.filter(
    (item) => item.status === 'live' && !item.acknowledgedBy.includes(userId),
  )

  const logAudit = useCallback(
    (action: string, entityType: string, entityId: string, entityTitle?: string, details?: Record<string, unknown>) => {
      if (!userId) return
      supabase
        .from('audit_log')
        .insert({
          actor_id: userId,
          action,
          entity_type: entityType,
          entity_id: entityId,
          entity_title: entityTitle ?? null,
          details: details ?? {},
        })
        .then(() => {
          // Fire and forget — audit failures shouldn't block the UI
        })
    },
    [userId],
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
      itemData: Omit<ComplianceItem, 'id' | 'acknowledgedBy' | 'createdAt' | 'updatedAt' | 'updatedBy'>,
    ) => {
      const newId = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

      // Optimistic update
      const optimistic: ComplianceItem = {
        ...itemData,
        id: newId,
        acknowledgedBy: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
          status: itemData.status || 'live',
          scheduled_at: itemData.scheduledAt ?? null,
          departments: itemData.departments ?? [],
          updated_by: userId || null,
        })
        .then(({ error }) => {
          if (error) {
            // Rollback
            setItems((prev) => prev.filter((i) => i.id !== newId))
          } else {
            logAudit('create', 'announcement', newId, itemData.title, {
              status: itemData.status || 'live',
              priority: itemData.priority,
            })
          }
        })
    },
    [userId, logAudit],
  )

  const updateItem = useCallback(
    (itemId: string, updates: Partial<Pick<ComplianceItem, 'title' | 'description' | 'details' | 'priority' | 'requiredBy' | 'status' | 'scheduledAt' | 'departments'>>) => {
      // Don't allow editing seed items (except status changes like archive)
      const isSeed = seedIds.has(itemId)
      if (isSeed && updates.title) return

      // Capture old item for rollback + audit
      const oldItem = items.find((i) => i.id === itemId)
      if (!oldItem) return

      // Optimistic update
      setItems((prev) =>
        prev.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              ...updates,
              updatedAt: new Date().toISOString(),
              updatedBy: user?.email,
            }
          }
          return item
        }),
      )

      // Build DB update object
      const dbUpdates: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
        updated_by: userId || null,
      }
      if (updates.title !== undefined) dbUpdates.title = updates.title
      if (updates.description !== undefined) dbUpdates.description = updates.description
      if (updates.details !== undefined) dbUpdates.details = updates.details
      if (updates.priority !== undefined) dbUpdates.priority = updates.priority
      if (updates.requiredBy !== undefined) dbUpdates.required_by = updates.requiredBy
      if (updates.status !== undefined) dbUpdates.status = updates.status
      if (updates.scheduledAt !== undefined) dbUpdates.scheduled_at = updates.scheduledAt || null
      if (updates.departments !== undefined) dbUpdates.departments = updates.departments

      // Persist to Supabase
      supabase
        .from('compliance_items')
        .update(dbUpdates)
        .eq('id', itemId)
        .then(({ error }) => {
          if (error) {
            // Rollback to old item
            setItems((prev) =>
              prev.map((item) => (item.id === itemId ? oldItem : item)),
            )
          } else {
            // Log what changed
            const changedFields: Record<string, { old: unknown; new: unknown }> = {}
            if (updates.title !== undefined && updates.title !== oldItem.title)
              changedFields.title = { old: oldItem.title, new: updates.title }
            if (updates.status !== undefined && updates.status !== oldItem.status)
              changedFields.status = { old: oldItem.status, new: updates.status }
            if (updates.priority !== undefined && updates.priority !== oldItem.priority)
              changedFields.priority = { old: oldItem.priority, new: updates.priority }

            const action = updates.status && updates.status !== oldItem.status
              ? 'status_change'
              : 'update'

            logAudit(action, 'announcement', itemId, oldItem.title, { changes: changedFields })
          }
        })
    },
    [seedIds, items, userId, user?.email, logAudit],
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
          } else {
            logAudit('delete', 'announcement', itemId, deletedItem.title)
          }
        })
    },
    [seedIds, items, logAudit],
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
        updateItem,
        deleteItem,
        isCustomItem,
        logAudit,
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
