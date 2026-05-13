import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ArrowRight, Award } from 'lucide-react'
import type { ScenarioQuestion } from '../../types'

interface ScenarioCardProps {
  scenarios: ScenarioQuestion[]
  title?: string
}

export function ScenarioCard({ scenarios, title = 'Scenario Practice' }: ScenarioCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [scores, setScores] = useState<boolean[]>([])

  const current = scenarios[currentIndex]
  const isLast = currentIndex === scenarios.length - 1
  const allDone = scores.length === scenarios.length

  const handleOptionClick = (optionIndex: number) => {
    if (revealed) return
    setSelectedOption(optionIndex)
    setRevealed(true)
    setScores((prev) => [...prev, optionIndex === current.bestAnswerIndex])
  }

  const handleNext = () => {
    setSelectedOption(null)
    setRevealed(false)
    setCurrentIndex((prev) => prev + 1)
  }

  const correctCount = scores.filter(Boolean).length

  if (allDone && isLast && revealed) {
    // Show this after the user sees the last answer and we detect it's complete
  }

  return (
    <div className="bg-via-card rounded-xl border border-via-border p-6">
      <div className="border-l-4 border-via-orange pl-4 mb-6">
        <h3 className="text-lg font-semibold text-via-navy">{title}</h3>
        <p className="text-sm text-via-text-light mt-0.5">
          Choose the best response for each scenario
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-via-text-light">
          Scenario {currentIndex + 1} of {scenarios.length}
        </span>
        <div className="flex gap-1.5">
          {scenarios.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i < scores.length
                  ? scores[i]
                    ? 'bg-emerald-500'
                    : 'bg-red-500'
                  : i === currentIndex
                    ? 'bg-via-orange'
                    : 'bg-via-border'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Scenario text */}
          <div className="bg-white rounded-lg border border-via-border p-4 mb-4">
            <p className="text-sm text-via-text leading-relaxed">{current.scenario}</p>
          </div>

          {/* Options */}
          <div className="space-y-2">
            {current.options.map((option, oi) => {
              const isBest = oi === current.bestAnswerIndex
              const isSelected = selectedOption === oi

              let classes =
                'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200'

              if (revealed) {
                if (isBest) {
                  classes += ' bg-emerald-50 border-emerald-400 text-emerald-800'
                } else if (isSelected && !isBest) {
                  classes += ' bg-red-50 border-red-400 text-red-800'
                } else {
                  classes += ' bg-via-bg border-via-border text-via-text-light'
                }
              } else {
                classes +=
                  ' bg-white border-via-border text-via-text hover:border-via-navy/40 cursor-pointer'
              }

              return (
                <button
                  key={oi}
                  onClick={() => handleOptionClick(oi)}
                  disabled={revealed}
                  className={classes}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-1">{option}</span>
                    {revealed && isBest && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {revealed && isSelected && !isBest && (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div
                  className={`mt-4 p-3 rounded-lg text-sm ${
                    selectedOption === current.bestAnswerIndex
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                      : 'bg-red-50 border border-red-300 text-red-800'
                  }`}
                >
                  <p className="font-medium mb-1">
                    {selectedOption === current.bestAnswerIndex
                      ? 'Great choice!'
                      : 'Not the best answer.'}
                  </p>
                  <p className="text-xs opacity-80">{current.explanation}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next button */}
          {revealed && !isLast && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-right"
            >
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-4 py-2 bg-via-orange text-white text-sm font-medium rounded-lg hover:bg-via-orange-light transition-colors cursor-pointer"
              >
                Next Scenario
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Final summary */}
      {allDone && revealed && isLast && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-emerald-50 border border-emerald-300 rounded-lg p-4 text-center"
        >
          <Award className="w-10 h-10 text-via-orange mx-auto mb-2" />
          <p className="text-lg font-bold text-via-navy">
            {correctCount} / {scenarios.length} Correct
          </p>
          <p className="text-sm text-via-text-light mt-1">
            {correctCount === scenarios.length
              ? 'Perfect! You chose the best response every time.'
              : correctCount >= scenarios.length * 0.7
                ? 'Well done! Review the scenarios you missed.'
                : 'Good effort. Study the explanations and try again.'}
          </p>
        </motion.div>
      )}
    </div>
  )
}
