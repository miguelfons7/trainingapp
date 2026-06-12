import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import type { ModuleProgress } from '../types'
import { useCourses } from './CoursesContext'
import { useAuth } from './AuthContext'
import { supabase } from '../lib/supabase'

interface CourseProgressSummary {
  completed: number
  total: number
  percentage: number
}

interface ProgressContextValue {
  /** True once the initial progress fetch for the current user has resolved.
   *  Callers must wait for this before writing 'started' so a pre-load empty
   *  map can't cause a completed row to be downgraded. */
  progressLoaded: boolean
  getModuleStatus: (
    courseId: string,
    moduleId: string,
  ) => 'not-started' | 'in-progress' | 'completed'
  completeModule: (
    courseId: string,
    moduleId: string,
    score?: number,
    /** Idle-aware active seconds; when provided, caps the recorded time */
    activeSeconds?: number,
  ) => void
  startModule: (courseId: string, moduleId: string) => void
  getCourseProgress: (courseId: string) => CourseProgressSummary
  getNextModule: (courseId: string) => string | null
  resetProgress: () => void
  /** Record a quiz submission (pass or fail) in the activity log */
  logQuizAttempt: (courseId: string, moduleId: string, score: number) => void
}

const ProgressContext = createContext<ProgressContextValue | undefined>(
  undefined,
)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { courses } = useCourses()
  const userId = user?.id ?? ''

  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({})
  // False until the current user's progress has been fetched at least once.
  // startModule must not run before this — see the load effect and ModuleView.
  const [progressLoaded, setProgressLoaded] = useState(false)

  /** Fire-and-forget activity event for streaks + admin Active Learners view */
  const logActivity = useCallback(
    (
      courseId: string,
      moduleId: string,
      event: 'module_started' | 'module_completed' | 'quiz_attempted',
      score?: number,
    ) => {
      if (!userId) return
      supabase
        .from('learning_activity')
        .insert({
          user_id: userId,
          course_id: courseId,
          module_id: moduleId,
          event,
          score: score ?? null,
        })
        .then(({ error }) => {
          if (error) console.error('Failed to log activity:', error.message)
        })
    },
    [userId],
  )

  const logQuizAttempt = useCallback(
    (courseId: string, moduleId: string, score: number) => {
      logActivity(courseId, moduleId, 'quiz_attempted', score)
    },
    [logActivity],
  )

  // Load all progress from Supabase when user changes.
  // Resilient by design: a transient failure must NOT leave progress empty,
  // because an empty map lets startModule overwrite completed rows back to
  // 'in-progress'. We retry on error and only flip progressLoaded after a
  // successful fetch.
  useEffect(() => {
    if (!userId) {
      setProgress({})
      setProgressLoaded(false)
      return
    }

    let cancelled = false
    setProgressLoaded(false)

    const load = async (attempt: number): Promise<void> => {
      const { data, error } = await supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', userId)

      if (cancelled) return

      if (error) {
        console.error(
          `Failed to load progress (attempt ${attempt}):`,
          error.message,
        )
        // Retry with backoff before giving up; leave existing state untouched.
        if (attempt < 4) {
          setTimeout(() => {
            if (!cancelled) load(attempt + 1)
          }, 1000 * attempt)
        }
        return
      }

      const map: Record<string, ModuleProgress> = {}
      for (const row of data ?? []) {
        const key = `${row.course_id}/${row.module_id}`
        map[key] = {
          moduleId: row.module_id,
          courseId: row.course_id,
          status: row.status as ModuleProgress['status'],
          score: row.score ?? undefined,
          completedAt: row.completed_at ?? undefined,
          startedAt: row.started_at ?? undefined,
          timeSpentSeconds: row.time_spent_seconds ?? undefined,
        }
      }
      setProgress(map)
      setProgressLoaded(true)
    }

    load(1)

    return () => {
      cancelled = true
    }
  }, [userId])

  const getModuleStatus = useCallback(
    (
      courseId: string,
      moduleId: string,
    ): 'not-started' | 'in-progress' | 'completed' => {
      const key = `${courseId}/${moduleId}`
      return progress[key]?.status ?? 'not-started'
    },
    [progress],
  )

  const completeModule = useCallback(
    (courseId: string, moduleId: string, score?: number, activeSeconds?: number) => {
      const key = `${courseId}/${moduleId}`
      const now = new Date().toISOString()
      const existing = progress[key]

      // Re-walking an already-completed lesson must NOT rewrite its record —
      // it would clobber time_spent_seconds and completed_at with revisit data.
      // (A quiz re-pass DOES update: score provided → record the new score,
      // but the original time/completed_at are preserved below.)
      if (existing?.status === 'completed' && score === undefined) {
        return
      }

      // A quiz re-pass: update the score only, preserving the original
      // time_spent_seconds and completed_at
      const isRecompleteWithScore = existing?.status === 'completed'

      // Compute time spent from startedAt → now (cap at 24 hours)
      let timeSpentSeconds: number | undefined
      if (existing?.startedAt) {
        const elapsed = Math.round((Date.now() - new Date(existing.startedAt).getTime()) / 1000)
        timeSpentSeconds = elapsed > 0 && elapsed <= 86400 ? elapsed : undefined
      }
      // Idle-aware override: when active-time tracking provides a value, record
      // the smaller of wall-clock and active time — open-but-idle windows don't count
      if (activeSeconds !== undefined && activeSeconds > 0) {
        timeSpentSeconds =
          timeSpentSeconds !== undefined
            ? Math.min(timeSpentSeconds, Math.round(activeSeconds))
            : Math.round(activeSeconds)
      }

      // Optimistic update
      setProgress((prev) => ({
        ...prev,
        [key]: {
          moduleId,
          courseId,
          status: 'completed',
          score,
          completedAt: isRecompleteWithScore ? existing?.completedAt : now,
          startedAt: existing?.startedAt,
          timeSpentSeconds: isRecompleteWithScore
            ? existing?.timeSpentSeconds
            : timeSpentSeconds,
        },
      }))

      // Persist to Supabase — do NOT include started_at (it would overwrite the real start time)
      if (userId) {
        // On a re-complete, omit completed_at/time_spent_seconds so the upsert
        // leaves the original values untouched
        const payload: {
          user_id: string
          course_id: string
          module_id: string
          status: 'completed'
          score: number | null
          completed_at?: string
          time_spent_seconds?: number | null
        } = {
          user_id: userId,
          course_id: courseId,
          module_id: moduleId,
          status: 'completed',
          score: score ?? null,
        }
        if (!isRecompleteWithScore) {
          payload.completed_at = now
          payload.time_spent_seconds = timeSpentSeconds ?? null
        }
        supabase
          .from('module_progress')
          .upsert(payload, { onConflict: 'user_id,course_id,module_id' })
          .then(({ error }) => {
            if (error) console.error('Failed to save progress:', error.message)
          })

        // Only log a completion event the first time (not on re-completes)
        if (existing?.status !== 'completed') {
          logActivity(courseId, moduleId, 'module_completed', score)
        }
      }
    },
    [userId, progress, logActivity],
  )

  const startModule = useCallback(
    (courseId: string, moduleId: string) => {
      const key = `${courseId}/${moduleId}`

      setProgress((prev) => {
        if (
          prev[key]?.status === 'completed' ||
          prev[key]?.status === 'in-progress'
        )
          return prev
        return {
          ...prev,
          [key]: {
            moduleId,
            courseId,
            status: 'in-progress',
          },
        }
      })

      // Persist to Supabase (only if not already started/completed)
      if (userId) {
        const existing = progress[`${courseId}/${moduleId}`]
        if (existing?.status === 'completed' || existing?.status === 'in-progress')
          return

        // ignoreDuplicates → INSERT ... ON CONFLICT DO NOTHING. Marking a module
        // 'started' must only ever create a first row; it must NEVER overwrite an
        // existing row (a completed one would be downgraded to 'in-progress').
        // This is the load-race guard's last line of defense.
        supabase
          .from('module_progress')
          .upsert(
            {
              user_id: userId,
              course_id: courseId,
              module_id: moduleId,
              status: 'in-progress',
              started_at: new Date().toISOString(),
            },
            { onConflict: 'user_id,course_id,module_id', ignoreDuplicates: true },
          )
          .then(({ error }) => {
            if (error) console.error('Failed to save progress:', error.message)
          })

        logActivity(courseId, moduleId, 'module_started')
      }
    },
    [userId, progress, logActivity],
  )

  const getCourseProgress = useCallback(
    (courseId: string): CourseProgressSummary => {
      const course = courses.find((c) => c.id === courseId)
      if (!course) return { completed: 0, total: 0, percentage: 0 }

      const total = course.modules.length
      const completed = course.modules.filter((m) => {
        const key = `${courseId}/${m.id}`
        return progress[key]?.status === 'completed'
      }).length

      return {
        completed,
        total,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      }
    },
    [progress, courses],
  )

  const getNextModule = useCallback(
    (courseId: string): string | null => {
      const course = courses.find((c) => c.id === courseId)
      if (!course) return null

      const next = course.modules.find((m) => {
        const key = `${courseId}/${m.id}`
        return progress[key]?.status !== 'completed'
      })

      return next?.id ?? null
    },
    [progress, courses],
  )

  const resetProgress = useCallback(() => {
    setProgress({})

    if (userId) {
      supabase
        .from('module_progress')
        .delete()
        .eq('user_id', userId)
        .then(({ error }) => {
          if (error) console.error('Failed to reset progress:', error.message)
        })
    }
  }, [userId])

  return (
    <ProgressContext.Provider
      value={{
        progressLoaded,
        getModuleStatus,
        completeModule,
        startModule,
        getCourseProgress,
        getNextModule,
        resetProgress,
        logQuizAttempt,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return ctx
}
