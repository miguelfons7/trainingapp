import { Clock } from 'lucide-react'
import type { Course } from '../../types'
import { ProgressBar } from '../shared/ProgressBar'
import { ImagePlaceholder } from '../shared/ImagePlaceholder'
import { useProgress } from '../../context/ProgressContext'

interface CourseHeaderProps {
  course: Course
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const { getCourseProgress } = useProgress()
  const progress = getCourseProgress(course.id)

  return (
    <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
      <ImagePlaceholder
        src={course.imagePath ?? ''}
        alt={course.title}
        aspectRatio="16:9"
      />

      <div className="p-6">
        <h1 className="text-2xl font-bold text-via-navy mb-2">
          {course.title}
        </h1>
        <p className="text-sm text-via-text-light mb-4">
          {course.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-via-text-light mb-4">
          <Clock className="w-4 h-4" />
          <span>{course.estimatedTime}</span>
        </div>

        <div className="space-y-2">
          <ProgressBar value={progress.percentage} size="lg" />
          <p className="text-sm text-via-text-light">
            {progress.completed} of {progress.total} modules complete
          </p>
        </div>
      </div>
    </div>
  )
}
