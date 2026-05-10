import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Award } from 'lucide-react'
import { quizQuestions } from '../../data/quizData'

export function Quiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (revealed.has(questionId)) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleCheck = (questionId: string) => {
    setRevealed((prev) => new Set(prev).add(questionId))
  }

  const handleSubmit = () => {
    quizQuestions.forEach((q) => {
      setRevealed((prev) => new Set(prev).add(q.id))
    })
    setSubmitted(true)
  }

  const score = quizQuestions.filter(
    (q) => answers[q.id] === q.correctIndex
  ).length

  const allAnswered = quizQuestions.every((q) => answers[q.id] !== undefined)

  return (
    <div>
      <div className="border-l-4 border-via-orange pl-4 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-5 h-5 text-slate-400" />
          <h2 className="text-xl font-semibold text-white">Knowledge Check</h2>
        </div>
        <p className="text-sm text-slate-400">
          Test what you've learned — 4 quick questions
        </p>
      </div>

      <div className="space-y-6">
        {quizQuestions.map((q, qi) => {
          const isRevealed = revealed.has(q.id)
          const selectedIndex = answers[q.id]
          const isCorrect = selectedIndex === q.correctIndex

          return (
            <div
              key={q.id}
              className="bg-via-card rounded-xl border border-via-border p-6"
            >
              <p className="text-sm font-semibold text-white mb-4">
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
                        ' bg-emerald-900/30 border-emerald-600 text-emerald-300'
                    } else if (isSelected && !isCorrectOption) {
                      optionClasses +=
                        ' bg-red-900/30 border-red-600 text-red-300'
                    } else {
                      optionClasses +=
                        ' bg-via-dark border-via-border text-slate-500'
                    }
                  } else if (isSelected) {
                    optionClasses +=
                      ' bg-via-orange/20 border-via-orange text-via-orange'
                  } else {
                    optionClasses +=
                      ' bg-via-dark border-via-border text-slate-300 hover:border-slate-500 cursor-pointer'
                  }

                  return (
                    <button
                      key={oi}
                      onClick={() => handleSelect(q.id, oi)}
                      disabled={isRevealed}
                      className={optionClasses}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-500 w-5">
                          {String.fromCharCode(65 + oi)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {isRevealed && isCorrectOption && (
                          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {isRevealed && isSelected && !isCorrectOption && (
                          <XCircle className="w-5 h-5 text-red-400 shrink-0" />
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
                          ? 'bg-emerald-900/20 border border-emerald-800 text-emerald-300'
                          : 'bg-red-900/20 border border-red-800 text-red-300'
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
          <p className="text-2xl font-bold text-white mb-1">
            {score} / {quizQuestions.length}
          </p>
          <p className="text-sm text-slate-400">
            {score === quizQuestions.length
              ? 'Perfect score! You\'re ready for the next phase.'
              : score >= 3
                ? 'Great job! Review the sections you missed and you\'ll be fully prepared.'
                : 'Good start. Review the material above and try again when you\'re ready.'}
          </p>
        </motion.div>
      )}
    </div>
  )
}
