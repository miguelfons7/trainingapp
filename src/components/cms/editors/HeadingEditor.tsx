import type { HeadingBlock } from '../../../types/blocks'

interface Props {
  block: HeadingBlock
  onChange: (updated: HeadingBlock) => void
}

export function HeadingEditor({ block, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Text</label>
        <input
          type="text"
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={block.data.text}
          onChange={(e) =>
            onChange({ ...block, data: { ...block.data, text: e.target.value } })
          }
          placeholder="Heading text"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Level</label>
        <select
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={block.data.level}
          onChange={(e) =>
            onChange({
              ...block,
              data: { ...block.data, level: Number(e.target.value) as 3 | 4 },
            })
          }
        >
          <option value={3}>H3 - Section heading</option>
          <option value={4}>H4 - Sub-heading</option>
        </select>
      </div>
    </div>
  )
}
