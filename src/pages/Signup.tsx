import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { GraduationCap, Lock, User, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

type TokenStatus = 'loading' | 'valid' | 'expired' | 'not-found'

interface InvitationInfo {
  email: string
  role: string
  teamName: string | null
}

export function Signup() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [tokenStatus, setTokenStatus] = useState<TokenStatus>('loading')
  const [invitation, setInvitation] = useState<InvitationInfo | null>(null)
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [created, setCreated] = useState(false)

  // Validate the token on mount
  useEffect(() => {
    if (!token) {
      setTokenStatus('not-found')
      return
    }

    async function validateToken() {
      // The anon key can't read invitations (RLS), so we use a
      // SECURITY DEFINER Postgres function accessible to anon.
      const { data, error } = await supabase.rpc('validate_invitation_token', {
        invite_token: token!,
      })

      if (error || !data || data.length === 0) {
        // Try a direct query as fallback (in case the function doesn't exist yet)
        // This would only work if there's a SELECT policy for anon
        setTokenStatus('not-found')
        return
      }

      const row = data[0]
      if (row.status === 'expired') {
        setTokenStatus('expired')
        return
      }

      if (row.status === 'accepted') {
        setTokenStatus('expired')
        return
      }

      setInvitation({
        email: row.email,
        role: row.role,
        teamName: row.team_name,
      })
      setTokenStatus('valid')
    }

    validateToken()
  }, [token])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedName = fullName.trim()

    if (!trimmedName) {
      setError('Please enter your full name')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (!invitation) return

    setSubmitting(true)
    setError('')

    // Sign up via Supabase Auth
    // The handle_new_user() trigger will auto-create the profile
    // using data from the matching invitation row
    const { error: signUpError } = await supabase.auth.signUp({
      email: invitation.email,
      password,
      options: {
        data: {
          full_name: trimmedName,
        },
      },
    })

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        setError(
          'An account with this email already exists. Try signing in instead.',
        )
      } else {
        setError(signUpError.message)
      }
      setSubmitting(false)
      return
    }

    setCreated(true)
    setSubmitting(false)
  }

  // No token provided
  if (!token) {
    return (
      <div className="min-h-screen bg-via-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <XCircle className="w-12 h-12 text-via-danger mx-auto mb-4" />
          <h1 className="text-xl font-bold text-via-navy mb-2">
            Invalid Signup Link
          </h1>
          <p className="text-sm text-via-text-light mb-6">
            This signup page requires a valid invitation link. Ask your admin for
            an invite.
          </p>
          <Link
            to="/login"
            className="text-sm font-medium text-via-orange hover:underline"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    )
  }

  // Loading token validation
  if (tokenStatus === 'loading') {
    return (
      <div className="min-h-screen bg-via-bg flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-via-navy animate-spin mx-auto mb-3" />
          <p className="text-sm text-via-text-light">
            Validating your invitation...
          </p>
        </div>
      </div>
    )
  }

  // Token expired or not found
  if (tokenStatus === 'expired' || tokenStatus === 'not-found') {
    return (
      <div className="min-h-screen bg-via-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <XCircle className="w-12 h-12 text-via-danger mx-auto mb-4" />
          <h1 className="text-xl font-bold text-via-navy mb-2">
            {tokenStatus === 'expired'
              ? 'Invitation Expired'
              : 'Invalid Invitation'}
          </h1>
          <p className="text-sm text-via-text-light mb-6">
            {tokenStatus === 'expired'
              ? 'This invitation has expired or has already been used. Ask your admin for a new invite.'
              : 'This invitation link is not valid. Make sure you copied the full URL.'}
          </p>
          <Link
            to="/login"
            className="text-sm font-medium text-via-orange hover:underline"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    )
  }

  // Account created successfully
  if (created) {
    return (
      <div className="min-h-screen bg-via-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-via-navy mb-2">
            Account Created!
          </h1>
          <p className="text-sm text-via-text-light mb-6">
            Welcome to VIAcademy. You can now sign in with your email and
            password.
          </p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-via-navy text-white text-sm font-medium hover:bg-via-navy-light transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  // Valid token — show signup form
  return (
    <div className="min-h-screen bg-via-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src={`${import.meta.env.BASE_URL}images/via-academy-hero.png`}
            alt="VIAcademy"
            className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.nextElementSibling?.classList.remove('hidden')
            }}
          />
          <div className="hidden w-16 h-16 bg-via-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-via-navy">VIAcademy</h1>
          <p className="text-sm text-via-text-light mt-1">
            Create your account
          </p>
        </div>

        {/* Card */}
        <div className="bg-via-card rounded-2xl border border-via-border p-8 shadow-sm">
          {/* Invitation info banner */}
          {invitation && (
            <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-3 mb-6">
              <p className="text-xs text-emerald-700 font-medium">
                You've been invited to join VIAcademy
              </p>
              <p className="text-xs text-emerald-600 mt-0.5">
                {invitation.email}
                {invitation.teamName && ` · ${invitation.teamName}`}
              </p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full name */}
            <div>
              <label className="block text-xs font-medium text-via-text mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-via-text-light/50" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value)
                    setError('')
                  }}
                  placeholder="Your full name"
                  autoComplete="name"
                  disabled={submitting}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange disabled:opacity-50"
                />
              </div>
            </div>

            {/* Email (read-only, from invitation) */}
            <div>
              <label className="block text-xs font-medium text-via-text mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={invitation?.email ?? ''}
                disabled
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-via-bg-subtle text-sm text-via-text-light cursor-not-allowed"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-via-text mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-via-text-light/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  disabled={submitting}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange disabled:opacity-50"
                />
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-xs font-medium text-via-text mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-via-text-light/50" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  disabled={submitting}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange disabled:opacity-50"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-via-danger font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-via-navy text-white text-sm font-medium rounded-lg hover:bg-via-navy-light transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-[10px] text-via-text-light/60 text-center mt-4">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-via-orange hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-[10px] text-via-text-light/50 text-center mt-6">
          Via Trading &middot; Internal Use Only
        </p>
      </div>
    </div>
  )
}
