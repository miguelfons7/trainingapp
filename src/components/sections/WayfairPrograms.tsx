import { useState } from 'react'
import { Sofa, Layers } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { AdditionalResources } from '../shared/AdditionalResources'

const loadTypes = [
  {
    title: 'Liquidation Returns — Small Items',
    description: '350+ units per load: nightstands, ceiling fans, lamps, rugs, tiles, wall art, curtains, outdoor décor, pet furniture, bar stools.',
  },
  {
    title: 'Liquidation Returns — Large Items',
    description: '40+ large items per load: sofas, dining tables, vanities, beds, patio sets, TV stands.',
  },
  {
    title: 'Imperfection — Shelf Pull',
    description: 'Like-new items with minor cosmetic flaws. Fully functional. Great margins for buyers who can overlook small imperfections.',
  },
  {
    title: 'Excess & Clearance Inventory',
    description: 'Shelf-pulls and new items from discontinued or seasonal product lines. No customer return wear.',
  },
]

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
          Wayfair is a leading online furniture and home goods retailer. Via Trading's Wayfair program (<strong>WYF</strong>) offers manifested loads priced at a <strong>flat percentage of retail</strong>, giving buyers full visibility into what they are purchasing. Manifests are available within <strong>48 hours</strong>. Inventory is available on a <strong>consistent weekly</strong> basis.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Parent SKU: <strong>WYF</strong>. Multiple FOB locations: <strong>California, Florida, Illinois, Maryland, and Texas</strong>. These loads cover a wide range of home furnishings across four distinct load types, from small home d&eacute;cor items to large furniture pieces.
        </p>
        <div className="mt-4 rounded-lg overflow-hidden border border-via-border">
          <img src={`${import.meta.env.BASE_URL}images/program-wyf.webp`} alt="Wayfair furniture and home goods liquidation" className="w-full h-48 object-cover" />
          <p className="text-xs text-via-text-light p-2 text-center">Sample Wayfair load</p>
        </div>
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
                Wayfair loads come with full item-level manifests available within 48 hours. The program covers furniture, home d&eacute;cor, and related categories across four distinct load types — from small-item returns (350+ units) to large furniture returns (40+ items), plus shelf-pull imperfections and excess/clearance inventory.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                  Manifested with full item-level detail (available within 48 hours)
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                  Consistent weekly inventory availability
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                  4 distinct load types: Returns (Small &amp; Large), Imperfection Shelf Pull, and Excess &amp; Clearance
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                  Priced at a flat % of retail
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                  Multiple FOB locations across 5 states
                </li>
              </ul>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Condition</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Returns, Shelf Pull, Excess &amp; Clearance</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Pricing Model</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Flat % of Retail</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Retail Value</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">$55K – $95K per load</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">CA, FL, IL, MD, TX</p>
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

      {/* Load Types */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-via-navy" />
          <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide">
            Wayfair Load Types
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {loadTypes.map((lt) => (
            <div key={lt.title} className="bg-via-bg-subtle rounded-lg p-3">
              <p className="text-sm font-semibold text-via-navy mb-1">{lt.title}</p>
              <p className="text-xs text-via-text-light">{lt.description}</p>
            </div>
          ))}
        </div>
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
