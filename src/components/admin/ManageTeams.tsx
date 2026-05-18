import { useState, useEffect, useCallback } from 'react'
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Loader2,
  Users,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface TeamWithCount {
  id: string
  name: string
  created_at: string
  memberCount: number
}

export function ManageTeams() {
  const [teams, setTeams] = useState<TeamWithCount[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const loadTeams = useCallback(async () => {
    const [teamsRes, profilesRes] = await Promise.all([
      supabase.from('teams').select('*').order('name'),
      supabase.from('profiles').select('id, team_id'),
    ])

    if (teamsRes.data) {
      const countMap: Record<string, number> = {}
      if (profilesRes.data) {
        for (const p of profilesRes.data) {
          if (p.team_id) {
            countMap[p.team_id] = (countMap[p.team_id] || 0) + 1
          }
        }
      }
      setTeams(
        teamsRes.data.map((t) => ({
          ...t,
          memberCount: countMap[t.id] || 0,
        })),
      )
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadTeams()
  }, [loadTeams])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = newName.trim()
    if (!trimmed) return

    if (teams.some((t) => t.name.toLowerCase() === trimmed.toLowerCase())) {
      setError('A team with this name already exists')
      return
    }

    setCreating(true)
    setError('')

    const { data, error: insertError } = await supabase
      .from('teams')
      .insert({ name: trimmed })
      .select()
      .single()

    if (insertError) {
      setError(insertError.message)
      setCreating(false)
      return
    }

    if (data) {
      setTeams((prev) =>
        [...prev, { ...data, memberCount: 0 }].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      )
    }
    setNewName('')
    setCreating(false)
  }

  async function handleRename(id: string) {
    const trimmed = editName.trim()
    if (!trimmed) return

    if (
      teams.some(
        (t) => t.id !== id && t.name.toLowerCase() === trimmed.toLowerCase(),
      )
    ) {
      setError('A team with this name already exists')
      return
    }

    setSaving(true)
    setError('')

    const { error: updateError } = await supabase
      .from('teams')
      .update({ name: trimmed })
      .eq('id', id)

    if (updateError) {
      setError(updateError.message)
      setSaving(false)
      return
    }

    setTeams((prev) =>
      prev
        .map((t) => (t.id === id ? { ...t, name: trimmed } : t))
        .sort((a, b) => a.name.localeCompare(b.name)),
    )
    setEditingId(null)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    const team = teams.find((t) => t.id === id)
    if (!team || team.memberCount > 0) return

    setError('')

    const { error: deleteError } = await supabase
      .from('teams')
      .delete()
      .eq('id', id)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setTeams((prev) => prev.filter((t) => t.id !== id))
  }

  function startEdit(team: TeamWithCount) {
    setEditingId(team.id)
    setEditName(team.name)
    setError('')
  }

  function cancelEdit() {
    setEditingId(null)
    setEditName('')
    setError('')
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
      {/* Create team */}
      <div className="bg-via-card rounded-xl p-6 border border-via-border">
        <h3 className="text-lg font-bold text-via-navy mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Create a Team
        </h3>

        <form onSubmit={handleCreate} className="flex items-end gap-3">
          <div className="flex-1">
            <label
              htmlFor="team-name"
              className="block text-sm font-semibold text-via-navy mb-1.5"
            >
              Team Name
            </label>
            <input
              id="team-name"
              type="text"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value)
                setError('')
              }}
              placeholder="e.g. Customer Success"
              disabled={creating}
              className="w-full rounded-lg border border-via-border bg-white px-3 py-2.5 text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/40 focus:border-via-orange disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={creating || !newName.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-via-orange text-white text-sm font-semibold hover:bg-via-orange/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {creating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Create
          </button>
        </form>

        {error && (
          <p className="text-xs text-via-danger font-medium mt-2">{error}</p>
        )}
      </div>

      {/* Teams list */}
      <div className="bg-via-card rounded-xl p-6 border border-via-border">
        <h3 className="text-lg font-bold text-via-navy mb-4">
          Teams ({teams.length})
        </h3>

        {teams.length === 0 ? (
          <p className="text-sm text-via-text-light py-4 text-center">
            No teams yet. Create one above.
          </p>
        ) : (
          <div className="space-y-2">
            {teams.map((team) => (
              <div
                key={team.id}
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-via-bg-subtle border border-via-border"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Building2 className="w-4 h-4 text-via-text-light flex-shrink-0" />

                  {editingId === team.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRename(team.id)
                        if (e.key === 'Escape') cancelEdit()
                      }}
                      autoFocus
                      className="flex-1 rounded-lg border border-via-orange bg-white px-2 py-1 text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/40"
                    />
                  ) : (
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-via-navy">
                        {team.name}
                      </p>
                      <p className="text-xs text-via-text-light flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {team.memberCount} member
                        {team.memberCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {editingId === team.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleRename(team.id)}
                        disabled={saving || !editName.trim()}
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
                    <>
                      <button
                        type="button"
                        onClick={() => startEdit(team)}
                        className="p-1.5 rounded-lg hover:bg-via-bg-subtle text-via-text-light hover:text-via-navy transition-colors cursor-pointer"
                        title="Rename team"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(team.id)}
                        disabled={team.memberCount > 0}
                        className="p-1.5 rounded-lg hover:bg-red-100 text-via-text-light hover:text-via-danger transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        title={
                          team.memberCount > 0
                            ? 'Cannot delete team with members'
                            : 'Delete team'
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
