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

  return {
    id: data.id,
    email: data.email,
    name: data.full_name,
    role: data.role as User['role'],
    avatar: data.avatar_url ?? undefined,
    teamId: data.team_id ?? undefined,
    programId: data.program_id ?? undefined,
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
