import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { ComplianceItem } from '../types'
import { complianceItems as seedItems } from '../data/compliance'
import { useAuth } from './AuthContext'

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

/**
 * DEV-ONLY: Compliance data is stored in localStorage.
 *
 * - Seed items come from data/compliance.ts (hardcoded, ship with the app).
 * - Admin-created announcements are stored in CUSTOM_KEY.
 * - Acknowledgements are tracked per-item (acknowledgedBy array stores emails),
 *   which naturally scopes them per-user even on the same browser.
 */
const CUSTOM_KEY = 'via-academy-custom-announcements'
const ACK_KEY = 'via-academy-compliance-acks'

/** Seed item IDs — these cannot be deleted by admins */
const SEED_IDS = new Set(seedItems.map((i) => i.id))

function loadCustomItems(): ComplianceItem[] {
  try {
    const stored = localStorage.getItem(CUSTOM_KEY)
    return stored ? (JSON.parse(stored) as ComplianceItem[]) : []
  } catch {
    return []
  }
}

function saveCustomItems(items: ComplianceItem[]): void {
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(items))
}

function loadAcks(): Record<string, string[]> {
  try {
    const stored = localStorage.getItem(ACK_KEY)
    return stored ? (JSON.parse(stored) as Record<string, string[]>) : {}
  } catch {
    return {}
  }
}

function saveAcks(acks: Record<string, string[]>): void {
  localStorage.setItem(ACK_KEY, JSON.stringify(acks))
}

/** Merge seed items + custom items, applying stored acknowledgements */
function buildItemList(): ComplianceItem[] {
  const custom = loadCustomItems()
  const acks = loadAcks()
  const all = [...seedItems, ...custom]
  return all.map((item) => ({
    ...item,
    acknowledgedBy: acks[item.id] ?? item.acknowledgedBy ?? [],
  }))
}

export function ComplianceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [items, setItems] = useState<ComplianceItem[]>(buildItemList)

  const userEmail = user?.email ?? ''

  const isAcknowledged = useCallback(
    (itemId: string): boolean => {
      const item = items.find((i) => i.id === itemId)
      return item ? item.acknowledgedBy.includes(userEmail) : false
    },
    [items, userEmail],
  )

  const pendingItems = items.filter(
    (item) => !item.acknowledgedBy.includes(userEmail),
  )

  const acknowledgeItem = useCallback(
    (itemId: string) => {
      if (!userEmail) return
      setItems((prev) => {
        const next = prev.map((item) => {
          if (
            item.id === itemId &&
            !item.acknowledgedBy.includes(userEmail)
          ) {
            return {
              ...item,
              acknowledgedBy: [...item.acknowledgedBy, userEmail],
            }
          }
          return item
        })
        // Persist acknowledgements
        const acks: Record<string, string[]> = {}
        next.forEach((item) => {
          if (item.acknowledgedBy.length > 0) {
            acks[item.id] = item.acknowledgedBy
          }
        })
        saveAcks(acks)
        return next
      })
    },
    [userEmail],
  )

  const createItem = useCallback(
    (
      itemData: Omit<ComplianceItem, 'id' | 'acknowledgedBy' | 'createdAt'>,
    ) => {
      const newItem: ComplianceItem = {
        ...itemData,
        id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        acknowledgedBy: [],
        createdAt: new Date().toISOString(),
      }
      // Save to custom items storage
      const customItems = loadCustomItems()
      customItems.push(newItem)
      saveCustomItems(customItems)
      // Update state
      setItems((prev) => [...prev, newItem])
    },
    [],
  )

  const deleteItem = useCallback((itemId: string) => {
    if (SEED_IDS.has(itemId)) return // Cannot delete seed items
    // Remove from custom storage
    const customItems = loadCustomItems().filter((i) => i.id !== itemId)
    saveCustomItems(customItems)
    // Remove acknowledgements for this item
    const acks = loadAcks()
    delete acks[itemId]
    saveAcks(acks)
    // Update state
    setItems((prev) => prev.filter((i) => i.id !== itemId))
  }, [])

  const isCustomItem = useCallback(
    (itemId: string): boolean => !SEED_IDS.has(itemId),
    [],
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
