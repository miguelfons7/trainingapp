import { useState, useEffect } from 'react'
import { AlertCircle, Loader2, Search, ChevronDown, ChevronUp, Clock, CheckCircle, XCircle, MessageSquare, ExternalLink } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import type { IssueReportRow } from '../../types/database'

type IssueStatus = 'open' | 'in-progress' | 'resolved' | 'dismissed'
type FilterStatus = 'all' | IssueStatus

interface IssueWithReporter extends IssueReportRow {
  reporter_name?: string
  reporter_email?: string
  resolver_name?: string
}

const STATUS_CONFIG: Record<IssueStatus, { label: string; color: string; icon: typeof Clock }> = {
  'open': { label: 'Open', color: 'bg-red-100 text-red-700', icon: AlertCircle },
  'in-progress': { label: 'In Progress', color: 'bg-amber-100 text-amber-700', icon: Clock },
  'resolved': { label: 'Resolved', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
  'dismissed': { label: 'Dismissed', color: 'bg-slate-100 text-slate-500', icon: XCircle },
}

export function IssueManager() {
  const { user } = useAuth()
  const [issues, setIssues] = useState<IssueWithReporter[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [savingId, setSavingId] = useState<string | null>(null)

  useEffect(() => {
    fetchIssues()
  }, [])

  async function fetchIssues() {
    setLoading(true)
    const { data, error } = await supabase
      .from('issue_reports')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch issues:', error)
      setLoading(false)
      return
    }

    // Fetch reporter names
    const reporterIds = [...new Set((data ?? []).map((d) => d.reported_by))]
    const resolverIds = [...new Set((data ?? []).map((d) => d.resolved_by).filter(Boolean))] as string[]
    const allIds = [...new Set([...reporterIds, ...resolverIds])]

    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name, email')
      .in('id', allIds)

    const profileMap = new Map(
      (profiles ?? []).map((p) => [p.id, { name: p.full_name, email: p.email }]),
    )

    const enriched: IssueWithReporter[] = (data ?? []).map((issue) => ({
      ...issue,
      reporter_name: profileMap.get(issue.reported_by)?.name,
      reporter_email: profileMap.get(issue.reported_by)?.email,
      resolver_name: issue.resolved_by ? profileMap.get(issue.resolved_by)?.name : undefined,
    }))

    setIssues(enriched)
    setLoading(false)
  }

  async function updateIssueStatus(issueId: string, newStatus: IssueStatus) {
    if (!user) return
    setSavingId(issueId)

    const isClosing = newStatus === 'resolved' || newStatus === 'dismissed'

    const { error } = await supabase
      .from('issue_reports')
      .update(isClosing ? { status: newStatus, resolved_by: user.id } : { status: newStatus })
      .eq('id', issueId)

    if (!error) {
      setIssues((prev) =>
        prev.map((i) =>
          i.id === issueId
            ? { ...i, status: newStatus, resolved_by: (newStatus === 'resolved' || newStatus === 'dismissed') ? user.id : i.resolved_by, resolver_name: (newStatus === 'resolved' || newStatus === 'dismissed') ? user.name : i.resolver_name }
            : i,
        ),
      )
    }
    setSavingId(null)
  }

  async function updateAdminNote(issueId: string, note: string) {
    setSavingId(issueId)
    const { error } = await supabase
      .from('issue_reports')
      .update({ admin_note: note })
      .eq('id', issueId)

    if (!error) {
      setIssues((prev) =>
        prev.map((i) => (i.id === issueId ? { ...i, admin_note: note } : i)),
      )
    }
    setSavingId(null)
  }

  // Filter + search
  const filtered = issues.filter((issue) => {
    if (filter !== 'all' && issue.status !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        issue.title.toLowerCase().includes(q) ||
        issue.description.toLowerCase().includes(q) ||
        issue.reporter_name?.toLowerCase().includes(q) ||
        issue.reporter_email?.toLowerCase().includes(q) ||
        issue.page_url.toLowerCase().includes(q)
      )
    }
    return true
  })

  const counts = {
    all: issues.length,
    open: issues.filter((i) => i.status === 'open').length,
    'in-progress': issues.filter((i) => i.status === 'in-progress').length,
    resolved: issues.filter((i) => i.status === 'resolved').length,
    dismissed: issues.filter((i) => i.status === 'dismissed').length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-via-navy animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filter tabs + search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 bg-via-bg-subtle rounded-lg p-1">
          {(['all', 'open', 'in-progress', 'resolved', 'dismissed'] as FilterStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filter === s
                  ? 'bg-white text-via-navy shadow-sm'
                  : 'text-via-text-light hover:text-via-navy'
              }`}
            >
              {s === 'all' ? 'All' : s === 'in-progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}
              <span className="ml-1 text-[10px] opacity-60">({counts[s]})</span>
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-via-text-light" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search issues..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-via-border rounded-lg focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          />
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
          <AlertCircle className="w-10 h-10 text-via-text-light mx-auto mb-3" />
          <p className="text-sm text-via-text-light">
            {issues.length === 0 ? 'No issues reported yet.' : 'No issues match your filters.'}
          </p>
        </div>
      )}

      {/* Issues list */}
      {filtered.map((issue) => {
        const isExpanded = expandedId === issue.id
        const statusConfig = STATUS_CONFIG[issue.status as IssueStatus] ?? STATUS_CONFIG.open
        const StatusIcon = statusConfig.icon

        return (
          <div key={issue.id} className="bg-via-card rounded-xl border border-via-border overflow-hidden">
            {/* Row header */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : issue.id)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-via-card-hover transition-colors cursor-pointer"
            >
              <StatusIcon className={`w-4 h-4 shrink-0 ${statusConfig.color.split(' ')[1]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-via-navy truncate">{issue.title}</p>
                <p className="text-[11px] text-via-text-light mt-0.5">
                  {issue.reporter_name ?? 'Unknown'} &middot; {issue.page_url} &middot;{' '}
                  {new Date(issue.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full shrink-0 ${statusConfig.color}`}>
                {statusConfig.label}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-via-text-light shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-via-text-light shrink-0" />
              )}
            </button>

            {/* Expanded details */}
            {isExpanded && (
              <div className="border-t border-via-border px-5 py-4 space-y-4">
                {/* Description */}
                {issue.description && (
                  <div>
                    <p className="text-[10px] text-via-text-light uppercase tracking-wide font-semibold mb-1">Description</p>
                    <p className="text-sm text-via-text leading-relaxed whitespace-pre-wrap">{issue.description}</p>
                  </div>
                )}

                {/* Metadata grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-via-text-light uppercase tracking-wide font-semibold mb-0.5">Reported By</p>
                    <p className="text-xs text-via-navy">{issue.reporter_name ?? 'Unknown'}</p>
                    {issue.reporter_email && (
                      <p className="text-[11px] text-via-text-light">{issue.reporter_email}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] text-via-text-light uppercase tracking-wide font-semibold mb-0.5">Page</p>
                    <div className="flex items-center gap-1">
                      <p className="text-xs text-via-navy font-mono truncate">{issue.page_url}</p>
                      <ExternalLink className="w-3 h-3 text-via-text-light shrink-0" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-via-text-light uppercase tracking-wide font-semibold mb-0.5">Viewport</p>
                    <p className="text-xs text-via-text">{issue.viewport ?? 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-via-text-light uppercase tracking-wide font-semibold mb-0.5">Submitted</p>
                    <p className="text-xs text-via-text">
                      {new Date(issue.created_at).toLocaleString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                        hour: 'numeric', minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                {/* User agent (collapsed by default) */}
                {issue.user_agent && (
                  <details className="text-xs">
                    <summary className="text-via-text-light cursor-pointer hover:text-via-navy transition-colors">
                      User Agent
                    </summary>
                    <p className="mt-1 text-[11px] text-via-text-light font-mono bg-via-bg-subtle rounded p-2 break-all">
                      {issue.user_agent}
                    </p>
                  </details>
                )}

                {/* Screenshot */}
                {issue.screenshot_url && (
                  <div>
                    <p className="text-[10px] text-via-text-light uppercase tracking-wide font-semibold mb-1">Screenshot</p>
                    <a
                      href={issue.screenshot_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img
                        src={issue.screenshot_url}
                        alt="Issue screenshot"
                        className="max-w-full max-h-64 rounded-lg border border-via-border object-contain"
                      />
                    </a>
                  </div>
                )}

                {/* Admin note */}
                <div>
                  <p className="text-[10px] text-via-text-light uppercase tracking-wide font-semibold mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    Admin Note
                  </p>
                  <textarea
                    value={issue.admin_note ?? ''}
                    onChange={(e) => {
                      // Optimistic local update
                      setIssues((prev) =>
                        prev.map((i) => (i.id === issue.id ? { ...i, admin_note: e.target.value } : i)),
                      )
                    }}
                    onBlur={(e) => updateAdminNote(issue.id, e.target.value)}
                    placeholder="Add a note..."
                    rows={2}
                    className="w-full px-3 py-2 text-xs border border-via-border rounded-lg focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange resize-none"
                  />
                </div>

                {/* Status actions */}
                <div className="flex items-center gap-2 pt-1">
                  <p className="text-[10px] text-via-text-light uppercase tracking-wide font-semibold mr-1">Set Status:</p>
                  {(['open', 'in-progress', 'resolved', 'dismissed'] as IssueStatus[]).map((s) => {
                    const cfg = STATUS_CONFIG[s]
                    const isCurrentStatus = issue.status === s
                    return (
                      <button
                        key={s}
                        onClick={() => !isCurrentStatus && updateIssueStatus(issue.id, s)}
                        disabled={isCurrentStatus || savingId === issue.id}
                        className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer disabled:cursor-default ${
                          isCurrentStatus
                            ? `${cfg.color} ring-2 ring-offset-1 ring-current`
                            : 'bg-via-bg-subtle text-via-text-light hover:text-via-navy'
                        }`}
                      >
                        {savingId === issue.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          cfg.label
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Resolved by */}
                {issue.resolver_name && (issue.status === 'resolved' || issue.status === 'dismissed') && (
                  <p className="text-[11px] text-via-text-light">
                    {issue.status === 'resolved' ? 'Resolved' : 'Dismissed'} by {issue.resolver_name}
                  </p>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
