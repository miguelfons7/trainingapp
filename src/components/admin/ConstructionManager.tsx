import { useState } from 'react'
import {
  Construction,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Loader2,
  Plus,
  Megaphone,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { courses } from '../../data/courses'
import { programs } from '../../data/programs'
import { useConstruction, type ConstructionEntityType } from '../../context/ConstructionContext'

// ── Toggle Row ─────────────────────────────────────────
interface ToggleRowProps {
  label: string
  sublabel?: string
  entityType: ConstructionEntityType
  entityId: string
  parentId: string | null
}

function ToggleRow({ label, sublabel, entityType, entityId, parentId }: ToggleRowProps) {
  const { isUnderConstruction, getConstructionMessage, setConstruction } = useConstruction()
  const active = isUnderConstruction(entityType, entityId)
  const currentMessage = getConstructionMessage(entityType, entityId) ?? ''
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState(currentMessage)
  const [saving, setSaving] = useState(false)

  async function handleToggle() {
    setSaving(true)
    await setConstruction(entityType, entityId, parentId, !active, message)
    setSaving(false)
  }

  async function handleSaveMessage() {
    setSaving(true)
    await setConstruction(entityType, entityId, parentId, active, message)
    setSaving(false)
    setEditing(false)
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-via-border last:border-b-0 hover:bg-via-bg-subtle/30 transition-colors">
      <div className="flex-1 min-w-0 mr-3">
        <p className="text-xs font-medium text-via-text truncate">{label}</p>
        {sublabel && <p className="text-[10px] text-via-text-light">{sublabel}</p>}
        {active && currentMessage && !editing && (
          <p className="text-[10px] text-amber-600 mt-0.5 truncate">
            <MessageSquare className="w-3 h-3 inline mr-0.5" />
            {currentMessage}
          </p>
        )}
        {editing && (
          <div className="flex items-center gap-2 mt-1.5">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Custom message (optional)..."
              className="flex-1 px-2 py-1 text-xs rounded border border-via-border bg-white focus:outline-none focus:ring-1 focus:ring-via-orange/30 focus:border-via-orange"
            />
            <button
              onClick={handleSaveMessage}
              disabled={saving}
              className="px-2 py-1 text-[10px] font-semibold text-white bg-via-orange rounded hover:bg-via-orange-light transition-colors cursor-pointer disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => { setEditing(false); setMessage(currentMessage) }}
              className="px-2 py-1 text-[10px] font-semibold text-via-text-light hover:text-via-text cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {active && !editing && (
          <button
            onClick={() => { setMessage(currentMessage); setEditing(true) }}
            className="p-1 text-via-text-light hover:text-via-navy transition-colors cursor-pointer"
            title="Edit message"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Toggle switch */}
        <button
          onClick={handleToggle}
          disabled={saving}
          className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: active ? '#f59e0b' : '#d1d5db' }}
          title={active ? 'Mark as available' : 'Mark as under construction'}
        >
          {saving ? (
            <Loader2 className="absolute left-1.5 w-3 h-3 text-white animate-spin" />
          ) : (
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                active ? 'translate-x-4.5' : 'translate-x-0.5'
              }`}
            />
          )}
        </button>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────
export function ConstructionManager() {
  const { overrides, loading } = useConstruction()
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set())

  function toggleExpand(courseId: string) {
    setExpandedCourses((prev) => {
      const next = new Set(prev)
      if (next.has(courseId)) next.delete(courseId)
      else next.add(courseId)
      return next
    })
  }

  const activeCount = overrides.filter((o) => o.isActive).length
  const courseCount = overrides.filter((o) => o.entityType === 'course' && o.isActive).length
  const moduleCount = overrides.filter((o) => o.entityType === 'module' && o.isActive).length
  const programCount = overrides.filter((o) => o.entityType === 'program' && o.isActive).length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-via-navy animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-via-card rounded-xl border border-via-border p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{activeCount}</p>
          <p className="text-xs text-via-text-light">Under Construction</p>
        </div>
        <div className="bg-via-card rounded-xl border border-via-border p-4 text-center">
          <p className="text-2xl font-bold text-via-navy">{courseCount}</p>
          <p className="text-xs text-via-text-light">Courses</p>
        </div>
        <div className="bg-via-card rounded-xl border border-via-border p-4 text-center">
          <p className="text-2xl font-bold text-via-navy">{moduleCount}</p>
          <p className="text-xs text-via-text-light">Modules</p>
        </div>
        <div className="bg-via-card rounded-xl border border-via-border p-4 text-center">
          <p className="text-2xl font-bold text-via-navy">{programCount}</p>
          <p className="text-xs text-via-text-light">Programs</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Link
          to="/admin"
          onClick={() => {
            // We can't directly switch tabs from here, but the link takes them to admin
            // The user can click on the Announcements tab from there
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-via-navy bg-via-navy/10 rounded-lg hover:bg-via-navy/20 transition-colors"
        >
          <Megaphone className="w-3.5 h-3.5" />
          Create Announcement
        </Link>
      </div>

      {/* Programs */}
      <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
        <div className="px-4 py-3 border-b border-via-border bg-via-bg-subtle/50">
          <p className="text-xs font-semibold text-via-navy uppercase tracking-wide flex items-center gap-2">
            <Construction className="w-3.5 h-3.5" />
            Programs
          </p>
        </div>
        {programs.map((program) => (
          <ToggleRow
            key={program.id}
            label={program.title}
            sublabel={`${program.courseIds.length} courses`}
            entityType="program"
            entityId={program.id}
            parentId={null}
          />
        ))}
      </div>

      {/* Courses + Modules */}
      <div className="space-y-3">
        {courses.map((course) => {
          const isExpanded = expandedCourses.has(course.id)

          return (
            <div
              key={course.id}
              className="bg-via-card rounded-xl border border-via-border overflow-hidden"
            >
              {/* Course row with expand toggle */}
              <div className="flex items-center border-b border-via-border">
                <button
                  onClick={() => toggleExpand(course.id)}
                  className="p-3 text-via-text-light hover:text-via-navy transition-colors cursor-pointer"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                <div className="flex-1">
                  <ToggleRow
                    label={course.title}
                    sublabel={`${course.modules.length} modules · ${course.status}`}
                    entityType="course"
                    entityId={course.id}
                    parentId={null}
                  />
                </div>
              </div>

              {/* Module rows */}
              {isExpanded && (
                <div className="bg-via-bg-subtle/20">
                  {course.modules.map((mod) => (
                    <div key={mod.id} className="pl-10">
                      <ToggleRow
                        label={mod.title}
                        sublabel={`${mod.estimatedTime} · ${mod.contentType}`}
                        entityType="module"
                        entityId={mod.id}
                        parentId={course.id}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
