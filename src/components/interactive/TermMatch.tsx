import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Award } from 'lucide-react'
import type { TermMatchPair } from '../../types'

interface TermMatchProps {
  pairs: TermMatchPair[]
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

export function TermMatch({ pairs, title = 'Match the Terms' }: TermMatchProps) {
  const shuffledTerms = useMemo(() => shuffle(pairs.map((p) => p.term)), [pairs])
  const shuffledDefinitions = useMemo(() => shuffle(pairs.map((p) => p.definition)), [pairs])

  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set())
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [flashWrong, setFlashWrong] = useState<{ term: string; definition: string } | null>(null)

  const pairMap = useMemo(() => {
    const map = new Map<string, string>()
    pairs.forEach((p) => map.set(p.term, p.definition))
    return map
  }, [pairs])

  const handleTermClick = (term: string) => {
    if (matchedPairs.has(term) || flashWrong) return
    setSelectedTerm(term === selectedTerm ? null : term)
  }

  const handleDefinitionClick = (definition: string) => {
    if (!selectedTerm || flashWrong) return
    // Check if this definition is already matched
    const alreadyMatched = pairs.some(
      (p) => p.definition === definition && matchedPairs.has(p.term)
    )
    if (alreadyMatched) return

    const correctDef = pairMap.get(selectedTerm)
    if (correctDef === definition) {
      setMatchedPairs((prev) => new Set(prev).add(selectedTerm))
      setSelectedTerm(null)
    } else {
      setWrongAttempts((prev) => prev + 1)
      setFlashWrong({ term: selectedTerm, definition })
      setTimeout(() => {
        setFlashWrong(null)
        setSelectedTerm(null)
      }, 800)
    }
  }

  const isTermMatched = (term: string) => matchedPairs.has(term)
  const isDefinitionMatched = (definition: string) =>
    pairs.some((p) => p.definition === definition && matchedPairs.has(p.term))

  const allMatched = matchedPairs.size === pairs.length

  return (
    <div className="bg-via-card rounded-xl border border-via-border p-6">
      <div className="border-l-4 border-via-orange pl-4 mb-6">
        <h3 className="text-lg font-semibold text-via-navy">{title}</h3>
        <p className="text-sm text-via-text-light mt-0.5">
          Click a term, then click its matching definition
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Terms column */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-3">
            Terms
          </p>
          {shuffledTerms.map((term) => {
            const matched = isTermMatched(term)
            const isSelected = selectedTerm === term
            const isFlashingWrong = flashWrong?.term === term

            let classes =
              'w-full text-left rounded-lg p-3 border text-sm transition-all duration-200'

            if (matched) {
              classes += ' bg-emerald-50 border-emerald-400 text-emerald-800'
            } else if (isFlashingWrong) {
              classes += ' bg-red-50 border-red-400 text-red-800'
            } else if (isSelected) {
              classes += ' bg-via-orange/10 border-via-orange text-via-orange'
            } else {
              classes +=
                ' bg-white border-via-border text-via-text hover:border-via-navy/40 cursor-pointer'
            }

            return (
              <motion.button
                key={term}
                onClick={() => handleTermClick(term)}
                disabled={matched}
                className={classes}
                animate={
                  isFlashingWrong
                    ? { x: [0, -6, 6, -4, 4, 0] }
                    : { x: 0 }
                }
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex-1 font-medium">{term}</span>
                  {matched && (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isFlashingWrong && (
                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Definitions column */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-3">
            Definitions
          </p>
          {shuffledDefinitions.map((definition) => {
            const matched = isDefinitionMatched(definition)
            const isFlashingWrong = flashWrong?.definition === definition

            let classes =
              'w-full text-left rounded-lg p-3 border text-sm transition-all duration-200'

            if (matched) {
              classes += ' bg-emerald-50 border-emerald-400 text-emerald-800'
            } else if (isFlashingWrong) {
              classes += ' bg-red-50 border-red-400 text-red-800'
            } else if (selectedTerm) {
              classes +=
                ' bg-white border-via-border text-via-text hover:border-via-orange cursor-pointer'
            } else {
              classes += ' bg-white border-via-border text-via-text-light'
            }

            return (
              <motion.button
                key={definition}
                onClick={() => handleDefinitionClick(definition)}
                disabled={matched || !selectedTerm}
                className={classes}
                animate={
                  isFlashingWrong
                    ? { x: [0, -6, 6, -4, 4, 0] }
                    : { x: 0 }
                }
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex-1">{definition}</span>
                  {matched && (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isFlashingWrong && (
                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4 flex items-center justify-between text-sm text-via-text-light">
        <span>
          Matched: {matchedPairs.size} / {pairs.length}
        </span>
        {wrongAttempts > 0 && (
          <span className="text-red-500">
            Wrong attempts: {wrongAttempts}
          </span>
        )}
      </div>

      {/* Success message */}
      {allMatched && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-emerald-50 border border-emerald-300 rounded-lg p-4 text-center"
        >
          <Award className="w-10 h-10 text-via-orange mx-auto mb-2" />
          <p className="text-lg font-bold text-emerald-800">All Matched!</p>
          <p className="text-sm text-emerald-600 mt-1">
            {matchedPairs.size}/{pairs.length} matched
            {wrongAttempts > 0
              ? `, ${wrongAttempts} wrong attempt${wrongAttempts === 1 ? '' : 's'}`
              : ' with no mistakes'}
          </p>
        </motion.div>
      )}
    </div>
  )
}
