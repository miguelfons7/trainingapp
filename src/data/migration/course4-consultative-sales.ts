/**
 * CMS Migration — Course 4: Consultative Sales
 * Converts 9 lesson modules + 1 quiz to PageContent format.
 */
import { ContentBuilder, resetUid } from './helpers'
import type { MigrationEntry } from './helpers'
import {
  questionTypes,
  activeListeningRules,
  needsHierarchy,
  featureBenefitNeeds,
  fiveSteps,
  klapdocSteps,
  commonObjections,
  closingTechniques,
  languageGuidance,
  growthStrategies,
  dormantResponses,
  tonePrinciples,
} from '../modules/consultative-sales/consultativeData'
import { salesArchetypes } from '../modules/consultative-sales/buyerArchetypesData'
import {
  questionTypesTermMatch,
  listeningScenarios,
  buyerNeedsFillBlanks,
  fiveStepScenarios,
  objectionScenarios,
  accountGrowthFillBlanks,
  roleScenarios,
} from '../modules/consultative-sales/inlineExercises'
import { salesPhilosophySectionedQuiz } from '../modules/consultative-sales/courseQuiz'

const COURSE_ID = 'sales-philosophy'

// ─── Module 1: The Consultative Mindset ──────────────────

function consultativeMindset(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'consultative-mindset',
    'The Consultative Mindset',
    'Prescription before diagnosis is malpractice',
    'border-teal-500',
    'Stethoscope',
  )

  // What If Your Doctor Just Started Prescribing?
  b.heading('What If Your Doctor Just Started Prescribing?', 3)
  b.paragraph(
    'Imagine walking into a doctor\'s office. Before you sit down, before you describe your symptoms, before anyone takes your temperature or checks your blood pressure, the doctor hands you a prescription. "Take this twice a day," they say. "Trust me."',
  )
  b.paragraph(
    'You would walk out. Everyone would. Because <strong>prescription before diagnosis is malpractice</strong>. It does not matter how experienced the doctor is, how many degrees hang on the wall, or how good the medication is. Without understanding the patient\'s condition, the prescription is a guess.',
  )
  b.paragraph(
    'Sales works exactly the same way. A salesperson who pitches products before understanding the buyer\'s business is guessing. They might get lucky sometimes, but they will never build the trust that turns a first transaction into a lasting partnership. At Via Trading, we do not sell — <strong>we consult</strong>. And this course teaches you how and, more importantly, <em>why</em>.',
  )

  // Expert, Not Vendor
  b.heading('Expert, Not Vendor', 3)
  b.paragraph(
    'What separates a trusted advisor from a vendor who takes orders? <strong>Expertise</strong>. Via Trading\'s team brings over <strong>300 years of combined experience</strong> in the liquidation industry. That knowledge is not just background. It is the foundation of every conversation you have with a buyer.',
  )
  b.paragraph(
    'When a bin store operator in Dallas describes their weekly restock challenges, you do not just nod and pull up a catalog. You draw on your understanding of general merchandise programs, truckload economics, and what has worked for similar businesses to offer a <strong>tailored recommendation</strong> that fits their specific situation.',
  )
  b.paragraph(
    'That is the difference. A vendor says, "Here is what we have." An expert says, "Based on what you have told me about your business, here is what I would recommend and why." The expertise is the differentiator, not the price sheet, not the warehouse size, not the product catalog. <strong>You</strong> are the competitive advantage.',
  )

  // Why Via Consults, Not Sells
  b.heading('Why Via Consults, Not Sells', 3)
  b.paragraph(
    'Via Trading was among the first in the liquidation industry to bring a genuinely consultative approach to the buyer relationship. Before Via, buying liquidation was largely transactional: here is the price, here is the pallet, take it or leave it. There was no dedicated Account Manager who knew your business. No one asking what you needed before showing you what was available.',
  )
  b.paragraph(
    'Via changed that. Every buyer gets a <strong>dedicated Account Manager</strong>, a specialist who learns their business, remembers their preferences, and proactively recommends inventory that fits. This is not just good customer service. It is a fundamentally different way of doing business, and it is the reason Via Trading maintains a <strong>90%+ repeat buyer rate</strong>. Buyers stay because they trust the relationship, not just the price.',
  )

  // The 30% Rule
  b.heading('The 30% Rule', 3)
  b.inlineImage('inline-listening.jpg', 'Active listening in practice', 'left', 'small', 'Listen more than you speak')
  b.paragraph(
    'In a consultative conversation, the salesperson should contribute approximately <strong>30% of the talking</strong>. The buyer does the other 70%. That 30% is almost entirely <strong>questions</strong> — thoughtful, open-ended questions that help you understand their business, their challenges, and what they actually need.',
  )
  b.statGrid(2, [
    { icon: 'MessageSquare', value: '30%', label: 'You (mostly questions)' },
    { icon: 'Users', value: '70%', label: 'The buyer (their story)' },
  ])
  b.paragraph(
    'Think of your questions as a stethoscope. A doctor does not listen to their own heartbeat — they listen to the patient\'s. Your job in discovery is to understand, not to impress. The more the buyer talks, the more you learn. And the more you learn, the better your recommendation will be.',
  )

  // Everyone Has Their Own Style
  b.heading('Everyone Has Their Own Style', 3)
  b.paragraph(
    'This course is not a script factory. It teaches a <strong>methodology</strong>, a structured way of thinking about conversations that works regardless of personality. The methodology is the skeleton. You bring the personality.',
  )
  b.paragraph(
    'Some Account Managers are naturally warm and chatty. Others are direct and efficient. Some build rapport through humor, others through quiet competence. All of these styles work — as long as one thing stays consistent: <strong>every great salesperson asks the right questions before making a recommendation</strong>.',
  )
  b.paragraph(
    'The techniques in this course are tools. How you use them, what tone you bring, how you adapt them to your personality, that is yours. But the principle underneath is universal: understand first, recommend second.',
  )

  // Why, Not Just How
  b.heading('Why, Not Just How', 3)
  b.paragraph(
    'Most sales training teaches techniques: "Ask open-ended questions." "Use the buyer\'s name." "Mirror their language." But it rarely explains <em>why</em> those techniques work.',
  )
  b.paragraph(
    'This course is different. Every concept comes with the reasoning behind it. When you understand <em>why</em> open-ended questions work better than "or" questions, you do not need to memorize a script. You naturally ask better questions in any situation. When you understand <em>why</em> acknowledging an objection before responding matters, you do it instinctively, not because a training manual told you to.',
  )
  b.paragraph(
    'The goal is not to follow a checklist. It is to develop the <strong>judgment</strong> to read a conversation, adapt in real time, and consistently make buyers feel heard, understood, and well-served.',
  )

  // The Via Trading Approach callout
  b.callout(
    'tip',
    'Genuine curiosity, not interrogation. Relationships, not transactions. Experience + consultative approach + business acumen = your differentiator. Via Trading is nimble — we meet buyers where they are, whether they are buying their first case pack or filling containers for export.',
    'The Via Trading Approach',
  )

  return { courseId: COURSE_ID, moduleId: 'consultative-mindset', content: b.build() }
}

// ─── Module 2: Asking the Right Questions ────────────────

function askingRightQuestions(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'asking-right-questions',
    'Asking the Right Questions',
    'Your questions are your stethoscope',
    'border-teal-500',
    'Search',
  )

  // The Stethoscope
  b.heading('The Stethoscope', 3)
  b.inlineImage('inline-stethoscope.jpg', 'Stethoscope', 'right', 'small', 'Questions are your diagnostic tool')
  b.paragraph(
    'A doctor\'s first tool is not a prescription pad. It is a question. "Where does it hurt? When did it start? Has this happened before?" Each question narrows the diagnosis. Each answer reveals something the doctor could not have assumed.',
  )
  b.paragraph(
    'Your questions work the same way. They are the primary diagnostic tool in a consultative conversation. The quality of your recommendation is directly proportional to the quality of the questions you ask. Ask generic questions, get generic answers, make generic recommendations. Ask <strong>thoughtful, specific, genuinely curious questions</strong>, and you learn what you need to prescribe the right solution.',
  )

  // Four Types of Questions
  b.heading('Four Types of Questions', 3)
  b.expandableCardGroup(
    questionTypes.map((qt) => ({
      id: qt.id,
      title: qt.type,
      subtitle: qt.definition,
      icon: qt.icon,
      accentColor: 'border-teal-500',
      content: `<div class="space-y-3"><div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">When to Use</p><p>${qt.whenToUse}</p></div><div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">Examples</p><ul class="space-y-1">${qt.examples.map((ex) => `<li class="flex items-start gap-2 text-sm text-via-text"><span class="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span><span class="italic">${ex}</span></li>`).join('')}</ul></div></div>`,
    })),
  )

  // Why Open Questions Beat "Or" Questions
  b.heading('Why Open Questions Beat "Or" Questions', 3)
  b.paragraph(
    'Here is a subtle but important distinction. Consider these two questions:',
  )
  b.twoColumnList(
    '"Or" Question',
    'red',
    [
      '"Are you looking for truckloads or pallets?" — Limits the buyer to two choices you decided. What if they want cases? What if they do not know yet?',
    ],
    'Open Question',
    'emerald',
    [
      '"What are you looking for in a supplier?" — Lets the buyer share what actually matters, which might include things you had not considered.',
    ],
  )
  b.paragraph(
    '"Or" questions feel helpful because they give options, but they <strong>constrain the conversation to choices you have predetermined</strong>. Open questions let the buyer tell you what matters to <em>them</em>, in their own words. The information you get is richer, more honest, and more useful for building a recommendation.',
  )

  // The Funnelling Technique
  b.heading('The Funnelling Technique', 3)
  b.inlineImage('inline-funnel.jpg', 'Sales funnel concept', 'left', 'small', 'Start broad, then narrow down')
  b.paragraph(
    'Great discovery conversations follow a natural funnel, starting broad and getting progressively more specific. Each level uses different question types:',
  )
  b.flowDiagram(
    'The Discovery Funnel',
    ['Broad (Open)', 'Narrowing (Open + Probing)', 'Specific (Closed + Probing)', 'Confirming (Closed + Leading)'],
    'bg-teal-600',
    0,
  )
  b.bulletList([
    '<strong>Broad:</strong> "What does your business look like? How do you usually sell product?"',
    '<strong>Narrowing:</strong> "You mentioned electronics sell well — what categories within that do best?"',
    '<strong>Specific:</strong> "Are you usually doing about 3-4 pallets a month?"',
    '<strong>Confirming:</strong> "So a manifested electronics pallet on a weekly schedule would fit your operation well?"',
  ], 'teal')

  // Curiosity Is the Skill
  b.heading('Curiosity Is the Skill', 3)
  b.paragraph(
    'The best salespeople do not have a secret list of magic questions. They have something more powerful: <strong>genuine curiosity</strong> about the person on the other end of the call. When you are genuinely curious about how someone runs their business, what challenges they face, and what success looks like for them, the right questions emerge naturally.',
  )
  b.paragraph(
    'The moment a conversation starts feeling like an interview, one question after another with no connection between them, curiosity has left the room. Instead of reading off a mental checklist, <strong>let each answer guide your next question</strong>. That is what makes a conversation feel consultative rather than transactional.',
  )

  // Doctor comparison callout
  b.callout(
    'tip',
    'A doctor\'s intake form asks broad questions first ("What brings you in today?"), then narrows based on answers ("When did the pain start? Is it constant or intermittent?"), then confirms ("So it\'s a sharp pain in the lower right side that started three days ago?"). Your discovery conversation follows the exact same funnel: broad, narrow, specific, confirm.',
    'Doctor\'s Intake = Your Discovery',
  )

  // Inline exercise
  b.termMatch(questionTypesTermMatch, 'Match the Question Types')

  return { courseId: COURSE_ID, moduleId: 'asking-right-questions', content: b.build() }
}

// ─── Module 3: Listening Beyond Words ────────────────────

function listeningBeyondWords(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'listening-beyond-words',
    'Listening Beyond Words',
    'Two ears, one mouth. Use them in that ratio.',
    'border-teal-500',
    'Ear',
  )

  // The Other Half of the Equation
  b.heading('The Other Half of the Equation', 3)
  b.inlineImage('inline-notetaking.jpg', 'Taking notes during a conversation', 'right', 'small', 'Two ears, one mouth')
  b.paragraph(
    'Questions are half the equation. The other half is hearing what the buyer says, and what they <em>do not</em> say. A doctor who asks the right questions but ignores the answers is not diagnosing anything. They are going through the motions.',
  )
  b.paragraph(
    'Active listening is not passive. It is not just waiting for your turn to talk. It is an intentional, focused practice of absorbing information, reading signals, and demonstrating to the buyer that their words actually matter to you. When done well, it transforms a transactional call into a <strong>genuine conversation</strong>.',
  )

  // The Five Rules of Active Listening
  b.heading('The Five Rules of Active Listening', 3)
  b.expandableCardGroup(
    activeListeningRules.map((rule) => ({
      id: rule.id,
      title: rule.rule,
      subtitle: rule.description.slice(0, 120) + '…',
      icon: rule.icon,
      accentColor: 'border-teal-500',
      content: `<div class="space-y-3"><p>${rule.description}</p><div class="bg-via-bg-subtle rounded-lg p-3"><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">In Practice</p><p class="italic">${rule.example}</p></div></div>`,
    })),
  )

  // Reading the Gaps
  b.heading('Reading the Gaps', 3)
  b.paragraph(
    'What a buyer <em>does not</em> say is often more revealing than what they share. Gaps and avoidance are diagnostic signals, just like the symptoms a patient does not report. Here are patterns to watch for:',
  )
  b.bulletList([
    '<strong>Never mentions profitability:</strong> They may be growing in volume but struggling with margins. A gentle probe: "How are your margins holding up as you scale?"',
    '<strong>Keeps redirecting to price:</strong> Margins are tight, and every dollar matters. Instead of getting frustrated, acknowledge it and ask: "What per-unit cost do you need to hit for your numbers to work?"',
    '<strong>Hesitant about volume:</strong> Cash flow may be a constraint. Do not push larger orders. Instead, explore what volume feels comfortable and build from there.',
    '<strong>Avoids talking about their current supplier:</strong> They may be locked in an uncomfortable arrangement or comparing you without wanting to show their hand.',
  ], 'teal')

  // Matching Energy, Not Mirroring
  b.heading('Matching Energy, Not Mirroring', 3)
  b.paragraph(
    'Every buyer brings a different energy to the conversation. Some are enthusiastic and chatty. Others are guarded and direct. Some are stressed. Some are skeptical. Your job is to <strong>match their energy</strong>, not mirror it mechanically.',
  )
  b.paragraph(
    'If someone is reserved and direct, be concise. Do not force small talk. If someone is excited about their new business, share that enthusiasm. If someone sounds frustrated, lead with empathy before jumping to solutions. The tone principles are simple: welcoming, professional, low-pressure, natural, and confident. How you balance them depends on the person in front of you.',
  )

  // Considering Other Perspectives
  b.heading('Considering Other Perspectives', 3)
  b.paragraph(
    'Before any conversation, especially a difficult one, take a moment to consider why a reasonable person might behave the way this buyer is behaving. This is not about making excuses. It is about <strong>understanding context</strong>.',
  )
  b.paragraph(
    'A buyer who seems "difficult" may have been burned by a previous liquidation supplier. A buyer who is "price-obsessed" may have thin margins and genuinely cannot afford to overpay. A buyer who is "hard to reach" may be running a one-person operation and literally does not have time to answer the phone.',
  )
  b.paragraph(
    'When you approach a conversation having already considered the buyer\'s perspective, you listen differently. You hear context, not just words. You respond to the <em>person</em>, not just the objection. And that changes everything.',
  )

  // Inline exercise
  b.scenarioCard(
    listeningScenarios.map((s) => ({
      id: s.id,
      scenario: s.scenario,
      options: s.options,
      bestAnswerIndex: s.bestAnswerIndex,
      explanation: s.explanation,
    })),
    'Reading Between the Lines',
  )

  return { courseId: COURSE_ID, moduleId: 'listening-beyond-words', content: b.build() }
}

// ─── Module 4: Know Your Patients ────────────────────────

function knowYourPatients(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'know-your-patients',
    'Know Your Patients',
    'A specialist studies anatomy before treating patients',
    'border-teal-500',
    'Users',
  )

  // Patient Profiles
  b.heading('Patient Profiles', 3)
  b.paragraph(
    'A cardiologist studies heart conditions. A pediatrician knows child development. An orthopedic surgeon understands joints and bones. Before any specialist treats a patient, they have spent years studying the kinds of conditions they will encounter.',
  )
  b.paragraph(
    'As an Account Manager or BDR at Via Trading, your patients are <strong>buyers</strong>. And just as doctors see certain conditions over and over, you will see certain <strong>buyer profiles</strong> repeatedly. Understanding these archetypes (what drives them, what they worry about, and what signals they give) allows you to diagnose faster and recommend better.',
  )

  // Common Buyer Archetypes
  b.heading('Common Buyer Archetypes', 3)
  b.paragraph(
    'These are some of the most common profiles you will encounter. This is a starting point, not an exhaustive list. Real buyers often blend traits from multiple archetypes.',
  )
  b.expandableCardGroup(
    salesArchetypes.map((archetype) => ({
      id: archetype.id,
      title: archetype.name,
      subtitle: archetype.whoTheyAre.slice(0, 130) + '…',
      icon: archetype.icon,
      accentColor: 'border-teal-500',
      content: `<div class="space-y-3"><p>${archetype.whoTheyAre}</p><div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">They Care About</p><p>${archetype.careAbout.join(', ')}</p></div><div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">You'll Hear Things Like</p><ul class="space-y-1">${archetype.signals.map((s) => `<li class="flex items-start gap-2 text-sm text-via-text"><span class="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span><span class="italic">${s}</span></li>`).join('')}</ul></div><div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">Tailored Follow-Up Questions</p><ul class="space-y-1">${archetype.tailoredFollowUps.map((q) => `<li class="flex items-start gap-2 text-sm text-via-text"><span class="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span><span class="italic">${q}</span></li>`).join('')}</ul></div><div class="bg-via-bg-subtle rounded-lg p-3"><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">AM Note</p><p>${archetype.amNote}</p></div></div>`,
    })),
  )

  // The Customer Needs Hierarchy
  b.heading('The Customer Needs Hierarchy', 3)
  b.paragraph(
    'Every buyer has layers of needs. The surface request ("I want cheap pallets") sits on top of deeper motivations. Understanding the hierarchy helps you address the real driver, not just the stated request.',
  )
  b.expandableCardGroup(
    needsHierarchy.map((level, i) => ({
      id: level.id,
      title: level.level,
      badge: i === 0 ? { text: 'Ultimate Driver', color: 'teal' as const } : undefined,
      accentColor: 'border-teal-500',
      content: `<p>${level.description}</p>`,
    })),
  )
  b.paragraph(
    'Think of it like a medical chart. <strong>Profit</strong> is the chief complaint. <strong>Margin</strong> and <strong>Volume</strong> are the symptoms. <strong>Business drivers</strong> and <strong>personal drivers</strong> are the underlying conditions. The best consultative conversations uncover all layers.',
  )

  // Meeting Buyers Where They Are
  b.heading('Meeting Buyers Where They Are', 3)
  b.paragraph(
    'Via Trading is nimble. A first-time bin store owner with $5,000 to invest needs a fundamentally different conversation than a 10-truckload-per-month exporter. The archetypes help you calibrate, but every buyer is an individual. Use the profiles as starting points, not scripts. Let the buyer\'s actual words guide your response.',
  )
  b.paragraph(
    'Remember: at the end of the day, we are not just selling product. We are <strong>solving a problem</strong> for buyers. Whether they need consistent inventory for their shelves, high-margin goods for online resale, or container loads for export, our job is to understand the problem and build value around the solution we offer.',
  )

  // Features → Benefits → Needs
  b.heading('Features → Benefits → Needs', 3)
  b.paragraph(
    'Features describe what something <em>is</em>. Benefits describe what it <em>does for the buyer</em>. Needs describe what the buyer is trying to <em>accomplish</em>. The bridge between them is where your consultative skill lives.',
  )
  b.paragraph(
    'Use link phrases to connect them naturally: <strong>"What that means for you is…"</strong> / <strong>"The advantage for your business is…"</strong> / <strong>"The reason that matters is…"</strong>',
  )
  b.expandableCardGroup(
    featureBenefitNeeds.slice(0, 3).map((fbn) => ({
      id: fbn.id,
      title: fbn.feature,
      accentColor: 'border-teal-500',
      content: `<div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs"><div><p class="font-semibold text-via-text-light uppercase tracking-wide mb-0.5">Feature</p><p>${fbn.feature}</p></div><div><p class="font-semibold text-teal-600 uppercase tracking-wide mb-0.5">Benefit</p><p>${fbn.benefit}</p></div><div><p class="font-semibold text-via-navy uppercase tracking-wide mb-0.5">Need</p><p>${fbn.need}</p></div></div>`,
    })),
  )

  // Inline exercise
  b.fillInBlank(
    buyerNeedsFillBlanks.map((f) => ({
      id: f.id,
      sentence: f.sentence,
      blank: f.blank,
      options: f.options,
      correctIndex: f.correctIndex,
    })),
    'Quick Check: Buyer Needs',
  )

  return { courseId: COURSE_ID, moduleId: 'know-your-patients', content: b.build() }
}

// ─── Module 5: The 5-Step Method ─────────────────────────

function fiveStepMethod(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'five-step-method',
    'The 5-Step Method',
    'The clinical method: from diagnosis to treatment plan',
    'border-teal-500',
    'ClipboardList',
  )

  // The Clinical Method
  b.heading('The Clinical Method', 3)
  b.paragraph(
    'Doctors follow a structured process: take a history, examine the patient, form a diagnosis, create a treatment plan, and schedule follow-up. They do not skip steps. They do not prescribe before examining.',
  )
  b.paragraph(
    'Via Trading\'s <strong>5-Step Consultative Method</strong> follows the same logic. Each step builds on the one before it. Skip a step, and the conversation falls apart, just like a doctor who prescribes antibiotics without checking if it is actually an infection.',
  )

  // The 5-Step Flow
  b.heading('The 5-Step Flow', 3)
  b.flowDiagram(
    'Consultative Selling Method',
    ['Summarize (40%)', 'State the Idea (10%)', 'Explain How (15%)', 'Reinforce Benefits (15%)', 'Close (20%)'],
    'bg-teal-600',
    0,
  )

  // Step 1: The Diagnostic Phase
  b.heading('Step 1: The Diagnostic Phase', 3)
  b.paragraph(
    'Step 1 (Summarize) gets <strong>approximately 40%</strong> of the conversation time. That is not a typo. Nearly half of a great consultative conversation is spent understanding the buyer before making any recommendation. This is the phase where most salespeople fail: they rush through it to get to their pitch.',
  )
  b.flowDiagram(
    'Inside Step 1: The Discovery Loop',
    ['Ask', 'Listen', 'Acknowledge', 'Probe', 'Summarize'],
    'bg-teal-600',
    4,
  )
  b.paragraph(
    'This loop repeats as many times as needed. Ask an open question. Listen to the full answer. Acknowledge what you heard. Probe deeper if needed. Then summarize back to confirm understanding before moving to Step 2.',
  )

  // The Five Steps in Detail
  b.heading('The Five Steps in Detail', 3)
  b.expandableCardGroup(
    fiveSteps.map((step) => ({
      id: step.id,
      title: `Step ${step.step}: ${step.title}`,
      subtitle: step.focus,
      badge: { text: step.timeAllocation, color: 'teal' as const },
      icon: step.id === 'summarize' ? 'ClipboardList' :
            step.id === 'state-idea' ? 'Lightbulb' :
            step.id === 'explain-how' ? 'Cog' :
            step.id === 'reinforce-benefits' ? 'Star' : 'PhoneForwarded',
      accentColor: 'border-teal-500',
      content: `<div class="space-y-3"><p>${step.description}</p><div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">Examples</p><ul class="space-y-1">${step.examples.map((ex) => `<li class="flex items-start gap-2 text-sm text-via-text"><span class="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span><span class="italic">${ex}</span></li>`).join('')}</ul></div></div>`,
    })),
  )

  // Why 40% Is Discovery callout
  b.callout(
    'tip',
    'Most salespeople rush to pitch. They spend 5% of the conversation asking questions and 95% talking about their product. In consultative selling, that ratio is inverted. If you have done the diagnosis correctly, the prescription sells itself. The buyer hears their own needs reflected back, sees how your solution addresses each one, and the close feels like a natural conclusion, not a pressure moment.',
    'Why 40% Is Discovery',
  )

  // Inline exercise
  b.scenarioCard(
    fiveStepScenarios.map((s) => ({
      id: s.id,
      scenario: s.scenario,
      options: s.options,
      bestAnswerIndex: s.bestAnswerIndex,
      explanation: s.explanation,
    })),
    'Identify the Step',
  )

  return { courseId: COURSE_ID, moduleId: 'five-step-method', content: b.build() }
}

// ─── Module 6: When Patients Push Back ───────────────────

function whenPatientsPushBack(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'when-patients-push-back',
    'When Patients Push Back',
    'Objections are symptoms, not attacks',
    'border-teal-500',
    'ShieldAlert',
  )

  // Objections Are Symptoms
  b.heading('Objections Are Symptoms', 3)
  b.inlineImage('inline-prescription.jpg', 'Prescription medicine', 'right', 'small', 'Treat the root cause, not the symptom')
  b.paragraph(
    'When a patient says "I don\'t want surgery," a good doctor does not argue. They ask <em>why</em>. The fear might be about anesthesia. Or recovery time. Or cost. Or a bad experience with a previous procedure. The stated objection is rarely the root cause.',
  )
  b.paragraph(
    'Buyer objections work the same way. "Your prices are too high" might mean "I don\'t see the value," or "I can\'t afford the volume you\'re suggesting," or "My current supplier quoted less." Each root cause requires a different response. Reacting to the surface objection without diagnosing the underlying issue is like treating a symptom without understanding the disease.',
  )

  // K.L.A.P.D.O.C. — Structured Objection Handling
  b.heading('K.L.A.P.D.O.C. — Structured Objection Handling', 3)
  b.expandableCardGroup(
    klapdocSteps.map((step) => ({
      id: step.id,
      title: `${step.letter} — ${step.title}`,
      subtitle: step.description.slice(0, 130) + '…',
      badge: { text: step.letter, color: 'teal' as const },
      icon: step.letter === 'K' ? 'Pause' :
            step.letter === 'L' ? 'Ear' :
            step.letter === 'A' ? 'Heart' :
            step.letter === 'P' ? 'Search' :
            step.letter === 'D' ? 'Target' :
            step.letter === 'O' ? 'Zap' : 'CheckCircle',
      accentColor: 'border-teal-500',
      content: `<div class="space-y-3"><p>${step.description}</p><div class="bg-via-bg-subtle rounded-lg p-3"><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">In Practice</p><p class="italic">${step.example}</p></div></div>`,
    })),
  )

  // Common Objections Quick Reference
  b.heading('Common Objections Quick Reference', 3)
  b.expandableCardGroup(
    commonObjections.map((obj) => ({
      id: obj.id,
      title: obj.objection,
      accentColor: 'border-teal-500',
      content: `<div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs"><div><p class="font-semibold text-via-text-light uppercase tracking-wide mb-0.5">Root Issue</p><p>${obj.rootIssue}</p></div><div><p class="font-semibold text-teal-600 uppercase tracking-wide mb-0.5">Key Probe</p><p class="italic">${obj.keyProbe}</p></div><div><p class="font-semibold text-via-navy uppercase tracking-wide mb-0.5">Likely Overcome</p><p>${obj.likelyOvercome}</p></div></div>`,
    })),
  )

  // K.L.A.P.D.O.C. in Practice
  b.heading('K.L.A.P.D.O.C. in Practice', 3)
  b.paragraph('<strong>Example: "Your competitor offered a lower price"</strong>')
  b.bulletList([
    '<strong>K — Keep Calm</strong> Don\'t get defensive or immediately discount.',
    '<strong>L — Listen</strong> Let them explain the full situation.',
    '<strong>A — Acknowledge</strong> — "That\'s fair, price matters, especially when you\'re comparing suppliers."',
    '<strong>P — Probe</strong> — "Can you tell me more about what they\'re offering? Is it the same condition, same retailer source, manifested?"',
    '<strong>D — Define</strong> — "So the issue is the per-pallet price is higher, but we\'re comparing different conditions and sourcing levels?"',
    '<strong>O — Overcome</strong> — "Here\'s the thing: our loads come directly from the retailer, no middleman. That means fresher inventory and more consistent quality. When you factor in the resale rate, the per-unit economics often come out ahead."',
    '<strong>C — Close</strong> — "Would it help if I pulled a manifest so you can compare item-for-item?"',
  ], 'teal')
  b.paragraph('<strong>Example: "I\'ve been burned before by quality"</strong>')
  b.bulletList([
    '<strong>K — Keep Calm</strong> This is a trust issue, not an attack.',
    '<strong>L — Listen</strong> Let them tell the full story of what happened.',
    '<strong>A — Acknowledge</strong> — "I\'m sorry that happened. Bad experiences with quality are frustrating, especially when you\'ve invested money."',
    '<strong>P — Probe</strong> — "Was it the condition of the items, the mix of categories, or something else?"',
    '<strong>D — Define</strong> — "So the core issue was buying unmanifested loads and not knowing what you were getting until it arrived?"',
    '<strong>O — Overcome</strong> — "Our manifested programs list every item before you buy — brands, quantities, retail values. You can review the manifest and only purchase if it fits. Plus, you\'re welcome to visit the warehouse and see merchandise in person before committing."',
    '<strong>C — Close</strong> — "Would you like me to send you a sample manifest so you can see the level of detail?"',
  ], 'teal')

  // Industry Knowledge Is Your Best Tool
  b.heading('Industry Knowledge Is Your Best Tool', 3)
  b.paragraph(
    'Many objections can be addressed simply by knowing the industry well. When a buyer says "there\'s too much of one item in this load," someone without industry knowledge might get stuck. But an expert can reframe the conversation:',
  )
  b.callout(
    'info',
    '"There is a lot of that item, but the actual value of the load is in the other items. That concentrated item is a small percentage of the total load value. The margin on the rest more than makes up for it."',
    'Example',
  )
  b.paragraph(
    'Similarly, when a load seems "more expensive" than what a buyer is used to, your knowledge of the supply chain matters. If we hold a direct contract with consistent product, that consistency has real value: <em>"Some people would pay a premium for having something as consistent as this. Especially in liquidation, where consistency is rare."</em>',
  )

  // Picking Your Battles callout
  b.callout(
    'tip',
    'Not every objection needs to be overcome in the moment. Some buyers genuinely need time to think. Some objections are valid and the honest answer is "you\'re right, this might not be the right fit right now." Knowing when <strong>not</strong> to push is just as important as knowing how to overcome. A doctor who insists on a treatment the patient is not ready for loses the patient entirely.',
    'Picking Your Battles',
  )

  // Inline exercise
  b.scenarioCard(
    objectionScenarios.map((s) => ({
      id: s.id,
      scenario: s.scenario,
      options: s.options,
      bestAnswerIndex: s.bestAnswerIndex,
      explanation: s.explanation,
    })),
    'Handle the Objection',
  )

  return { courseId: COURSE_ID, moduleId: 'when-patients-push-back', content: b.build() }
}

// ─── Module 7: The Art of the Close ──────────────────────

function artOfTheClose(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'art-of-the-close',
    'The Art of the Close',
    'The follow-up appointment, not the final verdict',
    'border-teal-500',
    'Handshake',
  )

  // Closing Is a Natural Conclusion
  b.heading('Closing Is a Natural Conclusion', 3)
  b.paragraph(
    'Think about it this way: a doctor who has thoroughly examined a patient, explained the diagnosis, and laid out the treatment plan does not need to "close" the patient on scheduling a follow-up. The patient <em>wants</em> the follow-up because they trust the doctor\'s expertise.',
  )
  b.paragraph(
    'Closing in consultative sales works the same way. If Steps 1 through 4 were done well — you understood the buyer\'s business, made a targeted recommendation, explained how it works, and connected the benefits to their specific needs, the close should feel like the <strong>natural next step</strong>, not a high-pressure moment. If you find yourself straining to close, it usually means you did not do enough work in the earlier steps.',
  )

  // Eight Closing Techniques
  b.heading('Eight Closing Techniques', 3)
  b.expandableCardGroup(
    closingTechniques.map((technique) => ({
      id: technique.id,
      title: technique.name,
      subtitle: technique.whenToUse,
      icon: technique.icon,
      accentColor: 'border-teal-500',
      content: `<div class="space-y-3"><p>${technique.description}</p><div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">Examples</p><ul class="space-y-1">${technique.examples.map((ex) => `<li class="flex items-start gap-2 text-sm text-via-text"><span class="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span><span class="italic">${ex}</span></li>`).join('')}</ul></div></div>`,
    })),
  )

  // Choosing the Right Close
  b.heading('Choosing the Right Close', 3)
  b.expandableCardGroup([
    {
      id: 'close-sit-1',
      title: 'Buyer seems interested but hasn\'t committed',
      accentColor: 'border-teal-500',
      content: '<p><strong>Try:</strong> Trial Close or Alternative Close</p>',
    },
    {
      id: 'close-sit-2',
      title: 'Thorough discovery, clear needs identified',
      accentColor: 'border-teal-500',
      content: '<p><strong>Try:</strong> Summary Close</p>',
    },
    {
      id: 'close-sit-3',
      title: 'Multiple positive signals, conversation flowing',
      accentColor: 'border-teal-500',
      content: '<p><strong>Try:</strong> Assumed Close</p>',
    },
    {
      id: 'close-sit-4',
      title: 'Genuine time-limited inventory opportunity',
      accentColor: 'border-teal-500',
      content: '<p><strong>Try:</strong> Special Close</p>',
    },
    {
      id: 'close-sit-5',
      title: 'Buyer described active pain point from inaction',
      accentColor: 'border-teal-500',
      content: '<p><strong>Try:</strong> Fear Close (sparingly)</p>',
    },
    {
      id: 'close-sit-6',
      title: 'Thorough discovery, clear problem identified',
      accentColor: 'border-teal-500',
      content: '<p><strong>Try:</strong> Consultative Close</p>',
    },
    {
      id: 'close-sit-7',
      title: 'Buyer seems interested but something is holding them back',
      accentColor: 'border-teal-500',
      content: '<p><strong>Try:</strong> Level With Me Close</p>',
    },
  ])

  // Value-Based, Not Price-Based
  b.heading('Value-Based, Not Price-Based', 3)
  b.paragraph(
    'When you position yourself as an expert — someone who diagnoses needs and prescribes solutions — pricing discussions shift from "how cheap?" to "what value?" Buyers evaluate trusted advisors differently than they evaluate vendors. They weigh credibility, reliability, and the relationship alongside the price tag.',
  )
  b.paragraph(
    'This is why Via Trading maintains a <strong>90%+ repeat buyer rate</strong>. Buyers do not return year after year for the cheapest price. They return because they trust the Account Manager, the quality is consistent, and the experience is worth the investment.',
  )

  // Language Matters
  b.heading('Language Matters', 3)
  b.paragraph(
    'Small word choices shape how buyers perceive you. The right language reinforces your position as a consultative partner. The wrong language makes you sound like everyone else.',
  )
  b.expandableCardGroup(
    languageGuidance.map((item, i) => ({
      id: `lang-${i}`,
      title: `Say: ${item.doSay}`,
      accentColor: 'border-teal-500',
      content: `<div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs"><div><p class="font-semibold text-emerald-600 uppercase tracking-wide mb-0.5">Say This</p><p>${item.doSay}</p></div><div><p class="font-semibold text-red-500 uppercase tracking-wide mb-0.5">Not This</p><p>${item.dontSay}</p></div><div><p class="font-semibold text-via-text-light uppercase tracking-wide mb-0.5">Why</p><p>${item.why}</p></div></div>`,
    })),
  )

  // The Universal Close Rule callout
  b.callout(
    'tip',
    'If the conversation was good, the close should feel natural. If you are straining to close, you probably did not do enough work in Steps 1 through 4. Go back to the diagnosis.',
    'The Universal Close Rule',
  )

  return { courseId: COURSE_ID, moduleId: 'art-of-the-close', content: b.build() }
}

// ─── Module 8: From Transaction to Partnership ───────────

function transactionToPartnership(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'transaction-to-partnership',
    'From Transaction to Partnership',
    'A good doctor doesn\'t disappear after one visit',
    'border-teal-500',
    'Repeat',
  )

  // The Ongoing Relationship
  b.heading('The Ongoing Relationship', 3)
  b.paragraph(
    'A doctor who diagnoses a condition, prescribes treatment, and never follows up is not practicing good medicine. They check in. They adjust the treatment if needed. They monitor progress. The relationship continues beyond the initial appointment.',
  )
  b.paragraph(
    'The Account Manager relationship works the same way. The first sale is just the beginning. <strong>Growing accounts</strong>, <strong>re-engaging dormant buyers</strong>, and <strong>building lasting partnerships</strong> is where the real value lives, for both Via Trading and the buyer. This is what transforms a transaction into a partnership.',
  )

  // Three Strategies for Growing Accounts
  b.heading('Three Strategies for Growing Accounts', 3)
  b.expandableCardGroup(
    growthStrategies.map((strategy) => ({
      id: strategy.id,
      title: strategy.title,
      subtitle: strategy.description.slice(0, 130) + '…',
      icon: strategy.icon,
      accentColor: 'border-teal-500',
      content: `<div class="space-y-3"><p>${strategy.description}</p><div class="bg-via-bg-subtle rounded-lg p-3"><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">Example Dialogue</p><p class="italic">${strategy.example}</p></div></div>`,
    })),
  )

  // Re-Engaging Dormant Accounts
  b.heading('Re-Engaging Dormant Accounts', 3)
  b.paragraph(
    'Not every buyer who goes quiet is lost. Life gets busy. Suppliers change. Business priorities shift. A well-timed, well-crafted re-engagement call can bring back buyers who genuinely wanted to continue but just fell off.',
  )
  b.callout(
    'info',
    '"Hi [Name], this is [Your Name] at Via Trading. I noticed we haven\'t worked together in a while and wanted to reconnect. Is there a reason we haven\'t done business again?"\n\n"The purpose of this call is not to sell, but to understand how we might work together again. May I ask you a few questions?"',
    'Re-Engagement Opening',
  )

  b.paragraph('<strong>Common Responses & How to Handle Them</strong>')
  b.bulletList(
    dormantResponses.map((response) =>
      `<strong>${response.buyerSays}</strong> — ${response.approach}`
    ),
    'teal',
  )

  // Re-Qualification by Business Type
  b.heading('Re-Qualification by Business Type', 3)
  b.paragraph(
    'When re-engaging, re-qualify with questions tailored to their business type. Their situation may have changed since they last purchased.',
  )
  b.iconCardGrid(3, [
    { icon: 'Store', title: 'Retail Track', description: 'Store count, foot traffic, current inventory sources, restock frequency, what categories move best.' },
    { icon: 'Building2', title: 'Wholesale Track', description: 'Buyer network size, categories in demand, volume needs, warehouse capacity, shipping preferences.' },
    { icon: 'Globe', title: 'International Track', description: 'Destination countries, container size, freight arrangement, FOB preferences, customs considerations.' },
  ])

  // Trust Is the Product
  b.heading('Trust Is the Product', 3)
  b.inlineImage('inline-cliff-helping.jpg', 'Helping hand — trust and partnership', 'right', 'small', 'Trust is the product')
  b.paragraph(
    'In liquidation, buyers are not just buying inventory. They are buying the person they are speaking to. Many buyers have been burned before: they purchased a bad load, did not get what they paid for, or dealt with a supplier who disappeared after the sale. That history shapes how they approach every new relationship.',
  )
  b.paragraph(
    'This is why <strong>transparency and setting proper expectations</strong> matter more than making a sale. We do not oversell. It does not benefit us to sell one thing, one time, to one buyer. We want their business to succeed so that we can continue to scale with them. That means being honest about what a load contains, what condition to expect, and what the realistic outcomes are.',
  )
  b.paragraph(
    'Via Trading is customer-service centered. Across every stage of the buyer journey, we show our values and provide a good experience. That is why the <strong>90%+ repeat buyer rate</strong> exists. Buyers come back because they trust the relationship.',
  )

  // Proactive, Not Reactive
  b.heading('Proactive, Not Reactive', 3)
  b.paragraph(
    'Good Account Managers do not wait for the buyer to call. They reach out proactively with relevant opportunities, check in on how the last order performed, and ask about upcoming needs. This is the difference between a partner and a vendor.',
  )
  b.paragraph(
    'When you know a buyer\'s business well enough to send them a message like "We just got in a load that fits exactly what you described last month, want me to hold it for you?" that is the consultative relationship at its best.',
  )

  // The Long Game callout
  b.callout(
    'tip',
    'The buyer who starts with one pallet today might be ordering truckloads in six months. The exporter who is "just exploring" might become a recurring container buyer. Every relationship starts somewhere. How you treat the first conversation determines whether there is a second one. We are not just selling product. We are solving a problem for buyers and building value on what we offer.',
    'The Long Game',
  )

  // Inline exercise
  b.fillInBlank(
    accountGrowthFillBlanks.map((f) => ({
      id: f.id,
      sentence: f.sentence,
      blank: f.blank,
      options: f.options,
      correctIndex: f.correctIndex,
    })),
    'Quick Check: Account Growth',
  )

  return { courseId: COURSE_ID, moduleId: 'transaction-to-partnership', content: b.build() }
}

// ─── Module 9: Triage & Diagnosis: BDR + AM ─────────────

function triageAndDiagnosis(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'triage-and-diagnosis',
    'Triage & Diagnosis: BDR + AM',
    'Two roles, one team. The hospital model.',
    'border-teal-500',
    'Hospital',
  )

  // The Hospital Model
  b.heading('The Hospital Model', 3)
  b.paragraph(
    'When you walk into a hospital, the first person you see is not the surgeon. It is the triage nurse. They greet you, ask about your symptoms, take your vitals, and determine which specialist you need. Their job is not to diagnose or treat. It is to <strong>gather the right information and route you to the right expert</strong>.',
  )
  b.paragraph(
    'Then the doctor takes over. They already have context from the nurse\'s notes. They do not ask you to repeat your entire story. They go <em>deeper</em>, asking follow-up questions, running tests, forming a diagnosis, and prescribing a treatment plan.',
  )
  b.paragraph(
    'This is exactly how Via Trading\'s <strong>BDR + AM</strong> system works. Two distinct roles that complement each other, each with clear responsibilities and boundaries.',
  )

  // The BDR: Triage Nurse
  b.heading('The BDR: Triage Nurse', 3)
  b.inlineImage('inline-bdr-sales.jpg', 'Business Development Representative', 'right', 'small', 'BDR: Qualify and route')
  b.twoColumnList(
    'What BDRs Do',
    'emerald',
    [
      'Welcome newly registered contacts',
      'Ask discovery questions to understand the buyer',
      'Qualify based on business type, volume, timing',
      'Route to the right Account Manager',
      'Document everything for the AM',
    ],
    'What BDRs Don\'t Do',
    'red',
    [
      'Close deals or negotiate pricing',
      'Quote specific prices or freight costs',
      'Promise specific inventory or availability',
      'Provide deep product education',
      'Handle complex objections in detail',
    ],
  )
  b.flowDiagram(
    'BDR Call Flow',
    ['Opening', 'Permission', 'Discovery (7 Questions)', 'Closing & Routing', 'Documentation'],
    'bg-blue-600',
    2,
  )

  // The AM: The Doctor
  b.heading('The AM: The Doctor', 3)
  b.inlineImage('inline-account-manager.png', 'Strategic Account Manager', 'left', 'small', 'AM: Own the relationship')
  b.paragraph(
    'The Account Manager owns the buyer relationship from the first substantive conversation through ongoing account management. They work through <strong>all five steps</strong> of the consultative method. They can diagnose, prescribe, close, and follow up.',
  )
  b.bulletList([
    'Consult',
    'Close',
    'Grow Accounts',
    'Retain',
    'Re-Engage',
  ], 'teal')
  b.callout(
    'info',
    '"Hi [Name], this is [Your Name], your Account Manager at Via Trading. I got some great notes from my colleague about your business, it sounds like you\'re running a discount store in Phoenix and looking to source general merchandise at pallet volume. I\'d love to hear more about what you\'re doing and see how we can help."\n\nNotice: references BDR notes (proves preparation), validates the buyer\'s situation, transitions to deeper discovery.',
    'AM Opening (Routed Lead)',
  )

  // The Handoff: Chart Notes
  b.heading('The Handoff: Chart Notes', 3)
  b.paragraph(
    'The BDR\'s documentation <strong>is</strong> the patient chart. When the AM picks up the relationship, they should never make the buyer repeat everything they told the BDR. The handoff notes include:',
  )
  b.iconCardGrid(3, [
    { icon: 'FileText', title: 'Business Type', description: 'What kind of business the buyer operates' },
    { icon: 'FileText', title: 'How They Sell', description: 'Sales channel and method' },
    { icon: 'FileText', title: 'Inventory Interest', description: 'Categories and conditions of interest' },
    { icon: 'FileText', title: 'Experience Level', description: 'New to liquidation or experienced' },
    { icon: 'FileText', title: 'Volume Preference', description: 'Cases, pallets, truckloads' },
    { icon: 'FileText', title: 'Purchase Timing', description: 'Immediate or future buying intent' },
    { icon: 'FileText', title: 'Location', description: 'Geographic location of the buyer' },
    { icon: 'FileText', title: 'Key Notes', description: 'Important details and context' },
    { icon: 'FileText', title: 'Routing Recommendation', description: 'Suggested AM or team' },
  ])
  b.paragraph(
    'The quality of the handoff directly impacts the AM\'s first impression. A buyer who has to repeat themselves feels like no one was listening. A buyer whose new AM references their specific situation feels valued and respected.',
  )

  // Shared Tone Principles
  b.heading('Shared Tone Principles', 3)
  b.paragraph(
    'Both BDRs and AMs share the same foundational tone. Regardless of role, every conversation should feel:',
  )
  b.bulletList(
    tonePrinciples.map((p) => `<strong>${p.principle}:</strong> ${p.description}`),
    'teal',
  )

  // Objection Handling: BDR vs. AM
  b.heading('Objection Handling: BDR vs. AM', 3)
  b.twoColumnList(
    'BDR Pattern',
    'blue',
    [
      '<strong>Acknowledge → Brief Answer → Redirect to AM</strong>',
      '"Great question, pricing depends on the program and what you\'re looking for. Your Account Manager will be the best person to walk you through options that fit your business."',
      'The BDR is a bridge, not a closer.',
    ],
    'AM Pattern',
    'teal',
    [
      '<strong>Full K.L.A.P.D.O.C.</strong>',
      '"I understand price is a big factor. When you say too high — compared to what you\'re paying now, or where you need to be for margin? … So at truckload pricing, you\'d be well within your target."',
      'The AM diagnoses and resolves.',
    ],
  )

  // Two Roles, One Mission callout
  b.callout(
    'tip',
    'The BDR and AM are not competing. They are collaborating. The triage nurse makes the doctor more effective by providing context. The doctor makes the nurse\'s work meaningful by delivering on the promise of expert care. When both roles are done well, the buyer experiences a seamless journey from first contact to lasting partnership.',
    'Two Roles, One Mission',
  )

  // Inline exercise
  b.scenarioCard(
    roleScenarios.map((s) => ({
      id: s.id,
      scenario: s.scenario,
      options: s.options,
      bestAnswerIndex: s.bestAnswerIndex,
      explanation: s.explanation,
    })),
    'BDR or AM?',
  )

  return { courseId: COURSE_ID, moduleId: 'triage-and-diagnosis', content: b.build() }
}

// ─── Module 10: Consultative Sales Quiz ──────────────────

function salesPhilosophyQuiz(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'sales-philosophy-quiz',
    'Consultative Sales Knowledge Check',
    'Test your understanding of the consultative selling methodology',
    'border-teal-500',
    'ClipboardCheck',
  )

  b.paragraph(
    'This quiz covers all the key concepts from the Consultative Sales course. You need to score at least 85% to pass. Good luck!',
  )

  b.quizData({
    termMatch: salesPhilosophySectionedQuiz.termMatch,
    multipleChoice: salesPhilosophySectionedQuiz.multipleChoice.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    })),
    fillInBlank: salesPhilosophySectionedQuiz.fillInBlank.map((f) => ({
      id: f.id,
      sentence: f.sentence,
      blank: f.blank,
      options: f.options,
      correctIndex: f.correctIndex,
    })),
    passThreshold: 0.85,
    nextCourse: { id: 'bdr-role', title: 'BDR Role Training' },
  })

  return { courseId: COURSE_ID, moduleId: 'sales-philosophy-quiz', content: b.build() }
}

// ─── Export all Course 4 entries ──────────────────────────

export function getCourse4Entries(): MigrationEntry[] {
  return [
    consultativeMindset(),
    askingRightQuestions(),
    listeningBeyondWords(),
    knowYourPatients(),
    fiveStepMethod(),
    whenPatientsPushBack(),
    artOfTheClose(),
    transactionToPartnership(),
    triageAndDiagnosis(),
    salesPhilosophyQuiz(),
  ]
}
