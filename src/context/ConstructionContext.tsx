import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

// ── Types ────────────────────────────────────────────────
export type ConstructionEntityType = 'course' | 'module' | 'program'

export interface ConstructionOverride {
  id: string
  entityType: ConstructionEntityType
  entityId: string
  parentId: string | null
  isActive: boolean
  message: string
  updatedBy: string | null
  updatedAt: string
  createdAt: string
}

interface ConstructionContextValue {
  overrides: ConstructionOverride[]
  loading: boolean

  /** Check if an entity is currently under construction */
  isUnderConstruction: (entityType: ConstructionEntityType, entityId: string) => boolean

  /** Get the custom message for an entity under construction (null if not) */
  getConstructionMessage: (entityType: ConstructionEntityType, entityId: string) => string | null

  /** Set or update construction status for an entity */
  setConstruction: (
    entityType: ConstructionEntityType,
    entityId: string,
    parentId: string | null,
    isActive: boolean,
    message?: string,
  ) => Promise<void>

  /** Remove a construction override entirely */
  removeOverride: (entityType: ConstructionEntityType, entityId: string) => Promise<void>

  /** Refresh from DB */
  refresh: () => Promise<void>
}

// ── Context ──────────────────────────────────────────────
const ConstructionContext = createContext<ConstructionContextValue | null>(null)

export function useConstruction() {
  const ctx = useContext(ConstructionContext)
  if (!ctx) throw new Error('useConstruction must be used within ConstructionProvider')
  return ctx
}

// ── Provider ─────────────────────────────────────────────
export function ConstructionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [overrides, setOverrides] = useState<ConstructionOverride[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from('construction_overrides')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setOverrides(
        data.map((row) => ({
          id: row.id,
          entityType: row.entity_type as ConstructionEntityType,
          entityId: row.entity_id,
          parentId: row.parent_id,
          isActive: row.is_active,
          message: row.message,
          updatedBy: row.updated_by,
          updatedAt: row.updated_at,
          createdAt: row.created_at,
        })),
      )
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (user) {
      load()
    } else {
      setOverrides([])
      setLoading(false)
    }
  }, [user, load])

  const isUnderConstruction = useCallback(
    (entityType: ConstructionEntityType, entityId: string): boolean => {
      return overrides.some(
        (o) => o.entityType === entityType && o.entityId === entityId && o.isActive,
      )
    },
    [overrides],
  )

  const getConstructionMessage = useCallback(
    (entityType: ConstructionEntityType, entityId: string): string | null => {
      const override = overrides.find(
        (o) => o.entityType === entityType && o.entityId === entityId && o.isActive,
      )
      return override?.message || null
    },
    [overrides],
  )

  const setConstruction = useCallback(
    async (
      entityType: ConstructionEntityType,
      entityId: string,
      parentId: string | null,
      isActive: boolean,
      message?: string,
    ) => {
      if (!user) return

      // Optimistic update
      setOverrides((prev) => {
        const existing = prev.find(
          (o) => o.entityType === entityType && o.entityId === entityId,
        )
        if (existing) {
          return prev.map((o) =>
            o.id === existing.id
              ? { ...o, isActive, message: message ?? o.message, updatedAt: new Date().toISOString() }
              : o,
          )
        }
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            entityType,
            entityId,
            parentId,
            isActive,
            message: message ?? '',
            updatedBy: user.id,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          },
        ]
      })

      // Upsert in DB
      const { error } = await supabase
        .from('construction_overrides')
        .upsert(
          {
            entity_type: entityType,
            entity_id: entityId,
            parent_id: parentId,
            is_active: isActive,
            message: message ?? '',
            updated_by: user.id,
          },
          { onConflict: 'entity_type,entity_id' },
        )

      if (error) {
        // Rollback on error
        await load()
      }
    },
    [user, load],
  )

  const removeOverride = useCallback(
    async (entityType: ConstructionEntityType, entityId: string) => {
      if (!user) return

      // Optimistic
      setOverrides((prev) =>
        prev.filter((o) => !(o.entityType === entityType && o.entityId === entityId)),
      )

      const { error } = await supabase
        .from('construction_overrides')
        .delete()
        .eq('entity_type', entityType)
        .eq('entity_id', entityId)

      if (error) {
        await load()
      }
    },
    [user, load],
  )

  return (
    <ConstructionContext.Provider
      value={{
        overrides,
        loading,
        isUnderConstruction,
        getConstructionMessage,
        setConstruction,
        removeOverride,
        refresh: load,
      }}
    >
      {children}
    </ConstructionContext.Provider>
  )
}
