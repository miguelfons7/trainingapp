import { useState } from 'react'
import { Store } from 'lucide-react'
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
                Sam's Club customer return loads with full item-level manifests. The program covers a broad assortment of general merchandise with lot sizes ranging from small to large, making it flexible for different buyer profiles.
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
                  Wide range of lot sizes from small to large
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
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
                <p className="text-sm font-semibold text-via-navy mt-0.5">20-35% of Retail</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Price Range</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">$33.76 – $6,700</p>
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
                General merchandise from Sam's Club stores and distribution centers
              </p>
            </div>
          </div>
        </ExpandableCard>
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
