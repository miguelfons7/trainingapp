import { TrendingDown, ShoppingCart, Store, Tent, Archive, Gavel, Building2, CircleDollarSign, Globe, Warehouse } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
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

export function SecondaryMarket() {
  return (
    <SectionWrapper
      id="secondary-market"
      title="The Secondary Market"
      subtitle="Understanding the ecosystem you're selling in"
      accentColor="border-slate-500"
      icon={<TrendingDown className="w-5 h-5" />}
    >
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

      <div className="bg-via-orange/10 rounded-lg border border-via-orange/30 p-4">
        <p className="text-sm text-via-orange font-medium mb-1">Why This Matters for Sales</p>
        <p className="text-sm text-orange-700">{marketStats.whyItMatters}</p>
      </div>
    </SectionWrapper>
  )
}
