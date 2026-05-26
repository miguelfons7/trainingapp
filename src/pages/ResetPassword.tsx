import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { GraduationCap, Lock, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

type TokenStatus = 'loading' | 'valid' | 'expired' | 'used' | 'not-found'

interface ResetInfo {
  email: string
  fullName: string
}

export function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [tokenStatus, setTokenStatus] = useState<TokenStatus>('loading')
  const [resetInfo, setResetInfo] = useState<ResetInfo | null>(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Validate the token on mount
  useEffect(() => {
    if (!token) {
      setTokenStatus('not-found')
      return
    }

    async function validateToken() {
      const { data, error } = await supabase.rpc('validate_password_reset_token', {
        reset_token: token!,
      })

      if (error || !data || data.length === 0) {
        setTokenStatus('not-found')
        return
      }

      const row = data[0]
      if (row.status === 'expired') {
        setTokenStatus('expired')
        return
      }
      if (row.status === 'used') {
        setTokenStatus('used')
        return
      }

      setResetInfo({
        email: row.email,
        fullName: row.full_name,
      })
      setTokenStatus('valid')
    }

    validateToken()
  }, [token])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (!token) return

    setSubmitting(true)
    setError('')

    const { data, error: rpcError } = await supabase.rpc('reset_password_with_token', {
      reset_token: token,
      new_password: password,
    })

    if (rpcError) {
      setError(rpcError.message)
      setSubmitting(false)
      return
    }

    const result = data as { success: boolean; error?: string }
    if (!result.success) {
      setError(result.error || 'Failed to reset password. The link may have expired.')
      setSubmitting(false)
      return
    }

    // Sign out any existing session so the user starts fresh
    await supabase.auth.signOut()
    setSuccess(true)
    setSubmitting(false)
  }

  // No token provided
  if (!token) {
    return (
      <div className="min-h-screen bg-via-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <XCircle className="w-12 h-12 text-via-danger mx-auto mb-4" />
          <h1 className="text-xl font-bold text-via-navy mb-2">
            Invalid Reset Link
          </h1>
          <p className="text-sm text-via-text-light mb-6">
            This page requires a valid password reset link. Ask your admin to generate one for you.
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
            Validating your reset link...
          </p>
        </div>
      </div>
    )
  }

  // Token expired, used, or not found
  if (tokenStatus === 'expired' || tokenStatus === 'used' || tokenStatus === 'not-found') {
    return (
      <div className="min-h-screen bg-via-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <XCircle className="w-12 h-12 text-via-danger mx-auto mb-4" />
          <h1 className="text-xl font-bold text-via-navy mb-2">
            {tokenStatus === 'expired'
              ? 'Link Expired'
              : tokenStatus === 'used'
                ? 'Link Already Used'
                : 'Invalid Link'}
          </h1>
          <p className="text-sm text-via-text-light mb-6">
            {tokenStatus === 'expired'
              ? 'This password reset link has expired. Ask your admin to generate a new one.'
              : tokenStatus === 'used'
                ? 'This password reset link has already been used. Ask your admin for a new one if needed.'
                : 'This reset link is not valid. Make sure you copied the full URL.'}
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

  // Password updated successfully
  if (success) {
    return (
      <div className="min-h-screen bg-via-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-via-navy mb-2">
            Password Updated
          </h1>
          <p className="text-sm text-via-text-light mb-6">
            Your password has been reset. You can now sign in with your new password.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-via-navy text-white text-sm font-medium hover:bg-via-navy-light transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  // Valid token — show password reset form
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
            Reset your password
          </p>
        </div>

        {/* Card */}
        <div className="bg-via-card rounded-2xl border border-via-border p-8 shadow-sm">
          {/* User info banner */}
          {resetInfo && (
            <div className="bg-sky-50 rounded-lg border border-sky-200 p-3 mb-6">
              <p className="text-xs text-sky-700 font-medium">
                Resetting password for
              </p>
              <p className="text-xs text-sky-600 mt-0.5">
                {resetInfo.fullName} ({resetInfo.email})
              </p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* New password */}
            <div>
              <label className="block text-xs font-medium text-via-text mb-1.5">
                New Password
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
                Confirm New Password
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
                  Updating password...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          <p className="text-[10px] text-via-text-light/60 text-center mt-4">
            Remember your password?{' '}
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
