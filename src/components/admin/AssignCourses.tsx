import { useState } from 'react'
import { Check, X, UserPlus, BookOpen } from 'lucide-react'
import { courses } from '../../data/courses'
import { mockUsers } from '../../data/mockUsers'

interface Assignment {
  id: string
  courseName: string
  userName: string
  userEmail: string
  assignedAt: string
}

export function AssignCourses() {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [showUserList, setShowUserList] = useState(false)

  const learners = mockUsers.filter((u) => u.role === 'learner')

  function toggleUser(email: string) {
    setSelectedUsers((prev) => {
      const next = new Set(prev)
      if (next.has(email)) {
        next.delete(email)
      } else {
        next.add(email)
      }
      return next
    })
  }

  function handleAssign() {
    if (!selectedCourse || selectedUsers.size === 0) return

    const course = courses.find((c) => c.id === selectedCourse)
    if (!course) return

    const now = new Date().toISOString()
    const newAssignments: Assignment[] = []

    selectedUsers.forEach((email) => {
      const user = mockUsers.find((u) => u.email === email)
      if (!user) return

      const exists = assignments.some(
        (a) => a.userEmail === email && a.courseName === course.title,
      )
      if (exists) return

      newAssignments.push({
        id: `${course.id}-${email}-${Date.now()}`,
        courseName: course.title,
        userName: user.name,
        userEmail: email,
        assignedAt: now,
      })
    })

    if (newAssignments.length > 0) {
      setAssignments((prev) => [...newAssignments, ...prev])
    }

    setSelectedCourse('')
    setSelectedUsers(new Set())
    setShowUserList(false)
  }

  function removeAssignment(id: string) {
    setAssignments((prev) => prev.filter((a) => a.id !== id))
  }

  function formatDate(iso: string): string {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
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
              <option value="">Select a course...</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
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
                {learners.map((user) => {
                  const checked = selectedUsers.has(user.email)
                  return (
                    <label
                      key={user.email}
                      className="flex items-center gap-2.5 px-3 py-2 hover:bg-via-bg-subtle cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleUser(user.email)}
                        className="rounded border-via-border text-via-orange focus:ring-via-orange/40 accent-[#e8792b]"
                      />
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-via-navy text-white text-[10px] flex items-center justify-center font-semibold">
                        {user.avatar}
                      </span>
                      <span className="text-via-text">{user.name}</span>
                    </label>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAssign}
          disabled={!selectedCourse || selectedUsers.size === 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-via-orange text-white text-sm font-semibold hover:bg-via-orange/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          Assign Course
        </button>
      </div>

      {/* Current assignments */}
      <div className="bg-via-card rounded-xl p-6 border border-via-border">
        <h3 className="text-lg font-bold text-via-navy mb-4">Current Assignments</h3>

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
                      {a.courseName} &middot; Assigned {formatDate(a.assignedAt)}
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
