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
    </div>
  )
}
