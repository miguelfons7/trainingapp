import { useState } from 'react'
import {
  Search,
  MessageCircle,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { FlowDiagram } from '../shared/FlowDiagram'
import { TermMatch } from '../interactive/TermMatch'
import { questionTypes } from '../../data/modules/consultative-sales/consultativeData'
import { questionTypesTermMatch } from '../../data/modules/consultative-sales/inlineExercises'

const iconMap: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  ArrowRight: <ArrowRight className="w-5 h-5" />,
}

export function AskingRightQuestions() {
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
      id="asking-right-questions"
      title="Asking the Right Questions"
      subtitle="Your questions are your stethoscope"
      accentColor="border-teal-500"
      icon={<Search className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          The Stethoscope
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          A doctor's first tool is not a prescription pad. It is a question. "Where does it hurt?
          When did it start? Has this happened before?" Each question narrows the diagnosis. Each
          answer reveals something the doctor could not have assumed.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Your questions work the same way. They are the primary diagnostic tool in a consultative
          conversation. The quality of your recommendation is directly proportional to the quality
          of the questions you ask. Ask generic questions, get generic answers, make generic
          recommendations. Ask <strong>thoughtful, specific, genuinely curious questions</strong>,
          and you learn what you need to prescribe the right solution.
        </p>
      </div>

      {/* Four question types */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Four Types of Questions
      </h3>
      <div className="space-y-3 mb-6">
        {questionTypes.map((qt) => (
          <ExpandableCard
            key={qt.id}
            title={qt.type}
            subtitle={qt.definition}
            icon={iconMap[qt.icon]}
            isExpanded={expandedIds.has(qt.id)}
            onToggle={() => toggle(qt.id)}
            accentColor="border-teal-500"
          >
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
                  When to Use
                </p>
                <p className="text-sm text-via-text">{qt.whenToUse}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
                  Examples
                </p>
                <ul className="space-y-1">
                  {qt.examples.map((ex, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-via-text">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                      <span className="italic">{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </div>

      {/* Why open > "or" questions */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Why Open Questions Beat "Or" Questions
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Here is a subtle but important distinction. Consider these two questions:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="bg-red-50 rounded-lg border border-red-200 p-3">
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">
              "Or" Question
            </p>
            <p className="text-sm text-red-700 italic">
              "Are you looking for truckloads or pallets?"
            </p>
            <p className="text-xs text-red-500 mt-2">
              Limits the buyer to two choices <em>you</em> decided. What if they want cases? What if
              they do not know yet?
            </p>
          </div>
          <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-3">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">
              Open Question
            </p>
            <p className="text-sm text-emerald-700 italic">
              "What are you looking for in a supplier?"
            </p>
            <p className="text-xs text-emerald-500 mt-2">
              Lets the buyer share what actually matters, which might include things you had not
              considered.
            </p>
          </div>
        </div>
        <p className="text-sm text-via-text leading-relaxed">
          "Or" questions feel helpful because they give options, but they <strong>constrain the
          conversation to choices you have predetermined</strong>. Open questions let the buyer
          tell you what matters to <em>them</em>, in their own words. The information you get is
          richer, more honest, and more useful for building a recommendation.
        </p>
      </div>

      {/* Funnelling technique */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          The Funnelling Technique
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Great discovery conversations follow a natural funnel, starting broad and getting
          progressively more specific. Each level uses different question types:
        </p>
        <FlowDiagram
          steps={['Broad (Open)', 'Narrowing (Open + Probing)', 'Specific (Closed + Probing)', 'Confirming (Closed + Leading)']}
          label="The Discovery Funnel"
          color="bg-teal-600"
          highlightIndex={0}
        />
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-via-navy">Broad</p>
              <p className="text-xs text-via-text-light">
                "What does your business look like? How do you usually sell product?"
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-via-navy">Narrowing</p>
              <p className="text-xs text-via-text-light">
                "You mentioned electronics sell well — what categories within that do best?"
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-via-navy">Specific</p>
              <p className="text-xs text-via-text-light">
                "Are you usually doing about 3-4 pallets a month?"
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-via-navy">Confirming</p>
              <p className="text-xs text-via-text-light">
                "So a manifested electronics pallet on a weekly schedule would fit your operation well?"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Curiosity is the skill */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Curiosity Is the Skill
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          The best salespeople do not have a secret list of magic questions. They have something
          more powerful: <strong>genuine curiosity</strong> about the person on the other end of the
          call. When you are genuinely curious about how someone runs their business, what challenges
          they face, and what success looks like for them, the right questions emerge naturally.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          The moment a conversation starts feeling like an interview, one question after another
          with no connection between them, curiosity has left the room. Instead of reading off
          a mental checklist, <strong>let each answer guide your next question</strong>. That is
          what makes a conversation feel consultative rather than transactional.
        </p>
      </div>

      {/* Doctor comparison */}
      <div className="bg-teal-50 rounded-lg border border-teal-200 p-4 mb-6">
        <p className="text-sm text-teal-700 font-medium mb-1">Doctor's Intake = Your Discovery</p>
        <p className="text-sm text-teal-700">
          A doctor's intake form asks broad questions first ("What brings you in today?"), then
          narrows based on answers ("When did the pain start? Is it constant or intermittent?"),
          then confirms ("So it's a sharp pain in the lower right side that started three days ago?").
          Your discovery conversation follows the exact same funnel: broad, narrow, specific, confirm.
        </p>
      </div>

      {/* Inline exercise */}
      <TermMatch pairs={questionTypesTermMatch} title="Match the Question Types" />
    </SectionWrapper>
  )
}
