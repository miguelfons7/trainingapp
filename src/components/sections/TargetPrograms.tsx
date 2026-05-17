import { useState } from 'react'
import {
  Target,
  Package,
  Shirt,
  Star,
  Warehouse,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { FillInBlank } from '../interactive/FillInBlank'
import { AdditionalResources } from '../shared/AdditionalResources'
import { programsByPartner } from '../../data/modules/product-knowledge/programsData'
import { targetFillBlanks } from '../../data/modules/product-knowledge/inlineExercises'

const targetPrograms = programsByPartner.target

const programIcons: Record<string, React.ReactNode> = {
  'tgt-salvage': <Package className="w-5 h-5" />,
  'tgt-apparel': <Shirt className="w-5 h-5" />,
  'tgt-premium': <Star className="w-5 h-5" />,
  'tgt-dc': <Warehouse className="w-5 h-5" />,
}

const salvageTiers = [
  { name: 'Value', price: '$10,990', description: 'Entry-level tier with a broad mix of general merchandise. Great starting point for newer buyers.' },
  { name: 'Prime', price: '$12,990', description: 'Higher concentration of retail-ready goods. Better product mix than Value.' },
  { name: 'Max', price: '$23,990', description: 'Premium consolidation with the best product density and highest retail value per load.' },
  { name: 'Ocean Container', price: '$18,490', description: 'Floor-loaded into ocean containers for international export. Popular with overseas buyers.' },
]

export function TargetPrograms() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['tgt-salvage']))

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
      id="target-programs"
      title="Target Programs"
      subtitle="Via Trading's flagship retail partner with 4 dedicated programs"
      accentColor="border-red-500"
      icon={<Target className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Why Target Is the Flagship
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Target is Via Trading's most prominent retail partner. With <strong>four distinct programs</strong>, Target provides a consistent and diverse supply of general merchandise, apparel, and specialty goods. The Target programs are among the most popular with buyers because of the quality of the merchandise and the strength of the Target brand.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          All Target programs ship FOB Los Angeles, CA and are unmanifested. Buyers can view loads at Via Trading's warehouse before purchasing.
        </p>
      </div>

      {/* Program Cards */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        The 4 Target Programs
      </h3>
      <div className="space-y-3 mb-6">
        {targetPrograms.map((program) => (
          <ExpandableCard
            key={program.id}
            title={program.name}
            subtitle={program.condition}
            icon={programIcons[program.id]}
            badge={
              <Badge
                text={program.type}
                color={program.type === 'Manifested' ? 'emerald' : 'amber'}
              />
            }
            isExpanded={expandedIds.has(program.id)}
            onToggle={() => toggle(program.id)}
            accentColor="border-red-500"
          >
            <div className="space-y-4">
              {/* Key Features */}
              <div>
                <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
                <ul className="space-y-1.5">
                  {program.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-via-text">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-via-bg-subtle rounded-lg p-3">
                  <p className="text-xs text-via-text-light uppercase tracking-wide">Price Range</p>
                  <p className="text-sm font-semibold text-via-navy mt-0.5">{program.priceRange}</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3">
                  <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
                  <p className="text-sm font-semibold text-via-navy mt-0.5">{program.fob}</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3">
                  <p className="text-xs text-via-text-light uppercase tracking-wide">Category</p>
                  <p className="text-sm font-semibold text-via-navy mt-0.5">{program.category}</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3">
                  <p className="text-xs text-via-text-light uppercase tracking-wide">Pricing Model</p>
                  <p className="text-sm font-semibold text-via-navy mt-0.5">{program.pricingModel}</p>
                </div>
              </div>

              {/* Products & Brands */}
              <div>
                <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p>
                <p className="text-xs text-via-text-light leading-relaxed">{program.products}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Brands</p>
                <p className="text-xs text-via-text-light leading-relaxed">{program.brands}</p>
              </div>

              {/* Salvage Tiers (only for TGT Salvage) */}
              {program.id === 'tgt-salvage' && (
                <div>
                  <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-3">
                    The 4 Salvage Tiers
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {salvageTiers.map((tier) => (
                      <div key={tier.name} className="bg-via-bg-subtle rounded-lg p-3 border border-via-border">
                        <div className="flex items-baseline justify-between mb-1">
                          <p className="text-sm font-semibold text-via-navy">{tier.name}</p>
                          <p className="text-sm font-bold text-via-orange">{tier.price}</p>
                        </div>
                        <p className="text-xs text-via-text-light">{tier.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ExpandableCard>
        ))}
      </div>

      {/* Highlight callout */}
      <div className="bg-via-orange/10 rounded-lg border border-via-orange/30 p-4 mb-6">
        <p className="text-sm text-orange-700 font-medium mb-1">Did You Know?</p>
        <p className="text-sm text-orange-700">
          TGT Salvage is widely considered one of the cleanest customer return loads in the liquidation industry. A significant percentage of the merchandise is actually shelf-pull (never sold, just removed from the shelf), which means many items are brand-new and retail-ready.
        </p>
      </div>

      {/* Inline Exercise */}
      <FillInBlank items={targetFillBlanks} title="Quick Check: Target Programs" />

      <AdditionalResources
        resources={[
          {
            title: 'Target Wholesale Liquidation Lots',
            url: 'https://www.viatrading.com/product-category/target-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available Target liquidation loads on Via Trading\'s marketplace.',
          },
          {
            title: 'What Is Target Salvage Liquidation?',
            url: 'https://www.viatrading.com/blog/target-salvage-liquidation/',
            source: 'Via Trading Blog',
            description: 'A detailed breakdown of the Target Salvage program and what buyers can expect.',
          },
        ]}
      />
    </SectionWrapper>
  )
}
