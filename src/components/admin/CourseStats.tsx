import { useState, useEffect } from 'react'
import { Loader2, X, BarChart3 } from 'lucide-react'
import { useCourses } from '../../context/CoursesContext'
import { supabase } from '../../lib/supabase'
import type { Profile } from '../../types/database'

type PopupKind = 'started' | 'completed' | 'scores'

interface PopupState {
  courseTitle: string
  kind: PopupKind
  users: { name: string; score?: number }[]
}

interface ModuleProgressRow {
  user_id: string
  course_id: string
  module_id: string
  status: string
  score: number | null
}

interface ComputedCourseStat {
  courseId: string
  title: string
  totalModules: number
  startedUsers: string[]
  completedUsers: string[]
  scoredUsers: { userId: string; score: number }[]
  avgScore: number | null
}

interface ProgramStat {
  programId: string
  title: string
  totalCourses: number
  totalModules: number
  enrolled: number            // users who started at least 1 course in program
  completed: number           // users who completed ALL available courses in program
  avgOverallProgress: number  // average % across enrolled users
}

export function CourseStats() {
  const { courses, programs } = useCourses()
  const availableCourses = courses.filter((c) => c.status === 'available')
  const [stats, setStats] = useState<ComputedCourseStat[]>([])
  const [programStats, setProgramStats] = useState<ProgramStat[]>([])
  const [profiles, setProfiles] = useState<Map<string, string>>(new Map())
  const [loading, setLoading] = useState(true)
  const [popup, setPopup] = useState<PopupState | null>(null)

  useEffect(() => {
    async function loadData() {
      const [progressResult, profilesResult] = await Promise.all([
        supabase.from('module_progress').select('*'),
        supabase.from('profiles').select('id, full_name'),
      ])

      const rows: ModuleProgressRow[] = progressResult.data ?? []
      const profileRows: Pick<Profile, 'id' | 'full_name'>[] = profilesResult.data ?? []

      const profileMap = new Map<string, string>()
      for (const p of profileRows) {
        profileMap.set(p.id, p.full_name)
      }
      setProfiles(profileMap)

      const computed: ComputedCourseStat[] = availableCourses.map((course) => {
        const courseRows = rows.filter((r) => r.course_id === course.id)

        // Unique users who have at least 1 module_progress row for this course
        const startedUsers = [...new Set(courseRows.map((r) => r.user_id))]

        // Users who completed ALL modules in this course
        const completedUsers: string[] = []
        for (const userId of startedUsers) {
          const userCompleted = courseRows.filter(
            (r) => r.user_id === userId && r.status === 'completed',
          )
          if (userCompleted.length >= course.modules.length) {
            completedUsers.push(userId)
          }
        }

        // Users with scores
        const scoredUsers: { userId: string; score: number }[] = []
        const seenScoreUsers = new Set<string>()
        for (const row of courseRows) {
          if (row.score !== null && !seenScoreUsers.has(row.user_id)) {
            seenScoreUsers.add(row.user_id)
            // Get the user's highest score for this course
            const userScores = courseRows
              .filter((r) => r.user_id === row.user_id && r.score !== null)
              .map((r) => r.score as number)
            const maxScore = Math.max(...userScores)
            scoredUsers.push({ userId: row.user_id, score: maxScore })
          }
        }

        const avgScore =
          scoredUsers.length > 0
            ? Math.round(
                scoredUsers.reduce((sum, u) => sum + u.score, 0) / scoredUsers.length,
              )
            : null

        return {
          courseId: course.id,
          title: course.title,
          totalModules: course.modules.length,
          startedUsers,
          completedUsers,
          scoredUsers,
          avgScore,
        }
      })

      setStats(computed)

      // Compute program-level stats
      const pStats: ProgramStat[] = programs.map((program) => {
        const programCourses = program.courseIds
          .map((cid) => availableCourses.find((c) => c.id === cid))
          .filter(Boolean) as typeof availableCourses
        const totalModules = programCourses.reduce((sum, c) => sum + c.modules.length, 0)

        // Find all unique users who have started at least 1 course in this program
        const enrolledSet = new Set<string>()
        for (const course of programCourses) {
          const courseRows = rows.filter((r) => r.course_id === course.id)
          for (const r of courseRows) enrolledSet.add(r.user_id)
        }

        // Completed = users who completed ALL modules across ALL available courses in the program
        const completedSet = new Set<string>()
        for (const userId of enrolledSet) {
          let allComplete = true
          for (const course of programCourses) {
            const userCompleted = rows.filter(
              (r) => r.user_id === userId && r.course_id === course.id && r.status === 'completed',
            ).length
            if (userCompleted < course.modules.length) {
              allComplete = false
              break
            }
          }
          if (allComplete) completedSet.add(userId)
        }

        // Average overall progress for enrolled users
        let avgProgress = 0
        if (enrolledSet.size > 0) {
          let totalProgress = 0
          for (const userId of enrolledSet) {
            const userCompleted = rows.filter(
              (r) => r.user_id === userId && programCourses.some((c) => c.id === r.course_id) && r.status === 'completed',
            ).length
            totalProgress += totalModules > 0 ? (userCompleted / totalModules) * 100 : 0
          }
          avgProgress = Math.round(totalProgress / enrolledSet.size)
        }

        return {
          programId: program.id,
          title: program.title,
          totalCourses: programCourses.length,
          totalModules,
          enrolled: enrolledSet.size,
          completed: completedSet.size,
          avgOverallProgress: avgProgress,
        }
      })

      setProgramStats(pStats)
      setLoading(false)
    }

    loadData()
  }, [])

  function openPopup(stat: ComputedCourseStat, kind: PopupKind) {
    let users: { name: string; score?: number }[] = []

    if (kind === 'started') {
      users = stat.startedUsers.map((id) => ({
        name: profiles.get(id) ?? 'Unknown User',
      }))
    } else if (kind === 'completed') {
      users = stat.completedUsers.map((id) => ({
        name: profiles.get(id) ?? 'Unknown User',
      }))
    } else if (kind === 'scores') {
      users = stat.scoredUsers.map((u) => ({
        name: profiles.get(u.userId) ?? 'Unknown User',
        score: u.score,
      }))
    }

    users.sort((a, b) => a.name.localeCompare(b.name))

    setPopup({ courseTitle: stat.title, kind, users })
  }

  function kindLabel(kind: PopupKind): string {
    if (kind === 'started') return 'Users Started'
    if (kind === 'completed') return 'Users Completed'
    return 'User Scores'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-via-navy animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Program Overview */}
      {programStats.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-via-navy" />
            <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide">
              Program Overview
            </h3>
          </div>
          <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-via-bg-subtle">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide">
                    Program
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide">
                    Courses
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide">
                    Modules
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide">
                    Enrolled
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide">
                    Completed
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide">
                    Avg Progress
                  </th>
                </tr>
              </thead>
              <tbody>
                {programStats.map((ps) => (
                  <tr
                    key={ps.programId}
                    className="border-b border-via-border last:border-b-0 hover:bg-via-card-hover transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm text-via-navy font-medium">{ps.title}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-via-text">{ps.totalCourses}</td>
                    <td className="px-4 py-3 text-center text-sm text-via-text">{ps.totalModules}</td>
                    <td className="px-4 py-3 text-center text-sm font-semibold text-via-navy">{ps.enrolled}</td>
                    <td className="px-4 py-3 text-center text-sm font-semibold text-via-navy">{ps.completed}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-sm font-semibold ${
                        ps.avgOverallProgress >= 80
                          ? 'text-via-success'
                          : ps.avgOverallProgress >= 40
                            ? 'text-via-warning'
                            : 'text-via-text'
                      }`}>
                        {ps.enrolled > 0 ? `${ps.avgOverallProgress}%` : '--'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Course Stats */}
      <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-via-bg-subtle">
              <th className="text-left px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide">
                Course
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide">
                Modules
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide">
                Started
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide">
                Completed
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-via-text-light uppercase tracking-wide">
                Avg Score
              </th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr
                key={stat.courseId}
                className="border-b border-via-border hover:bg-via-card-hover transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="text-sm text-via-navy font-medium">{stat.title}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-sm text-via-text">{stat.totalModules}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => openPopup(stat, 'started')}
                    className="text-sm text-via-navy font-semibold cursor-pointer hover:text-via-orange transition-colors"
                    disabled={stat.startedUsers.length === 0}
                  >
                    {stat.startedUsers.length}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => openPopup(stat, 'completed')}
                    className="text-sm text-via-navy font-semibold cursor-pointer hover:text-via-orange transition-colors"
                    disabled={stat.completedUsers.length === 0}
                  >
                    {stat.completedUsers.length}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => openPopup(stat, 'scores')}
                    className="text-sm text-via-navy font-semibold cursor-pointer hover:text-via-orange transition-colors"
                    disabled={stat.scoredUsers.length === 0}
                  >
                    {stat.avgScore !== null ? `${stat.avgScore}%` : '--'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {popup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setPopup(null)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative bg-via-card rounded-xl border border-via-border shadow-xl w-full max-w-md mx-4 max-h-[70vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-via-border">
              <div>
                <h3 className="text-sm font-semibold text-via-navy">
                  {kindLabel(popup.kind)}
                </h3>
                <p className="text-xs text-via-text-light mt-0.5">{popup.courseTitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setPopup(null)}
                className="p-1 rounded-lg hover:bg-via-bg-subtle transition-colors text-via-text-light hover:text-via-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* User list */}
            <div className="overflow-y-auto px-5 py-3">
              {popup.users.length === 0 ? (
                <p className="text-sm text-via-text-light py-4 text-center">No users found.</p>
              ) : (
                <ul className="space-y-1">
                  {popup.users.map((user, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-via-bg-subtle transition-colors"
                    >
                      <span className="text-sm text-via-text">{user.name}</span>
                      {user.score !== undefined && (
                        <span className="text-sm font-semibold text-via-navy">
                          {user.score}%
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
