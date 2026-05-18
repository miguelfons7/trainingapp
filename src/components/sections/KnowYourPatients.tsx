import { useState } from 'react'
import {
  Users,
  ShoppingCart,
  Store,
  Archive,
  Tent,
  Globe,
  Building2,
  Gavel,
  Sparkles,
  ArrowDown,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { FillInBlank } from '../interactive/FillInBlank'
import { salesArchetypes } from '../../data/modules/consultative-sales/buyerArchetypesData'
import { needsHierarchy, featureBenefitNeeds } from '../../data/modules/consultative-sales/consultativeData'
import { buyerNeedsFillBlanks } from '../../data/modules/consultative-sales/inlineExercises'

const iconMap: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  Store: <Store className="w-5 h-5" />,
  Archive: <Archive className="w-5 h-5" />,
  Tent: <Tent className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  Gavel: <Gavel className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
}

export function KnowYourPatients() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

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
      id="know-your-patients"
      title="Know Your Patients"
      subtitle="A specialist studies anatomy before treating patients"
      accentColor="border-teal-500"
      icon={<Users className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Patient Profiles
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          A cardiologist studies heart conditions. A pediatrician knows child development. An
          orthopedic surgeon understands joints and bones. Before any specialist treats a patient,
          they have spent years studying the kinds of conditions they will encounter.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          As an Account Manager or BDR at Via Trading, your patients are <strong>buyers</strong>.
          And just as doctors see certain conditions over and over, you will see certain
          <strong> buyer profiles</strong> repeatedly. Understanding these archetypes (what
          drives them, what they worry about, and what signals they give) allows you to diagnose
          faster and recommend better.
        </p>
      </div>

      {/* Buyer Archetypes */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Common Buyer Archetypes
      </h3>
      <p className="text-xs text-via-text-light mb-3">
        These are some of the most common profiles you will encounter. This is a starting point,
        not an exhaustive list. Real buyers often blend traits from multiple archetypes.
      </p>
      <div className="space-y-3 mb-6">
        {salesArchetypes.map((archetype) => (
          <ExpandableCard
            key={archetype.id}
            title={archetype.name}
            subtitle={archetype.whoTheyAre.slice(0, 130) + '…'}
            icon={iconMap[archetype.icon]}
            isExpanded={expandedIds.has(archetype.id)}
            onToggle={() => toggle(archetype.id)}
            accentColor="border-teal-500"
          >
            <div className="space-y-3">
              <p className="text-sm text-via-text">{archetype.whoTheyAre}</p>

              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
                  They Care About
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {archetype.careAbout.map((item) => (
                    <Badge key={item} text={item} color="teal" />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
                  You'll Hear Things Like
                </p>
                <ul className="space-y-1">
                  {archetype.signals.map((signal, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-via-text">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                      <span className="italic">{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
                  Tailored Follow-Up Questions
                </p>
                <ul className="space-y-1">
                  {archetype.tailoredFollowUps.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-via-text">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                      <span className="italic">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-via-bg-subtle rounded-lg p-3">
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
                  AM Note
                </p>
                <p className="text-sm text-via-text">{archetype.amNote}</p>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </div>

      {/* Customer Needs Hierarchy */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          The Customer Needs Hierarchy
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Every buyer has layers of needs. The surface request ("I want cheap pallets") sits on
          top of deeper motivations. Understanding the hierarchy helps you address the real driver,
          not just the stated request.
        </p>
        <div className="space-y-2 mb-4">
          {needsHierarchy.map((level, i) => (
            <div key={level.id}>
              <div
                className="rounded-lg border p-3"
                style={{
                  borderColor: i === 0 ? '#14b8a6' : i < 3 ? '#99f6e4' : '#e2e8f0',
                  backgroundColor: i === 0 ? '#f0fdfa' : i < 3 ? '#f7fffe' : '#f8fafc',
                }}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-bold text-via-navy">{level.level}</span>
                  {i === 0 && <Badge text="Ultimate Driver" color="teal" />}
                </div>
                <p className="text-xs text-via-text">{level.description}</p>
              </div>
              {i < needsHierarchy.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="w-4 h-4 text-via-text-light" />
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-sm text-via-text leading-relaxed">
          Think of it like a medical chart. <strong>Profit</strong> is the chief complaint.{' '}
          <strong>Margin</strong> and <strong>Volume</strong> are the symptoms.{' '}
          <strong>Business drivers</strong> and <strong>personal drivers</strong> are the underlying
          conditions. The best consultative conversations uncover all layers.
        </p>
      </div>

      {/* Meeting buyers where they are */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Meeting Buyers Where They Are
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Via Trading is nimble. A first-time bin store owner with $5,000 to invest needs a
          fundamentally different conversation than a 10-truckload-per-month exporter. The
          archetypes help you calibrate, but every buyer is an individual. Use the profiles as
          starting points, not scripts. Let the buyer's actual words guide your response.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Remember: at the end of the day, we are not just selling product. We are{' '}
          <strong>solving a problem</strong> for buyers. Whether they need consistent inventory for
          their shelves, high-margin goods for online resale, or container loads for export, our job
          is to understand the problem and build value around the solution we offer.
        </p>
      </div>

      {/* Features → Benefits → Needs */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Features → Benefits → Needs
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Features describe what something <em>is</em>. Benefits describe what it <em>does for
          the buyer</em>. Needs describe what the buyer is trying to <em>accomplish</em>. The
          bridge between them is where your consultative skill lives.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Use link phrases to connect them naturally: <strong>"What that means for you is…"</strong>{' '}
          / <strong>"The advantage for your business is…"</strong> /{' '}
          <strong>"The reason that matters is…"</strong>
        </p>
        <div className="space-y-3">
          {featureBenefitNeeds.slice(0, 3).map((fbn) => (
            <div key={fbn.id} className="bg-via-bg-subtle rounded-lg p-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="font-semibold text-via-text-light uppercase tracking-wide mb-0.5">Feature</p>
                  <p className="text-via-text">{fbn.feature}</p>
                </div>
                <div>
                  <p className="font-semibold text-teal-600 uppercase tracking-wide mb-0.5">Benefit</p>
                  <p className="text-via-text">{fbn.benefit}</p>
                </div>
                <div>
                  <p className="font-semibold text-via-navy uppercase tracking-wide mb-0.5">Need</p>
                  <p className="text-via-text">{fbn.need}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline exercise */}
      <FillInBlank items={buyerNeedsFillBlanks} title="Quick Check: Buyer Needs" />
    </SectionWrapper>
  )
}
