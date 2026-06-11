import { Award, CheckCircle, FileCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCompliance } from '../context/ComplianceContext'
import { useProgress } from '../context/ProgressContext'
import { useCourses } from '../context/CoursesContext'
import { useCourseLock } from '../hooks/useCourseLock'
import { ComplianceBanner } from '../components/home/ComplianceBanner'
import { ContinueLearning } from '../components/home/ContinueLearning'
import { ProgramCard } from '../components/home/ProgramCard'
import { CourseCard } from '../components/home/CourseCard'

export function Home() {
  const { user } = useAuth()
  const { items, isAcknowledged } = useCompliance()
  const { getCourseProgress } = useProgress()
  const { courses, programs } = useCourses()
  const { getCourseLock } = useCourseLock()

  const firstName = user?.name?.split(' ')[0] ?? 'Learner'

  // Order the course grid by program sequence; courses outside the program go last
  const programOrder = programs[0]?.courseIds ?? []
  const orderedCourses = [...courses].sort((a, b) => {
    const ai = programOrder.indexOf(a.id)
    const bi = programOrder.indexOf(b.id)
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
  })

  // Build certificates from completed courses + acknowledged compliance items
  const completedCourses = courses
    .filter((c) => c.status === 'available')
    .filter((c) => getCourseProgress(c.id).percentage === 100)
  const acknowledgedItems = items.filter((item) => isAcknowledged(item.id))

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-via-navy">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-sm text-via-text-light">
          Pick up where you left off or explore new courses below.
        </p>
      </div>

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
          {orderedCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              lockInfo={getCourseLock(course.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
