import { useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'

const IDLE_LOGOUT_MS = 15 * 60 * 1000 // 15 minutes
const CHECK_INTERVAL_MS = 30_000

const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart'] as const

/**
 * Signs the user out after 15 minutes of inactivity. Keeps abandoned open
 * windows from sitting logged-in forever (and from polluting engagement data).
 * Mounted once in AppShell.
 */
export function useIdleLogout() {
  const { user, logout } = useAuth()
  const lastActivityRef = useRef<number>(Date.now())

  useEffect(() => {
    if (!user) return

    const markActivity = () => {
      lastActivityRef.current = Date.now()
    }
    for (const evt of ACTIVITY_EVENTS) {
      window.addEventListener(evt, markActivity, { passive: true })
    }

    const check = () => {
      if (Date.now() - lastActivityRef.current >= IDLE_LOGOUT_MS) {
        logout()
      }
    }

    const interval = setInterval(check, CHECK_INTERVAL_MS)
    // Waking a tab that's been hidden past the limit logs out immediately
    const onVisibility = () => {
      if (document.visibilityState === 'visible') check()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clearInterval(interval)
      for (const evt of ACTIVITY_EVENTS) {
        window.removeEventListener(evt, markActivity)
      }
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [user, logout])
}
