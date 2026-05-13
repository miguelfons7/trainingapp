import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { ModuleProgress } from '../types'
import { courses } from '../data/courses'

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

const STORAGE_KEY = 'via-academy-progress'

function loadProgress(): Record<string, ModuleProgress> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored
      ? (JSON.parse(stored) as Record<string, ModuleProgress>)
      : {}
  } catch {
    return {}
  }
}

function saveProgress(progress: Record<string, ModuleProgress>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>(
    loadProgress,
  )

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
      setProgress((prev) => {
        const key = `${courseId}/${moduleId}`
        const next: Record<string, ModuleProgress> = {
          ...prev,
          [key]: {
            moduleId,
            courseId,
            status: 'completed',
            score,
            completedAt: new Date().toISOString(),
          },
        }
        saveProgress(next)
        return next
      })
    },
    [],
  )

  const startModule = useCallback(
    (courseId: string, moduleId: string) => {
      setProgress((prev) => {
        const key = `${courseId}/${moduleId}`
        if (prev[key]?.status === 'completed' || prev[key]?.status === 'in-progress') return prev
        const next: Record<string, ModuleProgress> = {
          ...prev,
          [key]: {
            moduleId,
            courseId,
            status: 'in-progress',
          },
        }
        saveProgress(next)
        return next
      })
    },
    [],
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
    [progress],
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
    [progress],
  )

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setProgress({})
  }, [])

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
