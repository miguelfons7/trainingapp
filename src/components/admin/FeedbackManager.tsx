import { useState, useEffect, useMemo, useCallback } from 'react'
import { Search, Star, ChevronDown, ChevronUp, X, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useCourses } from '../../context/CoursesContext'

interface FeedbackRow {
  id: string
  user_id: string
  course_id: string
  rating: number
  relevance: 'very' | 'somewhat' | 'not-really'
  difficulty: 'too-easy' | 'just-right' | 'too-hard'
  comment: string | null
  created_at: string
  profiles: {
    full_name: string
    email: string
  } | null
}

const relevanceLabels: Record<string, string> = {
  very: 'Very Relevant',
  somewhat: 'Somewhat',
  'not-really': 'Not Really',
}

const relevanceColors: Record<string, string> = {
  very: 'bg-emerald-100 text-emerald-700',
  somewhat: 'bg-amber-100 text-amber-700',
  'not-really': 'bg-red-100 text-red-700',
}

const difficultyLabels: Record<string, string> = {
  'too-easy': 'Too Easy',
  'just-right': 'Just Right',
  'too-hard': 'Too Hard',
}

const difficultyColors: Record<string, string> = {
  'too-easy': 'bg-sky-100 text-sky-700',
  'just-right': 'bg-emerald-100 text-emerald-700',
  'too-hard': 'bg-amber-100 text-amber-700',
}

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= value ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

function Badge({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${colorClass}`}
    >
      {label}
    </span>
  )
}

export function FeedbackManager() {
  const { courses } = useCourses()
  const [feedback, setFeedback] = useState<FeedbackRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [courseFilter, setCourseFilter] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    const { data } = await supabase
      .from('course_feedback')
      .select('*, profiles(full_name, email)')
      .order('created_at', { ascending: false })

    if (data) setFeedback(data as FeedbackRow[])
    setLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Course name lookup
  const courseNameMap = useMemo(() => {
    const map: Record<string, string> = {}
    for (const c of courses) {
      map[c.id] = c.title
    }
    return map
  }, [courses])

  // Unique courses that have feedback
  const coursesWithFeedback = useMemo(() => {
    const ids = [...new Set(feedback.map((f) => f.course_id))]
    return ids
      .map((id) => ({ id, name: courseNameMap[id] || id }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [feedback, courseNameMap])

  // Filter + search
  const filtered = useMemo(() => {
    let list = feedback

    if (courseFilter !== 'all') {
      list = list.filter((f) => f.course_id === courseFilter)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (f) =>
          f.profiles?.full_name?.toLowerCase().includes(q) ||
          f.profiles?.email?.toLowerCase().includes(q) ||
          f.comment?.toLowerCase().includes(q),
      )
    }

    return list
  }, [feedback, courseFilter, search])

  // Stats
  const stats = useMemo(() => {
    if (feedback.length === 0) {
      return { total: 0, avgRating: 0, courseCount: 0 }
    }
    const total = feedback.length
    const avgRating =
      Math.round(
        (feedback.reduce((sum, f) => sum + f.rating, 0) / total) * 10,
      ) / 10
    const courseCount = new Set(feedback.map((f) => f.course_id)).size
    return { total, avgRating, courseCount }
  }, [feedback])

  // Per-course average ratings
  const courseAvgRatings = useMemo(() => {
    const map: Record<string, { sum: number; count: number }> = {}
    for (const f of feedback) {
      if (!map[f.course_id]) map[f.course_id] = { sum: 0, count: 0 }
      map[f.course_id].sum += f.rating
      map[f.course_id].count++
    }
    const result: Record<string, number> = {}
    for (const [id, val] of Object.entries(map)) {
      result[id] = Math.round((val.sum / val.count) * 10) / 10
    }
    return result
  }, [feedback])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-via-navy animate-spin" />
      </div>
    )
  }

  return (
    <div>
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-via-card rounded-xl border border-via-border p-3 text-center">
          <p className="text-xl font-bold text-via-navy">{stats.total}</p>
          <p className="text-[10px] text-via-text-light">Total Feedback</p>
        </div>
        <div className="bg-via-card rounded-xl border border-via-border p-3 text-center">
          <div className="flex items-center justify-center gap-1">
            <p className="text-xl font-bold text-via-navy">{stats.avgRating}</p>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <p className="text-[10px] text-via-text-light">Avg Rating</p>
        </div>
        <div className="bg-via-card rounded-xl border border-via-border p-3 text-center">
          <p className="text-xl font-bold text-via-navy">{stats.courseCount}</p>
          <p className="text-[10px] text-via-text-light">Courses Rated</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {/* Course dropdown */}
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
        >
          <option value="all">All Courses</option>
          {coursesWithFeedback.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
              {courseAvgRatings[c.id]
                ? ` (${courseAvgRatings[c.id]}/5)`
                : ''}
            </option>
          ))}
        </select>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-via-text-light/50" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or comment..."
            className="w-full pl-10 pr-8 py-2 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-via-text-light hover:text-via-text cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
          <p className="text-sm text-via-text-light">
            {feedback.length === 0
              ? 'No feedback submitted yet.'
              : 'No results match your filters.'}
          </p>
        </div>
      ) : (
        <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
          <div className="px-4 py-3 border-b border-via-border">
            <p className="text-xs text-via-text-light">
              {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
              {courseFilter !== 'all' || search ? ' (filtered)' : ''}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-via-bg-subtle text-xs font-semibold text-via-text-light uppercase tracking-wide border-b border-via-border">
                  <th className="text-left px-4 py-2.5">Course</th>
                  <th className="text-left px-4 py-2.5">User</th>
                  <th className="text-left px-4 py-2.5">Rating</th>
                  <th className="text-left px-4 py-2.5 hidden md:table-cell">
                    Relevance
                  </th>
                  <th className="text-left px-4 py-2.5 hidden md:table-cell">
                    Difficulty
                  </th>
                  <th className="text-left px-4 py-2.5">Date</th>
                  <th className="px-4 py-2.5 w-8" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((f, idx) => {
                  const isExpanded = expandedId === f.id
                  return (
                    <tr
                      key={f.id}
                      className={`border-b border-via-border last:border-b-0 transition-colors ${
                        idx % 2 === 1 ? 'bg-via-bg-subtle/50' : ''
                      } ${f.comment ? 'cursor-pointer hover:bg-via-bg-subtle' : ''}`}
                      onClick={() =>
                        f.comment &&
                        setExpandedId(isExpanded ? null : f.id)
                      }
                    >
                      <td className="px-4 py-2.5 text-via-text font-medium">
                        <div className="max-w-[180px] truncate">
                          {courseNameMap[f.course_id] || f.course_id}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-via-text">
                        <div className="max-w-[140px] truncate">
                          {f.profiles?.full_name || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <StarRating value={f.rating} />
                      </td>
                      <td className="px-4 py-2.5 hidden md:table-cell">
                        <Badge
                          label={relevanceLabels[f.relevance] || f.relevance}
                          colorClass={relevanceColors[f.relevance] || ''}
                        />
                      </td>
                      <td className="px-4 py-2.5 hidden md:table-cell">
                        <Badge
                          label={difficultyLabels[f.difficulty] || f.difficulty}
                          colorClass={difficultyColors[f.difficulty] || ''}
                        />
                      </td>
                      <td className="px-4 py-2.5 text-via-text-light text-xs whitespace-nowrap">
                        {new Date(f.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2.5">
                        {f.comment && (
                          <span className="text-via-text-light">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Expanded comment rows */}
          {filtered.map((f) =>
            expandedId === f.id && f.comment ? (
              <div
                key={`comment-${f.id}`}
                className="px-6 py-3 bg-sky-50 border-b border-via-border"
              >
                <p className="text-xs text-sky-700 font-medium mb-1">
                  Comment from {f.profiles?.full_name || 'user'}
                </p>
                <p className="text-sm text-sky-800">{f.comment}</p>
              </div>
            ) : null,
          )}
        </div>
      )}
    </div>
  )
}
