import { useState } from 'react'
import { Footprints, Info } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { AdditionalResources } from '../shared/AdditionalResources'

export function ZapposPrograms() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['zap']))

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
      id="zappos-programs"
      title="Zappos Programs"
      subtitle="Manifested footwear loads processed through WeSolveReturns"
      accentColor="border-teal-500"
      icon={<Footprints className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          About the Zappos Program
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Zappos is known for its generous return policy, creating a consistent stream of quality customer returns. Via Trading's Zappos program is unique — it's part of <strong>WeSolveReturns (WSR)</strong>, processing returns for brands without their own infrastructure.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Parent SKU: <strong>ZAP</strong>. Manifested footwear and apparel loads priced as a percentage of retail value.
        </p>
      </div>

      {/* Program Card */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Zappos Program
      </h3>
      <div className="space-y-3 mb-6">
        <ExpandableCard
          title="Zappos (ZAP)"
          subtitle="Manifested Footwear & Apparel"
          icon={<Footprints className="w-5 h-5" />}
          badge={<Badge text="Manifested" color="emerald" />}
          isExpanded={expandedIds.has('zap')}
          onToggle={() => toggle('zap')}
          accentColor="border-teal-500"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                Zappos customer return loads with full item-level manifests. The program is primarily footwear-focused, with a wide range of lot sizes available to accommodate buyers at different scales.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  Manifested — item-level detail available
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  Footwear-focused program
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  Wide range of lot sizes
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
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
                <p className="text-sm font-semibold text-via-navy mt-0.5">$1,100 – $127,000</p>
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
                Shoes, footwear, and apparel
              </p>
            </div>
          </div>
        </ExpandableCard>
      </div>

      {/* WSR Callout */}
      <div className="bg-sky-50 rounded-lg border border-sky-300 p-4 mb-6 flex items-start gap-3">
        <Info className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-sky-800 mb-1">
            WeSolveReturns (WSR) Connection
          </p>
          <p className="text-sm text-sky-700 leading-relaxed">
            Zappos is part of Via Trading's <strong>WeSolveReturns (WSR)</strong> program. WSR acts as a return center for brands that don't have their own returns infrastructure. This means the Zappos relationship is managed through WSR, not as a direct retail partnership. This is a key distinction worth understanding — WSR enables Via Trading to work with brands that wouldn't otherwise have a liquidation channel.
          </p>
        </div>
      </div>

      <AdditionalResources
        resources={[
          {
            title: 'Brand Name Shoes Wholesale Liquidation',
            url: 'https://www.viatrading.com/product-category/brand-name-shoes-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available brand name shoe liquidation loads on Via Trading\'s marketplace.',
          },
        ]}
      />
    </SectionWrapper>
  )
}
