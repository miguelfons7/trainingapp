import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '../types'

interface AuthContextValue {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  /** Start the Google OAuth redirect. Resolves with an error only if it fails
   *  to initiate; on success the browser navigates to Google. Pass emailHint
   *  (e.g. an invited user's address) to pre-select that Google account. */
  signInWithGoogle: (options?: { emailHint?: string }) => Promise<{ error?: string }>
  logout: () => Promise<void>
  isAdmin: boolean
  isLeadership: boolean
  /** Refresh the profile from the database (e.g. after role change) */
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

/**
 * Fetch the profile row from the `profiles` table and return a User object.
 * Returns null if no profile is found (e.g. invitation hasn't been set up).
 */
async function fetchProfileAsUser(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error || !data) return null

  // Archived (offboarded) users can't use the app. The auth-layer ban blocks
  // new logins; this immediately closes out any still-live session on the next
  // profile fetch. Treated like "no profile" -> routed back to /login.
  if (data.archived_at) return null

  // Assigned programs (many-to-many). Empty array = no program assigned yet.
  // If the user_programs table isn't available yet (e.g. migration not run) or
  // the query errors, fall back to the legacy single program_id so users aren't
  // stranded during the migration window.
  const { data: programRows, error: programError } = await supabase
    .from('user_programs')
    .select('program_id')
    .eq('user_id', userId)

  const programIds =
    programError || !programRows
      ? data.program_id
        ? [data.program_id]
        : []
      : programRows.map((r) => r.program_id)

  // Individually-assigned courses (course_assignments). Independent of programs:
  // these grant the learner access to specific courses without a program. RLS
  // scopes this to the user's own rows.
  const { data: assignmentRows } = await supabase
    .from('course_assignments')
    .select('course_id')
    .eq('user_id', userId)

  const assignedCourseIds = (assignmentRows ?? []).map((r) => r.course_id)

  return {
    id: data.id,
    email: data.email,
    name: data.full_name,
    role: data.role as User['role'],
    avatar: data.avatar_url ?? undefined,
    teamId: data.team_id ?? undefined,
    programId: data.program_id ?? undefined,
    programIds,
    assignedCourseIds,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Supabase v2 fires INITIAL_SESSION inside onAuthStateChange, but doing
  // async work (like fetching the profile) inside the callback can deadlock
  // with Supabase's internal auth lock. Instead, we capture the session and
  // handle the profile fetch outside the callback via a separate effect.
  const [authUserId, setAuthUserId] = useState<string | null | undefined>(
    undefined,
  )

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Only capture the user ID — no async work here to avoid lock issues
      setAuthUserId(session?.user?.id ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // When authUserId changes, fetch the profile (or clear user)
  useEffect(() => {
    // undefined = haven't received INITIAL_SESSION yet
    if (authUserId === undefined) return

    if (!authUserId) {
      setUser(null)
      setLoading(false)
      return
    }

    let cancelled = false
    fetchProfileAsUser(authUserId).then((profile) => {
      if (!cancelled) {
        setUser(profile)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [authUserId])

  const signIn = useCallback(
    async (email: string, password: string): Promise<{ error?: string }> => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) return { error: error.message }
      return {}
    },
    [],
  )

  const signInWithGoogle = useCallback(
    async (options?: { emailHint?: string }): Promise<{ error?: string }> => {
      // Full-page redirect to Google. On success the browser navigates away, so
      // this only returns when initiation fails. The OAuth return is handled by
      // the existing onAuthStateChange -> authUserId -> fetchProfileAsUser flow.
      // hd hints the @viatrading.com Workspace; the Internal consent screen is
      // what actually enforces the domain restriction. login_hint pre-selects an
      // invited user's account so an invite + Google sign-in lands on the right one.
      const queryParams: Record<string, string> = {
        hd: 'viatrading.com',
        prompt: 'select_account',
      }
      if (options?.emailHint) queryParams.login_hint = options.emailHint

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams,
        },
      })
      if (error) return { error: error.message }
      return {}
    },
    [],
  )

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
  }, [])

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      const profile = await fetchProfileAsUser(user.id)
      if (profile) setUser(profile)
    }
  }, [user?.id])

  const isAdmin = user?.role === 'admin'
  const isLeadership = user?.role === 'leadership' || isAdmin

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signInWithGoogle,
        logout,
        isAdmin,
        isLeadership,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
