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
  MapPin,
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
        <p className="text-sm text-via-text leading-relaxed mb-3">
          {companyStory.growth}
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Via Trading's journey is a real <strong>bootstrap story</strong>. In 2002, four people in a 6,000 square-foot warehouse on Pico Boulevard in Los Angeles had an idea: what if they could buy excess merchandise from retailers and resell it? Within two years, they'd outgrown that space and moved to a 24,000 sq ft facility on Saturn Avenue. By 2005, they needed 65,000 sq ft on Alameda Street. And by 2008, Via Trading moved into its current home — a massive facility on <strong>Industry Way in Lynwood, California</strong> that has grown to over 550,000 square feet.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Today, approximately <strong>800 pallets</strong> pass through the facility every day. Over <strong>10,000 pallets</strong> are in stock at any given time. Buyers can walk in Monday through Friday, inspect merchandise in person, and purchase on the spot — no appointment needed.
        </p>
      </div>

      {/* Warehouse Growth Timeline */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-4">
          Growth Timeline
        </h3>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-via-orange/40 via-via-orange to-via-orange/80 rounded-full" />

          <div className="space-y-5">
            {[
              { year: '2002', location: 'Pico Blvd, Los Angeles', size: '6,000 sq ft', detail: '4 employees, 1 big idea' },
              { year: '2004', location: 'Saturn Ave', size: '24,000 sq ft', detail: '4x growth in 2 years' },
              { year: '2005', location: 'Alameda St', size: '65,000 sq ft', detail: 'Expanding into international sales' },
              { year: '2008', location: 'Industry Way, Lynwood', size: '240,000 sq ft', detail: 'Current home — built for scale' },
              { year: 'Today', location: 'Industry Way (expanded)', size: '550,000+ sq ft', detail: '~800 pallets/day, 10,000+ in stock' },
            ].map((milestone) => (
              <div key={milestone.year} className="flex items-start gap-4 pl-0">
                <div className="relative z-10 w-6 h-6 rounded-full bg-via-orange/20 border-2 border-via-orange flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3 h-3 text-via-orange" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-bold text-via-orange">{milestone.year}</span>
                    <span className="text-sm font-semibold text-via-navy">{milestone.location}</span>
                  </div>
                  <p className="text-xs text-via-text mt-0.5">
                    <span className="font-medium">{milestone.size}</span>
                    <span className="text-via-text-light"> — {milestone.detail}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {retailerPartners.map((partner) => (
          <span
            key={partner}
            className="px-3 py-1.5 bg-via-card border border-via-border rounded-lg text-sm font-medium text-via-text"
          >
            {partner}
          </span>
        ))}
        <span className="text-sm font-medium text-via-orange italic">and more!</span>
      </div>

      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Team Highlights
      </h3>
      <div className="bg-via-card rounded-xl border border-via-border p-5 mb-8">
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
