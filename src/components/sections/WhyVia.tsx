import { useState } from 'react'
import {
  Star,
  FileCheck,
  UserCheck,
  Building2,
  DoorOpen,
  DollarSign,
  Zap,
  GraduationCap,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { AdditionalResources } from '../shared/AdditionalResources'
import { InlineImage } from '../shared/InlineImage'
import { advantages } from '../../data/advantagesData'

const iconMap: Record<string, React.ReactNode> = {
  FileCheck: <FileCheck className="w-5 h-5" />,
  UserCheck: <UserCheck className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  DoorOpen: <DoorOpen className="w-5 h-5" />,
  DollarSign: <DollarSign className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
}

export function WhyVia() {
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
      id="why-via"
      title="Why Business Owners Choose Via"
      subtitle="The key advantages that make Via Trading a leader in the liquidation industry"
      accentColor="border-violet-500"
      icon={<Star className="w-5 h-5" />}
    >
      <div className="bg-via-card rounded-xl border border-via-border p-5 mb-6 overflow-hidden">
        <InlineImage src="via-sales-team.jpg" alt="Via Trading Sales Team" float="right" size="small" caption="The Via Trading sales team" />
        <p className="text-sm text-via-text leading-relaxed">
          Here is what makes Via Trading different from other companies in the liquidation space. These are not marketing slogans; they are <strong>real operational advantages</strong> that make a tangible difference for business owners. Many customers work with multiple suppliers simultaneously, and Via often becomes their <strong>primary source</strong> because of consistent pricing, reliable inventory, and the dedicated <strong>Account Manager relationship</strong>.
        </p>
        <img
          src={`${import.meta.env.BASE_URL}images/personalized-service.jpg`}
          alt="Via Trading's Account Management team at work"
          className="mt-4 rounded-lg w-full aspect-video object-contain bg-[#e8eaee]"
        />
        <p className="text-xs text-via-text-light mt-1 text-center italic">
          Via Trading's Account Management team
        </p>
      </div>

      <div className="space-y-3">
        {advantages.map((advantage) => (
          <ExpandableCard
            key={advantage.id}
            title={advantage.title}
            subtitle={advantage.shortDescription}
            icon={iconMap[advantage.icon]}
            isExpanded={expandedIds.has(advantage.id)}
            onToggle={() => toggle(advantage.id)}
            accentColor="border-violet-500"
          >
            <p>{advantage.details}</p>
          </ExpandableCard>
        ))}
      </div>

      <div className="bg-via-orange/10 rounded-lg border border-via-orange/30 p-4 mt-6">
        <p className="text-sm text-orange-700 font-medium mb-1">Our Commitment</p>
        <p className="text-sm text-orange-700">
          Via Trading is dedicated to helping business owners succeed at every stage of their journey.
          From a first-time entrepreneur buying a single case pack to an experienced operator filling
          containers for export, Via provides the inventory, support, and partnership to help every
          customer grow.
        </p>
      </div>

      {/* --- Additional Resources --- */}
      <AdditionalResources
        resources={[
          {
            title: 'Why Via Trading? Learn Why You Should Work With Us',
            url: 'https://www.viatrading.com/why-via-trading/',
            source: 'ViaTrading.com',
            description: 'The full story of what makes Via Trading the industry leader in wholesale liquidation.',
          },
          {
            title: 'Via Trading on Inc. 500',
            url: 'https://www.viatrading.com/blog/via-trading-inc-500/',
            source: 'Via Trading Blog',
            description: 'How Via Trading earned 7 years of recognition on the Inc. 500 list of fastest-growing companies.',
          },
          {
            title: 'Via Trading on YouTube',
            url: 'https://www.youtube.com/@Viatrading',
            source: 'YouTube',
            description: 'Warehouse tours, product walkthroughs, and buyer stories from the official Via Trading channel.',
          },
        ]}
      />

    </SectionWrapper>
  )
}
