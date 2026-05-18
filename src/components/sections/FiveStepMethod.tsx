import { useState } from 'react'
import { ClipboardList, Lightbulb, Cog, Star, PhoneForwarded } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { FlowDiagram } from '../shared/FlowDiagram'
import { ScenarioCard } from '../interactive/ScenarioCard'
import { fiveSteps } from '../../data/modules/consultative-sales/consultativeData'
import { fiveStepScenarios } from '../../data/modules/consultative-sales/inlineExercises'

const stepIcons: Record<string, React.ReactNode> = {
  'summarize': <ClipboardList className="w-5 h-5" />,
  'state-idea': <Lightbulb className="w-5 h-5" />,
  'explain-how': <Cog className="w-5 h-5" />,
  'reinforce-benefits': <Star className="w-5 h-5" />,
  'close': <PhoneForwarded className="w-5 h-5" />,
}

const badgeColors: Record<string, 'teal' | 'blue' | 'amber' | 'emerald' | 'violet'> = {
  '~40%': 'teal',
  '~10%': 'blue',
  '~15%': 'amber',
  '~20%': 'violet',
}

export function FiveStepMethod() {
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
      id="five-step-method"
      title="The 5-Step Method"
      subtitle="The clinical method — from diagnosis to treatment plan"
      accentColor="border-teal-500"
      icon={<ClipboardList className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          The Clinical Method
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Doctors follow a structured process: take a history, examine the patient, form a
          diagnosis, create a treatment plan, and schedule follow-up. They do not skip steps.
          They do not prescribe before examining.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Via Trading's <strong>5-Step Consultative Method</strong> follows the same logic. Each
          step builds on the one before it. Skip a step, and the conversation falls apart — just
          like a doctor who prescribes antibiotics without checking if it is actually an infection.
        </p>
      </div>

      {/* Main flow diagram */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          The 5-Step Flow
        </h3>
        <FlowDiagram
          steps={['Summarize (40%)', 'State the Idea (10%)', 'Explain How (15%)', 'Reinforce Benefits (15%)', 'Close (20%)']}
          label="Consultative Selling Method"
          color="bg-teal-600"
          highlightIndex={0}
        />
      </div>

      {/* Step 1 deep dive */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Step 1: The Diagnostic Phase
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Step 1 — Summarize — gets <strong>approximately 40%</strong> of the conversation time.
          That is not a typo. Nearly half of a great consultative conversation is spent understanding
          the buyer before making any recommendation. This is the phase where most salespeople fail:
          they rush through it to get to their pitch.
        </p>
        <FlowDiagram
          steps={['Ask', 'Listen', 'Acknowledge', 'Probe', 'Summarize']}
          label="Inside Step 1: The Discovery Loop"
          color="bg-teal-600"
          highlightIndex={4}
        />
        <p className="text-sm text-via-text leading-relaxed mt-4">
          This loop repeats as many times as needed. Ask an open question. Listen to the full
          answer. Acknowledge what you heard. Probe deeper if needed. Then summarize back to
          confirm understanding before moving to Step 2.
        </p>
      </div>

      {/* Steps 1-5 as ExpandableCards */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        The Five Steps in Detail
      </h3>
      <div className="space-y-3 mb-6">
        {fiveSteps.map((step) => (
          <ExpandableCard
            key={step.id}
            title={`Step ${step.step}: ${step.title}`}
            subtitle={step.focus}
            icon={stepIcons[step.id]}
            badge={<Badge text={step.timeAllocation} color={badgeColors[step.timeAllocation] ?? 'amber'} />}
            isExpanded={expandedIds.has(step.id)}
            onToggle={() => toggle(step.id)}
            accentColor="border-teal-500"
          >
            <div className="space-y-3">
              <p className="text-sm text-via-text">{step.description}</p>
              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
                  Examples
                </p>
                <ul className="space-y-1">
                  {step.examples.map((ex, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-via-text">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                      <span className="italic">{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </div>

      {/* Summary table */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          At a Glance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-via-border">
                <th className="text-left py-2 pr-3 text-xs font-semibold text-via-text-light uppercase">Step</th>
                <th className="text-left py-2 pr-3 text-xs font-semibold text-via-text-light uppercase">Focus</th>
                <th className="text-left py-2 pr-3 text-xs font-semibold text-via-text-light uppercase">Time</th>
                <th className="text-left py-2 text-xs font-semibold text-via-text-light uppercase">Your Role</th>
              </tr>
            </thead>
            <tbody>
              {fiveSteps.map((step) => (
                <tr key={step.id} className="border-b border-via-border/50">
                  <td className="py-2 pr-3 font-medium text-via-navy">{step.title}</td>
                  <td className="py-2 pr-3 text-via-text">{step.focus}</td>
                  <td className="py-2 pr-3 text-teal-600 font-medium">{step.timeAllocation}</td>
                  <td className="py-2 text-via-text">{step.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Why 40% is discovery */}
      <div className="bg-teal-50 rounded-lg border border-teal-200 p-4 mb-6">
        <p className="text-sm text-teal-700 font-medium mb-1">Why 40% Is Discovery</p>
        <p className="text-sm text-teal-700">
          Most salespeople rush to pitch. They spend 5% of the conversation asking questions and
          95% talking about their product. In consultative selling, that ratio is inverted. If you
          have done the diagnosis correctly, the prescription sells itself. The buyer hears their own
          needs reflected back, sees how your solution addresses each one, and the close feels like
          a natural conclusion — not a pressure moment.
        </p>
      </div>

      {/* Inline exercise */}
      <ScenarioCard scenarios={fiveStepScenarios} title="Identify the Step" />
    </SectionWrapper>
  )
}
