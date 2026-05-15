import { FileText } from 'lucide-react'

export interface Citation {
  id: string
  text: string
  url?: string
}

interface SourcesCitationsProps {
  citations: Citation[]
}

export function SourcesCitations({ citations }: SourcesCitationsProps) {
  if (citations.length === 0) return null

  return (
    <div className="bg-via-bg-subtle rounded-xl border border-via-border p-6 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="w-4 h-4 text-via-text-light" />
        <h4 className="text-xs font-semibold text-via-text-light uppercase tracking-wide">
          Sources
        </h4>
      </div>
      <ol className="space-y-1.5">
        {citations.map((citation, i) => (
          <li key={citation.id} className="flex items-start gap-2 text-xs text-via-text-light leading-relaxed">
            <span className="text-via-text-light shrink-0 font-medium">[{i + 1}]</span>
            <span>
              {citation.url ? (
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-via-navy transition-colors underline decoration-via-border hover:decoration-via-navy"
                >
                  {citation.text}
                </a>
              ) : (
                citation.text
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
