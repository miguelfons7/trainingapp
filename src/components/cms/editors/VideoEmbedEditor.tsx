import type { VideoEmbedBlock } from '../../../types/blocks'

interface Props {
  block: VideoEmbedBlock
  onChange: (updated: VideoEmbedBlock) => void
}

export function VideoEmbedEditor({ block, onChange }: Props) {
  const d = block.data

  const update = (partial: Partial<VideoEmbedBlock['data']>) => {
    onChange({ ...block, data: { ...d, ...partial } })
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">
          YouTube URL
        </label>
        <input
          type="text"
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={d.url}
          onChange={(e) => update({ url: e.target.value })}
          placeholder="https://www.youtube.com/watch?v=..."
        />
        <p className="text-[10px] text-via-text-light mt-1">
          Paste any YouTube link (watch, youtu.be, or Shorts). Find videos on the Via
          Trading channel: youtube.com/@Viatrading
        </p>
      </div>
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">
          Title <span className="text-via-text-light">(optional)</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={d.title ?? ''}
          onChange={(e) => update({ title: e.target.value || undefined })}
          placeholder="Video title"
        />
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
          placeholder="Shown below the video"
        />
      </div>
    </div>
  )
}
