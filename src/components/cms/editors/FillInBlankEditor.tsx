import { Plus, Trash2 } from 'lucide-react'
import type { FillInBlankBlock } from '../../../types/blocks'

interface Props {
  block: FillInBlankBlock
  onChange: (updated: FillInBlankBlock) => void
}

export function FillInBlankEditor({ block, onChange }: Props) {
  const { title, items } = block.data

  const updateItem = (index: number, partial: Partial<(typeof items)[0]>) => {
    const next = items.map((item, i) => (i === index ? { ...item, ...partial } : item))
    onChange({ ...block, data: { ...block.data, items: next } })
  }

  const updateOption = (itemIdx: number, optIdx: number, value: string) => {
    const options = [...items[itemIdx].options]
    options[optIdx] = value
    updateItem(itemIdx, { options })
  }

  const addOption = (itemIdx: number) => {
    const options = [...items[itemIdx].options, '']
    updateItem(itemIdx, { options })
  }

  const removeOption = (itemIdx: number, optIdx: number) => {
    const item = items[itemIdx]
    const options = item.options.filter((_, i) => i !== optIdx)
    const correctIndex =
      item.correctIndex >= options.length
        ? Math.max(0, options.length - 1)
        : item.correctIndex
    updateItem(itemIdx, { options, correctIndex })
  }

  const addItem = () => {
    const newItem = {
      id: crypto.randomUUID(),
      sentence: 'The _____ is correct.',
      blank: '',
      options: ['Option A', 'Option B'],
      correctIndex: 0,
    }
    onChange({ ...block, data: { ...block.data, items: [...items, newItem] } })
  }

  const removeItem = (index: number) => {
    onChange({
      ...block,
      data: { ...block.data, items: items.filter((_, i) => i !== index) },
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
          placeholder="Fill in the Blanks"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Items</label>
        <div className="space-y-4">
          {items.map((item, ii) => (
            <div key={item.id} className="bg-via-bg-subtle rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-via-navy">Item {ii + 1}</span>
                <button
                  type="button"
                  onClick={() => removeItem(ii)}
                  className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <label className="block text-xs text-via-text-light mb-1">
                  Sentence <span className="text-via-text-light">(use _____ for blank)</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                  value={item.sentence}
                  onChange={(e) => updateItem(ii, { sentence: e.target.value })}
                  placeholder="The _____ is correct."
                />
              </div>

              <div>
                <label className="block text-xs text-via-text-light mb-1">Blank Label</label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                  value={item.blank}
                  onChange={(e) => updateItem(ii, { blank: e.target.value })}
                  placeholder="answer"
                />
              </div>

              <div>
                <label className="block text-xs text-via-text-light mb-1">Options</label>
                <div className="space-y-1.5">
                  {item.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${item.id}`}
                        checked={item.correctIndex === oi}
                        onChange={() => updateItem(ii, { correctIndex: oi })}
                        className="shrink-0"
                        title="Mark as correct"
                      />
                      <input
                        type="text"
                        className="flex-1 px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                        value={opt}
                        onChange={(e) => updateOption(ii, oi, e.target.value)}
                        placeholder={`Option ${oi + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(ii, oi)}
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
                  onClick={() => addOption(ii)}
                  className="mt-1.5 flex items-center gap-1 text-xs text-via-orange hover:text-orange-700 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add option
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium text-via-orange hover:text-orange-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add item
        </button>
      </div>
    </div>
  )
}
