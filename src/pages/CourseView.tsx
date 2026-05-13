import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Lock, Play } from 'lucide-react'
import { getCourseById } from '../data/courses'
import { useProgress } from '../context/ProgressContext'
import { CourseHeader } from '../components/course/CourseHeader'
import { ModuleList } from '../components/course/ModuleList'

export function CourseView() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? getCourseById(courseId) : undefined
  const { getNextModule, getCourseProgress } = useProgress()
  const nextModuleId = course ? getNextModule(course.id) : null
  const progress = course ? getCourseProgress(course.id) : null
  const isCompleted = progress ? progress.percentage === 100 : false
  const hasStarted = progress ? progress.completed > 0 : false

  if (!course || course.status === 'coming-soon') {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-via-text-light hover:text-via-navy transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
          <Lock className="w-12 h-12 text-via-text-light mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-via-navy mb-2">
            {course ? course.title : 'Course Not Found'}
          </h1>
          <p className="text-sm text-via-text-light mb-4">
            {course
              ? 'This course is currently being developed and will be available soon.'
              : 'The course you are looking for does not exist.'}
          </p>
          {course && (
            <div className="flex items-center justify-center gap-2 text-sm text-via-text-light">
              <Clock className="w-4 h-4" />
              <span>Estimated: {course.estimatedTime}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-via-text-light hover:text-via-navy transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="space-y-6">
        <CourseHeader course={course} />

        {/* Start / Continue button */}
        {!isCompleted && nextModuleId && (
          <div className="text-center">
            <Link
              to={`/course/${course.id}/module/${nextModuleId}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-via-orange text-white text-lg font-bold rounded-xl hover:bg-via-orange-light transition-colors shadow-lg hover:shadow-xl"
            >
              <Play className="w-6 h-6" />
              {hasStarted ? 'Continue Learning' : 'Start Course'}
            </Link>
          </div>
        )}

        <ModuleList courseId={course.id} modules={course.modules} />
      </div>
    </div>
  )
}
