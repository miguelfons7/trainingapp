import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  UserCircle,
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  BarChart3,
  Loader2,
  FileCheck,
  TrendingUp,
  Calendar,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { useCompliance } from '../context/ComplianceContext'
import { courses } from '../data/courses'
import { supabase } from '../lib/supabase'
import type { Profile, Team, ModuleProgressRow } from '../types/database'

const roleBadgeStyles: Record<string, string> = {
  admin: 'bg-indigo-100 text-indigo-700',
  leadership: 'bg-purple-100 text-purple-700',
  user: 'bg-sky-100 text-sky-700',
}

const roleLabels: Record<string, string> = {
  admin: 'Admin',
  leadership: 'Leadership',
  user: 'User',
}

export function UserProfile() {
  const { userId } = useParams<{ userId: string }>()
  const { user: currentUser, isAdmin, isLeadership } = useAuth()
  const { getCourseProgress } = useProgress()
  const { items, isAcknowledged } = useCompliance()

  const isOwnProfile = !userId || userId === currentUser?.id
  const targetUserId = userId || currentUser?.id

  const [profile, setProfile] = useState<Profile | null>(null)
  const [team, setTeam] = useState<Team | null>(null)
  const [progressRows, setProgressRows] = useState<ModuleProgressRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!targetUserId) return

    async function loadProfile() {
      setLoading(true)

      // Fetch the profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUserId!)
        .single()

      if (profileData) {
        setProfile(profileData)

        // Fetch team if exists
        if (profileData.team_id) {
          const { data: teamData } = await supabase
            .from('teams')
            .select('*')
            .eq('id', profileData.team_id)
            .single()
          if (teamData) setTeam(teamData)
        }
      }

      // Fetch module progress for this user
      const { data: progressData } = await supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', targetUserId!)

      if (progressData) setProgressRows(progressData)

      setLoading(false)
    }

    loadProfile()
  }, [targetUserId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-via-navy animate-spin" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
          <UserCircle className="w-12 h-12 text-via-text-light mx-auto mb-4" />
          <h1 className="text-xl font-bold text-via-navy mb-2">User Not Found</h1>
          <p className="text-sm text-via-text-light">
            This profile doesn't exist or you don't have permission to view it.
          </p>
        </div>
      </div>
    )
  }

  // Compute stats from progress rows
  const completedModules = progressRows.filter((r) => r.status === 'completed')
  const quizScores = completedModules.filter((r) => r.score !== null)
  const avgScore =
    quizScores.length > 0
      ? Math.round(
          quizScores.reduce((sum, r) => sum + (r.score ?? 0), 0) /
            quizScores.length,
        )
      : null

  // Build course progress from progress rows
  const availableCourses = courses.filter((c) => c.status === 'available')
  const courseProgressList = availableCourses.map((course) => {
    const total = course.modules.length
    let completed: number

    if (isOwnProfile) {
      // Use ProgressContext for own profile (more up-to-date with optimistic updates)
      completed = getCourseProgress(course.id).completed
    } else {
      completed = course.modules.filter((m) =>
        progressRows.some(
          (r) =>
            r.course_id === course.id &&
            r.module_id === m.id &&
            r.status === 'completed',
        ),
      ).length
    }

    return {
      course,
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  })

  const completedCourses = courseProgressList.filter(
    (cp) => cp.percentage === 100,
  )

  // Acknowledgements (stored in Supabase, visible for all profiles)
  const acknowledgedItems = isOwnProfile
    ? items.filter((item) => isAcknowledged(item.id))
    : items.filter((item) => item.acknowledgedBy.includes(targetUserId!))

  // Recent activity: last 10 completed modules sorted by date
  const recentActivity = [...completedModules]
    .filter((r) => r.completed_at)
    .sort(
      (a, b) =>
        new Date(b.completed_at!).getTime() -
        new Date(a.completed_at!).getTime(),
    )
    .slice(0, 10)

  const initials = profile.full_name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  function getModuleTitle(courseId: string, moduleId: string): string {
    const course = courses.find((c) => c.id === courseId)
    const mod = course?.modules.find((m) => m.id === moduleId)
    return mod?.title ?? moduleId
  }

  function getCourseTitle(courseId: string): string {
    return courses.find((c) => c.id === courseId)?.title ?? courseId
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="bg-via-card rounded-xl border border-via-border overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-via-navy to-via-navy-light h-24" />
        <div className="px-6 pb-6 -mt-10">
          <div className="flex items-end gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-via-orange/20 border-4 border-via-card flex items-center justify-center text-2xl font-bold text-via-orange shrink-0">
              {initials}
            </div>
            <div className="pb-1">
              <h1 className="text-xl font-bold text-via-navy">
                {profile.full_name}
              </h1>
              <p className="text-sm text-via-text-light">{profile.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${roleBadgeStyles[profile.role] ?? 'bg-gray-100 text-gray-700'}`}
            >
              {roleLabels[profile.role] ?? profile.role}
            </span>
            {team && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                {team.name}
              </span>
            )}
            <span className="text-xs text-via-text-light flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Joined {formatDate(profile.created_at)}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard
          icon={<BookOpen className="w-4 h-4 text-sky-600" />}
          value={String(completedCourses.length)}
          label="Courses Completed"
          bgColor="bg-sky-50"
        />
        <StatCard
          icon={<CheckCircle className="w-4 h-4 text-emerald-600" />}
          value={String(completedModules.length)}
          label="Modules Completed"
          bgColor="bg-emerald-50"
        />
        <StatCard
          icon={<BarChart3 className="w-4 h-4 text-violet-600" />}
          value={avgScore !== null ? `${avgScore}%` : '—'}
          label="Avg Quiz Score"
          bgColor="bg-violet-50"
        />
        <StatCard
          icon={<FileCheck className="w-4 h-4 text-blue-600" />}
          value={
            isOwnProfile ? String(acknowledgedItems.length) : '—'
          }
          label="Acks Signed"
          bgColor="bg-blue-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — Course Progress + Certifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Progress */}
          <div className="bg-via-card rounded-xl border border-via-border p-6">
            <h2 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Course Progress
            </h2>
            {courseProgressList.length === 0 ? (
              <p className="text-sm text-via-text-light text-center py-4">
                No courses available.
              </p>
            ) : (
              <div className="space-y-3">
                {courseProgressList.map(({ course, completed, total, percentage }) => (
                  <Link
                    key={course.id}
                    to={`/course/${course.id}`}
                    className="block p-3 rounded-lg bg-via-bg-subtle border border-via-border hover:bg-via-bg-subtle/80 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-medium text-via-navy">
                        {course.title}
                      </p>
                      <span className="text-xs font-semibold text-via-text-light">
                        {completed}/{total}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-via-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${percentage === 100 ? 'bg-emerald-500' : percentage > 0 ? 'bg-via-orange' : 'bg-transparent'}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-via-text-light mt-1">
                      {percentage === 100
                        ? 'Completed'
                        : percentage > 0
                          ? `${percentage}% complete`
                          : 'Not started'}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Certifications */}
          {(completedCourses.length > 0 || acknowledgedItems.length > 0) && (
            <div className="bg-via-card rounded-xl border border-via-border p-6">
              <h2 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certifications
              </h2>

              {completedCourses.length > 0 && (
                <div className="space-y-2 mb-4">
                  {completedCourses.map(({ course }) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-emerald-800 truncate">
                          {course.title}
                        </p>
                        <p className="text-xs text-emerald-600">
                          Course Completed
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isOwnProfile && acknowledgedItems.length > 0 && (
                <div className="space-y-2">
                  {acknowledgedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200"
                    >
                      <FileCheck className="w-5 h-5 text-blue-600 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-blue-800 truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-blue-600">Acknowledged</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right column — Recent Activity */}
        <div className="space-y-6">
          <div className="bg-via-card rounded-xl border border-via-border p-6">
            <h2 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Activity
            </h2>
            {recentActivity.length === 0 ? (
              <p className="text-sm text-via-text-light text-center py-4">
                No activity yet.
              </p>
            ) : (
              <div className="space-y-0">
                {recentActivity.map((row, idx) => (
                  <div
                    key={row.id}
                    className={`flex gap-3 py-3 ${idx < recentActivity.length - 1 ? 'border-b border-via-border' : ''}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-via-navy truncate">
                        {getModuleTitle(row.course_id, row.module_id)}
                      </p>
                      <p className="text-[11px] text-via-text-light truncate">
                        {getCourseTitle(row.course_id)}
                      </p>
                      {row.score !== null && (
                        <p className="text-[11px] text-via-orange font-medium">
                          Score: {row.score}%
                        </p>
                      )}
                      <p className="text-[10px] text-via-text-light/60">
                        {row.completed_at ? formatDate(row.completed_at) : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick info for admin viewing other users */}
          {!isOwnProfile && (isAdmin || isLeadership) && (
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
              <p className="text-xs text-amber-700 font-medium mb-1">
                Viewing as {isAdmin ? 'Admin' : 'Leadership'}
              </p>
              <p className="text-xs text-amber-600">
                Acknowledgement data is only available on the user's own profile
                view.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  value,
  label,
  bgColor,
}: {
  icon: React.ReactNode
  value: string
  label: string
  bgColor: string
}) {
  return (
    <div className="bg-via-card rounded-xl border border-via-border p-4">
      <div
        className={`w-8 h-8 rounded-lg ${bgColor} flex items-center justify-center mb-2`}
      >
        {icon}
      </div>
      <p className="text-lg font-bold text-via-navy">{value}</p>
      <p className="text-[11px] text-via-text-light">{label}</p>
    </div>
  )
}
