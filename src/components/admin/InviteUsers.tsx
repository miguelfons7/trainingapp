import { useState, useEffect, useCallback } from 'react'
import {
  UserPlus,
  Mail,
  Send,
  Loader2,
  Clock,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import type { UserRole } from '../../types/database'

interface Team {
  id: string
  name: string
}

interface InvitationRow {
  id: string
  email: string
  role: UserRole
  team_id: string | null
  invited_by: string
  token: string
  accepted_at: string | null
  expires_at: string
  created_at: string
}

export function InviteUsers() {
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<UserRole>('user')
  const [teamId, setTeamId] = useState('')
  const [teams, setTeams] = useState<Team[]>([])
  const [invitations, setInvitations] = useState<InvitationRow[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Load teams and invitations
  const loadData = useCallback(async () => {
    const [teamsRes, invitesRes] = await Promise.all([
      supabase.from('teams').select('*').order('name'),
      supabase
        .from('invitations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50),
    ])

    if (teamsRes.data) setTeams(teamsRes.data)
    if (invitesRes.data) setInvitations(invitesRes.data as InvitationRow[])
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  function getSignupUrl(token: string): string {
    const base = window.location.origin + import.meta.env.BASE_URL
    return `${base}signup?token=${token}`
  }

  async function copyLink(token: string, id: string) {
    try {
      await navigator.clipboard.writeText(getSignupUrl(token))
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // Fallback for non-HTTPS
      const textArea = document.createElement('textarea')
      textArea.value = getSignupUrl(token)
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    const trimmedEmail = email.trim().toLowerCase()
    const trimmedName = fullName.trim()

    if (!trimmedEmail) {
      setError('Please enter an email address')
      return
    }
    if (!trimmedName) {
      setError('Please enter the person\'s full name')
      return
    }
    if (!user) {
      setError('You must be logged in')
      return
    }

    setSubmitting(true)
    setError('')
    setSuccess('')

    // Check if there's already a pending invite for this email
    const { data: existing } = await supabase
      .from('invitations')
      .select('id')
      .eq('email', trimmedEmail)
      .is('accepted_at', null)
      .gt('expires_at', new Date().toISOString())
      .limit(1)

    if (existing && existing.length > 0) {
      setError('An active invitation already exists for this email')
      setSubmitting(false)
      return
    }

    // Create the invitation
    const { data: invite, error: insertError } = await supabase
      .from('invitations')
      .insert({
        email: trimmedEmail,
        role,
        team_id: teamId || null,
        invited_by: user.id,
      })
      .select()
      .single()

    if (insertError) {
      setError(insertError.message)
      setSubmitting(false)
      return
    }

    // Now create the auth user via Supabase signUp (client-side)
    // We'll use a temporary password that the user will need to know
    // Better approach: use Supabase's invite API if available, or
    // just create the invitation and let the user sign up themselves
    setSuccess(
      `Invitation created for ${trimmedName} (${trimmedEmail}). Share the signup link with them.`,
    )

    // Reset form
    setEmail('')
    setFullName('')
    setRole('user')
    setTeamId('')
    setSubmitting(false)

    // Refresh the list
    if (invite) {
      setInvitations((prev) => [invite as InvitationRow, ...prev])
    }
  }

  function getInviteStatus(inv: InvitationRow) {
    if (inv.accepted_at) return 'accepted'
    if (new Date(inv.expires_at) < new Date()) return 'expired'
    return 'pending'
  }

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  function getTeamName(teamId: string | null): string {
    if (!teamId) return '—'
    return teams.find((t) => t.id === teamId)?.name ?? '—'
  }

  return (
    <div className="space-y-6">
      {/* Invite form */}
      <div className="bg-via-card rounded-xl p-6 border border-via-border">
        <h3 className="text-lg font-bold text-via-navy mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Invite a New User
        </h3>

        <form onSubmit={handleInvite} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full name */}
            <div>
              <label
                htmlFor="invite-name"
                className="block text-sm font-semibold text-via-navy mb-1.5"
              >
                Full Name
              </label>
              <input
                id="invite-name"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value)
                  setError('')
                }}
                placeholder="e.g. Sarah Chen"
                disabled={submitting}
                className="w-full rounded-lg border border-via-border bg-white px-3 py-2.5 text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/40 focus:border-via-orange disabled:opacity-50"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="invite-email"
                className="block text-sm font-semibold text-via-navy mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-via-text-light/50" />
                <input
                  id="invite-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="name@viatrading.com"
                  disabled={submitting}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/40 focus:border-via-orange disabled:opacity-50"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="invite-role"
                className="block text-sm font-semibold text-via-navy mb-1.5"
              >
                Role
              </label>
              <select
                id="invite-role"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                disabled={submitting}
                className="w-full rounded-lg border border-via-border bg-white px-3 py-2.5 text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/40 focus:border-via-orange disabled:opacity-50"
              >
                <option value="user">User (Learner)</option>
                <option value="leadership">Leadership</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Team */}
            <div>
              <label
                htmlFor="invite-team"
                className="block text-sm font-semibold text-via-navy mb-1.5"
              >
                Team
              </label>
              <select
                id="invite-team"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                disabled={submitting}
                className="w-full rounded-lg border border-via-border bg-white px-3 py-2.5 text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/40 focus:border-via-orange disabled:opacity-50"
              >
                <option value="">No team</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <p className="text-xs text-via-danger font-medium">{error}</p>}
          {success && (
            <p className="text-xs text-emerald-600 font-medium">{success}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-via-orange text-white text-sm font-semibold hover:bg-via-orange/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Create Invitation
              </>
            )}
          </button>
        </form>
      </div>

      {/* How it works */}
      <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
        <p className="text-sm text-amber-800 font-semibold mb-1">
          How invitations work
        </p>
        <ol className="text-sm text-amber-700 space-y-1 list-decimal list-inside">
          <li>Create an invitation above — this generates a unique signup link.</li>
          <li>Copy the link and share it with the new user (e.g. via email or Slack).</li>
          <li>
            They visit the link, set a password, and their account is automatically
            created with the correct role and team.
          </li>
          <li>Invitations expire after 7 days.</li>
        </ol>
      </div>

      {/* Invitation list */}
      <div className="bg-via-card rounded-xl p-6 border border-via-border">
        <h3 className="text-lg font-bold text-via-navy mb-4">Invitations</h3>

        {invitations.length === 0 ? (
          <p className="text-sm text-via-text-light py-4 text-center">
            No invitations yet. Use the form above to invite your first user.
          </p>
        ) : (
          <div className="space-y-2">
            {invitations.map((inv) => {
              const status = getInviteStatus(inv)
              return (
                <div
                  key={inv.id}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-via-bg-subtle border border-via-border"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {status === 'accepted' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    )}
                    {status === 'pending' && (
                      <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    )}
                    {status === 'expired' && (
                      <XCircle className="w-4 h-4 text-via-text-light flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-via-navy truncate">
                        {inv.email}
                      </p>
                      <p className="text-xs text-via-text-light truncate">
                        {inv.role === 'user'
                          ? 'User'
                          : inv.role === 'leadership'
                            ? 'Leadership'
                            : 'Admin'}{' '}
                        &middot; {getTeamName(inv.team_id)} &middot; Invited{' '}
                        {formatDate(inv.created_at)}
                        {status === 'accepted' &&
                          inv.accepted_at &&
                          ` · Accepted ${formatDate(inv.accepted_at)}`}
                        {status === 'expired' && ' · Expired'}
                      </p>
                    </div>
                  </div>

                  {status === 'pending' && (
                    <button
                      type="button"
                      onClick={() => copyLink(inv.token, inv.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-via-border hover:bg-via-bg-subtle transition-colors cursor-pointer flex-shrink-0"
                      title="Copy signup link"
                    >
                      {copiedId === inv.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  )}

                  {status === 'accepted' && (
                    <span className="text-xs font-medium text-emerald-600 flex-shrink-0">
                      Active
                    </span>
                  )}
                  {status === 'expired' && (
                    <span className="text-xs font-medium text-via-text-light flex-shrink-0">
                      Expired
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
