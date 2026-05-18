import { useState } from 'react'
import { Search } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { FlowDiagram } from '../shared/FlowDiagram'
import { Badge } from '../shared/Badge'
import { InlineImage } from '../shared/InlineImage'
import { ExpandableCard } from '../shared/ExpandableCard'
import { FillInBlank } from '../interactive/FillInBlank'
import { discoveryQuestions } from '../../data/modules/bdr-role/bdrData'
import { discoveryFillBlanks } from '../../data/modules/bdr-role/inlineExercises'

export function BdrDiscoveryFramework() {
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
      id="bdr-discovery-framework"
      title="The Discovery Framework"
      subtitle="Seven questions. One at a time. Listen first."
      accentColor="border-sky-500"
      icon={<Search className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6 overflow-hidden">
        <InlineImage
          src="inline-bdr-discovery.jpg"
          alt="Discovery conversation"
          float="left"
          size="small"
        />
        <p className="text-sm text-via-text leading-relaxed">
          Discovery is the heart of the BDR call. Your goal is to understand enough about the
          buyer's business to route them to the right Account Manager with useful context. The key
          principle: ask one question at a time, let them answer fully, and acknowledge what they
          said before moving on.
        </p>
      </div>

      {/* The Flow */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <FlowDiagram
          steps={[
            'Business Type',
            'Inventory Interest',
            'Experience',
            'Volume',
            'Timing',
            'Location',
            'Anything Else',
          ]}
          label="Discovery Flow"
          color="bg-sky-600"
        />
      </div>

      {/* 7 Questions */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        The 7 Discovery Questions
      </h3>
      <div className="space-y-3 mb-6">
        {discoveryQuestions.map((q) => (
          <ExpandableCard
            key={q.id}
            title={q.question}
            subtitle={q.goal}
            badge={<Badge text={`Q${q.number}`} color="sky" />}
            isExpanded={expandedIds.has(q.id)}
            onToggle={() => toggle(q.id)}
            accentColor="border-sky-500"
          >
            <div className="space-y-3">
              {q.followUps.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
                    Follow-Up Questions
                  </p>
                  <ul className="space-y-1">
                    {q.followUps.map((fu, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-via-text">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                        <span className="italic">{fu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
                  Listen For
                </p>
                <ul className="space-y-1">
                  {q.listenFor.map((lf, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-via-text">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      {lf}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </div>

      {/* The Golden Rule */}
      <div className="bg-sky-50 rounded-lg border border-sky-200 p-4 mb-6">
        <p className="text-sm text-sky-700 font-medium mb-1">The Golden Rule</p>
        <p className="text-sm text-sky-700">
          Ask. Listen. Acknowledge. Then ask the next question. If you fire questions back to back
          without acknowledging, it feels like an interrogation, not a conversation.
        </p>
      </div>

      {/* Inline exercise */}
      <FillInBlank items={discoveryFillBlanks} title="Discovery Quick Check" />
    </SectionWrapper>
  )
}
