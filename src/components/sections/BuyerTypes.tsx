import { useState } from 'react'
import {
  Users,
  Monitor,
  Store,
  Archive,
  Tent,
  Globe,
  Warehouse,
  Gavel,
  Rocket,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { buyerTypes, buyerTypesIntro } from '../../data/buyerTypesData'

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="w-5 h-5" />,
  Store: <Store className="w-5 h-5" />,
  Archive: <Archive className="w-5 h-5" />,
  Tent: <Tent className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Warehouse: <Warehouse className="w-5 h-5" />,
  Gavel: <Gavel className="w-5 h-5" />,
  Rocket: <Rocket className="w-5 h-5" />,
}

export function BuyerTypes() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <SectionWrapper
      id="buyer-types"
      title="Who Our Buyers Are"
      subtitle="8 buyer archetypes — each with distinct needs and decision drivers"
      accentColor="border-sky-500"
      icon={<Users className="w-5 h-5" />}
    >
      <p className="text-sm text-via-text mb-6">{buyerTypesIntro}</p>

      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Via Trading has served over <strong>42,000 customers</strong> across <strong>129+ countries</strong> — and no two buyers are exactly alike. Some are running multi-million dollar operations with warehouses and staff. Others are just getting started, working from their garage with a laptop and a dream. The one thing they all have in common? They're looking for quality merchandise at competitive prices from a supplier they can trust.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Understanding who you're talking to changes everything about the conversation. An <strong>exporter</strong> filling containers for Central America has very different needs than a <strong>bin store operator</strong> restocking weekly, or an <strong>online seller</strong> listing items one-by-one on eBay. The more you understand each buyer type, the better you can serve them — and at Via Trading, serving people well is what turns first-time buyers into lifelong customers.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {buyerTypes.map((buyer) => (
          <ExpandableCard
            key={buyer.id}
            title={buyer.name}
            subtitle={buyer.shortDescription}
            icon={iconMap[buyer.icon]}
            isExpanded={expandedId === buyer.id}
            onToggle={() =>
              setExpandedId(expandedId === buyer.id ? null : buyer.id)
            }
            accentColor="border-sky-500"
          >
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-2">
                  What They Care About
                </p>
                <ul className="space-y-1">
                  {buyer.whatTheyCareAbout.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-2">
                  How to Spot Them
                </p>
                <ul className="space-y-1">
                  {buyer.identifyingSignals.map((signal) => (
                    <li key={signal} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </div>

    </SectionWrapper>
  )
}
