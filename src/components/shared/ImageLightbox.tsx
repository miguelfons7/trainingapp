import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ImageLightboxProps {
  src: string
  alt: string
  caption?: string
  onClose: () => void
}

/**
 * Full-screen image viewer. Opens from any expandable image (inline images,
 * module heroes, CMS content). Closes on backdrop click, the X button, or Escape.
 */
export function ImageLightbox({ src, alt, caption, onClose }: ImageLightboxProps) {
  // Escape to close + lock body scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors cursor-pointer"
        aria-label="Close image"
      >
        <X className="w-6 h-6" />
      </button>

      <figure
        className="max-w-[92vw] max-h-[90vh] flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[82vh] object-contain rounded-lg shadow-2xl cursor-default"
        />
        {caption && (
          <figcaption className="text-sm text-white/80 text-center max-w-2xl">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>,
    document.body,
  )
}
