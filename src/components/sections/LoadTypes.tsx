import { useState } from 'react'
import { Package, Layers, LayoutGrid, Truck } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { FillInBlank } from '../interactive/FillInBlank'
import { loadTypes, loadTypesIntro } from '../../data/loadTypesData'
import { loadTypesFillBlanks } from '../../data/modules/industry/inlineExercises'

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-5 h-5" />,
  LayoutGrid: <LayoutGrid className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
}

const sizeVisual = [
  { name: 'Case', width: 'w-12', label: '1 case' },
  { name: 'Pallet', width: 'w-20', label: '48"x48"' },
  { name: 'LTL', width: 'w-32', label: '1-6 pallets' },
  { name: 'Truckload', width: 'w-48', label: '22-26 pallets' },
]

export function LoadTypes() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <SectionWrapper
      id="load-types"
      title="Load Types & Sizing"
      subtitle="Standard lot sizes and shipping formats"
      accentColor="border-emerald-600"
      icon={<Package className="w-5 h-5" />}
    >
      <p className="text-sm text-via-text mb-6">{loadTypesIntro}</p>

      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Understanding lot sizes is essential for anyone at Via Trading. Whether coordinating a shipment, helping a customer choose the right format, or managing warehouse inventory, you will encounter these terms regularly. The right lot size depends on the buyer's budget, storage capacity, business model, and experience level.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Via Trading has no minimum order — buyers can start with a single <strong>case</strong> for a few hundred dollars and scale up to full <strong>truckloads</strong> worth tens of thousands. This flexibility is one of Via's biggest advantages, especially for new buyers who want to test the business without a massive upfront investment.
        </p>
      </div>

      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-4">
          Relative Size Comparison
        </p>
        <div className="flex items-end gap-3 h-24">
          {sizeVisual.map((size, i) => (
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

      <div className="space-y-3 mb-6">
        {loadTypes.map((type) => (
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

      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-sm text-via-text leading-relaxed">
          Pallets deserve a closer look since they come in several different formats. Understanding these differences matters because the format affects how merchandise is received, sorted, and resold. A <strong>standard pallet</strong> is a wooden 48"×48" base with merchandise stacked and shrink-wrapped on top. A <strong>Gaylord</strong> is a large corrugated cardboard box (typically 40"×48"×48") placed on a pallet — common for unsorted <strong>Customer Returns</strong> where items are loose. <strong>Palletized cases</strong> are individual case packs neatly stacked on a pallet, offering more organized, category-specific lots. And <strong>Watermelon Bins</strong> are large open-top bins on pallets used for bulk unsorted merchandise.
        </p>
      </div>

      {/* Inline exercise */}
      <FillInBlank items={loadTypesFillBlanks} title="Quick Check: Complete the Sentences" />
    </SectionWrapper>
  )
}
