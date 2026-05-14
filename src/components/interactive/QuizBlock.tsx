import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Award, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { QuizQuestion } from '../../types'
import { industryCourseQuiz } from '../../data/modules/industry/courseQuiz'
import { viaCourseQuiz } from '../../data/modules/via-trading/courseQuiz'
import { Confetti } from './Confetti'

interface QuizBlockProps {
  quizId: string
  /** Called when the user submits all quiz answers. Receives (score, total). */
  onComplete?: (score: number, total: number) => void
}

const quizMap: Record<string, QuizQuestion[]> = {
  'industry-knowledge-check': industryCourseQuiz,
  'via-knowledge-check': viaCourseQuiz,
}

const PASS_THRESHOLD = 0.85

/** Next course mapping for the "Continue to next course" button */
const nextCourseMap: Record<string, { id: string; title: string }> = {
  'industry-knowledge-check': { id: 'who-is-via', title: 'Who Is Via Trading' },
  'via-knowledge-check': { id: 'product-knowledge', title: 'Product Knowledge' },
}

export function QuizBlock({ quizId, onComplete }: QuizBlockProps) {
  const questions = quizMap[quizId] ?? []
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  if (questions.length === 0) {
    return (
      <div className="bg-via-card rounded-xl border border-via-border p-8 text-center">
        <Award className="w-10 h-10 text-via-text-light mx-auto mb-3" />
        <p className="text-via-text-light">Quiz questions coming soon.</p>
      </div>
    )
  }

  function handleSelect(questionId: string, optionIndex: number) {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  function handleSubmit() {
    // Reveal all and calculate score
    setSubmitted(true)

    const finalScore = questions.filter(
      (q) => answers[q.id] === q.correctIndex,
    ).length
    onComplete?.(finalScore, questions.length)
  }

  const score = questions.filter(
    (q) => answers[q.id] === q.correctIndex,
  ).length

  const allAnswered = questions.every((q) => answers[q.id] !== undefined)
  const passed = submitted && score >= Math.ceil(questions.length * PASS_THRESHOLD)
  const nextCourse = nextCourseMap[quizId]

  return (
    <div className="space-y-6">
      {/* Quiz header */}
      <div className="bg-via-card rounded-xl border border-via-border p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-via-orange/10 flex items-center justify-center">
            <Award className="w-5 h-5 text-via-orange" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-via-navy">Course Final Exam</h2>
            <p className="text-sm text-via-text-light">
              {questions.length} questions &middot; {Math.ceil(questions.length * PASS_THRESHOLD)} correct to pass (85%)
            </p>
          </div>
        </div>
        {!submitted && (
          <p className="text-sm text-via-text-light mt-2 bg-via-bg-subtle rounded-lg px-4 py-2">
            Answer all questions before submitting. Your answers will not be revealed until you submit.
          </p>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, qi) => {
          const selectedIndex = answers[q.id]
          const isCorrect = submitted && selectedIndex === q.correctIndex

          return (
            <div
              key={q.id}
              className={`rounded-xl border p-6 transition-all ${
                submitted
                  ? isCorrect
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : selectedIndex !== undefined
                      ? 'bg-red-50/50 border-red-300'
                      : 'bg-via-card border-via-border'
                  : 'bg-via-card border-via-border'
              }`}
            >
              {/* Question - styled differently from answers */}
              <div className="bg-via-navy/5 rounded-lg px-4 py-3 mb-4">
                <p className="text-sm font-semibold text-via-navy">
                  <span className="text-via-orange mr-2">Q{qi + 1}.</span>
                  {q.question}
                </p>
              </div>

              {/* Answer options */}
              <div className="space-y-2">
                {q.options.map((option, oi) => {
                  const isSelected = selectedIndex === oi
                  const isCorrectOption = oi === q.correctIndex

                  let optionClasses =
                    'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all'

                  if (submitted) {
                    if (isCorrectOption) {
                      optionClasses +=
                        ' bg-emerald-50 border-emerald-400 text-emerald-800'
                    } else if (isSelected && !isCorrectOption) {
                      optionClasses +=
                        ' bg-red-50 border-red-400 text-red-800'
                    } else {
                      optionClasses +=
                        ' bg-white border-via-border text-via-text-light'
                    }
                  } else if (isSelected) {
                    optionClasses +=
                      ' bg-via-orange/10 border-via-orange text-via-navy font-medium'
                  } else {
                    optionClasses +=
                      ' bg-white border-via-border text-via-text hover:border-via-navy/30 cursor-pointer'
                  }

                  return (
                    <button
                      key={oi}
                      onClick={() => handleSelect(q.id, oi)}
                      disabled={submitted}
                      className={optionClasses}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          submitted && isCorrectOption
                            ? 'bg-emerald-500 text-white'
                            : submitted && isSelected && !isCorrectOption
                              ? 'bg-red-500 text-white'
                              : isSelected
                                ? 'bg-via-orange text-white'
                                : 'bg-via-bg-subtle text-via-text-light'
                        }`}>
                          {String.fromCharCode(65 + oi)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {submitted && isCorrectOption && (
                          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                        )}
                        {submitted && isSelected && !isCorrectOption && (
                          <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Explanation - only shown after submit */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`mt-4 p-3 rounded-lg text-sm ${
                        isCorrect
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                          : 'bg-red-50 border border-red-200 text-red-800'
                      }`}
                    >
                      <p className="font-medium mb-1">
                        {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                      </p>
                      <p className="text-xs opacity-80">{q.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Submit button */}
      {!submitted && (
        <div className="text-center py-4">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-8 py-3.5 bg-via-orange text-white text-lg font-bold rounded-xl hover:bg-via-orange-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg"
          >
            Submit Exam
          </button>
          {!allAnswered && (
            <p className="text-xs text-via-text-light mt-2">
              Answer all {questions.length} questions to submit
            </p>
          )}
        </div>
      )}

      {/* Results */}
      {submitted && (
        <>
          {passed && <Confetti />}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border-2 p-8 text-center ${
              passed
                ? 'bg-emerald-50 border-emerald-400'
                : 'bg-amber-50 border-amber-400'
            }`}
          >
            {passed ? (
              <>
                <div className="text-6xl mb-3">🎉</div>
                <p className="text-3xl font-bold text-emerald-700 mb-1">
                  Congratulations!
                </p>
                <p className="text-xl font-semibold text-emerald-600 mb-3">
                  {score} / {questions.length}, You Passed!
                </p>
                <p className="text-sm text-emerald-700 mb-6">
                  Outstanding work! You've demonstrated a strong understanding of the material.
                </p>
                {nextCourse && (
                  <Link
                    to={`/course/${nextCourse.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-via-orange text-white font-bold rounded-xl hover:bg-via-orange-light transition-colors shadow-lg"
                  >
                    Continue to {nextCourse.title}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
              </>
            ) : (
              <>
                <div className="text-6xl mb-3">😓</div>
                <p className="text-2xl font-bold text-amber-700 mb-1">
                  Not Quite There Yet
                </p>
                <p className="text-xl font-semibold text-amber-600 mb-3">
                  {score} / {questions.length}. Need {Math.ceil(questions.length * PASS_THRESHOLD)} to pass
                </p>
                <p className="text-sm text-amber-700">
                  Review the material above and try again when you're ready. You've got this!
                </p>
              </>
            )}
          </motion.div>
        </>
      )}
    </div>
  )
}
