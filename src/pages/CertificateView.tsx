import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Printer, GraduationCap, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCourses } from '../context/CoursesContext'
import { useProgress } from '../context/ProgressContext'
import { supabase } from '../lib/supabase'

/**
 * Print-friendly certificate page at /certificate/:courseId.
 * Use courseId "program" for the full-program certificate.
 * Rendered outside AppShell so printing has no app chrome.
 */
export function CertificateView() {
  const { courseId } = useParams<{ courseId: string }>()
  const { user } = useAuth()
  const { courses, getProgramForUser, getCourseById } = useCourses()
  const { getCourseProgress } = useProgress()

  const isProgram = courseId === 'program'
  const program = getProgramForUser(user?.programId)
  const course = !isProgram && courseId ? getCourseById(courseId) : undefined

  const [completionDate, setCompletionDate] = useState<string | null>(null)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  // Earned check — certificate only renders for actually-completed work
  const earned = isProgram
    ? (program?.courseIds ?? [])
        .map((id) => courses.find((c) => c.id === id))
        .filter((c) => c && c.status === 'available')
        .every((c) => getCourseProgress(c!.id).percentage === 100)
    : course
      ? getCourseProgress(course.id).percentage === 100
      : false

  // Fetch completion date (latest completed_at) and quiz score
  useEffect(() => {
    if (!user?.id || !earned) {
      setLoading(false)
      return
    }
    let query = supabase
      .from('module_progress')
      .select('course_id, module_id, completed_at, score')
      .eq('user_id', user.id)
      .eq('status', 'completed')
    if (!isProgram && courseId) {
      query = query.eq('course_id', courseId)
    }
    query.then(({ data }) => {
      if (data && data.length > 0) {
        const latest = data.reduce(
          (max, r) => (r.completed_at && r.completed_at > max ? r.completed_at : max),
          '',
        )
        setCompletionDate(latest || null)
        if (!isProgram && course) {
          const quizModule = course.modules.find((m) => m.contentType === 'quiz')
          if (quizModule) {
            const row = data.find((r) => r.module_id === quizModule.id)
            setQuizScore(row?.score ?? null)
          }
        }
      }
      setLoading(false)
    })
  }, [user?.id, earned, isProgram, courseId, course])

  if (loading) {
    return (
      <div className="min-h-screen bg-via-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-via-navy animate-spin" />
      </div>
    )
  }

  if (!user || !earned || (!course && !isProgram)) {
    return (
      <div className="min-h-screen bg-via-bg flex items-center justify-center px-4">
        <div className="text-center">
          <GraduationCap className="w-12 h-12 text-via-text-light mx-auto mb-4" />
          <h1 className="text-xl font-bold text-via-navy mb-2">Certificate Not Available</h1>
          <p className="text-sm text-via-text-light mb-6">
            This certificate hasn't been earned yet. Complete the course to unlock it.
          </p>
          <Link to="/" className="text-sm font-medium text-via-orange hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const title = isProgram ? (program?.title ?? 'Training Program') : course!.title
  const dateStr = completionDate
    ? new Date(completionDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div className="min-h-screen bg-via-bg py-8 px-4 print:bg-white print:py-0">
      {/* Screen-only controls */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-via-text-light hover:text-via-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-via-navy text-white text-sm font-semibold hover:bg-via-navy-light transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Print Certificate
        </button>
      </div>

      {/* The certificate */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl border-4 border-double border-via-navy p-10 sm:p-14 text-center shadow-lg print:shadow-none print:rounded-none print:border-8 print:max-w-none">
        {/* Logo / brand */}
        <img
          src={`${import.meta.env.BASE_URL}images/via-academy-hero.png`}
          alt="VIAcademy"
          className="w-16 h-16 rounded-2xl object-cover mx-auto mb-4"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            target.nextElementSibling?.classList.remove('hidden')
          }}
        />
        <div className="hidden w-14 h-14 bg-via-navy rounded-2xl items-center justify-center mx-auto mb-4 flex">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>

        <p className="text-sm font-bold text-via-orange uppercase tracking-[0.3em] mb-2">
          VIAcademy
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-via-navy mb-1">
          Certificate of Completion
        </h1>
        <div className="w-24 h-0.5 bg-via-orange mx-auto my-5" />

        <p className="text-sm text-via-text-light mb-3">This certifies that</p>
        <p className="text-3xl sm:text-4xl font-bold text-via-navy mb-3 font-serif">
          {user.name}
        </p>
        <p className="text-sm text-via-text-light mb-3">
          has successfully completed {isProgram ? 'the training program' : 'the course'}
        </p>
        <p className="text-xl sm:text-2xl font-semibold text-via-navy mb-6">{title}</p>

        {quizScore !== null && (
          <p className="text-sm text-via-text-light mb-2">
            Final exam score: <span className="font-semibold text-via-navy">{quizScore}%</span>
          </p>
        )}
        <p className="text-sm text-via-text-light mb-10">Completed on {dateStr}</p>

        <div className="flex items-end justify-between max-w-md mx-auto">
          <div className="text-center">
            <div className="w-40 border-b border-via-text-light/40 mb-1.5" />
            <p className="text-xs text-via-text-light">Via Trading Corporation</p>
          </div>
          <div className="text-center">
            <div className="w-40 border-b border-via-text-light/40 mb-1.5" />
            <p className="text-xs text-via-text-light">Date: {dateStr}</p>
          </div>
        </div>

        <p className="text-[10px] text-via-text-light/60 mt-10">
          Via Trading &middot; VIAcademy Training Platform &middot; Internal Certification
        </p>
      </div>
    </div>
  )
}
