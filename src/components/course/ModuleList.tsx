import { Link } from 'react-router-dom'
import { CheckCircle, Play, Circle, Clock, Lock } from 'lucide-react'
import type { CourseModule } from '../../types'
import { useProgress } from '../../context/ProgressContext'
import { useAuth } from '../../context/AuthContext'

interface ModuleListProps {
  courseId: string
  modules: CourseModule[]
}

const contentTypeBadge: Record<string, { label: string; className: string }> = {
  lesson: {
    label: 'Lesson',
    className: 'bg-via-navy/10 text-via-navy',
  },
  quiz: {
    label: 'Quiz',
    className: 'bg-via-orange/10 text-via-orange',
  },
  interactive: {
    label: 'Interactive',
    className: 'bg-via-success/10 text-via-success',
  },
}

export function ModuleList({ courseId, modules }: ModuleListProps) {
  const { getModuleStatus } = useProgress()
  const { isAdmin, isLeadership } = useAuth()

  const canBypass = isAdmin || isLeadership

  return (
    <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
      {modules.map((mod, index) => {
        const status = getModuleStatus(courseId, mod.id)
        const badge = contentTypeBadge[mod.contentType]
        const isLast = index === modules.length - 1

        // First module is always accessible; admins/leadership can access any module.
        // Regular users must complete the previous module before unlocking the next one.
        const prevStatus = index > 0 ? getModuleStatus(courseId, modules[index - 1].id) : 'completed'
        const isAccessible = canBypass || index === 0 || prevStatus === 'completed'

        const sharedClassName = `flex items-center gap-4 px-5 py-4 ${
          !isLast ? 'border-b border-via-border' : ''
        }`

        if (!isAccessible) {
          return (
            <div
              key={mod.id}
              className={`${sharedClassName} opacity-50 cursor-not-allowed`}
            >
              {/* Module number */}
              <span className="text-sm font-bold text-via-text-light w-6 text-center shrink-0">
                {index + 1}
              </span>

              {/* Lock icon */}
              <div className="shrink-0">
                <Lock className="w-5 h-5 text-via-text-light/40" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-via-text truncate">
                  {mod.title}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-via-text-light">
                    <Clock className="w-3 h-3" />
                    {mod.estimatedTime}
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                </div>
              </div>
            </div>
          )
        }

        return (
          <Link
            key={mod.id}
            to={`/course/${courseId}/module/${mod.id}`}
            className={`${sharedClassName} transition-colors hover:bg-via-card-hover ${
              status === 'in-progress' ? 'bg-via-orange/5' : ''
            }`}
          >
            {/* Module number */}
            <span className="text-sm font-bold text-via-text-light w-6 text-center shrink-0">
              {index + 1}
            </span>

            {/* Status icon */}
            <div className="shrink-0">
              {status === 'completed' && (
                <CheckCircle className="w-5 h-5 text-via-success" />
              )}
              {status === 'in-progress' && (
                <Play className="w-5 h-5 text-via-orange" />
              )}
              {status === 'not-started' && (
                <Circle className="w-5 h-5 text-via-text-light/40" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-via-text truncate">
                {mod.title}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-via-text-light">
                  <Clock className="w-3 h-3" />
                  {mod.estimatedTime}
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${badge.className}`}
                >
                  {badge.label}
                </span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
