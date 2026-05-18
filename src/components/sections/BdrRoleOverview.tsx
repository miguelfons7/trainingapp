import { Headphones } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { FlowDiagram } from '../shared/FlowDiagram'
import { ScenarioCard } from '../interactive/ScenarioCard'
import { bdrResponsibilities } from '../../data/modules/bdr-role/bdrData'
import { roleBoundaryScenarios } from '../../data/modules/bdr-role/inlineExercises'

export function BdrRoleOverview() {
  return (
    <SectionWrapper
      id="bdr-role-overview"
      title="Your Role as a BDR"
      subtitle="The first impression. The front door of Via Trading."
      accentColor="border-sky-500"
      icon={<Headphones className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-sm text-via-text leading-relaxed">
          As a Business Development Representative, you are the first voice a new prospect hears
          from Via Trading. You are not here to sell — you are here to welcome, discover, and route.
          Think of yourself as the triage nurse: your job is to gather context, understand the
          buyer's situation, and connect them with the right Account Manager who can actually help.
        </p>
      </div>

      {/* What You Do / What You Don't Do */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          What You Do / What You Don't Do
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">
              What BDRs Do
            </p>
            <ul className="space-y-1">
              {bdrResponsibilities.do.map((item) => (
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
              {bdrResponsibilities.dont.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-via-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Where You Fit */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Where You Fit
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          The BDR sits between marketing (website registrations) and sales (Account Managers). You
          are the bridge. Marketing generates the lead, you qualify and add context, and the AM takes
          it from there.
        </p>
        <FlowDiagram
          steps={['Registration', 'BDR Discovery', 'AM Handoff', 'Sale']}
          label="The BDR Pipeline"
          color="bg-sky-600"
          highlightIndex={1}
        />
      </div>

      {/* Your Mindset */}
      <div className="bg-sky-50 rounded-lg border border-sky-200 p-4 mb-6">
        <p className="text-sm text-sky-700 font-medium mb-1">Your Mindset</p>
        <p className="text-sm text-sky-700">
          You are not selling. You are serving. Every call is a chance to make someone feel heard
          and valued. The better your discovery, the easier the AM's job — and the faster the buyer
          gets what they need.
        </p>
      </div>

      {/* Inline exercise */}
      <ScenarioCard scenarios={roleBoundaryScenarios} title="BDR or Not BDR?" />
    </SectionWrapper>
  )
}
