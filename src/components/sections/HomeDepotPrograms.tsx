import { useState } from 'react'
import { Wrench, EyeOff, FileText } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { FillInBlank } from '../interactive/FillInBlank'
import { AdditionalResources } from '../shared/AdditionalResources'
import { homeDepotFillBlanks } from '../../data/modules/product-knowledge/inlineExercises'

export function HomeDepotPrograms() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['hd-turbo']))

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
      id="home-depot-programs"
      title="Home Depot Programs"
      subtitle="Tools, hardware, and home improvement loads in both manifested and unmanifested formats"
      accentColor="border-orange-500"
      icon={<Wrench className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Home Depot at Via Trading
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Home Depot is a key retail partner focused on <strong>tools, hardware, and home improvement</strong> products. Via Trading offers two distinct Home Depot programs: <strong>HD Turbo (TRB)</strong>, which is unmanifested, and <strong>HD Manifested (VHD)</strong>, which provides full item-level detail.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Home Depot is a great example of how the same retailer can offer both manifested and unmanifested options. The key tradeoff is <strong>transparency vs. pricing</strong>: manifested loads let the buyer see exactly what they are getting, while unmanifested loads come at a lower per-unit cost with more potential upside.
        </p>
        <div className="mt-4 rounded-lg overflow-hidden border border-via-border">
          <img src={`${import.meta.env.BASE_URL}images/program-hd.webp`} alt="Home Depot tools and hardware liquidation loads" className="w-full h-48 object-cover" />
          <p className="text-xs text-via-text-light p-2 text-center">Sample Home Depot load</p>
        </div>
      </div>

      {/* Program Cards */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Home Depot Sub-Programs
      </h3>
      <div className="space-y-3 mb-6">
        {/* HD Turbo (TRB) */}
        <ExpandableCard
          title="HD Turbo (TRB)"
          subtitle="Unmanifested Customer Returns"
          icon={<EyeOff className="w-5 h-5" />}
          badge={<Badge text="Unmanifested" color="amber" />}
          isExpanded={expandedIds.has('hd-turbo')}
          onToggle={() => toggle('hd-turbo')}
          accentColor="border-orange-500"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                HD Turbo is Via Trading's unmanifested Home Depot program. These loads are <strong>As-Is Customer Returns and will include Defective merchandise</strong>. No item-level detail is provided. The flat pricing model makes TRB a strong option for experienced tool resellers who are comfortable buying without a manifest.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  <strong>Unmanifested</strong> — no item-level detail provided
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  Tools and hardware focused
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  Flat pricing model — predictable cost per load
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  Loads include varying % of New Overstock and Shelf Pull Merchandise
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  There is no guarantee of items, pallet heights, value or unit counts
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  Best for experienced tool resellers
                </li>
              </ul>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Price Range</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">$7,800 – $10,800</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Phoenix, AZ</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Category</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Tools & Hardware</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Pricing Model</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Flat Rate per Load</p>
              </div>
            </div>

            {/* Products */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p>
              <p className="text-xs text-via-text-light leading-relaxed">
                Shower Heads, Wet/Dry Vacuum, Heater Fan, Mower, Range Hood, Locks, Sprayer, Welding Helmet, Hammer, Scales, Security Light, Vents, Boots, Night Light, Paint Kits, Ceiling Fans, Fans, Bins, Patio Furniture, Lighting, Tool Cabinets, Leaf Blowers, Flooring, Shelving, Faucets, Reciprocating Saws, Hose, Storage Units, Water Filters, Air Filters, Door Handles, Fire Pits, Mail Box, and more
              </p>
            </div>

            {/* Brands */}
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Brands</p>
              <p className="text-xs text-via-text-light leading-relaxed">
                Wagner, Moen, Milwaukee, Husky, Hampton Bay, Hoover, Lasko, Ryobi, 3M, Halo, FEIT Electric, Dewalt, Ridgid, NuTone, Defiant, Echo, Siemens
              </p>
            </div>
          </div>
        </ExpandableCard>

        {/* HD Manifested (VHD) */}
        <ExpandableCard
          title="HD Manifested (VHD)"
          subtitle="Manifested Customer Returns"
          icon={<FileText className="w-5 h-5" />}
          badge={<Badge text="Manifested" color="emerald" />}
          isExpanded={expandedIds.has('hd-manifested')}
          onToggle={() => toggle('hd-manifested')}
          accentColor="border-orange-500"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p>
              <p className="text-sm text-via-text leading-relaxed">
                HD Manifested is Via Trading's manifested Home Depot program. Buyers receive full item-level detail before purchasing, making it a good fit for buyers who want to know exactly what they are getting. Pricing is based on a percentage of wholesale value rather than a flat rate.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  <strong>Manifested</strong> — full item-level detail available before purchase
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  Priced at 31% of wholesale value
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  Tools, hardware, and home improvement products
                </li>
                <li className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  Good for buyers who want visibility into exactly what they are getting
                </li>
              </ul>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Price Range</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">$2,200 – $14,800</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Various US Locations</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Category</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">Tools & Home Improvement</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Pricing Model</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">31% of Wholesale Value</p>
              </div>
            </div>
          </div>
        </ExpandableCard>
      </div>

      {/* Comparison Card */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Manifested vs. Unmanifested: A Side-by-Side Look
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
                Good for buyers wanting visibility
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Inline Exercise */}
      <FillInBlank items={homeDepotFillBlanks} title="Quick Check: Home Depot Programs" />

      <AdditionalResources
        resources={[
          {
            title: 'Home Depot Wholesale Liquidation Lots',
            url: 'https://www.viatrading.com/product-category/home-depot-wholesale-liquidation/',
            source: 'ViaTrading.com',
            description: 'Browse currently available Home Depot liquidation loads on Via Trading\'s marketplace.',
          },
        ]}
      />
    </SectionWrapper>
  )
}
