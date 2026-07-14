import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, Mail, Lock, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { initialOAuthError } from '../lib/oauthError'
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

/** Google's four-color "G" mark (lucide ships no brand icons). */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  )
}
