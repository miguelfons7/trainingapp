import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

/** Consecutive-day streak ending today or yesterday, from activity timestamps */
function computeStreak(timestamps: string[]): number {
  if (timestamps.length === 0) return 0
  const days = new Set(timestamps.map((t) => new Date(t).toDateString()))
  let streak = 0
  const cursor = new Date()
  if (!days.has(cursor.toDateString())) {
    cursor.setDate(cursor.getDate() - 1)
    if (!days.has(cursor.toDateString())) return 0
  }
  while (days.has(cursor.toDateString())) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

/** The current user's learning streak (consecutive days with activity) */
export function useLearningStreak(): number {
  const { user } = useAuth()
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    if (!user?.id) {
      setStreak(0)
      return
    }
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
    supabase
      .from('learning_activity')
      .select('created_at')
      .eq('user_id', user.id)
      .gte('created_at', ninetyDaysAgo)
      .then(({ data, error }) => {
        if (error) {
          console.error('Failed to load streak:', error.message)
          return
        }
        setStreak(computeStreak((data ?? []).map((r) => r.created_at)))
      })
  }, [user?.id])

  return streak
}
