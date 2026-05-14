import { useState } from 'react'
import { FileCheck, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useCompliance } from '../context/ComplianceContext'
import { useAuth } from '../context/AuthContext'

export function Acknowledgements() {
  const { user } = useAuth()
  const { items, pendingItems, acknowledgeItem, isAcknowledged } = useCompliance()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [justAcknowledged, setJustAcknowledged] = useState<Set<string>>(new Set())

  const acknowledgedItems = items.filter((item) => isAcknowledged(item.id))

  const handleAcknowledge = (itemId: string) => {
    acknowledgeItem(itemId)
    setJustAcknowledged((prev) => new Set(prev).add(itemId))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-via-navy flex items-center gap-3">
          <FileCheck className="w-7 h-7 text-via-orange" />
          Acknowledgements
        </h1>
        <p className="mt-1 text-sm text-via-text-light">
          Review and digitally acknowledge compliance items, policy updates, and company announcements.
        </p>
      </div>

      {/* Pending Items */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-via-navy flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-via-warning" />
          Pending Acknowledgements
          {pendingItems.length > 0 && (
            <span className="ml-2 bg-via-danger text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {pendingItems.length}
            </span>
          )}
        </h2>

        {pendingItems.length === 0 ? (
          <div className="bg-via-card rounded-xl border border-via-border p-8 text-center">
            <CheckCircle className="w-10 h-10 text-via-success mx-auto mb-3" />
            <p className="text-sm font-medium text-via-navy">You're all caught up!</p>
            <p className="text-xs text-via-text-light mt-1">
              No pending acknowledgements at this time.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingItems.map((item) => {
              const isExpanded = expandedId === item.id
              const wasJustAcknowledged = justAcknowledged.has(item.id)

              return (
                <div
                  key={item.id}
                  className={`rounded-xl border-l-4 ${
                    item.priority === 'high'
                      ? 'border-l-via-danger'
                      : 'border-l-via-warning'
                  } bg-via-card border border-via-border overflow-hidden transition-all ${
                    wasJustAcknowledged ? 'opacity-50' : ''
                  }`}
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="w-full text-left p-5 flex items-start gap-4 cursor-pointer"
                  >
                    <AlertTriangle
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        item.priority === 'high'
                          ? 'text-via-danger'
                          : 'text-via-warning'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-via-navy">
                          {item.title}
                        </h3>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.priority === 'high'
                              ? 'bg-via-danger/15 text-via-danger'
                              : 'bg-via-warning/15 text-via-warning'
                          }`}
                        >
                          {item.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                        </span>
                      </div>
                      <p className="text-sm text-via-text-light">{item.description}</p>
                      <p className="text-xs text-via-text-light mt-2">
                        Required by{' '}
                        <span className="font-medium text-via-text">
                          {new Date(item.requiredBy).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-via-text-light shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-via-text-light shrink-0" />
                    )}
                  </button>

                  {/* Expanded details + acknowledge */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-via-border">
                      {item.details && (
                        <div className="bg-via-bg-subtle rounded-lg p-4 mt-4 mb-4">
                          <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-2">
                            Full Details
                          </p>
                          <p className="text-sm text-via-text leading-relaxed">
                            {item.details}
                          </p>
                        </div>
                      )}

                      <div className="bg-via-navy/5 rounded-lg p-4 mb-4">
                        <p className="text-xs text-via-text-light mb-1">
                          By clicking "I Acknowledge" below, you confirm that you have read and understood this item.
                        </p>
                        <p className="text-xs text-via-text-light">
                          Signed as: <span className="font-medium text-via-navy">{user?.name}</span> ({user?.email})
                        </p>
                      </div>

                      <button
                        onClick={() => handleAcknowledge(item.id)}
                        className="w-full py-3 bg-via-navy text-white text-sm font-semibold rounded-lg hover:bg-via-navy-light transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        I Acknowledge
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Completed Acknowledgements */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-via-navy flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-via-success" />
          Completed
        </h2>

        {acknowledgedItems.length === 0 ? (
          <div className="bg-via-card rounded-xl border border-via-border p-8 text-center">
            <FileCheck className="w-10 h-10 text-via-text-light mx-auto mb-3" />
            <p className="text-sm text-via-text-light">
              Acknowledged items will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {acknowledgedItems.map((item) => (
              <div
                key={item.id}
                className="bg-via-card rounded-xl border border-via-border p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-via-navy truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-via-success font-medium">Acknowledged</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
