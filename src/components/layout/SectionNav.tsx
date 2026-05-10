import {
  TrendingDown,
  ArrowLeftRight,
  Tags,
  Package,
  Users,
  Building2,
  Star,
  BookOpen,
} from 'lucide-react'

const sections = [
  { id: 'secondary-market', label: 'Secondary Market', icon: TrendingDown, color: 'text-slate-600' },
  { id: 'reverse-logistics', label: 'Reverse Logistics', icon: ArrowLeftRight, color: 'text-indigo-600' },
  { id: 'product-conditions', label: 'Conditions', icon: Tags, color: 'text-amber-600' },
  { id: 'load-types', label: 'Load Types', icon: Package, color: 'text-emerald-600' },
  { id: 'buyer-types', label: 'Buyers', icon: Users, color: 'text-sky-600' },
  { id: 'who-is-via', label: 'Who Is Via', icon: Building2, color: 'text-blue-600' },
  { id: 'why-via', label: 'Why Via', icon: Star, color: 'text-violet-600' },
  { id: 'glossary', label: 'Glossary', icon: BookOpen, color: 'text-rose-600' },
]

interface SectionNavProps {
  activeSection: string
  onNavigate: (id: string) => void
}

export function SectionNav({ activeSection, onNavigate }: SectionNavProps) {
  return (
    <nav className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max px-4 sm:px-6">
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className={`flex items-center gap-1.5 px-3 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? `${section.color} border-current`
                    : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export { sections }
