import { useState } from 'react'
import { Package, Layers } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { AdditionalResources } from '../shared/AdditionalResources'

const loadSizeOptions = [
  {
    title: 'Single Pallets',
    description: 'Ideal for smaller buyers or those testing the Amazon program for the first time.',
  },
  {
    title: 'Multi-Pallet Lots',
    description: 'Mid-size purchases for buyers ready to scale beyond single pallets.',
  },
  {
    title: 'Full 26-Pallet Truckloads',
    description: 'Standard bulk option for established buyers looking for maximum value per load.',
  },
  {
    title: 'Ocean Container Loads',
    description: 'Floor-loaded containers designed for international export buyers.',
  },
]

export function AmazonPrograms() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['amz']))

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
      id="amazon-programs"
      title="Amazon Programs"
      subtitle="Flexible load sizes from single pallets to full truckloads"
      accentColor="border-indigo-500"
      icon={<Package className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Amazon Liquidation Overview
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Amazon loads are marketed as <strong>Customer Returns</strong>, though the <strong>large majority of items will generally be Brand New, Poly Bagged &amp; with Retail Tags</strong>. All loads are <strong>fully manifested</strong> with the majority of items' retail values provided by Amazon. Loads are available in various configurations from single pallets to full truckloads and ocean containers, making the program accessible to buyers of all sizes.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          There are two main types of AMZ loads: (1) <strong>Predominantly Apparel &amp; Shoes</strong>, and (2) <strong>Predominantly Home, Wireless, Toys &amp; Drugstore</strong>. The percentage-of-retail sales price can vary per load based on the commodity mix. The parent SKU for all Amazon programs is <strong>AMZ</strong>.
        </p>
        <div className="mt-4 rounded-lg overflow-hidden border border-via-border">
          <img src={`${import.meta.env.BASE_URL}images/program-amz.webp`} alt="Amazon shelf-pull loads on pallets" className="w-full h-48 object-cover" />
          <p className="text-xs text-via-text-light p-2 text-center">Sample Amazon load</p>
        </div>
      </div>

      {/* Program Card */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Amazon Program
      </h3>
      <div className="space-y-3 mb-6">
        <ExpandableCard
          title="Amazon (AMZ)"
          subtitle="Shelf Pulls & Customer Returns"
          icon={<Package className="w-5 h-5" />}
          badge={<Badge text="Manifested" color="emerald" />}
          isExpanded={expandedIds.has('amz')}
          onToggle={() => toggle('amz')}
          accentColor="border-indigo-500"
        >
          <div className="space-y-4">
            {/* Overview */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                Amazon loads are fully manifested customer return merchandise spanning virtually every consumer product category. Although marketed as Customer Returns, the large majority of items are typically Brand New, Poly Bagged, and with Retail Tags. Retail values for the majority of items are provided by Amazon. Loads range from single pallets to full truckloads and ocean containers.
              </p>
            </div>

            {/* Key Features */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <strong>All lots are manifested</strong> with retail values provided by Amazon
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Large majority of items are Brand New, Poly Bagged &amp; with Retail Tags
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Available from single pallets to full truckloads and ocean containers
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Two main load types: Apparel &amp; Shoes, or Home, Wireless, Toys &amp; Drugstore
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <strong>Similar smaller listings available</strong>
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <strong>Can be viewed in warehouse</strong>
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Consistent ongoing program
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Consolidation options available
                </li>
              </ul>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Condition</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Customer Returns (mostly Brand New)</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Price Range</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">From 6.50% of Retail; $1,333 – $155,181</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">CA — Los Angeles</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Parent SKU</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">AMZ</p>
              </div>
            </div>

            {/* Products */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p>
              <p className="text-xs text-via-text-light leading-relaxed">
                Electronics, Clothing, Housewares, Shoes, Accessories, Toys, Home D&eacute;cor, Sporting Goods, Bedding, Personal Care, Health & Beauty, Tools, Hardware, Furniture
              </p>
            </div>
          </div>
        </ExpandableCard>
      </div>

      {/* Load Size Options Callout */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-via-navy" />
          <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide">
            Load Size Options
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {loadSizeOptions.map((option) => (
            <div key={option.title} className="bg-via-bg-subtle rounded-lg p-3">
              <p className="text-sm font-semibold text-via-navy mb-1">{option.title}</p>
              <p className="text-xs text-via-text-light">{option.description}</p>
            </div>
          ))}
        </div>
      </div>

      <AdditionalResources
        resources={[
          {
            title: 'Amazon Wholesale Liquidation',
            url: 'https://www.viatrading.com/product-category/amazon-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available Amazon liquidation loads on Via Trading\'s marketplace.',
          },
        ]}
      />
    </SectionWrapper>
  )
}
