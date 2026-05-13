import { BookOpen, Users, Award, Clock } from 'lucide-react'
import { courses } from '../../data/courses'

interface CourseStat {
  courseId: string
  title: string
  enrolled: number
  completed: number
  avgScore: number
  avgCompletionTime: string
}

const courseStats: CourseStat[] = [
  {
    courseId: 'intro-to-industry',
    title: 'Intro to the Liquidation Industry',
    enrolled: 8,
    completed: 6,
    avgScore: 87,
    avgCompletionTime: '42 min',
  },
  {
    courseId: 'who-is-via',
    title: 'Who Is Via Trading',
    enrolled: 7,
    completed: 5,
    avgScore: 91,
    avgCompletionTime: '28 min',
  },
  {
    courseId: 'product-knowledge',
    title: 'Product Knowledge',
    enrolled: 5,
    completed: 3,
    avgScore: 82,
    avgCompletionTime: '54 min',
  },
  {
    courseId: 'sales-philosophy',
    title: 'Sales Philosophy & Process',
    enrolled: 4,
    completed: 2,
    avgScore: 78,
    avgCompletionTime: '1h 12min',
  },
  {
    courseId: 'bdr-role',
    title: 'BDR Role Training',
    enrolled: 3,
    completed: 2,
    avgScore: 85,
    avgCompletionTime: '51 min',
  },
  {
    courseId: 'tools-systems',
    title: 'Tools & Systems',
    enrolled: 2,
    completed: 1,
    avgScore: 90,
    avgCompletionTime: '38 min',
  },
  {
    courseId: 'ongoing-development',
    title: 'Ongoing Development',
    enrolled: 1,
    completed: 1,
    avgScore: 95,
    avgCompletionTime: 'Ongoing',
  },
]

// Only show stats for courses that exist in the actual course list
const stats = courseStats.filter((s) => courses.some((c) => c.id === s.courseId))

export function CourseStats() {
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
                <p className="text-xs text-via-text-light">Enrolled</p>
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
                <p className="text-lg font-bold text-via-orange leading-none">{stat.avgScore}%</p>
                <p className="text-xs text-via-text-light">Avg Score</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-via-navy-light/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-via-navy-light" />
              </div>
              <div>
                <p className="text-sm font-bold text-via-navy leading-none">{stat.avgCompletionTime}</p>
                <p className="text-xs text-via-text-light">Avg Time</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
