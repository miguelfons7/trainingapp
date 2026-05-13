import { Globe, ExternalLink, ShoppingCart, RotateCcw, DollarSign } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { TermMatch } from '../interactive/TermMatch'
import { platforms, retailerPartners } from '../../data/companyData'
import { platformsTermMatch } from '../../data/modules/via-trading/inlineExercises'

const platformDetails = [
  {
    name: 'ViaTrading.com',
    icon: <ShoppingCart className="w-6 h-6" />,
    tagline: 'Wholesale Liquidation Marketplace',
    description:
      'Our primary e-commerce destination for business buyers. Browse and purchase liquidation merchandise by category, condition, and load type. The platform serves buyers across 129+ countries.',
    audience: 'Business buyers, resellers, exporters',
    colorClass: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'WeSolveReturns.com',
    icon: <RotateCcw className="w-6 h-6" />,
    tagline: 'Returns Management & Recommerce',
    description:
      'Our returns management platform helps retailers efficiently process and liquidate their returned merchandise. Rather than letting returns pile up, retailers can convert them into revenue.',
    audience: 'Retailers, e-commerce brands',
    colorClass: 'bg-emerald-100 text-emerald-600',
  },
  {
    name: 'LiquidateNow.com',
    icon: <DollarSign className="w-6 h-6" />,
    tagline: 'Vendor Liquidation Portal',
    description:
      'Our vendor-facing platform where retailers and manufacturers can liquidate their excess and returned inventory. This is the supply side of Via Trading\'s business — where inventory enters our pipeline.',
    audience: 'Retailers, manufacturers, vendors',
    colorClass: 'bg-orange-100 text-orange-600',
  },
]

export function OurPlatforms() {
  return (
    <SectionWrapper
      id="our-platforms"
      title="Our Platforms"
      subtitle="Three platforms working together to power Via Trading's ecosystem"
      accentColor="border-via-orange"
      icon={<Globe className="w-5 h-5" />}
    >
      {/* Platform Overview */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-sm text-via-text leading-relaxed">
          Via Trading operates three distinct platforms, each serving a different part of the liquidation ecosystem. As an Account Manager, understanding how all three connect helps you better serve customers and identify cross-selling opportunities.
        </p>
      </div>

      {/* Platform Cards */}
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
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-via-text-light">
                        Target Audience:
                      </span>
                      <span className="text-xs text-via-text">{platform.audience}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        {/* And More */}
        <div className="bg-via-card rounded-xl border border-dashed border-via-border p-5 text-center">
          <p className="text-sm font-semibold text-via-navy mb-1">And More...</p>
          <p className="text-xs text-via-text-light">
            Via Trading is always expanding its digital ecosystem. Stay tuned for new tools and platforms designed to better serve our buyers and vendor partners.
          </p>
        </div>
      </div>

      {/* How They Connect */}
      <div className="bg-via-navy/5 rounded-xl border border-via-navy/10 p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          How They Connect
        </h3>
        <div className="space-y-2 text-sm text-via-text">
          <p>
            <span className="font-medium text-via-navy">LiquidateNow.com</span> is where inventory enters Via's pipeline — retailers and manufacturers list their excess and returns.
          </p>
          <p>
            <span className="font-medium text-via-navy">WeSolveReturns.com</span> provides retailers with ongoing returns management, creating a steady stream of merchandise.
          </p>
          <p>
            <span className="font-medium text-via-navy">ViaTrading.com</span> is where that inventory goes out — buyers browse, purchase, and build their businesses.
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

      {/* Inline exercise */}
      <div className="mt-8">
        <TermMatch pairs={platformsTermMatch} title="Quick Check: Match the Platforms" />
      </div>
    </SectionWrapper>
  )
}
