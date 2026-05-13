import { useState } from 'react'
import { ChevronDown, ChevronRight, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import { useCompliance } from '../../context/ComplianceContext'
import { mockUsers } from '../../data/mockUsers'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function ComplianceTracker() {
  const { items } = useCompliance()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const totalUsers = mockUsers.length

  function toggleExpanded(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const ackCount = item.acknowledgedBy.length
        const pendingCount = totalUsers - ackCount
        const isOpen = expanded[item.id] ?? false
        const isHigh = item.priority === 'high'

        const acknowledgedEmails = new Set(item.acknowledgedBy)
        const acknowledgedUsers = mockUsers.filter((u) => acknowledgedEmails.has(u.email))
        const pendingUsers = mockUsers.filter((u) => !acknowledgedEmails.has(u.email))

        return (
          <div key={item.id} className="bg-via-card rounded-xl p-6 border border-via-border">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isHigh
                        ? 'bg-via-danger/15 text-via-danger'
                        : 'bg-via-warning/15 text-via-warning'
                    }`}
                  >
                    {isHigh && <AlertTriangle className="w-3 h-3" />}
                    {item.priority}
                  </span>
                  <span className="text-xs text-via-text-light flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Due {formatDate(item.requiredBy)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-via-navy mb-1">{item.title}</h3>
                <p className="text-sm text-via-text leading-relaxed">{item.description}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-via-success" />
                <span className="font-semibold text-via-success">{ackCount}</span>
                <span className="text-via-text-light">acknowledged</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Clock className="w-4 h-4 text-via-warning" />
                <span className="font-semibold text-via-warning">{pendingCount}</span>
                <span className="text-via-text-light">pending</span>
              </div>
              <div className="flex-1" />
              <button
                onClick={() => toggleExpanded(item.id)}
                className="inline-flex items-center gap-1 text-sm font-medium text-via-navy hover:text-via-orange transition-colors cursor-pointer"
              >
                {isOpen ? (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Hide details
                  </>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    View details
                  </>
                )}
              </button>
            </div>

            {isOpen && (
              <div className="mt-4 pt-4 border-t border-via-border">
                {acknowledgedUsers.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-via-success uppercase tracking-wider mb-2">
                      Acknowledged ({acknowledgedUsers.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {acknowledgedUsers.map((u) => (
                        <span
                          key={u.email}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-via-success/10 text-sm text-via-text"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-via-success" />
                          {u.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {pendingUsers.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-via-warning uppercase tracking-wider mb-2">
                      Pending ({pendingUsers.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pendingUsers.map((u) => (
                        <span
                          key={u.email}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-via-warning/10 text-sm text-via-text"
                        >
                          <Clock className="w-3.5 h-3.5 text-via-warning" />
                          {u.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
