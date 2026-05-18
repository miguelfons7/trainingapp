import { Plus, Trash2 } from 'lucide-react'
import type { NumberedListBlock } from '../../../types/blocks'

interface Props {
  block: NumberedListBlock
  onChange: (updated: NumberedListBlock) => void
}

export function NumberedListEditor({ block, onChange }: Props) {
  const items = block.data.items

  const updateItem = (index: number, value: string) => {
    const next = [...items]
    next[index] = value
    onChange({ ...block, data: { ...block.data, items: next } })
  }

  const addItem = () => {
    onChange({ ...block, data: { ...block.data, items: [...items, ''] } })
  }

  const removeItem = (index: number) => {
    onChange({ ...block, data: { ...block.data, items: items.filter((_, i) => i !== index) } })
  }

  return (
    <div>
      <label className="block text-xs font-medium text-via-text mb-1.5">Steps</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-via-orange/10 text-via-orange text-xs font-bold shrink-0">
              {i + 1}
            </span>
            <input
              type="text"
              className="flex-1 px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              placeholder={`Step ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removeItem(i)}
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
        onClick={addItem}
        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-via-orange hover:text-orange-700 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        Add step
      </button>
    </div>
  )
}
