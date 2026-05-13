import { useState } from 'react'
import { ImageIcon, type LucideIcon } from 'lucide-react'

interface ImagePlaceholderProps {
  src: string
  alt: string
  aspectRatio: '16:9' | '4:3' | '1:1'
  icon?: LucideIcon
  className?: string
}

const aspectClasses: Record<string, string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-4/3',
  '1:1': 'aspect-square',
}

export function ImagePlaceholder({
  src,
  alt,
  aspectRatio,
  icon: Icon = ImageIcon,
  className = '',
}: ImagePlaceholderProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className={`relative overflow-hidden rounded-xl ${aspectClasses[aspectRatio]} ${className}`}>
      {!imageError ? (
        <img
          src={`/images/${src}`}
          alt={alt}
          loading="lazy"
          onError={() => setImageError(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-via-border bg-via-navy/10">
          <Icon className="h-10 w-10 text-via-text-light" />
          <span className="px-4 text-center text-sm text-via-text-light">{alt}</span>
        </div>
      )}
    </div>
  )
}
