import { Plus, Trash2 } from 'lucide-react'
import type { FlowDiagramBlock } from '../../../types/blocks'

interface Props {
  block: FlowDiagramBlock
  onChange: (updated: FlowDiagramBlock) => void
}

export function FlowDiagramEditor({ block, onChange }: Props) {
  const { label, color, steps, highlightIndex } = block.data

  const updateStep = (index: number, value: string) => {
    const next = [...steps]
    next[index] = value
    onChange({ ...block, data: { ...block.data, steps: next } })
  }

  const addStep = () => {
    onChange({ ...block, data: { ...block.data, steps: [...steps, ''] } })
  }

  const removeStep = (index: number) => {
    const next = steps.filter((_, i) => i !== index)
    const newHighlight =
      highlightIndex !== undefined && highlightIndex >= next.length
        ? undefined
        : highlightIndex
    onChange({ ...block, data: { ...block.data, steps: next, highlightIndex: newHighlight } })
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-via-text mb-1.5">Label</label>
          <input
            type="text"
            className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
            value={label}
            onChange={(e) =>
              onChange({ ...block, data: { ...block.data, label: e.target.value } })
            }
            placeholder="Process Flow"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-via-text mb-1.5">Color</label>
          <input
            type="text"
            className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
            value={color}
            onChange={(e) =>
              onChange({ ...block, data: { ...block.data, color: e.target.value } })
            }
            placeholder="bg-via-orange"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">
          Highlight Index <span className="text-via-text-light">(optional, 0-based)</span>
        </label>
        <input
          type="number"
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={highlightIndex ?? ''}
          onChange={(e) => {
            const v = e.target.value
            onChange({
              ...block,
              data: {
                ...block.data,
                highlightIndex: v === '' ? undefined : Number(v),
              },
            })
          }}
          placeholder="Leave blank for none"
          min={0}
          max={steps.length - 1}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Steps</label>
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-via-text-light w-5 text-right shrink-0">
                {i + 1}
              </span>
              <input
                type="text"
                className="flex-1 px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                value={step}
                onChange={(e) => updateStep(i, e.target.value)}
                placeholder={`Step ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => removeStep(i)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove step"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addStep}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium text-via-orange hover:text-orange-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add step
        </button>
      </div>
    </div>
  )
}
