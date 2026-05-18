import type { DividerBlock } from '../../../types/blocks'

interface Props {
  block: DividerBlock
  onChange: (updated: DividerBlock) => void
}

export function DividerEditor({ block, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
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
                style: e.target.value as 'line' | 'space',
              },
            })
          }
        >
          <option value="line">Line</option>
          <option value="space">Space</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Size</label>
        <select
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={block.data.size ?? 'md'}
          onChange={(e) =>
            onChange({
              ...block,
              data: {
                ...block.data,
                size: e.target.value as 'sm' | 'md' | 'lg',
              },
            })
          }
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </div>
    </div>
  )
}
