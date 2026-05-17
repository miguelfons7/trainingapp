import { useState } from 'react'
import {
  Package,
  Shirt,
  Sofa,
  Wrench,
  Home,
  Monitor,
  Footprints,
  Gamepad2,
  ShoppingBag,
  ArrowRight,
  BarChart3,
  Users,
  Layers,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { StatCard } from '../shared/StatCard'
import { FlowDiagram } from '../shared/FlowDiagram'
import { AdditionalResources } from '../shared/AdditionalResources'
import { productCategories, programStats } from '../../data/modules/product-knowledge/programsData'

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-5 h-5" />,
  Sofa: <Sofa className="w-5 h-5" />,
  Shirt: <Shirt className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  Monitor: <Monitor className="w-5 h-5" />,
  Footprints: <Footprints className="w-5 h-5" />,
  Gamepad2: <Gamepad2 className="w-5 h-5" />,
}

const programFlow = {
  steps: ['Retailer Returns / Overstock', 'Via Trading Purchases', 'Sorted & Palletized', 'Business Owner Buys'],
  label: 'How Programs Work',
  color: 'bg-blue-600',
}

export function ProductOverview() {
  const [showAllCategories, setShowAllCategories] = useState(false)
  const visibleCategories = showAllCategories ? productCategories : productCategories.slice(0, 4)

  return (
    <SectionWrapper
      id="product-overview"
      title="What We Sell"
      subtitle="An overview of Via Trading's product categories and retail partner programs"
      accentColor="border-blue-500"
      icon={<ShoppingBag className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          What Does Via Trading Sell?
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Via Trading purchases excess, returned, and overstock merchandise from major U.S. retailers and sells it in bulk to business owners around the world. The merchandise comes through structured <strong>programs</strong>, each tied to a specific retail partner. Each program has its own product mix, pricing model, and load format.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          As an Account Manager, you need to understand what is available, how each program works, and which products are a good fit for different buyer types. This course gives you a working overview of every program Via Trading currently offers.
        </p>
      </div>

      {/* Key Stats */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        At a Glance
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard
          icon={<Layers className="w-6 h-6" />}
          value={String(programStats.totalPrograms)}
          label="Active Programs"
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          value={`${programStats.partnerCount}+`}
          label="Retail Partners"
        />
        <StatCard
          icon={<Package className="w-6 h-6" />}
          value={String(programStats.categoryCount)}
          label="Product Categories"
        />
        <StatCard
          icon={<BarChart3 className="w-6 h-6" />}
          value="3"
          label="Pricing Models"
        />
      </div>

      {/* How Programs Work */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          How Programs Work
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Via Trading maintains ongoing relationships with major retailers. When those retailers need to move excess or returned merchandise, they send it to Via Trading through a structured program. Via Trading receives, sorts, and palletizes the merchandise at its facilities, then makes it available for purchase by business owners.
        </p>
        <FlowDiagram
          steps={programFlow.steps}
          label={programFlow.label}
          color={programFlow.color}
          highlightIndex={1}
        />
      </div>

      {/* Manifested vs Unmanifested */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Manifested vs. Unmanifested
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          One of the most important distinctions you will encounter across programs is whether a load is <strong>manifested</strong> or <strong>unmanifested</strong>. This affects how the merchandise is priced, what the buyer knows before purchasing, and the types of business owners who gravitate toward each format.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-emerald-50 rounded-lg border border-emerald-300 p-4">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Manifested</p>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2 text-xs text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Full item-level detail available before purchase
              </li>
              <li className="flex items-start gap-2 text-xs text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Buyer knows exactly what they are getting
              </li>
              <li className="flex items-start gap-2 text-xs text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Priced as a percentage of retail or wholesale value
              </li>
              <li className="flex items-start gap-2 text-xs text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Lower risk, appeals to newer or more cautious buyers
              </li>
            </ul>
          </div>
          <div className="bg-amber-50 rounded-lg border border-amber-300 p-4">
            <p className="text-sm font-semibold text-amber-800 mb-2">Unmanifested</p>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2 text-xs text-amber-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                No item-level detail; buyer gets a general category mix
              </li>
              <li className="flex items-start gap-2 text-xs text-amber-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                Often viewable at the warehouse before purchase
              </li>
              <li className="flex items-start gap-2 text-xs text-amber-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                Flat pricing per load or tiered pricing
              </li>
              <li className="flex items-start gap-2 text-xs text-amber-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                Higher margins for experienced buyers who know the product
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pricing Models */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Pricing Models
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Different programs use different pricing structures. Understanding these helps you set expectations with buyers and recommend programs that fit their budget.
        </p>
        <div className="space-y-3">
          <div className="border-l-3 border-blue-500 pl-4">
            <p className="text-sm font-semibold text-via-navy">Percentage of Retail / Wholesale</p>
            <p className="text-xs text-via-text-light">
              The load is priced as a percentage of the total retail or wholesale value of the items inside. Common for manifested programs where item-level data is available. Examples: 9-12% of retail (Boscov's), 31% of wholesale (HD Manifested).
            </p>
          </div>
          <div className="border-l-3 border-blue-500 pl-4">
            <p className="text-sm font-semibold text-via-navy">Flat Price per Load</p>
            <p className="text-xs text-via-text-light">
              A fixed dollar amount per load regardless of the retail value inside. Common for unmanifested programs. Examples: Lowes at $4,850-$4,950, HD Turbo at $7,800-$10,800.
            </p>
          </div>
          <div className="border-l-3 border-blue-500 pl-4">
            <p className="text-sm font-semibold text-via-navy">Tiered Pricing</p>
            <p className="text-xs text-via-text-light">
              Multiple quality tiers within the same program, each at a different price point. The flagship example is TGT Salvage with four tiers: Value ($10,990), Prime ($12,990), Max ($23,990), and Ocean Container ($18,490).
            </p>
          </div>
        </div>
      </div>

      {/* Product Categories Grid */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Product Categories
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {visibleCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-via-card rounded-lg border border-via-border p-4 flex items-start gap-3"
          >
            <span className="text-via-orange mt-0.5 shrink-0">{iconMap[cat.icon]}</span>
            <div>
              <p className="text-sm font-semibold text-via-navy">{cat.name}</p>
              <p className="text-xs text-via-text-light mt-0.5">{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
      {!showAllCategories && productCategories.length > 4 && (
        <button
          onClick={() => setShowAllCategories(true)}
          className="flex items-center gap-1 text-sm text-via-orange font-medium hover:underline mb-6 cursor-pointer"
        >
          Show all {productCategories.length} categories <ArrowRight className="w-4 h-4" />
        </button>
      )}
      {showAllCategories && (
        <button
          onClick={() => setShowAllCategories(false)}
          className="text-sm text-via-text-light hover:underline mb-6 cursor-pointer"
        >
          Show fewer
        </button>
      )}

      {/* What's Ahead */}
      <div className="bg-via-orange/10 rounded-lg border border-via-orange/30 p-4 mb-0">
        <p className="text-sm text-orange-700 font-medium mb-1">What's Ahead</p>
        <p className="text-sm text-orange-700">
          The modules that follow will walk you through each retail partner program in detail, starting with Via Trading's flagship Target programs, then moving to Home Improvement, General Merchandise, and LiquidateNow offerings. By the end, you will be able to match any buyer with the right program.
        </p>
      </div>

      <AdditionalResources
        resources={[
          {
            title: 'Via Trading Product Categories',
            url: 'https://www.viatrading.com/product-category/all-wholesale-lots/',
            source: 'ViaTrading.com',
            description: 'Browse all available wholesale liquidation lots by product category.',
          },
          {
            title: 'How to Buy Wholesale Liquidation',
            url: 'https://www.viatrading.com/how-to-buy/',
            source: 'ViaTrading.com',
            description: 'Step-by-step guide on how to purchase liquidation merchandise from Via Trading.',
          },
        ]}
      />
    </SectionWrapper>
  )
}
