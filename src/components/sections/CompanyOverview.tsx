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
  MapPin,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { InlineImage } from '../shared/InlineImage'
import { StatCard } from '../shared/StatCard'
import {
  companyStory,
  keyFacts,
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
      title="Our Story"
      subtitle="How Via Trading grew from a small warehouse to an industry leader"
      accentColor="border-via-orange"
      icon={<Building2 className="w-5 h-5" />}
    >
      {/* Via Trading Corporation Umbrella */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6 overflow-hidden">
        <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
          Via Trading Corporation
        </h3>
        <InlineImage src="inline-warehouse-workers.jpg" alt="Warehouse operations" float="right" size="medium" caption="Via Trading warehouse operations" />
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Via Trading Corporation is the parent umbrella company that houses three operating entities, with more branches on the way:
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-via-orange mt-1.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-via-navy">Via Trading</p>
              <p className="text-xs text-via-text-light mt-0.5">
                The core wholesale liquidation business. Via Trading buys excess and returned merchandise from major retailers and sells it to business owners around the world. Over two decades, it has built a massive buyer network spanning 129+ countries.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-via-orange mt-1.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-via-navy">LiquidateNow</p>
              <p className="text-xs text-via-text-light mt-0.5">
                A consignment-based liquidation platform that leverages Via Trading's established buyer network and marketing infrastructure. Retailers and manufacturers list their inventory, and LiquidateNow connects them directly with qualified buyers.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-via-orange mt-1.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-via-navy">WeSolveReturns</p>
              <p className="text-xs text-via-text-light mt-0.5">
                A return center solution for brands that do not have their own returns infrastructure. WeSolveReturns processes and generates revenue from returned merchandise, which is then sold through Via Trading's marketplace.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Founding Story */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
          How It All Started
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          {companyStory.founding}
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          {companyStory.growth}
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Via Trading's journey is a real <strong>bootstrap story</strong>. In 2002, four people in a 6,000 square-foot warehouse on Pico Boulevard in Los Angeles had an idea: what if they could buy excess merchandise from retailers and resell it? Within two years, they had outgrown that space and moved to a 24,000 sq ft facility on Saturn Avenue. By 2005, they needed 65,000 sq ft on Alameda Street. And by 2008, Via Trading moved into its current home, a massive facility on <strong>Industry Way in Lynwood, California</strong> that has grown to 250,000 square feet of physical space and over 550,000 square feet with rack space.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Today, approximately <strong>800 pallets</strong> pass through the facility every day. Over <strong>10,000 pallets</strong> are in stock at any given time. Business owners can walk in Monday through Friday, inspect merchandise in person, and purchase on the spot, no appointment needed.
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
              { year: '2008', location: 'Industry Way, Lynwood', size: '250,000 sq ft', detail: 'Current home, built for scale' },
              { year: 'Today', location: 'Industry Way (expanded)', size: '250,000 sq ft warehouse (550,000+ sq ft with rack space)', detail: 'About 800 pallets per day, 10,000+ in stock' },
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
                    {milestone.detail && (
                      <span className="text-via-text-light"> &middot; {milestone.detail}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warehouse aerial photo */}
      <div className="mb-6">
        <img
          src={`${import.meta.env.BASE_URL}images/Warehouse aerial.png`}
          alt="Aerial view of Via Trading's 250,000 sq ft warehouse in Lynwood, California"
          className="rounded-xl w-full object-contain"
        />
        <p className="text-xs text-via-text-light mt-1 text-center italic">
          Via Trading's 250,000 sq ft warehouse in Lynwood, California
        </p>
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
