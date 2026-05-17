import { RotateCcw, Package, DollarSign, Truck } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { FlowDiagram } from '../shared/FlowDiagram'

const returnsFlow = {
  steps: ['Brand Ships Returns', 'WSR Processes & Sorts', 'Merchandise Recovered', 'Sold on Via Trading'],
  label: 'How WeSolveReturns Works',
  color: 'bg-emerald-600',
}

export function WeSolveReturns() {
  return (
    <SectionWrapper
      id="wesolvereturns"
      title="WeSolveReturns"
      subtitle="A return center solution for brands and companies"
      accentColor="border-emerald-500"
      icon={<RotateCcw className="w-5 h-5" />}
    >
      {/* WSR branding */}
      <div className="flex items-center gap-4 mb-6 bg-via-card rounded-xl border border-via-border p-5">
        <img
          src={`${import.meta.env.BASE_URL}images/wsr-logo.svg`}
          alt="WeSolveReturns logo"
          className="h-10"
        />
        <div className="h-8 w-px bg-via-border" />
        <img
          src={`${import.meta.env.BASE_URL}images/Warehouse aerial.png`}
          alt="Via Trading warehouse — WeSolveReturns operates from the same facility"
          className="h-16 rounded-lg object-cover"
        />
      </div>

      {/* What It Is */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          What Is WeSolveReturns?
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          <strong>WeSolveReturns.com</strong> is a return center solution for brands and companies that do not have their own returns infrastructure. Many businesses, especially e-commerce brands and mid-size retailers, struggle with what to do when customers return products. Setting up a full returns operation is expensive and complicated. WeSolveReturns solves that problem.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Instead of letting returns pile up in a warehouse, get written off, or end up in a landfill, WeSolveReturns processes those returns and offers the company a way to make money on merchandise that would otherwise be a total loss. The recovered goods are then sold through Via Trading's marketplace, where business owners around the world purchase them.
        </p>
      </div>

      {/* How It Works */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          How It Works
        </h3>
        <FlowDiagram
          steps={returnsFlow.steps}
          label={returnsFlow.label}
          color={returnsFlow.color}
          highlightIndex={1}
        />
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-via-navy">Brand Ships Returns</p>
              <p className="text-xs text-via-text-light mt-0.5">
                A brand or company sends their returned merchandise to WeSolveReturns. This could be anything from electronics and apparel to home goods and general merchandise. Rather than dealing with it themselves, they hand it off to a team that specializes in this exact process.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <Package className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-via-navy">WSR Processes and Sorts</p>
              <p className="text-xs text-via-text-light mt-0.5">
                WeSolveReturns receives the merchandise, inspects it, sorts it by condition and category, and prepares it for resale. This is the value-add: turning a pile of unsorted returns into organized, marketable inventory.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-via-navy">Merchandise Recovered and Sold</p>
              <p className="text-xs text-via-text-light mt-0.5">
                The processed merchandise is listed and sold through Via Trading's marketplace. The original brand recovers value on products that would have otherwise been a write-off. Business owners get access to more inventory at competitive prices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Problem It Solves */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          The Problem It Solves
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Returns are one of the biggest headaches in retail and e-commerce. The return rate for online purchases can be as high as 20 to 30 percent in some categories. For many companies, especially smaller brands or those without established reverse logistics operations, processing returns is expensive, time-consuming, and often not worth the effort for individual items.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          WeSolveReturns removes that burden entirely. The brand gets a returns solution without building one from scratch, and they get paid for merchandise that might otherwise end up in a landfill. It aligns perfectly with Via Trading's core belief that returned goods still have value and deserve a second life.
        </p>
      </div>

      {/* Connection to Via Trading */}
      <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-4 mb-8">
        <p className="text-sm text-emerald-700 font-medium mb-1">The Full Circle</p>
        <p className="text-sm text-emerald-700">
          WeSolveReturns feeds directly into Via Trading's supply chain. The returns it processes become inventory on ViaTrading.com, which business owners then purchase and resell. This creates a sustainable loop: brands recover value, Via Trading gets more inventory, and business owners get more product to build their businesses with.
        </p>
      </div>

    </SectionWrapper>
  )
}
