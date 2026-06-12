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
  /** True when the course isn't part of the user's assigned program at all */
  notInProgram?: boolean
}

/**
 * Course-level sequential gating, scoped to the USER'S assigned program.
 * A course is locked until every earlier gateable course in their program's
 * courseIds order is 100% complete.
 *
 * - Admins/leadership always bypass.
 * - A per-user row in course_unlock_overrides unlocks that course.
 * - A course outside the user's program is locked with notInProgram
 *   (BDRs don't see the AM course and vice versa).
 * - Coming-soon and under-construction courses are skipped when computing
 *   prerequisites so they can never permanently dam the sequence.
 */
export function useCourseLock() {
  const { user, isAdmin, isLeadership } = useAuth()
  const { courses, getProgramForUser } = useCourses()
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

      // Scope to the user's assigned program
      const program = getProgramForUser(user?.programId)
      if (!program) return { locked: false }

      // Courses outside the user's program are not theirs to take
      if (!program.courseIds.includes(courseId)) {
        return { locked: true, notInProgram: true }
      }

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
    [canBypass, overrides, getProgramForUser, user?.programId, courses, isUnderConstruction, getCourseProgress],
  )

  return { getCourseLock, overridesLoaded, refreshOverrides: fetchOverrides }
}
