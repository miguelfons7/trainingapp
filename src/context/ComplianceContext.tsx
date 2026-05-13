import {
  createContext,
  useContext,
  useState,
  useCallback,

  type ReactNode,
} from 'react'
import type { ComplianceItem } from '../types'
import { complianceItems as initialItems } from '../data/compliance'
import { useAuth } from './AuthContext'

interface ComplianceContextValue {
  items: ComplianceItem[]
  pendingItems: ComplianceItem[]
  acknowledgeItem: (itemId: string) => void
  isAcknowledged: (itemId: string) => boolean
}

const ComplianceContext = createContext<ComplianceContextValue | undefined>(
  undefined,
)

const STORAGE_KEY = 'via-academy-compliance'

function loadStoredItems(): ComplianceItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as ComplianceItem[]) : []
  } catch {
    return []
  }
}

function mergeWithStored(base: ComplianceItem[]): ComplianceItem[] {
  const stored = loadStoredItems()
  const storedMap = new Map(stored.map((item) => [item.id, item]))

  return base.map((item) => {
    const saved = storedMap.get(item.id)
    if (saved) {
      return { ...item, acknowledgedBy: saved.acknowledgedBy }
    }
    return item
  })
}

export function ComplianceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  const [items, setItems] = useState<ComplianceItem[]>(() =>
    mergeWithStored(initialItems),
  )

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
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        return next
      })
    },
    [userEmail],
  )

  return (
    <ComplianceContext.Provider
      value={{ items, pendingItems, acknowledgeItem, isAcknowledged }}
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
