import { useEffect, useMemo, useCallback, lazy, Suspense, type ComponentType } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Pencil, Loader2, Construction, Lock as LockIcon } from 'lucide-react'
import { useProgress } from '../context/ProgressContext'
import { useCourses } from '../context/CoursesContext'
import { useAuth } from '../context/AuthContext'
import { useConstruction } from '../context/ConstructionContext'
import { useCourseLock } from '../hooks/useCourseLock'
import { celebrate } from '../lib/celebrate'
import { useModuleContent } from '../hooks/useModuleContent'
import { BlockRenderer } from '../components/cms/BlockRenderer'
import { QuizBlock } from '../components/interactive/QuizBlock'
import { ImagePlaceholder } from '../components/shared/ImagePlaceholder'

/** Lazy-load a named export from a section module so each lesson ships as its own chunk */
function lazySection(
  loader: () => Promise<Record<string, unknown>>,
  name: string,
): ComponentType {
  return lazy(async () => {
    const mod = await loader()
    return { default: mod[name] as ComponentType }
  })
}

// Section components are code-split: only the viewed lesson's chunk downloads.
const contentMap: Record<string, ComponentType> = {
  // Course 1 — Industry Knowledge
  'secondary-market': lazySection(() => import('../components/sections/SecondaryMarket'), 'SecondaryMarket'),
  'reverse-logistics': lazySection(() => import('../components/sections/ReverseLogistics'), 'ReverseLogistics'),
  'product-conditions': lazySection(() => import('../components/sections/ProductConditions'), 'ProductConditions'),
  'shipping-terms': lazySection(() => import('../components/sections/LoadTypes'), 'LoadTypes'),
  'buyer-types': lazySection(() => import('../components/sections/BuyerTypes'), 'BuyerTypes'),
  'key-terminology': lazySection(() => import('../components/sections/Glossary'), 'Glossary'),
  // Course 2 — Who Is Via Trading
  'our-story': lazySection(() => import('../components/sections/CompanyOverview'), 'CompanyOverview'),
  'mission-values': lazySection(() => import('../components/sections/MissionValues'), 'MissionValues'),
  'our-platforms': lazySection(() => import('../components/sections/OurPlatforms'), 'OurPlatforms'),
  'liquidatenow': lazySection(() => import('../components/sections/LiquidateNow'), 'LiquidateNow'),
  'wesolvereturns': lazySection(() => import('../components/sections/WeSolveReturns'), 'WeSolveReturns'),
  'why-via': lazySection(() => import('../components/sections/WhyVia'), 'WhyVia'),
  // Course 3 — Product Knowledge
  'product-overview': lazySection(() => import('../components/sections/ProductOverview'), 'ProductOverview'),
  'target-programs': lazySection(() => import('../components/sections/TargetPrograms'), 'TargetPrograms'),
  'walmart-programs': lazySection(() => import('../components/sections/WalmartPrograms'), 'WalmartPrograms'),
  'home-depot-programs': lazySection(() => import('../components/sections/HomeDepotPrograms'), 'HomeDepotPrograms'),
  'amazon-programs': lazySection(() => import('../components/sections/AmazonPrograms'), 'AmazonPrograms'),
  'wayfair-programs': lazySection(() => import('../components/sections/WayfairPrograms'), 'WayfairPrograms'),
  'zappos-programs': lazySection(() => import('../components/sections/ZapposPrograms'), 'ZapposPrograms'),
  'sams-club-programs': lazySection(() => import('../components/sections/SamsClubPrograms'), 'SamsClubPrograms'),
  'other-programs': lazySection(() => import('../components/sections/OtherPrograms'), 'OtherPrograms'),
  'ln-offerings': lazySection(() => import('../components/sections/LiquidateNowOfferings'), 'LiquidateNowOfferings'),
  // Course 4 — Consultative Sales
  'consultative-mindset': lazySection(() => import('../components/sections/ConsultativeMindset'), 'ConsultativeMindset'),
  'asking-right-questions': lazySection(() => import('../components/sections/AskingRightQuestions'), 'AskingRightQuestions'),
  'listening-beyond-words': lazySection(() => import('../components/sections/ListeningBeyondWords'), 'ListeningBeyondWords'),
  'know-your-patients': lazySection(() => import('../components/sections/KnowYourPatients'), 'KnowYourPatients'),
  'five-step-method': lazySection(() => import('../components/sections/FiveStepMethod'), 'FiveStepMethod'),
  'when-patients-push-back': lazySection(() => import('../components/sections/WhenPatientsPushBack'), 'WhenPatientsPushBack'),
  'art-of-the-close': lazySection(() => import('../components/sections/ArtOfTheClose'), 'ArtOfTheClose'),
  'transaction-to-partnership': lazySection(() => import('../components/sections/TransactionToPartnership'), 'TransactionToPartnership'),
  'triage-and-diagnosis': lazySection(() => import('../components/sections/TriageAndDiagnosis'), 'TriageAndDiagnosis'),
  // Course 5 — BDR Role Training
  'bdr-role-overview': lazySection(() => import('../components/sections/BdrRoleOverview'), 'BdrRoleOverview'),
  'bdr-daily-workflow': lazySection(() => import('../components/sections/BdrDailyWorkflow'), 'BdrDailyWorkflow'),
  'bdr-opening-calls': lazySection(() => import('../components/sections/BdrOpeningCalls'), 'BdrOpeningCalls'),
  'bdr-discovery-framework': lazySection(() => import('../components/sections/BdrDiscoveryFramework'), 'BdrDiscoveryFramework'),
  'bdr-objections-routing': lazySection(() => import('../components/sections/BdrObjectionsRouting'), 'BdrObjectionsRouting'),
  'bdr-tools-hubspot': lazySection(() => import('../components/sections/BdrToolsHubspot'), 'BdrToolsHubspot'),
  'bdr-follow-ups': lazySection(() => import('../components/sections/BdrFollowUps'), 'BdrFollowUps'),
}

const quizModules = new Set(['industry-knowledge-check', 'via-knowledge-check', 'product-knowledge-check', 'sales-philosophy-quiz', 'tools-systems-quiz', 'bdr-role-quiz'])

/** Maps module IDs to their hero image filenames in public/images/.
 *  Course 1 uses AI-generated .png images. Courses 2-4 use company photos and stock images. */
const moduleImageMap: Record<string, { src: string; alt: string }> = {
  // Course 1 — AI images exist
  'secondary-market': { src: 'module-channels.png', alt: 'Secondary Market Sales Channels' },
  'reverse-logistics': { src: 'module-reverse-logistics.png', alt: 'Reverse Logistics Flow' },
  'product-conditions': { src: 'module-conditions.png', alt: 'Product Conditions Spectrum' },
  // shipping-terms: hero removed — same image appears inside the LoadTypes component
  'buyer-types': { src: 'module-buyer-types.png', alt: 'Buyer Types Overview' },
  'key-terminology': { src: 'module-dealer-levels.png', alt: 'Industry Terminology & Dealer Levels' },
  // Course 2 — Via Trading
  'mission-values': { src: 'via-office-team.jpg', alt: 'Via Trading Office Team' },
  'our-platforms': { src: 'module-our-platforms.jpg', alt: 'E-Commerce Technology' },
  'liquidatenow': { src: 'module-liquidatenow.png', alt: 'LiquidateNow — Liquidate Your Inventory' },
  'wesolvereturns': { src: 'module-wesolvereturns.jpg', alt: 'Returns and Logistics' },
  'why-via': { src: 'via-sales-team.jpg', alt: 'Via Trading Sales Team' },
  // Course 3 — Product Knowledge
  'product-overview': { src: 'module-product-overview.jpg', alt: 'Warehouse Product Shelves' },
  'target-programs': { src: 'module-target-programs.jpg', alt: 'Target Store Exterior' },
  'walmart-programs': { src: 'module-walmart-programs.jpg', alt: 'Walmart Store Exterior' },
  'home-depot-programs': { src: 'module-home-depot-programs.jpg', alt: 'Home Improvement Store Interior' },
  'amazon-programs': { src: 'module-amazon-programs.jpg', alt: 'Package Delivery' },
  'wayfair-programs': { src: 'module-wayfair-programs.jpg', alt: 'Furniture Showroom' },
  'zappos-programs': { src: 'module-zappos-programs.jpg', alt: 'Shoe Display' },
  'sams-club-programs': { src: 'module-sams-club-programs.jpg', alt: 'Wholesale Warehouse' },
  'other-programs': { src: 'module-other-programs.jpg', alt: 'Retail Merchandise' },
  'ln-offerings': { src: 'module-ln-offerings.jpg', alt: 'Digital Marketplace' },
  // Course 4 — Consultative Sales
  'consultative-mindset': { src: 'module-consultative-mindset.jpg', alt: 'Question Marks — The Consultative Mindset' },
  'asking-right-questions': { src: 'module-asking-right-questions.jpg', alt: 'Stethoscope — Your Questions Are Your Diagnostic Tool' },
  'listening-beyond-words': { src: 'module-listening-beyond-words.jpg', alt: 'Doctor Listening to Patient' },
  'know-your-patients': { src: 'module-know-your-patients.jpg', alt: 'Medical Records and Charts' },
  'five-step-method': { src: 'module-five-step-method.jpg', alt: 'The Number 5' },
  'when-patients-push-back': { src: 'module-when-patients-push-back.jpg', alt: 'Doctor-Patient Conversation' },
  'art-of-the-close': { src: 'module-art-of-the-close.jpg', alt: 'Professional Handshake' },
  'transaction-to-partnership': { src: 'module-transaction-to-partnership.jpg', alt: 'Tying the Knot — From Transaction to Partnership' },
  'triage-and-diagnosis': { src: 'module-triage-and-diagnosis.jpg', alt: 'Customer Service Team' },
  // Course 5 — BDR Role Training
  'bdr-role-overview': { src: 'module-bdr-role-overview.jpg', alt: 'Business Development Representative at Work' },
  'bdr-daily-workflow': { src: 'module-bdr-daily-workflow.jpg', alt: 'Organized Desk with Planner and Computer' },
  'bdr-opening-calls': { src: 'module-bdr-opening-calls.jpg', alt: 'Professional Making a Phone Call' },
  'bdr-discovery-framework': { src: 'module-bdr-discovery-framework.jpg', alt: 'Magnifying Glass Over Data' },
  'bdr-objections-routing': { src: 'module-bdr-objections-routing.jpg', alt: 'Signpost with Multiple Directions' },
  'bdr-tools-hubspot': { src: 'module-bdr-tools-hubspot.jpg', alt: 'CRM Dashboard on Screen' },
  'bdr-follow-ups': { src: 'module-bdr-follow-ups.jpg', alt: 'Calendar and Checklist' },
  // Course 6 — Tools & Systems
  'erp-overview': { src: 'module-erp-overview.jpg', alt: 'Enterprise Resource Planning Dashboard' },
  'hubspot-overview': { src: 'module-hubspot-overview.jpg', alt: 'CRM Dashboard and Analytics' },
  'aircall-overview': { src: 'module-aircall-overview.jpg', alt: 'Professional Using Headset for Calls' },
  'communication-tools': { src: 'module-communication-tools.jpg', alt: 'Team Collaboration and Messaging' },
  'social-outreach': { src: 'module-social-outreach.jpg', alt: 'Social Media Networking' },
  'ai-tools': { src: 'module-ai-tools.jpg', alt: 'AI Technology and Workflow Automation' },
}

export function ModuleView() {
  const { courseId, moduleId } = useParams<{
    courseId: string
    moduleId: string
  }>()
  const navigate = useNavigate()
  const { startModule, completeModule, logQuizAttempt, getModuleStatus } = useProgress()
  const { user, isAdmin, isLeadership } = useAuth()
  const { isUnderConstruction, getConstructionMessage } = useConstruction()
  const { getCourseById } = useCourses()
  const canBypass = isAdmin || isLeadership

  const course = courseId ? getCourseById(courseId) : undefined
  const isModuleConstruction = moduleId ? isUnderConstruction('module', moduleId) : false
  const moduleConstructionMsg = moduleId ? getConstructionMessage('module', moduleId) : null

  // Sequential course gating — blocks direct module URLs in locked courses
  const { getCourseLock, overridesLoaded } = useCourseLock()
  const courseLock = courseId ? getCourseLock(courseId) : { locked: false }
  const isCourseLocked = overridesLoaded && courseLock.locked

  // CMS content — fetched for ALL modules (lesson + quiz)
  const isQuizModule = moduleId ? quizModules.has(moduleId) : false
  const { content: cmsContent, loading: cmsLoading, isPublished: cmsIsPublished } = useModuleContent(
    courseId,
    moduleId,
    user?.id,
  )

  // STAGING MODE: when true, draft CMS content takes priority over hardcoded TSX.
  // MUST stay false in deployed code — drafts are works-in-progress and must never
  // show to learners. Use the CMS editor's Preview mode to review drafts instead.
  const STAGING_PREVIEW = false

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

  const isQuiz = isQuizModule

  useEffect(() => {
    // Don't mark a module as started if its course is locked for this user
    if (courseId && moduleId && currentModule && !isCourseLocked) {
      startModule(courseId, moduleId)
    }
  }, [courseId, moduleId, currentModule, startModule, isCourseLocked])

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

  // Course is sequentially locked — block module access entirely
  if (isCourseLocked) {
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
          <LockIcon className="w-12 h-12 text-via-text-light mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-via-navy mb-2">Course Locked</h1>
          <p className="text-sm text-via-text-light mb-6">
            {courseLock.blockedBy
              ? `Complete "${courseLock.blockedBy.title}" before starting this course.`
              : 'Complete the previous courses in your program first.'}
          </p>
          {courseLock.blockedBy && (
            <Link
              to={`/course/${courseLock.blockedBy.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-via-orange text-white font-bold rounded-xl hover:bg-via-orange-light transition-colors shadow-lg"
            >
              Go to {courseLock.blockedBy.title}
            </Link>
          )}
        </div>
      </div>
    )
  }

  /** Called by QuizBlock only when the quiz is PASSED */
  const handleQuizComplete = useCallback(
    (score: number, total: number) => {
      if (!courseId || !moduleId) return
      const pct = Math.round((score / total) * 100)
      completeModule(courseId, moduleId, pct)
    },
    [courseId, moduleId, completeModule],
  )

  /** Called by QuizBlock on every submission (pass or fail) for activity logging */
  const handleQuizAttempt = useCallback(
    (score: number, total: number) => {
      if (!courseId || !moduleId) return
      const pct = Math.round((score / total) * 100)
      logQuizAttempt(courseId, moduleId, pct)
    },
    [courseId, moduleId, logQuizAttempt],
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

      {/* Module under construction — block regular users */}
      {isModuleConstruction && !canBypass && (
        <div className="bg-via-card rounded-xl border border-amber-200 p-12 text-center mb-8">
          <Construction className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-via-navy mb-2">Under Construction</h2>
          <p className="text-sm text-via-text-light">
            {moduleConstructionMsg || 'This module is currently being updated and will be available soon.'}
          </p>
        </div>
      )}

      {/* Construction banner for admins/leadership */}
      {isModuleConstruction && canBypass && (
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 flex items-center gap-3 mb-6">
          <Construction className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Module Under Construction</p>
            <p className="text-xs text-amber-700">
              {moduleConstructionMsg || 'This module is marked as under construction. Regular users cannot access it.'}
            </p>
          </div>
        </div>
      )}

      {/* Module hero image */}
      {!(isModuleConstruction && !canBypass) && moduleId && moduleImageMap[moduleId] && (
        <div className="mb-6">
          <ImagePlaceholder
            src={moduleImageMap[moduleId].src}
            alt={moduleImageMap[moduleId].alt}
            aspectRatio="16:9"
          />
        </div>
      )}

      {/* Admin: Edit content button */}
      {isAdmin && !isQuiz && !(isModuleConstruction && !canBypass) && (
        <div className="mb-4">
          <Link
            to={`/content/${courseId}/${moduleId}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-via-navy bg-via-navy/10 rounded-lg hover:bg-via-navy/20 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit in CMS
          </Link>
        </div>
      )}

      {/* Module content — hidden for regular users if under construction */}
      {!(isModuleConstruction && !canBypass) && (
        <div className="mb-8">
          {isQuiz ? (
            <QuizBlock
              quizId={moduleId}
              courseId={courseId}
              onComplete={handleQuizComplete}
              onAttempt={handleQuizAttempt}
              cmsQuizData={cmsContent?.quizData}
            />
          ) : cmsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-via-navy animate-spin" />
            </div>
          ) : cmsContent && cmsIsPublished ? (
            // Published CMS content takes priority over hardcoded components
            <BlockRenderer content={cmsContent} />
          ) : STAGING_PREVIEW && cmsContent ? (
            // STAGING: Draft CMS content previewed over hardcoded TSX
            <BlockRenderer content={cmsContent} />
          ) : ContentComponent ? (
            // Fall back to hardcoded TSX component (lazy chunk)
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-6 h-6 text-via-navy animate-spin" />
                </div>
              }
            >
              <ContentComponent />
            </Suspense>
          ) : cmsContent ? (
            // Draft CMS content shown when no hardcoded component exists
            <BlockRenderer content={cmsContent} />
          ) : (
            <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
              <p className="text-via-text-light">Content coming soon.</p>
            </div>
          )}
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
          // Hide the Continue button on quiz modules for regular users —
          // they must complete the quiz (QuizBlock handles marking it complete).
          // Admins and leadership can always skip ahead.
          !(isQuiz && !canBypass) && (
            <button
              onClick={() => {
                if (getModuleStatus(courseId, moduleId) !== 'completed') {
                  celebrate(`"${currentModule.title}" completed!`)
                }
                completeModule(courseId, moduleId)
                navigate(`/course/${courseId}/module/${nextModule.id}`)
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-via-orange text-white font-semibold rounded-xl hover:bg-via-orange-light transition-colors cursor-pointer"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          )
        ) : (
          <button
            onClick={() => {
              if (getModuleStatus(courseId, moduleId) !== 'completed') {
                celebrate(`"${currentModule.title}" completed!`)
              }
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
