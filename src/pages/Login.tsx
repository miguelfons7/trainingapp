import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

/**
 * DEV-ONLY: Explicit admin allowlist.
 * In production this would be driven by a real auth provider / role system.
 */
const DEV_ADMIN_EMAILS = ['miguel@viatrading.com']

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPicker, setShowPicker] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleEmailClick = () => {
    setShowPicker(true)
    setEmail('')
    setName('')
    setError('')
  }

  const handleSignIn = () => {
    const normalizedEmail = email.trim().toLowerCase()
    const trimmedName = name.trim()

    if (!normalizedEmail.endsWith('@viatrading.com')) {
      setError('Please use your @viatrading.com email')
      return
    }
    if (!trimmedName) {
      setError('Please enter your name')
      return
    }

    const isAdmin = DEV_ADMIN_EMAILS.includes(normalizedEmail)

    login({
      email: normalizedEmail,
      name: trimmedName,
      role: isAdmin ? 'admin' : 'learner',
    })
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-via-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-via-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-via-navy">Via Academy</h1>
          <p className="text-sm text-via-text-light mt-1">
            Internal Knowledge & Training Platform
          </p>
        </div>

        {/* Card */}
        <div className="bg-via-card rounded-2xl border border-via-border p-8 shadow-sm">
          {!showPicker ? (
            <>
              <h2 className="text-lg font-semibold text-via-navy text-center mb-6">
                Sign in to continue
              </h2>

              <button
                onClick={handleEmailClick}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-via-border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Mail className="w-5 h-5 text-via-navy" />
                <span className="text-sm font-medium text-gray-700">
                  Continue with Email
                </span>
              </button>

              <p className="text-xs text-via-text-light text-center mt-4">
                Use your <span className="font-medium">@viatrading.com</span>{' '}
                email to sign in
              </p>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-via-navy text-center mb-1">
                Welcome to Via Academy
              </h2>
              <p className="text-xs text-via-text-light text-center mb-6">
                Enter your Via Trading credentials
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-via-text mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      setError('')
                    }}
                    placeholder="e.g. John Smith"
                    className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-via-text mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    placeholder="you@viatrading.com"
                    className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                  />
                </div>

                {error && (
                  <p className="text-xs text-via-danger font-medium">{error}</p>
                )}

                <button
                  onClick={handleSignIn}
                  className="w-full py-2.5 bg-via-navy text-white text-sm font-medium rounded-lg hover:bg-via-navy-light transition-colors cursor-pointer"
                >
                  Sign In
                </button>

                <button
                  onClick={() => setShowPicker(false)}
                  className="w-full text-xs text-via-text-light hover:text-via-text transition-colors cursor-pointer"
                >
                  Back to sign in options
                </button>
              </div>
            </>
          )}
        </div>

        <p className="text-[10px] text-via-text-light/50 text-center mt-6">
          Via Trading &middot; Internal Use Only &middot; Dev Build
        </p>
      </div>
    </div>
  )
}
