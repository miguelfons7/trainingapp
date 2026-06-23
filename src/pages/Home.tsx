import { Award, BookOpen, CheckCircle, FileCheck, Flame, Printer } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCompliance } from '../context/ComplianceContext'
import { useProgress } from '../context/ProgressContext'
import { useCourses } from '../context/CoursesContext'
import { useCourseLock } from '../hooks/useCourseLock'
import { useLearningStreak } from '../hooks/useLearningStreak'
import { ComplianceBanner } from '../components/home/ComplianceBanner'
import { ContinueLearning } from '../components/home/ContinueLearning'
import { ProgressTimeline } from '../components/home/ProgressTimeline'
import { CourseCard } from '../components/home/CourseCard'

export function Home() {
  const { user, isAdmin, isLeadership } = useAuth()
  const { items, isAcknowledged } = useCompliance()
  const { getCourseProgress } = useProgress()
  const { courses, getProgramsForUser } = useCourses()
  const { getCourseLock } = useCourseLock()
  const streak = useLearningStreak()

  const firstName = user?.name?.split(' ')[0] ?? 'Learner'
  const canSeeAll = isAdmin || isLeadership

  // The user's assigned programs (many-to-many). Empty = nothing assigned yet.
  const userPrograms = getProgramsForUser(user?.programIds)

  // Certificates: completed courses, scoped to the user's programs (admins see all)
  const programCourseIds = new Set(userPrograms.flatMap((p) => p.courseIds))
  const completedCourses = courses
    .filter((c) => c.status === 'available')
    .filter((c) => canSeeAll || programCourseIds.has(c.id))
    .filter((c) => getCourseProgress(c.id).percentage === 100)
  const acknowledgedItems = items.filter((item) => isAcknowledged(item.id))

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-via-navy">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-sm text-via-text-light">
            Pick up where you left off and track your progress below.
          </p>
        </div>
        {streak >= 2 && (
          <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-sm font-semibold text-orange-700">
            <Flame className="w-4 h-4 text-orange-500" />
            {streak}-day streak
          </span>
        )}
      </div>

      {/* Compliance banner */}
      <ComplianceBanner />

      {/* Continue learning (null when no program assigned) */}
      <ContinueLearning />

      {/* No program assigned — regular users */}
      {!canSeeAll && userPrograms.length === 0 && (
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
      )}

      {/* My Progress — one timeline per assigned program */}
      {userPrograms.map((program) => (
        <ProgressTimeline key={program.id} program={program} />
      ))}

      {/* My Certificates */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-via-navy flex items-center gap-2">
          <Award className="w-5 h-5 text-via-orange" />
          My Certificates
        </h2>
        {completedCourses.length === 0 && acknowledgedItems.length === 0 ? (
          <div className="bg-via-card rounded-xl border border-via-border p-8 text-center">
            <Award className="w-10 h-10 text-via-text-light mx-auto mb-3" />
            <p className="text-sm text-via-text-light">
              Complete courses and sign compliance items to earn certificates here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {completedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-via-card rounded-xl border border-via-border p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-via-navy truncate">
                    {course.title}
                  </p>
                  <p className="text-xs text-via-success font-medium">Course Completed</p>
                </div>
                <Link
                  to={`/certificate/${course.id}`}
                  className="shrink-0 p-2 rounded-lg hover:bg-via-bg-subtle text-via-text-light hover:text-via-navy transition-colors"
                  title="View / print certificate"
                >
                  <Printer className="w-4 h-4" />
                </Link>
              </div>
            ))}
            {acknowledgedItems.map((item) => (
              <div
                key={item.id}
                className="bg-via-card rounded-xl border border-via-border p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-via-navy truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-blue-600 font-medium">Acknowledged</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Admin/leadership: every course, regardless of program */}
      {canSeeAll && (
        <section>
          <h2 className="mb-1 text-lg font-bold text-via-navy">All Courses</h2>
          <p className="mb-4 text-xs text-via-text-light">
            Admin view — every course in the catalog. Learners only see the
            programs assigned to them.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                lockInfo={getCourseLock(course.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
