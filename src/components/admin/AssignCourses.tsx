import { useState, useEffect, useCallback } from 'react'
import { Check, X, UserPlus, BookOpen, Loader2, KeyRound, Lock, Unlock, CheckCircle2 } from 'lucide-react'
import { useCourses } from '../../context/CoursesContext'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import type { Profile, CourseAssignment, CourseUnlockOverrideRow, ModuleProgressRow } from '../../types/database'
import type { Course } from '../../types'

export function AssignCourses() {
  const { user } = useAuth()
  const { courses, programs } = useCourses()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [assignments, setAssignments] = useState<(CourseAssignment & { userName: string; courseName: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
  const [showUserList, setShowUserList] = useState(false)
  const [saving, setSaving] = useState(false)
  const [assignMsg, setAssignMsg] = useState('')

  const loadData = useCallback(async () => {
    const [profilesRes, assignmentsRes] = await Promise.all([
      supabase.from('profiles').select('*').order('full_name'),
      supabase.from('course_assignments').select('*').order('assigned_at', { ascending: false }),
    ])

    const allProfiles = profilesRes.data ?? []
    setProfiles(allProfiles)

    // Enrich assignments with user names and course names
    const enriched = (assignmentsRes.data ?? []).map((a) => {
      const profile = allProfiles.find((p) => p.id === a.user_id)
      const course = courses.find((c) => c.id === a.course_id)
      return {
        ...a,
        userName: profile?.full_name ?? 'Unknown',
        courseName: course?.title ?? a.course_id,
      }
    })

    setAssignments(enriched)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const assignableUsers = profiles

  function toggleUser(id: string) {
    setSelectedUsers((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function handleAssign() {
    if (!selectedCourse || selectedUsers.size === 0 || !user) return

    setSaving(true)
    setAssignMsg('')

    // Program assignment writes to user_programs — this is what actually scopes
    // a user's dashboard (which courses they see). Bulk-assign to all selected users.
    if (selectedCourse.startsWith('program:')) {
      const programId = selectedCourse.slice('program:'.length)
      const programTitle = programs.find((p) => p.id === programId)?.title ?? programId
      const rows = [...selectedUsers].map((userId) => ({
        user_id: userId,
        program_id: programId,
        assigned_by: user.id,
      }))
      const { error } = await supabase
        .from('user_programs')
        .upsert(rows, { onConflict: 'user_id,program_id', ignoreDuplicates: true })
      setAssignMsg(
        error
          ? `Error: ${error.message}`
          : `Assigned "${programTitle}" to ${selectedUsers.size} user${selectedUsers.size !== 1 ? 's' : ''}. They'll see it on their next sign-in.`,
      )
      setSelectedCourse('')
      setSelectedUsers(new Set())
      setShowUserList(false)
      setSaving(false)
      return
    }

    // Individual course assignment → course_assignments (tracking record)
    const courseName = courses.find((c) => c.id === selectedCourse)?.title
    if (!courseName) {
      setSaving(false)
      return
    }

    const inserts = [...selectedUsers]
      .filter((userId) => {
        // Skip if already assigned
        return !assignments.some(
          (a) => a.user_id === userId && a.course_id === selectedCourse,
        )
      })
      .map((userId) => ({
        user_id: userId,
        course_id: selectedCourse,
        assigned_by: user.id,
      }))

    if (inserts.length > 0) {
      const { data, error } = await supabase
        .from('course_assignments')
        .insert(inserts)
        .select()

      if (!error && data) {
        const newEnriched = data.map((a) => {
          const profile = profiles.find((p) => p.id === a.user_id)
          return {
            ...a,
            userName: profile?.full_name ?? 'Unknown',
            courseName: courseName,
          }
        })
        setAssignments((prev) => [...newEnriched, ...prev])
      }
    }

    setSelectedCourse('')
    setSelectedUsers(new Set())
    setShowUserList(false)
    setSaving(false)
  }

  async function removeAssignment(id: string) {
    const { error } = await supabase
      .from('course_assignments')
      .delete()
      .eq('id', id)

    if (!error) {
      setAssignments((prev) => prev.filter((a) => a.id !== id))
    }
  }

  function formatDate(iso: string): string {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  function getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-via-navy animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Unlock overrides */}
      <UnlockOverridesPanel profiles={profiles} />

      {/* Assignment form */}
      <div className="bg-via-card rounded-xl p-6 border border-via-border">
        <h3 className="text-lg font-bold text-via-navy mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Assign a Course
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Course dropdown */}
          <div>
            <label
              htmlFor="course-select"
              className="block text-sm font-semibold text-via-navy mb-1.5"
            >
              Course / Program
            </label>
            <select
              id="course-select"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full rounded-lg border border-via-border bg-white px-3 py-2.5 text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/40 focus:border-via-orange"
            >
              <option value="">Select a course or program...</option>
              <optgroup label="Programs (controls dashboard access)">
                {programs.map((p) => (
                  <option key={p.id} value={`program:${p.id}`}>
                    {p.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Individual Courses (tracking only)">
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* User multi-select */}
          <div>
            <label className="block text-sm font-semibold text-via-navy mb-1.5">
              Select Users
            </label>
            <button
              type="button"
              onClick={() => setShowUserList(!showUserList)}
              className="w-full rounded-lg border border-via-border bg-white px-3 py-2.5 text-sm text-left focus:outline-none focus:ring-2 focus:ring-via-orange/40 focus:border-via-orange cursor-pointer"
            >
              {selectedUsers.size === 0 ? (
                <span className="text-via-text-light">Select users...</span>
              ) : (
                <span className="text-via-text font-medium">
                  {selectedUsers.size} user{selectedUsers.size !== 1 ? 's' : ''} selected
                </span>
              )}
            </button>

            {showUserList && (
              <div className="mt-1 rounded-lg border border-via-border bg-white shadow-lg max-h-52 overflow-y-auto">
                {assignableUsers.map((p) => {
                  const checked = selectedUsers.has(p.id)
                  return (
                    <label
                      key={p.id}
                      className="flex items-center gap-2.5 px-3 py-2 hover:bg-via-bg-subtle cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleUser(p.id)}
                        className="rounded border-via-border text-via-orange focus:ring-via-orange/40 accent-[#e8792b]"
                      />
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-via-navy text-white text-[10px] flex items-center justify-center font-semibold">
                        {getInitials(p.full_name)}
                      </span>
                      <span className="text-via-text">{p.full_name}</span>
                      {p.role !== 'user' && (
                        <span className={`ml-auto text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                          p.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-sky-100 text-sky-600'
                        }`}>
                          {p.role}
                        </span>
                      )}
                    </label>
                  )
                })}
                {assignableUsers.length === 0 && (
                  <p className="px-3 py-2 text-sm text-via-text-light">No users found</p>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAssign}
          disabled={!selectedCourse || selectedUsers.size === 0 || saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-via-orange text-white text-sm font-semibold hover:bg-via-orange/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <BookOpen className="w-4 h-4" />
          )}
          Assign Course
        </button>
        {assignMsg && (
          <p className={`mt-3 text-sm font-medium ${assignMsg.startsWith('Error') ? 'text-via-danger' : 'text-via-success'}`}>
            {assignMsg}
          </p>
        )}
      </div>

      {/* Current assignments */}
      <div className="bg-via-card rounded-xl p-6 border border-via-border">
        <h3 className="text-lg font-bold text-via-navy mb-4">
          Current Assignments ({assignments.length})
        </h3>

        {assignments.length === 0 ? (
          <p className="text-sm text-via-text-light py-4 text-center">
            No assignments yet. Use the form above to assign courses to users.
          </p>
        ) : (
          <div className="space-y-2">
            {assignments.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-via-bg-subtle border border-via-border"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Check className="w-4 h-4 text-via-success flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-via-navy truncate">
                      {a.userName}
                    </p>
                    <p className="text-xs text-via-text-light truncate">
                      {a.courseName} &middot; Assigned {formatDate(a.assigned_at)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeAssignment(a.id)}
                  className="p-1 rounded hover:bg-via-danger/10 text-via-text-light hover:text-via-danger transition-colors cursor-pointer"
                  aria-label={`Remove assignment for ${a.userName}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ========================================================
// UNLOCK OVERRIDES — per-user exceptions to course gating
// ========================================================

type CourseUserState = 'completed' | 'next' | 'locked' | 'override'

function UnlockOverridesPanel({ profiles }: { profiles: Profile[] }) {
  const { user: currentUser } = useAuth()
  const { courses, getProgramsForUser } = useCourses()
  const [selectedUserId, setSelectedUserId] = useState('')
  const [overrides, setOverrides] = useState<CourseUnlockOverrideRow[]>([])
  const [userProgress, setUserProgress] = useState<ModuleProgressRow[]>([])
  const [selectedProgramIds, setSelectedProgramIds] = useState<string[]>([])
  const [loadingUser, setLoadingUser] = useState(false)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  // The override list follows the SELECTED user's assigned programs (union, deduped)
  const seenCourse = new Set<string>()
  const programCourses = getProgramsForUser(selectedProgramIds)
    .flatMap((p) => p.courseIds)
    .filter((cid) => (seenCourse.has(cid) ? false : (seenCourse.add(cid), true)))
    .map((cid) => courses.find((c) => c.id === cid))
    .filter((c): c is Course => !!c && c.status === 'available')

  // Load the selected user's progress + overrides
  useEffect(() => {
    if (!selectedUserId) {
      setOverrides([])
      setUserProgress([])
      setSelectedProgramIds([])
      return
    }
    let cancelled = false
    setLoadingUser(true)
    Promise.all([
      supabase.from('course_unlock_overrides').select('*').eq('user_id', selectedUserId),
      supabase.from('module_progress').select('*').eq('user_id', selectedUserId),
      supabase.from('user_programs').select('program_id').eq('user_id', selectedUserId),
    ])
      .then(([overridesRes, progressRes, programsRes]) => {
        if (cancelled) return
        setOverrides(overridesRes.data ?? [])
        setUserProgress(progressRes.data ?? [])
        setSelectedProgramIds((programsRes.data ?? []).map((r) => r.program_id))
        setLoadingUser(false)
      })
      .catch((err) => {
        console.error('Failed to load user unlock data:', err)
        if (!cancelled) setLoadingUser(false)
      })
    return () => {
      cancelled = true
    }
  }, [selectedUserId])

  function courseCompletion(courseId: string): number {
    const course = courses.find((c) => c.id === courseId)
    if (!course || course.modules.length === 0) return 0
    const completed = course.modules.filter((m) =>
      userProgress.some(
        (p) => p.course_id === courseId && p.module_id === m.id && p.status === 'completed',
      ),
    ).length
    return Math.round((completed / course.modules.length) * 100)
  }

  function getCourseState(courseId: string, index: number): CourseUserState {
    if (courseCompletion(courseId) === 100) return 'completed'
    if (overrides.some((o) => o.course_id === courseId)) return 'override'
    // Locked if any earlier available course is incomplete
    for (let i = 0; i < index; i++) {
      const prevId = programCourses[i].id
      if (courseCompletion(prevId) < 100 && !overrides.some((o) => o.course_id === prevId)) {
        return 'locked'
      }
    }
    return 'next'
  }

  async function addOverride(courseId: string) {
    if (!selectedUserId || !currentUser) return
    setTogglingId(courseId)
    const { data, error } = await supabase
      .from('course_unlock_overrides')
      .insert({ user_id: selectedUserId, course_id: courseId, created_by: currentUser.id })
      .select()
      .single()
    if (!error && data) setOverrides((prev) => [...prev, data])
    setTogglingId(null)
  }

  async function removeOverride(courseId: string) {
    if (!selectedUserId) return
    setTogglingId(courseId)
    const { error } = await supabase
      .from('course_unlock_overrides')
      .delete()
      .eq('user_id', selectedUserId)
      .eq('course_id', courseId)
    if (!error) setOverrides((prev) => prev.filter((o) => o.course_id !== courseId))
    setTogglingId(null)
  }

  const stateBadge: Record<CourseUserState, { label: string; className: string }> = {
    completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-700' },
    next: { label: 'Unlocked', className: 'bg-sky-100 text-sky-700' },
    locked: { label: 'Locked', className: 'bg-gray-100 text-gray-500' },
    override: { label: 'Override Active', className: 'bg-violet-100 text-violet-700' },
  }

  return (
    <div className="bg-via-card rounded-xl p-6 border border-via-border">
      <h3 className="text-lg font-bold text-via-navy mb-1 flex items-center gap-2">
        <KeyRound className="w-5 h-5" />
        Course Unlock Overrides
      </h3>
      <p className="text-xs text-via-text-light mb-4">
        Courses unlock in program order as users complete them. Use an override to let a specific
        user skip ahead to a specific course.
      </p>

      <div className="max-w-sm mb-4">
        <label
          htmlFor="override-user-select"
          className="block text-sm font-semibold text-via-navy mb-1.5"
        >
          User
        </label>
        <select
          id="override-user-select"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full rounded-lg border border-via-border bg-white px-3 py-2.5 text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/40 focus:border-via-orange"
        >
          <option value="">Select a user...</option>
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.full_name} ({p.email})
            </option>
          ))}
        </select>
      </div>

      {selectedUserId && loadingUser && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-via-navy animate-spin" />
        </div>
      )}

      {selectedUserId && !loadingUser && (
        <div className="space-y-1.5">
          {programCourses.map((course, index) => {
            const state = getCourseState(course.id, index)
            const pct = courseCompletion(course.id)
            const badge = stateBadge[state]
            const busy = togglingId === course.id
            return (
              <div
                key={course.id}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-via-bg-subtle border border-via-border"
              >
                <span className="text-xs font-bold text-via-text-light w-5 text-center shrink-0">
                  {index + 1}
                </span>
                <div className="shrink-0">
                  {state === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : state === 'locked' ? (
                    <Lock className="w-4 h-4 text-via-text-light/50" />
                  ) : state === 'override' ? (
                    <KeyRound className="w-4 h-4 text-violet-500" />
                  ) : (
                    <Unlock className="w-4 h-4 text-sky-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-via-navy truncate">{course.title}</p>
                  <p className="text-[11px] text-via-text-light">{pct}% complete</p>
                </div>
                <span
                  className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.className}`}
                >
                  {badge.label}
                </span>
                {state === 'locked' && (
                  <button
                    type="button"
                    onClick={() => addOverride(course.id)}
                    disabled={busy}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-via-navy text-white text-xs font-semibold hover:bg-via-navy-light transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <Unlock className="w-3 h-3" />}
                    Unlock
                  </button>
                )}
                {state === 'override' && (
                  <button
                    type="button"
                    onClick={() => removeOverride(course.id)}
                    disabled={busy}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-via-border bg-white text-via-text-light text-xs font-semibold hover:text-via-danger hover:border-via-danger/40 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <X className="w-3 h-3" />}
                    Remove override
                  </button>
                )}
              </div>
            )
          })}
          {programCourses.length === 0 && (
            <p className="text-sm text-via-text-light text-center py-4">
              No program courses found.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
