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
