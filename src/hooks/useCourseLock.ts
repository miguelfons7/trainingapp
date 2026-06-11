import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useCourses } from '../context/CoursesContext'
import { useProgress } from '../context/ProgressContext'
import { useConstruction } from '../context/ConstructionContext'

export interface CourseLockInfo {
  locked: boolean
  /** The first incomplete prerequisite course blocking access */
  blockedBy?: { id: string; title: string }
}

/**
 * Course-level sequential gating. A course is locked until every earlier
 * gateable course in the program's courseIds order is 100% complete.
 *
 * - Admins/leadership always bypass.
 * - A per-user row in course_unlock_overrides unlocks that course.
 * - Coming-soon and under-construction courses are skipped when computing
 *   prerequisites so they can never permanently dam the sequence.
 * - Courses not in any program are never locked.
 */
export function useCourseLock() {
  const { user, isAdmin, isLeadership } = useAuth()
  const { courses, programs } = useCourses()
  const { getCourseProgress } = useProgress()
  const { isUnderConstruction } = useConstruction()

  const canBypass = isAdmin || isLeadership

  const [overrides, setOverrides] = useState<Set<string>>(new Set())
  const [overridesLoaded, setOverridesLoaded] = useState(false)

  const fetchOverrides = useCallback(async () => {
    if (!user?.id) {
      setOverrides(new Set())
      setOverridesLoaded(true)
      return
    }
    const { data, error } = await supabase
      .from('course_unlock_overrides')
      .select('course_id')
      .eq('user_id', user.id)

    if (!error && data) {
      setOverrides(new Set(data.map((r) => r.course_id)))
    }
    setOverridesLoaded(true)
  }, [user?.id])

  useEffect(() => {
    fetchOverrides().catch(console.error)
  }, [fetchOverrides])

  const getCourseLock = useCallback(
    (courseId: string): CourseLockInfo => {
      if (canBypass) return { locked: false }
      if (overrides.has(courseId)) return { locked: false }

      // Find the program containing this course
      const program = programs.find((p) => p.courseIds.includes(courseId))
      if (!program) return { locked: false }

      const position = program.courseIds.indexOf(courseId)

      // Every earlier gateable course must be 100% complete
      for (let i = 0; i < position; i++) {
        const prevId = program.courseIds[i]
        const prevCourse = courses.find((c) => c.id === prevId)
        // Skip prerequisites that can't actually be completed
        if (!prevCourse) continue
        if (prevCourse.status !== 'available') continue
        if (isUnderConstruction('course', prevId)) continue

        const progress = getCourseProgress(prevId)
        if (progress.total === 0) continue // no modules — nothing to complete
        if (progress.percentage < 100) {
          return {
            locked: true,
            blockedBy: { id: prevCourse.id, title: prevCourse.title },
          }
        }
      }

      return { locked: false }
    },
    [canBypass, overrides, programs, courses, isUnderConstruction, getCourseProgress],
  )

  return { getCourseLock, overridesLoaded, refreshOverrides: fetchOverrides }
}
