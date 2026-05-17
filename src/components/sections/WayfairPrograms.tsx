import { useState } from 'react'
import { Sofa } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { AdditionalResources } from '../shared/AdditionalResources'

export function WayfairPrograms() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['wyf']))

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
      id="wayfair-programs"
      title="Wayfair Programs"
      subtitle="Manifested furniture and home goods loads"
      accentColor="border-violet-500"
      icon={<Sofa className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          About the Wayfair Program
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Wayfair is a leading online furniture and home goods retailer. Via Trading's Wayfair program (<strong>WYF</strong>) offers manifested loads priced as a percentage of retail, giving buyers full visibility into what they are purchasing.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Parent SKU: <strong>WYF</strong>. These loads cover a wide range of home furnishings, from furniture and rugs to lighting and outdoor pieces.
        </p>
      </div>

      {/* Program Card */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Wayfair Program
      </h3>
      <div className="space-y-3 mb-6">
        <ExpandableCard
          title="WYF (Wayfair)"
          subtitle="Manifested Furniture & Home Goods"
          icon={<Sofa className="w-5 h-5" />}
          badge={<Badge text="Manifested" color="emerald" />}
          isExpanded={expandedIds.has('wyf')}
          onToggle={() => toggle('wyf')}
          accentColor="border-violet-500"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                Wayfair customer return loads with full item-level manifests. The program covers furniture, home decor, and related categories, with a wide price range that supports buyers at different budget levels.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                  Manifested with full item-level detail
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                  Furniture-focused loads
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                  Wide price range supports different budgets
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                  Regular availability
                </li>
              </ul>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Condition</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Customer Returns</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Pricing Model</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">% of Retail</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Price Range</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">$439 – $16,600</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Various US Locations</p>
              </div>
            </div>

            {/* Products */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p>
              <p className="text-xs text-via-text-light leading-relaxed">
                Furniture, home decor, rugs, bedding, kitchen and bath, outdoor furniture, lighting
              </p>
            </div>
          </div>
        </ExpandableCard>
      </div>

      <AdditionalResources
        resources={[
          {
            title: 'Wayfair Wholesale Liquidation Lots',
            url: 'https://www.viatrading.com/product-category/wayfair-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available Wayfair liquidation loads on Via Trading\'s marketplace.',
          },
        ]}
      />
    </SectionWrapper>
  )
}
