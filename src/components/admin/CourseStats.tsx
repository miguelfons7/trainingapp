import { useState, useEffect } from 'react'
import { BookOpen, Users, Award, Clock, Loader2 } from 'lucide-react'
import { courses } from '../../data/courses'
import { supabase } from '../../lib/supabase'

interface ComputedCourseStat {
  courseId: string
  title: string
  enrolled: number
  completed: number
  avgScore: number | null
  totalModules: number
}

const availableCourses = courses.filter((c) => c.status === 'available')

export function CourseStats() {
  const [stats, setStats] = useState<ComputedCourseStat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      const { data: progressRows } = await supabase
        .from('module_progress')
        .select('*')

      const rows = progressRows ?? []

      const computed: ComputedCourseStat[] = availableCourses.map((course) => {
        const courseRows = rows.filter((r) => r.course_id === course.id)

        // Unique users who have at least 1 module touched in this course
        const enrolledUsers = new Set(courseRows.map((r) => r.user_id))

        // Users who completed ALL modules in this course
        let completedCount = 0
        for (const userId of enrolledUsers) {
          const userCompleted = courseRows.filter(
            (r) => r.user_id === userId && r.status === 'completed',
          )
          if (userCompleted.length >= course.modules.length) {
            completedCount++
          }
        }

        // Average quiz score (from rows that have a score)
        const scoredRows = courseRows.filter((r) => r.score !== null)
        const avgScore =
          scoredRows.length > 0
            ? Math.round(
                scoredRows.reduce((sum, r) => sum + (r.score ?? 0), 0) /
                  scoredRows.length,
              )
            : null

        return {
          courseId: course.id,
          title: course.title,
          enrolled: enrolledUsers.size,
          completed: completedCount,
          avgScore,
          totalModules: course.modules.length,
        }
      })

      setStats(computed)
      setLoading(false)
    }

    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-via-navy animate-spin" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.courseId}
          className="bg-via-card rounded-xl p-5 border border-via-border"
        >
          <h3 className="text-sm font-bold text-via-navy mb-4 leading-snug line-clamp-2">
            {stat.title}
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-via-navy/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-via-navy" />
              </div>
              <div>
                <p className="text-lg font-bold text-via-navy leading-none">{stat.enrolled}</p>
                <p className="text-xs text-via-text-light">Started</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-via-success/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-via-success" />
              </div>
              <div>
                <p className="text-lg font-bold text-via-success leading-none">{stat.completed}</p>
                <p className="text-xs text-via-text-light">Completed</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-via-orange/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-4 h-4 text-via-orange" />
              </div>
              <div>
                <p className="text-lg font-bold text-via-orange leading-none">
                  {stat.avgScore !== null ? `${stat.avgScore}%` : '--'}
                </p>
                <p className="text-xs text-via-text-light">Avg Score</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-via-navy-light/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-via-navy-light" />
              </div>
              <div>
                <p className="text-sm font-bold text-via-navy leading-none">{stat.totalModules}</p>
                <p className="text-xs text-via-text-light">Modules</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
