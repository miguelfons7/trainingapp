import { PhoneCall } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { InlineImage } from '../shared/InlineImage'

export function BdrOpeningCalls() {
  return (
    <SectionWrapper
      id="bdr-opening-calls"
      title="Opening the Call"
      subtitle="The first 30 seconds set the tone for everything"
      accentColor="border-sky-500"
      icon={<PhoneCall className="w-5 h-5" />}
    >
      {/* Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6 overflow-hidden">
        <InlineImage
          src="inline-bdr-opening-call.jpg"
          alt="Making the first call"
          float="right"
          size="small"
        />
        <p className="text-sm text-via-text leading-relaxed">
          You have about 30 seconds to earn the right to continue the conversation. The opening is
          not a pitch — it is a warm welcome, a clear reason for calling, and a simple ask for
          permission.
        </p>
      </div>

      {/* Key Elements of the Opening */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Key Elements of the Opening
        </h3>
        <ul className="space-y-2">
          {[
            { label: 'Welcome tone', detail: 'Acknowledge their registration as a positive step' },
            { label: 'Your name', detail: 'Introduce yourself clearly' },
            { label: 'Clear purpose', detail: 'Explain why you\'re calling (routing, not selling)' },
            { label: 'Time expectation', detail: 'Set it as a quick conversation ("a few minutes")' },
            { label: 'Permission', detail: 'Ask if it\'s a good time before diving in' },
          ].map((item) => (
            <li key={item.label} className="flex items-start gap-2 text-sm text-via-text">
              <span className="text-emerald-500 mt-0.5 shrink-0">&#10003;</span>
              <div>
                <span className="font-medium text-via-navy">{item.label}</span>
                <span className="text-via-text-light"> — {item.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Professional Script */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Professional Opening Script
        </h3>
        <div className="bg-via-bg-subtle rounded-lg p-4 border-l-4 border-sky-500">
          <p className="text-sm text-via-text italic leading-relaxed">
            "Hi [Name], thank you for registering with Via Trading and welcome to our community of
            entrepreneurs and business buyers. My name is [Your Name], and I'm reaching out so we
            can help you as quickly as possible. I'd like to ask a few quick questions about your
            business and the type of inventory you're looking for so we can assign you to the
            Account Manager who's the best fit for your needs. It should only take a minute or two.
            Is now a good time?"
          </p>
        </div>
      </div>

      {/* Casual Script */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Casual Opening Script
        </h3>
        <div className="bg-via-bg-subtle rounded-lg p-4 border-l-4 border-sky-500">
          <p className="text-sm text-via-text italic leading-relaxed">
            "Hey [Name], thanks for signing up with us. This is [Your Name] from Via Trading. I
            wanted to reach out personally to help get you connected with the right person on our
            team. Do you have a few minutes to chat about what you're looking for?"
          </p>
        </div>
      </div>

      {/* Opening Don'ts */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Opening Don'ts
        </h3>
        <ul className="space-y-2">
          {[
            'Don\'t promise an immediate transfer or live Account Manager — you may not control the routing timeline',
            'Don\'t launch into questions before getting permission — always ask if now is a good time',
            'Don\'t sound scripted or robotic — make the language your own, keep it conversational',
            'Don\'t ask for commitment — this is a welcome call, not a closing call',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-via-text">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Pro Tips */}
      <div className="bg-sky-50 rounded-lg border border-sky-200 p-4">
        <p className="text-sm text-sky-700 font-medium mb-1">Pro Tips</p>
        <p className="text-sm text-sky-700">
          Match their energy. If they sound busy, keep it tight. If they are chatty, let them lead
          a little. The opening is about reading the room, not reciting a script.
        </p>
      </div>
    </SectionWrapper>
  )
}
