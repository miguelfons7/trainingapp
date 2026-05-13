import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Lock } from 'lucide-react'
import { getCourseById } from '../data/courses'
import { CourseHeader } from '../components/course/CourseHeader'
import { ModuleList } from '../components/course/ModuleList'

export function CourseView() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? getCourseById(courseId) : undefined

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
        <ModuleList courseId={course.id} modules={course.modules} />
      </div>
    </div>
  )
}
