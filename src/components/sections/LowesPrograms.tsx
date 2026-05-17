import { useState } from 'react'
import { Wrench } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { AdditionalResources } from '../shared/AdditionalResources'

const fobLocations = [
  { state: 'CA', price: '$4,950' },
  { state: 'OR', price: '$4,950' },
  { state: 'WY', price: '$4,950' },
  { state: 'NC', price: '$4,850' },
]

export function LowesPrograms() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['lws']))

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
      id="lowes-programs"
      title="Lowes Programs"
      subtitle="Home improvement customer returns with multiple FOB locations"
      accentColor="border-emerald-600"
      icon={<Wrench className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          About the Lowes Program
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Lowes (<strong>LWS</strong>) provides home improvement customer return loads. This is a <strong>regular ongoing program</strong> that is always available. Multiple FOB locations offer geographic flexibility for buyers across the country.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Parent SKU: <strong>LWS</strong> (with variants XLWSWY, XLWSCA, XLWSOR, XLWSNCG, XLWSNCS). Loads are sold in virgin state, as-received from the retailer.
        </p>
      </div>

      {/* Program Card */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Lowes Program
      </h3>
      <div className="space-y-3 mb-6">
        <ExpandableCard
          title="LWS (Lowes)"
          subtitle="Home Improvement Customer Returns"
          icon={<Wrench className="w-5 h-5" />}
          badge={<Badge text="Unmanifested" color="amber" />}
          isExpanded={expandedIds.has('lws')}
          onToggle={() => toggle('lws')}
          accentColor="border-emerald-600"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                Lowes customer return loads sold in virgin state — as-received from the retailer. Each load contains 22-26 pallets of home improvement merchandise across a wide range of product categories.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  Regular ongoing program — always available
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  Multiple FOB locations (CA, OR, WY, NC)
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  Can be floor-loaded into ocean containers for export
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  Viewable at LA facility
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  Consolidation options available
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  Much larger selection at facility vs online
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
                <p className="text-sm font-semibold text-via-navy mt-0.5">Flat Price per Load</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Price Range</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">$4,850 – $4,950</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Pallets per Load</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">22-26 pallets</p>
              </div>
            </div>

            {/* Products */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p>
              <p className="text-xs text-via-text-light leading-relaxed">
                Fans, Toilets, Bins, Patio Furniture, Ceiling Fans, Wet/Dry Vac, Lighting, Vanities, Refrigerators, Tool Cabinets, Leaf Blowers, Flooring, Shelving, Ladders, Paint Sprayers, Air Conditioners, Sinks, Faucets, Microwaves, and more
              </p>
            </div>

            {/* Brands */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Brands</p>
              <p className="text-xs text-via-text-light leading-relaxed">
                American Standard, Kobalt, Craftsman, DeWalt, Honeywell, Ego Power, Kichler, Harbor Breeze, Allen + Roth
              </p>
            </div>
          </div>
        </ExpandableCard>
      </div>

      {/* FOB Location Grid */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
          FOB Locations & Pricing
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {fobLocations.map((loc) => (
            <div key={loc.state} className="bg-via-bg-subtle rounded-lg p-4 border border-via-border">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-semibold text-via-navy">{loc.state}</p>
                <p className="text-sm font-bold text-via-orange">{loc.price}</p>
              </div>
              <p className="text-xs text-via-text-light mt-1">Per load</p>
            </div>
          ))}
        </div>
      </div>

      <AdditionalResources
        resources={[
          {
            title: 'Home Improvement Wholesale Liquidation Lots',
            url: 'https://www.viatrading.com/product-category/home-depot-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available home improvement liquidation loads on Via Trading\'s marketplace.',
          },
        ]}
      />
    </SectionWrapper>
  )
}
