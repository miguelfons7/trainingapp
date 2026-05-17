import { useState } from 'react'
import {
  ShoppingCart,
  Package,
  Sofa,
  Footprints,
  Store,
  Layers,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { AdditionalResources } from '../shared/AdditionalResources'
import { retailPrograms } from '../../data/modules/product-knowledge/programsData'

/* Group programs for this module — everything that is NOT Target, Lowes, or Home Depot */
const gmRetailers = retailPrograms.filter((p) =>
  ['Amazon', 'Walmart', 'Walmart.com', 'Sam\'s Club'].includes(p.retailPartner),
)
const furnitureRetailers = retailPrograms.filter((p) =>
  ['Wayfair', 'Costway'].includes(p.retailPartner),
)
const specialtyRetailers = retailPrograms.filter((p) =>
  ['Zappos', 'JCPenney', 'Boscov\'s', 'Albertsons / CTC Discount Store', 'Department Store'].includes(p.retailPartner),
)

const programIcons: Record<string, React.ReactNode> = {
  amazon: <Package className="w-5 h-5" />,
  'sams-club': <Store className="w-5 h-5" />,
  'walmart-apparel': <ShoppingCart className="w-5 h-5" />,
  'walmart-exits': <ShoppingCart className="w-5 h-5" />,
  wayfair: <Sofa className="w-5 h-5" />,
  costway: <Sofa className="w-5 h-5" />,
  zappos: <Footprints className="w-5 h-5" />,
  'tools-thf': <Package className="w-5 h-5" />,
  jcp: <Store className="w-5 h-5" />,
  boscovs: <Store className="w-5 h-5" />,
  albertsons: <Store className="w-5 h-5" />,
}

function ProgramGroup({
  title,
  description,
  programs,
  accentColor,
  bulletColor,
}: {
  title: string
  description: string
  programs: typeof retailPrograms
  accentColor: string
  bulletColor: string
}) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-2">{title}</h3>
      <p className="text-sm text-via-text-light mb-3">{description}</p>
      <div className="space-y-3">
        {programs.map((program) => (
          <ExpandableCard
            key={program.id}
            title={program.name}
            subtitle={`${program.retailPartner} — ${program.condition}`}
            icon={programIcons[program.id] || <Layers className="w-5 h-5" />}
            badge={
              <Badge
                text={program.type}
                color={
                  program.type === 'Manifested'
                    ? 'emerald'
                    : program.type === 'Unmanifested'
                      ? 'amber'
                      : 'blue'
                }
              />
            }
            isExpanded={expandedIds.has(program.id)}
            onToggle={() => toggle(program.id)}
            accentColor={accentColor}
          >
            <div className="space-y-4">
              {/* Key Features */}
              <div>
                <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
                <ul className="space-y-1.5">
                  {program.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-via-text">
                      <span className={`w-1.5 h-1.5 rounded-full ${bulletColor} mt-1.5 shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-via-bg-subtle rounded-lg p-3">
                  <p className="text-xs text-via-text-light uppercase tracking-wide">Price Range</p>
                  <p className="text-sm font-semibold text-via-navy mt-0.5">{program.priceRange}</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3">
                  <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
                  <p className="text-sm font-semibold text-via-navy mt-0.5">{program.fob}</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3">
                  <p className="text-xs text-via-text-light uppercase tracking-wide">Category</p>
                  <p className="text-sm font-semibold text-via-navy mt-0.5">{program.category}</p>
                </div>
                <div className="bg-via-bg-subtle rounded-lg p-3">
                  <p className="text-xs text-via-text-light uppercase tracking-wide">Pricing Model</p>
                  <p className="text-sm font-semibold text-via-navy mt-0.5">{program.pricingModel}</p>
                </div>
              </div>

              {/* Products & Brands */}
              <div>
                <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p>
                <p className="text-xs text-via-text-light leading-relaxed">{program.products}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Brands</p>
                <p className="text-xs text-via-text-light leading-relaxed">{program.brands}</p>
              </div>

              {/* Special callouts */}
              {program.id === 'boscovs' && (
                <div className="bg-emerald-50 rounded-lg border border-emerald-300 p-3">
                  <p className="text-xs text-emerald-700">
                    <strong>Pricing highlight:</strong> At 9-12% of retail, Boscov's offers some of the lowest pricing across all programs. This makes it an excellent entry point for budget-conscious buyers.
                  </p>
                </div>
              )}
              {program.id === 'walmart-apparel' && (
                <div className="bg-amber-50 rounded-lg border border-amber-300 p-3">
                  <p className="text-xs text-amber-700">
                    <strong>Volume note:</strong> WMAPP is a full truckload program priced at $43,000-$45,000 per truck. This is a high-volume program suited for established buyers with strong apparel sales channels.
                  </p>
                </div>
              )}
            </div>
          </ExpandableCard>
        ))}
      </div>
    </div>
  )
}

export function GeneralMerchPrograms() {
  return (
    <SectionWrapper
      id="general-merch-programs"
      title="General Merchandise & Specialty Programs"
      subtitle="Amazon, Walmart, Sam's Club, Wayfair, and more"
      accentColor="border-indigo-500"
      icon={<ShoppingCart className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Beyond Target & Home Improvement
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Via Trading works with a wide range of retail partners beyond Target and the home improvement stores. These programs span general merchandise, furniture, footwear, and specialty categories. Some programs offer manifested loads with full item detail, while others are unmanifested with flat pricing.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          This module covers every remaining program grouped into three categories: <strong>General Merchandise Retailers</strong> (Amazon, Walmart, Sam's Club), <strong>Furniture & Home</strong> (Wayfair, Costway), and <strong>Specialty Programs</strong> (Zappos, JCPenney, Boscov's, Albertsons, THF Tools).
        </p>
      </div>

      {/* GM Retailers */}
      <ProgramGroup
        title="General Merchandise Retailers"
        description="High-volume programs from major national retailers with broad product assortments."
        programs={gmRetailers}
        accentColor="border-indigo-500"
        bulletColor="bg-indigo-500"
      />

      {/* Furniture */}
      <ProgramGroup
        title="Furniture & Home"
        description="Dedicated furniture and home goods programs from online-first retailers."
        programs={furnitureRetailers}
        accentColor="border-violet-500"
        bulletColor="bg-violet-500"
      />

      {/* Specialty */}
      <ProgramGroup
        title="Specialty Programs"
        description="Niche and specialty retailers offering focused product categories."
        programs={specialtyRetailers}
        accentColor="border-teal-500"
        bulletColor="bg-teal-500"
      />

      {/* Summary callout */}
      <div className="bg-via-orange/10 rounded-lg border border-via-orange/30 p-4 mb-0">
        <p className="text-sm text-orange-700 font-medium mb-1">Program Diversity</p>
        <p className="text-sm text-orange-700">
          Via Trading's strength is in the breadth of its program catalog. No matter what a buyer is looking for — general merchandise, apparel, tools, furniture, footwear — there is likely a program that fits. Understanding the full range helps you match every buyer with the right product.
        </p>
      </div>

      <AdditionalResources
        resources={[
          {
            title: 'All Wholesale Liquidation Lots',
            url: 'https://www.viatrading.com/product-category/all-wholesale-lots/',
            source: 'ViaTrading.com',
            description: 'Browse all available wholesale liquidation lots across every retail partner.',
          },
          {
            title: 'Amazon Wholesale Liquidation',
            url: 'https://www.viatrading.com/product-category/amazon-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available Amazon liquidation loads.',
          },
          {
            title: 'Walmart Wholesale Liquidation',
            url: 'https://www.viatrading.com/product-category/walmart-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available Walmart liquidation loads.',
          },
        ]}
      />
    </SectionWrapper>
  )
}
