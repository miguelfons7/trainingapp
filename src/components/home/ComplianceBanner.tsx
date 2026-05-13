import { AlertTriangle } from 'lucide-react'
import { useCompliance } from '../../context/ComplianceContext'

interface ComplianceBannerProps {
  onAcknowledge: (itemId: string) => void
}

const priorityStyles: Record<string, { badge: string; label: string }> = {
  high: {
    badge: 'bg-via-danger/15 text-via-danger',
    label: 'High Priority',
  },
  medium: {
    badge: 'bg-via-warning/15 text-via-warning',
    label: 'Medium Priority',
  },
}

export function ComplianceBanner({ onAcknowledge }: ComplianceBannerProps) {
  const { pendingItems } = useCompliance()

  if (pendingItems.length === 0) return null

  return (
    <div className="space-y-3">
      {pendingItems.map((item) => {
        const style = priorityStyles[item.priority]

        return (
          <div
            key={item.id}
            className="rounded-xl border-l-4 border-l-via-warning bg-via-warning/10 border border-via-border p-5"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0">
                <AlertTriangle className="h-5 w-5 text-via-warning" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-via-navy">
                    {item.title}
                  </h3>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style.badge}`}
                  >
                    {style.label}
                  </span>
                </div>

                <p className="text-sm text-via-text-light mb-3">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-via-text-light">
                    Required by{' '}
                    <span className="font-medium text-via-text">
                      {new Date(item.requiredBy).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </span>

                  <button
                    onClick={() => onAcknowledge(item.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-via-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-via-navy-light"
                  >
                    Review & Acknowledge
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
