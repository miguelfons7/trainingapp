import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowUpDown,
  Pencil,
  Check,
  X,
  Loader2,
  ExternalLink,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { Profile, Team } from '../../types/database'
import type { UserRole } from '../../types/database'

type SortKey = 'full_name' | 'email' | 'role' | 'team' | 'created_at'
type SortDir = 'asc' | 'desc'

const roleBadgeStyles: Record<string, string> = {
  admin: 'bg-indigo-100 text-indigo-700',
  leadership: 'bg-purple-100 text-purple-700',
  user: 'bg-sky-100 text-sky-700',
}

const roleLabels: Record<string, string> = {
  admin: 'Admin',
  leadership: 'Leadership',
  user: 'User',
}

export function ManageUsers() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<Profile[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [sortKey, setSortKey] = useState<SortKey>('full_name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editRole, setEditRole] = useState<UserRole>('user')
  const [editTeamId, setEditTeamId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const loadData = useCallback(async () => {
    const [usersRes, teamsRes] = await Promise.all([
      supabase.from('profiles').select('*').order('full_name'),
      supabase.from('teams').select('*').order('name'),
    ])

    if (usersRes.data) setUsers(usersRes.data)
    if (teamsRes.data) setTeams(teamsRes.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function getTeamName(teamId: string | null): string {
    if (!teamId) return '—'
    return teams.find((t) => t.id === teamId)?.name ?? '—'
  }

  function getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  function startEdit(user: Profile) {
    setEditingId(user.id)
    setEditRole(user.role)
    setEditTeamId(user.team_id)
    setError('')
  }

  function cancelEdit() {
    setEditingId(null)
    setError('')
  }

  async function handleSave(userId: string) {
    setSaving(true)
    setError('')

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        role: editRole,
        team_id: editTeamId,
      })
      .eq('id', userId)

    if (updateError) {
      setError(updateError.message)
      setSaving(false)
      return
    }

    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, role: editRole, team_id: editTeamId } : u,
      ),
    )
    setEditingId(null)
    setSaving(false)
  }

  const sorted = [...users].sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1
    switch (sortKey) {
      case 'full_name':
        return a.full_name.localeCompare(b.full_name) * mul
      case 'email':
        return a.email.localeCompare(b.email) * mul
      case 'role':
        return a.role.localeCompare(b.role) * mul
      case 'team':
        return getTeamName(a.team_id).localeCompare(getTeamName(b.team_id)) * mul
      case 'created_at':
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        ) * mul
      default:
        return 0
    }
  })

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-via-navy animate-spin" />
      </div>
    )
  }

  const columns: { key: SortKey; label: string; className?: string }[] = [
    { key: 'full_name', label: 'Name' },
    { key: 'email', label: 'Email', className: 'hidden lg:table-cell' },
    { key: 'role', label: 'Role' },
    { key: 'team', label: 'Team', className: 'hidden md:table-cell' },
    { key: 'created_at', label: 'Joined', className: 'hidden md:table-cell' },
  ]

  return (
    <div className="space-y-4">
      {error && (
        <p className="text-xs text-via-danger font-medium bg-red-50 rounded-lg p-3 border border-red-200">
          {error}
        </p>
      )}

      <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
        <div className="px-4 py-3 border-b border-via-border flex items-center justify-between">
          <p className="text-sm font-semibold text-via-navy">
            {users.length} user{users.length !== 1 ? 's' : ''}
          </p>
          <p className="text-xs text-via-text-light">
            Click a row to view profile
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-via-border bg-via-bg-subtle">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 text-left font-semibold text-via-navy cursor-pointer select-none whitespace-nowrap ${col.className ?? ''}`}
                    onClick={() => handleSort(col.key)}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      <ArrowUpDown
                        className={`w-3.5 h-3.5 ${sortKey === col.key ? 'text-via-orange' : 'text-via-text-light'}`}
                      />
                    </span>
                  </th>
                ))}
                <th className="px-4 py-3 w-20" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((user, idx) => {
                const isEditing = editingId === user.id
                return (
                  <tr
                    key={user.id}
                    className={`border-b border-via-border last:border-b-0 ${
                      idx % 2 === 1 ? 'bg-via-bg-subtle/50' : ''
                    } ${!isEditing ? 'cursor-pointer hover:bg-via-bg-subtle' : ''}`}
                    onClick={() => {
                      if (!isEditing) navigate(`/profile/${user.id}`)
                    }}
                  >
                    {/* Name */}
                    <td className="px-4 py-3 font-medium text-via-navy whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-via-navy text-white text-xs flex items-center justify-center font-semibold">
                          {getInitials(user.full_name)}
                        </span>
                        <span>{user.full_name}</span>
                        <ExternalLink className="w-3 h-3 text-via-text-light" />
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 text-via-text-light hidden lg:table-cell">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <select
                          value={editRole}
                          onChange={(e) => {
                            e.stopPropagation()
                            setEditRole(e.target.value as UserRole)
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg border border-via-orange bg-white px-2 py-1 text-xs text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/40"
                        >
                          <option value="user">User</option>
                          <option value="leadership">Leadership</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${roleBadgeStyles[user.role] ?? 'bg-gray-100 text-gray-700'}`}
                        >
                          {roleLabels[user.role] ?? user.role}
                        </span>
                      )}
                    </td>

                    {/* Team */}
                    <td className="px-4 py-3 text-via-text hidden md:table-cell">
                      {isEditing ? (
                        <select
                          value={editTeamId ?? ''}
                          onChange={(e) => {
                            e.stopPropagation()
                            setEditTeamId(e.target.value || null)
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg border border-via-orange bg-white px-2 py-1 text-xs text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/40"
                        >
                          <option value="">No team</option>
                          {teams.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-sm">
                          {getTeamName(user.team_id)}
                        </span>
                      )}
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-3 text-via-text-light hidden md:table-cell whitespace-nowrap">
                      {formatDate(user.created_at)}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div
                        className="flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleSave(user.id)}
                              disabled={saving}
                              className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-600 transition-colors cursor-pointer disabled:opacity-40"
                              title="Save"
                            >
                              {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              className="p-1.5 rounded-lg hover:bg-red-100 text-via-text-light hover:text-via-danger transition-colors cursor-pointer"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => startEdit(user)}
                            className="p-1.5 rounded-lg hover:bg-via-bg-subtle text-via-text-light hover:text-via-navy transition-colors cursor-pointer"
                            title="Edit role & team"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
