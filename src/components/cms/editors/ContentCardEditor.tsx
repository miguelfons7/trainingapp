import type { ContentCardBlock } from '../../../types/blocks'

interface Props {
  block: ContentCardBlock
  onChange: (updated: ContentCardBlock) => void
}

export function ContentCardEditor({ block, onChange }: Props) {
  return (
    <div>
      <label className="block text-xs font-medium text-via-text mb-1.5">
        Title <span className="text-via-text-light">(optional)</span>
      </label>
      <input
        type="text"
        className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
        value={block.data.title ?? ''}
        onChange={(e) =>
          onChange({ ...block, data: { ...block.data, title: e.target.value || undefined } })
        }
        placeholder="Card title"
      />
      <p className="mt-2 text-xs text-via-text-light">
        Child blocks are managed in the block tree.
      </p>
    </div>
  )
}
