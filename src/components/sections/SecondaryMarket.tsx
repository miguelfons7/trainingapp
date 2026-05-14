import { TrendingDown, ShoppingCart, Store, Tent, Archive, Gavel, Building2, CircleDollarSign, Globe, Warehouse } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { marketStats, salesChannels } from '../../data/secondaryMarketData'
import { TermMatch } from '../interactive/TermMatch'
import { secondaryMarketTermMatch } from '../../data/modules/industry/inlineExercises'

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

export function SecondaryMarket() {
  return (
    <SectionWrapper
      id="secondary-market"
      title="The Secondary Market"
      subtitle="Understanding the ecosystem you're selling in"
      accentColor="border-slate-500"
      icon={<TrendingDown className="w-5 h-5" />}
    >
      {/* --- Introductory prose: why the secondary market exists --- */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Why the Secondary Market Exists
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Every year, major retailers like Walmart, Target, and Amazon generate millions of returned,
          unsold, and excess products. You might wonder: why don't they just put returns back on the
          shelf? The short answer is economics. It's rarely cost-effective to inspect, repackage, and
          re-merchandise every returned item — especially when you're dealing with the sheer volume
          these retailers see. So instead of absorbing the loss, they sell these goods in bulk to{' '}
          <strong>liquidators</strong>. That decision created an entire industry: the{' '}
          <strong>secondary market</strong>.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          The scale is staggering. American retailers generate an estimated{' '}
          <strong>$221 billion in returns annually</strong> (IHL Group). And that figure only covers
          customer returns — it doesn't include <strong>New Overstock</strong> (excess inventory that
          never sold), seasonal clearance, or products pulled from shelves due to packaging changes.
          When you add it all up, the <strong>secondary market</strong> represents one of the
          largest and least-understood sectors in retail.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Here's how <strong>liquidation</strong> works in practice: liquidators like Via Trading
          purchase this merchandise in bulk — sometimes entire truckloads at a time — and make it
          available to business buyers at a fraction of the original retail price. It's a win for
          everyone involved. Retailers recover value from goods they'd otherwise write off. Buyers
          get name-brand merchandise at steep discounts. And end consumers get access to affordable
          products. Along the way, goods that might have ended up in a landfill get a second life —
          which, in a world increasingly focused on sustainability, matters more than ever.
        </p>
      </div>

      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-sm text-via-text leading-relaxed mb-4">
          {marketStats.description}
        </p>
        <div className="bg-via-bg-subtle rounded-lg p-4 mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-via-orange">{marketStats.annualValue}</span>
            <span className="text-sm text-via-text-light">combined annual value of merchandise retailers need to liquidate</span>
          </div>
        </div>
        <p className="text-sm text-via-text leading-relaxed">
          {marketStats.whyItExists}
        </p>
      </div>

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
          A Market That Keeps Evolving
        </h3>
        <p className="text-sm text-via-text leading-relaxed">
          A decade ago, most liquidation merchandise moved through flea markets and small discount
          shops. That world still exists, but the landscape has shifted dramatically.{' '}
          <strong>Online sellers</strong> on platforms like Amazon, eBay, Whatnot, and Poshmark are
          now one of the fastest-growing segments of the secondary market.{' '}
          <strong>Bin stores</strong> — retail locations where shoppers dig through bins of
          discounted merchandise on a weekly markdown schedule — have exploded in popularity across
          the country. Meanwhile, <strong>exporters</strong> continue to ship container loads of
          liquidation goods to markets in Latin America, Africa, the Middle East, and beyond. The
          industry is always changing, and staying current with these trends is part of what makes
          working in liquidation exciting.
        </p>
      </div>

      <div className="bg-via-orange/10 rounded-lg border border-via-orange/30 p-4 mb-8">
        <p className="text-sm text-via-orange font-medium mb-1">Why This Matters for Sales</p>
        <p className="text-sm text-orange-700">{marketStats.whyItMatters}</p>
      </div>

      {/* Inline exercise */}
      <TermMatch pairs={secondaryMarketTermMatch} title="Quick Check: Match the Terms" />
    </SectionWrapper>
  )
}
