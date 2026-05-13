import { useEffect, useMemo, type ComponentType } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { getCourseById } from '../data/courses'
import { useProgress } from '../context/ProgressContext'
import { SecondaryMarket } from '../components/sections/SecondaryMarket'
import { ReverseLogistics } from '../components/sections/ReverseLogistics'
import { ProductConditions } from '../components/sections/ProductConditions'
import { LoadTypes } from '../components/sections/LoadTypes'
import { BuyerTypes } from '../components/sections/BuyerTypes'
import { Glossary } from '../components/sections/Glossary'
import { CompanyOverview } from '../components/sections/CompanyOverview'
import { WhyVia } from '../components/sections/WhyVia'
import { QuizBlock } from '../components/interactive/QuizBlock'

const contentMap: Record<string, ComponentType> = {
  'secondary-market': SecondaryMarket,
  'reverse-logistics': ReverseLogistics,
  'product-conditions': ProductConditions,
  'load-types': LoadTypes,
  'buyer-types': BuyerTypes,
  'key-terminology': Glossary,
  'our-story': CompanyOverview,
  'mission-values': CompanyOverview,
  'our-platforms': CompanyOverview,
  'why-via': WhyVia,
}

const quizModules = new Set(['industry-knowledge-check', 'via-knowledge-check'])

export function ModuleView() {
  const { courseId, moduleId } = useParams<{
    courseId: string
    moduleId: string
  }>()
  const navigate = useNavigate()
  const { startModule, completeModule, getModuleStatus } = useProgress()

  const course = courseId ? getCourseById(courseId) : undefined

  const currentIndex = useMemo(() => {
    if (!course || !moduleId) return -1
    return course.modules.findIndex((m) => m.id === moduleId)
  }, [course, moduleId])

  const currentModule = course && currentIndex >= 0 ? course.modules[currentIndex] : undefined
  const prevModule = course && currentIndex > 0 ? course.modules[currentIndex - 1] : undefined
  const nextModule =
    course && currentIndex >= 0 && currentIndex < course.modules.length - 1
      ? course.modules[currentIndex + 1]
      : undefined

  const status = courseId && moduleId ? getModuleStatus(courseId, moduleId) : 'not-started'

  useEffect(() => {
    if (courseId && moduleId && currentModule) {
      startModule(courseId, moduleId)
    }
  }, [courseId, moduleId, currentModule, startModule])

  if (!course || !currentModule || !courseId || !moduleId) {
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
          <p className="text-via-text-light">Module not found.</p>
        </div>
      </div>
    )
  }

  function handleComplete() {
    if (!courseId || !moduleId) return
    completeModule(courseId, moduleId)
    if (nextModule) {
      navigate(`/course/${courseId}/module/${nextModule.id}`)
    } else {
      navigate(`/course/${courseId}`)
    }
  }

  // Determine which content to render
  const ContentComponent = contentMap[moduleId]
  const isQuiz = quizModules.has(moduleId)

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* Back to course */}
      <Link
        to={`/course/${courseId}`}
        className="inline-flex items-center gap-1.5 text-sm text-via-text-light hover:text-via-navy transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {course.title}
      </Link>

      {/* Module header */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wide text-via-text-light mb-1">
          Module {currentIndex + 1} of {course.modules.length}
        </p>
        <h1 className="text-2xl font-bold text-via-navy">
          {currentModule.title}
        </h1>
        {currentModule.description && (
          <p className="text-sm text-via-text-light mt-1">
            {currentModule.description}
          </p>
        )}
      </div>

      {/* Module content */}
      <div className="mb-8">
        {isQuiz ? (
          <QuizBlock quizId={moduleId} />
        ) : ContentComponent ? (
          <ContentComponent />
        ) : (
          <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
            <p className="text-via-text-light">Content coming soon.</p>
          </div>
        )}
      </div>

      {/* Mark as complete */}
      {status !== 'completed' && (
        <div className="mb-8 text-center">
          <button
            onClick={handleComplete}
            className="inline-flex items-center gap-2 px-6 py-3 bg-via-orange text-white font-semibold rounded-lg hover:bg-via-orange-light transition-colors cursor-pointer"
          >
            <CheckCircle className="w-5 h-5" />
            Mark as Complete
          </button>
        </div>
      )}

      {status === 'completed' && (
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-via-success">
            <CheckCircle className="w-5 h-5" />
            Module completed
          </span>
        </div>
      )}

      {/* Previous / Next navigation */}
      <div className="flex items-center justify-between border-t border-via-border pt-6">
        {prevModule ? (
          <Link
            to={`/course/${courseId}/module/${prevModule.id}`}
            className="inline-flex items-center gap-1.5 text-sm text-via-text-light hover:text-via-navy transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {prevModule.title}
          </Link>
        ) : (
          <span />
        )}

        {nextModule ? (
          <Link
            to={`/course/${courseId}/module/${nextModule.id}`}
            className="inline-flex items-center gap-1.5 text-sm text-via-text-light hover:text-via-navy transition-colors"
          >
            {nextModule.title}
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            to={`/course/${courseId}`}
            className="inline-flex items-center gap-1.5 text-sm text-via-text-light hover:text-via-navy transition-colors"
          >
            Back to Course
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
