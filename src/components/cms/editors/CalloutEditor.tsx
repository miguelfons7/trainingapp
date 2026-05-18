import type { CalloutBlock } from '../../../types/blocks'

interface Props {
  block: CalloutBlock
  onChange: (updated: CalloutBlock) => void
}

const STYLE_OPTIONS: { value: CalloutBlock['data']['style']; label: string }[] = [
  { value: 'info', label: 'Info (blue)' },
  { value: 'tip', label: 'Tip (green)' },
  { value: 'warning', label: 'Warning (amber)' },
  { value: 'orange', label: 'Orange' },
]

export function CalloutEditor({ block, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Style</label>
        <select
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={block.data.style}
          onChange={(e) =>
            onChange({
              ...block,
              data: {
                ...block.data,
                style: e.target.value as CalloutBlock['data']['style'],
              },
            })
          }
        >
          {STYLE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">
          Title <span className="text-via-text-light">(optional)</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={block.data.title ?? ''}
          onChange={(e) =>
            onChange({ ...block, data: { ...block.data, title: e.target.value } })
          }
          placeholder="Callout title"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Content</label>
        <textarea
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange resize-none"
          rows={4}
          value={block.data.content}
          onChange={(e) =>
            onChange({ ...block, data: { ...block.data, content: e.target.value } })
          }
          placeholder="Callout content..."
        />
      </div>
    </div>
  )
}
