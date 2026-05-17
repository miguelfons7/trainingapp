import { useState } from 'react'
import {
  Target,
  Package,
  Star,
  Warehouse,
  Truck,
  Shirt,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { FillInBlank } from '../interactive/FillInBlank'
import { AdditionalResources } from '../shared/AdditionalResources'
import { targetFillBlanks } from '../../data/modules/product-knowledge/inlineExercises'

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
      subtitle="Via Trading's flagship retail partner with multiple sub-programs"
      accentColor="border-red-500"
      icon={<Target className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Why Target Is the Flagship
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Target is Via Trading's most prominent retail partner. With <strong>several distinct sub-programs</strong>, Target provides a consistent and diverse supply of general merchandise, apparel, and specialty goods. The Target programs are among the most popular with buyers because of the quality of the merchandise and the strength of the Target brand.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Most Target programs ship FOB Los Angeles, CA. Program details, pricing tiers, and availability can change — the descriptions below reflect the current lineup at a high level.
        </p>
      </div>

      {/* Program Cards */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Target Sub-Programs
      </h3>
      <div className="space-y-3 mb-6">
        {/* Salvage */}
        <ExpandableCard
          title="TGT Salvage"
          subtitle="Customer Returns / Salvage Loads"
          icon={<Package className="w-5 h-5" />}
          badge={<Badge text="Unmanifested" color="amber" />}
          isExpanded={expandedIds.has('tgt-salvage')}
          onToggle={() => toggle('tgt-salvage')}
          accentColor="border-red-500"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                The main customer return loads from Target. TGT Salvage is widely regarded as one of the cleanest customer return loads in the liquidation industry — a significant percentage of the merchandise is actually shelf-pull (never sold, just removed from the shelf), meaning many items are brand-new and retail-ready.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Unmanifested — no item-level detail provided
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  General merchandise mix: electronics, toys, housewares, sporting goods, and more
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Multiple pricing tiers available to match different buyer budgets
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Loads can be viewed at Via Trading's warehouse before purchasing
                </li>
              </ul>
            </div>

            {/* Salvage Tiers */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-3">
                Pricing Tiers (examples)
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
          </div>
        </ExpandableCard>

        {/* DC Program */}
        <ExpandableCard
          title="TGT DC Program"
          subtitle="Distribution Center Loads"
          icon={<Warehouse className="w-5 h-5" />}
          badge={<Badge text="Unmanifested" color="amber" />}
          isExpanded={expandedIds.has('tgt-dc')}
          onToggle={() => toggle('tgt-dc')}
          accentColor="border-red-500"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                Sourced directly from Target Distribution Centers rather than retail stores. DC loads are sorted into several sub-programs — examples include TGTMix, RSGM, Apparel, and others — each reflecting a different product category or sorting methodology.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Merchandise sourced from DCs, not individual retail locations
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Sorted into sub-programs by category (e.g., TGTMix, RSGM, Apparel)
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Product mix and condition can vary by sub-program
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Unmanifested — no item-level detail provided
                </li>
              </ul>
            </div>
          </div>
        </ExpandableCard>

        {/* Premium */}
        <ExpandableCard
          title="TGT Premium"
          subtitle="Cherry-Picked Customer Returns by Target"
          icon={<Star className="w-5 h-5" />}
          badge={<Badge text="Manifested" color="emerald" />}
          isExpanded={expandedIds.has('tgt-premium')}
          onToggle={() => toggle('tgt-premium')}
          accentColor="border-red-500"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                Premium is a manifested program — buyers receive item-level detail for what they are purchasing. The items are cherry-picked from customer returns <strong>by Target itself</strong> (not by Via Trading), resulting in a higher-quality selection. Because of this curation and transparency, TGT Premium is sold at a higher rate than standard salvage loads.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <strong>Manifested</strong> — buyers get item-level detail before purchasing
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Items are cherry-picked by Target, not Via Trading
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Higher rate than standard salvage due to curated selection
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Ideal for buyers who want visibility into exactly what they are getting
                </li>
              </ul>
            </div>
          </div>
        </ExpandableCard>

        {/* Apparel */}
        <ExpandableCard
          title="TGT Apparel (TGTAPP)"
          subtitle="New Overstock Apparel"
          icon={<Shirt className="w-5 h-5" />}
          badge={<Badge text="Unmanifested" color="amber" />}
          isExpanded={expandedIds.has('tgt-apparel')}
          onToggle={() => toggle('tgt-apparel')}
          accentColor="border-red-500"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                TGT Apparel consists of <strong>New Overstock</strong> apparel from Target — these items were never purchased by consumers and are still in original condition. The loads include a mix of Kids, Women's, and Men's apparel across seasonal styles.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <strong>90%+ New Master Case</strong> — all items are new and retail-ready
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Available in 12-pallet loads, 26-pallet loads, ocean containers, or by pallet
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Primarily Target private labels with some national brands
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Average 5ft pallet height — viewable at warehouse
                </li>
              </ul>
            </div>
          </div>
        </ExpandableCard>

        {/* RAW */}
        <ExpandableCard
          title="TGT RAW"
          subtitle="Variable-Value Loads"
          icon={<Truck className="w-5 h-5" />}
          badge={<Badge text="Unmanifested" color="amber" />}
          isExpanded={expandedIds.has('tgt-raw')}
          onToggle={() => toggle('tgt-raw')}
          accentColor="border-red-500"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                TGT RAW loads are variable in value — the product mix and overall worth depend on what comes in each individual truck. Pricing reflects this variability and can fluctuate.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Value varies depending on the contents of each truck
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Variable pricing that reflects the load composition
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  Unmanifested — no item-level detail provided
                </li>
              </ul>
            </div>
          </div>
        </ExpandableCard>
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
