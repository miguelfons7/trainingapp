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

      <div className="space-y-3">
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
