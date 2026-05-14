import { useState } from 'react'
import { Tags } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { TermMatch } from '../interactive/TermMatch'
import { productConditions, conditionsIntro } from '../../data/conditionsData'
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
      subtitle="The 8 official condition categories for liquidation merchandise"
      accentColor="border-amber-600"
      icon={<Tags className="w-5 h-5" />}
    >
      <p className="text-sm text-via-text mb-6">{conditionsIntro}</p>

      {/* --- Introductory prose: why understanding conditions is essential --- */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Why Conditions Matter
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Understanding product conditions is one of the most important skills in the liquidation
          business. Condition directly determines pricing, buyer expectations, and the amount of
          work required to resell. A <strong>Master Case</strong> of cosmetics is a very different
          product from a pallet of <strong>Customer Returns</strong> electronics — even if the
          retail value on paper looks similar. Buyers who understand what each condition really
          means can set accurate expectations for their own customers and avoid costly surprises.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Approximately 80% of Via Trading's inventory consists of{' '}
          <strong>Customer Returns</strong>, though the mix changes daily depending on what arrives
          from our retailer partners. The key thing to remember: within any condition category,
          there's a range. Not all returns are the same — some pallets will have items that are
          still sealed in original packaging, while others may include items that were used briefly
          and returned. A single pallet of <strong>Shelf Pulls</strong> might contain items in
          pristine condition alongside others with minor shelf wear or damaged packaging.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Via Trading is committed to <strong>transparency</strong> — we accurately describe
          product conditions so buyers know what to expect before they commit. This honesty is a
          big part of why over 90% of our business comes from repeat customers. When you're on a
          sales call, lean into that trust factor. Buyers in this industry have been burned before
          by sellers who over-promise and under-deliver. The fact that we tell it like it is
          isn't just ethical — it's a competitive advantage.
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
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">Buyer Appeal</p>
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
