import { Plus, Trash2 } from 'lucide-react'
import type { ScenarioCardBlock } from '../../../types/blocks'

interface Props {
  block: ScenarioCardBlock
  onChange: (updated: ScenarioCardBlock) => void
}

export function ScenarioCardEditor({ block, onChange }: Props) {
  const { title, scenarios } = block.data

  const updateScenario = (
    index: number,
    partial: Partial<(typeof scenarios)[0]>
  ) => {
    const next = scenarios.map((s, i) => (i === index ? { ...s, ...partial } : s))
    onChange({ ...block, data: { ...block.data, scenarios: next } })
  }

  const updateOption = (scenarioIdx: number, optIdx: number, value: string) => {
    const options = [...scenarios[scenarioIdx].options]
    options[optIdx] = value
    updateScenario(scenarioIdx, { options })
  }

  const addOption = (scenarioIdx: number) => {
    const options = [...scenarios[scenarioIdx].options, '']
    updateScenario(scenarioIdx, { options })
  }

  const removeOption = (scenarioIdx: number, optIdx: number) => {
    const scenario = scenarios[scenarioIdx]
    const options = scenario.options.filter((_, i) => i !== optIdx)
    const bestAnswerIndex =
      scenario.bestAnswerIndex >= options.length
        ? Math.max(0, options.length - 1)
        : scenario.bestAnswerIndex
    updateScenario(scenarioIdx, { options, bestAnswerIndex })
  }

  const addScenario = () => {
    const newScenario = {
      id: crypto.randomUUID(),
      scenario: '',
      options: ['Option A', 'Option B'],
      bestAnswerIndex: 0,
      explanation: '',
    }
    onChange({
      ...block,
      data: { ...block.data, scenarios: [...scenarios, newScenario] },
    })
  }

  const removeScenario = (index: number) => {
    onChange({
      ...block,
      data: {
        ...block.data,
        scenarios: scenarios.filter((_, i) => i !== index),
      },
    })
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">
          Title <span className="text-via-text-light">(optional)</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={title ?? ''}
          onChange={(e) =>
            onChange({
              ...block,
              data: { ...block.data, title: e.target.value || undefined },
            })
          }
          placeholder="Scenario Practice"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Scenarios</label>
        <div className="space-y-4">
          {scenarios.map((scenario, si) => (
            <div key={scenario.id} className="bg-via-bg-subtle rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-via-navy">
                  Scenario {si + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeScenario(si)}
                  className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove scenario"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <label className="block text-xs text-via-text-light mb-1">
                  Scenario Text
                </label>
                <textarea
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange resize-none"
                  rows={2}
                  value={scenario.scenario}
                  onChange={(e) =>
                    updateScenario(si, { scenario: e.target.value })
                  }
                  placeholder="Describe the scenario..."
                />
              </div>

              <div>
                <label className="block text-xs text-via-text-light mb-1">Options</label>
                <div className="space-y-1.5">
                  {scenario.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`best-${scenario.id}`}
                        checked={scenario.bestAnswerIndex === oi}
                        onChange={() =>
                          updateScenario(si, { bestAnswerIndex: oi })
                        }
                        className="shrink-0"
                        title="Mark as correct answer"
                      />
                      <input
                        type="text"
                        className="flex-1 px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                        value={opt}
                        onChange={(e) => updateOption(si, oi, e.target.value)}
                        placeholder={`Option ${oi + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(si, oi)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addOption(si)}
                  className="mt-1.5 flex items-center gap-1 text-xs text-via-orange hover:text-orange-700 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add option
                </button>
              </div>

              <div>
                <label className="block text-xs text-via-text-light mb-1">
                  Explanation
                </label>
                <textarea
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange resize-none"
                  rows={2}
                  value={scenario.explanation}
                  onChange={(e) =>
                    updateScenario(si, { explanation: e.target.value })
                  }
                  placeholder="Explain why the correct answer is best..."
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addScenario}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium text-via-orange hover:text-orange-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add scenario
        </button>
      </div>
    </div>
  )
}
