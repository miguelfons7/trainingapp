import { Award, CheckCircle, FileCheck } from 'lucide-react'
import { useProgress } from '../context/ProgressContext'
import { useCompliance } from '../context/ComplianceContext'
import { courses } from '../data/courses'

export function Certificates() {
  const { getCourseProgress } = useProgress()
  const { items, isAcknowledged } = useCompliance()

  const completedCourses = courses
    .filter((c) => c.status === 'available')
    .filter((c) => getCourseProgress(c.id).percentage === 100)

  const acknowledgedItems = items.filter((item) => isAcknowledged(item.id))

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-via-navy flex items-center gap-2">
          <Award className="w-6 h-6 text-via-orange" />
          My Certificates
        </h1>
        <p className="text-sm text-via-text-light mt-1">
          Courses you've completed and compliance items you've acknowledged.
        </p>
      </div>

      {completedCourses.length === 0 && acknowledgedItems.length === 0 ? (
        <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
          <Award className="w-12 h-12 text-via-text-light mx-auto mb-4" />
          <p className="text-sm text-via-text-light">
            Complete courses and sign compliance items to earn certificates here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Completed Courses */}
          {completedCourses.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-semibold text-via-navy">
                Completed Courses
              </h2>
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
              </div>
            </section>
          )}

          {/* Acknowledged Compliance Items */}
          {acknowledgedItems.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-semibold text-via-navy">
                Acknowledged Compliance Items
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
            </section>
          )}
        </div>
      )}
    </div>
  )
}
