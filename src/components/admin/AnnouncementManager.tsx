import { useState, useEffect } from 'react'
import {
  Plus,
  Trash2,
  Megaphone,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Lock,
} from 'lucide-react'
import { useCompliance } from '../../context/ComplianceContext'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function AnnouncementManager() {
  const { items, createItem, deleteItem, isCustomItem } = useCompliance()
  const { user } = useAuth()

  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [details, setDetails] = useState('')
  const [priority, setPriority] = useState<'high' | 'medium'>('medium')
  const [requiredBy, setRequiredBy] = useState('')
  const [formError, setFormError] = useState('')
  const [department, setDepartment] = useState<string>('all')
  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(() => {
    supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .then(({ count }) => {
        setTotalUsers(count ?? 0)
      })
  }, [])

  function resetForm() {
    setTitle('')
    setDescription('')
    setDetails('')
    setPriority('medium')
    setDepartment('all')
    setRequiredBy('')
    setFormError('')
    setShowForm(false)
  }

  function handleCreate() {
    if (!title.trim()) {
      setFormError('Title is required')
      return
    }
    if (!description.trim()) {
      setFormError('Description is required')
      return
    }
    if (!requiredBy) {
      setFormError('Due date is required')
      return
    }

    createItem({
      title: title.trim(),
      description: description.trim(),
      details: details.trim() || description.trim(),
      priority,
      requiredBy,
      createdBy: user?.email ?? 'admin',
    })

    resetForm()
  }

  return (
    <div className="space-y-6">
      {/* Header + New button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-via-navy">
            Announcements & Compliance
          </h2>
          <p className="text-sm text-via-text-light">
            Create announcements that appear on every team member's dashboard
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-via-orange text-white text-sm font-semibold rounded-lg hover:bg-via-orange-light transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="bg-via-card rounded-xl border-2 border-via-orange/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="w-5 h-5 text-via-orange" />
            <h3 className="text-base font-semibold text-via-navy">
              Create New Announcement
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-via-text mb-1.5">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  setFormError('')
                }}
                placeholder="e.g. New Pricing Structure Update"
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-via-text mb-1.5">
                Description * (shown on the dashboard banner)
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                  setFormError('')
                }}
                placeholder="Brief summary of the announcement..."
                rows={2}
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-via-text mb-1.5">
                Full Details (shown when user clicks "Review")
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Detailed information, action items, etc..."
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange resize-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-via-text mb-1.5">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                >
                  <option value="all">All Departments</option>
                  <option value="sales">Sales</option>
                  <option value="operations">Operations</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="marketing">Marketing</option>
                  <option value="management">Management</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-via-text mb-1.5">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as 'high' | 'medium')
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                >
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-via-text mb-1.5">
                  Acknowledge by *
                </label>
                <input
                  type="date"
                  value={requiredBy}
                  onChange={(e) => {
                    setRequiredBy(e.target.value)
                    setFormError('')
                  }}
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                />
              </div>
            </div>

            {formError && (
              <p className="text-xs text-via-danger font-medium">{formError}</p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-via-orange text-white text-sm font-semibold rounded-lg hover:bg-via-orange-light transition-colors cursor-pointer"
              >
                <Megaphone className="w-4 h-4" />
                Launch Announcement
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2.5 text-sm font-medium text-via-text-light hover:text-via-text transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing announcements */}
      {items.length === 0 ? (
        <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
          <Megaphone className="w-10 h-10 text-via-text-light mx-auto mb-3" />
          <p className="text-via-text-light">
            No announcements yet. Create one to notify your team.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const ackCount = item.acknowledgedBy.length
            const pendingCount = totalUsers - ackCount
            const isHigh = item.priority === 'high'
            const custom = isCustomItem(item.id)

            return (
              <div
                key={item.id}
                className="bg-via-card rounded-xl p-5 border border-via-border"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                          isHigh
                            ? 'bg-via-danger/15 text-via-danger'
                            : 'bg-via-warning/15 text-via-warning'
                        }`}
                      >
                        {isHigh && <AlertTriangle className="w-3 h-3" />}
                        {item.priority}
                      </span>
                      <span className="text-xs text-via-text-light flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Due {formatDate(item.requiredBy)}
                      </span>
                      {!custom && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-via-navy/10 text-xs font-medium text-via-navy">
                          <Lock className="w-3 h-3" />
                          System
                        </span>
                      )}
                      {custom && item.createdBy && (
                        <span className="text-xs text-via-text-light">
                          by {item.createdBy}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-via-navy mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-via-text leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {custom && (
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="shrink-0 p-2 rounded-lg text-via-text-light hover:text-via-danger hover:bg-via-danger/10 transition-colors cursor-pointer"
                      title="Delete announcement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-via-success" />
                    <span className="font-semibold text-via-success">
                      {ackCount}
                    </span>
                    <span className="text-via-text-light">acknowledged</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Clock className="w-4 h-4 text-via-warning" />
                    <span className="font-semibold text-via-warning">
                      {pendingCount > 0 ? pendingCount : 0}
                    </span>
                    <span className="text-via-text-light">pending</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
