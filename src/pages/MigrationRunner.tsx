/**
 * Admin-only migration runner page.
 * Converts hardcoded course content to CMS draft entries in Supabase.
 *
 * Route: /admin/migrate
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Database,
  Play,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  AlertTriangle,
  Rocket,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { saveModuleContent } from '../lib/contentService'
import { supabase } from '../lib/supabase'
import {
  getEntriesByCourse,
  getAllEntries,
  MIGRATION_COURSES,
} from '../data/migration'
import type { MigrationEntry } from '../data/migration'

interface ModuleStatus {
  moduleId: string
  status: 'pending' | 'running' | 'success' | 'error' | 'skipped'
  message?: string
}

interface CourseStatus {
  courseId: string
  modules: ModuleStatus[]
  running: boolean
  done: boolean
}

export function MigrationRunner() {
  const { user, isAdmin } = useAuth()
  const [courseStatuses, setCourseStatuses] = useState<Record<string, CourseStatus>>({})
  const [runningAll, setRunningAll] = useState(false)
  const [skipExisting, setSkipExisting] = useState(true)

  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-red-50 rounded-xl border border-red-200 p-12 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-red-800 mb-2">Access Denied</h1>
          <p className="text-sm text-red-600">Only admins can access the migration runner.</p>
        </div>
      </div>
    )
  }

  /** Check if a module already has CMS content */
  async function hasExistingContent(courseId: string, moduleId: string): Promise<boolean> {
    const { data } = await supabase
      .from('module_content')
      .select('id')
      .eq('course_id', courseId)
      .eq('module_id', moduleId)
      .maybeSingle()
    return !!data
  }

  /** Migrate a single module */
  async function migrateModule(
    entry: MigrationEntry,
    userId: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Check for existing content
      if (skipExisting) {
        const exists = await hasExistingContent(entry.courseId, entry.moduleId)
        if (exists) {
          return { success: true, message: 'Skipped (content already exists)' }
        }
      }

      const result = await saveModuleContent(
        entry.courseId,
        entry.moduleId,
        entry.content,
        userId,
      )

      if (result.error) {
        return { success: false, message: result.error }
      }

      return { success: true, message: 'Migrated as draft' }
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Unknown error',
      }
    }
  }

  /** Migrate all modules for a single course */
  async function migrateCourse(courseId: string) {
    if (!user) return

    const entries = getEntriesByCourse(courseId)
    if (entries.length === 0) return

    // Initialize status
    const initialModules: ModuleStatus[] = entries.map((e) => ({
      moduleId: e.moduleId,
      status: 'pending',
    }))

    setCourseStatuses((prev) => ({
      ...prev,
      [courseId]: { courseId, modules: initialModules, running: true, done: false },
    }))

    // Migrate sequentially
    const updatedModules = [...initialModules]

    for (let i = 0; i < entries.length; i++) {
      // Mark current as running
      updatedModules[i] = { ...updatedModules[i], status: 'running' }
      setCourseStatuses((prev) => ({
        ...prev,
        [courseId]: { courseId, modules: [...updatedModules], running: true, done: false },
      }))

      const result = await migrateModule(entries[i], user.id)

      updatedModules[i] = {
        moduleId: entries[i].moduleId,
        status: result.message.includes('Skipped') ? 'skipped' : result.success ? 'success' : 'error',
        message: result.message,
      }

      setCourseStatuses((prev) => ({
        ...prev,
        [courseId]: { courseId, modules: [...updatedModules], running: true, done: false },
      }))
    }

    // Mark course as done
    setCourseStatuses((prev) => ({
      ...prev,
      [courseId]: { courseId, modules: updatedModules, running: false, done: true },
    }))
  }

  /** Migrate all courses */
  async function migrateAll() {
    setRunningAll(true)
    for (const course of MIGRATION_COURSES) {
      await migrateCourse(course.id)
    }
    setRunningAll(false)
  }

  const totalEntries = getAllEntries().length
  const totalMigrated = Object.values(courseStatuses).reduce(
    (sum, cs) => sum + cs.modules.filter((m) => m.status === 'success').length,
    0,
  )
  const totalSkipped = Object.values(courseStatuses).reduce(
    (sum, cs) => sum + cs.modules.filter((m) => m.status === 'skipped').length,
    0,
  )
  const totalErrors = Object.values(courseStatuses).reduce(
    (sum, cs) => sum + cs.modules.filter((m) => m.status === 'error').length,
    0,
  )

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/admin"
          className="text-via-text-light hover:text-via-navy transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6 text-via-orange" />
          <h1 className="text-lg font-bold text-via-navy">CMS Content Migration</h1>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-sky-50 rounded-lg border border-sky-200 p-4 mb-6">
        <p className="text-sm text-sky-700 leading-relaxed">
          This tool converts hardcoded course content into CMS-editable draft entries in Supabase.
          All content is saved as <strong>draft</strong> — it will not affect production until published.
          The hardcoded TSX components remain as a fallback.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-semibold text-via-navy">
              {totalEntries} modules across {MIGRATION_COURSES.length} courses
            </p>
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={skipExisting}
                onChange={(e) => setSkipExisting(e.target.checked)}
                className="rounded border-via-border text-via-orange focus:ring-via-orange"
              />
              <span className="text-xs text-via-text-light">
                Skip modules that already have CMS content
              </span>
            </label>
          </div>
          <button
            onClick={migrateAll}
            disabled={runningAll}
            className="flex items-center gap-2 px-4 py-2 bg-via-orange text-white text-sm font-semibold rounded-lg hover:bg-via-orange/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {runningAll ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Rocket className="w-4 h-4" />
            )}
            Migrate All Courses
          </button>
        </div>

        {/* Stats summary */}
        {(totalMigrated > 0 || totalSkipped > 0 || totalErrors > 0) && (
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-via-border">
            <span className="text-xs text-emerald-600 font-medium">
              {totalMigrated} migrated
            </span>
            <span className="text-xs text-amber-600 font-medium">
              {totalSkipped} skipped
            </span>
            {totalErrors > 0 && (
              <span className="text-xs text-red-600 font-medium">
                {totalErrors} errors
              </span>
            )}
          </div>
        )}
      </div>

      {/* Course cards */}
      <div className="space-y-4">
        {MIGRATION_COURSES.map((course) => {
          const status = courseStatuses[course.id]
          const isRunning = status?.running ?? false
          const isDone = status?.done ?? false

          return (
            <div
              key={course.id}
              className="bg-via-card rounded-xl border border-via-border overflow-hidden"
            >
              {/* Course header */}
              <div className="flex items-center justify-between p-4 border-b border-via-border">
                <div>
                  <p className="text-sm font-semibold text-via-navy">{course.title}</p>
                  <p className="text-xs text-via-text-light">
                    {course.moduleCount} modules • {course.id}
                  </p>
                </div>
                <button
                  onClick={() => migrateCourse(course.id)}
                  disabled={isRunning || runningAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-via-bg-subtle border-via-border text-via-navy hover:bg-via-card-hover"
                >
                  {isRunning ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : isDone ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                  {isRunning ? 'Running...' : isDone ? 'Done' : 'Migrate'}
                </button>
              </div>

              {/* Module statuses */}
              {status && status.modules.length > 0 && (
                <div className="p-3">
                  <div className="space-y-1">
                    {status.modules.map((mod) => (
                      <div
                        key={mod.moduleId}
                        className="flex items-center justify-between py-1.5 px-2 rounded text-xs"
                      >
                        <span className="text-via-text font-medium truncate">
                          {mod.moduleId}
                        </span>
                        <span className="flex items-center gap-1 shrink-0">
                          {mod.status === 'pending' && (
                            <span className="text-via-text-light">Pending</span>
                          )}
                          {mod.status === 'running' && (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin text-sky-500" />
                              <span className="text-sky-600">Running</span>
                            </>
                          )}
                          {mod.status === 'success' && (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-600">{mod.message}</span>
                            </>
                          )}
                          {mod.status === 'skipped' && (
                            <>
                              <CheckCircle className="w-3 h-3 text-amber-500" />
                              <span className="text-amber-600">{mod.message}</span>
                            </>
                          )}
                          {mod.status === 'error' && (
                            <>
                              <XCircle className="w-3 h-3 text-red-500" />
                              <span className="text-red-600">{mod.message}</span>
                            </>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
