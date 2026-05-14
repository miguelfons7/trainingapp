import { useState } from 'react'
import { Tags } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { TermMatch } from '../interactive/TermMatch'
import { productConditions } from '../../data/conditionsData'
import { conditionsTermMatch } from '../../data/modules/industry/inlineExercises'

export function ProductConditions() {
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
      id="product-conditions"
      title="Product Conditions"
      subtitle="Via Trading's condition categories for liquidation merchandise"
      accentColor="border-amber-600"
      icon={<Tags className="w-5 h-5" />}
    >
      {/* --- Introductory prose: why understanding conditions is essential --- */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Why Conditions Matter
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Understanding product conditions is one of the most important skills in the liquidation
          business. Condition directly determines pricing, expectations, and the amount of work
          required to resell. Consider the difference between a case of cosmetics that is
          factory-sealed and has never been opened, versus a product that has been out of the box
          and handled by consumers. Even if the retail value on paper looks similar, these are very
          different products with very different levels of risk and effort involved.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          The key thing to remember is that within any condition category, there is a range. Even
          factory-sealed goods can arrive with damaged boxes, cosmetic wear, or rust depending on
          how they were stored and transported. A single pallet of merchandise pulled from retail
          shelves might contain items in pristine condition alongside others with minor shelf wear
          or damaged packaging. No two loads are exactly alike, even when they carry the same
          condition label.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Whether you are working with a buyer, a vendor, a truck driver, or a bank, Via Trading's
          values of honesty, integrity, and transparency should carry through every interaction.
          Accurately describing product conditions so that people know what to expect before they
          commit is a big part of why Via Trading has built long-term relationships with repeat
          customers. In an industry where others sometimes over-promise and under-deliver, telling
          it like it is builds real trust.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {productConditions.map((condition) => (
          <ExpandableCard
            key={condition.id}
            title={condition.name}
            badge={<Badge text={condition.name} color={condition.colorClass} />}
            isExpanded={expandedIds.has(condition.id)}
            onToggle={() => toggle(condition.id)}
            accentColor="border-amber-500"
          >
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">Definition</p>
                <p>{condition.definition}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">What to Expect</p>
                <p>{condition.whatToExpect}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">Key Considerations</p>
                <p>{condition.buyerAppeal}</p>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </div>

      {/* Inline exercise */}
      <TermMatch pairs={conditionsTermMatch} title="Quick Check: Match the Conditions" />
    </SectionWrapper>
  )
}
