import { useState } from 'react'
import {
  HandshakeIcon,
  ThermometerSun,
  ClipboardList,
  ArrowRightCircle,
  GitBranch,
  Clock,
  AlertTriangle,
  Stethoscope,
  Eye,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { closingTechniques, languageGuidance } from '../../data/modules/consultative-sales/consultativeData'

const iconMap: Record<string, React.ReactNode> = {
  ThermometerSun: <ThermometerSun className="w-5 h-5" />,
  ClipboardList: <ClipboardList className="w-5 h-5" />,
  ArrowRightCircle: <ArrowRightCircle className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5" />,
  Stethoscope: <Stethoscope className="w-5 h-5" />,
  Eye: <Eye className="w-5 h-5" />,
}

export function ArtOfTheClose() {
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
      id="art-of-the-close"
      title="The Art of the Close"
      subtitle="The follow-up appointment, not the final verdict"
      accentColor="border-teal-500"
      icon={<HandshakeIcon className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Closing Is a Natural Conclusion
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Think about it this way: a doctor who has thoroughly examined a patient, explained the
          diagnosis, and laid out the treatment plan does not need to "close" the patient on
          scheduling a follow-up. The patient <em>wants</em> the follow-up because they trust the
          doctor's expertise.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Closing in consultative sales works the same way. If Steps 1 through 4 were done well —
          you understood the buyer's business, made a targeted recommendation, explained how it
          works, and connected the benefits to their specific needs, the close should feel like
          the <strong>natural next step</strong>, not a high-pressure moment. If you find yourself
          straining to close, it usually means you did not do enough work in the earlier steps.
        </p>
      </div>

      {/* Six techniques */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Eight Closing Techniques
      </h3>
      <div className="space-y-3 mb-6">
        {closingTechniques.map((technique) => (
          <ExpandableCard
            key={technique.id}
            title={technique.name}
            subtitle={technique.whenToUse}
            icon={iconMap[technique.icon]}
            isExpanded={expandedIds.has(technique.id)}
            onToggle={() => toggle(technique.id)}
            accentColor="border-teal-500"
          >
            <div className="space-y-3">
              <p className="text-sm text-via-text">{technique.description}</p>
              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
                  Examples
                </p>
                <ul className="space-y-1">
                  {technique.examples.map((ex, i) => (
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

      {/* Choosing the right close */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          Choosing the Right Close
        </h3>
        <div className="space-y-3">
          <div className="bg-via-bg-subtle rounded-lg p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-semibold text-via-navy uppercase tracking-wide mb-0.5">Situation</p>
                <p className="text-via-text">Buyer seems interested but hasn't committed</p>
              </div>
              <div>
                <p className="font-semibold text-teal-600 uppercase tracking-wide mb-0.5">Try</p>
                <p className="text-via-text">Trial Close or Alternative Close</p>
              </div>
            </div>
          </div>
          <div className="bg-via-bg-subtle rounded-lg p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-semibold text-via-navy uppercase tracking-wide mb-0.5">Situation</p>
                <p className="text-via-text">Thorough discovery, clear needs identified</p>
              </div>
              <div>
                <p className="font-semibold text-teal-600 uppercase tracking-wide mb-0.5">Try</p>
                <p className="text-via-text">Summary Close</p>
              </div>
            </div>
          </div>
          <div className="bg-via-bg-subtle rounded-lg p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-semibold text-via-navy uppercase tracking-wide mb-0.5">Situation</p>
                <p className="text-via-text">Multiple positive signals, conversation flowing</p>
              </div>
              <div>
                <p className="font-semibold text-teal-600 uppercase tracking-wide mb-0.5">Try</p>
                <p className="text-via-text">Assumed Close</p>
              </div>
            </div>
          </div>
          <div className="bg-via-bg-subtle rounded-lg p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-semibold text-via-navy uppercase tracking-wide mb-0.5">Situation</p>
                <p className="text-via-text">Genuine time-limited inventory opportunity</p>
              </div>
              <div>
                <p className="font-semibold text-teal-600 uppercase tracking-wide mb-0.5">Try</p>
                <p className="text-via-text">Special Close</p>
              </div>
            </div>
          </div>
          <div className="bg-via-bg-subtle rounded-lg p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-semibold text-via-navy uppercase tracking-wide mb-0.5">Situation</p>
                <p className="text-via-text">Buyer described active pain point from inaction</p>
              </div>
              <div>
                <p className="font-semibold text-teal-600 uppercase tracking-wide mb-0.5">Try</p>
                <p className="text-via-text">Fear Close (sparingly)</p>
              </div>
            </div>
          </div>
          <div className="bg-via-bg-subtle rounded-lg p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-semibold text-via-navy uppercase tracking-wide mb-0.5">Situation</p>
                <p className="text-via-text">Thorough discovery, clear problem identified</p>
              </div>
              <div>
                <p className="font-semibold text-teal-600 uppercase tracking-wide mb-0.5">Try</p>
                <p className="text-via-text">Consultative Close</p>
              </div>
            </div>
          </div>
          <div className="bg-via-bg-subtle rounded-lg p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-semibold text-via-navy uppercase tracking-wide mb-0.5">Situation</p>
                <p className="text-via-text">Buyer seems interested but something is holding them back</p>
              </div>
              <div>
                <p className="font-semibold text-teal-600 uppercase tracking-wide mb-0.5">Try</p>
                <p className="text-via-text">Level With Me Close</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Value-based */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Value-Based, Not Price-Based
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          When you position yourself as an expert — someone who diagnoses needs and prescribes
          solutions — pricing discussions shift from "how cheap?" to "what value?" Buyers evaluate
          trusted advisors differently than they evaluate vendors. They weigh credibility, reliability,
          and the relationship alongside the price tag.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          This is why Via Trading maintains a <strong>90%+ repeat buyer rate</strong>. Buyers do
          not return year after year for the cheapest price. They return because they trust the
          Account Manager, the quality is consistent, and the experience is worth the investment.
        </p>
      </div>

      {/* Language matters */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          Language Matters
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Small word choices shape how buyers perceive you. The right language reinforces your
          position as a consultative partner. The wrong language makes you sound like everyone else.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-via-border">
                <th className="text-left py-2 pr-3 text-xs font-semibold text-emerald-600 uppercase">Say This</th>
                <th className="text-left py-2 pr-3 text-xs font-semibold text-red-500 uppercase">Not This</th>
                <th className="text-left py-2 text-xs font-semibold text-via-text-light uppercase">Why</th>
              </tr>
            </thead>
            <tbody>
              {languageGuidance.map((item, i) => (
                <tr key={i} className="border-b border-via-border/50">
                  <td className="py-2 pr-3 text-emerald-700">{item.doSay}</td>
                  <td className="py-2 pr-3 text-red-500">{item.dontSay}</td>
                  <td className="py-2 text-via-text">{item.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Universal rule */}
      <div className="bg-teal-50 rounded-lg border border-teal-200 p-4">
        <p className="text-sm text-teal-700 font-medium mb-1">The Universal Close Rule</p>
        <p className="text-sm text-teal-700">
          If the conversation was good, the close should feel natural. If you are straining to
          close, you probably did not do enough work in Steps 1 through 4. Go back to the
          diagnosis.
        </p>
      </div>
    </SectionWrapper>
  )
}
