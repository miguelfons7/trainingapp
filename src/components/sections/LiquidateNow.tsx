import { DollarSign, Users, Package, BarChart3 } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { FlowDiagram } from '../shared/FlowDiagram'

const consignmentFlow = {
  steps: ['Vendor Lists Inventory', 'LiquidateNow Markets It', 'Buyer Purchases', 'Vendor Gets Paid'],
  label: 'How Consignment Works on LiquidateNow',
  color: 'bg-orange-600',
}

export function LiquidateNow() {
  return (
    <SectionWrapper
      id="liquidatenow"
      title="LiquidateNow"
      subtitle="Consignment-based liquidation powered by Via Trading's buyer network"
      accentColor="border-orange-500"
      icon={<DollarSign className="w-5 h-5" />}
    >
      {/* What It Is */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          What Is LiquidateNow?
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          <strong>LiquidateNow.com</strong> is a consignment-based liquidation platform operated under the Via Trading Corporation umbrella. It exists to help businesses liquidate their excess, returned, or unwanted merchandise without having to sell it at a steep upfront discount to a liquidator.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Instead of Via Trading purchasing the inventory outright (which is how the traditional wholesale model works), LiquidateNow allows vendors to list their merchandise and set their own pricing expectations. LiquidateNow then markets that inventory to Via Trading's massive network of business owners around the world. When the goods sell, the vendor gets paid. It is a more flexible option for companies that want more control over how their inventory is priced and sold.
        </p>
      </div>

      {/* How It Works */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          How It Works
        </h3>
        <FlowDiagram
          steps={consignmentFlow.steps}
          label={consignmentFlow.label}
          color={consignmentFlow.color}
          highlightIndex={1}
        />
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
              <Package className="w-3.5 h-3.5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-via-navy">Vendor Lists Inventory</p>
              <p className="text-xs text-via-text-light mt-0.5">
                A retailer, manufacturer, or business with excess inventory lists their goods on LiquidateNow. They provide details about the merchandise, including category, condition, and quantity.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-3.5 h-3.5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-via-navy">LiquidateNow Markets It</p>
              <p className="text-xs text-via-text-light mt-0.5">
                This is where Via Trading's buyer network becomes the key advantage. LiquidateNow puts the inventory in front of 42,000+ business owners across 129+ countries using Via Trading's marketing platform, email campaigns, and direct Account Manager outreach.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
              <BarChart3 className="w-3.5 h-3.5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-via-navy">Buyer Purchases, Vendor Gets Paid</p>
              <p className="text-xs text-via-text-light mt-0.5">
                When a business owner purchases the inventory, LiquidateNow handles the transaction and the vendor receives payment. The vendor benefits from Via Trading's reach without having to find individual buyers themselves.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why It Matters */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Why LiquidateNow Matters
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Traditional liquidation typically works one way: a liquidator buys everything at a deep discount and the retailer moves on. That model works well in many cases, and it is the foundation of Via Trading's wholesale business. But not every company wants to sell at rock-bottom prices. Some vendors have merchandise that holds more value and they want more say in how it is priced.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          LiquidateNow gives those vendors an alternative. By tapping into Via Trading's existing buyer network and marketing infrastructure, vendors get access to a massive audience without having to build their own sales channel. It is a win for the vendor (better pricing) and a win for business owners (more inventory to choose from).
        </p>
      </div>

      {/* Connection to Via Trading */}
      <div className="bg-via-orange/10 rounded-lg border border-via-orange/30 p-4 mb-8">
        <p className="text-sm text-orange-700 font-medium mb-1">Powered by Via Trading</p>
        <p className="text-sm text-orange-700">
          LiquidateNow would not exist without Via Trading's wholesale liquidation business. The buyer network, marketing platform, and industry relationships that Via Trading built over 20+ years are what make LiquidateNow possible. Everything is connected.
        </p>
      </div>

    </SectionWrapper>
  )
}
