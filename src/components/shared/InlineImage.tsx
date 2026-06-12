import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { ImageLightbox } from './ImageLightbox'

interface InlineImageProps {
  src: string
  alt: string
  float?: 'left' | 'right' | 'none'
  size?: 'small' | 'medium' | 'large'
  caption?: string
  className?: string
}

const sizeClasses = {
  small: 'w-36 sm:w-44',
  medium: 'w-48 sm:w-56',
  large: 'w-56 sm:w-72',
}

export function InlineImage({
  src,
  alt,
  float = 'right',
  size = 'medium',
  caption,
  className = '',
}: InlineImageProps) {
  const [error, setError] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const resolvedSrc = src.startsWith('http')
    ? src
    : `${import.meta.env.BASE_URL}images/${src}`

  const floatClasses =
    float === 'left'
      ? 'float-left mr-4 mb-3'
      : float === 'right'
        ? 'float-right ml-4 mb-3'
        : 'mx-auto mb-4'

  return (
    <>
      <figure
        className={`${float !== 'none' ? floatClasses : 'mb-4'} ${float !== 'none' ? sizeClasses[size] : 'w-full max-w-sm mx-auto'} ${className}`}
      >
        <div className="rounded-lg overflow-hidden border border-via-border bg-[#e8eaee]">
          {!error ? (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="block w-full cursor-zoom-in"
              title="Click to enlarge"
            >
              {/* object-contain: never crop — wide screenshots, diagrams, and
                  portraits letterbox inside the 4:3 frame instead of clipping */}
              <img
                src={resolvedSrc}
                alt={alt}
                loading="lazy"
                onError={() => setError(true)}
                className="w-full aspect-[4/3] object-contain"
              />
            </button>
          ) : (
            // Missing image: show the alt text so the placeholder reads as
            // intentional ("screenshot coming") instead of broken
            <div className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-2 px-3">
              <ImageIcon className="w-8 h-8 text-via-text-light" />
              <span className="text-[10px] text-via-text-light text-center leading-tight">
                {alt}
              </span>
            </div>
          )}
        </div>
        {caption && (
          <figcaption className="text-[11px] text-via-text-light mt-1 text-center italic leading-tight">
            {caption}
          </figcaption>
        )}
      </figure>

      {expanded && !error && (
        <ImageLightbox
          src={resolvedSrc}
          alt={alt}
          caption={caption}
          onClose={() => setExpanded(false)}
        />
      )}
    </>
  )
}
