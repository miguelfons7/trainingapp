import { useState, useEffect } from 'react'
import { Clock, RotateCcw, Loader2 } from 'lucide-react'
import { fetchContentVersions, rollbackToVersion, type ContentVersion } from '../../lib/contentService'

interface VersionHistoryProps {
  courseId: string
  moduleId: string
  userId: string
  currentVersion: number
  onRollback: () => void
}

export function VersionHistory({
  courseId,
  moduleId,
  userId,
  currentVersion,
  onRollback,
}: VersionHistoryProps) {
  const [versions, setVersions] = useState<ContentVersion[]>([])
  const [loading, setLoading] = useState(true)
  const [rollingBack, setRollingBack] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const vs = await fetchContentVersions(courseId, moduleId)
      if (!cancelled) {
        setVersions(vs)
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [courseId, moduleId, currentVersion])

  async function handleRollback(versionId: string) {
    setRollingBack(versionId)
    const result = await rollbackToVersion(courseId, moduleId, versionId, userId)
    setRollingBack(null)
    if (!result.error) {
      onRollback()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-6">
        <Loader2 className="w-5 h-5 text-via-text-light animate-spin" />
      </div>
    )
  }

  if (versions.length === 0) {
    return (
      <div className="text-center py-6">
        <Clock className="w-8 h-8 text-via-text-light/40 mx-auto mb-2" />
        <p className="text-xs text-via-text-light">No published versions yet.</p>
        <p className="text-xs text-via-text-light mt-1">Versions are created when you publish.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-via-navy uppercase tracking-wide px-1">
        Version History
      </p>
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {versions.map((v) => (
          <div
            key={v.id}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-via-border bg-white hover:bg-via-bg-subtle transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-via-navy/10 text-via-navy text-[10px] font-bold shrink-0">
                v{v.version}
              </span>
              <div className="min-w-0">
                <p className="text-xs text-via-text font-medium truncate">
                  Version {v.version}
                  {v.version === currentVersion && (
                    <span className="ml-1.5 text-[10px] text-via-success font-bold uppercase">Current</span>
                  )}
                </p>
                <p className="text-[10px] text-via-text-light">
                  {new Date(v.publishedAt).toLocaleString()}
                </p>
              </div>
            </div>
            {v.version !== currentVersion && (
              <button
                onClick={() => handleRollback(v.id)}
                disabled={rollingBack !== null}
                className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold text-via-orange bg-via-orange/10 rounded-md hover:bg-via-orange/20 transition-colors cursor-pointer disabled:opacity-40"
              >
                {rollingBack === v.id ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <RotateCcw className="w-3 h-3" />
                )}
                Rollback
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
