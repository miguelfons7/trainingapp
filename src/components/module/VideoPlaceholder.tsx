import { Play, Video } from 'lucide-react'

interface VideoPlaceholderProps {
  title: string
  description?: string
}

export function VideoPlaceholder({ title, description }: VideoPlaceholderProps) {
  return (
    <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
      {/* Video area */}
      <div className="relative aspect-video bg-via-navy/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-via-navy/15 flex items-center justify-center mx-auto mb-3">
            <Play className="w-7 h-7 text-via-navy/40 ml-1" />
          </div>
          <p className="text-sm font-medium text-via-text-light">
            Video Coming Soon
          </p>
        </div>

        {/* Corner badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-via-card/90 rounded-lg px-2.5 py-1.5 border border-via-border">
          <Video className="w-3.5 h-3.5 text-via-text-light" />
          <span className="text-[10px] font-medium text-via-text-light">
            Placeholder
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="text-sm font-semibold text-via-navy">{title}</h4>
        {description && (
          <p className="text-xs text-via-text-light mt-1">{description}</p>
        )}
      </div>
    </div>
  )
}
