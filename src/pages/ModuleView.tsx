import { useEffect, useMemo, useCallback, type ComponentType } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { getCourseById } from '../data/courses'
import { useProgress } from '../context/ProgressContext'
import { SecondaryMarket } from '../components/sections/SecondaryMarket'
import { ReverseLogistics } from '../components/sections/ReverseLogistics'
import { ProductConditions } from '../components/sections/ProductConditions'
import { LoadTypes } from '../components/sections/LoadTypes'
import { BuyerTypes } from '../components/sections/BuyerTypes'
import { Glossary } from '../components/sections/Glossary'
import { CompanyOverview } from '../components/sections/CompanyOverview'
import { MissionValues } from '../components/sections/MissionValues'
import { OurPlatforms } from '../components/sections/OurPlatforms'
import { LiquidateNow } from '../components/sections/LiquidateNow'
import { WeSolveReturns } from '../components/sections/WeSolveReturns'
import { WhyVia } from '../components/sections/WhyVia'
import { ProductOverview } from '../components/sections/ProductOverview'
import { TargetPrograms } from '../components/sections/TargetPrograms'
import { HomeImprovementPrograms } from '../components/sections/HomeImprovementPrograms'
import { GeneralMerchPrograms } from '../components/sections/GeneralMerchPrograms'
import { LiquidateNowOfferings } from '../components/sections/LiquidateNowOfferings'
import { QuizBlock } from '../components/interactive/QuizBlock'
import { ImagePlaceholder } from '../components/shared/ImagePlaceholder'

const contentMap: Record<string, ComponentType> = {
  'secondary-market': SecondaryMarket,
  'reverse-logistics': ReverseLogistics,
  'product-conditions': ProductConditions,
  'shipping-terms': LoadTypes,
  'buyer-types': BuyerTypes,
  'key-terminology': Glossary,
  'our-story': CompanyOverview,
  'mission-values': MissionValues,
  'our-platforms': OurPlatforms,
  'liquidatenow': LiquidateNow,
  'wesolvereturns': WeSolveReturns,
  'why-via': WhyVia,
  // Course 3 — Product Knowledge
  'product-overview': ProductOverview,
  'target-programs': TargetPrograms,
  'home-improvement-programs': HomeImprovementPrograms,
  'general-merch-programs': GeneralMerchPrograms,
  'ln-offerings': LiquidateNowOfferings,
}

const quizModules = new Set(['industry-knowledge-check', 'via-knowledge-check', 'product-knowledge-check'])

/** Maps module IDs to their hero image filenames in public/images/.
 *  Heroes always use AI-generated .png images. Real photos are used inline only. */
const moduleImageMap: Record<string, { src: string; alt: string }> = {
  // Course 1 — AI images exist
  'secondary-market': { src: 'module-channels.png', alt: 'Secondary Market Sales Channels' },
  'reverse-logistics': { src: 'module-reverse-logistics.png', alt: 'Reverse Logistics Flow' },
  'product-conditions': { src: 'module-conditions.png', alt: 'Product Conditions Spectrum' },
  'shipping-terms': { src: 'module-load-types.png', alt: 'Shipping Terms & Formats' },
  'buyer-types': { src: 'module-buyer-types.png', alt: 'Buyer Types Overview' },
  'key-terminology': { src: 'module-dealer-levels.png', alt: 'Industry Terminology & Dealer Levels' },
  // Course 2 — uses shared AI course image until unique module images are generated
  'our-story': { src: 'course-2-via-trading.png', alt: 'Via Trading: Our Story' },
  'mission-values': { src: 'course-2-via-trading.png', alt: 'Via Trading: Mission & Values' },
  'our-platforms': { src: 'course-2-via-trading.png', alt: 'Via Trading Platforms' },
  'liquidatenow': { src: 'course-2-via-trading.png', alt: 'LiquidateNow Platform' },
  'wesolvereturns': { src: 'course-2-via-trading.png', alt: 'WeSolveReturns Platform' },
  'why-via': { src: 'course-2-via-trading.png', alt: 'Why Business Owners Choose Via' },
  // Course 3 — uses shared AI course image until unique module images are generated
  'product-overview': { src: 'course-3-product.png', alt: 'Via Trading Product Categories' },
  'target-programs': { src: 'course-3-product.png', alt: 'Target Retail Programs' },
  'home-improvement-programs': { src: 'course-3-product.png', alt: 'Home Improvement Programs' },
  'general-merch-programs': { src: 'course-3-product.png', alt: 'General Merchandise Programs' },
  'ln-offerings': { src: 'course-3-product.png', alt: 'LiquidateNow Offerings' },
}

export function ModuleView() {
  const { courseId, moduleId } = useParams<{
    courseId: string
    moduleId: string
  }>()
  const navigate = useNavigate()
  const { startModule, completeModule } = useProgress()

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

  const isQuiz = moduleId ? quizModules.has(moduleId) : false

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

  /** Called by QuizBlock when the quiz is submitted */
  const handleQuizComplete = useCallback(
    (score: number, total: number) => {
      if (!courseId || !moduleId) return
      const pct = Math.round((score / total) * 100)
      completeModule(courseId, moduleId, pct)
    },
    [courseId, moduleId, completeModule],
  )

  // Determine which content to render
  const ContentComponent = contentMap[moduleId]

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

      {/* Module hero image */}
      {moduleId && moduleImageMap[moduleId] && (
        <div className="mb-6">
          <ImagePlaceholder
            src={moduleImageMap[moduleId].src}
            alt={moduleImageMap[moduleId].alt}
            aspectRatio="16:9"
          />
        </div>
      )}

      {/* Module content */}
      <div className="mb-8">
        {isQuiz ? (
          <QuizBlock quizId={moduleId} onComplete={handleQuizComplete} />
        ) : ContentComponent ? (
          <ContentComponent />
        ) : (
          <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
            <p className="text-via-text-light">Content coming soon.</p>
          </div>
        )}
      </div>

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
          <button
            onClick={() => {
              completeModule(courseId, moduleId)
              navigate(`/course/${courseId}/module/${nextModule.id}`)
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-via-orange text-white font-semibold rounded-xl hover:bg-via-orange-light transition-colors cursor-pointer"
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => {
              completeModule(courseId, moduleId)
              navigate(`/course/${courseId}`)
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-via-navy text-white font-semibold rounded-xl hover:bg-via-navy/90 transition-colors cursor-pointer"
          >
            Back to Course
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
