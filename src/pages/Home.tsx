import { Award, CheckCircle, FileCheck, Flame, Printer } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCompliance } from '../context/ComplianceContext'
import { useProgress } from '../context/ProgressContext'
import { useCourses } from '../context/CoursesContext'
import { useCourseLock } from '../hooks/useCourseLock'
import { useLearningStreak } from '../hooks/useLearningStreak'
import { ComplianceBanner } from '../components/home/ComplianceBanner'
import { ContinueLearning } from '../components/home/ContinueLearning'
import { ProgramCard } from '../components/home/ProgramCard'
import { CourseCard } from '../components/home/CourseCard'

export function Home() {
  const { user, isAdmin, isLeadership } = useAuth()
  const { items, isAcknowledged } = useCompliance()
  const { getCourseProgress } = useProgress()
  const { courses, getProgramForUser } = useCourses()
  const { getCourseLock } = useCourseLock()
  const streak = useLearningStreak()

  const firstName = user?.name?.split(' ')[0] ?? 'Learner'
  const canSeeAll = isAdmin || isLeadership

  // The user's assigned program drives ordering and visibility
  const userProgram = getProgramForUser(user?.programId)
  const programOrder = userProgram?.courseIds ?? []

  // Regular users see only their program's courses; admins/leadership see
  // everything (program courses first, the rest after)
  const visibleCourses = canSeeAll
    ? courses
    : courses.filter((c) => programOrder.includes(c.id))
  const orderedCourses = [...visibleCourses].sort((a, b) => {
    const ai = programOrder.indexOf(a.id)
    const bi = programOrder.indexOf(b.id)
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
  })

  // "Up Next": the first available course that's unlocked but not yet complete
  const upNextId = orderedCourses.find(
    (c) =>
      c.status === 'available' &&
      !getCourseLock(c.id).locked &&
      getCourseProgress(c.id).percentage < 100,
  )?.id

  // Program complete when every available program course is at 100%
  const programCourses = programOrder
    .map((id) => courses.find((c) => c.id === id))
    .filter((c) => c && c.status === 'available')
  const programComplete =
    programCourses.length > 0 &&
    programCourses.every((c) => getCourseProgress(c!.id).percentage === 100)

  // Build certificates from completed courses + acknowledged compliance items
  const completedCourses = courses
    .filter((c) => c.status === 'available')
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
            Pick up where you left off or explore new courses below.
          </p>
        </div>
        {streak >= 2 && (
          <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-sm font-semibold text-orange-700">
            <Flame className="w-4 h-4 text-orange-500" />
            {streak}-day streak
          </span>
        )}
      </div>

      {/* Program completion banner */}
      {programComplete && (
        <div className="bg-gradient-to-r from-via-navy to-indigo-900 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 text-amber-300" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-white">Training Program Complete!</p>
            <p className="text-sm text-white/80">
              You've finished every course in your program. Outstanding work.
            </p>
          </div>
          <Link
            to="/certificate/program"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-via-navy text-sm font-bold hover:bg-white/90 transition-colors"
          >
            <Printer className="w-4 h-4" />
            View Certificate
          </Link>
        </div>
      )}

      {/* Compliance banner */}
      <ComplianceBanner />

      {/* Continue learning */}
      <ContinueLearning />

      {/* Program overview */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-via-navy">Your Program</h2>
        <ProgramCard />
      </section>

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

      {/* Courses grid */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-via-navy">Courses</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orderedCourses.map((course, index) => {
            const programIdx = programOrder.indexOf(course.id)
            return (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                lockInfo={getCourseLock(course.id)}
                pathPosition={programIdx >= 0 ? programIdx + 1 : undefined}
                isUpNext={course.id === upNextId}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}
