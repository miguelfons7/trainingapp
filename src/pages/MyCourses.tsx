import { BookOpen } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCourses } from '../context/CoursesContext'
import { useProgress } from '../context/ProgressContext'
import { useCourseLock } from '../hooks/useCourseLock'
import { CourseCard } from '../components/home/CourseCard'

/**
 * "My Courses" — a browse grid of the courses assigned to the learner (the
 * deduped union of their programs' courses). Complements Home's "My Progress"
 * timeline (a path/progress view). Admins/leadership see the whole catalog.
 */
export function MyCourses() {
  const { user, isAdmin, isLeadership } = useAuth()
  const { courses, getProgramsForUser, getCourseById } = useCourses()
  const { getCourseProgress } = useProgress()
  const { getCourseLock } = useCourseLock()

  const canSeeAll = isAdmin || isLeadership
  const userPrograms = getProgramsForUser(user?.programIds)

  // A deduped union of the user's programs' courseIds, in program order.
  const myCourseIds = [...new Set(userPrograms.flatMap((p) => p.courseIds))]
  const myCourses = canSeeAll
    ? courses
    : myCourseIds
        .map((id) => getCourseById(id))
        .filter((c): c is NonNullable<typeof c> => !!c)

  // "Up Next": first available course that's unlocked but not yet complete.
  const upNextId = myCourses.find(
    (c) =>
      c.status === 'available' &&
      !getCourseLock(c.id).locked &&
      getCourseProgress(c.id).percentage < 100,
  )?.id

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-via-navy">My Courses</h1>
        <p className="mt-1 text-sm text-via-text-light">
          {canSeeAll
            ? 'Every course in the catalog (admin view).'
            : 'The courses in your training program. Finished courses stay open for review.'}
        </p>
      </div>

      {!canSeeAll && userPrograms.length === 0 ? (
        <div className="bg-via-card rounded-xl border border-via-border p-8 text-center">
          <BookOpen className="w-10 h-10 text-via-text-light mx-auto mb-3" />
          <h2 className="text-lg font-bold text-via-navy mb-1">
            No training program assigned yet
          </h2>
          <p className="text-sm text-via-text-light">
            You haven't been assigned to a training program. Please contact your
            admin to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              lockInfo={getCourseLock(course.id)}
              isUpNext={course.id === upNextId}
            />
          ))}
        </div>
      )}
    </div>
  )
}
