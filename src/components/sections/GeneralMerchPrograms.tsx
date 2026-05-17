import { useState } from 'react'
import {
  ShoppingCart,
  Package,
  Sofa,
  Footprints,
  Store,
  Layers,
  Wrench,
  Info,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { AdditionalResources } from '../shared/AdditionalResources'
import { programsByPartner, retailPrograms } from '../../data/modules/product-knowledge/programsData'

const programIcons: Record<string, React.ReactNode> = {
  amazon: <Package className="w-5 h-5" />,
  wayfair: <Sofa className="w-5 h-5" />,
  zappos: <Footprints className="w-5 h-5" />,
  'sams-club': <Store className="w-5 h-5" />,
  lowes: <Wrench className="w-5 h-5" />,
  costway: <Sofa className="w-5 h-5" />,
  'tools-thf': <Package className="w-5 h-5" />,
  jcp: <Store className="w-5 h-5" />,
  boscovs: <Store className="w-5 h-5" />,
  albertsons: <Store className="w-5 h-5" />,
}

/** Render a single program as an ExpandableCard with full details */
function ProgramCard({
  program,
  isExpanded,
  onToggle,
  accentColor,
  bulletColor,
  callout,
}: {
  program: (typeof retailPrograms)[number]
  isExpanded: boolean
  onToggle: () => void
  accentColor: string
  bulletColor: string
  callout?: React.ReactNode
}) {
  return (
    <ExpandableCard
      title={program.name}
      subtitle={`${program.retailPartner} — ${program.condition}`}
      icon={programIcons[program.id] || <Layers className="w-5 h-5" />}
      badge={
        <Badge
          text={program.type}
          color={
            program.type === 'Manifested'
              ? 'emerald'
              : program.type === 'Unmanifested'
                ? 'amber'
                : 'blue'
          }
        />
      }
      isExpanded={isExpanded}
      onToggle={onToggle}
      accentColor={accentColor}
    >
      <div className="space-y-4">
        {/* Key Features */}
        <div>
          <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
          <ul className="space-y-1.5">
            {program.keyFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-via-text">
                <span className={`w-1.5 h-1.5 rounded-full ${bulletColor} mt-1.5 shrink-0`} />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-via-bg-subtle rounded-lg p-3">
            <p className="text-xs text-via-text-light uppercase tracking-wide">Price Range</p>
            <p className="text-sm font-semibold text-via-navy mt-0.5">{program.priceRange}</p>
          </div>
          <div className="bg-via-bg-subtle rounded-lg p-3">
            <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
            <p className="text-sm font-semibold text-via-navy mt-0.5">{program.fob}</p>
          </div>
          <div className="bg-via-bg-subtle rounded-lg p-3">
            <p className="text-xs text-via-text-light uppercase tracking-wide">Category</p>
            <p className="text-sm font-semibold text-via-navy mt-0.5">{program.category}</p>
          </div>
          <div className="bg-via-bg-subtle rounded-lg p-3">
            <p className="text-xs text-via-text-light uppercase tracking-wide">Pricing Model</p>
            <p className="text-sm font-semibold text-via-navy mt-0.5">{program.pricingModel}</p>
          </div>
        </div>

        {/* Products & Brands */}
        <div>
          <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p>
          <p className="text-xs text-via-text-light leading-relaxed">{program.products}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Brands</p>
          <p className="text-xs text-via-text-light leading-relaxed">{program.brands}</p>
        </div>

        {/* Optional callout */}
        {callout}
      </div>
    </ExpandableCard>
  )
}

export function GeneralMerchPrograms() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <SectionWrapper
      id="general-merch-programs"
      title="Amazon, Wayfair, Zappos & More"
      subtitle="Additional key retail partners — from general merchandise to furniture and footwear"
      accentColor="border-indigo-500"
      icon={<ShoppingCart className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Beyond Target & Home Improvement
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Via Trading partners with a broad set of retailers beyond Target and the home improvement stores. These programs cover general merchandise, furniture, footwear, and specialty categories. Some offer manifested loads with full item detail, while others are unmanifested with flat pricing.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          This section covers <strong>Amazon</strong>, <strong>Wayfair</strong>, <strong>Zappos</strong>, <strong>Sam's Club</strong>, and several other specialty partners including Lowes, Costway, JCPenney, and more.
        </p>
      </div>

      {/* ── Amazon ── */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-2">Amazon</h3>
        <p className="text-sm text-via-text-light mb-3">
          Mixed manifested and unmanifested options with a broad product range. Amazon loads are available from single pallets to full truckloads, making them flexible for buyers of all sizes.
        </p>
        <div className="space-y-3">
          {programsByPartner.amazon.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              isExpanded={expandedIds.has(program.id)}
              onToggle={() => toggle(program.id)}
              accentColor="border-indigo-500"
              bulletColor="bg-indigo-500"
            />
          ))}
        </div>
      </div>

      {/* ── Wayfair ── */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-2">Wayfair</h3>
        <p className="text-sm text-via-text-light mb-3">
          Manifested, furniture-focused loads priced as a percentage of retail. Wayfair is one of the leading online furniture retailers, and its liquidation program provides access to a wide range of home furnishings.
        </p>
        <div className="space-y-3">
          {programsByPartner.wayfair.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              isExpanded={expandedIds.has(program.id)}
              onToggle={() => toggle(program.id)}
              accentColor="border-violet-500"
              bulletColor="bg-violet-500"
            />
          ))}
        </div>
      </div>

      {/* ── Zappos ── */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-2">Zappos</h3>
        <p className="text-sm text-via-text-light mb-3">
          Manifested footwear and apparel loads priced as a percentage of retail. Zappos is well known for its generous return policy, which produces a consistent stream of quality customer returns.
        </p>
        <div className="space-y-3">
          {programsByPartner.zappos.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              isExpanded={expandedIds.has(program.id)}
              onToggle={() => toggle(program.id)}
              accentColor="border-teal-500"
              bulletColor="bg-teal-500"
              callout={
                <div className="bg-sky-50 rounded-lg border border-sky-300 p-3 flex items-start gap-2">
                  <Info className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-sky-700">
                    <strong>WSR Program:</strong> Zappos is actually part of Via Trading's WeSolveReturns (WSR) program, which processes returns for brands that don't have their own returns infrastructure. This means the Zappos relationship is managed through WSR rather than as a direct retail partnership.
                  </p>
                </div>
              }
            />
          ))}
        </div>
      </div>

      {/* ── Sam's Club ── */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-2">Sam's Club</h3>
        <p className="text-sm text-via-text-light mb-3">
          Manifested general merchandise loads priced at 20-35% of retail value. Sam's Club loads cover a broad assortment of products and come in a wide range of lot sizes.
        </p>
        <div className="space-y-3">
          {programsByPartner.samsClub.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              isExpanded={expandedIds.has(program.id)}
              onToggle={() => toggle(program.id)}
              accentColor="border-indigo-500"
              bulletColor="bg-indigo-500"
            />
          ))}
        </div>
      </div>

      {/* ── Other Partners ── */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-2">Other Partners</h3>
        <p className="text-sm text-via-text-light mb-3">
          Via Trading also works with several additional retail partners. These programs tend to be more specialized and may appeal to buyers looking for specific product categories.
        </p>

        {/* Lowes highlight card */}
        <div className="bg-via-card rounded-xl border border-via-border p-5 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-4 h-4 text-via-text-light" />
            <span className="text-sm font-semibold text-via-navy">Lowes (LWS)</span>
            <Badge text="Unmanifested" color="amber" />
          </div>
          <p className="text-sm text-via-text leading-relaxed mb-2">
            Home improvement customer returns with 22-26 pallets per load. Lowes loads include products like fans, toilets, patio furniture, lighting, tool cabinets, and more.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="bg-via-bg-subtle rounded-lg p-2.5">
              <p className="text-xs text-via-text-light uppercase tracking-wide">Price</p>
              <p className="text-sm font-semibold text-via-navy mt-0.5">$4,850 – $4,950/load</p>
            </div>
            <div className="bg-via-bg-subtle rounded-lg p-2.5">
              <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
              <p className="text-sm font-semibold text-via-navy mt-0.5">CA, OR, WY, NC</p>
            </div>
          </div>
          <p className="text-xs text-via-text-light">
            <strong>Key detail:</strong> Multiple FOB locations available, and loads can be floor-loaded into ocean containers for export. Viewable at the LA facility.
          </p>
        </div>

        {/* Costway highlight card */}
        <div className="bg-via-card rounded-xl border border-via-border p-5 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Sofa className="w-4 h-4 text-via-text-light" />
            <span className="text-sm font-semibold text-via-navy">Costway</span>
            <Badge text="Unmanifested" color="amber" />
          </div>
          <p className="text-sm text-via-text leading-relaxed mb-2">
            Furniture and home/patio customer returns. Costway is an online-first furniture retailer with loads available from California and New Jersey.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-via-bg-subtle rounded-lg p-2.5">
              <p className="text-xs text-via-text-light uppercase tracking-wide">Price</p>
              <p className="text-sm font-semibold text-via-navy mt-0.5">From $6,875/load</p>
            </div>
            <div className="bg-via-bg-subtle rounded-lg p-2.5">
              <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
              <p className="text-sm font-semibold text-via-navy mt-0.5">CA, NJ</p>
            </div>
          </div>
        </div>

        {/* Brief mentions of remaining specialty programs */}
        <div className="bg-via-card rounded-xl border border-via-border p-5">
          <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-3">Additional Specialty Programs</p>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2 text-sm text-via-text">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
              <span>
                <strong>JCPenney (JCP)</strong> — Manifested housewares and hardgoods, priced as a percentage of retail.
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-via-text">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
              <span>
                <strong>Boscov's (BV)</strong> — Manifested department store merchandise at 9-12% of retail, among the lowest pricing models across all programs.
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-via-text">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
              <span>
                <strong>Albertsons / CTC (CTC)</strong> — Manifested general merchandise at 29-35% of retail, approximately $25K per load.
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-via-text">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
              <span>
                <strong>THF Tools</strong> — Manifested tools and hardware loads at 23% of retail.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Summary callout */}
      <div className="bg-via-orange/10 rounded-lg border border-via-orange/30 p-4 mb-0">
        <p className="text-sm text-orange-700 font-medium mb-1">Program Breadth</p>
        <p className="text-sm text-orange-700">
          Via Trading's strength lies in the breadth and diversity of its program catalog. Whether a buyer is looking for general merchandise, furniture, footwear, tools, or specialty goods, there is likely a program that fits. Understanding this full range makes it easier to match every buyer with the right product at the right price point.
        </p>
      </div>

      <AdditionalResources
        resources={[
          {
            title: 'All Wholesale Liquidation Lots',
            url: 'https://www.viatrading.com/product-category/all-wholesale-lots/',
            source: 'ViaTrading.com',
            description: 'Browse all available wholesale liquidation lots across every retail partner.',
          },
          {
            title: 'Amazon Wholesale Liquidation',
            url: 'https://www.viatrading.com/product-category/amazon-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available Amazon liquidation loads.',
          },
          {
            title: 'Wayfair Wholesale Liquidation',
            url: 'https://www.viatrading.com/product-category/wayfair-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available Wayfair liquidation loads.',
          },
        ]}
      />
    </SectionWrapper>
  )
}
