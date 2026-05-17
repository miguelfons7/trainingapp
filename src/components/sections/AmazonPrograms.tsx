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
          Amazon offers multiple load types including <strong>shelf-pulls</strong>, <strong>customer returns</strong>, and <strong>assorted mixed merchandise</strong>. Loads are available in various configurations from single pallets to full truckloads and ocean containers, making the program accessible to buyers of all sizes.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Both manifested and unmanifested options exist, giving buyers flexibility in how they purchase. The product variety spans all categories, and the parent SKU for all Amazon programs is <strong>AMZ</strong>.
        </p>
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
          badge={<Badge text="Mixed" color="blue" />}
          isExpanded={expandedIds.has('amz')}
          onToggle={() => toggle('amz')}
          accentColor="border-indigo-500"
        >
          <div className="space-y-4">
            {/* Overview */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                Amazon loads include a broad assortment of shelf-pull and customer return merchandise spanning virtually every consumer product category. With both manifested and unmanifested options available, buyers can choose the level of transparency that fits their business model. Loads range from single pallets to full truckloads and ocean containers.
              </p>
            </div>

            {/* Key Features */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Multiple manifested and unmanifested options
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Available from single pallets to full truckloads and ocean containers
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Shelf-Pull items in good condition
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Flexible sizing for different buyer needs
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Consistent ongoing program
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  Viewable at warehouse
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
                <p className="text-sm font-semibold text-via-navy mt-0.5">Shelf Pulls & Customer Returns</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Pricing</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Varies by load type</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Multiple US locations</p>
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
