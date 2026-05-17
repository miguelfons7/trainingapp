import { TrendingDown, ShoppingCart, Store, Tent, Archive, Gavel, Building2, CircleDollarSign, Globe, Warehouse } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { FlowDiagram } from '../shared/FlowDiagram'
import { AdditionalResources } from '../shared/AdditionalResources'
import { SourcesCitations } from '../shared/SourcesCitations'
import { marketStats, salesChannels } from '../../data/secondaryMarketData'

const iconMap: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  Store: <Store className="w-5 h-5" />,
  Tent: <Tent className="w-5 h-5" />,
  Archive: <Archive className="w-5 h-5" />,
  Gavel: <Gavel className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  CircleDollarSign: <CircleDollarSign className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Warehouse: <Warehouse className="w-5 h-5" />,
}

const flowPaths = [
  {
    label: 'Path 1: Customer Returns',
    steps: ['Consumer Returns Item', 'Retailer', 'Return Processing Center', 'Liquidator', 'Secondary Market'],
    color: 'bg-blue-600',
  },
  {
    label: 'Path 2: Excess Inventory',
    steps: ['Manufacturer Overproduces', 'Distributor/Retailer Can\'t Sell', 'Liquidator', 'Secondary Market'],
    color: 'bg-emerald-600',
  },
  {
    label: 'Path 3: Shelf Pulls',
    steps: ['Product Sits on Shelf', 'Store Pulls for New Stock', 'Liquidator', 'Secondary Market'],
    color: 'bg-amber-600',
  },
  {
    label: 'Path 4: Business Closure',
    steps: ['Company Closes / Downsizes', 'Needs to Clear Inventory', 'Liquidator', 'Secondary Market'],
    color: 'bg-rose-600',
  },
]

export function SecondaryMarket() {
  return (
    <SectionWrapper
      id="secondary-market"
      title="The Secondary Market"
      subtitle="Understanding the ecosystem you're working in"
      accentColor="border-slate-500"
      icon={<TrendingDown className="w-5 h-5" />}
    >
      {/* --- New opening: What Is Liquidation? --- */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          What Is Liquidation?
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Before we get into the details, it helps to start with the big picture.{' '}
          <strong>Liquidation</strong> is the process by which unsold, returned, or excess merchandise
          from retailers and manufacturers is sold in bulk at deeply discounted prices. It is the
          umbrella term for an entire industry, and nearly everything you will learn in this training
          falls under it.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          When you hear people talk about the <strong>secondary market</strong>, they are referring to
          the network of businesses and channels where liquidated goods are bought and resold. When
          they mention <strong>reverse logistics</strong>, they mean the systems and processes that
          move returned or unsold products back through the supply chain to companies like Via Trading.{' '}
          <strong>Product conditions</strong> describe how those goods are categorized (new, used,
          damaged, and so on). <strong>Load types</strong> refer to how merchandise is grouped, sized,
          and shipped. And <strong>buyer types</strong> describe the different kinds of business owners
          who purchase liquidation merchandise and what they do with it.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          All of these concepts are pieces of the same puzzle. This course covers the liquidation
          industry from end to end. Each module ahead will explore one piece of this ecosystem so that
          by the time you finish, you will have a clear understanding of how the entire industry works
          and where Via Trading fits within it.
        </p>
      </div>

      {/* --- Introductory prose: why the secondary market exists --- */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Why the Secondary Market Exists
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Every year, major retailers like Walmart, Target, and Amazon generate millions of returned,
          unsold, and excess products. You might wonder why they don't just put returns back on the
          shelf. The short answer is economics. It is rarely cost-effective to inspect, repackage, and
          re-merchandise every returned item, especially at the enormous volume these retailers deal
          with daily. On top of that, warehouse space is expensive. For many retailers, the space
          those goods occupy is worth more than the inventory itself. Letting unsold or returned
          products sit in a warehouse costs money every single day.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          So instead of absorbing the loss, retailers sell these goods in bulk to{' '}
          <strong>liquidators</strong>, companies that specialize in purchasing surplus and returned
          merchandise at a deep discount and reselling it. That decision created an entire industry
          known as the <strong>secondary market</strong>, the network of businesses and channels
          where liquidated goods find new buyers and new life. Liquidation is technically a loss on the
          retailer's balance sheet, but it is far better than the alternative of destroying
          goods or paying indefinitely for storage. Retailers count on companies like Via Trading to
          take that inventory off their hands quickly, recover some value, and free up warehouse space
          for fresh products.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          The scale is staggering. American retailers generate an estimated{' '}
          <strong>$221 billion in returns annually</strong> (IHL Group). And that figure only covers
          customer returns. It doesn't include <strong>New Overstock</strong> (excess inventory that
          never sold), seasonal clearance, or products pulled from shelves due to packaging changes.
          When you add it all up, the secondary market represents one of the largest and
          least-understood sectors in retail.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Here's how it works in practice: liquidators like Via Trading purchase this merchandise in
          bulk, sometimes entire truckloads at a time, and make it available to business owners at a
          fraction of the original retail price. It's a win for everyone involved. Retailers recover
          value from goods they'd otherwise write off. Business owners get name-brand merchandise at steep
          discounts. And end consumers get access to affordable products. Along the way, goods that
          might have ended up in a landfill get a second life, which, in a world increasingly focused
          on sustainability, matters more than ever.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          How steep are the discounts? Liquidation merchandise is typically sold at a fraction of the
          original retail price. In many cases, the per-unit cost to the buyer is{' '}
          <strong>lower than the manufacturer's production cost</strong>, and often even cheaper than
          sourcing equivalent goods directly from overseas factories. That pricing dynamic is what
          makes the liquidation business model so attractive to entrepreneurs and business owners around
          the world.
        </p>
      </div>

      {/* --- Stat highlight --- */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <div className="bg-via-bg-subtle rounded-lg p-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-via-orange">{marketStats.annualValue}</span>
            <span className="text-sm text-via-text-light">combined annual value of merchandise retailers need to liquidate</span>
          </div>
        </div>
      </div>

      {/* --- Flow diagrams: how goods reach liquidation --- */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          How Goods Reach Liquidation
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-5">
          Products enter the secondary market through several different paths. Customer returns are
          the most well-known source, but they are far from the only one. Here are the most common
          routes merchandise takes to reach a liquidator like Via Trading.
        </p>
        {flowPaths.map((path) => (
          <FlowDiagram
            key={path.label}
            steps={path.steps}
            label={path.label}
            color={path.color}
            highlightIndex={path.steps.length - 2}
          />
        ))}
      </div>

      {/* --- Sales channels grid --- */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Where Secondary Market Goods Get Sold
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {salesChannels.map((channel) => (
          <div
            key={channel.id}
            className="bg-via-card rounded-lg border border-via-border p-4 flex items-start gap-3"
          >
            <span className="text-via-orange mt-0.5 shrink-0">{iconMap[channel.icon]}</span>
            <div>
              <p className="text-sm font-semibold text-via-navy">{channel.name}</p>
              <p className="text-xs text-via-text-light mt-0.5">{channel.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- Post-grid prose: how the market is evolving --- */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          A Growing Industry
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          The secondary market continues to grow as more business owners discover the opportunity.
          Traditional channels like flea markets, swap meets, and discount stores remain strong, but
          they now share the landscape with rapidly expanding new formats.{' '}
          <strong>Online sellers</strong> on platforms like Amazon, eBay, Whatnot, and Poshmark
          represent one of the fastest-growing segments.{' '}
          <strong>Bin stores</strong>, retail locations where shoppers dig through bins of
          discounted merchandise on a weekly markdown schedule, have exploded in popularity across
          the country. Even large established retailers like Staples are beginning to add bin store
          sections to their locations, recognizing the value in the secondary market. Meanwhile,{' '}
          <strong>exporters</strong> continue to ship container loads of liquidation goods to markets
          in Latin America, Africa, the Middle East, and beyond.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Liquidation is never the first choice for a retailer since it represents a loss compared to
          full-price sales, but it is a necessary part of doing business at scale. As e-commerce
          continues to drive higher return rates and retailers face increasing pressure to manage
          excess inventory efficiently, the demand for professional liquidation partners only grows.
          Companies like Via Trading help retailers recover as much value as possible while freeing up
          valuable warehouse space. New channels, technologies, and buyer demographics continue to
          reshape how liquidation merchandise moves from retailers to end consumers.
        </p>

        {/* Trade show and auction photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <div>
            <img
              src={`${import.meta.env.BASE_URL}images/course-2-via-trading.jpg`}
              alt="Via Trading's booth at the ASD Market Week trade show"
              className="rounded-lg w-full h-40 object-cover"
            />
            <p className="text-xs text-via-text-light mt-1 text-center italic">Via Trading at ASD Market Week</p>
          </div>
          <div>
            <img
              src={`${import.meta.env.BASE_URL}images/course-1-industry.jpg`}
              alt="A live liquidation auction at Via Trading's warehouse"
              className="rounded-lg w-full h-40 object-cover"
            />
            <p className="text-xs text-via-text-light mt-1 text-center italic">Live auction at Via Trading's warehouse</p>
          </div>
        </div>
      </div>

      {/* --- Why this matters (general, not sales-specific) --- */}
      <div className="bg-via-orange/10 rounded-lg border border-via-orange/30 p-4 mb-0">
        <p className="text-sm text-via-orange font-medium mb-1">Why This Matters</p>
        <p className="text-sm text-orange-700">{marketStats.whyItMatters}</p>
      </div>

      {/* --- Additional Resources --- */}
      <AdditionalResources
        resources={[
          {
            title: 'Why Via Trading? Learn Why You Should Work With Us',
            url: 'https://www.viatrading.com/why-via-trading/',
            source: 'ViaTrading.com',
            description: 'An overview of Via Trading\'s position in the secondary market and what sets them apart.',
          },
          {
            title: 'How to Start a Liquidation Business',
            url: 'https://www.viatrading.com/blog/how-to-start-a-liquidation-business/',
            source: 'Via Trading Blog',
            description: 'A beginner\'s guide to entering the liquidation industry as a business owner.',
          },
          {
            title: 'What is Liquidation? A Complete Guide',
            url: 'https://www.viatrading.com/blog/what-is-liquidation/',
            source: 'Via Trading Blog',
            description: 'A comprehensive introduction to liquidation, how it works, and why the industry continues to grow.',
          },
        ]}
      />

      {/* --- Sources --- */}
      <SourcesCitations
        citations={[
          {
            id: 'ihl-returns',
            text: 'IHL Group: Estimated $221 billion in annual retail returns in the United States.',
            url: 'https://www.ihlservices.com/',
          },
          {
            id: 'via-about',
            text: 'Via Trading: Company information, buyer network, and industry position.',
            url: 'https://www.viatrading.com/why-via-trading/',
          },
        ]}
      />
    </SectionWrapper>
  )
}
