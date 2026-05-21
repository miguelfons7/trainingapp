import { useState } from 'react'
import { Package, Layers, LayoutGrid, Truck, Ship, Info } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { FillInBlank } from '../interactive/FillInBlank'
import { AdditionalResources } from '../shared/AdditionalResources'
import { SourcesCitations } from '../shared/SourcesCitations'
import { loadTypes, loadTypesIntro } from '../../data/loadTypesData'
import { loadTypesFillBlanks } from '../../data/modules/industry/inlineExercises'

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-5 h-5" />,
  LayoutGrid: <LayoutGrid className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  Ship: <Ship className="w-5 h-5" />,
}

/** Domestic lot sizes shown in the visual comparison */
const domesticSizeVisual = [
  { name: 'Case', width: 'w-12', label: '1 case' },
  { name: 'Pallet', width: 'w-20', label: '40"x48"' },
  { name: 'LTL', width: 'w-32', label: '1-6 pallets' },
  { name: 'Truckload', width: 'w-48', label: '26 pallets' },
]

/** Container capacity reference table */
const containerSizes = [
  { size: '20-foot', pallets: 10, doubleStacked: 20, heightFt: '7.95 ft' },
  { size: '40-foot', pallets: 20, doubleStacked: 40, heightFt: '7.95 ft' },
  { size: '40-foot High Cube', pallets: 20, doubleStacked: 40, heightFt: '8.95 ft' },
  { size: '45-foot High Cube', pallets: 22, doubleStacked: 44, heightFt: '8.95 ft' },
]

/** Separate domestic (case, pallet, ltl, truckload) from international (container) */
const domesticTypes = loadTypes.filter((t) => t.id !== 'container')
const containerType = loadTypes.find((t) => t.id === 'container')

export function LoadTypes() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <SectionWrapper
      id="shipping-terms"
      title="Shipping Terms"
      subtitle="Standard lot sizes, shipping formats, and logistics terminology"
      accentColor="border-emerald-600"
      icon={<Package className="w-5 h-5" />}
    >
      <p className="text-sm text-via-text mb-6">{loadTypesIntro}</p>

      {/* --- Context & why it matters --- */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Understanding lot sizes is essential for anyone at Via Trading. Whether coordinating a shipment, helping a business owner choose the right format, or managing warehouse inventory, you will encounter these terms regularly. The right lot size depends on the buyer's budget, storage capacity, business model, and experience level.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Via Trading has no minimum order, so business owners can start with a single <strong>case</strong> for a few hundred dollars and scale up to full <strong>truckloads</strong> worth tens of thousands. This flexibility is one of Via's biggest advantages, especially for new business owners who want to test the model without a massive upfront investment.
        </p>
      </div>

      {/* --- Domestic size comparison visual --- */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-4">
          Domestic Lot Sizes: Relative Comparison
        </p>
        <div className="flex items-end gap-3 h-24">
          {domesticSizeVisual.map((size, i) => (
            <div key={size.name} className="flex flex-col items-center gap-1">
              <div
                className={`${size.width} bg-emerald-100 border-2 border-emerald-500 rounded transition-all`}
                style={{ height: `${(i + 1) * 20 + 10}px` }}
              />
              <span className="text-xs text-via-text font-medium">{size.name}</span>
              <span className="text-xs text-via-text-light">{size.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- Domestic lot types --- */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Domestic Lot Sizes
      </h3>
      <div className="space-y-3 mb-6">
        {domesticTypes.map((type) => (
          <ExpandableCard
            key={type.id}
            title={type.name}
            subtitle={type.description}
            icon={iconMap[type.icon]}
            isExpanded={expandedId === type.id}
            onToggle={() =>
              setExpandedId(expandedId === type.id ? null : type.id)
            }
            accentColor="border-emerald-500"
          >
            <p>{type.details}</p>
          </ExpandableCard>
        ))}
      </div>

      {/* --- Pallet formats deep dive --- */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Common Pallet Formats
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Pallets come in several different formats. Understanding these differences matters because the format affects how merchandise is received, sorted, and resold.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-via-bg-subtle rounded-lg p-4">
            <p className="text-sm font-semibold text-via-navy mb-1">Standard Pallet</p>
            <p className="text-xs text-via-text-light">Wooden 40"x48" base with merchandise stacked and shrink-wrapped on top.</p>
          </div>
          <div className="bg-via-bg-subtle rounded-lg p-4">
            <p className="text-sm font-semibold text-via-navy mb-1">Gaylord</p>
            <p className="text-xs text-via-text-light">Large corrugated cardboard box (typically 40"x48"x48") placed on a pallet. Common for unsorted Customer Returns.</p>
          </div>
          <div className="bg-via-bg-subtle rounded-lg p-4">
            <p className="text-sm font-semibold text-via-navy mb-1">Palletized Cases</p>
            <p className="text-xs text-via-text-light">Individual case packs neatly stacked on a pallet, offering organized, category-specific lots.</p>
          </div>
          <div className="bg-via-bg-subtle rounded-lg p-4">
            <p className="text-sm font-semibold text-via-navy mb-1">Watermelon Bin</p>
            <p className="text-xs text-via-text-light">Large open-top bin on a pallet, used for bulk unsorted merchandise.</p>
          </div>
        </div>
      </div>

      {/* --- Truckload pinwheel explanation --- */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Truckload Capacity & Pinwheeling
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          A standard <strong>53-foot trailer</strong> holds <strong>26 pallets</strong> when loaded straight. However, if pallets are <strong>pinwheeled</strong> (rotated to alternate orientations, with some turned sideways), a 53-footer can fit up to <strong>28 pallets</strong>. A <strong>48-foot trailer</strong> holds <strong>22 pallets</strong> standard.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          These numbers assume standard <strong>8-foot tall pallets</strong>. Shorter pallets can be <strong>double-stacked</strong>, effectively doubling the capacity of the trailer.
        </p>
        <div className="bg-via-bg-subtle rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-via-navy">48 ft</p>
              <p className="text-xs text-via-text-light">22 pallets standard</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-via-navy">53 ft</p>
              <p className="text-xs text-via-text-light">26 standard / 28 pinwheeled</p>
            </div>
          </div>
        </div>

        {/* Hand-loaded truck photo */}
        <div className="mt-4">
          <img
            src={`${import.meta.env.BASE_URL}images/module-load-types.png`}
            alt="Sample hand-loaded trucks from Via Trading's facility"
            className="rounded-lg w-full object-contain"
          />
          <p className="text-xs text-via-text-light mt-1 text-center italic">
            Sample hand-loaded trucks from Via Trading's facility
          </p>
        </div>
      </div>

      {/* --- Ocean Containers section --- */}
      {containerType && (
        <>
          <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3 mt-8">
            International Shipping: Ocean Containers
          </h3>
          <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-via-orange mt-0.5 shrink-0">
                <Ship className="w-5 h-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-via-navy">{containerType.name}</p>
                <p className="text-sm text-via-text leading-relaxed mt-1">
                  {containerType.description}
                </p>
              </div>
            </div>

            <p className="text-sm text-via-text leading-relaxed mb-4">
              {containerType.details}
            </p>

            {/* Container size table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-via-navy/5">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-via-navy uppercase tracking-wide border-b border-via-border">Container Size</th>
                    <th className="text-center px-4 py-2.5 text-xs font-semibold text-via-navy uppercase tracking-wide border-b border-via-border">Pallet Positions</th>
                    <th className="text-center px-4 py-2.5 text-xs font-semibold text-via-navy uppercase tracking-wide border-b border-via-border">Double-Stacked</th>
                    <th className="text-center px-4 py-2.5 text-xs font-semibold text-via-navy uppercase tracking-wide border-b border-via-border">Interior Height</th>
                  </tr>
                </thead>
                <tbody>
                  {containerSizes.map((c, i) => (
                    <tr key={c.size} className={i % 2 === 0 ? 'bg-white' : 'bg-via-bg-subtle/50'}>
                      <td className="px-4 py-2.5 font-medium text-via-navy border-b border-via-border/50">{c.size}</td>
                      <td className="px-4 py-2.5 text-center text-via-text border-b border-via-border/50">{c.pallets}</td>
                      <td className="px-4 py-2.5 text-center text-via-text border-b border-via-border/50">{c.doubleStacked}</td>
                      <td className="px-4 py-2.5 text-center text-via-text border-b border-via-border/50">{c.heightFt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-via-bg-subtle rounded-lg p-4 mt-4">
              <p className="text-xs text-via-text leading-relaxed">
                <strong>Hand-loading:</strong> Containers can also be hand-loaded (without pallets) to significantly increase capacity, sometimes by 2 to 3 times. Whether a container is hand-loaded depends on the merchandise type, destination, and the business owner's preferences.
              </p>
            </div>
          </div>
        </>
      )}

      {/* --- Key Shipping Terms --- */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          Key Shipping Terms
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          You will encounter these terms regularly when discussing logistics with business owners and coordinating shipments.
        </p>
        <div className="space-y-3">
          <div className="border-l-3 border-emerald-500 pl-4">
            <p className="text-sm font-semibold text-via-navy">FOB (Freight on Board)</p>
            <p className="text-xs text-via-text-light">Indicates the location where merchandise is available for pickup or shipping. Helps business owners calculate freight costs and also reveals whether a transaction is direct or brokered.</p>
          </div>
          <div className="border-l-3 border-emerald-500 pl-4">
            <p className="text-sm font-semibold text-via-navy">BOL (Bill of Lading)</p>
            <p className="text-xs text-via-text-light">Shipping paperwork that accompanies a delivery. The recipient signs the BOL upon receipt. Always inspect shipments and note any visible damage on the BOL before signing.</p>
          </div>
          <div className="border-l-3 border-emerald-500 pl-4">
            <p className="text-sm font-semibold text-via-navy">Lift-Gate</p>
            <p className="text-xs text-via-text-light">A hydraulic platform at the rear of a delivery truck used to lower pallets to ground level. Required when there is no loading dock or forklift. Typically carries an additional surcharge.</p>
            <img
              src={`${import.meta.env.BASE_URL}images/liftgate.jpg`}
              alt="A hydraulic lift-gate on the rear of a delivery truck"
              className="mt-2 rounded-lg w-full max-w-md aspect-video object-contain bg-[#e8eaee]"
            />
          </div>
          <div className="border-l-3 border-emerald-500 pl-4">
            <p className="text-sm font-semibold text-via-navy">Loading Dock</p>
            <p className="text-xs text-via-text-light">A raised platform at a warehouse or business where trucks back up to unload. Without a dock, a lift-gate is needed for pallet deliveries.</p>
          </div>
          <div className="border-l-3 border-emerald-500 pl-4">
            <p className="text-sm font-semibold text-via-navy">Double-Stacked</p>
            <p className="text-xs text-via-text-light">Placing one pallet on top of another inside a truck or container to maximize capacity. Only possible with shorter pallets that fit within height limits.</p>
          </div>
          <div className="border-l-3 border-emerald-500 pl-4">
            <p className="text-sm font-semibold text-via-navy">Landed Cost</p>
            <p className="text-xs text-via-text-light">The total cost of merchandise including purchase price plus all costs to receive it: shipping, customs fees, taxes, and any other charges. Essential for calculating true profit margins.</p>
          </div>
          <div className="border-l-3 border-emerald-500 pl-4">
            <p className="text-sm font-semibold text-via-navy">Direct Shipment</p>
            <p className="text-xs text-via-text-light">A shipment sent directly from the retailer's facility to the buyer, without stopping at Via Trading's warehouse. This can reduce transit time and handling.</p>
          </div>
        </div>
      </div>

      {/* --- Upcoming course note --- */}
      <div className="bg-via-navy/5 rounded-lg border border-via-navy/10 p-4 mb-6 flex items-start gap-3">
        <Info className="w-5 h-5 text-via-navy shrink-0 mt-0.5" />
        <p className="text-sm text-via-text leading-relaxed">
          This module covers the basics of shipping terminology and lot sizes. A more in-depth <strong>Shipping & Logistics</strong> course will go deeper into freight management, costs, carrier selection, and best practices.
        </p>
      </div>

      {/* Inline exercise */}
      <FillInBlank items={loadTypesFillBlanks} title="Quick Check: Complete the Sentences" />

      {/* --- Additional Resources --- */}
      <AdditionalResources
        resources={[
          {
            title: 'How to Minimize Your Wholesale Shipping Costs',
            url: 'https://www.viatrading.com/how-to-minimize-your-wholesale-shipping-costs/',
            source: 'ViaTrading.com',
            description: 'Practical tips for reducing freight costs, including landed cost calculations and lot size strategies.',
          },
          {
            title: 'Shipping Information for the Wholesale Liquidation Industry',
            url: 'https://www.viatrading.com/shipping-information/',
            source: 'ViaTrading.com',
            description: 'Detailed shipping options, container sizes, and delivery logistics for liquidation buyers.',
          },
          {
            title: 'Glossary of Industry Terms',
            url: 'https://www.viatrading.com/glossary-of-industry-terms/',
            source: 'ViaTrading.com',
            description: 'Comprehensive glossary covering packing, shipping, industry, and payment terminology.',
          },
        ]}
      />

      {/* --- Sources --- */}
      <SourcesCitations
        citations={[
          {
            id: 'via-shipping',
            text: 'Via Trading: Shipping Information for the Wholesale Liquidation Industry.',
            url: 'https://www.viatrading.com/shipping-information/',
          },
          {
            id: 'via-shipping-costs',
            text: 'Via Trading: How to Minimize Your Wholesale Shipping Costs.',
            url: 'https://www.viatrading.com/how-to-minimize-your-wholesale-shipping-costs/',
          },
          {
            id: 'via-glossary',
            text: 'Via Trading: Glossary of Industry Terms (packing, shipping, and business terminology).',
            url: 'https://www.viatrading.com/glossary-of-industry-terms/',
          },
        ]}
      />
    </SectionWrapper>
  )
}
