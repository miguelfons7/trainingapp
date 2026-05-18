import { useState } from 'react'
import { Store, Info } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { AdditionalResources } from '../shared/AdditionalResources'

export function SamsClubPrograms() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['sms']))

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
      id="sams-club-programs"
      title="Sam's Club Programs"
      subtitle="Manifested general merchandise at 20-35% of retail"
      accentColor="border-indigo-500"
      icon={<Store className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          About the Sam's Club Program
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Sam's Club (<strong>SMS</strong>) offers manifested general merchandise loads with a wide range of lot sizes — from small lots to larger purchases. Loads are priced at <strong>20-35% of retail value</strong>, making them accessible for a variety of buyer budgets.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Parent SKU: <strong>SMS</strong>. The program covers a broad assortment of general merchandise sourced from Sam's Club stores and distribution centers.
        </p>
        <div className="mt-4 rounded-lg overflow-hidden border border-via-border">
          <img src={`${import.meta.env.BASE_URL}images/program-sms.webp`} alt="Sam's Club liquidation loads" className="w-full h-48 object-cover" />
          <p className="text-xs text-via-text-light p-2 text-center">Sample Sam's Club load</p>
        </div>
      </div>

      {/* Program Card */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Sam's Club Program
      </h3>
      <div className="space-y-3 mb-6">
        <ExpandableCard
          title="SMS (Sam's Club)"
          subtitle="Manifested General Merchandise"
          icon={<Store className="w-5 h-5" />}
          badge={<Badge text="Manifested" color="emerald" />}
          isExpanded={expandedIds.has('sms')}
          onToggle={() => toggle('sms')}
          accentColor="border-indigo-500"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                Sam's Club <strong>generally clean customer return</strong> loads with full item-level manifests. Loads are predominantly customer returns but also include a percentage of New Overstock and Shelf Pull items. The program covers a broad assortment of general merchandise with lot sizes ranging from small to large, making it flexible for different buyer profiles.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Manifested — item-level detail available
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Priced at 20-35% of retail value
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Predominantly customer returns with % of New Overstock and Shelf Pull
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Viewable at facility — FOB Los Angeles
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Volume discounts available for multi-lot purchases
                </li>
              </ul>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Condition</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Generally Clean Customer Returns</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Pricing Model</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">20-35% of Retail</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Price Range</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">$33.76 – $6,700</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Los Angeles (viewable at facility)</p>
              </div>
            </div>

            {/* Products */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p>
              <p className="text-xs text-via-text-light leading-relaxed">
                Kitchen Electronics, Hardware, Mattresses, Electronics & Accessories, Outdoor Living, Furniture, Office Electronics, Home Improvement, Tools, Health & Beauty Aids, Gardening, Toys, Sporting Goods, Office Supplies, OTC, Apparel, and more
              </p>
            </div>

            {/* Brands */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Brands</p>
              <p className="text-xs text-via-text-light leading-relaxed">
                Ninja, Sony, Garmin, Beats, Samsung, Nintendo, Apple, Roku, Fitbit, LG, Martha Stewart, Frigidaire, iRobot, Disney, Samsonite, Dyson, Bissell, Shark, KitchenAid, Instant Pot, Oral B, and many more plus Private Label brands
              </p>
            </div>
          </div>
        </ExpandableCard>
      </div>

      {/* Volume Discount Callout */}
      <div className="bg-emerald-50 rounded-lg border border-emerald-300 p-4 mb-6 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-emerald-800 mb-1">
            Volume Discounts Available
          </p>
          <p className="text-sm text-emerald-700 leading-relaxed">
            Purchase <strong>3 Lots = 5% Discount</strong> | Purchase <strong>6 Lots = 8% Discount</strong>. Multi-lot buyers can significantly reduce their per-unit cost through these volume tiers.
          </p>
        </div>
      </div>

      <AdditionalResources
        resources={[
          {
            title: 'General Wholesale Liquidation Lots',
            url: 'https://www.viatrading.com/product-category/general-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available general merchandise liquidation loads on Via Trading\'s marketplace.',
          },
        ]}
      />
    </SectionWrapper>
  )
}
