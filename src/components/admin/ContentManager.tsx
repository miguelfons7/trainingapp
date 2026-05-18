import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
  Pencil,
  CheckCircle,
  Clock,
  Minus,
  Loader2,
  ChevronDown,
  ChevronRight,
  Layers,
} from 'lucide-react'
import { courses } from '../../data/courses'
import { supabase } from '../../lib/supabase'
import { hardcodedModuleIds } from '../../data/hardcodedModules'

interface ContentStatus {
  courseId: string
  moduleId: string
  status: 'draft' | 'published'
  version: number
  updatedAt: string
}

export function ContentManager() {
  const [statusMap, setStatusMap] = useState<Map<string, ContentStatus>>(new Map())
  const [loading, setLoading] = useState(true)
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(
    new Set(courses.filter((c) => c.status === 'available').map((c) => c.id)),
  )

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('module_content')
        .select('course_id, module_id, status, version, updated_at')

      const map = new Map<string, ContentStatus>()
      for (const row of data ?? []) {
        const key = `${row.course_id}::${row.module_id}`
        map.set(key, {
          courseId: row.course_id,
          moduleId: row.module_id,
          status: row.status as 'draft' | 'published',
          version: row.version,
          updatedAt: row.updated_at,
        })
      }
      setStatusMap(map)
      setLoading(false)
    }
    load()
  }, [])

  function toggleCourse(courseId: string) {
    setExpandedCourses((prev) => {
      const next = new Set(prev)
      if (next.has(courseId)) {
        next.delete(courseId)
      } else {
        next.add(courseId)
      }
      return next
    })
  }

  // Stats
  const totalModules = courses.reduce((acc, c) => acc + c.modules.length, 0)
  const withCms = statusMap.size
  const published = [...statusMap.values()].filter((s) => s.status === 'published').length
  const drafts = withCms - published

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-via-navy animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-via-card rounded-xl border border-via-border p-4 text-center">
          <p className="text-2xl font-bold text-via-navy">{totalModules}</p>
          <p className="text-xs text-via-text-light">Total Modules</p>
        </div>
        <div className="bg-via-card rounded-xl border border-via-border p-4 text-center">
          <p className="text-2xl font-bold text-via-navy">{withCms}</p>
          <p className="text-xs text-via-text-light">With CMS Content</p>
        </div>
        <div className="bg-via-card rounded-xl border border-via-border p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{published}</p>
          <p className="text-xs text-via-text-light">Published</p>
        </div>
        <div className="bg-via-card rounded-xl border border-via-border p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{drafts}</p>
          <p className="text-xs text-via-text-light">Drafts</p>
        </div>
      </div>

      {/* Course list */}
      <div className="space-y-3">
        {courses.map((course) => {
          const isExpanded = expandedCourses.has(course.id)
          const courseModuleStatuses = course.modules.map((m) => {
            const key = `${course.id}::${m.id}`
            return { module: m, cms: statusMap.get(key) }
          })
          const cmsCount = courseModuleStatuses.filter((s) => s.cms).length

          return (
            <div
              key={course.id}
              className="bg-via-card rounded-xl border border-via-border overflow-hidden"
            >
              {/* Course header */}
              <button
                onClick={() => toggleCourse(course.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-via-bg-subtle/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-via-text-light" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-via-text-light" />
                  )}
                  <div className="text-left">
                    <p className="text-sm font-semibold text-via-navy">{course.title}</p>
                    <p className="text-[10px] text-via-text-light">
                      {course.modules.length} modules &middot; {cmsCount} with CMS content
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    course.status === 'available'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {course.status === 'available' ? 'Available' : 'Coming Soon'}
                </span>
              </button>

              {/* Module list */}
              {isExpanded && (
                <div className="border-t border-via-border">
                  {course.modules.map((mod) => {
                    const key = `${course.id}::${mod.id}`
                    const cms = statusMap.get(key)
                    const isQuiz = mod.contentType === 'quiz'

                    return (
                      <div
                        key={mod.id}
                        className="flex items-center justify-between px-4 py-2.5 border-b border-via-border last:border-b-0 hover:bg-via-bg-subtle/30 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="w-3.5 h-3.5 text-via-text-light shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-via-text truncate">
                              {mod.title}
                            </p>
                            <p className="text-[10px] text-via-text-light">
                              {mod.estimatedTime} &middot; {mod.contentType}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* CMS status badge */}
                          {cms ? (
                            cms.status === 'published' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                                <CheckCircle className="w-3 h-3" />
                                v{cms.version}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                                <Clock className="w-3 h-3" />
                                Draft
                              </span>
                            )
                          ) : isQuiz ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold">
                              <Minus className="w-3 h-3" />
                              Quiz
                            </span>
                          ) : hardcodedModuleIds.has(mod.id) ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                              <Layers className="w-3 h-3" />
                              Built-in
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold">
                              <Minus className="w-3 h-3" />
                              No CMS
                            </span>
                          )}

                          {/* Edit button */}
                          {!isQuiz && (
                            <Link
                              to={`/admin/content/${course.id}/${mod.id}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-via-navy bg-via-navy/10 rounded-md hover:bg-via-navy/20 transition-colors"
                            >
                              <Pencil className="w-3 h-3" />
                              Edit
                            </Link>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
