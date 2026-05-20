import { useState, useRef } from 'react'
import { X, Bug, Upload, Loader2, CheckCircle, AlertTriangle, Image } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'

interface ReportIssueModalProps {
  currentPath: string
  onClose: () => void
}

export function ReportIssueModal({ currentPath, onClose }: ReportIssueModalProps) {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null)
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate: images only, max 5MB
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (PNG, JPG, etc.)')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB')
      return
    }

    setScreenshotFile(file)
    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onload = (ev) => {
      setScreenshotPreview(ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  function removeScreenshot() {
    setScreenshotFile(null)
    setScreenshotPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !title.trim()) return

    setSubmitting(true)
    setError(null)

    try {
      let screenshotUrl: string | null = null

      // Upload screenshot if provided
      if (screenshotFile) {
        const ext = screenshotFile.name.split('.').pop() ?? 'png'
        const fileName = `${user.id}/${Date.now()}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('issue-screenshots')
          .upload(fileName, screenshotFile)

        if (uploadError) {
          // If bucket doesn't exist or upload fails, store as base64 in description instead
          console.warn('Screenshot upload failed, storing inline:', uploadError.message)
          // Just skip the screenshot — don't block the report
        } else {
          const { data: urlData } = supabase.storage
            .from('issue-screenshots')
            .getPublicUrl(fileName)
          screenshotUrl = urlData.publicUrl
        }
      }

      const { error: insertError } = await supabase.from('issue_reports').insert({
        reported_by: user.id,
        title: title.trim(),
        description: description.trim(),
        page_url: currentPath,
        screenshot_url: screenshotUrl,
        user_agent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
      })

      if (insertError) throw insertError

      setSubmitted(true)
      setTimeout(onClose, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit report')
    } finally {
      setSubmitting(false)
    }
  }

  // Success state
  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="relative bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-via-navy mb-1">Report Submitted</h3>
          <p className="text-sm text-via-text-light">Thanks for letting us know. We'll look into it.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-via-border">
          <div className="flex items-center gap-2">
            <Bug className="w-5 h-5 text-via-navy" />
            <h2 className="text-lg font-bold text-via-navy">Report an Issue</h2>
          </div>
          <button
            onClick={onClose}
            className="text-via-text-light hover:text-via-navy transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mx-5 mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700">
            Please report this issue from the page where it's happening so we can capture the correct location.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Page location (auto-captured, shown for context) */}
          <div>
            <p className="text-[10px] text-via-text-light uppercase tracking-wide font-semibold mb-1">
              Current Page
            </p>
            <p className="text-xs text-via-navy font-mono bg-via-bg-subtle rounded px-2 py-1.5">
              {currentPath}
            </p>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="issue-title" className="block text-xs font-semibold text-via-navy mb-1">
              What went wrong? *
            </label>
            <input
              id="issue-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Quiz didn't load, button not working..."
              required
              className="w-full px-3 py-2 text-sm text-via-text bg-white border border-via-border rounded-lg focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="issue-desc" className="block text-xs font-semibold text-via-navy mb-1">
              Details (optional)
            </label>
            <textarea
              id="issue-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any extra info that might help us fix it..."
              rows={3}
              className="w-full px-3 py-2 text-sm text-via-text bg-white border border-via-border rounded-lg focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange resize-none"
            />
          </div>

          {/* Screenshot */}
          <div>
            <label className="block text-xs font-semibold text-via-navy mb-1">
              Screenshot (optional)
            </label>
            {screenshotPreview ? (
              <div className="relative">
                <img
                  src={screenshotPreview}
                  alt="Screenshot preview"
                  className="w-full max-h-48 object-contain rounded-lg border border-via-border bg-via-bg-subtle"
                />
                <button
                  type="button"
                  onClick={removeScreenshot}
                  className="absolute top-2 right-2 bg-white/90 rounded-full p-1 hover:bg-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 text-via-text" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-6 border-2 border-dashed border-via-border rounded-lg flex flex-col items-center gap-2 text-via-text-light hover:border-via-orange/50 hover:text-via-navy transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <Image className="w-4 h-4" />
                  <Upload className="w-4 h-4" />
                </div>
                <span className="text-xs">Click to attach a screenshot</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting || !title.trim()}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-via-orange text-white text-sm font-semibold rounded-lg hover:bg-via-orange-light transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Report'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-via-text-light hover:text-via-navy transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
