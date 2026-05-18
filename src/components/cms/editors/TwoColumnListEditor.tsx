import { Plus, Trash2 } from 'lucide-react'
import type { TwoColumnListBlock } from '../../../types/blocks'

interface Props {
  block: TwoColumnListBlock
  onChange: (updated: TwoColumnListBlock) => void
}

function ColumnEditor({
  label,
  title,
  color,
  items,
  onTitleChange,
  onColorChange,
  onItemsChange,
}: {
  label: string
  title: string
  color: string
  items: string[]
  onTitleChange: (value: string) => void
  onColorChange: (value: string) => void
  onItemsChange: (items: string[]) => void
}) {
  const updateItem = (index: number, value: string) => {
    const next = [...items]
    next[index] = value
    onItemsChange(next)
  }

  const addItem = () => {
    onItemsChange([...items, ''])
  }

  const removeItem = (index: number) => {
    onItemsChange(items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-via-navy uppercase tracking-wide">{label}</p>
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Title</label>
        <input
          type="text"
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Column title"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Dot Color</label>
        <input
          type="text"
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          placeholder="e.g. emerald-500, red-500"
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

export function TwoColumnListEditor({ block, onChange }: Props) {
  const d = block.data

  const update = (partial: Partial<TwoColumnListBlock['data']>) => {
    onChange({ ...block, data: { ...d, ...partial } })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ColumnEditor
        label="Left Column"
        title={d.leftTitle}
        color={d.leftColor}
        items={d.leftItems}
        onTitleChange={(v) => update({ leftTitle: v })}
        onColorChange={(v) => update({ leftColor: v })}
        onItemsChange={(items) => update({ leftItems: items })}
      />
      <ColumnEditor
        label="Right Column"
        title={d.rightTitle}
        color={d.rightColor}
        items={d.rightItems}
        onTitleChange={(v) => update({ rightTitle: v })}
        onColorChange={(v) => update({ rightColor: v })}
        onItemsChange={(items) => update({ rightItems: items })}
      />
    </div>
  )
}
