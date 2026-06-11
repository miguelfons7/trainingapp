import { useState, useEffect, useCallback, useMemo } from 'react'
import { ArrowUpDown, Loader2, ExternalLink, Search, X, Flame } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from '../shared/ProgressBar'
import { supabase } from '../../lib/supabase'
import { useCourses } from '../../context/CoursesContext'
import { formatDuration, sumTimeSeconds } from '../../lib/formatTime'
import type { Profile } from '../../types/database'

interface UserWithProgress {
  id: string
  name: string
  email: string
  initials: string
  overallProgress: number
  totalTime: number
  weekTime: number
  currentCourse: string
  quizAttempts: number
  failedAttempts: number
  streak: number
  lastActive: string
  status: 'active' | 'stalled' | 'inactive' | 'not-started'
}

type SortKey = 'name' | 'email' | 'overallProgress' | 'totalTime' | 'weekTime' | 'currentCourse' | 'quizAttempts' | 'streak' | 'lastActive' | 'status'
type SortDir = 'asc' | 'desc'

const statusStyles: Record<string, string> = {
  active: 'bg-via-success/15 text-via-success',
  stalled: 'bg-amber-100 text-amber-700',
  inactive: 'bg-via-border text-via-text-light',
  'not-started': 'bg-via-warning/15 text-via-warning',
}

/** Consecutive-day streak ending today or yesterday, from activity timestamps */
function computeStreak(timestamps: string[]): number {
  if (timestamps.length === 0) return 0
  const days = new Set(timestamps.map((t) => new Date(t).toDateString()))
  let streak = 0
  const cursor = new Date()
  // A streak is alive if there's activity today OR yesterday
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

function formatDate(iso: string | null): string {
  if (!iso) return 'Never'
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function UserProgressTable() {
  const { courses } = useCourses()
  const availableCourses = courses.filter((c) => c.status === 'available')
  const totalModules = availableCourses.reduce((sum, c) => sum + c.modules.length, 0)
  const navigate = useNavigate()
  const [users, setUsers] = useState<UserWithProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [search, setSearch] = useState('')

  const loadData = useCallback(async () => {
    const [profilesRes, progressRes, activityRes] = await Promise.all([
      supabase.from('profiles').select('*'),
      supabase.from('module_progress').select('*'),
      supabase.from('learning_activity').select('user_id, event, score, created_at'),
    ])

    const profiles = profilesRes.data ?? []
    const allProgress = progressRes.data ?? []
    const allActivity = activityRes.data ?? []

    const now = Date.now()
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
    const fiveDaysAgo = now - 5 * 24 * 60 * 60 * 1000

    const result: UserWithProgress[] = profiles.map((p: Profile) => {
      const userProgress = allProgress.filter((r) => r.user_id === p.id)
      const userActivity = allActivity.filter((r) => r.user_id === p.id)
      const completedModules = userProgress.filter((r) => r.status === 'completed')

      // Overall progress: completed modules / total available modules
      const overallProgress = totalModules > 0
        ? Math.round((completedModules.length / totalModules) * 100)
        : 0

      // Total time spent across all modules
      const totalTime = sumTimeSeconds(userProgress.map((r) => r.time_spent_seconds))

      // Time this week: modules completed within the last 7 days
      const weekTime = sumTimeSeconds(
        userProgress
          .filter((r) => r.completed_at && new Date(r.completed_at).getTime() >= sevenDaysAgo)
          .map((r) => r.time_spent_seconds),
      )

      // Quiz attempts (incl. failures, which module_progress can't show)
      const attempts = userActivity.filter((a) => a.event === 'quiz_attempted')
      const quizAttempts = attempts.length
      const failedAttempts = attempts.filter((a) => (a.score ?? 0) < 85).length

      // Learning streak from activity events
      const streak = computeStreak(userActivity.map((a) => a.created_at))

      // Current course: first available course that's not 100% complete
      let currentCourse = 'All Complete'
      for (const course of availableCourses) {
        const courseCompleted = course.modules.filter((m) =>
          completedModules.some((r) => r.course_id === course.id && r.module_id === m.id),
        ).length
        if (courseCompleted < course.modules.length) {
          currentCourse = course.title
          break
        }
      }

      // Last active: most recent of progress rows and activity events
      const lastProgressDate = userProgress.length > 0
        ? userProgress.reduce((latest, r) => {
            const d = r.completed_at || r.started_at || r.updated_at
            return d && d > latest ? d : latest
          }, '')
        : null
      const lastActivityDate = userActivity.length > 0
        ? userActivity.reduce((latest, a) => (a.created_at > latest ? a.created_at : latest), '')
        : null
      const lastActive =
        [lastProgressDate, lastActivityDate].filter(Boolean).sort().pop() || p.created_at

      // Status — "stalled" = started the program but no activity in 5+ days
      let status: UserWithProgress['status'] = 'not-started'
      if (userProgress.length > 0) {
        const lastDate = new Date(lastActive).getTime()
        if (overallProgress > 0 && overallProgress < 100 && lastDate < fiveDaysAgo) {
          status = 'stalled'
        } else {
          status = lastDate >= sevenDaysAgo ? 'active' : 'inactive'
        }
      }

      const initials = p.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

      return {
        id: p.id,
        name: p.full_name,
        email: p.email,
        initials,
        overallProgress,
        totalTime,
        weekTime,
        currentCourse,
        quizAttempts,
        failedAttempts,
        streak,
        lastActive,
        status,
      }
    })

    setUsers(result)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return users
    const q = search.toLowerCase()
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    )
  }, [users, search])

  const sorted = [...filtered].sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1
    const av = a[sortKey]
    const bv = b[sortKey]
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * mul
    return String(av).localeCompare(String(bv)) * mul
  })

  const columns: { key: SortKey; label: string; className?: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'overallProgress', label: 'Progress' },
    { key: 'currentCourse', label: 'Current Course', className: 'hidden md:table-cell' },
    { key: 'weekTime', label: 'This Week', className: 'hidden lg:table-cell' },
    { key: 'totalTime', label: 'Total Time', className: 'hidden md:table-cell' },
    { key: 'quizAttempts', label: 'Quiz Tries', className: 'hidden lg:table-cell' },
    { key: 'streak', label: 'Streak', className: 'hidden lg:table-cell' },
    { key: 'lastActive', label: 'Last Active', className: 'hidden md:table-cell' },
    { key: 'status', label: 'Status' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-via-navy animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-via-text-light" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-10 pr-9 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-via-text-light hover:text-via-text cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
      <div className="px-4 py-3 border-b border-via-border">
        <p className="text-sm font-semibold text-via-navy">
          {filtered.length === users.length
            ? `${users.length} user${users.length !== 1 ? 's' : ''}`
            : `${filtered.length} of ${users.length} users`}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-via-border bg-via-bg-subtle">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left font-semibold text-via-navy cursor-pointer select-none whitespace-nowrap ${col.className ?? ''}`}
                  onClick={() => handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown className={`w-3.5 h-3.5 ${sortKey === col.key ? 'text-via-orange' : 'text-via-text-light'}`} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((user, idx) => (
              <tr
                key={user.id}
                className={`border-b border-via-border last:border-b-0 cursor-pointer hover:bg-via-bg-subtle ${idx % 2 === 1 ? 'bg-via-bg-subtle/50' : ''}`}
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                <td className="px-4 py-3 font-medium text-via-navy whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-via-navy text-white text-xs flex items-center justify-center font-semibold">
                      {user.initials}
                    </span>
                    <span>{user.name}</span>
                    <ExternalLink className="w-3 h-3 text-via-text-light" />
                  </div>
                </td>
                <td className="px-4 py-3 w-40">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 min-w-[80px]">
                      <ProgressBar
                        value={user.overallProgress}
                        size="sm"
                        color={user.overallProgress === 100 ? 'success' : 'orange'}
                      />
                    </div>
                    <span className="text-xs font-semibold text-via-text tabular-nums w-8 text-right">
                      {user.overallProgress}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-via-text hidden md:table-cell whitespace-nowrap">
                  {user.currentCourse}
                </td>
                <td className="px-4 py-3 text-via-text hidden lg:table-cell whitespace-nowrap">
                  {user.weekTime > 0 ? formatDuration(user.weekTime) : '—'}
                </td>
                <td className="px-4 py-3 text-via-text hidden md:table-cell whitespace-nowrap">
                  {formatDuration(user.totalTime)}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell whitespace-nowrap">
                  {user.quizAttempts > 0 ? (
                    <span className="text-via-text">
                      {user.quizAttempts}
                      {user.failedAttempts > 0 && (
                        <span className="text-amber-600 text-xs ml-1">
                          ({user.failedAttempts} failed)
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="text-via-text-light">—</span>
                  )}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell whitespace-nowrap">
                  {user.streak > 0 ? (
                    <span className="inline-flex items-center gap-1 text-via-text font-medium">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      {user.streak}d
                    </span>
                  ) : (
                    <span className="text-via-text-light">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-via-text-light hidden md:table-cell whitespace-nowrap">
                  {formatDate(user.lastActive)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyles[user.status] ?? ''}`}
                  >
                    {user.status === 'not-started' ? 'New' : user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}
