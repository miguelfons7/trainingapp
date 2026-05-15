import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { ProgressRing } from '../shared/ProgressRing'
import { getProgram } from '../../data/courses'
import { useProgress } from '../../context/ProgressContext'
import { courses } from '../../data/courses'

export function ProgramCard() {
  const program = getProgram()
  const { getCourseProgress } = useProgress()

  const availableCourses = courses.filter((c) => c.status === 'available')

  const courseProgresses = availableCourses.map((c) =>
    getCourseProgress(c.id),
  )

  const overallProgress =
    courseProgresses.length > 0
      ? Math.round(
          courseProgresses.reduce((sum, cp) => sum + cp.percentage, 0) /
            courseProgresses.length,
        )
      : 0

  const completedCourses = courseProgresses.filter(
    (cp) => cp.percentage === 100,
  ).length

  const allCoursesComplete = completedCourses === availableCourses.length && availableCourses.length > 0

  return (
    <div className="rounded-2xl border border-via-border bg-via-card p-6">
      <div className="flex items-center gap-5">
        <div className="shrink-0">
          <ProgressRing value={overallProgress} size={80} showLabel />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-via-navy">{program.title}</h3>
          <p className="mt-1 text-sm text-via-text-light line-clamp-2">
            {program.description}
          </p>
          <p className="mt-2 text-sm font-medium text-via-text">
            {completedCourses} of {availableCourses.length} courses completed
          </p>
        </div>
      </div>

      {allCoursesComplete && (
        <div className="mt-4 pt-4 border-t border-via-border">
          <Link
            to="/final-exam"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-via-navy text-white font-semibold rounded-xl hover:bg-via-navy/90 transition-colors text-sm"
          >
            <Shield className="w-4 h-4" />
            Take Program Final Exam
          </Link>
          <p className="text-xs text-via-text-light mt-1.5">
            25 minutes, 20 questions, 80% to pass and earn your certification
          </p>
        </div>
      )}
    </div>
  )
}
