import { useState } from 'react'
import {
  Wrench,
  ContactRound,
  PhoneCall,
  BookOpen,
  Mail,
  MessageSquare,
  Phone,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { hubspotPlaybooks, callNoteTemplate } from '../../data/modules/bdr-role/bdrData'

export function BdrToolsHubspot() {
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
      id="bdr-tools-hubspot"
      title="Your Toolbox: HubSpot & Beyond"
      subtitle="The systems that keep everything organized"
      accentColor="border-sky-500"
      icon={<Wrench className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-sm text-via-text leading-relaxed">
          Your CRM is your second brain. Every call, every note, every handoff lives in HubSpot.
          Master it early — it is the difference between organized professionals and people who lose
          track of leads.
        </p>
      </div>

      {/* HubSpot Essentials */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        HubSpot Essentials
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {[
          {
            title: 'Contact Records',
            icon: <ContactRound className="w-5 h-5 text-sky-500" />,
            description:
              'Where all prospect info lives — registration data, call notes, deal stage, AM assignment, and communication history.',
          },
          {
            title: 'Call Logging',
            icon: <PhoneCall className="w-5 h-5 text-sky-500" />,
            description:
              'Log every call within 15 minutes. Include date/time, duration, outcome (connected, voicemail, no answer), and key notes.',
          },
          {
            title: 'Playbooks',
            icon: <BookOpen className="w-5 h-5 text-sky-500" />,
            description:
              'Structured call guides for different scenarios. Reference during calls for the right questions in the right sequence.',
          },
          {
            title: 'Sequences',
            icon: <Mail className="w-5 h-5 text-sky-500" />,
            description:
              'Automated email nurture sequences that run after registration. The AM Introduction Sequence sends 3 emails over 5 days.',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-via-card rounded-xl border border-via-border p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              {item.icon}
              <h4 className="text-sm font-semibold text-via-navy">{item.title}</h4>
            </div>
            <p className="text-xs text-via-text-light leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* The 4 Playbooks */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        The 4 Playbooks
      </h3>
      <div className="space-y-3 mb-6">
        {hubspotPlaybooks.map((pb) => (
          <ExpandableCard
            key={pb.id}
            title={pb.name}
            subtitle={pb.whenToUse}
            isExpanded={expandedIds.has(pb.id)}
            onToggle={() => toggle(pb.id)}
            accentColor="border-sky-500"
          >
            <div className="space-y-3">
              <p className="text-sm text-via-text">{pb.purpose}</p>
              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">
                  Key Questions
                </p>
                <ul className="space-y-1">
                  {pb.keyQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-via-text">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                      <span className="italic">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </div>

      {/* WhatsApp Snippets */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-5 h-5 text-sky-500" />
          <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide">
            WhatsApp Snippets
          </h3>
        </div>
        <p className="text-sm text-via-text leading-relaxed mb-3">
          AM introduction snippets are available in multiple languages for post-handoff outreach.
          These are used by Account Managers after BDR handoff, but good to know they exist:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { lang: 'English', shortcut: '#introam' },
            { lang: 'Spanish', shortcut: '#introames' },
            { lang: 'French', shortcut: '#introamfr' },
          ].map((snippet) => (
            <div
              key={snippet.shortcut}
              className="bg-via-bg-subtle rounded-lg px-3 py-2 text-xs"
            >
              <span className="font-medium text-via-navy">{snippet.lang}</span>
              <span className="text-via-text-light ml-2 font-mono">{snippet.shortcut}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Aircall Basics */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Phone className="w-5 h-5 text-sky-500" />
          <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide">
            Aircall Basics
          </h3>
        </div>
        <p className="text-sm text-via-text leading-relaxed">
          Your phone system for making and receiving calls. Training on Aircall will be covered
          separately — for now, know that all calls made through Aircall are automatically logged
          to HubSpot.
        </p>
      </div>

      {/* Call Documentation Template */}
      <div className="bg-via-card rounded-xl border border-via-border p-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Call Documentation Template
        </h3>
        <p className="text-xs text-via-text-light mb-3">
          Use this template when logging calls in HubSpot. Fill in every field while details are
          fresh — ideally within 15 minutes of the call.
        </p>
        <div className="bg-via-bg-subtle rounded-lg p-4 font-mono text-xs text-via-text leading-relaxed whitespace-pre-wrap border border-via-border">
          {callNoteTemplate}
        </div>
      </div>
    </SectionWrapper>
  )
}
