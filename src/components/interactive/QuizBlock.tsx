import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Award, ArrowRight, GripVertical } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { SectionedQuiz, TermMatchPair, FillInBlankItem } from '../../types'
import type { SectionedQuizData } from '../../types/blocks'
import { industrySectionedQuiz } from '../../data/modules/industry/courseQuiz'
import { viaSectionedQuiz } from '../../data/modules/via-trading/courseQuiz'
import { productKnowledgeSectionedQuiz } from '../../data/modules/product-knowledge/courseQuiz'
import { salesPhilosophySectionedQuiz } from '../../data/modules/consultative-sales/courseQuiz'
import { bdrRoleSectionedQuiz } from '../../data/modules/bdr-role/courseQuiz'
import { Confetti } from './Confetti'
import { CourseFeedbackForm } from './CourseFeedbackForm'
import { useAuth } from '../../context/AuthContext'
import { useCourses } from '../../context/CoursesContext'

interface QuizBlockProps {
  quizId: string
  /** The course this quiz belongs to — used for the feedback form */
  courseId?: string
  /** Called only when the user PASSES the quiz. Receives (score, total). */
  onComplete?: (score: number, total: number) => void
  /** Called on every submission, pass or fail — for activity logging */
  onAttempt?: (score: number, total: number, passed: boolean) => void
  /** CMS quiz data — takes priority over hardcoded data when provided */
  cmsQuizData?: SectionedQuizData
}

const sectionedQuizMap: Record<string, SectionedQuiz> = {
  'industry-knowledge-check': industrySectionedQuiz,
  'via-knowledge-check': viaSectionedQuiz,
  'product-knowledge-check': productKnowledgeSectionedQuiz,
  'sales-philosophy-quiz': salesPhilosophySectionedQuiz,
  'bdr-role-quiz': bdrRoleSectionedQuiz,
}

const PASS_THRESHOLD = 0.85

// ─────────────────────────────────────────
// Utility
// ─────────────────────────────────────────
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/** In-progress quiz answers saved so an accidental reload doesn't wipe work */
interface SavedQuizState {
  mc: Record<string, number>
  fib: Record<string, number | null>
  matched: string[]
}

function quizStateKey(userId: string | undefined, quizId: string): string {
  return `viacademy-quiz:${userId ?? 'anon'}:${quizId}`
}

function loadQuizState(userId: string | undefined, quizId: string): SavedQuizState | null {
  try {
    const raw = localStorage.getItem(quizStateKey(userId, quizId))
    return raw ? (JSON.parse(raw) as SavedQuizState) : null
  } catch {
    return null
  }
}

// ─────────────────────────────────────────
// Section 1: Term Match (inline)
// ─────────────────────────────────────────
function TermMatchSection({
  pairs,
  onScoreChange,
  submitted,
  initialMatched,
  onMatchedChange,
}: {
  pairs: TermMatchPair[]
  onScoreChange: (correct: number) => void
  submitted: boolean
  /** Restored matches from a saved in-progress attempt */
  initialMatched?: string[]
  /** Reports matched terms upward for persistence */
  onMatchedChange?: (terms: string[]) => void
}) {
  const shuffledTerms = useMemo(() => shuffle(pairs.map((p) => p.term)), [pairs])
  const shuffledDefs = useMemo(() => shuffle(pairs.map((p) => p.definition)), [pairs])

  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(
    () => new Set((initialMatched ?? []).filter((t) => pairs.some((p) => p.term === t))),
  )
  const [flashWrong, setFlashWrong] = useState<{ term: string; def: string } | null>(null)

  const pairMap = useMemo(() => {
    const map = new Map<string, string>()
    pairs.forEach((p) => map.set(p.term, p.definition))
    return map
  }, [pairs])

  const handleTermClick = (term: string) => {
    if (matchedPairs.has(term) || flashWrong || submitted) return
    setSelectedTerm(term === selectedTerm ? null : term)
  }

  const handleDefClick = (def: string) => {
    if (!selectedTerm || flashWrong || submitted) return
    const alreadyMatched = pairs.some(
      (p) => p.definition === def && matchedPairs.has(p.term),
    )
    if (alreadyMatched) return

    const correctDef = pairMap.get(selectedTerm)
    if (correctDef === def) {
      const next = new Set(matchedPairs).add(selectedTerm)
      setMatchedPairs(next)
      setSelectedTerm(null)
      onScoreChange(next.size)
      onMatchedChange?.([...next])
    } else {
      setFlashWrong({ term: selectedTerm, def })
      setTimeout(() => {
        setFlashWrong(null)
        setSelectedTerm(null)
      }, 800)
    }
  }

  const isTermMatched = (t: string) => matchedPairs.has(t)
  const isDefMatched = (d: string) =>
    pairs.some((p) => p.definition === d && matchedPairs.has(p.term))

  // If submitted and not all matched, reveal the correct answers
  const showReveal = submitted && matchedPairs.size < pairs.length

  return (
    <div className="bg-via-card rounded-xl border border-via-border p-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-lg bg-via-orange/10 flex items-center justify-center">
          <GripVertical className="w-4 h-4 text-via-orange" />
        </div>
        <div>
          <h3 className="text-base font-bold text-via-navy">
            Section 1: Match the Terms
          </h3>
          <p className="text-xs text-via-text-light">
            Click a term, then click its matching definition ({matchedPairs.size}/{pairs.length} matched)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Terms */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-2">
            Terms
          </p>
          {shuffledTerms.map((term) => {
            const matched = isTermMatched(term)
            const isSelected = selectedTerm === term
            const isFlashing = flashWrong?.term === term

            let cls =
              'w-full text-left rounded-lg p-3 border text-sm transition-all duration-200'
            if (matched) cls += ' bg-emerald-50 border-emerald-400 text-emerald-800'
            else if (isFlashing) cls += ' bg-red-50 border-red-400 text-red-800'
            else if (isSelected) cls += ' bg-via-orange/10 border-via-orange text-via-orange'
            else cls += ' bg-white border-via-border text-via-text hover:border-via-navy/40 cursor-pointer'

            return (
              <motion.button
                key={term}
                onClick={() => handleTermClick(term)}
                disabled={matched || submitted}
                className={cls}
                animate={isFlashing ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex-1 font-medium">{term}</span>
                  {matched && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {isFlashing && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Definitions */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-2">
            Definitions
          </p>
          {shuffledDefs.map((def) => {
            const matched = isDefMatched(def)
            const isFlashing = flashWrong?.def === def

            let cls =
              'w-full text-left rounded-lg p-3 border text-sm transition-all duration-200'
            if (matched) cls += ' bg-emerald-50 border-emerald-400 text-emerald-800'
            else if (isFlashing) cls += ' bg-red-50 border-red-400 text-red-800'
            else if (selectedTerm) cls += ' bg-white border-via-border text-via-text hover:border-via-orange cursor-pointer'
            else cls += ' bg-white border-via-border text-via-text-light'

            return (
              <motion.button
                key={def}
                onClick={() => handleDefClick(def)}
                disabled={matched || !selectedTerm || submitted}
                className={cls}
                animate={isFlashing ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex-1">{def}</span>
                  {matched && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {isFlashing && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Reveal unmatched on submit */}
      {showReveal && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-medium text-red-800 mb-2">
            Unmatched pairs:
          </p>
          {pairs
            .filter((p) => !matchedPairs.has(p.term))
            .map((p) => (
              <p key={p.term} className="text-xs text-red-700 mb-1">
                <span className="font-semibold">{p.term}</span> = {p.definition}
              </p>
            ))}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// Section 3: Fill-in-Blank (inline)
// ─────────────────────────────────────────
function FillInBlankSection({
  items,
  submitted,
  answers,
  onSelect,
  correctCount,
}: {
  items: FillInBlankItem[]
  submitted: boolean
  answers: Record<string, number | null>
  onSelect: (id: string, optionIndex: number) => void
  correctCount: number
}) {
  const shuffledOptions = useMemo(() => {
    const map: Record<string, string[]> = {}
    items.forEach((item) => {
      map[item.id] = shuffle(item.options)
    })
    return map
  }, [items])

  return (
    <div className="bg-via-card rounded-xl border border-via-border p-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-lg bg-via-orange/10 flex items-center justify-center">
          <span className="text-sm font-bold text-via-orange">...</span>
        </div>
        <div>
          <h3 className="text-base font-bold text-via-navy">
            Section 3: Complete the Sentences
          </h3>
          <p className="text-xs text-via-text-light">
            Select the correct word or phrase to complete each sentence
            {submitted && ` (${correctCount}/${items.length} correct)`}
          </p>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        {items.map((item) => {
          const selectedIdx = answers[item.id]
          const hasAnswer = selectedIdx !== null && selectedIdx !== undefined
          const isCorrect = hasAnswer && selectedIdx === item.correctIndex
          const parts = item.sentence.split('_____')

          return (
            <div
              key={item.id}
              className={`rounded-lg border p-4 transition-all duration-300 ${
                submitted
                  ? isCorrect
                    ? 'bg-emerald-50 border-emerald-400'
                    : hasAnswer
                      ? 'bg-red-50 border-red-400'
                      : 'bg-via-card border-via-border'
                  : 'bg-white border-via-border'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm text-via-text leading-relaxed inline">
                    {parts[0]}
                    <span className="inline-block mx-1 align-middle">
                      <select
                        value={
                          hasAnswer ? item.options[selectedIdx] ?? '' : ''
                        }
                        onChange={(e) => {
                          const originalIdx = item.options.indexOf(e.target.value)
                          if (originalIdx >= 0) onSelect(item.id, originalIdx)
                        }}
                        disabled={submitted}
                        className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors ${
                          submitted
                            ? isCorrect
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                              : 'bg-red-50 border-red-400 text-red-800'
                            : 'bg-via-card border-via-border text-via-text cursor-pointer hover:border-via-orange'
                        }`}
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        {shuffledOptions[item.id]?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </span>
                    {parts[1] || ''}
                  </p>
                </div>
                {submitted && hasAnswer && (
                  <div className="shrink-0 mt-0.5">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {submitted && hasAnswer && !isCorrect && (
                <p className="text-xs text-red-600 mt-2">
                  Correct answer:{' '}
                  <span className="font-semibold text-emerald-700">
                    {item.options[item.correctIndex]}
                  </span>
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// Main QuizBlock Component
// ─────────────────────────────────────────
export function QuizBlock({ quizId, courseId, onComplete, onAttempt, cmsQuizData }: QuizBlockProps) {
  const { user } = useAuth()
  const { courses, getProgramsForUser } = useCourses()
  // CMS quiz data takes priority over hardcoded data
  const hardcodedQuiz = sectionedQuizMap[quizId]
  const sectionedQuiz: SectionedQuiz | undefined = cmsQuizData
    ? {
        termMatch: cmsQuizData.termMatch,
        multipleChoice: cmsQuizData.multipleChoice,
        fillInBlank: cmsQuizData.fillInBlank,
        passThreshold: cmsQuizData.passThreshold,
      }
    : hardcodedQuiz
  // "Continue to next course": the next AVAILABLE course after this one in the
  // USER'S assigned program (so BDR users flow to bdr-role, AM users to am-role).
  // CMS quizData can still override explicitly. End of program → no button; the
  // Home program-completion banner takes over.
  const userPrograms = getProgramsForUser(user?.programIds)
  const programNextCourse = (() => {
    if (!courseId) return undefined
    // Find the program (among the user's) that contains this course, then the
    // next available course within it.
    for (const program of userPrograms) {
      const idx = program.courseIds.indexOf(courseId)
      if (idx === -1) continue
      for (const nextId of program.courseIds.slice(idx + 1)) {
        const next = courses.find((c) => c.id === nextId)
        if (next && next.status === 'available') {
          return { id: next.id, title: next.title }
        }
      }
    }
    return undefined
  })()
  const nextCourse = cmsQuizData?.nextCourse ?? programNextCourse

  // Restore any in-progress attempt (saved so reloads don't wipe answers)
  const [savedState] = useState<SavedQuizState | null>(() =>
    loadQuizState(user?.id, quizId),
  )

  // Attempt counter — bumping it reshuffles options and remounts term match
  const [attempt, setAttempt] = useState(0)

  // --- MC state ---
  const mcQuestions = sectionedQuiz?.multipleChoice ?? []
  const [mcAnswers, setMcAnswers] = useState<Record<string, number>>(
    () => savedState?.mc ?? {},
  )
  const [submitted, setSubmitted] = useState(false)

  // Presentational shuffle: options render in a per-attempt random order, but
  // answers are stored by ORIGINAL index so scoring and persistence are unaffected.
  const mcOptionOrder = useMemo(() => {
    const order: Record<string, number[]> = {}
    for (const q of mcQuestions) {
      order[q.id] = shuffle(q.options.map((_, i) => i))
    }
    return order
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mcQuestions, attempt])

  // --- Term match state (score tracked via callback) ---
  const [matchedTerms, setMatchedTerms] = useState<string[]>(
    () => savedState?.matched ?? [],
  )
  const [termMatchScore, setTermMatchScore] = useState(
    () => (savedState?.matched ?? []).length,
  )

  // --- Fill-in-blank state ---
  const fibItems = sectionedQuiz?.fillInBlank ?? []
  const [fibAnswers, setFibAnswers] = useState<Record<string, number | null>>(
    () => savedState?.fib ?? {},
  )

  const handleFibSelect = useCallback((id: string, optIdx: number) => {
    if (submitted) return
    setFibAnswers((prev) => ({ ...prev, [id]: optIdx }))
  }, [submitted])

  const hasAnyAnswers =
    Object.keys(mcAnswers).length > 0 ||
    Object.keys(fibAnswers).length > 0 ||
    matchedTerms.length > 0

  // Persist in-progress answers; clear once submitted
  useEffect(() => {
    try {
      const key = quizStateKey(user?.id, quizId)
      if (submitted) {
        localStorage.removeItem(key)
      } else if (hasAnyAnswers) {
        const state: SavedQuizState = { mc: mcAnswers, fib: fibAnswers, matched: matchedTerms }
        localStorage.setItem(key, JSON.stringify(state))
      }
    } catch {
      // localStorage unavailable — fail silently
    }
  }, [user?.id, quizId, mcAnswers, fibAnswers, matchedTerms, submitted, hasAnyAnswers])

  // Warn before leaving the page with unsaved quiz work
  useEffect(() => {
    if (submitted || !hasAnyAnswers) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [submitted, hasAnyAnswers])

  if (!sectionedQuiz) {
    return (
      <div className="bg-via-card rounded-xl border border-via-border p-8 text-center">
        <Award className="w-10 h-10 text-via-text-light mx-auto mb-3" />
        <p className="text-via-text-light">Quiz questions coming soon.</p>
      </div>
    )
  }

  const termMatchPairs = sectionedQuiz.termMatch
  const totalItems =
    termMatchPairs.length + mcQuestions.length + fibItems.length
  // Pass threshold is a fraction (0–1). Guard against quiz data that stored it
  // as a whole-number percentage (e.g. 85 instead of 0.85) — otherwise passCount
  // becomes unreachable and even a perfect score is marked failed.
  const rawThreshold = sectionedQuiz.passThreshold ?? PASS_THRESHOLD
  const passThreshold = rawThreshold > 1 ? rawThreshold / 100 : rawThreshold
  const passCount = Math.ceil(totalItems * passThreshold)

  // --- MC helpers ---
  function handleMcSelect(questionId: string, optionIndex: number) {
    if (submitted) return
    setMcAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const allMcAnswered = mcQuestions.every((q) => mcAnswers[q.id] !== undefined)
  const allFibAnswered = fibItems.every((item) => fibAnswers[item.id] !== null && fibAnswers[item.id] !== undefined)
  const allTermsMatched = termMatchScore === termMatchPairs.length
  const allAnswered = allMcAnswered && allFibAnswered && allTermsMatched

  // --- Scoring ---
  const mcScore = mcQuestions.filter((q) => mcAnswers[q.id] === q.correctIndex).length
  const fibScore = fibItems.filter(
    (item) => fibAnswers[item.id] !== null && fibAnswers[item.id] !== undefined && fibAnswers[item.id] === item.correctIndex,
  ).length
  const totalScore = termMatchScore + mcScore + fibScore
  const passed = submitted && totalScore >= passCount

  function handleSubmit() {
    setSubmitted(true)
    const didPass = totalScore >= passCount
    onAttempt?.(totalScore, totalItems, didPass)
    // Only a passing submission completes the module — failing must not
    // mark the quiz module as completed (it would unlock the next course).
    if (didPass) {
      onComplete?.(totalScore, totalItems)
    }
  }

  /** Reset for a fresh attempt — options reshuffle so answers can't be memorized by position */
  function handleRetry() {
    setMcAnswers({})
    setFibAnswers({})
    setMatchedTerms([])
    setTermMatchScore(0)
    setSubmitted(false)
    setAttempt((a) => a + 1)
    try {
      localStorage.removeItem(quizStateKey(user?.id, quizId))
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
              {totalItems} items &middot; {passCount} correct to pass ({Math.round(passThreshold * 100)}%)
            </p>
          </div>
        </div>
        {!submitted && (
          <div className="mt-2 bg-via-bg-subtle rounded-lg px-4 py-2">
            <p className="text-sm text-via-text-light">
              Three sections: <strong>Term Match</strong> ({termMatchPairs.length}), <strong>Multiple Choice</strong> ({mcQuestions.length}), and <strong>Complete the Sentences</strong> ({fibItems.length}). Match all terms and answer all questions before submitting.
            </p>
          </div>
        )}
      </div>

      {/* Section 1: Term Match */}
      <TermMatchSection
        key={attempt}
        pairs={termMatchPairs}
        onScoreChange={setTermMatchScore}
        submitted={submitted}
        initialMatched={attempt === 0 ? matchedTerms : undefined}
        onMatchedChange={setMatchedTerms}
      />

      {/* Section 2: Multiple Choice */}
      <div className="bg-via-card rounded-xl border border-via-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-via-orange/10 flex items-center justify-center">
            <span className="text-sm font-bold text-via-orange">?</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-via-navy">
              Section 2: Multiple Choice
            </h3>
            <p className="text-xs text-via-text-light">
              Select the best answer for each question
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {mcQuestions.map((q, qi) => {
          const selectedIndex = mcAnswers[q.id]
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
                {(mcOptionOrder[q.id] ?? q.options.map((_, i) => i)).map((oi, displayIdx) => {
                  const option = q.options[oi]
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
                      onClick={() => handleMcSelect(q.id, oi)}
                      disabled={submitted}
                      className={optionClasses}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            submitted && isCorrectOption
                              ? 'bg-emerald-500 text-white'
                              : submitted && isSelected && !isCorrectOption
                                ? 'bg-red-500 text-white'
                                : isSelected
                                  ? 'bg-via-orange text-white'
                                  : 'bg-via-bg-subtle text-via-text-light'
                          }`}
                        >
                          {String.fromCharCode(65 + displayIdx)}
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

      {/* Section 3: Fill in the Blank */}
      <FillInBlankSection
        items={fibItems}
        submitted={submitted}
        answers={fibAnswers}
        onSelect={handleFibSelect}
        correctCount={fibScore}
      />

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
              Match all terms, answer all {mcQuestions.length} questions, and complete all sentences to submit
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
                <p className="text-xl font-semibold text-emerald-600 mb-2">
                  {totalScore} / {totalItems} &mdash; You Passed!
                </p>
                <div className="text-sm text-emerald-700 mb-4 space-y-0.5">
                  <p>Term Match: {termMatchScore}/{termMatchPairs.length}</p>
                  <p>Multiple Choice: {mcScore}/{mcQuestions.length}</p>
                  <p>Fill in the Blank: {fibScore}/{fibItems.length}</p>
                </div>
                <p className="text-sm text-emerald-700 mb-6">
                  Outstanding work! You've demonstrated a strong understanding of the material.
                </p>
                {courseId && user && (
                  <CourseFeedbackForm courseId={courseId} userId={user.id} />
                )}
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
                <p className="text-xl font-semibold text-amber-600 mb-2">
                  {totalScore} / {totalItems} &mdash; Need {passCount} to pass
                </p>
                <div className="text-sm text-amber-700 mb-4 space-y-0.5">
                  <p>Term Match: {termMatchScore}/{termMatchPairs.length}</p>
                  <p>Multiple Choice: {mcScore}/{mcQuestions.length}</p>
                  <p>Fill in the Blank: {fibScore}/{fibItems.length}</p>
                </div>
                <p className="text-sm text-amber-700 mb-6">
                  Review the material above and try again when you're ready. You've got this!
                </p>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-lg cursor-pointer"
                >
                  Try Again
                </button>
              </>
            )}
          </motion.div>
        </>
      )}
    </div>
  )
}
