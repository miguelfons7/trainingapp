import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, Mail, Lock, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { initialOAuthError } from '../lib/oauthError'
import { GoogleIcon } from '../components/shared/GoogleIcon'
import { APP_VERSION } from '../version'

export function Login() {
  const { signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  // Seeded from an OAuth failure returned in the redirect URL (cancel / wrong
  // account), captured before the router stripped it. Kept separate from the
  // form `error` so it renders next to the Google button, not the password form.
  const [googleError, setGoogleError] = useState(initialOAuthError)

  const handleGoogle = async () => {
    setError('')
    setGoogleError('')
    setGoogleLoading(true)
    const { error } = await signInWithGoogle()
    // On success the browser redirects to Google, so we only reach here on
    // failure to initiate — re-enable the button and show why.
    if (error) {
      setGoogleError(error)
      setGoogleLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedEmail) {
      setError('Please enter your email')
      return
    }
    if (!password) {
      setError('Please enter your password')
      return
    }

    setSubmitting(true)
    setError('')
    setGoogleError('')

    const result = await signIn(trimmedEmail, password)

    if (result.error) {
      setError(
        result.error === 'Invalid login credentials'
          ? 'Invalid email or password. Contact your admin if you need access.'
          : result.error,
      )
      setSubmitting(false)
      return
    }

    // Auth state change listener in AuthContext will update user state
    navigate('/')
  }

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
            Via Trading's Knowledge & Training Platform
          </p>
        </div>

        {/* Card */}
        <div className="bg-via-card rounded-2xl border border-via-border p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-via-navy text-center mb-1">
            Welcome to VIAcademy
          </h2>
          <p className="text-xs text-via-text-light text-center mb-6">
            Sign in with your credentials
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-via-text mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-via-text-light/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="you@viatrading.com"
                  autoComplete="email"
                  disabled={submitting}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange disabled:opacity-50"
                />
              </div>
            </div>

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
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={submitting}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange disabled:opacity-50"
                />
              </div>
            </div>

            <p className="text-[11px] text-via-text-light/60 text-right -mt-1">
              Forgot your password? Contact your admin for a reset link.
            </p>

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
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-via-border" />
            <span className="text-[10px] uppercase tracking-wide text-via-text-light/50">
              or
            </span>
            <div className="h-px flex-1 bg-via-border" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={submitting || googleLoading}
            className="w-full py-2.5 bg-white border border-via-border text-via-text text-sm font-medium rounded-lg hover:bg-via-bg-subtle transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <GoogleIcon className="w-4 h-4" />
            )}
            Continue with Google
          </button>

          {googleError && (
            <p className="text-xs text-via-danger font-medium mt-3 text-center">
              {googleError}
            </p>
          )}

          <p className="text-[10px] text-via-text-light/60 text-center mt-4">
            Via Trading staff: use your @viatrading.com Google account.
            <br />
            Trouble signing in? Contact your admin.
          </p>
        </div>

        <p className="text-[10px] text-via-text-light/50 text-center mt-6">
          Via Trading &middot; Internal Use Only &middot; v{APP_VERSION}
        </p>
      </div>
    </div>
  )
}
