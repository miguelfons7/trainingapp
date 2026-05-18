import { Plus, Trash2 } from 'lucide-react'
import type { ExpandableCardGroupBlock, ExpandableCardItem, BadgeColor } from '../../../types/blocks'

interface Props {
  block: ExpandableCardGroupBlock
  onChange: (updated: ExpandableCardGroupBlock) => void
}

const BADGE_COLORS: BadgeColor[] = [
  'emerald', 'amber', 'sky', 'slate', 'red', 'orange',
  'teal', 'purple', 'blue', 'indigo', 'violet', 'rose',
]

export function ExpandableCardGroupEditor({ block, onChange }: Props) {
  const cards = block.data.cards

  const updateCard = (index: number, partial: Partial<ExpandableCardItem>) => {
    const next = cards.map((c, i) => (i === index ? { ...c, ...partial } : c))
    onChange({ ...block, data: { ...block.data, cards: next } })
  }

  const updateBadge = (index: number, text: string, color: BadgeColor) => {
    const card = cards[index]
    const badge = text ? { text, color } : undefined
    updateCard(index, { badge })
    // Need to handle removal differently since partial merge keeps old badge
    if (!text) {
      const next = cards.map((c, i) => {
        if (i !== index) return c
        const { badge: _, ...rest } = c
        return rest as ExpandableCardItem
      })
      onChange({ ...block, data: { ...block.data, cards: next } })
    }
  }

  const addCard = () => {
    const newCard: ExpandableCardItem = {
      id: crypto.randomUUID(),
      title: 'New Card',
      content: '',
    }
    onChange({ ...block, data: { ...block.data, cards: [...cards, newCard] } })
  }

  const removeCard = (index: number) => {
    onChange({
      ...block,
      data: { ...block.data, cards: cards.filter((_, i) => i !== index) },
    })
  }

  return (
    <div>
      <label className="block text-xs font-medium text-via-text mb-1.5">Cards</label>
      <div className="space-y-4">
        {cards.map((card, i) => (
          <div key={card.id} className="bg-via-bg-subtle rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-via-navy">Card {i + 1}</span>
              <button
                type="button"
                onClick={() => removeCard(i)}
                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove card"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <label className="block text-xs text-via-text-light mb-1">Title</label>
              <input
                type="text"
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                value={card.title}
                onChange={(e) => updateCard(i, { title: e.target.value })}
                placeholder="Card title"
              />
            </div>

            <div>
              <label className="block text-xs text-via-text-light mb-1">
                Subtitle <span className="text-via-text-light">(optional)</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                value={card.subtitle ?? ''}
                onChange={(e) =>
                  updateCard(i, { subtitle: e.target.value || undefined })
                }
                placeholder="Subtitle"
              />
            </div>

            <div>
              <label className="block text-xs text-via-text-light mb-1">Content</label>
              <textarea
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange resize-none"
                rows={3}
                value={card.content}
                onChange={(e) => updateCard(i, { content: e.target.value })}
                placeholder="Card content..."
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-via-text-light mb-1">Badge Text</label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                  value={card.badge?.text ?? ''}
                  onChange={(e) =>
                    updateBadge(i, e.target.value, card.badge?.color ?? 'blue')
                  }
                  placeholder="Badge text"
                />
              </div>
              <div>
                <label className="block text-xs text-via-text-light mb-1">Badge Color</label>
                <select
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                  value={card.badge?.color ?? 'blue'}
                  onChange={(e) =>
                    updateBadge(
                      i,
                      card.badge?.text ?? '',
                      e.target.value as BadgeColor
                    )
                  }
                >
                  {BADGE_COLORS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-via-text-light mb-1">
                Icon <span className="text-via-text-light">(lucide name)</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                value={card.icon ?? ''}
                onChange={(e) =>
                  updateCard(i, { icon: e.target.value || undefined })
                }
                placeholder="e.g. BookOpen, Star"
              />
            </div>
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
  )
}
