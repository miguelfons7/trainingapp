import { useState } from 'react'
import {
  ShoppingCart,
  Shirt,
  Globe,
  EyeOff,
  FileText,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { FillInBlank } from '../interactive/FillInBlank'
import { AdditionalResources } from '../shared/AdditionalResources'
import { programsByPartner } from '../../data/modules/product-knowledge/programsData'
import { walmartHdFillBlanks } from '../../data/modules/product-knowledge/inlineExercises'

const walmartPrograms = programsByPartner.walmart
const hdPrograms = programsByPartner.homeDepot

const programIcons: Record<string, React.ReactNode> = {
  'walmart-apparel': <Shirt className="w-5 h-5" />,
  'walmart-exits': <Globe className="w-5 h-5" />,
  'hd-turbo': <EyeOff className="w-5 h-5" />,
  'hd-manifested': <FileText className="w-5 h-5" />,
}

export function HomeImprovementPrograms() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['walmart-apparel']))

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const renderProgramCard = (program: (typeof walmartPrograms)[number], accentColor: string) => (
    <ExpandableCard
      key={program.id}
      title={program.name}
      subtitle={`${program.retailPartner} — ${program.condition}`}
      icon={programIcons[program.id]}
      badge={
        <Badge
          text={program.type}
          color={program.type === 'Manifested' ? 'emerald' : 'amber'}
        />
      }
      isExpanded={expandedIds.has(program.id)}
      onToggle={() => toggle(program.id)}
      accentColor={accentColor}
    >
      <div className="space-y-4">
        {/* Key Features */}
        <div>
          <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
          <ul className="space-y-1.5">
            {program.keyFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-via-text">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
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
      </div>
    </ExpandableCard>
  )

  return (
    <SectionWrapper
      id="home-improvement-programs"
      title="Walmart & Home Depot"
      subtitle="Two of Via Trading's largest retail partners"
      accentColor="border-emerald-600"
      icon={<ShoppingCart className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Walmart & Home Depot at Via Trading
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          <strong>Walmart</strong> and <strong>Home Depot</strong> are two of Via Trading's largest retail partners. Between them, they cover a wide range of product categories -- from apparel and general merchandise on the Walmart side to tools, hardware, and home improvement products from Home Depot. Both partners offer multiple programs with different pricing models, manifest types, and load sizes.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          A key distinction across these programs is the difference between <strong>manifested</strong> and <strong>unmanifested</strong> loads. Home Depot offers both formats, making it a useful example for understanding how the same retail partner can serve different buyer preferences.
        </p>
      </div>

      {/* Walmart Programs */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Walmart Programs
      </h3>
      <div className="space-y-3 mb-6">
        {walmartPrograms.map((program) => renderProgramCard(program, 'border-blue-500'))}
      </div>

      {/* Home Depot Programs */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Home Depot Programs
      </h3>
      <div className="space-y-3 mb-6">
        {hdPrograms.map((program) => renderProgramCard(program, 'border-orange-500'))}
      </div>

      {/* Manifested vs Unmanifested comparison within HD */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Home Depot: Manifested vs. Unmanifested
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Home Depot is a great example of how the same retail partner can offer both formats. The key tradeoff is <strong>transparency vs. pricing</strong>: manifested loads let the buyer see exactly what they are getting, while unmanifested loads come at a lower per-unit cost with more potential upside.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-amber-50 rounded-lg border border-amber-300 p-4">
            <p className="text-sm font-semibold text-amber-800 mb-2">HD Turbo (TRB) — Unmanifested</p>
            <ul className="space-y-1 text-xs text-amber-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                No item-level detail
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                Flat pricing: $7,800 – $10,800
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                Best for experienced tool resellers
              </li>
            </ul>
          </div>
          <div className="bg-emerald-50 rounded-lg border border-emerald-300 p-4">
            <p className="text-sm font-semibold text-emerald-800 mb-2">HD Manifested (VHD) — Manifested</p>
            <ul className="space-y-1 text-xs text-emerald-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Full item-level detail available
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                31% of wholesale value
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Good for buyers who want to know exactly what they are getting
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Inline Exercise */}
      <FillInBlank items={walmartHdFillBlanks} title="Quick Check: Walmart & Home Depot Programs" />

      <AdditionalResources
        resources={[
          {
            title: 'Walmart Wholesale Liquidation Lots',
            url: 'https://www.viatrading.com/product-category/walmart-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available Walmart liquidation loads.',
          },
          {
            title: 'Home Depot Wholesale Liquidation Lots',
            url: 'https://www.viatrading.com/product-category/home-depot-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available Home Depot liquidation loads.',
          },
        ]}
      />
    </SectionWrapper>
  )
}
