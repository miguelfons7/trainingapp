import { ArrowRight } from 'lucide-react'

interface FlowDiagramProps {
  steps: string[]
  label: string
  color: string
  highlightIndex?: number
}

export function FlowDiagram({ steps, label, color, highlightIndex }: FlowDiagramProps) {
  return (
    <div className="mb-6">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-3">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-1">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-1">
            <span
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                i === highlightIndex
                  ? `${color} text-white shadow-sm`
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {step}
            </span>
            {i < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
