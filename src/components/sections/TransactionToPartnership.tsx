import { useState } from 'react'
import { Repeat, TrendingUp, Layers, RefreshCw } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { FillInBlank } from '../interactive/FillInBlank'
import { growthStrategies, dormantResponses } from '../../data/modules/consultative-sales/consultativeData'
import { accountGrowthFillBlanks } from '../../data/modules/consultative-sales/inlineExercises'

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  RefreshCw: <RefreshCw className="w-5 h-5" />,
}

export function TransactionToPartnership() {
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
      id="transaction-to-partnership"
      title="From Transaction to Partnership"
      subtitle="A good doctor doesn't disappear after one visit"
      accentColor="border-teal-500"
      icon={<Repeat className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          The Ongoing Relationship
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          A doctor who diagnoses a condition, prescribes treatment, and never follows up is not
          practicing good medicine. They check in. They adjust the treatment if needed. They
          monitor progress. The relationship continues beyond the initial appointment.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          The Account Manager relationship works the same way. The first sale is just the
          beginning. <strong>Growing accounts</strong>, <strong>re-engaging dormant buyers</strong>,
          and <strong>building lasting partnerships</strong> is where the real value lives — for
          both Via Trading and the buyer. This is what transforms a transaction into a partnership.
        </p>
      </div>

      {/* Growth strategies */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Three Strategies for Growing Accounts
      </h3>
      <div className="space-y-3 mb-6">
        {growthStrategies.map((strategy) => (
          <ExpandableCard
            key={strategy.id}
            title={strategy.title}
            subtitle={strategy.description.slice(0, 85) + '…'}
            icon={iconMap[strategy.icon]}
            isExpanded={expandedIds.has(strategy.id)}
            onToggle={() => toggle(strategy.id)}
            accentColor="border-teal-500"
          >
            <div className="space-y-3">
              <p className="text-sm text-via-text">{strategy.description}</p>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
                  Example Dialogue
                </p>
                <p className="text-sm text-via-text italic">{strategy.example}</p>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </div>

      {/* Re-engaging dormant accounts */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Re-Engaging Dormant Accounts
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Not every buyer who goes quiet is lost. Life gets busy. Suppliers change. Business
          priorities shift. A well-timed, well-crafted re-engagement call can bring back buyers
          who genuinely wanted to continue but just fell off.
        </p>
        <div className="bg-via-bg-subtle rounded-lg p-3 mb-4">
          <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
            Re-Engagement Opening
          </p>
          <p className="text-sm text-via-text italic">
            "Hi [Name], this is [Your Name] at Via Trading. I noticed we haven't worked together
            in a while and wanted to reconnect. Is there a reason we haven't done business again?"
          </p>
          <p className="text-sm text-via-text italic mt-2">
            "The purpose of this call is not to sell, but to understand how we might work together
            again. May I ask you a few questions?"
          </p>
        </div>

        <p className="text-sm font-semibold text-via-navy mb-2">Common Responses & How to Handle Them</p>
        <div className="space-y-2">
          {dormantResponses.map((response) => (
            <div key={response.id} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-via-navy">{response.buyerSays}</p>
                <p className="text-xs text-via-text-light mt-0.5">{response.approach}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Re-qualification tracks */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Re-Qualification by Business Type
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          When re-engaging, re-qualify with questions tailored to their business type. Their
          situation may have changed since they last purchased.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-via-bg-subtle rounded-lg p-3">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1">Retail Track</p>
            <p className="text-xs text-via-text">Store count, foot traffic, current inventory sources, restock frequency, what categories move best.</p>
          </div>
          <div className="bg-via-bg-subtle rounded-lg p-3">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1">Wholesale Track</p>
            <p className="text-xs text-via-text">Buyer network size, categories in demand, volume needs, warehouse capacity, shipping preferences.</p>
          </div>
          <div className="bg-via-bg-subtle rounded-lg p-3">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1">International Track</p>
            <p className="text-xs text-via-text">Destination countries, container size, freight arrangement, FOB preferences, customs considerations.</p>
          </div>
        </div>
      </div>

      {/* Relationship philosophy */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Proactive, Not Reactive
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Good Account Managers do not wait for the buyer to call. They reach out proactively with
          relevant opportunities, check in on how the last order performed, and ask about upcoming
          needs. This is the difference between a partner and a vendor.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          When you know a buyer's business well enough to send them a message like "We just got
          in a load that's exactly what you described last month — want me to hold it for you?" —
          that is the consultative relationship at its best. It is also why Via Trading's{' '}
          <strong>90%+ repeat buyer rate</strong> is not an accident. It is the result of
          thousands of Account Managers investing in relationships, not just transactions.
        </p>
      </div>

      {/* Callout */}
      <div className="bg-teal-50 rounded-lg border border-teal-200 p-4 mb-6">
        <p className="text-sm text-teal-700 font-medium mb-1">The Long Game</p>
        <p className="text-sm text-teal-700">
          The buyer who starts with one pallet today might be ordering truckloads in six months.
          The exporter who is "just exploring" might become a recurring container buyer. Every
          relationship starts somewhere. How you treat the first conversation determines whether
          there is a second one.
        </p>
      </div>

      {/* Inline exercise */}
      <FillInBlank items={accountGrowthFillBlanks} title="Quick Check: Account Growth" />
    </SectionWrapper>
  )
}
