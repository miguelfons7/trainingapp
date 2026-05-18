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
  Pencil,
  Archive,
  Send,
  Eye,
  CalendarClock,
  FileText,
  Check,
  History,
} from 'lucide-react'
import { useCompliance } from '../../context/ComplianceContext'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import type { Profile } from '../../types/database'
import type { ComplianceItem, ComplianceStatus } from '../../types'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatDateTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

// ── Department Options ──────────────────────────────────
const DEPARTMENTS = [
  { value: 'sales', label: 'Sales' },
  { value: 'operations', label: 'Operations' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'management', label: 'Management' },
]

// ── Status Tab Config ───────────────────────────────────
type StatusTab = 'live' | 'draft' | 'scheduled' | 'archived'
const STATUS_TABS: { key: StatusTab; label: string; icon: React.ReactNode }[] = [
  { key: 'live', label: 'Live', icon: <Eye className="w-4 h-4" /> },
  { key: 'draft', label: 'Drafts', icon: <FileText className="w-4 h-4" /> },
  { key: 'scheduled', label: 'Scheduled', icon: <CalendarClock className="w-4 h-4" /> },
  { key: 'archived', label: 'Archived', icon: <Archive className="w-4 h-4" /> },
]

// ── Department Multi-Checkbox ───────────────────────────
function DepartmentPicker({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (departments: string[]) => void
}) {
  const allSelected = selected.length === 0

  function toggle(dept: string) {
    if (selected.includes(dept)) {
      onChange(selected.filter((d) => d !== dept))
    } else {
      onChange([...selected, dept])
    }
  }

  return (
    <div className="space-y-2">
      <label
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => onChange([])}
      >
        <div
          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
            allSelected
              ? 'bg-via-orange border-via-orange'
              : 'border-via-border bg-white'
          }`}
        >
          {allSelected && <Check className="w-3 h-3 text-white" />}
        </div>
        <span className="text-sm text-via-text font-medium">All Departments</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 ml-1">
        {DEPARTMENTS.map((dept) => {
          const checked = selected.includes(dept.value)
          return (
            <label
              key={dept.value}
              className="flex items-center gap-2 cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                toggle(dept.value)
              }}
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  checked
                    ? 'bg-via-orange border-via-orange'
                    : 'border-via-border bg-white'
                }`}
              >
                {checked && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm text-via-text">{dept.label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

// ── User List Modal ─────────────────────────────────────
interface UserListModalProps {
  title: string
  users: Profile[]
  variant: 'acknowledged' | 'pending'
  onClose: () => void
}

function UserListModal({ title, users, variant, onClose }: UserListModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
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

// ── Edit Modal ──────────────────────────────────────────
interface EditModalProps {
  item: ComplianceItem
  onSave: (updates: Partial<Pick<ComplianceItem, 'title' | 'description' | 'details' | 'priority' | 'requiredBy' | 'departments'>>) => void
  onClose: () => void
}

function EditModal({ item, onSave, onClose }: EditModalProps) {
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)
  const [details, setDetails] = useState(item.details)
  const [priority, setPriority] = useState(item.priority)
  const [requiredBy, setRequiredBy] = useState(item.requiredBy)
  const [departments, setDepartments] = useState<string[]>(item.departments)
  const [formError, setFormError] = useState('')

  function handleSave() {
    if (!title.trim()) { setFormError('Title is required'); return }
    if (!description.trim()) { setFormError('Description is required'); return }
    if (!requiredBy) { setFormError('Due date is required'); return }
    onSave({
      title: title.trim(),
      description: description.trim(),
      details: details.trim() || description.trim(),
      priority,
      requiredBy,
      departments,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-via-card rounded-xl border border-via-border shadow-xl w-full max-w-xl mx-4 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-via-border">
          <div className="flex items-center gap-2">
            <Pencil className="w-5 h-5 text-via-orange" />
            <h3 className="text-base font-bold text-via-navy">Edit Announcement</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-via-text-light hover:text-via-text hover:bg-via-bg-subtle transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-via-text mb-1.5">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setFormError('') }}
              className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-via-text mb-1.5">Description *</label>
            <textarea
              value={description}
              onChange={(e) => { setDescription(e.target.value); setFormError('') }}
              rows={2}
              className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-via-text mb-1.5">Full Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-via-text mb-1.5">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'high' | 'medium')}
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
              >
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-via-text mb-1.5">Acknowledge by *</label>
              <input
                type="date"
                value={requiredBy}
                onChange={(e) => { setRequiredBy(e.target.value); setFormError('') }}
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-via-text mb-1.5">Departments</label>
            <DepartmentPicker selected={departments} onChange={setDepartments} />
          </div>

          {formError && (
            <p className="text-xs text-via-danger font-medium">{formError}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-via-border">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-via-text-light hover:text-via-text transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-via-orange text-white text-sm font-semibold rounded-lg hover:bg-via-orange-light transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ──────────────────────────────────────
export function ComplianceManager() {
  const { items, createItem, updateItem, deleteItem, isCustomItem } = useCompliance()
  const { user } = useAuth()

  // Profiles for resolving user names
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [profilesLoaded, setProfilesLoaded] = useState(false)

  // Active status tab
  const [activeTab, setActiveTab] = useState<StatusTab>('live')

  // Search
  const [search, setSearch] = useState('')

  // Create form
  const [showForm, setShowForm] = useState(false)
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formDetails, setFormDetails] = useState('')
  const [formPriority, setFormPriority] = useState<'high' | 'medium'>('medium')
  const [formRequiredBy, setFormRequiredBy] = useState('')
  const [formDepartments, setFormDepartments] = useState<string[]>([])
  const [formScheduledAt, setFormScheduledAt] = useState('')
  const [formError, setFormError] = useState('')

  // Edit modal
  const [editingItem, setEditingItem] = useState<ComplianceItem | null>(null)

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

  // Count items per status tab
  const statusCounts = useMemo(() => {
    const counts: Record<StatusTab, number> = { live: 0, draft: 0, scheduled: 0, archived: 0 }
    for (const item of items) {
      const s = item.status as StatusTab
      if (counts[s] !== undefined) counts[s]++
    }
    return counts
  }, [items])

  // Filter items by active tab + search
  const filteredItems = useMemo(() => {
    let result = items.filter((i) => i.status === activeTab)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q),
      )
    }
    return result
  }, [items, activeTab, search])

  function resetForm() {
    setFormTitle('')
    setFormDescription('')
    setFormDetails('')
    setFormPriority('medium')
    setFormDepartments([])
    setFormRequiredBy('')
    setFormScheduledAt('')
    setFormError('')
    setShowForm(false)
  }

  function handleCreate(saveAs: 'live' | 'draft' | 'scheduled') {
    if (!formTitle.trim()) { setFormError('Title is required'); return }
    if (!formDescription.trim()) { setFormError('Description is required'); return }
    if (!formRequiredBy) { setFormError('Due date is required'); return }
    if (saveAs === 'scheduled' && !formScheduledAt) { setFormError('Schedule date is required for scheduled items'); return }

    createItem({
      title: formTitle.trim(),
      description: formDescription.trim(),
      details: formDetails.trim() || formDescription.trim(),
      priority: formPriority,
      requiredBy: formRequiredBy,
      createdBy: user?.email ?? 'admin',
      status: saveAs,
      scheduledAt: saveAs === 'scheduled' ? formScheduledAt : undefined,
      departments: formDepartments,
    })

    resetForm()
    // Switch to the tab where the item was created
    setActiveTab(saveAs)
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

  function handleStatusChange(itemId: string, newStatus: ComplianceStatus) {
    updateItem(itemId, { status: newStatus })
  }

  function handleEditSave(
    itemId: string,
    updates: Partial<Pick<ComplianceItem, 'title' | 'description' | 'details' | 'priority' | 'requiredBy' | 'departments'>>,
  ) {
    updateItem(itemId, updates)
  }

  return (
    <div className="space-y-6">
      {/* Header + New button */}
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

      {/* Status tabs */}
      <div className="flex items-center gap-1 bg-via-bg-subtle rounded-lg p-1">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab.key
                ? 'bg-via-card text-via-navy shadow-sm'
                : 'text-via-text-light hover:text-via-text'
            }`}
          >
            {tab.icon}
            {tab.label}
            {statusCounts[tab.key] > 0 && (
              <span className={`ml-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key
                  ? 'bg-via-orange/15 text-via-orange'
                  : 'bg-via-border/50 text-via-text-light'
              }`}>
                {statusCounts[tab.key]}
              </span>
            )}
          </button>
        ))}
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
                value={formTitle}
                onChange={(e) => { setFormTitle(e.target.value); setFormError('') }}
                placeholder="e.g. New Pricing Structure Update"
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-via-text mb-1.5">
                Description * (shown on the dashboard banner)
              </label>
              <textarea
                value={formDescription}
                onChange={(e) => { setFormDescription(e.target.value); setFormError('') }}
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
                value={formDetails}
                onChange={(e) => setFormDetails(e.target.value)}
                placeholder="Detailed information, action items, etc..."
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-via-text mb-1.5">
                  Priority
                </label>
                <select
                  value={formPriority}
                  onChange={(e) => setFormPriority(e.target.value as 'high' | 'medium')}
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
                  value={formRequiredBy}
                  onChange={(e) => { setFormRequiredBy(e.target.value); setFormError('') }}
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-via-text mb-1.5">
                Departments
              </label>
              <DepartmentPicker selected={formDepartments} onChange={setFormDepartments} />
            </div>

            {/* Schedule date (optional — shows when user wants to schedule) */}
            <div>
              <label className="block text-xs font-medium text-via-text mb-1.5">
                Schedule publish date (optional)
              </label>
              <input
                type="datetime-local"
                value={formScheduledAt}
                onChange={(e) => setFormScheduledAt(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
              />
              <p className="text-xs text-via-text-light mt-1">
                Leave empty and choose "Publish Now" to make it live immediately, or set a date and choose "Schedule".
              </p>
            </div>

            {formError && (
              <p className="text-xs text-via-danger font-medium">{formError}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleCreate('live')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-via-orange text-white text-sm font-semibold rounded-lg hover:bg-via-orange-light transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Publish Now
              </button>
              <button
                onClick={() => handleCreate('draft')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-via-navy/10 text-via-navy text-sm font-semibold rounded-lg hover:bg-via-navy/20 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                Save as Draft
              </button>
              {formScheduledAt && (
                <button
                  onClick={() => handleCreate('scheduled')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-lg hover:bg-indigo-200 transition-colors cursor-pointer"
                >
                  <CalendarClock className="w-4 h-4" />
                  Schedule
                </button>
              )}
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
              : activeTab === 'draft'
                ? 'No drafts. Create an announcement and save it as a draft.'
                : activeTab === 'scheduled'
                  ? 'No scheduled announcements.'
                  : activeTab === 'archived'
                    ? 'No archived announcements.'
                    : 'No live announcements. Create one to notify your team.'}
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
                    {activeTab === 'scheduled' ? 'Publishes' : 'Due Date'}
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide w-28">
                    Depts
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide w-36">
                    Created By
                  </th>
                  {activeTab === 'live' && (
                    <>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide w-28">
                        Acknowledged
                      </th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide w-24">
                        Pending
                      </th>
                    </>
                  )}
                  <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide w-36">
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
                  const deptLabel = item.departments.length === 0
                    ? 'All'
                    : item.departments.map((d) => DEPARTMENTS.find((dd) => dd.value === d)?.label ?? d).join(', ')

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
                        {item.updatedBy && item.updatedAt && (
                          <p className="text-[10px] text-via-text-light/70 mt-1 flex items-center gap-1">
                            <History className="w-3 h-3" />
                            Edited by {item.updatedBy} on {formatDate(item.updatedAt)}
                          </p>
                        )}
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

                      {/* Due date or scheduled date */}
                      <td className="px-4 py-4">
                        <span className="text-sm text-via-text">
                          {activeTab === 'scheduled' && item.scheduledAt
                            ? formatDateTime(item.scheduledAt)
                            : formatDate(item.requiredBy)}
                        </span>
                      </td>

                      {/* Departments */}
                      <td className="px-4 py-4">
                        <span className="text-xs text-via-text-light">
                          {deptLabel}
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

                      {/* Acknowledged count (only on live tab) */}
                      {activeTab === 'live' && (
                        <>
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
                        </>
                      )}

                      {/* Actions */}
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1">
                          {/* Edit (non-seed only) */}
                          {custom && (
                            <button
                              onClick={() => setEditingItem(item)}
                              className="p-1.5 rounded-lg text-via-text-light hover:text-via-navy hover:bg-via-navy/10 transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                          )}

                          {/* Status actions */}
                          {activeTab === 'draft' && (
                            <button
                              onClick={() => handleStatusChange(item.id, 'live')}
                              className="p-1.5 rounded-lg text-via-text-light hover:text-via-success hover:bg-via-success/10 transition-colors cursor-pointer"
                              title="Publish now"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          )}

                          {activeTab === 'scheduled' && (
                            <button
                              onClick={() => handleStatusChange(item.id, 'live')}
                              className="p-1.5 rounded-lg text-via-text-light hover:text-via-success hover:bg-via-success/10 transition-colors cursor-pointer"
                              title="Publish now"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          )}

                          {activeTab === 'live' && (
                            <button
                              onClick={() => handleStatusChange(item.id, 'archived')}
                              className="p-1.5 rounded-lg text-via-text-light hover:text-amber-600 hover:bg-amber-100 transition-colors cursor-pointer"
                              title="Archive"
                            >
                              <Archive className="w-4 h-4" />
                            </button>
                          )}

                          {activeTab === 'archived' && (
                            <button
                              onClick={() => handleStatusChange(item.id, 'live')}
                              className="p-1.5 rounded-lg text-via-text-light hover:text-via-success hover:bg-via-success/10 transition-colors cursor-pointer"
                              title="Republish"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          )}

                          {/* Delete (custom only) */}
                          {custom && (
                            <button
                              onClick={() => deleteItem(item.id)}
                              className="p-1.5 rounded-lg text-via-text-light hover:text-via-danger hover:bg-via-danger/10 transition-colors cursor-pointer"
                              title="Delete permanently"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}

                          {/* System badge for seed items */}
                          {!custom && activeTab !== 'live' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-via-navy/10 text-xs font-medium text-via-navy">
                              <Lock className="w-3 h-3" />
                              System
                            </span>
                          )}
                        </div>
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
              {filteredItems.length} of {statusCounts[activeTab]} {activeTab} announcement
              {statusCounts[activeTab] !== 1 ? 's' : ''}
              {search ? ` matching "${search}"` : ''}
            </p>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editingItem && (
        <EditModal
          item={editingItem}
          onSave={(updates) => handleEditSave(editingItem.id, updates)}
          onClose={() => setEditingItem(null)}
        />
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
