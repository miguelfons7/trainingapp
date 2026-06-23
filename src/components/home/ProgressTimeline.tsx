import { Link } from 'react-router-dom'
import { CheckCircle2, Circle, Lock, Construction, Play, Printer } from 'lucide-react'
import { ProgressBar } from '../shared/ProgressBar'
import { useProgress } from '../../context/ProgressContext'
import { useCourses } from '../../context/CoursesContext'
import { useCourseLock } from '../../hooks/useCourseLock'
import { useConstruction } from '../../context/ConstructionContext'
import type { Program } from '../../types'

/**
 * "My Progress" timeline for a single program: the program's courses as an
 * ordered path (completed → current → upcoming/locked) with a header showing
 * progress and, once complete, a per-program certificate link.
 */
export function ProgressTimeline({ program }: { program: Program }) {
  const { getCourseById } = useCourses()
  const { getCourseProgress } = useProgress()
  const { getCourseLock } = useCourseLock()
  const { isUnderConstruction } = useConstruction()

  const items = program.courseIds
    .map((id) => getCourseById(id))
    .filter((c): c is NonNullable<typeof c> => !!c)

  const availableItems = items.filter((c) => c.status === 'available')
  const total = availableItems.length
  const completedCount = availableItems.filter(
    (c) => getCourseProgress(c.id).percentage === 100,
  ).length
  const programComplete = total > 0 && completedCount === total

  // First unlocked-but-incomplete available course gets the "Up Next" highlight
  const upNextId = availableItems.find(
    (c) => !getCourseLock(c.id).locked && getCourseProgress(c.id).percentage < 100,
  )?.id

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-via-navy">{program.title}</h2>
          <p className="text-sm text-via-text-light">
            {completedCount} of {total} courses complete
          </p>
        </div>
        {programComplete && (
          <Link
            to={`/certificate/program/${program.id}`}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-via-navy text-white text-sm font-semibold hover:bg-via-navy-light transition-colors"
          >
            <Printer className="w-4 h-4" />
            Certificate
          </Link>
        )}
      </div>

      <ol className="relative">
        {items.map((course, i) => {
          const progress = getCourseProgress(course.id)
          const lock = getCourseLock(course.id)
          const isComingSoon = course.status === 'coming-soon'
          const isConstruction = isUnderConstruction('course', course.id)
          const isCompleted =
            course.status === 'available' && progress.total > 0 && progress.percentage === 100
          const isLocked = lock.locked || isComingSoon || isConstruction
          const isUpNext = course.id === upNextId
          const isLast = i === items.length - 1
          const accessible = !isLocked

          let StatusIcon = Circle
          let dotClass = 'bg-white border-via-border text-via-text-light'
          if (isCompleted) {
            StatusIcon = CheckCircle2
            dotClass = 'bg-emerald-500 border-emerald-500 text-white'
          } else if (isConstruction) {
            StatusIcon = Construction
            dotClass = 'bg-amber-100 border-amber-300 text-amber-600'
          } else if (isLocked) {
            StatusIcon = Lock
            dotClass = 'bg-via-bg-subtle border-via-border text-via-text-light'
          } else if (isUpNext || progress.percentage > 0) {
            StatusIcon = Play
            dotClass = 'bg-via-orange border-via-orange text-white'
          }

          const inner = (
            <>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-via-navy">{course.title}</h3>
                {isUpNext && (
                  <span className="shrink-0 px-2 py-0.5 rounded-full bg-via-orange text-white text-[10px] font-bold uppercase tracking-wide">
                    Up Next
                  </span>
                )}
                {isCompleted && (
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                    Completed
                  </span>
                )}
                {isComingSoon && (
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-via-text-light">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-via-text-light line-clamp-1">
                {course.description}
              </p>
              {course.status === 'available' && progress.total > 0 && !isLocked && (
                <div className="mt-2">
                  <ProgressBar
                    value={progress.percentage}
                    size="sm"
                    color={progress.percentage === 100 ? 'success' : 'orange'}
                  />
                </div>
              )}
              {isLocked && !isComingSoon && !isConstruction && lock.blockedBy && (
                <p className="mt-1 text-[11px] text-via-text-light">
                  Complete "{lock.blockedBy.title}" first
                </p>
              )}
            </>
          )

          return (
            <li key={course.id} className="relative flex gap-4 pb-4">
              {!isLast && (
                <span
                  className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-via-border"
                  aria-hidden
                />
              )}
              <span
                className={`relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${dotClass}`}
              >
                <StatusIcon className="h-4 w-4" />
              </span>
              {accessible ? (
                <Link
                  to={`/course/${course.id}`}
                  className={`flex-1 rounded-xl border p-4 transition-colors cursor-pointer bg-via-card hover:bg-via-card-hover ${
                    isUpNext ? 'border-via-orange ring-1 ring-via-orange/40' : 'border-via-border'
                  }`}
                >
                  {inner}
                </Link>
              ) : (
                <div className="flex-1 rounded-xl border border-via-border p-4 bg-via-bg-subtle opacity-70">
                  {inner}
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
