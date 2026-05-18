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
  getModuleStatus: (
    courseId: string,
    moduleId: string,
  ) => 'not-started' | 'in-progress' | 'completed'
  completeModule: (courseId: string, moduleId: string, score?: number) => void
  startModule: (courseId: string, moduleId: string) => void
  getCourseProgress: (courseId: string) => CourseProgressSummary
  getNextModule: (courseId: string) => string | null
  resetProgress: () => void
}

const ProgressContext = createContext<ProgressContextValue | undefined>(
  undefined,
)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { courses } = useCourses()
  const userId = user?.id ?? ''

  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({})

  // Load all progress from Supabase when user changes
  useEffect(() => {
    if (!userId) {
      setProgress({})
      return
    }

    supabase
      .from('module_progress')
      .select('*')
      .eq('user_id', userId)
      .then(({ data }) => {
        if (!data) {
          setProgress({})
          return
        }
        const map: Record<string, ModuleProgress> = {}
        for (const row of data) {
          const key = `${row.course_id}/${row.module_id}`
          map[key] = {
            moduleId: row.module_id,
            courseId: row.course_id,
            status: row.status as ModuleProgress['status'],
            score: row.score ?? undefined,
            completedAt: row.completed_at ?? undefined,
          }
        }
        setProgress(map)
      })
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
    (courseId: string, moduleId: string, score?: number) => {
      const key = `${courseId}/${moduleId}`
      const now = new Date().toISOString()

      // Optimistic update
      setProgress((prev) => ({
        ...prev,
        [key]: {
          moduleId,
          courseId,
          status: 'completed',
          score,
          completedAt: now,
        },
      }))

      // Persist to Supabase
      if (userId) {
        supabase
          .from('module_progress')
          .upsert(
            {
              user_id: userId,
              course_id: courseId,
              module_id: moduleId,
              status: 'completed',
              score: score ?? null,
              started_at: now,
              completed_at: now,
            },
            { onConflict: 'user_id,course_id,module_id' },
          )
          .then(({ error }) => {
            if (error) console.error('Failed to save progress:', error.message)
          })
      }
    },
    [userId],
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
            { onConflict: 'user_id,course_id,module_id' },
          )
          .then(({ error }) => {
            if (error) console.error('Failed to save progress:', error.message)
          })
      }
    },
    [userId, progress],
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
        getModuleStatus,
        completeModule,
        startModule,
        getCourseProgress,
        getNextModule,
        resetProgress,
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
