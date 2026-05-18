import { Plus, Trash2 } from 'lucide-react'
import type { TermMatchBlock } from '../../../types/blocks'

interface Props {
  block: TermMatchBlock
  onChange: (updated: TermMatchBlock) => void
}

export function TermMatchEditor({ block, onChange }: Props) {
  const { title, pairs } = block.data

  const updatePair = (index: number, field: 'term' | 'definition', value: string) => {
    const next = pairs.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    onChange({ ...block, data: { ...block.data, pairs: next } })
  }

  const addPair = () => {
    onChange({
      ...block,
      data: {
        ...block.data,
        pairs: [...pairs, { term: '', definition: '' }],
      },
    })
  }

  const removePair = (index: number) => {
    onChange({
      ...block,
      data: { ...block.data, pairs: pairs.filter((_, i) => i !== index) },
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
          placeholder="Match the Terms"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Pairs</label>
        <div className="space-y-2">
          {pairs.map((pair, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <input
                  type="text"
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                  value={pair.term}
                  onChange={(e) => updatePair(i, 'term', e.target.value)}
                  placeholder="Term"
                />
                <input
                  type="text"
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                  value={pair.definition}
                  onChange={(e) => updatePair(i, 'definition', e.target.value)}
                  placeholder="Definition"
                />
              </div>
              <button
                type="button"
                onClick={() => removePair(i)}
                className="mt-1 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove pair"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addPair}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium text-via-orange hover:text-orange-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add pair
        </button>
      </div>
    </div>
  )
}
