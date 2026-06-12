import { useState } from 'react'
import { ImageIcon, type LucideIcon } from 'lucide-react'
import { ImageLightbox } from './ImageLightbox'

interface ImagePlaceholderProps {
  src: string
  alt: string
  aspectRatio: '16:9' | '4:3' | '1:1'
  icon?: LucideIcon
  className?: string
  objectFit?: 'contain' | 'cover'
  /** When true, clicking opens the image in a lightbox (used for module heroes) */
  expandable?: boolean
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
  objectFit = 'contain',
  expandable = false,
}: ImagePlaceholderProps) {
  const [imageError, setImageError] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const resolvedSrc = src.startsWith('http')
    ? src
    : `${import.meta.env.BASE_URL}images/${src}`

  const canExpand = expandable && !imageError

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-xl ${imageError ? 'bg-via-bg-subtle' : 'bg-[#e8eaee]'} ${aspectClasses[aspectRatio]} ${className} ${canExpand ? 'cursor-zoom-in' : ''}`}
        onClick={canExpand ? () => setExpanded(true) : undefined}
        title={canExpand ? 'Click to enlarge' : undefined}
      >
        {!imageError ? (
          <img
            src={resolvedSrc}
            alt={alt}
            loading="lazy"
            onError={() => setImageError(true)}
            className={`absolute inset-0 h-full w-full ${objectFit === 'cover' ? 'object-cover' : 'object-contain'}`}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-via-border bg-via-navy/10">
            <Icon className="h-10 w-10 text-via-text-light" />
            <span className="px-4 text-center text-sm text-via-text-light">{alt}</span>
          </div>
        )}
      </div>

      {expanded && canExpand && (
        <ImageLightbox
          src={resolvedSrc}
          alt={alt}
          onClose={() => setExpanded(false)}
        />
      )}
    </>
  )
}
