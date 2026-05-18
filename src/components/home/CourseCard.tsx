import { Link } from 'react-router-dom'
import {
  Lock,
  Construction,
  Warehouse,
  Building2,
  Package,
  Target,
  Headphones,
  Settings,
  TrendingUp,
  BookOpen,
  type LucideIcon,
} from 'lucide-react'
import { ProgressBar } from '../shared/ProgressBar'
import { ImagePlaceholder } from '../shared/ImagePlaceholder'
import { useProgress } from '../../context/ProgressContext'
import { useConstruction } from '../../context/ConstructionContext'
import type { Course } from '../../types'

interface CourseCardProps {
  course: Course
  index: number
}

const iconMap: Record<string, LucideIcon> = {
  Warehouse,
  Building2,
  Package,
  Target,
  Headphones,
  Settings,
  TrendingUp,
  BookOpen,
}

export function CourseCard({ course }: CourseCardProps) {
  const { getCourseProgress } = useProgress()
  const { isUnderConstruction, getConstructionMessage } = useConstruction()
  const isComingSoon = course.status === 'coming-soon'
  const isCourseConstruction = isUnderConstruction('course', course.id)
  const constructionMsg = getConstructionMessage('course', course.id)

  const Icon = iconMap[course.icon] ?? BookOpen
  const progress = getCourseProgress(course.id)

  if (isComingSoon || isCourseConstruction) {
    const label = isCourseConstruction ? 'Under Construction' : 'Coming Soon'
    const OverlayIcon = isCourseConstruction ? Construction : Lock
    return (
      <div className="group relative flex flex-col overflow-hidden rounded-xl border border-via-border bg-via-card opacity-60">
        <div className="relative">
          <ImagePlaceholder
            src={course.imagePath ?? ''}
            alt={course.title}
            aspectRatio="1:1"
            icon={Icon}
            className="rounded-none"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2">
                <OverlayIcon className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">{label}</span>
              </div>
              {constructionMsg && (
                <span className="text-xs text-white/80 bg-black/40 rounded-full px-3 py-1 max-w-[200px] text-center truncate">
                  {constructionMsg}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-sm font-semibold text-via-navy line-clamp-1">
            {course.title}
          </h3>
          <p className="mt-1 text-xs text-via-text-light line-clamp-2">
            {course.description}
          </p>
        </div>
      </div>
    )
  }

  return (
    <Link
      to={`/course/${course.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-via-border bg-via-card transition-shadow hover:shadow-lg"
    >
      <ImagePlaceholder
        src={course.imagePath ?? ''}
        alt={course.title}
        aspectRatio="1:1"
        icon={Icon}
        className="rounded-none"
      />

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-via-navy line-clamp-1 group-hover:text-via-orange transition-colors">
          {course.title}
        </h3>
        <p className="mt-1 text-xs text-via-text-light line-clamp-2 flex-1">
          {course.description}
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-via-text-light">
          <span>{course.estimatedTime}</span>
          {progress.total > 0 && (
            <>
              <span className="text-via-border">|</span>
              <span>
                {progress.completed}/{progress.total} modules
              </span>
            </>
          )}
        </div>

        {progress.total > 0 && (
          <div className="mt-3">
            <ProgressBar
              value={progress.percentage}
              size="sm"
              color={progress.percentage === 100 ? 'success' : 'orange'}
            />
          </div>
        )}
      </div>
    </Link>
  )
}
