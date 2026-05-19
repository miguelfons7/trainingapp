import { useState, useEffect, useCallback } from 'react'
import { Check, X, UserPlus, BookOpen, Loader2 } from 'lucide-react'
import { useCourses } from '../../context/CoursesContext'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import type { Profile, CourseAssignment } from '../../types/database'

export function AssignCourses() {
  const { user } = useAuth()
  const { courses } = useCourses()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [assignments, setAssignments] = useState<(CourseAssignment & { userName: string; courseName: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
  const [showUserList, setShowUserList] = useState(false)
  const [saving, setSaving] = useState(false)

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

    const courseName =
      selectedCourse.startsWith('program-')
        ? selectedCourse === 'program-new-hire-bdr'
          ? 'New Hire: BDR Program'
          : 'New AM Training Program'
        : courses.find((c) => c.id === selectedCourse)?.title

    if (!courseName) return

    setSaving(true)

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
              <optgroup label="Programs">
                <option value="program-new-hire-bdr">New Hire: BDR Program</option>
                <option value="program-new-am">New AM Training Program</option>
              </optgroup>
              <optgroup label="Individual Courses">
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
