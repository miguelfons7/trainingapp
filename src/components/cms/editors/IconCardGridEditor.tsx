import { Plus, Trash2 } from 'lucide-react'
import type { IconCardGridBlock } from '../../../types/blocks'
import { IconPicker } from '../IconPicker'

interface Props {
  block: IconCardGridBlock
  onChange: (updated: IconCardGridBlock) => void
}

export function IconCardGridEditor({ block, onChange }: Props) {
  const { columns, cards } = block.data

  const updateCard = (
    index: number,
    field: keyof (typeof cards)[0],
    value: string
  ) => {
    const next = cards.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    onChange({ ...block, data: { ...block.data, cards: next } })
  }

  const addCard = () => {
    onChange({
      ...block,
      data: {
        ...block.data,
        cards: [...cards, { icon: 'Star', title: '', description: '' }],
      },
    })
  }

  const removeCard = (index: number) => {
    onChange({
      ...block,
      data: { ...block.data, cards: cards.filter((_, i) => i !== index) },
    })
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Columns</label>
        <select
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={columns}
          onChange={(e) =>
            onChange({
              ...block,
              data: { ...block.data, columns: Number(e.target.value) as 1 | 2 | 3 },
            })
          }
        >
          <option value={1}>1 column</option>
          <option value={2}>2 columns</option>
          <option value={3}>3 columns</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Cards</label>
        <div className="space-y-3">
          {cards.map((card, i) => (
            <div key={i} className="flex items-start gap-2 bg-via-bg-subtle rounded-lg p-3">
              <div className="flex-1 grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-via-text-light mb-1">Icon</label>
                  <IconPicker
                    value={card.icon}
                    onChange={(icon) => updateCard(i, 'icon', icon ?? 'Star')}
                    allowNone={false}
                  />
                </div>
                <div>
                  <label className="block text-xs text-via-text-light mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                    value={card.title}
                    onChange={(e) => updateCard(i, 'title', e.target.value)}
                    placeholder="Card title"
                  />
                </div>
                <div>
                  <label className="block text-xs text-via-text-light mb-1">Description</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                    value={card.description}
                    onChange={(e) => updateCard(i, 'description', e.target.value)}
                    placeholder="Short description"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeCard(i)}
                className="mt-5 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove card"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addCard}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium text-via-orange hover:text-orange-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add card
        </button>
      </div>
    </div>
  )
}
