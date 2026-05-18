import { RefreshCcw, Clock, CheckCircle, Phone, Mail, MessageSquare } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ScenarioCard } from '../interactive/ScenarioCard'
import { followUpScenarios } from '../../data/modules/bdr-role/inlineExercises'

export function BdrFollowUps() {
  return (
    <SectionWrapper
      id="bdr-follow-ups"
      title="Follow-Ups & Accountability"
      subtitle="The handoff doesn't end when you hang up"
      accentColor="border-sky-500"
      icon={<RefreshCcw className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-sm text-via-text leading-relaxed">
          Your job does not end when the call ends. A BDR is accountable for the full loop:
          discovery, documentation, routing, and confirmation. If you route a lead and the AM never
          follows up, that is your problem too.
        </p>
      </div>

      {/* Post-Call Checklist */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          Post-Call Checklist
        </h3>
        <div className="space-y-4">
          {[
            {
              timing: 'Within 15 minutes',
              icon: <Clock className="w-4 h-4 text-sky-500" />,
              title: 'Log & Document',
              steps: [
                'Log the call in HubSpot (date/time, duration, outcome)',
                'Complete all discovery fields while details are fresh',
                'Add any key notes the AM needs to know',
              ],
            },
            {
              timing: 'Within 30 minutes',
              icon: <Mail className="w-4 h-4 text-sky-500" />,
              title: 'Route to AM',
              steps: [
                'Send a summary note to the assigned AM',
                'Include: contact info, business type, inventory interest, volume, timing, location',
                'Flag special context: "new to liquidation," "wants to visit warehouse," etc.',
              ],
            },
            {
              timing: 'Same day',
              icon: <CheckCircle className="w-4 h-4 text-sky-500" />,
              title: 'Confirm Handoff',
              steps: [
                'Check that the AM received and acknowledged the handoff',
                'If no acknowledgment, follow up with the AM directly',
              ],
            },
            {
              timing: 'Next day',
              icon: <Phone className="w-4 h-4 text-sky-500" />,
              title: 'Verify Contact',
              steps: [
                'Check HubSpot to see if the AM has made contact',
                'If not, follow up: "Hey, did you connect with Sarah from yesterday?"',
              ],
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-sky-100 border-2 border-sky-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-sky-600">{i + 1}</span>
                </div>
                {i < 3 && <div className="w-0.5 h-4 bg-sky-200 mt-1" />}
              </div>
              <div className="flex-1 min-w-0 pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-sky-600 uppercase tracking-wide">
                    {item.timing}
                  </span>
                  {item.icon}
                  <span className="text-sm font-semibold text-via-navy">{item.title}</span>
                </div>
                <ul className="space-y-1 mt-1.5">
                  {item.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-via-text">
                      <span className="w-1 h-1 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AM Handoff Quality */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          What a Good Handoff Looks Like
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          A quality handoff note gives the AM everything they need to start the conversation without
          making the buyer repeat themselves.
        </p>
        <div className="bg-via-bg-subtle rounded-lg p-4 border-l-4 border-sky-500">
          <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-2">
            Example Handoff Note
          </p>
          <p className="text-sm text-via-text italic leading-relaxed">
            "Sarah is a reseller in Phoenix selling on Amazon. Looking for general merchandise,
            pallets or mixed loads. First-time buyer with capital to start. Interested in visiting
            the warehouse to see product. Good opportunity."
          </p>
        </div>
      </div>

      {/* No-Answer Follow-Up */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          No-Answer Follow-Up Cadence
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Not everyone picks up the first time. Follow a structured cadence so you stay persistent
          without being a nuisance.
        </p>
        <div className="space-y-2">
          {[
            { day: 'Day 1', action: 'First call attempt', icon: <Phone className="w-3 h-3 text-sky-500" /> },
            { day: 'Day 2', action: 'Second call + voicemail', icon: <Phone className="w-3 h-3 text-sky-500" /> },
            { day: 'Day 3', action: 'Email or WhatsApp message', icon: <MessageSquare className="w-3 h-3 text-sky-500" /> },
            { day: 'Day 5', action: 'Final call attempt', icon: <Phone className="w-3 h-3 text-sky-500" /> },
            { day: 'After Day 5', action: 'Mark as unresponsive, move on to next lead', icon: <CheckCircle className="w-3 h-3 text-via-text-light" /> },
          ].map((step) => (
            <div key={step.day} className="flex items-center gap-3 bg-via-bg-subtle rounded-lg px-3 py-2">
              {step.icon}
              <span className="text-xs font-semibold text-sky-600 w-16 shrink-0">{step.day}</span>
              <span className="text-xs text-via-text">{step.action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Re-Engagement Calls */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Re-Engagement Calls
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          Calling dormant accounts requires a different tone than calling new registrations. You are
          reconnecting, not introducing. Reference the past relationship, ask what has changed, and
          use the BDR Qualifying Re-Engage playbook.
        </p>
        <ul className="space-y-1">
          {[
            'Adjust your opening — reference that they\'ve worked with Via before',
            'Ask what\'s changed in their business since they last purchased',
            'Listen for why they stopped: service gaps, product issues, or simply got busy',
            'Position the call as a fresh start, not a guilt trip',
            'Use the Re-Engage playbook in HubSpot for structured guidance',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-via-text">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Accountability Loop */}
      <div className="bg-sky-50 rounded-lg border border-sky-200 p-4 mb-6">
        <p className="text-sm text-sky-700 font-medium mb-1">Your Accountability Loop</p>
        <p className="text-sm text-sky-700">
          The best BDRs do not just route leads — they follow up to make sure those leads got
          served. Your AMs are busy. A quick "Hey, did you connect with Sarah from yesterday?" goes
          a long way.
        </p>
      </div>

      {/* Inline exercise */}
      <ScenarioCard scenarios={followUpScenarios} title="Follow-Up Check" />
    </SectionWrapper>
  )
}
