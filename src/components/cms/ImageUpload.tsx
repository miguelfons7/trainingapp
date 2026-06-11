import { useState, useRef } from 'react'
import { Upload, Loader2, ImageIcon } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface ImageUploadProps {
  /** Current value — full URL (uploaded) or filename in public/images */
  value: string
  onChange: (src: string) => void
}

/**
 * Image field with upload-to-Supabase-Storage. Authors can upload a file
 * (stored in the public `content-images` bucket, saved as a full URL) or
 * still type a filename from public/images for existing assets.
 */
export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const previewSrc = value
    ? value.startsWith('http')
      ? value
      : `${import.meta.env.BASE_URL}images/${value}`
    : null

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB')
      return
    }
    setUploading(true)
    setError('')

    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
    const safeName = file.name
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .slice(0, 40)
    const path = `${Date.now()}-${safeName}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('content-images')
      .upload(path, file, { cacheControl: '31536000', upsert: false })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('content-images').getPublicUrl(path)
    onChange(data.publicUrl)
    setUploading(false)
  }

  return (
    <div className="space-y-2">
      {/* Preview */}
      {previewSrc ? (
        <div className="rounded-lg overflow-hidden border border-via-border bg-via-bg-subtle">
          <img
            src={previewSrc}
            alt="Preview"
            className="w-full max-h-40 object-contain"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-via-border bg-via-bg-subtle h-24 flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-via-text-light/50" />
        </div>
      )}

      {/* Upload + manual entry */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-via-navy text-white text-xs font-semibold hover:bg-via-navy-light transition-colors disabled:opacity-50 cursor-pointer"
        >
          {uploading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5" />
          )}
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="or filename from public/images"
          className="flex-1 px-3 py-2 rounded-lg border border-via-border bg-white text-xs text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
        />
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />
      {error && <p className="text-xs text-via-danger">{error}</p>}
    </div>
  )
}
