import { useEffect, useRef, useCallback } from 'react'

const TICK_MS = 5000
const IDLE_THRESHOLD_MS = 60_000 // no activity for 1 min = idle, stop counting

const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart'] as const

function storageKey(userId: string | undefined, courseId: string, moduleId: string) {
  return `active-time:${userId ?? 'anon'}:${courseId}:${moduleId}`
}

/** Read the accumulated active seconds for a module (without mounting the hook) */
export function readActiveSeconds(
  userId: string | undefined,
  courseId: string,
  moduleId: string,
): number {
  try {
    const raw = localStorage.getItem(storageKey(userId, courseId, moduleId))
    const n = raw ? parseInt(raw, 10) : 0
    return Number.isFinite(n) && n >= 0 ? n : 0
  } catch {
    return 0
  }
}

/** Clear a module's accumulated active time (called after completion is saved) */
export function clearActiveSeconds(
  userId: string | undefined,
  courseId: string,
  moduleId: string,
): void {
  try {
    localStorage.removeItem(storageKey(userId, courseId, moduleId))
  } catch {
    // ignore
  }
}

/**
 * Accumulates ACTIVE seconds spent on a module: counts only while the tab is
 * visible AND the user has interacted within the last minute. Persists to
 * localStorage so partial visits add up across sessions. This is what makes
 * time-spent stats honest — an open-but-idle window accrues nothing.
 */
export function useActiveSeconds(
  userId: string | undefined,
  courseId: string | undefined,
  moduleId: string | undefined,
): { getActiveSeconds: () => number } {
  const lastActivityRef = useRef<number>(Date.now())

  useEffect(() => {
    if (!courseId || !moduleId) return

    const markActivity = () => {
      lastActivityRef.current = Date.now()
    }
    for (const evt of ACTIVITY_EVENTS) {
      window.addEventListener(evt, markActivity, { passive: true })
    }

    const interval = setInterval(() => {
      const isVisible = document.visibilityState === 'visible'
      const isActive = Date.now() - lastActivityRef.current < IDLE_THRESHOLD_MS
      if (isVisible && isActive) {
        const key = storageKey(userId, courseId, moduleId)
        const current = readActiveSeconds(userId, courseId, moduleId)
        try {
          localStorage.setItem(key, String(current + TICK_MS / 1000))
        } catch {
          // storage full/unavailable — degrade silently
        }
      }
    }, TICK_MS)

    return () => {
      clearInterval(interval)
      for (const evt of ACTIVITY_EVENTS) {
        window.removeEventListener(evt, markActivity)
      }
    }
  }, [userId, courseId, moduleId])

  const getActiveSeconds = useCallback(
    () => (courseId && moduleId ? readActiveSeconds(userId, courseId, moduleId) : 0),
    [userId, courseId, moduleId],
  )

  return { getActiveSeconds }
}
