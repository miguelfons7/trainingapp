import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Lock, Play, Construction } from 'lucide-react'
import { getCourseById } from '../data/courses'
import { useProgress } from '../context/ProgressContext'
import { useAuth } from '../context/AuthContext'
import { useConstruction } from '../context/ConstructionContext'
import { CourseHeader } from '../components/course/CourseHeader'
import { ModuleList } from '../components/course/ModuleList'

export function CourseView() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? getCourseById(courseId) : undefined
  const { getNextModule, getCourseProgress } = useProgress()
  const { isAdmin, isLeadership } = useAuth()
  const { isUnderConstruction, getConstructionMessage } = useConstruction()
  const canBypass = isAdmin || isLeadership
  const nextModuleId = course ? getNextModule(course.id) : null
  const progress = course ? getCourseProgress(course.id) : null
  const isCompleted = progress ? progress.percentage === 100 : false
  const hasStarted = progress ? progress.completed > 0 : false

  const isCourseConstruction = courseId ? isUnderConstruction('course', courseId) : false
  const constructionMsg = courseId ? getConstructionMessage('course', courseId) : null

  // Block regular users from under-construction courses; admins/leadership can still access
  if (!course || course.status === 'coming-soon' || (isCourseConstruction && !canBypass)) {
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
          {isCourseConstruction ? (
            <Construction className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          ) : (
            <Lock className="w-12 h-12 text-via-text-light mx-auto mb-4" />
          )}
          <h1 className="text-2xl font-bold text-via-navy mb-2">
            {course ? course.title : 'Course Not Found'}
          </h1>
          <p className="text-sm text-via-text-light mb-4">
            {isCourseConstruction && constructionMsg
              ? constructionMsg
              : course
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
        {/* Construction banner for admins/leadership */}
        {isCourseConstruction && canBypass && (
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 flex items-center gap-3">
            <Construction className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Under Construction</p>
              <p className="text-xs text-amber-700">
                {constructionMsg || 'This course is marked as under construction. Regular users cannot access it.'}
              </p>
            </div>
          </div>
        )}

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
