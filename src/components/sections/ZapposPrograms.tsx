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
        <div className="mt-4 rounded-lg overflow-hidden border border-via-border">
          <img src={`${import.meta.env.BASE_URL}images/program-zap.webp`} alt="Zappos brand name shoes on pallets" className="w-full aspect-video object-contain bg-[#e8eaee]" />
          <p className="text-xs text-via-text-light p-2 text-center">Sample Zappos footwear pallet</p>
        </div>
      </div>

      {/* Program Card */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Zappos Program
      </h3>
      <div className="space-y-3 mb-6">
        <ExpandableCard
          title="ZAP-SHOEPAL (Zappos)"
          subtitle="Shelf-Pull Footwear Pallets"
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
                Zappos shelf-pull footwear pallets with full item-level manifests. Each pallet includes <strong>100 pairs</strong> at <strong>$17.49 per pair</strong>. Shelf-pull condition means items were exposed for sale but then removed from shelves — generally very clean merchandise.
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
                  <strong>$17.49 per pair</strong> — 100 pairs per pallet
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  Shelf-pull condition — generally very clean
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  Wide range of lot sizes and regular availability
                </li>
              </ul>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Condition</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Shelf Pull</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Pricing</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">$17.49/pair</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Pairs per Pallet</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">100 pairs</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Various US Locations</p>
              </div>
            </div>

            {/* Brands */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Brands</p>
              <p className="text-xs text-via-text-light leading-relaxed">
                Naturalizer, Sam Edelman, Steve Madden, Jordan (Nike), Nine West, Madewell, Columbia, Cole Haan, GUESS, Clarks, Dolce Vita, Calvin Klein, Aerosoles, ALDO, The North Face, Rockport, Michael Kors, Nike Golf, Sperry, KEEN, Stuart Weitzman, Vince Camuto, COACH, Nike, adidas, Lucky Brand, Ted Baker, and more
              </p>
            </div>

            {/* Styles */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Styles</p>
              <p className="text-xs text-via-text-light leading-relaxed">
                Closed-toe heels, open-toe heels, flats, casual sandals, dress sandals, slides, slip-ons, casual sneakers, loafers, mules, wedges, platform shoes, espadrilles, ankle strap sandals, comfort footwear, golf shoes, boots
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
