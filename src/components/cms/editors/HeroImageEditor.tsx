import type { HeroImageBlock } from '../../../types/blocks'

interface Props {
  block: HeroImageBlock
  onChange: (updated: HeroImageBlock) => void
}

export function HeroImageEditor({ block, onChange }: Props) {
  const d = block.data

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Source</label>
        <input
          type="text"
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={d.src}
          onChange={(e) =>
            onChange({ ...block, data: { ...d, src: e.target.value } })
          }
          placeholder="hero-image.jpg"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Alt Text</label>
        <input
          type="text"
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={d.alt}
          onChange={(e) =>
            onChange({ ...block, data: { ...d, alt: e.target.value } })
          }
          placeholder="Image description"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Aspect Ratio</label>
        <select
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={d.aspectRatio}
          onChange={(e) =>
            onChange({
              ...block,
              data: { ...d, aspectRatio: e.target.value as '16:9' | '4:3' | '1:1' },
            })
          }
        >
          <option value="16:9">16:9 (Widescreen)</option>
          <option value="4:3">4:3 (Standard)</option>
          <option value="1:1">1:1 (Square)</option>
        </select>
      </div>
    </div>
  )
}
