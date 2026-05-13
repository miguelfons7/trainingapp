import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Award } from 'lucide-react'
import type { FillInBlankItem } from '../../types'

interface FillInBlankProps {
  items: FillInBlankItem[]
  title?: string
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function FillInBlank({ items, title = 'Fill in the Blanks' }: FillInBlankProps) {
  const [answers, setAnswers] = useState<Record<string, number | null>>({})
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const shuffledOptions = useMemo(() => {
    const map: Record<string, string[]> = {}
    items.forEach((item) => {
      map[item.id] = shuffle(item.options)
    })
    return map
  }, [items])

  const handleSelect = (itemId: string, value: string) => {
    if (checked.has(itemId)) return
    const item = items.find((i) => i.id === itemId)
    if (!item) return
    const originalIndex = item.options.indexOf(value)
    setAnswers((prev) => ({ ...prev, [itemId]: originalIndex }))
    // Auto-check on selection
    setChecked((prev) => new Set(prev).add(itemId))
  }

  const completedCount = checked.size
  const correctCount = items.filter(
    (item) => checked.has(item.id) && answers[item.id] === item.correctIndex
  ).length
  const allDone = completedCount === items.length

  return (
    <div className="bg-via-card rounded-xl border border-via-border p-6">
      <div className="border-l-4 border-via-orange pl-4 mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-400 mt-0.5">
          Select the correct word or phrase to complete each sentence
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const isChecked = checked.has(item.id)
          const selectedIndex = answers[item.id]
          const isCorrect = selectedIndex === item.correctIndex
          const parts = item.sentence.split('_____')

          return (
            <div
              key={item.id}
              className={`rounded-lg border p-4 transition-all duration-300 ${
                isChecked
                  ? isCorrect
                    ? 'bg-emerald-900/20 border-emerald-700'
                    : 'bg-red-900/20 border-red-700'
                  : 'bg-via-dark border-via-border'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm text-slate-300 leading-relaxed inline">
                    {parts[0]}
                    <span className="inline-block mx-1 align-middle">
                      <select
                        value={
                          selectedIndex !== null && selectedIndex !== undefined
                            ? items.find((i) => i.id === item.id)?.options[selectedIndex] ?? ''
                            : ''
                        }
                        onChange={(e) => handleSelect(item.id, e.target.value)}
                        disabled={isChecked}
                        className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors ${
                          isChecked
                            ? isCorrect
                              ? 'bg-emerald-900/40 border-emerald-600 text-emerald-300'
                              : 'bg-red-900/40 border-red-600 text-red-300'
                            : 'bg-via-card border-via-border text-slate-300 cursor-pointer hover:border-via-orange'
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

                {isChecked && (
                  <div className="shrink-0 mt-0.5">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                )}
              </div>

              {isChecked && !isCorrect && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-red-400 mt-2 pl-0"
                >
                  Correct answer:{' '}
                  <span className="font-semibold text-emerald-400">
                    {item.options[item.correctIndex]}
                  </span>
                </motion.p>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress */}
      <div className="mt-4 text-sm text-slate-400">
        Completed: {completedCount} / {items.length}
      </div>

      {/* Summary */}
      {allDone && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-emerald-900/20 border border-emerald-800 rounded-lg p-4 text-center"
        >
          <Award className="w-10 h-10 text-via-orange mx-auto mb-2" />
          <p className="text-lg font-bold text-white">
            {correctCount} / {items.length} Correct
          </p>
          <p className="text-sm text-slate-400 mt-1">
            {correctCount === items.length
              ? 'Perfect score! You nailed every one.'
              : correctCount >= items.length * 0.7
                ? 'Great job! Review the ones you missed.'
                : 'Keep studying and try again.'}
          </p>
        </motion.div>
      )}
    </div>
  )
}
