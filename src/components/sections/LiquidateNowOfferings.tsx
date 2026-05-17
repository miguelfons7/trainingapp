import {
  DollarSign,
  Package,
  Users,
  ArrowLeftRight,
  ShoppingBag,
  Store,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { FlowDiagram } from '../shared/FlowDiagram'
import { AdditionalResources } from '../shared/AdditionalResources'

const lnBuyerFlow = {
  steps: ['Vendor Lists on LN', 'LN Markets to Network', 'Buyer Browses & Purchases', 'Direct Shipment to Buyer'],
  label: 'LN Buyer Experience',
  color: 'bg-orange-600',
}

const merchandiseTypes = [
  {
    icon: <Package className="w-5 h-5" />,
    title: 'Overstock & Closeouts',
    description: 'Brand-new merchandise that retailers or manufacturers need to move due to seasonal changes, packaging updates, or excess production. Often in master case or pallet format.',
  },
  {
    icon: <ArrowLeftRight className="w-5 h-5" />,
    title: 'Customer Returns',
    description: 'Returned products from online and brick-and-mortar retailers. Condition varies from new-in-box to open-box. Typically sold in bulk by category.',
  },
  {
    icon: <Store className="w-5 h-5" />,
    title: 'Shelf Pulls & Discontinued Items',
    description: 'Products removed from retail shelves to make room for new inventory. Generally in good condition with original packaging intact.',
  },
  {
    icon: <ShoppingBag className="w-5 h-5" />,
    title: 'Direct-from-Brand Inventory',
    description: 'Merchandise listed directly by brands and manufacturers, not just retailers. This can include production overruns, packaging changes, and end-of-life products.',
  },
]

export function LiquidateNowOfferings() {
  return (
    <SectionWrapper
      id="liquidatenow-offerings"
      title="LiquidateNow Offerings"
      subtitle="How LN's product catalog complements Via Trading's direct programs"
      accentColor="border-orange-500"
      icon={<DollarSign className="w-5 h-5" />}
    >
      {/* Context: How LN Differs */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          LiquidateNow vs. Via Trading's Wholesale Model
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          In an earlier module, you learned what LiquidateNow is and how consignment works. This module focuses on what is actually <strong>available</strong> through LN and how those offerings fit into the broader product catalog you can present to buyers.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          The key difference is sourcing. Via Trading's direct programs (Target, Lowes, Home Depot, etc.) involve Via Trading purchasing merchandise outright from the retailer. Via owns the inventory and sets the pricing. With <strong>LiquidateNow</strong>, Via Trading does not own the inventory. Instead, vendors — retailers, manufacturers, and other businesses — list their own merchandise on the platform and set their own pricing expectations. LN acts as the marketplace and marketing engine.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-50 rounded-lg border border-blue-300 p-4">
            <p className="text-sm font-semibold text-blue-800 mb-2">Via Trading Direct</p>
            <ul className="space-y-1 text-xs text-blue-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                Via buys inventory outright
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                Via sets the pricing
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                Structured ongoing programs
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                Consistent, predictable inventory
              </li>
            </ul>
          </div>
          <div className="bg-orange-50 rounded-lg border border-orange-300 p-4">
            <p className="text-sm font-semibold text-orange-800 mb-2">LiquidateNow (Consignment)</p>
            <ul className="space-y-1 text-xs text-orange-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                Vendor retains ownership until sold
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                Vendor sets pricing expectations
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                Wider variety of vendors and sources
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                More diverse and unique inventory
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* What Types of Merchandise */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Types of Merchandise on LiquidateNow
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Because LiquidateNow accepts listings from a wide range of vendors, the product mix is broader and more varied than what you see in Via Trading's direct programs. Here are the main categories of merchandise available through LN.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {merchandiseTypes.map((type) => (
            <div key={type.title} className="bg-via-bg-subtle rounded-lg p-4 flex items-start gap-3">
              <span className="text-via-orange mt-0.5 shrink-0">{type.icon}</span>
              <div>
                <p className="text-sm font-semibold text-via-navy">{type.title}</p>
                <p className="text-xs text-via-text-light mt-0.5">{type.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How Buyers Purchase on LN */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          How Buyers Purchase on LN
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          From the buyer's perspective, browsing LiquidateNow is similar to browsing ViaTrading.com. Listings include product details, photos, pricing, and shipping information. The key difference is that the merchandise may ship directly from the vendor's location rather than from Via Trading's warehouse.
        </p>
        <FlowDiagram
          steps={lnBuyerFlow.steps}
          label={lnBuyerFlow.label}
          color={lnBuyerFlow.color}
          highlightIndex={2}
        />
      </div>

      {/* How Vendors List on LN */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          How Vendors List on LN
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Vendors who want to liquidate inventory through LiquidateNow go through a straightforward onboarding process. They provide details about their merchandise — category, condition, quantity, photos, and pricing expectations. The LN team reviews the listing and, once approved, markets it to Via Trading's buyer network through the website, email campaigns, and Account Manager outreach.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          This model works for vendors of all sizes. A small brand with a few pallets of overstock can list alongside a large retailer clearing thousands of units. LN handles the marketing and transaction logistics so the vendor can focus on their core business.
        </p>
      </div>

      {/* Why LN Complements Via */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Why LN Complements Via Trading's Direct Programs
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          LiquidateNow is not a competitor to Via Trading's wholesale programs — it is an extension of them. Together, they give Account Managers a more complete inventory to offer buyers.
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
              <Package className="w-3.5 h-3.5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-via-navy">Fills Product Gaps</p>
              <p className="text-xs text-via-text-light mt-0.5">
                Via's direct programs cover specific retail partners. LN brings in merchandise from vendors and brands that may not have a dedicated Via Trading program, expanding the product catalog.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
              <ShoppingBag className="w-3.5 h-3.5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-via-navy">Unique & One-Time Lots</p>
              <p className="text-xs text-via-text-light mt-0.5">
                Some LN listings are one-time lots that would not fit into a structured ongoing program. These can include liquidations from business closures, seasonal clearance, or production overruns.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-3.5 h-3.5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-via-navy">Leverages the Buyer Network</p>
              <p className="text-xs text-via-text-light mt-0.5">
                Everything on LN benefits from Via Trading's network of 42,000+ business owners. The same Account Managers who sell direct programs can also introduce buyers to relevant LN listings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key takeaway */}
      <div className="bg-via-orange/10 rounded-lg border border-via-orange/30 p-4 mb-0">
        <p className="text-sm text-orange-700 font-medium mb-1">Key Takeaway</p>
        <p className="text-sm text-orange-700">
          When a buyer asks for something that does not fit neatly into one of Via Trading's direct programs, check LiquidateNow. The broader vendor base and varied merchandise types mean there may be a listing that matches what they need. Think of LN as an extension of your product catalog, not a separate platform.
        </p>
      </div>

      <AdditionalResources
        resources={[
          {
            title: 'LiquidateNow Marketplace',
            url: 'https://www.liquidatenow.com/',
            source: 'LiquidateNow.com',
            description: 'Browse current LiquidateNow listings across all product categories.',
          },
          {
            title: 'Sell Your Inventory on LiquidateNow',
            url: 'https://www.liquidatenow.com/sell/',
            source: 'LiquidateNow.com',
            description: 'Information for vendors who want to list their excess inventory on LiquidateNow.',
          },
        ]}
      />
    </SectionWrapper>
  )
}
