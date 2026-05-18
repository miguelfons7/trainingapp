import type { InlineImageBlock } from '../../../types/blocks'

interface Props {
  block: InlineImageBlock
  onChange: (updated: InlineImageBlock) => void
}

export function InlineImageEditor({ block, onChange }: Props) {
  const d = block.data

  const update = (partial: Partial<InlineImageBlock['data']>) => {
    onChange({ ...block, data: { ...d, ...partial } })
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">
          Source <span className="text-via-text-light">(filename only)</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={d.src}
          onChange={(e) => update({ src: e.target.value })}
          placeholder="inline-example.jpg"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Alt Text</label>
        <input
          type="text"
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={d.alt}
          onChange={(e) => update({ alt: e.target.value })}
          placeholder="Image description"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-via-text mb-1.5">Float</label>
          <select
            className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
            value={d.float ?? 'none'}
            onChange={(e) =>
              update({ float: e.target.value as 'left' | 'right' | 'none' })
            }
          >
            <option value="none">None</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-via-text mb-1.5">Size</label>
          <select
            className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
            value={d.size ?? 'medium'}
            onChange={(e) =>
              update({ size: e.target.value as 'small' | 'medium' | 'large' })
            }
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">
          Caption <span className="text-via-text-light">(optional)</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={d.caption ?? ''}
          onChange={(e) => update({ caption: e.target.value || undefined })}
          placeholder="Image caption"
        />
      </div>
    </div>
  )
}
