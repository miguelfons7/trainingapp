import {
  Clock,
  Phone,
  FileText,
  RotateCcw,
  Coffee,
  PhoneOutgoing,
  CheckSquare,
  Users,
  ClipboardList,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { dailyWorkflowSteps } from '../../data/modules/bdr-role/bdrData'

const iconMap: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-4 h-4 text-sky-500" />,
  ClipboardList: <ClipboardList className="w-4 h-4 text-sky-500" />,
  Phone: <Phone className="w-4 h-4 text-sky-500" />,
  FileText: <FileText className="w-4 h-4 text-sky-500" />,
  RotateCcw: <RotateCcw className="w-4 h-4 text-sky-500" />,
  Coffee: <Coffee className="w-4 h-4 text-sky-500" />,
  PhoneOutgoing: <PhoneOutgoing className="w-4 h-4 text-sky-500" />,
  CheckSquare: <CheckSquare className="w-4 h-4 text-sky-500" />,
  Users: <Users className="w-4 h-4 text-sky-500" />,
}

export function BdrDailyWorkflow() {
  return (
    <SectionWrapper
      id="bdr-daily-workflow"
      title="Your Daily Workflow"
      subtitle="Structure your day for maximum impact"
      accentColor="border-sky-500"
      icon={<Clock className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <p className="text-sm text-via-text leading-relaxed">
          A great BDR does not wing it. Your day has a rhythm: prep, call, document, follow up,
          repeat. This structure keeps you organized and ensures no lead falls through the cracks.
        </p>
      </div>

      {/* Daily Schedule Timeline */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          Daily Schedule
        </h3>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-sky-400/40 via-sky-500 to-sky-500/80 rounded-full" />

          <div className="space-y-5">
            {dailyWorkflowSteps.map((step) => (
              <div key={step.id} className="flex items-start gap-4 pl-0">
                <div className="relative z-10 w-6 h-6 rounded-full bg-sky-100 border-2 border-sky-500 flex items-center justify-center shrink-0 mt-0.5">
                  {iconMap[step.icon] || <Clock className="w-3 h-3 text-sky-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-bold text-sky-600">{step.time}</span>
                    <span className="text-sm font-semibold text-via-navy">{step.title}</span>
                  </div>
                  <p className="text-xs text-via-text mt-0.5 mb-2">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-via-text-light">
                        <span className="w-1 h-1 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call Volume Expectations */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Call Volume Expectations
        </h3>
        <p className="text-sm text-via-text leading-relaxed">
          Your exact call targets will be set by your Sales Director. As a general guideline, aim
          for quality over quantity — a great 5-minute discovery call that produces a qualified
          handoff is worth more than 20 rushed dials with no context.
        </p>
      </div>

      {/* The 80/20 Rule */}
      <div className="bg-sky-50 rounded-lg border border-sky-200 p-4">
        <p className="text-sm text-sky-700 font-medium mb-1">The 80/20 Rule</p>
        <p className="text-sm text-sky-700">
          Spend 80% of your phone time on new leads and follow-ups, and 20% on administrative tasks
          like documentation and queue management. If you are spending more time logging than
          calling, simplify your notes.
        </p>
      </div>
    </SectionWrapper>
  )
}
