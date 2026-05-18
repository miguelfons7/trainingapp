import { useState } from 'react'
import { ShoppingCart, Shirt, Globe, Package } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { FillInBlank } from '../interactive/FillInBlank'
import { AdditionalResources } from '../shared/AdditionalResources'
import { walmartFillBlanks } from '../../data/modules/product-knowledge/inlineExercises'

export function WalmartPrograms() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['wm-apparel']))

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
      id="walmart-programs"
      title="Walmart Programs"
      subtitle="Multiple programs spanning apparel and general merchandise"
      accentColor="border-blue-500"
      icon={<ShoppingCart className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Walmart at Via Trading
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Walmart is one of Via Trading's largest retail partners. Programs cover <strong>apparel (WMAPP)</strong>, <strong>general merchandise hardgoods (WMGM)</strong>, and <strong>online returns / new overstock (WMCOM)</strong>, providing buyers with a range of product types and price points.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Unlike some programs that ship exclusively from Los Angeles, Walmart programs ship <strong>FOB from various US locations</strong>. These loads offer different manifest types and product mixes, giving buyers flexibility depending on their business model.
        </p>
        <div className="mt-4 rounded-lg overflow-hidden border border-via-border">
          <img
            src={`${import.meta.env.BASE_URL}images/program-wmgm.webp`}
            alt="Walmart General Merchandise loads — mixed hardgoods on pallets"
            className="w-full aspect-video object-contain bg-[#e8eaee]"
          />
          <p className="text-xs text-via-text-light p-2 text-center">Sample Walmart General Merchandise load</p>
        </div>
      </div>

      {/* Program Cards */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Walmart Sub-Programs
      </h3>
      <div className="space-y-3 mb-6">
        {/* WMAPP */}
        <ExpandableCard
          title="WMAPP (Walmart Apparel)"
          subtitle="Customer Returns & Overstock"
          icon={<Shirt className="w-5 h-5" />}
          badge={<Badge text="Unmanifested" color="amber" />}
          isExpanded={expandedIds.has('wm-apparel')}
          onToggle={() => toggle('wm-apparel')}
          accentColor="border-blue-500"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                Full truckload apparel loads from Walmart consisting of a mix of customer returns and overstock merchandise. WMAPP is an unmanifested program with flat pricing and consistent availability.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Full truckload apparel loads with flat pricing
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Mix of customer returns and overstock merchandise
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Unmanifested — no item-level detail provided
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Consistent program availability
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Details</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-via-bg-subtle rounded-lg p-3 border border-via-border">
                  <p className="text-xs text-via-text-light mb-0.5">Price Range</p>
                  <p className="text-sm font-semibold text-via-navy">$43,000 – $45,000</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3 border border-via-border">
                  <p className="text-xs text-via-text-light mb-0.5">FOB</p>
                  <p className="text-sm font-semibold text-via-navy">Various US Locations</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3 border border-via-border">
                  <p className="text-xs text-via-text-light mb-0.5">Category</p>
                  <p className="text-sm font-semibold text-via-navy">Apparel</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3 border border-via-border">
                  <p className="text-xs text-via-text-light mb-0.5">Pricing Model</p>
                  <p className="text-sm font-semibold text-via-navy">Flat Rate per Truck</p>
                </div>
              </div>
            </div>
          </div>
        </ExpandableCard>

        {/* WMGM */}
        <ExpandableCard
          title="WMGM (Walmart General Merchandise)"
          subtitle="Customer Returns — Mostly Hardgoods"
          icon={<Package className="w-5 h-5" />}
          badge={<Badge text="Unmanifested" color="amber" />}
          isExpanded={expandedIds.has('wm-gm')}
          onToggle={() => toggle('wm-gm')}
          accentColor="border-blue-500"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                WM Customer Return General Merchandise Loads. One of Via Trading's most popular truckload programs. Loads are predominantly made up of hardgoods and sold at a flat price per load. While classified as Customer Returns, loads will include varying percentages of New Overstock and Shelf-Pull merchandise.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <strong>Unmanifested</strong> — loads predominantly hardgoods
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  One of Via Trading's most popular truckload programs
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Sold at a flat price per load
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Loads include varying % of New Overstock and Shelf-Pull items
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Can be viewed at warehouse (FOB LA loads)
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Available from multiple FOB locations (LA, NV, IN, SC)
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Products</p>
              <p className="text-sm text-via-text leading-relaxed">
                Toys, kitchen and cookware, camping gear, indoor and outdoor furniture, exercise equipment, baby products, bedding, automotive, sporting goods, hardware, lighting, pet supplies, health & beauty, tools, outdoor goods, lawn & garden, and more.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Brands</p>
              <p className="text-sm text-via-text leading-relaxed">
                Fisher Price, Playskool, Little Tikes, Disney, Coleman, Acme Furniture, and many other national and private label brands.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Details</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-via-bg-subtle rounded-lg p-3 border border-via-border">
                  <p className="text-xs text-via-text-light mb-0.5">Price Range</p>
                  <p className="text-sm font-semibold text-via-navy">From $10,990</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3 border border-via-border">
                  <p className="text-xs text-via-text-light mb-0.5">FOB</p>
                  <p className="text-sm font-semibold text-via-navy">LA, NV, IN, SC</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3 border border-via-border">
                  <p className="text-xs text-via-text-light mb-0.5">Category</p>
                  <p className="text-sm font-semibold text-via-navy">General Merchandise</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3 border border-via-border">
                  <p className="text-xs text-via-text-light mb-0.5">Pricing Model</p>
                  <p className="text-sm font-semibold text-via-navy">Flat per Load</p>
                </div>
              </div>
            </div>
          </div>
        </ExpandableCard>

        {/* WMCOM */}
        <ExpandableCard
          title="WMCOM (Walmart Exits / Walmart.com)"
          subtitle="Box Damage & New Overstock Clearance"
          icon={<Globe className="w-5 h-5" />}
          badge={<Badge text="Manifested" color="emerald" />}
          isExpanded={expandedIds.has('wm-com')}
          onToggle={() => toggle('wm-com')}
          accentColor="border-blue-500"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                WMCOM & Stores Box Damage & New Overstock Clearance Program. Mix of Deep SKU and/or Assorted Loads. <strong>Fully Manifested.</strong> New Overstock Merchandise. This is a manifested program giving buyers item-level detail on what they are purchasing. The wide price range makes this program accessible to buyers at all budget levels.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <strong>Manifested</strong> — buyers get item-level detail before purchasing
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Mix of Deep SKU and/or Assorted Loads
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Deep SKU items are typically brand new master case
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  More assorted items may include merchandise with slightly damaged master case
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Wide price range suitable for all budget levels
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Box Damage & New Overstock Clearance
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Products</p>
              <p className="text-sm text-via-text leading-relaxed">
                Toys, Baby Items, Electronics, Cellphones, Gadgets & Cutlery, Watches, Bedding & Domestics, Cosmetics, Fitness & Sporting Goods, Outdoor, Health Care, Pet Supplies, Hardware, Home Decor, Apparel, Shoes, Hair Care, Bath & Accessories, School Supplies, and more.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Brands</p>
              <p className="text-sm text-via-text leading-relaxed">
                Samsung, Disney, Honeywell, Google, Little Tikes, Cuisinart, GE, Graco, Under Armour, Canon, Nerf, Skechers, Hot Wheels, GoPro, Champion, Barbie, and many more.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Details</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-via-bg-subtle rounded-lg p-3 border border-via-border">
                  <p className="text-xs text-via-text-light mb-0.5">Price Range</p>
                  <p className="text-sm font-semibold text-via-navy">From $3,164.65</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3 border border-via-border">
                  <p className="text-xs text-via-text-light mb-0.5">FOB</p>
                  <p className="text-sm font-semibold text-via-navy">Various US Locations</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3 border border-via-border">
                  <p className="text-xs text-via-text-light mb-0.5">Category</p>
                  <p className="text-sm font-semibold text-via-navy">General Merchandise</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3 border border-via-border">
                  <p className="text-xs text-via-text-light mb-0.5">Pricing Model</p>
                  <p className="text-sm font-semibold text-via-navy">Per-Load (Manifested)</p>
                </div>
              </div>
            </div>
          </div>
        </ExpandableCard>
      </div>

      {/* SKU Code Callout */}
      <div className="bg-via-orange/10 rounded-lg border border-via-orange/30 p-4 mb-6">
        <p className="text-sm text-orange-700 font-medium mb-2">Understanding Walmart SKU Codes</p>
        <ul className="space-y-1">
          <li className="text-sm text-orange-700">
            <strong>WM</strong> — General Walmart loads
          </li>
          <li className="text-sm text-orange-700">
            <strong>WMGM</strong> — Walmart General Merchandise (hardgoods)
          </li>
          <li className="text-sm text-orange-700">
            <strong>WMAPP</strong> — Walmart Apparel
          </li>
          <li className="text-sm text-orange-700">
            <strong>WMCOM</strong> — Walmart.com exits / New Overstock
          </li>
        </ul>
      </div>

      {/* Inline Exercise */}
      <FillInBlank items={walmartFillBlanks} title="Quick Check: Walmart Programs" />

      <AdditionalResources
        resources={[
          {
            title: 'Walmart Wholesale Liquidation Lots',
            url: 'https://www.viatrading.com/product-category/walmart-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available Walmart liquidation loads on Via Trading\'s marketplace.',
          },
        ]}
      />
    </SectionWrapper>
  )
}
