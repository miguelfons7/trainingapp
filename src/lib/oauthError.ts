/**
 * Capture an OAuth failure returned in the redirect URL.
 *
 * When Google/Supabase reject or cancel a sign-in, they send the browser back
 * to our `redirectTo` (`${origin}/`) with `?error=...&error_description=...`.
 * Our ProtectedRoute immediately client-side redirects `/` -> `/login`, which
 * strips those params before any component mounts. So we read them ONCE,
 * synchronously, at module-eval time (before React Router runs) and stash the
 * message for the Login page to show.
 *
 * We only touch the URL when an `error` param is present, so a successful
 * return (`?code=...`, which Supabase still needs to exchange) is left alone.
 */
function readInitialOAuthError(): string {
  if (typeof window === 'undefined') return ''

  const parse = (raw: string) =>
    new URLSearchParams(raw.replace(/^[#?]/, ''))

  const fromSource = (raw: string): string => {
    const params = parse(raw)
    const code = params.get('error')
    if (!code) return ''
    // access_denied = the user cancelled, or the account was rejected by the
    // "Internal" consent screen (not a @viatrading.com Workspace account).
    if (code === 'access_denied') {
      return 'Google sign-in was cancelled, or that account is not a @viatrading.com Workspace account. Contact your admin if you need access.'
    }
    return (
      params.get('error_description') ||
      'Google sign-in failed. Please try again, or contact your admin.'
    )
  }

  const message = fromSource(window.location.search) || fromSource(window.location.hash)

  if (message) {
    // Strip the error params so a refresh does not re-show it and the URL stays clean.
    window.history.replaceState({}, '', window.location.pathname)
  }

  return message
}

/** OAuth error message captured from the redirect URL at app load (or ''). */
export const initialOAuthError = readInitialOAuthError()
