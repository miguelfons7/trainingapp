import { Globe, ExternalLink, ShoppingCart, RotateCcw, DollarSign, Building2, Network } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { platforms, retailerPartners } from '../../data/companyData'

const platformDetails = [
  {
    name: 'ViaTrading.com',
    icon: <ShoppingCart className="w-6 h-6" />,
    tagline: 'Wholesale Liquidation Marketplace',
    description:
      'The flagship platform and the foundation of the entire Via Trading ecosystem. ViaTrading.com is where business owners browse and purchase liquidation merchandise by category, condition, and load type. Over two decades, this platform has built a buyer network spanning 129+ countries, and that network powers everything else Via Trading does.',
    colorClass: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'LiquidateNow.com',
    icon: <DollarSign className="w-6 h-6" />,
    tagline: 'Consignment-Based Liquidation Platform',
    description:
      'LiquidateNow leverages Via Trading\'s established buyer network and marketing infrastructure to help businesses liquidate their merchandise on a consignment basis. Instead of Via Trading purchasing the inventory outright, retailers and manufacturers list their goods and LiquidateNow connects them directly with qualified business owners. This gives vendors more control over pricing while giving them access to Via Trading\'s massive reach.',
    colorClass: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'WeSolveReturns.com',
    icon: <RotateCcw className="w-6 h-6" />,
    tagline: 'Return Center Solution',
    description:
      'WeSolveReturns acts as a return center for brands and companies that do not have their own returns infrastructure. Rather than letting returns pile up or writing them off as a loss, WeSolveReturns processes those returns and offers companies a way to make money on them. The recovered merchandise is then sold through Via Trading\'s marketplace, completing the cycle.',
    colorClass: 'bg-emerald-100 text-emerald-600',
  },
]

export function OurPlatforms() {
  return (
    <SectionWrapper
      id="our-platforms"
      title="Our Platforms"
      subtitle="How Via Trading Corporation's three platforms work together"
      accentColor="border-via-orange"
      icon={<Globe className="w-5 h-5" />}
    >
      {/* Platform Overview */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-sm text-via-text leading-relaxed">
          Via Trading Corporation operates three distinct platforms, each serving a different part of the liquidation ecosystem. Understanding how they connect is important for every employee, regardless of your role. Everything is powered by <strong>Via Trading</strong>, the wholesale liquidation company that established the buyer network and marketplace that makes the other two platforms possible.
        </p>
      </div>

      {/* Corporate Tree */}
      <div className="bg-via-navy/5 rounded-xl border border-via-navy/10 p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4 flex items-center gap-2">
          <Network className="w-4 h-4" />
          Corporate Structure
        </h3>

        {/* Tree visualization */}
        <div className="flex flex-col items-center">
          {/* Parent */}
          <div className="bg-via-navy text-white px-6 py-3 rounded-xl text-sm font-bold text-center">
            <Building2 className="w-4 h-4 inline-block mr-2 -mt-0.5" />
            Via Trading Corporation
          </div>

          {/* Connector line down */}
          <div className="w-0.5 h-6 bg-via-navy/30" />

          {/* Horizontal connector */}
          <div className="relative w-full max-w-lg">
            <div className="absolute top-0 left-1/6 right-1/6 h-0.5 bg-via-navy/30" />
            {/* Three vertical drops */}
            <div className="flex justify-between px-[16.67%]">
              <div className="w-0.5 h-6 bg-via-navy/30" />
              <div className="w-0.5 h-6 bg-via-navy/30" />
              <div className="w-0.5 h-6 bg-via-navy/30" />
            </div>
          </div>

          {/* Three children with logos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg">
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-3 text-center flex flex-col items-center gap-1.5">
              <img src={`${import.meta.env.BASE_URL}images/viatrading-logo-dark.svg`} alt="Via Trading" className="h-5" />
              <p className="text-[10px] text-blue-600">Wholesale Liquidation</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-3 text-center flex flex-col items-center gap-1.5">
              <img src={`${import.meta.env.BASE_URL}images/liquidatenow-logo.png`} alt="LiquidateNow" className="h-5" />
              <p className="text-[10px] text-orange-600">Consignment Platform</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-3 text-center flex flex-col items-center gap-1.5">
              <img src={`${import.meta.env.BASE_URL}images/wsr-logo.svg`} alt="WeSolveReturns" className="h-5" />
              <p className="text-[10px] text-emerald-600">Return Center Solution</p>
            </div>
          </div>

          {/* Maybe more */}
          <div className="mt-3 px-4 py-1.5 border border-dashed border-via-border rounded-lg">
            <p className="text-[10px] text-via-text-light italic">Maybe more?</p>
          </div>
        </div>

        <p className="text-xs text-via-text-light mt-4 text-center">
          Via Trading, the wholesale liquidation company, is the engine that powers the entire ecosystem. Its buyer network and marketplace infrastructure are what make LiquidateNow and WeSolveReturns possible.
        </p>
      </div>

      {/* Platform Cards */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        The Three Platforms
      </h3>
      <div className="space-y-4 mb-6">
        {platformDetails.map((platform) => {
          const matchedData = platforms.find((p) => p.name === platform.name)
          return (
            <div
              key={platform.name}
              className="bg-via-card rounded-xl border border-via-border overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${platform.colorClass} flex items-center justify-center shrink-0`}
                  >
                    {platform.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-base font-bold text-via-navy">
                        {platform.name}
                      </h4>
                      {matchedData && (
                        <a
                          href={matchedData.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-via-text-light hover:text-via-orange transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs font-medium text-via-orange mb-2">
                      {platform.tagline}
                    </p>
                    <p className="text-sm text-via-text leading-relaxed">
                      {platform.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* How They Connect */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          How They Connect
        </h3>
        <div className="space-y-3 text-sm text-via-text">
          <p>
            <span className="font-medium text-via-navy">ViaTrading.com</span> is the foundation. It established the massive buyer network of business owners who purchase liquidation goods. Without this network, the other platforms would not exist.
          </p>
          <p>
            <span className="font-medium text-via-navy">LiquidateNow.com</span> leverages that same buyer network and Via Trading's marketing platform to help businesses liquidate their merchandise on a consignment basis. Vendors list their inventory, and LiquidateNow puts it in front of Via Trading's global audience.
          </p>
          <p>
            <span className="font-medium text-via-navy">WeSolveReturns.com</span> acts as a return center for brands that do not have their own returns solution. It processes their returns, recovers value from the merchandise, and feeds that inventory back into Via Trading's marketplace for resale.
          </p>
          <p className="text-via-text-light italic text-xs mt-2">
            Each platform feeds into and strengthens the others. The upcoming LiquidateNow and WeSolveReturns modules in this course will go deeper into how each one works.
          </p>
        </div>
      </div>

      {/* Retailer Partners */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Major Retailer Partners
      </h3>
      <div className="flex flex-wrap items-center gap-2">
        {retailerPartners.map((partner) => (
          <span
            key={partner}
            className="px-3 py-1.5 bg-via-card border border-via-border rounded-lg text-sm font-medium text-via-text"
          >
            {partner}
          </span>
        ))}
        <span className="text-sm font-medium text-via-orange italic">and more!</span>
      </div>

    </SectionWrapper>
  )
}
