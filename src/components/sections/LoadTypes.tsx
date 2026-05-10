import { useState } from 'react'
import { Package, Layers, LayoutGrid, Truck } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { loadTypes, loadTypesIntro, loadTypeInsight } from '../../data/loadTypesData'

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-5 h-5" />,
  LayoutGrid: <LayoutGrid className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
}

const sizeVisual = [
  { name: 'Case', width: 'w-12', label: '1 case' },
  { name: 'Pallet', width: 'w-20', label: '48"x48"' },
  { name: 'Multi-Pallet', width: 'w-32', label: '3-10 pallets' },
  { name: 'Truckload', width: 'w-48', label: '12-24 pallets' },
]

export function LoadTypes() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <SectionWrapper
      id="load-types"
      title="Load Types & Sizing"
      subtitle="Standard lot sizes you'll discuss in every sales conversation"
      accentColor="border-emerald-600"
      icon={<Package className="w-5 h-5" />}
    >
      <p className="text-sm text-slate-600 mb-6">{loadTypesIntro}</p>

      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Relative Size Comparison
        </p>
        <div className="flex items-end gap-3 h-24">
          {sizeVisual.map((size, i) => (
            <div key={size.name} className="flex flex-col items-center gap-1">
              <div
                className={`${size.width} bg-emerald-100 border-2 border-emerald-400 rounded transition-all`}
                style={{ height: `${(i + 1) * 20 + 10}px` }}
              />
              <span className="text-xs text-slate-600 font-medium">{size.name}</span>
              <span className="text-xs text-slate-400">{size.label}</span>
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

      <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-4">
        <p className="text-sm text-emerald-800 font-medium mb-1">Sales Insight</p>
        <p className="text-sm text-emerald-700">{loadTypeInsight}</p>
      </div>
    </SectionWrapper>
  )
}
