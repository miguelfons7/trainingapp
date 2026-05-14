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
  Heart,
  Building2,
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
  Heart: <Heart className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  Rocket: <Rocket className="w-5 h-5" />,
}

export function BuyerTypes() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <SectionWrapper
      id="buyer-types"
      title="Who Buys Liquidation Goods?"
      subtitle="A wide range of businesses and individuals participate in the secondary market"
      accentColor="border-sky-500"
      icon={<Users className="w-5 h-5" />}
    >
      <p className="text-sm text-via-text mb-6">{buyerTypesIntro}</p>

      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Via Trading has served over <strong>42,000 customers</strong> across <strong>129+ countries</strong>. There is no single buyer profile. The types shown below are the most common, but many business owners use combinations of these approaches or something entirely different. A flea market vendor might also sell online. An exporter might run a discount store in another country.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Liquidation is becoming more mainstream every year. Even large established retailers like <strong>Staples</strong> are starting to add bin store sections to their stores, recognizing the value in the secondary market. The industry continues to grow as more businesses discover the opportunity.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          At Via Trading, our philosophy is simple: <strong>there is no reason we should not be able to work with anyone</strong>. Whether someone is buying a single pallet or filling containers every week, we are here to help them succeed.
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

      <div className="bg-via-navy/5 rounded-xl border border-via-navy/10 p-6">
        <p className="text-sm font-medium text-via-navy mb-2">Keep in Mind</p>
        <p className="text-sm text-via-text leading-relaxed">
          The categories above represent the most common types of businesses we work with, but they are far from exhaustive. Many buyers operate across multiple categories simultaneously. An online seller might also run a booth at a local flea market. A discount store owner might export to family overseas. The liquidation industry attracts creative, entrepreneurial people who find unique ways to build their businesses. At Via Trading, we are here to support all of them.
        </p>
      </div>

    </SectionWrapper>
  )
}
