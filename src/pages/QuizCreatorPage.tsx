import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardCheck, Shield, Loader2, BookOpen, Edit3, Plus, CheckCircle, Clock, FileQuestion } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCourses } from '../context/CoursesContext'
import { supabase } from '../lib/supabase'
import { createBlankQuizContent } from '../lib/contentService'

interface ModuleContentStatus {
  courseId: string
  moduleId: string
  status: string | null // null = no CMS content
  hasQuizData: boolean
}

export function QuizCreatorPage() {
  const { user, isAdmin } = useAuth()
  const { courses, loading: coursesLoading } = useCourses()
  const [contentStatuses, setContentStatuses] = useState<Map<string, ModuleContentStatus>>(new Map())
  const [loading, setLoading] = useState(true)
  const [creatingId, setCreatingId] = useState<string | null>(null)

  // Fetch CMS status for all quiz modules
  useEffect(() => {
    async function fetchStatuses() {
      const { data, error } = await supabase
        .from('module_content')
        .select('course_id, module_id, status, content')

      if (error) {
        console.error('Failed to fetch content statuses:', error)
        setLoading(false)
        return
      }

      const map = new Map<string, ModuleContentStatus>()
      for (const row of data ?? []) {
        const content = row.content as Record<string, unknown> | null
        const hasQuizData = !!(content && typeof content === 'object' && 'quizData' in content && content.quizData)
        map.set(`${row.course_id}/${row.module_id}`, {
          courseId: row.course_id,
          moduleId: row.module_id,
          status: row.status,
          hasQuizData,
        })
      }
      setContentStatuses(map)
      setLoading(false)
    }

    fetchStatuses()
  }, [])

  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
          <Shield className="w-12 h-12 text-via-danger mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-via-navy mb-2">Access Restricted</h1>
          <p className="text-sm text-via-text-light">Only admins can access the quiz creator.</p>
        </div>
      </div>
    )
  }

  if (coursesLoading || loading) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-via-navy animate-spin" />
        </div>
      </div>
    )
  }

  // Gather all quiz-type modules across courses
  const quizModules = courses.flatMap((course) =>
    course.modules
      .filter((m) => m.contentType === 'quiz')
      .map((m) => ({
        course,
        module: m,
        key: `${course.id}/${m.id}`,
      })),
  )

  // Also find modules that have quizData even if not quiz-type
  const modulesWithQuizData = courses.flatMap((course) =>
    course.modules
      .filter((m) => {
        if (m.contentType === 'quiz') return false // already in quizModules
        const key = `${course.id}/${m.id}`
        return contentStatuses.get(key)?.hasQuizData
      })
      .map((m) => ({
        course,
        module: m,
        key: `${course.id}/${m.id}`,
      })),
  )

  async function handleCreateQuizContent(courseId: string, moduleId: string, title: string) {
    if (!user) return
    setCreatingId(`${courseId}/${moduleId}`)

    const accentColor =
      courseId === 'intro-to-industry' ? 'border-blue-500' :
      courseId === 'who-is-via' ? 'border-orange-500' :
      courseId === 'product-knowledge' ? 'border-red-500' :
      courseId === 'sales-philosophy' ? 'border-teal-500' :
      courseId === 'bdr-role' ? 'border-sky-500' :
      'border-blue-500'

    const result = await createBlankQuizContent(courseId, moduleId, title, accentColor, user.id)
    if (!result.error) {
      // Update local state
      setContentStatuses((prev) => {
        const next = new Map(prev)
        next.set(`${courseId}/${moduleId}`, {
          courseId,
          moduleId,
          status: 'draft',
          hasQuizData: true,
        })
        return next
      })
    }
    setCreatingId(null)
  }

  function StatusBadge({ courseId, moduleId }: { courseId: string; moduleId: string }) {
    const key = `${courseId}/${moduleId}`
    const status = contentStatuses.get(key)

    if (!status) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-slate-100 text-slate-500">
          <FileQuestion className="w-3 h-3" />
          No Content
        </span>
      )
    }

    if (status.status === 'published') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle className="w-3 h-3" />
          Published
        </span>
      )
    }

    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-amber-100 text-amber-700">
        <Clock className="w-3 h-3" />
        Draft
      </span>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-via-navy flex items-center justify-center">
          <ClipboardCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-via-navy">Quiz Creator</h1>
          <p className="text-sm text-via-text-light">Manage end-of-course quizzes and module quiz data</p>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-700">
          <strong>How it works:</strong> Each quiz module's content is managed through the CMS editor.
          Click "Edit Quiz" to open the block editor where you can configure term matching, multiple choice,
          and fill-in-the-blank questions. Quizzes need 85% to pass by default.
        </p>
      </div>

      {/* Quiz modules table */}
      <div className="bg-via-card rounded-xl border border-via-border overflow-hidden mb-8">
        <div className="px-5 py-4 border-b border-via-border">
          <h2 className="text-sm font-semibold text-via-navy uppercase tracking-wide">
            End-of-Course Quizzes ({quizModules.length})
          </h2>
        </div>

        {quizModules.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-via-text-light">No quiz modules found.</p>
          </div>
        ) : (
          <div className="divide-y divide-via-border">
            {quizModules.map(({ course, module: mod, key }) => {
              const hasContent = contentStatuses.has(key)
              const isCreating = creatingId === key

              return (
                <div key={key} className="flex items-center gap-4 px-5 py-4 hover:bg-via-card-hover transition-colors">
                  <BookOpen className="w-4 h-4 text-via-text-light shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-via-navy">{mod.title}</p>
                    <p className="text-[11px] text-via-text-light">{course.title}</p>
                  </div>
                  <StatusBadge courseId={course.id} moduleId={mod.id} />
                  {hasContent ? (
                    <Link
                      to={`/content/${course.id}/${mod.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-via-navy bg-via-navy/10 rounded-lg hover:bg-via-navy/20 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Quiz
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleCreateQuizContent(course.id, mod.id, mod.title)}
                      disabled={isCreating}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-via-orange rounded-lg hover:bg-via-orange-light transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isCreating ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                      Create Quiz Content
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modules with quiz data (non-quiz type) */}
      {modulesWithQuizData.length > 0 && (
        <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
          <div className="px-5 py-4 border-b border-via-border">
            <h2 className="text-sm font-semibold text-via-navy uppercase tracking-wide">
              Modules with Mini-Quizzes ({modulesWithQuizData.length})
            </h2>
            <p className="text-[11px] text-via-text-light mt-0.5">
              Lesson modules that also have quiz data attached
            </p>
          </div>

          <div className="divide-y divide-via-border">
            {modulesWithQuizData.map(({ course, module: mod, key }) => (
              <div key={key} className="flex items-center gap-4 px-5 py-4 hover:bg-via-card-hover transition-colors">
                <BookOpen className="w-4 h-4 text-via-text-light shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-via-navy">{mod.title}</p>
                  <p className="text-[11px] text-via-text-light">{course.title}</p>
                </div>
                <StatusBadge courseId={course.id} moduleId={mod.id} />
                <Link
                  to={`/content/${course.id}/${mod.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-via-navy bg-via-navy/10 rounded-lg hover:bg-via-navy/20 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Content
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
