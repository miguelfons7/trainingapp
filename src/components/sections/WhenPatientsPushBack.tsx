import { useState } from 'react'
import { ShieldAlert, Pause, Ear, Heart, Search, Target, Zap, CheckCircle } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { ScenarioCard } from '../interactive/ScenarioCard'
import { klapdocSteps, commonObjections } from '../../data/modules/consultative-sales/consultativeData'
import { objectionScenarios } from '../../data/modules/consultative-sales/inlineExercises'

const letterIcons: Record<string, React.ReactNode> = {
  K: <Pause className="w-5 h-5" />,
  L: <Ear className="w-5 h-5" />,
  A: <Heart className="w-5 h-5" />,
  P: <Search className="w-5 h-5" />,
  D: <Target className="w-5 h-5" />,
  O: <Zap className="w-5 h-5" />,
  C: <CheckCircle className="w-5 h-5" />,
}

export function WhenPatientsPushBack() {
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
      id="when-patients-push-back"
      title="When Patients Push Back"
      subtitle="Objections are symptoms, not attacks"
      accentColor="border-teal-500"
      icon={<ShieldAlert className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Objections Are Symptoms
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          When a patient says "I don't want surgery," a good doctor does not argue. They ask
          <em> why</em>. The fear might be about anesthesia. Or recovery time. Or cost. Or a bad
          experience with a previous procedure. The stated objection is rarely the root cause.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Buyer objections work the same way. "Your prices are too high" might mean "I don't
          see the value," or "I can't afford the volume you're suggesting," or "My current supplier
          quoted less." Each root cause requires a different response. Reacting to the surface
          objection without diagnosing the underlying issue is like treating a symptom without
          understanding the disease.
        </p>
      </div>

      {/* K.L.A.P.D.O.C. */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        K.L.A.P.D.O.C. — Structured Objection Handling
      </h3>
      <div className="space-y-3 mb-6">
        {klapdocSteps.map((step) => (
          <ExpandableCard
            key={step.id}
            title={`${step.letter} — ${step.title}`}
            subtitle={step.description.slice(0, 80) + '…'}
            icon={letterIcons[step.letter]}
            badge={<Badge text={step.letter} color="teal" />}
            isExpanded={expandedIds.has(step.id)}
            onToggle={() => toggle(step.id)}
            accentColor="border-teal-500"
          >
            <div className="space-y-3">
              <p className="text-sm text-via-text">{step.description}</p>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
                  In Practice
                </p>
                <p className="text-sm text-via-text italic">{step.example}</p>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </div>

      {/* Common objections table */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          Common Objections Quick Reference
        </h3>
        <div className="space-y-3">
          {commonObjections.map((obj) => (
            <div key={obj.id} className="bg-via-bg-subtle rounded-lg p-3">
              <p className="text-sm font-semibold text-via-navy mb-1">{obj.objection}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="font-semibold text-via-text-light uppercase tracking-wide mb-0.5">Root Issue</p>
                  <p className="text-via-text">{obj.rootIssue}</p>
                </div>
                <div>
                  <p className="font-semibold text-teal-600 uppercase tracking-wide mb-0.5">Key Probe</p>
                  <p className="text-via-text italic">{obj.keyProbe}</p>
                </div>
                <div>
                  <p className="font-semibold text-via-navy uppercase tracking-wide mb-0.5">Likely Overcome</p>
                  <p className="text-via-text">{obj.likelyOvercome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Worked examples */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          K.L.A.P.D.O.C. in Practice
        </h3>

        {/* Example 1 */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-via-navy mb-2">
            Example: "Your competitor offered a lower price"
          </p>
          <div className="space-y-2 text-sm text-via-text">
            <p><Badge text="K" color="teal" /> <strong>Keep Calm</strong> Don't get defensive or immediately discount.</p>
            <p><Badge text="L" color="teal" /> <strong>Listen</strong> Let them explain the full situation.</p>
            <p><Badge text="A" color="teal" /> <strong>Acknowledge</strong> — "That's fair, price matters, especially when you're comparing suppliers."</p>
            <p><Badge text="P" color="teal" /> <strong>Probe</strong> — "Can you tell me more about what they're offering? Is it the same condition, same retailer source, manifested?"</p>
            <p><Badge text="D" color="teal" /> <strong>Define</strong> — "So the issue is the per-pallet price is higher, but we're comparing different conditions and sourcing levels?"</p>
            <p><Badge text="O" color="teal" /> <strong>Overcome</strong> — "Here's the thing: our loads come directly from the retailer, no middleman. That means fresher inventory and more consistent quality. When you factor in the resale rate, the per-unit economics often come out ahead."</p>
            <p><Badge text="C" color="teal" /> <strong>Close</strong> — "Would it help if I pulled a manifest so you can compare item-for-item?"</p>
          </div>
        </div>

        {/* Example 2 */}
        <div>
          <p className="text-sm font-semibold text-via-navy mb-2">
            Example: "I've been burned before by quality"
          </p>
          <div className="space-y-2 text-sm text-via-text">
            <p><Badge text="K" color="teal" /> <strong>Keep Calm</strong> This is a trust issue, not an attack.</p>
            <p><Badge text="L" color="teal" /> <strong>Listen</strong> Let them tell the full story of what happened.</p>
            <p><Badge text="A" color="teal" /> <strong>Acknowledge</strong> — "I'm sorry that happened. Bad experiences with quality are frustrating, especially when you've invested money."</p>
            <p><Badge text="P" color="teal" /> <strong>Probe</strong> — "Was it the condition of the items, the mix of categories, or something else?"</p>
            <p><Badge text="D" color="teal" /> <strong>Define</strong> — "So the core issue was buying unmanifested loads and not knowing what you were getting until it arrived?"</p>
            <p><Badge text="O" color="teal" /> <strong>Overcome</strong> — "Our manifested programs list every item before you buy — brands, quantities, retail values. You can review the manifest and only purchase if it fits. Plus, you're welcome to visit the warehouse and see merchandise in person before committing."</p>
            <p><Badge text="C" color="teal" /> <strong>Close</strong> — "Would you like me to send you a sample manifest so you can see the level of detail?"</p>
          </div>
        </div>
      </div>

      {/* Industry knowledge as a tool */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Industry Knowledge Is Your Best Tool
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Many objections can be addressed simply by knowing the industry well. When a buyer says
          "there's too much of one item in this load," someone without industry knowledge might get
          stuck. But an expert can reframe the conversation:
        </p>
        <div className="bg-via-bg-subtle rounded-lg p-3 mb-4">
          <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
            Example
          </p>
          <p className="text-sm text-via-text italic">
            "There is a lot of that item, but the actual value of the load is in the other items.
            That concentrated item is a small percentage of the total load value. The margin on the
            rest more than makes up for it."
          </p>
        </div>
        <p className="text-sm text-via-text leading-relaxed">
          Similarly, when a load seems "more expensive" than what a buyer is used to, your knowledge
          of the supply chain matters. If we hold a direct contract with consistent product, that
          consistency has real value:{' '}
          <em>"Some people would pay a premium for having something as consistent as this.
          Especially in liquidation, where consistency is rare."</em>
        </p>
      </div>

      {/* Picking battles */}
      <div className="bg-teal-50 rounded-lg border border-teal-200 p-4 mb-6">
        <p className="text-sm text-teal-700 font-medium mb-1">Picking Your Battles</p>
        <p className="text-sm text-teal-700">
          Not every objection needs to be overcome in the moment. Some buyers genuinely need time
          to think. Some objections are valid and the honest answer is "you're right, this might
          not be the right fit right now." Knowing when <strong>not</strong> to push is just as
          important as knowing how to overcome. A doctor who insists on a treatment the patient
          is not ready for loses the patient entirely.
        </p>
      </div>

      {/* Inline exercise */}
      <ScenarioCard scenarios={objectionScenarios} title="Handle the Objection" />
    </SectionWrapper>
  )
}
