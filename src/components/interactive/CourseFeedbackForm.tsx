import { useState, useEffect } from 'react'
import { Star, CheckCircle2, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'

type Relevance = 'very' | 'somewhat' | 'not-really'
type Difficulty = 'too-easy' | 'just-right' | 'too-hard'

interface CourseFeedbackFormProps {
  courseId: string
  userId: string
}

export function CourseFeedbackForm({ courseId, userId }: CourseFeedbackFormProps) {
  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [relevance, setRelevance] = useState<Relevance | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Load existing feedback (in case user retook the quiz)
  useEffect(() => {
    async function loadExisting() {
      const { data } = await supabase
        .from('course_feedback')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single()

      if (data) {
        setRating(data.rating)
        setRelevance(data.relevance as Relevance)
        setDifficulty(data.difficulty as Difficulty)
        setComment(data.comment ?? '')
        setSubmitted(true)
      }
      setLoaded(true)
    }

    loadExisting()
  }, [userId, courseId])

  const canSubmit = rating > 0 && relevance && difficulty

  async function handleSubmit() {
    if (!canSubmit) return
    setSubmitting(true)

    const payload = {
      user_id: userId,
      course_id: courseId,
      rating,
      relevance: relevance!,
      difficulty: difficulty!,
      comment: comment.trim() || null,
    }

    const { error } = await supabase
      .from('course_feedback')
      .upsert(payload, { onConflict: 'user_id,course_id' })

    if (!error) {
      setSubmitted(true)
    }
    setSubmitting(false)
  }

  if (!loaded) return null

  // Already submitted — show compact thank you
  if (submitted && !submitting) {
    return (
      <div className="bg-white/60 rounded-lg border border-emerald-200 p-4 mt-6 mb-6">
        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <p className="text-sm text-emerald-700 font-medium">
            Thanks for your feedback!
          </p>
          <div className="flex gap-0.5 ml-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= rating
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/60 rounded-lg border border-emerald-200 p-5 mt-6 mb-6 text-left">
      <p className="text-sm font-semibold text-emerald-800 mb-4 text-center">
        How was this course?
      </p>

      {/* Star Rating */}
      <div className="mb-4">
        <div className="flex justify-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => {
            const active = star <= (hoverRating || rating)
            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5 transition-transform hover:scale-110 cursor-pointer"
              >
                <Star
                  className={`w-7 h-7 transition-colors ${
                    active
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Relevance */}
      <div className="mb-4">
        <p className="text-xs font-medium text-emerald-700 mb-2 text-center">
          Relevant to your role?
        </p>
        <div className="flex justify-center gap-2">
          {([
            { value: 'very', label: 'Very Relevant' },
            { value: 'somewhat', label: 'Somewhat' },
            { value: 'not-really', label: 'Not Really' },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setRelevance(opt.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                relevance === opt.value
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="mb-4">
        <p className="text-xs font-medium text-emerald-700 mb-2 text-center">
          Difficulty level?
        </p>
        <div className="flex justify-center gap-2">
          {([
            { value: 'too-easy', label: 'Too Easy' },
            { value: 'just-right', label: 'Just Right' },
            { value: 'too-hard', label: 'Too Hard' },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setDifficulty(opt.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                difficulty === opt.value
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Anything you'd want us to change or add? (optional)"
          rows={2}
          className="w-full px-3 py-2 rounded-lg border border-emerald-200 bg-white text-sm text-via-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 resize-none"
        />
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Feedback'
          )}
        </button>
      </div>
    </div>
  )
}
