import { Plus, Trash2 } from 'lucide-react'
import type { BulletListBlock } from '../../../types/blocks'

interface Props {
  block: BulletListBlock
  onChange: (updated: BulletListBlock) => void
}

export function BulletListEditor({ block, onChange }: Props) {
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
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">
          Dot Color <span className="text-via-text-light">(optional)</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={block.data.color ?? ''}
          onChange={(e) =>
            onChange({
              ...block,
              data: { ...block.data, color: e.target.value || undefined },
            })
          }
          placeholder="e.g. via-orange, emerald-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Items</label>
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                value={item}
                onChange={(e) => updateItem(i, e.target.value)}
                placeholder={`Item ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove item"
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
          Add item
        </button>
      </div>
    </div>
  )
}
