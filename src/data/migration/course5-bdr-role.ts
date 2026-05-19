/**
 * CMS Migration — Course 5: BDR Role Training
 * Converts 7 lesson modules + 1 quiz to PageContent format.
 */
import { ContentBuilder, resetUid } from './helpers'
import type { MigrationEntry } from './helpers'
import {
  bdrResponsibilities,
  discoveryQuestions,
  bdrObjections,
  intentSignals,
  hubspotPlaybooks,
  callNoteTemplate,
  dailyWorkflowSteps,
} from '../modules/bdr-role/bdrData'
import {
  roleBoundaryScenarios,
  discoveryFillBlanks,
  intentSignalScenarios,
  followUpScenarios,
} from '../modules/bdr-role/inlineExercises'
import { bdrRoleSectionedQuiz } from '../modules/bdr-role/courseQuiz'

const COURSE_ID = 'bdr-role'

// ─── Module 1: Your Role as a BDR ───────────────────────────

function bdrRoleOverview(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'bdr-role-overview',
    'Your Role as a BDR',
    'The first impression. The front door of Via Trading.',
    'border-sky-500',
    'Headphones',
  )

  // Opening
  b.paragraph(
    'As a Business Development Representative, you are the first voice a new prospect hears from Via Trading. You are not here to sell — you are here to welcome, discover, and route. Think of yourself as the triage nurse: your job is to gather context, understand the buyer\'s situation, and connect them with the right Account Manager who can actually help.',
  )

  // What You Do / What You Don't Do
  b.heading('What You Do / What You Don\'t Do', 3)
  b.twoColumnList(
    'What BDRs Do',
    'emerald',
    bdrResponsibilities.do,
    'What BDRs Don\'t Do',
    'red',
    bdrResponsibilities.dont,
  )

  // Where You Fit
  b.heading('Where You Fit', 3)
  b.paragraph(
    'The BDR sits between marketing (website registrations) and sales (Account Managers). You are the bridge. Marketing generates the lead, you qualify and add context, and the AM takes it from there.',
  )
  b.flowDiagram(
    'The BDR Pipeline',
    ['Registration', 'BDR Discovery', 'AM Handoff', 'Sale'],
    'bg-sky-600',
    1,
  )

  // Your Mindset
  b.callout(
    'info',
    'You are not selling. You are serving. Every call is a chance to make someone feel heard and valued. The better your discovery, the easier the AM\'s job — and the faster the buyer gets what they need.',
    'Your Mindset',
  )

  // Inline exercise
  b.scenarioCard(
    roleBoundaryScenarios.map((s) => ({
      id: s.id,
      scenario: s.scenario,
      options: s.options,
      bestAnswerIndex: s.bestAnswerIndex,
      explanation: s.explanation,
    })),
    'BDR or Not BDR?',
  )

  return { courseId: COURSE_ID, moduleId: 'bdr-role-overview', content: b.build() }
}

// ─── Module 2: Your Daily Workflow ───────────────────────────

function bdrDailyWorkflow(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'bdr-daily-workflow',
    'Your Daily Workflow',
    'Structure your day for maximum impact',
    'border-sky-500',
    'Clock',
  )

  // Opening
  b.paragraph(
    'A great BDR does not wing it. Your day has a rhythm: prep, call, document, follow up, repeat. This structure keeps you organized and ensures no lead falls through the cracks.',
  )

  // Daily Schedule Timeline
  b.heading('Daily Schedule', 3)
  b.iconCardGrid(
    1,
    dailyWorkflowSteps.map((step) => ({
      icon: step.icon as string,
      title: `${step.time} — ${step.title}`,
      description: `${step.description}\n${step.details.map((d) => `• ${d}`).join('\n')}`,
    })),
  )

  // Call Volume Expectations
  b.heading('Call Volume Expectations', 3)
  b.paragraph(
    'Your exact call targets will be set by your Sales Director. As a general guideline, aim for quality over quantity — a great 5-minute discovery call that produces a qualified handoff is worth more than 20 rushed dials with no context.',
  )

  // The 80/20 Rule
  b.callout(
    'info',
    'Spend 80% of your phone time on new leads and follow-ups, and 20% on administrative tasks like documentation and queue management. If you are spending more time logging than calling, simplify your notes.',
    'The 80/20 Rule',
  )

  return { courseId: COURSE_ID, moduleId: 'bdr-daily-workflow', content: b.build() }
}

// ─── Module 3: Opening the Call ──────────────────────────────

function bdrOpeningCalls(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'bdr-opening-calls',
    'Opening the Call',
    'The first 30 seconds set the tone for everything',
    'border-sky-500',
    'PhoneCall',
  )

  // Opening
  b.inlineImage('inline-bdr-opening-call.jpg', 'Making the first call', 'right', 'small')
  b.paragraph(
    'You have about 30 seconds to earn the right to continue the conversation. The opening is not a pitch — it is a warm welcome, a clear reason for calling, and a simple ask for permission.',
  )

  // Key Elements of the Opening
  b.heading('Key Elements of the Opening', 3)
  b.bulletList([
    '<strong>Welcome tone</strong> — Acknowledge their registration as a positive step',
    '<strong>Your name</strong> — Introduce yourself clearly',
    '<strong>Clear purpose</strong> — Explain why you\'re calling (routing, not selling)',
    '<strong>Time expectation</strong> — Set it as a quick conversation ("a few minutes")',
    '<strong>Permission</strong> — Ask if it\'s a good time before diving in',
  ])

  // Professional Script
  b.heading('Professional Opening Script', 3)
  b.callout(
    'info',
    '"Hi [Name], thank you for registering with Via Trading and welcome to our community of entrepreneurs and business buyers. My name is [Your Name], and I\'m reaching out so we can help you as quickly as possible. I\'d like to ask a few quick questions about your business and the type of inventory you\'re looking for so we can assign you to the Account Manager who\'s the best fit for your needs. It should only take a minute or two. Is now a good time?"',
  )

  // Casual Script
  b.heading('Casual Opening Script', 3)
  b.callout(
    'info',
    '"Hey [Name], thanks for signing up with us. This is [Your Name] from Via Trading. I wanted to reach out personally to help get you connected with the right person on our team. Do you have a few minutes to chat about what you\'re looking for?"',
  )

  // Opening Don'ts
  b.heading('Opening Don\'ts', 3)
  b.bulletList(
    [
      'Don\'t promise an immediate transfer or live Account Manager — you may not control the routing timeline',
      'Don\'t launch into questions before getting permission — always ask if now is a good time',
      'Don\'t sound scripted or robotic — make the language your own, keep it conversational',
      'Don\'t ask for commitment — this is a welcome call, not a closing call',
    ],
    'red',
  )

  // Pro Tips
  b.callout(
    'tip',
    'Match their energy. If they sound busy, keep it tight. If they are chatty, let them lead a little. The opening is about reading the room, not reciting a script.',
    'Pro Tips',
  )

  return { courseId: COURSE_ID, moduleId: 'bdr-opening-calls', content: b.build() }
}

// ─── Module 4: The Discovery Framework ───────────────────────

function bdrDiscoveryFramework(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'bdr-discovery-framework',
    'The Discovery Framework',
    'Seven questions. One at a time. Listen first.',
    'border-sky-500',
    'Search',
  )

  // Opening
  b.inlineImage('inline-bdr-discovery.jpg', 'Discovery conversation', 'left', 'small')
  b.paragraph(
    'Discovery is the heart of the BDR call. Your goal is to understand enough about the buyer\'s business to route them to the right Account Manager with useful context. The key principle: ask one question at a time, let them answer fully, and acknowledge what they said before moving on.',
  )

  // The Flow
  b.flowDiagram(
    'Discovery Flow',
    [
      'Business Type',
      'Inventory Interest',
      'Experience',
      'Volume',
      'Timing',
      'Location',
      'Anything Else',
    ],
    'bg-sky-600',
  )

  // 7 Discovery Questions
  b.heading('The 7 Discovery Questions', 3)
  b.expandableCardGroup(
    discoveryQuestions.map((q) => ({
      id: q.id,
      title: q.question,
      subtitle: q.goal,
      badge: { text: `Q${q.number}`, color: 'sky' as const },
      accentColor: 'border-sky-500',
      content: `<div class="space-y-3">${
        q.followUps.length > 0
          ? `<div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">Follow-Up Questions</p><ul class="space-y-1">${q.followUps.map((fu) => `<li>• <em>${fu}</em></li>`).join('')}</ul></div>`
          : ''
      }<div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">Listen For</p><ul class="space-y-1">${q.listenFor.map((lf) => `<li>• ${lf}</li>`).join('')}</ul></div></div>`,
    })),
  )

  // The Golden Rule
  b.callout(
    'info',
    'Ask. Listen. Acknowledge. Then ask the next question. If you fire questions back to back without acknowledging, it feels like an interrogation, not a conversation.',
    'The Golden Rule',
  )

  // Inline exercise
  b.fillInBlank(
    discoveryFillBlanks.map((f) => ({
      id: f.id,
      sentence: f.sentence,
      blank: f.blank,
      options: f.options,
      correctIndex: f.correctIndex,
    })),
    'Discovery Quick Check',
  )

  return { courseId: COURSE_ID, moduleId: 'bdr-discovery-framework', content: b.build() }
}

// ─── Module 5: Handling Objections & Routing ─────────────────

function bdrObjectionsRouting(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'bdr-objections-routing',
    'Handling Objections & Routing',
    'Acknowledge, redirect, and know when to hand off',
    'border-sky-500',
    'ShieldCheck',
  )

  // Opening
  b.paragraph(
    'As a BDR, you will hear objections. The key difference between you and an AM: you do not resolve them — you acknowledge and redirect. Your pattern is simple: Acknowledge, give a Brief Answer, then Route to the AM.',
  )

  // The BDR Objection Pattern
  b.heading('The BDR Objection Pattern', 3)
  b.flowDiagram(
    'The BDR Objection Pattern',
    ['Acknowledge', 'Brief Answer', 'Redirect to AM'],
    'bg-sky-600',
  )
  b.paragraph(
    'You are a bridge, not a closer. Validate their concern, give enough context to maintain trust, and hand off to the specialist.',
  )

  // Common Objections
  b.heading('Common Objections', 3)
  b.expandableCardGroup(
    bdrObjections.map((obj) => ({
      id: obj.id,
      title: obj.objection,
      subtitle: obj.whyTheyAsk,
      accentColor: 'border-sky-500',
      content: `<div class="space-y-3"><div><p class="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">How to Respond</p><p><em>${obj.response}</em></p></div><div><p class="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">What NOT to Do</p><p>${obj.doNot}</p></div></div>`,
    })),
  )

  // Reading Intent Signals
  b.heading('Reading Intent Signals', 3)
  intentSignals.forEach((signal) => {
    const labelMap: Record<string, string> = {
      strong: 'Strong Intent',
      medium: 'Medium Intent',
      exploratory: 'Exploratory / Low Intent',
    }
    const styleMap: Record<string, 'info' | 'warning' | 'tip'> = {
      strong: 'tip',
      medium: 'warning',
      exploratory: 'info',
    }
    b.callout(
      styleMap[signal.level],
      `${signal.signals.map((s) => `• ${s}`).join('\n')}\n\n<strong>Action:</strong> ${signal.action}`,
      labelMap[signal.level],
    )
  })

  // When to Hand Off
  b.heading('When to Hand Off', 3)
  b.paragraph(
    'You have gotten enough when you understand their business type, inventory interest, experience, volume, timing, and location. You do not need their entire business plan, detailed product specifications, exact budget numbers, or a complete decision timeline.',
  )

  // Inline exercise
  b.scenarioCard(
    intentSignalScenarios.map((s) => ({
      id: s.id,
      scenario: s.scenario,
      options: s.options,
      bestAnswerIndex: s.bestAnswerIndex,
      explanation: s.explanation,
    })),
    'Read the Intent',
  )

  return { courseId: COURSE_ID, moduleId: 'bdr-objections-routing', content: b.build() }
}

// ─── Module 6: Your Toolbox: HubSpot & Beyond ───────────────

function bdrToolsHubspot(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'bdr-tools-hubspot',
    'Your Toolbox: HubSpot & Beyond',
    'The systems that keep everything organized',
    'border-sky-500',
    'Wrench',
  )

  // Opening
  b.paragraph(
    'Your CRM is your second brain. Every call, every note, every handoff lives in HubSpot. Master it early — it is the difference between organized professionals and people who lose track of leads.',
  )

  // HubSpot Essentials
  b.heading('HubSpot Essentials', 3)
  b.iconCardGrid(2, [
    {
      icon: 'ContactRound',
      title: 'Contact Records',
      description:
        'Where all prospect info lives — registration data, call notes, deal stage, AM assignment, and communication history.',
    },
    {
      icon: 'PhoneCall',
      title: 'Call Logging',
      description:
        'Log every call within 15 minutes. Include date/time, duration, outcome (connected, voicemail, no answer), and key notes.',
    },
    {
      icon: 'BookOpen',
      title: 'Playbooks',
      description:
        'Structured call guides for different scenarios. Reference during calls for the right questions in the right sequence.',
    },
    {
      icon: 'Mail',
      title: 'Sequences',
      description:
        'Automated email nurture sequences that run after registration. The AM Introduction Sequence sends 3 emails over 5 days.',
    },
  ])

  // The 4 Playbooks
  b.heading('The 4 Playbooks', 3)
  b.expandableCardGroup(
    hubspotPlaybooks.map((pb) => ({
      id: pb.id,
      title: pb.name,
      subtitle: pb.whenToUse,
      accentColor: 'border-sky-500',
      content: `<div class="space-y-3"><p>${pb.purpose}</p><div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">Key Questions</p><ul class="space-y-1">${pb.keyQuestions.map((q) => `<li>• <em>${q}</em></li>`).join('')}</ul></div></div>`,
    })),
  )

  // WhatsApp Snippets
  b.heading('WhatsApp Snippets', 3)
  b.paragraph(
    'AM introduction snippets are available in multiple languages for post-handoff outreach. These are used by Account Managers after BDR handoff, but good to know they exist:',
  )
  b.iconCardGrid(3, [
    { icon: 'MessageSquare', title: 'English', description: 'Shortcut: #introam' },
    { icon: 'MessageSquare', title: 'Spanish', description: 'Shortcut: #introames' },
    { icon: 'MessageSquare', title: 'French', description: 'Shortcut: #introamfr' },
  ])

  // Aircall Basics
  b.heading('Aircall Basics', 3)
  b.paragraph(
    'Your phone system for making and receiving calls. Training on Aircall will be covered separately — for now, know that all calls made through Aircall are automatically logged to HubSpot.',
  )

  // Call Documentation Template
  b.heading('Call Documentation Template', 3)
  b.paragraph(
    'Use this template when logging calls in HubSpot. Fill in every field while details are fresh — ideally within 15 minutes of the call.',
  )
  b.paragraph(
    `<pre>${callNoteTemplate}</pre>`,
  )

  return { courseId: COURSE_ID, moduleId: 'bdr-tools-hubspot', content: b.build() }
}

// ─── Module 7: Follow-Ups & Accountability ───────────────────

function bdrFollowUps(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'bdr-follow-ups',
    'Follow-Ups & Accountability',
    'The handoff doesn\'t end when you hang up',
    'border-sky-500',
    'RefreshCcw',
  )

  // Opening
  b.paragraph(
    'Your job does not end when the call ends. A BDR is accountable for the full loop: discovery, documentation, routing, and confirmation. If you route a lead and the AM never follows up, that is your problem too.',
  )

  // Post-Call Checklist
  b.heading('Post-Call Checklist', 3)
  b.iconCardGrid(1, [
    {
      icon: 'Clock',
      title: 'Within 15 minutes — Log & Document',
      description:
        '• Log the call in HubSpot (date/time, duration, outcome)\n• Complete all discovery fields while details are fresh\n• Add any key notes the AM needs to know',
    },
    {
      icon: 'Mail',
      title: 'Within 30 minutes — Route to AM',
      description:
        '• Send a summary note to the assigned AM\n• Include: contact info, business type, inventory interest, volume, timing, location\n• Flag special context: "new to liquidation," "wants to visit warehouse," etc.',
    },
    {
      icon: 'CheckCircle',
      title: 'Same day — Confirm Handoff',
      description:
        '• Check that the AM received and acknowledged the handoff\n• If no acknowledgment, follow up with the AM directly',
    },
    {
      icon: 'Phone',
      title: 'Next day — Verify Contact',
      description:
        '• Check HubSpot to see if the AM has made contact\n• If not, follow up: "Hey, did you connect with Sarah from yesterday?"',
    },
  ])

  // AM Handoff Quality
  b.heading('What a Good Handoff Looks Like', 3)
  b.paragraph(
    'A quality handoff note gives the AM everything they need to start the conversation without making the buyer repeat themselves.',
  )
  b.callout(
    'info',
    '"Sarah is a reseller in Phoenix selling on Amazon. Looking for general merchandise, pallets or mixed loads. First-time buyer with capital to start. Interested in visiting the warehouse to see product. Good opportunity."',
    'Example Handoff Note',
  )

  // No-Answer Follow-Up Cadence
  b.heading('No-Answer Follow-Up Cadence', 3)
  b.paragraph(
    'Not everyone picks up the first time. Follow a structured cadence so you stay persistent without being a nuisance.',
  )
  b.bulletList([
    '<strong>Day 1</strong> — First call attempt',
    '<strong>Day 2</strong> — Second call + voicemail',
    '<strong>Day 3</strong> — Email or WhatsApp message',
    '<strong>Day 5</strong> — Final call attempt',
    '<strong>After Day 5</strong> — Mark as unresponsive, move on to next lead',
  ])

  // Re-Engagement Calls
  b.heading('Re-Engagement Calls', 3)
  b.paragraph(
    'Calling dormant accounts requires a different tone than calling new registrations. You are reconnecting, not introducing. Reference the past relationship, ask what has changed, and use the BDR Qualifying Re-Engage playbook.',
  )
  b.bulletList([
    'Adjust your opening — reference that they\'ve worked with Via before',
    'Ask what\'s changed in their business since they last purchased',
    'Listen for why they stopped: service gaps, product issues, or simply got busy',
    'Position the call as a fresh start, not a guilt trip',
    'Use the Re-Engage playbook in HubSpot for structured guidance',
  ])

  // Accountability Loop
  b.callout(
    'info',
    'The best BDRs do not just route leads — they follow up to make sure those leads got served. Your AMs are busy. A quick "Hey, did you connect with Sarah from yesterday?" goes a long way.',
    'Your Accountability Loop',
  )

  // Inline exercise
  b.scenarioCard(
    followUpScenarios.map((s) => ({
      id: s.id,
      scenario: s.scenario,
      options: s.options,
      bestAnswerIndex: s.bestAnswerIndex,
      explanation: s.explanation,
    })),
    'Follow-Up Check',
  )

  return { courseId: COURSE_ID, moduleId: 'bdr-follow-ups', content: b.build() }
}

// ─── Module 8: BDR Role Quiz ─────────────────────────────────

function bdrRoleQuizModule(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'bdr-role-quiz',
    'BDR Role Knowledge Check',
    'Test your understanding of the BDR role and responsibilities',
    'border-sky-500',
    'ClipboardCheck',
  )

  b.paragraph(
    'This quiz covers all the key concepts from the BDR Role Training course. You need to score at least 85% to pass. Good luck!',
  )

  b.quizData({
    termMatch: bdrRoleSectionedQuiz.termMatch,
    multipleChoice: bdrRoleSectionedQuiz.multipleChoice.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    })),
    fillInBlank: bdrRoleSectionedQuiz.fillInBlank.map((f) => ({
      id: f.id,
      sentence: f.sentence,
      blank: f.blank,
      options: f.options,
      correctIndex: f.correctIndex,
    })),
    passThreshold: 0.85,
    nextCourse: { id: 'am-role', title: 'AM Role Training' },
  })

  return { courseId: COURSE_ID, moduleId: 'bdr-role-quiz', content: b.build() }
}

// ─── Export all Course 5 entries ─────────────────────────────

export function getCourse5Entries(): MigrationEntry[] {
  return [
    bdrRoleOverview(),
    bdrDailyWorkflow(),
    bdrOpeningCalls(),
    bdrDiscoveryFramework(),
    bdrObjectionsRouting(),
    bdrToolsHubspot(),
    bdrFollowUps(),
    bdrRoleQuizModule(),
  ]
}
