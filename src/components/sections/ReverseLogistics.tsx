import { useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { FlowDiagram } from '../shared/FlowDiagram'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { forwardPath, reversePath, dealerLevels, keyInsight } from '../../data/reverseLogisticsData'

export function ReverseLogistics() {
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null)

  return (
    <SectionWrapper
      id="reverse-logistics"
      title="Reverse Logistics: How Goods Flow"
      subtitle="Understanding the journey from retailer shelf to liquidation"
      accentColor="border-indigo-500"
      icon={<ArrowLeftRight className="w-5 h-5" />}
    >
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <FlowDiagram
          steps={forwardPath}
          label="Forward Logistics (Normal Path)"
          color="bg-emerald-600"
        />
        <FlowDiagram
          steps={reversePath}
          label="Reverse Logistics (Liquidation Path)"
          color="bg-indigo-600"
          highlightIndex={3}
        />
      </div>

      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        The Dealer Levels
      </h3>
      <div className="space-y-3 mb-6">
        {dealerLevels.map((level) => (
          <ExpandableCard
            key={level.level}
            title={level.title}
            subtitle={level.example}
            badge={
              level.highlight ? (
                <Badge text="Via Trading" color="indigo" />
              ) : undefined
            }
            isExpanded={expandedLevel === level.level}
            onToggle={() =>
              setExpandedLevel(expandedLevel === level.level ? null : level.level)
            }
            accentColor="border-indigo-500"
          >
            <p>{level.description}</p>
          </ExpandableCard>
        ))}
      </div>

      <div className="bg-indigo-100 rounded-lg border border-indigo-500 p-4">
        <p className="text-sm text-indigo-700 font-medium mb-1">Key Sales Insight</p>
        <p className="text-sm text-indigo-700">{keyInsight}</p>
      </div>
    </SectionWrapper>
  )
}
