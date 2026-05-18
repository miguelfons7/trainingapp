import { useState } from 'react'
import { Ear, Pause, PenLine, ThumbsUp, EyeOff, ListChecks } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { InlineImage } from '../shared/InlineImage'
import { ExpandableCard } from '../shared/ExpandableCard'
import { ScenarioCard } from '../interactive/ScenarioCard'
import { activeListeningRules } from '../../data/modules/consultative-sales/consultativeData'
import { listeningScenarios } from '../../data/modules/consultative-sales/inlineExercises'

const iconMap: Record<string, React.ReactNode> = {
  Pause: <Pause className="w-5 h-5" />,
  PenLine: <PenLine className="w-5 h-5" />,
  ThumbsUp: <ThumbsUp className="w-5 h-5" />,
  EyeOff: <EyeOff className="w-5 h-5" />,
  ListChecks: <ListChecks className="w-5 h-5" />,
}

export function ListeningBeyondWords() {
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
      id="listening-beyond-words"
      title="Listening Beyond Words"
      subtitle="Two ears, one mouth. Use them in that ratio."
      accentColor="border-teal-500"
      icon={<Ear className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6 overflow-hidden">
        <InlineImage src="inline-notetaking.jpg" alt="Taking notes during a conversation" float="right" size="small" caption="Two ears, one mouth" />
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          The Other Half of the Equation
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Questions are half the equation. The other half is hearing what the buyer says, and
          what they <em>do not</em> say. A doctor who asks the right questions but ignores the
          answers is not diagnosing anything. They are going through the motions.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Active listening is not passive. It is not just waiting for your turn to talk. It is
          an intentional, focused practice of absorbing information, reading signals, and
          demonstrating to the buyer that their words actually matter to you. When done well,
          it transforms a transactional call into a <strong>genuine conversation</strong>.
        </p>
      </div>

      {/* Five rules */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        The Five Rules of Active Listening
      </h3>
      <div className="space-y-3 mb-6">
        {activeListeningRules.map((rule) => (
          <ExpandableCard
            key={rule.id}
            title={rule.rule}
            subtitle={rule.description.slice(0, 120) + '…'}
            icon={iconMap[rule.icon]}
            isExpanded={expandedIds.has(rule.id)}
            onToggle={() => toggle(rule.id)}
            accentColor="border-teal-500"
          >
            <div className="space-y-3">
              <p className="text-sm text-via-text">{rule.description}</p>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
                  In Practice
                </p>
                <p className="text-sm text-via-text italic">{rule.example}</p>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </div>

      {/* Reading the gaps */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Reading the Gaps
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          What a buyer <em>does not</em> say is often more revealing than what they share. Gaps
          and avoidance are diagnostic signals, just like the symptoms a patient does not report.
          Here are patterns to watch for:
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
            <div>
              <p className="text-sm text-via-text">
                <strong>Never mentions profitability:</strong> They may be growing in volume but
                struggling with margins. A gentle probe: "How are your margins holding up as you scale?"
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
            <div>
              <p className="text-sm text-via-text">
                <strong>Keeps redirecting to price:</strong> Margins are tight, and every dollar
                matters. Instead of getting frustrated, acknowledge it and ask: "What per-unit cost
                do you need to hit for your numbers to work?"
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
            <div>
              <p className="text-sm text-via-text">
                <strong>Hesitant about volume:</strong> Cash flow may be a constraint. Do not push
                larger orders. Instead, explore what volume feels comfortable and build from there.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
            <div>
              <p className="text-sm text-via-text">
                <strong>Avoids talking about their current supplier:</strong> They may be locked
                in an uncomfortable arrangement or comparing you without wanting to show their hand.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Matching energy */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Matching Energy, Not Mirroring
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Every buyer brings a different energy to the conversation. Some are enthusiastic and
          chatty. Others are guarded and direct. Some are stressed. Some are skeptical. Your job
          is to <strong>match their energy</strong>, not mirror it mechanically.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          If someone is reserved and direct, be concise. Do not force small talk. If someone is
          excited about their new business, share that enthusiasm. If someone sounds frustrated,
          lead with empathy before jumping to solutions. The tone principles are simple:
          welcoming, professional, low-pressure, natural, and confident. How you balance them
          depends on the person in front of you.
        </p>
      </div>

      {/* Considering perspectives */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Considering Other Perspectives
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Before any conversation, especially a difficult one, take a moment to consider why a
          reasonable person might behave the way this buyer is behaving. This is not about making
          excuses. It is about <strong>understanding context</strong>.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          A buyer who seems "difficult" may have been burned by a previous liquidation supplier.
          A buyer who is "price-obsessed" may have thin margins and genuinely cannot afford to
          overpay. A buyer who is "hard to reach" may be running a one-person operation and
          literally does not have time to answer the phone.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          When you approach a conversation having already considered the buyer's perspective, you
          listen differently. You hear context, not just words. You respond to the <em>person</em>,
          not just the objection. And that changes everything.
        </p>
      </div>

      {/* Inline exercise */}
      <ScenarioCard scenarios={listeningScenarios} title="Reading Between the Lines" />
    </SectionWrapper>
  )
}
