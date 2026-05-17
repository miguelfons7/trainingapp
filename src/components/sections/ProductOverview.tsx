import { useState } from 'react'
import {
  Package,
  Shirt,
  Sofa,
  Wrench,
  Home,
  Monitor,
  Gamepad2,
  ShoppingBag,
  ArrowRight,
  Layers,
  Car,
  Baby,
  Heart,
  Plug,
  Box,
  TreePine,
  Dog,
  Sun,
  Dumbbell,
  ShoppingCart,
  Tag,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { FlowDiagram } from '../shared/FlowDiagram'
import { AdditionalResources } from '../shared/AdditionalResources'
import { productCategories, skuNaming } from '../../data/modules/product-knowledge/programsData'

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  Baby: <Baby className="w-5 h-5" />,
  Monitor: <Monitor className="w-5 h-5" />,
  Shirt: <Shirt className="w-5 h-5" />,
  Sofa: <Sofa className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Plug: <Plug className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  Box: <Box className="w-5 h-5" />,
  TreePine: <TreePine className="w-5 h-5" />,
  Dog: <Dog className="w-5 h-5" />,
  Sun: <Sun className="w-5 h-5" />,
  Dumbbell: <Dumbbell className="w-5 h-5" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  Gamepad2: <Gamepad2 className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
}

const programFlow = {
  steps: ['Retailer Has Excess / Returns', 'Via Trading Program', 'Ships to Buyer'],
  label: 'How Programs Work',
  color: 'bg-blue-600',
}

export function ProductOverview() {
  const [showAllCategories, setShowAllCategories] = useState(false)
  const visibleCategories = showAllCategories ? productCategories : productCategories.slice(0, 6)

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
          This section gives you a working overview of what Via Trading sells, how programs are structured, and the types of products you will encounter. You do not need to memorize every detail right now — the goal is to build a general understanding that the rest of the training will expand on.
        </p>
      </div>

      {/* How Programs Work */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          How Programs Work
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Via Trading maintains ongoing relationships with major retailers. When those retailers need to move excess or returned merchandise, Via Trading facilitates the sale through a structured program. Depending on the program, the merchandise may follow different paths:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <p className="text-sm font-semibold text-blue-800 mb-2">Direct-Ship Programs</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              Many programs ship directly from the retailer's facilities (stores or distribution centers) to the buyer. Via Trading handles the sale, but the merchandise never passes through Via's warehouse.
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <p className="text-sm font-semibold text-blue-800 mb-2">Warehouse-First Programs</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              Some programs require the merchandise to ship to Via Trading's facilities first. Via receives, sorts, and palletizes the goods before making them available for purchase. These loads may also be viewable at the warehouse.
            </p>
          </div>
        </div>
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
          One of the most important distinctions across programs is whether a load is <strong>manifested</strong> or <strong>unmanifested</strong>. This affects how the merchandise is priced, what the buyer knows before purchasing, and the types of buyers who gravitate toward each format.
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

      {/* SKU Naming */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-via-navy" />
          <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide">
            Parent SKU Naming
          </h3>
        </div>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Via Trading cannot publicly advertise which retailers it works with, so all programs use a <strong>Parent SKU</strong> code instead of the retailer name. You will see these codes throughout the system, on load listings, and in conversations with buyers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skuNaming.map((entry) => (
            <div
              key={entry.retailer}
              className="flex items-center justify-between bg-via-bg-subtle rounded-lg border border-via-border px-4 py-2.5"
            >
              <span className="text-sm font-medium text-via-navy">{entry.retailer}</span>
              <span className="text-xs font-mono text-via-orange font-semibold">
                {entry.skus.join(', ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Product Categories Grid */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Product Categories
      </h3>
      <p className="text-xs text-via-text-light mb-4">
        Via Trading organizes merchandise into 17 official product categories. Here is the full taxonomy:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {visibleCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-via-card rounded-lg border border-via-border p-4 flex items-start gap-3"
          >
            <span className="text-via-orange mt-0.5 shrink-0">{iconMap[cat.icon]}</span>
            <div>
              <p className="text-sm font-semibold text-via-navy">{cat.name}</p>
            </div>
          </div>
        ))}
      </div>
      {!showAllCategories && productCategories.length > 6 && (
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
          The following modules will introduce each retail partner program in more detail. For now, the key takeaway is that Via Trading works across a wide range of product categories and retail partners, each with its own format and pricing. You will become more familiar with individual programs as you continue through the training.
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
