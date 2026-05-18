import { Stethoscope, Users, MessageSquare, Lightbulb, Heart } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { StatCard } from '../shared/StatCard'

export function ConsultativeMindset() {
  return (
    <SectionWrapper
      id="consultative-mindset"
      title="The Consultative Mindset"
      subtitle="Prescription before diagnosis is malpractice"
      accentColor="border-teal-500"
      icon={<Stethoscope className="w-5 h-5" />}
    >
      {/* Opening hook */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          What If Your Doctor Just Started Prescribing?
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Imagine walking into a doctor's office. Before you sit down, before you describe your
          symptoms, before anyone takes your temperature or checks your blood pressure, the doctor
          hands you a prescription. "Take this twice a day," they say. "Trust me."
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          You would walk out. Everyone would. Because <strong>prescription before diagnosis is
          malpractice</strong>. It does not matter how experienced the doctor is, how many degrees
          hang on the wall, or how good the medication is. Without understanding the patient's
          condition, the prescription is a guess.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Sales works exactly the same way. A salesperson who pitches products before understanding
          the buyer's business is guessing. They might get lucky sometimes, but they will never
          build the trust that turns a first transaction into a lasting partnership. At Via Trading,
          we do not sell — <strong>we consult</strong>. And this course teaches you how and,
          more importantly, <em>why</em>.
        </p>
      </div>

      {/* Expert, not vendor */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Expert, Not Vendor
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          What separates a trusted advisor from a vendor who takes orders? <strong>Expertise</strong>.
          Via Trading's team brings over <strong>100 years of combined experience</strong> in the
          liquidation industry. That knowledge is not just background — it is the foundation of every
          conversation you have with a buyer.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          When a bin store operator in Dallas describes their weekly restock challenges, you do not just
          nod and pull up a catalog. You draw on your understanding of general merchandise programs,
          truckload economics, and what has worked for similar businesses to offer a <strong>tailored
          recommendation</strong> that fits their specific situation.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          That is the difference. A vendor says, "Here is what we have." An expert says, "Based on
          what you have told me about your business, here is what I would recommend and why." The
          expertise is the differentiator — not the price sheet, not the warehouse size, not the
          product catalog. <strong>You</strong> are the competitive advantage.
        </p>
      </div>

      {/* Why Via consults */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Why Via Consults, Not Sells
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Via Trading was among the first in the liquidation industry to bring a genuinely consultative
          approach to the buyer relationship. Before Via, buying liquidation was largely transactional:
          here is the price, here is the pallet, take it or leave it. There was no dedicated Account
          Manager who knew your business. No one asking what you needed before showing you what was
          available.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          Via changed that. Every buyer gets a <strong>dedicated Account Manager</strong> — a specialist
          who learns their business, remembers their preferences, and proactively recommends inventory
          that fits. This is not just good customer service. It is a fundamentally different way of
          doing business, and it is the reason Via Trading maintains a <strong>90%+ repeat buyer
          rate</strong>. Buyers stay because they trust the relationship, not just the price.
        </p>
      </div>

      {/* The 30% Rule */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-4">
          The 30% Rule
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          In a consultative conversation, the salesperson should contribute approximately{' '}
          <strong>30% of the talking</strong>. The buyer does the other 70%. That 30% is almost
          entirely <strong>questions</strong> — thoughtful, open-ended questions that help you
          understand their business, their challenges, and what they actually need.
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <StatCard
            icon={<MessageSquare className="w-6 h-6" />}
            value="30%"
            label="You (mostly questions)"
          />
          <StatCard
            icon={<Users className="w-6 h-6" />}
            value="70%"
            label="The buyer (their story)"
          />
        </div>
        <p className="text-sm text-via-text leading-relaxed">
          Think of your questions as a stethoscope. A doctor does not listen to their own heartbeat —
          they listen to the patient's. Your job in discovery is to understand, not to impress. The
          more the buyer talks, the more you learn. And the more you learn, the better your
          recommendation will be.
        </p>
      </div>

      {/* Everyone has their own style */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Everyone Has Their Own Style
        </h3>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          This course is not a script factory. It teaches a <strong>methodology</strong> — a
          structured way of thinking about conversations that works regardless of personality. The
          methodology is the skeleton. You bring the personality.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Some Account Managers are naturally warm and chatty. Others are direct and efficient. Some
          build rapport through humor, others through quiet competence. All of these styles work
          — as long as one thing stays consistent: <strong>every great salesperson asks the right
          questions before making a recommendation</strong>.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          The techniques in this course are tools. How you use them, what tone you bring, how you
          adapt them to your personality — that is yours. But the principle underneath is universal:
          understand first, recommend second.
        </p>
      </div>

      {/* Teaching the WHY */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <div className="flex items-start gap-3 mb-3">
          <Lightbulb className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
          <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide">
            Why, Not Just How
          </h3>
        </div>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          Most sales training teaches techniques: "Ask open-ended questions." "Use the buyer's name."
          "Mirror their language." But it rarely explains <em>why</em> those techniques work.
        </p>
        <p className="text-sm text-via-text leading-relaxed mb-4">
          This course is different. Every concept comes with the reasoning behind it. When you
          understand <em>why</em> open-ended questions work better than "or" questions, you do not
          need to memorize a script — you naturally ask better questions in any situation. When you
          understand <em>why</em> acknowledging an objection before responding matters, you do it
          instinctively, not because a training manual told you to.
        </p>
        <p className="text-sm text-via-text leading-relaxed">
          The goal is not to follow a checklist. It is to develop the <strong>judgment</strong> to
          read a conversation, adapt in real time, and consistently make buyers feel heard,
          understood, and well-served.
        </p>
      </div>

      {/* Commitment callout */}
      <div className="bg-teal-50 rounded-lg border border-teal-200 p-4">
        <div className="flex items-start gap-2">
          <Heart className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-teal-700 font-medium mb-1">The Via Trading Approach</p>
            <p className="text-sm text-teal-700">
              Genuine curiosity, not interrogation. Relationships, not transactions. Experience +
              consultative approach + business acumen = your differentiator. Via Trading is nimble —
              we meet buyers where they are, whether they are buying their first case pack or filling
              containers for export.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
