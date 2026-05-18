import { Link } from 'react-router-dom'
import { PlayCircle, CheckCircle2 } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'
import { useCourses } from '../../context/CoursesContext'

export function ContinueLearning() {
  const { getCourseProgress, getNextModule } = useProgress()
  const { courses } = useCourses()

  // Find the first available course that has incomplete modules
  const activeCourse = courses
    .filter((c) => c.status === 'available')
    .find((c) => {
      const progress = getCourseProgress(c.id)
      return progress.percentage < 100
    })

  if (!activeCourse) {
    return (
      <div className="rounded-2xl bg-via-navy p-6 text-white">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-via-success shrink-0" />
          <div>
            <h3 className="text-lg font-bold">All caught up!</h3>
            <p className="mt-1 text-sm text-white/70">
              You have completed all available courses. Check back soon for new
              content.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const nextModuleId = getNextModule(activeCourse.id)
  const nextModule = activeCourse.modules.find((m) => m.id === nextModuleId)

  const linkTo = nextModuleId
    ? `/course/${activeCourse.id}/module/${nextModuleId}`
    : `/course/${activeCourse.id}`

  return (
    <div className="rounded-2xl bg-via-navy p-6 text-white">
      <p className="text-xs font-medium uppercase tracking-wider text-white/50 mb-2">
        Continue where you left off
      </p>

      <h3 className="text-lg font-bold">{activeCourse.title}</h3>

      {nextModule && (
        <p className="mt-1 text-sm text-white/70">
          Next up: {nextModule.title}
        </p>
      )}

      <Link
        to={linkTo}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-via-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-via-orange-light"
      >
        <PlayCircle className="h-4 w-4" />
        Continue
      </Link>
    </div>
  )
}
