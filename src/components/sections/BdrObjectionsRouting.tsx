import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { Badge } from '../shared/Badge'
import { ExpandableCard } from '../shared/ExpandableCard'
import { ScenarioCard } from '../interactive/ScenarioCard'
import { bdrObjections, intentSignals } from '../../data/modules/bdr-role/bdrData'
import { intentSignalScenarios } from '../../data/modules/bdr-role/inlineExercises'

const intentColorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  strong: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
  },
  medium: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  exploratory: {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    text: 'text-slate-600',
    dot: 'bg-slate-400',
  },
}

export function BdrObjectionsRouting() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <SectionWrapper
      id="bdr-objections-routing"
      title="Handling Objections & Routing"
      subtitle="Acknowledge, redirect, and know when to hand off"
      accentColor="border-sky-500"
      icon={<ShieldCheck className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-sm text-via-text leading-relaxed">
          As a BDR, you will hear objections. The key difference between you and an AM: you do not
          resolve them — you acknowledge and redirect. Your pattern is simple: Acknowledge, give a
          Brief Answer, then Route to the AM.
        </p>
      </div>

      {/* The BDR Objection Pattern */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          The BDR Objection Pattern
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge text="Acknowledge" color="sky" />
          <span className="text-via-text-light text-sm">&rarr;</span>
          <Badge text="Brief Answer" color="sky" />
          <span className="text-via-text-light text-sm">&rarr;</span>
          <Badge text="Redirect to AM" color="sky" />
        </div>
        <p className="text-xs text-via-text-light mt-3">
          You are a bridge, not a closer. Validate their concern, give enough context to maintain
          trust, and hand off to the specialist.
        </p>
      </div>

      {/* Common Objections */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Common Objections
      </h3>
      <div className="space-y-3 mb-6">
        {bdrObjections.map((obj) => (
          <ExpandableCard
            key={obj.id}
            title={obj.objection}
            subtitle={obj.whyTheyAsk}
            isExpanded={expandedIds.has(obj.id)}
            onToggle={() => toggle(obj.id)}
            accentColor="border-sky-500"
          >
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">
                  How to Respond
                </p>
                <p className="text-sm text-via-text italic">{obj.response}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
                  What NOT to Do
                </p>
                <p className="text-sm text-via-text">{obj.doNot}</p>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </div>

      {/* Reading Intent Signals */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Reading Intent Signals
      </h3>
      <div className="space-y-3 mb-6">
        {intentSignals.map((signal) => {
          const colors = intentColorMap[signal.level]
          return (
            <div
              key={signal.level}
              className={`${colors.bg} rounded-lg border ${colors.border} p-4`}
            >
              <p className={`text-xs font-semibold ${colors.text} uppercase tracking-wide mb-2`}>
                {signal.level === 'strong'
                  ? 'Strong Intent'
                  : signal.level === 'medium'
                    ? 'Medium Intent'
                    : 'Exploratory / Low Intent'}
              </p>
              <ul className="space-y-1 mb-3">
                {signal.signals.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} mt-1.5 shrink-0`} />
                    <span className={colors.text}>{s}</span>
                  </li>
                ))}
              </ul>
              <p className={`text-xs ${colors.text} font-medium`}>
                Action: {signal.action}
              </p>
            </div>
          )
        })}
      </div>

      {/* When to Hand Off */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          When to Hand Off
        </h3>
        <p className="text-sm text-via-text leading-relaxed">
          You have gotten enough when you understand their business type, inventory interest,
          experience, volume, timing, and location. You do not need their entire business plan,
          detailed product specifications, exact budget numbers, or a complete decision timeline.
        </p>
      </div>

      {/* Inline exercise */}
      <ScenarioCard scenarios={intentSignalScenarios} title="Read the Intent" />
    </SectionWrapper>
  )
}
