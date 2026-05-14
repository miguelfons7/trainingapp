import { Heart, Shield, Eye, Star } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { companyStory, coreValues, teamHighlights } from '../../data/companyData'

export function MissionValues() {
  const valueIcons = [
    <Heart className="w-5 h-5" />,
    <Shield className="w-5 h-5" />,
    <Eye className="w-5 h-5" />,
  ]

  return (
    <SectionWrapper
      id="mission-values"
      title="Mission & Values"
      subtitle="The principles that guide everything we do at Via Trading"
      accentColor="border-via-orange"
      icon={<Star className="w-5 h-5" />}
    >
      {/* Mission Statement */}
      <div className="bg-via-orange/10 rounded-xl border border-via-orange/30 p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-orange uppercase tracking-wide mb-2">
          Our Mission
        </h3>
        <p className="text-sm text-orange-700 italic leading-relaxed">
          "{companyStory.mission}"
        </p>
      </div>

      {/* Values Intro */}
      <div className="bg-via-card rounded-xl border border-via-border p-5 mb-6">
        <p className="text-sm text-via-text leading-relaxed">
          Values aren't just words on a wall at Via Trading — they're how business gets done every day. In an industry that has historically lacked <strong>transparency</strong> and <strong>standardization</strong>, Via made a deliberate choice to operate differently. These three principles aren't just nice to have; they're the reason over <strong>90% of Via's sales</strong> come from repeat customers.
        </p>
      </div>

      {/* Core Values */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Core Values
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {coreValues.map((value, i) => (
          <div
            key={value.name}
            className="bg-via-card rounded-xl border border-via-border p-5 text-center"
          >
            <div className="w-10 h-10 rounded-full bg-via-orange/15 flex items-center justify-center mx-auto mb-3 text-via-orange">
              {valueIcons[i]}
            </div>
            <p className="text-base font-bold text-via-navy mb-1">{value.name}</p>
            <p className="text-xs text-via-text-light">{value.description}</p>
          </div>
        ))}
      </div>

      {/* What This Means in Practice */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
          What This Means in Practice
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <Heart className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-via-navy">Honesty in Every Conversation</p>
              <p className="text-xs text-via-text-light mt-0.5">
                We accurately describe product conditions and set realistic expectations. If a load contains 15% compromised items, we say so upfront — not after the sale.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-via-navy">Integrity in Every Deal</p>
              <p className="text-xs text-via-text-light mt-0.5">
                We honor our commitments. If we promise a delivery date or a specific product mix, we follow through. Our 90%+ repeat business rate is proof this approach works.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
              <Eye className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-via-navy">Transparency in Every Process</p>
              <p className="text-xs text-via-text-light mt-0.5">
                Manifested loads, clear condition descriptions, and open communication. Buyers know exactly what they're getting before committing to a purchase.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Culture */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Team Culture
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
