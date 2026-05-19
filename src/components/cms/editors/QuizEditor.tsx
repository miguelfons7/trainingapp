/**
 * Quiz Data Editor — Edits SectionedQuizData on PageContent.
 *
 * Three collapsible sections:
 *   1. Term Match (pairs of term + definition)
 *   2. Multiple Choice (questions with options, correct answer, explanation)
 *   3. Fill in the Blank (sentence with blank, options, correct answer)
 *
 * Also edits passThreshold and optional nextCourse.
 */
import { useState } from 'react'
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Link2,
  Percent,
  Brain,
  List,
  TextCursorInput,
} from 'lucide-react'
import type { SectionedQuizData } from '../../../types/blocks'

interface Props {
  quizData: SectionedQuizData
  onChange: (updated: SectionedQuizData) => void
}

export function QuizEditor({ quizData, onChange }: Props) {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(['termMatch', 'multipleChoice', 'fillInBlank']),
  )

  const toggleSection = (section: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(section)) next.delete(section)
      else next.add(section)
      return next
    })
  }

  // ── Term Match ──────────────────────────────────────────
  const updateTermPair = (
    index: number,
    field: 'term' | 'definition',
    value: string,
  ) => {
    const pairs = quizData.termMatch.map((p, i) =>
      i === index ? { ...p, [field]: value } : p,
    )
    onChange({ ...quizData, termMatch: pairs })
  }

  const addTermPair = () => {
    onChange({
      ...quizData,
      termMatch: [...quizData.termMatch, { term: '', definition: '' }],
    })
  }

  const removeTermPair = (index: number) => {
    onChange({
      ...quizData,
      termMatch: quizData.termMatch.filter((_, i) => i !== index),
    })
  }

  // ── Multiple Choice ─────────────────────────────────────
  const updateMCQuestion = (
    index: number,
    partial: Partial<SectionedQuizData['multipleChoice'][0]>,
  ) => {
    const questions = quizData.multipleChoice.map((q, i) =>
      i === index ? { ...q, ...partial } : q,
    )
    onChange({ ...quizData, multipleChoice: questions })
  }

  const updateMCOption = (qIdx: number, optIdx: number, value: string) => {
    const options = [...quizData.multipleChoice[qIdx].options]
    options[optIdx] = value
    updateMCQuestion(qIdx, { options })
  }

  const addMCOption = (qIdx: number) => {
    const options = [...quizData.multipleChoice[qIdx].options, '']
    updateMCQuestion(qIdx, { options })
  }

  const removeMCOption = (qIdx: number, optIdx: number) => {
    const q = quizData.multipleChoice[qIdx]
    const options = q.options.filter((_, i) => i !== optIdx)
    const correctIndex =
      q.correctIndex >= options.length
        ? Math.max(0, options.length - 1)
        : q.correctIndex
    updateMCQuestion(qIdx, { options, correctIndex })
  }

  const addMCQuestion = () => {
    onChange({
      ...quizData,
      multipleChoice: [
        ...quizData.multipleChoice,
        {
          id: crypto.randomUUID(),
          question: '',
          options: ['', '', '', ''],
          correctIndex: 0,
          explanation: '',
        },
      ],
    })
  }

  const removeMCQuestion = (index: number) => {
    onChange({
      ...quizData,
      multipleChoice: quizData.multipleChoice.filter((_, i) => i !== index),
    })
  }

  // ── Fill in the Blank ───────────────────────────────────
  const updateFIBItem = (
    index: number,
    partial: Partial<SectionedQuizData['fillInBlank'][0]>,
  ) => {
    const items = quizData.fillInBlank.map((item, i) =>
      i === index ? { ...item, ...partial } : item,
    )
    onChange({ ...quizData, fillInBlank: items })
  }

  const updateFIBOption = (itemIdx: number, optIdx: number, value: string) => {
    const options = [...quizData.fillInBlank[itemIdx].options]
    options[optIdx] = value
    updateFIBItem(itemIdx, { options })
  }

  const addFIBOption = (itemIdx: number) => {
    const options = [...quizData.fillInBlank[itemIdx].options, '']
    updateFIBItem(itemIdx, { options })
  }

  const removeFIBOption = (itemIdx: number, optIdx: number) => {
    const item = quizData.fillInBlank[itemIdx]
    const options = item.options.filter((_, i) => i !== optIdx)
    const correctIndex =
      item.correctIndex >= options.length
        ? Math.max(0, options.length - 1)
        : item.correctIndex
    updateFIBItem(itemIdx, { options, correctIndex })
  }

  const addFIBItem = () => {
    onChange({
      ...quizData,
      fillInBlank: [
        ...quizData.fillInBlank,
        {
          id: crypto.randomUUID(),
          sentence: 'The _____ is correct.',
          blank: '',
          options: ['', ''],
          correctIndex: 0,
        },
      ],
    })
  }

  const removeFIBItem = (index: number) => {
    onChange({
      ...quizData,
      fillInBlank: quizData.fillInBlank.filter((_, i) => i !== index),
    })
  }

  // ── Shared Styles ───────────────────────────────────────
  const inputClass =
    'w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange'
  const labelClass = 'block text-xs text-via-text-light mb-1'
  const removeBtnClass =
    'p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
  const addBtnClass =
    'mt-2 flex items-center gap-1.5 text-xs font-medium text-via-orange hover:text-orange-700 transition-colors'

  const totalItems =
    quizData.termMatch.length +
    quizData.multipleChoice.length +
    quizData.fillInBlank.length

  return (
    <div className="space-y-4">
      {/* Quiz Stats */}
      <div className="bg-via-card rounded-xl border border-via-border p-4">
        <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-3">
          Quiz Settings
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>Pass Threshold (%)</label>
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-via-text-light shrink-0" />
              <input
                type="number"
                min={0}
                max={100}
                value={Math.round(quizData.passThreshold * 100)}
                onChange={(e) =>
                  onChange({
                    ...quizData,
                    passThreshold: Math.max(0, Math.min(100, Number(e.target.value))) / 100,
                  })
                }
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Next Course ID</label>
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-via-text-light shrink-0" />
              <input
                type="text"
                value={quizData.nextCourse?.id ?? ''}
                onChange={(e) =>
                  onChange({
                    ...quizData,
                    nextCourse: e.target.value
                      ? {
                          id: e.target.value,
                          title: quizData.nextCourse?.title ?? '',
                        }
                      : undefined,
                  })
                }
                placeholder="e.g. who-is-via"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Next Course Title</label>
            <input
              type="text"
              value={quizData.nextCourse?.title ?? ''}
              onChange={(e) =>
                onChange({
                  ...quizData,
                  nextCourse: quizData.nextCourse
                    ? { ...quizData.nextCourse, title: e.target.value }
                    : e.target.value
                    ? { id: '', title: e.target.value }
                    : undefined,
                })
              }
              placeholder="e.g. Who Is Via Trading"
              className={inputClass}
            />
          </div>
        </div>
        <p className="text-xs text-via-text-light mt-3">
          {totalItems} total items &middot; Pass at{' '}
          {Math.round(quizData.passThreshold * 100)}% ({Math.ceil(totalItems * quizData.passThreshold)}/{totalItems})
        </p>
      </div>

      {/* ── Term Match Section ─────────────────────────────── */}
      <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('termMatch')}
          className="w-full flex items-center justify-between p-4 hover:bg-via-card-hover transition-colors"
        >
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-semibold text-via-navy">
              Term Match
            </span>
            <span className="text-xs text-via-text-light">
              ({quizData.termMatch.length} pairs)
            </span>
          </div>
          {openSections.has('termMatch') ? (
            <ChevronDown className="w-4 h-4 text-via-text-light" />
          ) : (
            <ChevronRight className="w-4 h-4 text-via-text-light" />
          )}
        </button>
        {openSections.has('termMatch') && (
          <div className="border-t border-via-border p-4 space-y-2">
            {quizData.termMatch.map((pair, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    className={inputClass}
                    value={pair.term}
                    onChange={(e) => updateTermPair(i, 'term', e.target.value)}
                    placeholder="Term"
                  />
                  <input
                    type="text"
                    className={inputClass}
                    value={pair.definition}
                    onChange={(e) =>
                      updateTermPair(i, 'definition', e.target.value)
                    }
                    placeholder="Definition"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeTermPair(i)}
                  className={removeBtnClass}
                  title="Remove pair"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addTermPair} className={addBtnClass}>
              <Plus className="w-3.5 h-3.5" />
              Add term pair
            </button>
          </div>
        )}
      </div>

      {/* ── Multiple Choice Section ────────────────────────── */}
      <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('multipleChoice')}
          className="w-full flex items-center justify-between p-4 hover:bg-via-card-hover transition-colors"
        >
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold text-via-navy">
              Multiple Choice
            </span>
            <span className="text-xs text-via-text-light">
              ({quizData.multipleChoice.length} questions)
            </span>
          </div>
          {openSections.has('multipleChoice') ? (
            <ChevronDown className="w-4 h-4 text-via-text-light" />
          ) : (
            <ChevronRight className="w-4 h-4 text-via-text-light" />
          )}
        </button>
        {openSections.has('multipleChoice') && (
          <div className="border-t border-via-border p-4 space-y-4">
            {quizData.multipleChoice.map((q, qi) => (
              <div
                key={q.id}
                className="bg-via-bg-subtle rounded-lg p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-via-navy">
                    Question {qi + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeMCQuestion(qi)}
                    className={removeBtnClass}
                    title="Remove question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className={labelClass}>Question</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={2}
                    value={q.question}
                    onChange={(e) =>
                      updateMCQuestion(qi, { question: e.target.value })
                    }
                    placeholder="What is the question?"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Options{' '}
                    <span className="text-via-text-light">
                      (radio = correct answer)
                    </span>
                  </label>
                  <div className="space-y-1.5">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`mc-correct-${q.id}`}
                          checked={q.correctIndex === oi}
                          onChange={() =>
                            updateMCQuestion(qi, { correctIndex: oi })
                          }
                          className="shrink-0"
                          title="Mark as correct"
                        />
                        <input
                          type="text"
                          className={`flex-1 ${inputClass}`}
                          value={opt}
                          onChange={(e) =>
                            updateMCOption(qi, oi, e.target.value)
                          }
                          placeholder={`Option ${oi + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeMCOption(qi, oi)}
                          className={removeBtnClass}
                          title="Remove option"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addMCOption(qi)}
                    className="mt-1.5 flex items-center gap-1 text-xs text-via-orange hover:text-orange-700 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Add option
                  </button>
                </div>

                <div>
                  <label className={labelClass}>Explanation</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={2}
                    value={q.explanation}
                    onChange={(e) =>
                      updateMCQuestion(qi, { explanation: e.target.value })
                    }
                    placeholder="Explain why the correct answer is best..."
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addMCQuestion}
              className={addBtnClass}
            >
              <Plus className="w-3.5 h-3.5" />
              Add question
            </button>
          </div>
        )}
      </div>

      {/* ── Fill in the Blank Section ──────────────────────── */}
      <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('fillInBlank')}
          className="w-full flex items-center justify-between p-4 hover:bg-via-card-hover transition-colors"
        >
          <div className="flex items-center gap-2">
            <TextCursorInput className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-semibold text-via-navy">
              Fill in the Blank
            </span>
            <span className="text-xs text-via-text-light">
              ({quizData.fillInBlank.length} items)
            </span>
          </div>
          {openSections.has('fillInBlank') ? (
            <ChevronDown className="w-4 h-4 text-via-text-light" />
          ) : (
            <ChevronRight className="w-4 h-4 text-via-text-light" />
          )}
        </button>
        {openSections.has('fillInBlank') && (
          <div className="border-t border-via-border p-4 space-y-4">
            {quizData.fillInBlank.map((item, ii) => (
              <div
                key={item.id}
                className="bg-via-bg-subtle rounded-lg p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-via-navy">
                    Item {ii + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFIBItem(ii)}
                    className={removeBtnClass}
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className={labelClass}>
                    Sentence{' '}
                    <span className="text-via-text-light">
                      (use _____ for blank)
                    </span>
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={item.sentence}
                    onChange={(e) =>
                      updateFIBItem(ii, { sentence: e.target.value })
                    }
                    placeholder="The _____ is correct."
                  />
                </div>

                <div>
                  <label className={labelClass}>Blank Label</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={item.blank}
                    onChange={(e) =>
                      updateFIBItem(ii, { blank: e.target.value })
                    }
                    placeholder="answer"
                  />
                </div>

                <div>
                  <label className={labelClass}>Options</label>
                  <div className="space-y-1.5">
                    {item.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`fib-correct-${item.id}`}
                          checked={item.correctIndex === oi}
                          onChange={() =>
                            updateFIBItem(ii, { correctIndex: oi })
                          }
                          className="shrink-0"
                          title="Mark as correct"
                        />
                        <input
                          type="text"
                          className={`flex-1 ${inputClass}`}
                          value={opt}
                          onChange={(e) =>
                            updateFIBOption(ii, oi, e.target.value)
                          }
                          placeholder={`Option ${oi + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeFIBOption(ii, oi)}
                          className={removeBtnClass}
                          title="Remove option"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addFIBOption(ii)}
                    className="mt-1.5 flex items-center gap-1 text-xs text-via-orange hover:text-orange-700 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Add option
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addFIBItem} className={addBtnClass}>
              <Plus className="w-3.5 h-3.5" />
              Add item
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
