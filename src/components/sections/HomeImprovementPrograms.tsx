import { useState } from 'react'
import {
  Home,
  Wrench,
  FileText,
  EyeOff,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { FillInBlank } from '../interactive/FillInBlank'
import { AdditionalResources } from '../shared/AdditionalResources'
import { programsByPartner } from '../../data/modules/product-knowledge/programsData'
import { homeImprovementFillBlanks } from '../../data/modules/product-knowledge/inlineExercises'

const homePrograms = programsByPartner.homeImprovement

const programIcons: Record<string, React.ReactNode> = {
  lowes: <Home className="w-5 h-5" />,
  'hd-turbo': <EyeOff className="w-5 h-5" />,
  'hd-manifested': <FileText className="w-5 h-5" />,
}

const lowesFobLocations = [
  { location: 'California', code: 'CA', notes: 'Primary hub; viewable at LA facility' },
  { location: 'Oregon', code: 'OR', notes: 'Pacific Northwest sourcing' },
  { location: 'Wyoming', code: 'WY', notes: 'Mountain region sourcing' },
  { location: 'North Carolina', code: 'NC', notes: 'East Coast sourcing' },
]

export function HomeImprovementPrograms() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['lowes']))

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
      id="home-improvement-programs"
      title="Home Improvement Programs"
      subtitle="Lowes and Home Depot — tools, hardware, and home improvement merchandise"
      accentColor="border-emerald-600"
      icon={<Wrench className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Home Improvement at Via Trading
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Via Trading works with two of the largest home improvement retailers in the United States: <strong>Lowes</strong> and <strong>Home Depot</strong>. These programs are popular with buyers who specialize in tools, hardware, building materials, and home improvement products. The merchandise tends to have strong brand recognition and consistent demand.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          A key distinction within these programs is the difference between <strong>manifested</strong> and <strong>unmanifested</strong> loads. Home Depot actually offers both formats, letting you compare the two side by side within the same retail partner.
        </p>
      </div>

      {/* Program Cards */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Programs
      </h3>
      <div className="space-y-3 mb-6">
        {homePrograms.map((program) => (
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
            accentColor="border-emerald-500"
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

              {/* Lowes FOB Locations Table */}
              {program.id === 'lowes' && (
                <div>
                  <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-3">
                    FOB Locations
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-via-navy/5">
                          <th className="text-left px-4 py-2.5 text-xs font-semibold text-via-navy uppercase tracking-wide border-b border-via-border">Location</th>
                          <th className="text-center px-4 py-2.5 text-xs font-semibold text-via-navy uppercase tracking-wide border-b border-via-border">Code</th>
                          <th className="text-left px-4 py-2.5 text-xs font-semibold text-via-navy uppercase tracking-wide border-b border-via-border">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lowesFobLocations.map((loc, i) => (
                          <tr key={loc.code} className={i % 2 === 0 ? 'bg-white' : 'bg-via-bg-subtle/50'}>
                            <td className="px-4 py-2.5 font-medium text-via-navy border-b border-via-border/50">{loc.location}</td>
                            <td className="px-4 py-2.5 text-center text-via-text border-b border-via-border/50">{loc.code}</td>
                            <td className="px-4 py-2.5 text-via-text-light border-b border-via-border/50">{loc.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </ExpandableCard>
        ))}
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
      <FillInBlank items={homeImprovementFillBlanks} title="Quick Check: Home Improvement Programs" />

      <AdditionalResources
        resources={[
          {
            title: 'Lowes Wholesale Liquidation Lots',
            url: 'https://www.viatrading.com/product-category/lowes-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available Lowes liquidation loads.',
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
