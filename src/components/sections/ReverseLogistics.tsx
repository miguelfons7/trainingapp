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
      {/* --- Introductory prose: what reverse logistics is and why it matters --- */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          What Is Reverse Logistics?
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          In traditional retail, goods flow in one direction: manufacturer to distributor to
          retailer to consumer. That's <strong>forward logistics</strong> — the supply chain
          most people picture when they think about how products reach store shelves. But what
          happens when a consumer returns something? Or when a retailer has 10,000 units of last
          season's inventory gathering dust in a warehouse? The product needs to flow backward
          through the system — and that process is called <strong>reverse logistics</strong>.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Returns are not a small problem. In the United States alone, consumers return hundreds of
          billions of dollars worth of merchandise every year. Retailers can't realistically inspect,
          repackage, and reshelve every single item — the labor costs alone would erase any value
          they'd recover. Instead, returned goods are aggregated at{' '}
          <strong>return processing centers</strong>, sorted into broad categories (electronics,
          apparel, home goods, etc.), palletized, and then sold to{' '}
          <strong>Level 1 dealers</strong> like Via Trading. From there, the merchandise flows
          outward again — this time into the secondary market.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          As a <strong>Level 1 dealer</strong>, Via Trading holds direct contracts with major
          retailers. This is a critical distinction for our buyers: when you purchase from Via, you're
          getting merchandise as close to the original source as possible — no middleman markup, no
          mystery about where the goods came from. That direct relationship is one of Via Trading's
          strongest competitive advantages, and it's worth emphasizing in every sales conversation.
        </p>
      </div>

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

      <div className="bg-indigo-100 rounded-lg border border-indigo-500 p-4 mb-8">
        <p className="text-sm text-indigo-700 font-medium mb-1">Key Sales Insight</p>
        <p className="text-sm text-indigo-700">{keyInsight}</p>
      </div>

    </SectionWrapper>
  )
}
