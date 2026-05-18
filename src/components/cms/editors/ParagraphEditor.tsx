import type { ParagraphBlock } from '../../../types/blocks'

interface Props {
  block: ParagraphBlock
  onChange: (updated: ParagraphBlock) => void
}

export function ParagraphEditor({ block, onChange }: Props) {
  return (
    <div>
      <label className="block text-xs font-medium text-via-text mb-1.5">Content</label>
      <textarea
        className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange resize-none"
        rows={5}
        value={block.data.content}
        onChange={(e) =>
          onChange({ ...block, data: { ...block.data, content: e.target.value } })
        }
        placeholder="Enter paragraph text..."
      />
    </div>
  )
}
