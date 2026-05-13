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
      accentColor="border-via-orange"
      icon={<Building2 className="w-5 h-5" />}
    >
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
          Our Story
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          {companyStory.founding}
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          {companyStory.growth}
        </p>
      </div>

      <div className="bg-via-orange/10 rounded-xl border border-via-orange/30 p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-orange uppercase tracking-wide mb-2">
          Our Mission
        </h3>
        <p className="text-sm text-orange-700 italic leading-relaxed">
          "{companyStory.mission}"
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          {coreValues.map((value) => (
            <div key={value.name} className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-via-orange" />
              <span className="text-sm font-medium text-orange-700">{value.name}</span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
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

      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Our Platforms
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className="bg-via-card rounded-xl border border-via-border p-4"
          >
            <p className="text-sm font-semibold text-via-orange mb-1">
              {platform.name}
            </p>
            <p className="text-xs text-via-text-light">{platform.description}</p>
          </div>
        ))}
      </div>

      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Retailer Partners
      </h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {retailerPartners.map((partner) => (
          <span
            key={partner}
            className="px-3 py-1.5 bg-via-card border border-via-border rounded-lg text-sm font-medium text-via-text"
          >
            {partner}
          </span>
        ))}
      </div>

      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Team Highlights
      </h3>
      <div className="bg-via-card rounded-xl border border-via-border p-5">
        <ul className="space-y-2">
          {teamHighlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-sm text-via-text">
              <span className="w-1.5 h-1.5 rounded-full bg-via-orange mt-1.5 shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  )
}
