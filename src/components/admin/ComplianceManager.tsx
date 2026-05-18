import { useState, useEffect, useMemo } from 'react'
import {
  Plus,
  Trash2,
  Megaphone,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Lock,
  Search,
  X,
  Users,
} from 'lucide-react'
import { useCompliance } from '../../context/ComplianceContext'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import type { Profile } from '../../types/database'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface UserListModalProps {
  title: string
  users: Profile[]
  variant: 'acknowledged' | 'pending'
  onClose: () => void
}

function UserListModal({ title, users, variant, onClose }: UserListModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-via-card rounded-xl border border-via-border shadow-xl w-full max-w-md mx-4 max-h-[70vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-via-border">
          <div className="flex items-center gap-2">
            <Users
              className={`w-5 h-5 ${
                variant === 'acknowledged'
                  ? 'text-via-success'
                  : 'text-via-warning'
              }`}
            />
            <h3 className="text-base font-bold text-via-navy">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-via-text-light hover:text-via-text hover:bg-via-bg-subtle transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto p-5">
          {users.length === 0 ? (
            <p className="text-sm text-via-text-light text-center py-4">
              No users
            </p>
          ) : (
            <div className="space-y-2">
              {users.map((u) => (
                <div
                  key={u.id}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg ${
                    variant === 'acknowledged'
                      ? 'bg-via-success/10'
                      : 'bg-via-warning/10'
                  }`}
                >
                  {variant === 'acknowledged' ? (
                    <CheckCircle2 className="w-4 h-4 text-via-success shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-via-warning shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-via-text truncate">
                      {u.full_name}
                    </p>
                    <p className="text-xs text-via-text-light truncate">
                      {u.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function ComplianceManager() {
  const { items, createItem, deleteItem, isCustomItem } = useCompliance()
  const { user } = useAuth()

  // Profiles for resolving user names
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [profilesLoaded, setProfilesLoaded] = useState(false)

  // Search
  const [search, setSearch] = useState('')

  // Create form
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [details, setDetails] = useState('')
  const [priority, setPriority] = useState<'high' | 'medium'>('medium')
  const [requiredBy, setRequiredBy] = useState('')
  const [department, setDepartment] = useState<string>('all')
  const [formError, setFormError] = useState('')

  // User list modal
  const [modal, setModal] = useState<{
    title: string
    users: Profile[]
    variant: 'acknowledged' | 'pending'
  } | null>(null)

  useEffect(() => {
    supabase
      .from('profiles')
      .select('*')
      .order('full_name')
      .then(({ data }) => {
        setProfiles(data ?? [])
        setProfilesLoaded(true)
      })
  }, [])

  const totalUsers = profiles.length

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items
    const q = search.toLowerCase()
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q),
    )
  }, [items, search])

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

  function openUserModal(
    itemId: string,
    variant: 'acknowledged' | 'pending',
  ) {
    const item = items.find((i) => i.id === itemId)
    if (!item) return

    const acknowledgedIds = new Set(item.acknowledgedBy)
    const userList =
      variant === 'acknowledged'
        ? profiles.filter((u) => acknowledgedIds.has(u.id))
        : profiles.filter((u) => !acknowledgedIds.has(u.id))
    const count = userList.length
    const label =
      variant === 'acknowledged'
        ? `Acknowledged (${count})`
        : `Pending (${count})`

    setModal({ title: label, users: userList, variant })
  }

  return (
    <div className="space-y-6">
      {/* Header + Search + New button */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-via-navy">
            Announcements & Compliance
          </h2>
          <p className="text-sm text-via-text-light">
            Manage announcements and track team acknowledgements
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-via-orange text-white text-sm font-semibold rounded-lg hover:bg-via-orange-light transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-via-text-light" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or description..."
          className="w-full pl-10 pr-9 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-via-text-light hover:text-via-text cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Create form (collapsible) */}
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

      {/* Table */}
      {filteredItems.length === 0 ? (
        <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
          <Megaphone className="w-10 h-10 text-via-text-light mx-auto mb-3" />
          <p className="text-via-text-light">
            {search
              ? 'No announcements match your search.'
              : 'No announcements yet. Create one to notify your team.'}
          </p>
        </div>
      ) : (
        <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-via-border">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide w-24">
                    Priority
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide w-32">
                    Due Date
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide w-36">
                    Created By
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide w-28">
                    Acknowledged
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide w-24">
                    Pending
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide w-20">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => {
                  const ackCount = item.acknowledgedBy.length
                  const pendingCount = Math.max(totalUsers - ackCount, 0)
                  const isHigh = item.priority === 'high'
                  const custom = isCustomItem(item.id)

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-via-border last:border-b-0 hover:bg-via-bg-subtle/50 transition-colors"
                    >
                      {/* Title + description */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-via-navy leading-snug">
                          {item.title}
                        </p>
                        <p className="text-xs text-via-text-light mt-0.5 line-clamp-1">
                          {item.description}
                        </p>
                      </td>

                      {/* Priority */}
                      <td className="px-4 py-4">
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
                      </td>

                      {/* Due date */}
                      <td className="px-4 py-4">
                        <span className="text-sm text-via-text">
                          {formatDate(item.requiredBy)}
                        </span>
                      </td>

                      {/* Created by */}
                      <td className="px-4 py-4">
                        {custom && item.createdBy ? (
                          <span className="text-sm text-via-text truncate block max-w-[130px]">
                            {item.createdBy}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-via-navy/10 text-xs font-medium text-via-navy">
                            <Lock className="w-3 h-3" />
                            System
                          </span>
                        )}
                      </td>

                      {/* Acknowledged count (clickable) */}
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() =>
                            openUserModal(item.id, 'acknowledged')
                          }
                          disabled={!profilesLoaded}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-via-success hover:underline cursor-pointer disabled:cursor-default disabled:opacity-50"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          {ackCount}
                        </button>
                      </td>

                      {/* Pending count (clickable) */}
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => openUserModal(item.id, 'pending')}
                          disabled={!profilesLoaded}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-via-warning hover:underline cursor-pointer disabled:cursor-default disabled:opacity-50"
                        >
                          <Clock className="w-4 h-4" />
                          {pendingCount}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 text-center">
                        {custom ? (
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="p-2 rounded-lg text-via-text-light hover:text-via-danger hover:bg-via-danger/10 transition-colors cursor-pointer"
                            title="Delete announcement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-via-navy/10 text-xs font-medium text-via-navy">
                            <Lock className="w-3 h-3" />
                            System
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Item count footer */}
          <div className="px-5 py-3 border-t border-via-border bg-via-bg-subtle/30">
            <p className="text-xs text-via-text-light">
              {filteredItems.length} of {items.length} announcement
              {items.length !== 1 ? 's' : ''}
              {search ? ` matching "${search}"` : ''}
            </p>
          </div>
        </div>
      )}

      {/* User list modal */}
      {modal && (
        <UserListModal
          title={modal.title}
          users={modal.users}
          variant={modal.variant}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
