import {
  Hospital,
  Headphones,
  Stethoscope,
  ArrowRightLeft,
  Shield,
  FileText,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { Badge } from '../shared/Badge'
import { FlowDiagram } from '../shared/FlowDiagram'
import { ScenarioCard } from '../interactive/ScenarioCard'
import { tonePrinciples } from '../../data/modules/consultative-sales/consultativeData'
import { roleScenarios } from '../../data/modules/consultative-sales/inlineExercises'

export function TriageAndDiagnosis() {
  return (
    <SectionWrapper
      id="triage-and-diagnosis"
      title="Triage & Diagnosis: BDR + AM"
      subtitle="Two roles, one team — the hospital model"
      accentColor="border-teal-500"
      icon={<Hospital className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          The Hospital Model
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          When you walk into a hospital, the first person you see is not the surgeon. It is the
          triage nurse. They greet you, ask about your symptoms, take your vitals, and determine
          which specialist you need. Their job is not to diagnose or treat — it is to{' '}
          <strong>gather the right information and route you to the right expert</strong>.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Then the doctor takes over. They already have context from the nurse's notes. They do not
          ask you to repeat your entire story. They go <em>deeper</em> — asking follow-up questions,
          running tests, forming a diagnosis, and prescribing a treatment plan.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          This is exactly how Via Trading's <strong>BDR + AM</strong> system works. Two distinct
          roles that complement each other, each with clear responsibilities and boundaries.
        </p>
      </div>

      {/* BDR: The Triage Nurse */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Headphones className="w-5 h-5 text-teal-500" />
          <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide">
            The BDR: Triage Nurse
          </h3>
          <Badge text="BDR" color="blue" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">
              What BDRs Do
            </p>
            <ul className="space-y-1">
              {[
                'Welcome newly registered contacts',
                'Ask discovery questions to understand the buyer',
                'Qualify based on business type, volume, timing',
                'Route to the right Account Manager',
                'Document everything for the AM',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">
              What BDRs Don't Do
            </p>
            <ul className="space-y-1">
              {[
                'Close deals or negotiate pricing',
                'Quote specific prices or freight costs',
                'Promise specific inventory or availability',
                'Provide deep product education',
                'Handle complex objections in detail',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <FlowDiagram
          steps={['Opening', 'Permission', 'Discovery (7 Questions)', 'Closing & Routing', 'Documentation']}
          label="BDR Call Flow"
          color="bg-blue-600"
          highlightIndex={2}
        />
      </div>

      {/* AM: The Doctor */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Stethoscope className="w-5 h-5 text-teal-500" />
          <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide">
            The AM: The Doctor
          </h3>
          <Badge text="AM" color="teal" />
        </div>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          The Account Manager owns the buyer relationship from the first substantive conversation
          through ongoing account management. They work through <strong>all five steps</strong> of
          the consultative method — they can diagnose, prescribe, close, and follow up.
        </p>

        <div className="mb-4">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-2">
            AM Responsibilities
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['Consult', 'Close', 'Grow Accounts', 'Retain', 'Re-Engage'].map((item) => (
              <Badge key={item} text={item} color="teal" />
            ))}
          </div>
        </div>

        <div className="bg-via-bg-subtle rounded-lg p-3">
          <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
            AM Opening (Routed Lead)
          </p>
          <p className="text-sm text-via-text italic">
            "Hi [Name], this is [Your Name], your Account Manager at Via Trading. I got some
            great notes from my colleague about your business — it sounds like you're running a
            discount store in Phoenix and looking to source general merchandise at pallet volume.
            I'd love to hear more about what you're doing and see how we can help."
          </p>
          <p className="text-xs text-via-text-light mt-2">
            Notice: references BDR notes (proves preparation), validates the buyer's situation,
            transitions to deeper discovery.
          </p>
        </div>
      </div>

      {/* The handoff */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <ArrowRightLeft className="w-5 h-5 text-teal-500" />
          <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide">
            The Handoff: Chart Notes
          </h3>
        </div>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          The BDR's documentation <strong>is</strong> the patient chart. When the AM picks up the
          relationship, they should never make the buyer repeat everything they told the BDR. The
          handoff notes include:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {[
            'Business Type',
            'How They Sell',
            'Inventory Interest',
            'Experience Level',
            'Volume Preference',
            'Purchase Timing',
            'Location',
            'Key Notes',
            'Routing Recommendation',
          ].map((field) => (
            <div key={field} className="bg-via-bg-subtle rounded-lg px-3 py-2">
              <div className="flex items-center gap-1.5">
                <FileText className="w-3 h-3 text-teal-500 shrink-0" />
                <p className="text-xs font-medium text-via-navy">{field}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-via-text leading-relaxed">
          The quality of the handoff directly impacts the AM's first impression. A buyer who has
          to repeat themselves feels like no one was listening. A buyer whose new AM references
          their specific situation feels valued and respected.
        </p>
      </div>

      {/* Tone principles */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-teal-500" />
          <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide">
            Shared Tone Principles
          </h3>
        </div>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Both BDRs and AMs share the same foundational tone. Regardless of role, every
          conversation should feel:
        </p>
        <div className="space-y-2">
          {tonePrinciples.map((principle) => (
            <div key={principle.id} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-via-navy">{principle.principle}</p>
                <p className="text-xs text-via-text-light mt-0.5">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BDR vs AM objection handling */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          Objection Handling: BDR vs. AM
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-3">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
              BDR Pattern
            </p>
            <p className="text-sm text-blue-700 mb-2">
              <strong>Acknowledge → Brief Answer → Redirect to AM</strong>
            </p>
            <p className="text-xs text-blue-600 italic">
              "Great question — pricing depends on the program and what you're looking for. Your
              Account Manager will be the best person to walk you through options that fit your
              business."
            </p>
            <p className="text-xs text-blue-500 mt-2">
              The BDR is a bridge, not a closer.
            </p>
          </div>
          <div className="bg-teal-50 rounded-lg border border-teal-200 p-3">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-2">
              AM Pattern
            </p>
            <p className="text-sm text-teal-700 mb-2">
              <strong>Full K.L.A.P.D.O.C.</strong>
            </p>
            <p className="text-xs text-teal-600 italic">
              "I understand price is a big factor. When you say too high — compared to what you're
              paying now, or where you need to be for margin? … So at truckload pricing, you'd be
              well within your target."
            </p>
            <p className="text-xs text-teal-500 mt-2">
              The AM diagnoses and resolves.
            </p>
          </div>
        </div>
      </div>

      {/* Callout */}
      <div className="bg-teal-50 rounded-lg border border-teal-200 p-4 mb-6">
        <p className="text-sm text-teal-700 font-medium mb-1">Two Roles, One Mission</p>
        <p className="text-sm text-teal-700">
          The BDR and AM are not competing — they are collaborating. The triage nurse makes the
          doctor more effective by providing context. The doctor makes the nurse's work meaningful
          by delivering on the promise of expert care. When both roles are done well, the buyer
          experiences a seamless journey from first contact to lasting partnership.
        </p>
      </div>

      {/* Inline exercise */}
      <ScenarioCard scenarios={roleScenarios} title="BDR or AM?" />
    </SectionWrapper>
  )
}
