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
      subtitle="Manifested shoes, clothing, and accessories from Zappos"
      accentColor="border-teal-500"
      icon={<Footprints className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          About the Zappos Program
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Zappos is known for its generous return policy, creating a consistent stream of quality merchandise. Via Trading's Zappos program offers <strong>shoes, clothing, and accessories</strong> in two condition types: <strong>Shelf Pulls</strong> and <strong>Customer Returns</strong>. The program is part of <strong>WeSolveReturns (WSR)</strong>, which processes returns for brands without their own infrastructure.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Load Code: <strong>LOAD-ZAP</strong>. Fully manifested loads priced at 13.5% of retail value.
        </p>
        <div className="mt-4 rounded-lg overflow-hidden border border-via-border">
          <img src={`${import.meta.env.BASE_URL}images/program-zap.webp`} alt="Zappos brand name shoes on pallets" className="w-full aspect-video object-contain bg-[#e8eaee]" />
          <p className="text-xs text-via-text-light p-2 text-center">Sample Zappos pallet</p>
        </div>
      </div>

      {/* Program Card */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Zappos Program
      </h3>
      <div className="space-y-3 mb-6">
        <ExpandableCard
          title="ZAP (Zappos)"
          subtitle="Shoes, Clothing & Accessories"
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
                Zappos manifested loads covering shoes, clothing, and accessories. Available in two condition types: <strong>Shelf Pulls</strong> (items pulled from retail shelves before being sold, usually new and in good condition) and <strong>Customer Returns</strong> (previously purchased and returned items, ranging from like-new to lightly used). Priced at <strong>13.5% of retail value</strong>.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  Manifested with item-level detail
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  Priced at <strong>13.5% of retail value</strong>
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  Two condition types: Shelf Pulls (excellent condition) and Customer Returns (mixed condition)
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  Includes shoes, clothing, handbags, backpacks, and accessories
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  FOB: CA-Los Angeles and KY (Kentucky)
                </li>
              </ul>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Condition</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Shelf Pulls & Customer Returns</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Pricing</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">13.5% of Retail</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Categories</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Shoes, Clothing, Accessories</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">CA & KY</p>
              </div>
            </div>

            {/* Brands */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Brands</p>
              <p className="text-xs text-via-text-light leading-relaxed">
                Adidas, ASICS, Calvin Klein, Clarks, Cole Haan, Columbia, Converse, Crocs, ECCO, Free People, GUESS, Hey Dude, Hoka, Jordan, Kate Spade, Levi's, Michael Kors, New Balance, Nike, PUMA, Sam Edelman, Skechers, Steve Madden, Stuart Weitzman, Ted Baker, The North Face, Timberland, Tommy Hilfiger, TOMS, UGG, Under Armour, Vans, and more
              </p>
            </div>

            {/* Products */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p>
              <p className="text-xs text-via-text-light leading-relaxed">
                Shoes (heels, sandals, sneakers, boots, flats, wedges), handbags, backpacks, shirts, pants, shorts, and more
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
            Zappos is part of Via Trading's <strong>WeSolveReturns (WSR)</strong> program. WSR acts as a return center for brands that don't have their own returns infrastructure. This means the Zappos relationship is managed through WSR, not as a direct retail partnership. WSR enables Via Trading to work with brands that wouldn't otherwise have a liquidation channel.
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
