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
import { FillInBlank } from '../interactive/FillInBlank'
import { advantages, advantagesIntro } from '../../data/advantagesData'
import { whyViaFillBlanks } from '../../data/modules/via-trading/inlineExercises'

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
      title="Why Buyers Choose Via"
      subtitle="7 competitive advantages that directly affect a buyer's bottom line"
      accentColor="border-violet-500"
      icon={<Star className="w-5 h-5" />}
    >
      <p className="text-sm text-via-text mb-6">{advantagesIntro}</p>

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

      <div className="bg-violet-100 rounded-lg border border-violet-500 p-4 mt-6 mb-8">
        <p className="text-sm text-violet-700 font-medium mb-1">In Competitive Conversations</p>
        <p className="text-sm text-violet-700">
          Position Via based on advantages, not by trashing competitors. Many buyers work with
          multiple suppliers — Via often becomes their primary because of pricing and the AM
          relationship.
        </p>
      </div>

      {/* Inline exercise */}
      <FillInBlank items={whyViaFillBlanks} title="Quick Check: Complete the Sentences" />
    </SectionWrapper>
  )
}
