import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Award, Clock, AlertTriangle, Shield } from 'lucide-react'
import type { QuizQuestion } from '../../types'
import { Confetti } from './Confetti'

interface ProgramFinalExamProps {
  questions: QuizQuestion[]
  timeLimitMinutes: number
  programTitle: string
  onComplete?: (score: number, total: number, passed: boolean) => void
}

const PASS_THRESHOLD = 0.80

export function ProgramFinalExam({
  questions,
  timeLimitMinutes,
  programTitle,
  onComplete,
}: ProgramFinalExamProps) {
  const [started, setStarted] = useState(false)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(timeLimitMinutes * 60) // seconds

  // Timer countdown
  useEffect(() => {
    if (!started || submitted) return
    if (timeRemaining <= 0) {
      handleSubmit()
      return
    }
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [started, submitted, timeRemaining])

  const handleSelect = useCallback((questionId: string, optionIndex: number) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }, [submitted])

  function handleSubmit() {
    setSubmitted(true)
    const finalScore = questions.filter(
      (q) => answers[q.id] === q.correctIndex,
    ).length
    const didPass = finalScore >= Math.ceil(questions.length * PASS_THRESHOLD)
    onComplete?.(finalScore, questions.length, didPass)
  }

  const score = questions.filter((q) => answers[q.id] === q.correctIndex).length
  const passCount = Math.ceil(questions.length * PASS_THRESHOLD)
  const passed = submitted && score >= passCount
  const allAnswered = questions.every((q) => answers[q.id] !== undefined)

  // Format time
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`
  const timeWarning = timeRemaining <= 120 && timeRemaining > 0 // under 2 minutes
  const timeExpired = timeRemaining <= 0

  // --- Pre-start screen ---
  if (!started) {
    return (
      <div className="space-y-6">
        <div className="bg-via-card rounded-xl border-2 border-via-navy p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-via-navy/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-via-navy" />
          </div>
          <h2 className="text-2xl font-bold text-via-navy mb-2">
            Program Final Exam
          </h2>
          <p className="text-sm text-via-text-light mb-6 max-w-md mx-auto">
            This is the final certification exam for the <strong>{programTitle}</strong>.
            Please read the instructions carefully before beginning.
          </p>

          <div className="bg-via-bg-subtle rounded-xl p-6 text-left max-w-md mx-auto mb-6 space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-via-orange mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-via-navy">Time Limit: {timeLimitMinutes} minutes</p>
                <p className="text-xs text-via-text-light">The timer starts when you click "Begin Exam." If time runs out, your exam will be submitted automatically.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-via-orange mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-via-navy">No Going Back</p>
                <p className="text-xs text-via-text-light">Once you begin, you cannot pause or restart the exam. Make sure you have enough time to complete it in one sitting.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-via-orange mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-via-navy">Passing Grade: {Math.round(PASS_THRESHOLD * 100)}%</p>
                <p className="text-xs text-via-text-light">{questions.length} questions total. You need {passCount} correct answers to pass and earn your certification.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="px-8 py-3.5 bg-via-navy text-white text-lg font-bold rounded-xl hover:bg-via-navy/90 transition-colors cursor-pointer shadow-lg"
          >
            Begin Exam
          </button>
        </div>
      </div>
    )
  }

  // --- Active exam ---
  return (
    <div className="space-y-6">
      {/* Sticky timer bar */}
      <div className={`sticky top-0 z-10 rounded-xl border p-4 flex items-center justify-between ${
        timeWarning
          ? 'bg-red-50 border-red-300'
          : 'bg-via-card border-via-border'
      }`}>
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-via-navy" />
          <div>
            <p className="text-sm font-bold text-via-navy">Program Final Exam</p>
            <p className="text-xs text-via-text-light">
              {Object.keys(answers).length} of {questions.length} answered
            </p>
          </div>
        </div>
        {!submitted && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold ${
            timeWarning
              ? 'bg-red-100 text-red-700'
              : timeExpired
                ? 'bg-red-500 text-white'
                : 'bg-via-bg-subtle text-via-navy'
          }`}>
            <Clock className="w-4 h-4" />
            {timeExpired ? 'TIME UP' : timeString}
          </div>
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
              <div className="bg-via-navy/5 rounded-lg px-4 py-3 mb-4">
                <p className="text-sm font-semibold text-via-navy">
                  <span className="text-via-orange mr-2">Q{qi + 1}.</span>
                  {q.question}
                </p>
              </div>

              <div className="space-y-2">
                {q.options.map((option, oi) => {
                  const isSelected = selectedIndex === oi
                  const isCorrectOption = oi === q.correctIndex

                  let optionClasses =
                    'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all'

                  if (submitted) {
                    if (isCorrectOption) {
                      optionClasses += ' bg-emerald-50 border-emerald-400 text-emerald-800'
                    } else if (isSelected && !isCorrectOption) {
                      optionClasses += ' bg-red-50 border-red-400 text-red-800'
                    } else {
                      optionClasses += ' bg-white border-via-border text-via-text-light'
                    }
                  } else if (isSelected) {
                    optionClasses += ' bg-via-orange/10 border-via-orange text-via-navy font-medium'
                  } else {
                    optionClasses += ' bg-white border-via-border text-via-text hover:border-via-navy/30 cursor-pointer'
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

              {/* Explanation after submit */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`mt-4 p-3 rounded-lg text-sm ${
                      isCorrect
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
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

      {/* Submit */}
      {!submitted && !timeExpired && (
        <div className="text-center py-4">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-8 py-3.5 bg-via-navy text-white text-lg font-bold rounded-xl hover:bg-via-navy/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg"
          >
            Submit Final Exam
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
                <div className="text-6xl mb-3">🏆</div>
                <p className="text-3xl font-bold text-emerald-700 mb-1">
                  Certified!
                </p>
                <p className="text-xl font-semibold text-emerald-600 mb-3">
                  {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
                </p>
                <p className="text-sm text-emerald-700 mb-4">
                  Congratulations! You have successfully completed the <strong>{programTitle}</strong> and earned your certification.
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-100 border border-emerald-300 rounded-xl">
                  <Award className="w-5 h-5 text-emerald-700" />
                  <span className="text-sm font-bold text-emerald-800">
                    {programTitle} - Certified
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="text-6xl mb-3">😓</div>
                <p className="text-2xl font-bold text-amber-700 mb-1">
                  Not Quite There Yet
                </p>
                <p className="text-xl font-semibold text-amber-600 mb-3">
                  {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%) - Need {Math.round(PASS_THRESHOLD * 100)}% to pass
                </p>
                <p className="text-sm text-amber-700">
                  Review the course material and try again when you're ready. You've got this!
                </p>
              </>
            )}
          </motion.div>
        </>
      )}
    </div>
  )
}
