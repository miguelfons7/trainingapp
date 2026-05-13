import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Award } from 'lucide-react'
import type { QuizQuestion } from '../../types'
import { quizQuestions as industryQuestions } from '../../data/quizData'
import { viaQuizQuestions } from '../../data/modules/via-trading/quiz'

interface QuizBlockProps {
  quizId: string
}

const quizMap: Record<string, QuizQuestion[]> = {
  'industry-knowledge-check': industryQuestions,
  'via-knowledge-check': viaQuizQuestions,
}

export function QuizBlock({ quizId }: QuizBlockProps) {
  const questions = quizMap[quizId] ?? []
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
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
    if (revealed.has(questionId)) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  function handleCheck(questionId: string) {
    setRevealed((prev) => new Set(prev).add(questionId))
  }

  function handleSubmit() {
    questions.forEach((q) => {
      setRevealed((prev) => new Set(prev).add(q.id))
    })
    setSubmitted(true)
  }

  const score = questions.filter(
    (q) => answers[q.id] === q.correctIndex,
  ).length

  const allAnswered = questions.every((q) => answers[q.id] !== undefined)

  return (
    <div>
      <div className="border-l-4 border-via-orange pl-4 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-5 h-5 text-via-text-light" />
          <h2 className="text-xl font-semibold text-via-navy">Knowledge Check</h2>
        </div>
        <p className="text-sm text-via-text-light">
          Test what you've learned — {questions.length} questions
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, qi) => {
          const isRevealed = revealed.has(q.id)
          const selectedIndex = answers[q.id]
          const isCorrect = selectedIndex === q.correctIndex

          return (
            <div
              key={q.id}
              className="bg-via-card rounded-xl border border-via-border p-6"
            >
              <p className="text-sm font-semibold text-via-navy mb-4">
                {qi + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, oi) => {
                  const isSelected = selectedIndex === oi
                  const isCorrectOption = oi === q.correctIndex

                  let optionClasses =
                    'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all'

                  if (isRevealed) {
                    if (isCorrectOption) {
                      optionClasses +=
                        ' bg-emerald-50 border-emerald-400 text-emerald-800'
                    } else if (isSelected && !isCorrectOption) {
                      optionClasses +=
                        ' bg-red-50 border-red-400 text-red-800'
                    } else {
                      optionClasses +=
                        ' bg-via-bg border-via-border text-via-text-light'
                    }
                  } else if (isSelected) {
                    optionClasses +=
                      ' bg-via-orange/10 border-via-orange text-via-orange'
                  } else {
                    optionClasses +=
                      ' bg-white border-via-border text-via-text hover:border-via-navy/30 cursor-pointer'
                  }

                  return (
                    <button
                      key={oi}
                      onClick={() => handleSelect(q.id, oi)}
                      disabled={isRevealed}
                      className={optionClasses}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-via-text-light w-5">
                          {String.fromCharCode(65 + oi)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {isRevealed && isCorrectOption && (
                          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                        )}
                        {isRevealed && isSelected && !isCorrectOption && (
                          <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {selectedIndex !== undefined && !isRevealed && (
                <button
                  onClick={() => handleCheck(q.id)}
                  className="mt-3 px-4 py-2 bg-via-orange text-white text-sm font-medium rounded-lg hover:bg-via-orange-light transition-colors cursor-pointer"
                >
                  Check Answer
                </button>
              )}

              <AnimatePresence>
                {isRevealed && (
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
                        {isCorrect ? 'Correct!' : 'Not quite.'}
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

      {!submitted && allAnswered && (
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-via-orange text-white font-semibold rounded-lg hover:bg-via-orange-light transition-colors cursor-pointer"
          >
            Submit All Answers
          </button>
        </div>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-via-card rounded-xl border border-via-border p-6 text-center"
        >
          <Award className="w-12 h-12 text-via-orange mx-auto mb-3" />
          <p className="text-2xl font-bold text-via-navy mb-1">
            {score} / {questions.length}
          </p>
          <p className="text-sm text-via-text-light">
            {score === questions.length
              ? "Perfect score! You're ready for the next module."
              : score >= Math.ceil(questions.length * 0.75)
                ? "Great job! Review the sections you missed and you'll be fully prepared."
                : 'Good start. Review the material and try again when you\'re ready.'}
          </p>
        </motion.div>
      )}
    </div>
  )
}
