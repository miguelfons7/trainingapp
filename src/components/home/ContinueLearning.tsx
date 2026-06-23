import { Link } from 'react-router-dom'
import { PlayCircle, CheckCircle2 } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'
import { useCourses } from '../../context/CoursesContext'
import { useAuth } from '../../context/AuthContext'

export function ContinueLearning() {
  const { user } = useAuth()
  const { getCourseProgress, getNextModule } = useProgress()
  const { courses, getProgramsForUser } = useCourses()

  // Scope to the user's assigned programs (deduped union, in program/course
  // order) — otherwise an AM-program user would be pointed at the BDR course.
  const userPrograms = getProgramsForUser(user?.programIds)
  const seen = new Set<string>()
  const programCourses = userPrograms
    .flatMap((p) => p.courseIds)
    .filter((id) => (seen.has(id) ? false : (seen.add(id), true)))
    .map((id) => courses.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => !!c && c.status === 'available')

  // First course across THEIR programs with incomplete modules
  const activeCourse = programCourses.find(
    (c) => getCourseProgress(c.id).percentage < 100,
  )

  // No program assigned, or nothing to continue — let Home handle the empty state
  if (userPrograms.length === 0) return null

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
