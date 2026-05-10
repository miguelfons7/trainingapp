import {
  Building2,
  Calendar,
  Users,
  Receipt,
  TrendingUp,
  Globe,
  Warehouse,
  Award,
  RefreshCcw,
  Heart,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { StatCard } from '../shared/StatCard'
import {
  companyStory,
  coreValues,
  keyFacts,
  platforms,
  retailerPartners,
  teamHighlights,
} from '../../data/companyData'

const iconMap: Record<string, React.ReactNode> = {
  Calendar: <Calendar className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Receipt: <Receipt className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Warehouse: <Warehouse className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  RefreshCcw: <RefreshCcw className="w-6 h-6" />,
}

export function CompanyOverview() {
  return (
    <SectionWrapper
      id="who-is-via"
      title="Who Is Via Trading"
      subtitle="Our story, our numbers, our platforms"
      accentColor="border-blue-600"
      icon={<Building2 className="w-5 h-5" />}
    >
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
          Our Story
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          {companyStory.founding}
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          {companyStory.growth}
        </p>
      </div>

      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 mb-6">
        <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-2">
          Our Mission
        </h3>
        <p className="text-sm text-blue-700 italic leading-relaxed">
          "{companyStory.mission}"
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          {coreValues.map((value) => (
            <div key={value.name} className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-sm font-medium text-blue-800">{value.name}</span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
        Key Facts
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {keyFacts.map((fact) => (
          <StatCard
            key={fact.id}
            icon={iconMap[fact.icon]}
            value={fact.value}
            label={fact.label}
          />
        ))}
      </div>

      <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
        Our Platforms
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className="bg-white rounded-xl border border-slate-200 p-4"
          >
            <p className="text-sm font-semibold text-blue-600 mb-1">
              {platform.name}
            </p>
            <p className="text-xs text-slate-500">{platform.description}</p>
          </div>
        ))}
      </div>

      <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
        Retailer Partners
      </h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {retailerPartners.map((partner) => (
          <span
            key={partner}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
          >
            {partner}
          </span>
        ))}
      </div>

      <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
        Team Highlights
      </h3>
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <ul className="space-y-2">
          {teamHighlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  )
}
