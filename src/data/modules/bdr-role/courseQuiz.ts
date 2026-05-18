import type { QuizQuestion, SectionedQuiz } from '../../../types'

/**
 * End-of-course quiz for "BDR Role Training"
 * Sectioned format: 5 term match + 6 MC + 4 fill-in-blank = 15 items
 * Passing score: 85% (13 of 15 correct)
 *
 * CONCEPT ISOLATION (no cross-section leakage):
 *   TM: BDR, Discovery Framework, Intent Signal, HubSpot Playbook, Call Documentation
 *   MC: pricing redirect, call duration, strong-intent handling,
 *       call sequence, post-routing follow-up, supplier objection
 *   FIB: one question at a time, 15-minute doc window, 7 discovery questions,
 *       BDR Qualifying Re-Engage playbook
 */

export const bdrRoleQuiz: QuizQuestion[] = [
  {
    id: 'bdr-cq-1',
    question: 'A new buyer asks "How much does it cost?" early in the call. What should a BDR do?',
    options: [
      'Quote a ballpark price range to keep the conversation going',
      'Tell them pricing is confidential and move on to the next question',
      'Acknowledge the question, explain that pricing varies by program and volume, and let them know their Account Manager will walk them through the right options',
      'Look up current pricing in HubSpot and share the screen with them',
    ],
    correctIndex: 2,
    explanation:
      'BDRs never quote prices because pricing depends on too many variables — program, category, volume, and shipping. Giving an incorrect number sets the wrong expectation. The right approach is to acknowledge ("I totally understand — pricing is important"), briefly explain it varies, and redirect to the AM.',
  },
  {
    id: 'bdr-cq-2',
    question: 'How long should a typical BDR discovery call last?',
    options: [
      '1-2 minutes — just capture basic contact info and transfer quickly',
      '5-8 minutes — enough to complete discovery without losing momentum or overstepping your role',
      '15-20 minutes — take time to cover everything in depth and build rapport',
      'As long as the buyer wants to talk — never cut a conversation short',
    ],
    correctIndex: 1,
    explanation:
      'A BDR call should last about 5-8 minutes — long enough to work through the discovery questions and gather meaningful context for the AM, but short enough to keep the buyer\'s momentum and respect their time. Deep-dive product conversations are the AM\'s territory, not the BDR\'s.',
  },
  {
    id: 'bdr-cq-3',
    question: 'You\'re on a call with a buyer who says "I need inventory for my new store opening next week — how do I place an order?" What should you do?',
    options: [
      'Slow them down and ask all seven discovery questions in full detail',
      'Try to close the deal yourself to save the AM time on a sure thing',
      'Gather essential info quickly, confirm their contact details, and route them to an AM as a priority — don\'t slow their momentum',
      'Schedule a callback for later in the week so you can prepare a full pitch',
    ],
    correctIndex: 2,
    explanation:
      'This buyer is showing strong intent — specific need, clear timeline, and they\'re asking how to buy. Don\'t slow them down with an exhaustive discovery session. Capture the essentials (business type, location, category interest) fast, confirm contact info, and get them to an AM immediately. Speed matters with strong-intent leads.',
  },
  {
    id: 'bdr-cq-4',
    question: 'What is the correct sequence for a BDR call?',
    options: [
      'Discovery → Opening → Closing → Documentation → Permission',
      'Opening → Permission → Discovery → Closing → Documentation',
      'Permission → Discovery → Closing → Opening → Documentation',
      'Opening → Discovery → Permission → Documentation → Closing',
    ],
    correctIndex: 1,
    explanation:
      'The flow is: Opening (warm greeting and identify yourself) → Permission (ask if they have a few minutes) → Discovery (work through the questions) → Closing (set expectations for AM follow-up) → Documentation (log everything in CRM). Each step builds naturally on the previous one.',
  },
  {
    id: 'bdr-cq-5',
    question: 'After routing a lead to an Account Manager, what is the BDR\'s next responsibility?',
    options: [
      'Nothing — the BDR\'s job is done once the lead is routed and documented',
      'Call the buyer daily until the AM connects to keep the lead warm',
      'Check the following day to confirm the AM connected with the buyer — if not, follow up with the AM directly',
      'Take over the account if the AM hasn\'t responded within an hour',
    ],
    correctIndex: 2,
    explanation:
      'The BDR\'s accountability doesn\'t end at routing. The next day, check the CRM to see if the AM made contact. If they haven\'t, follow up with the AM directly — strong-intent leads lose momentum fast, and confirming the handoff was completed is part of the BDR\'s responsibility.',
  },
  {
    id: 'bdr-cq-6',
    question: 'A buyer says "I already have a supplier." How should a BDR handle this?',
    options: [
      'End the call politely since they\'re clearly not a qualified lead',
      'Explain in detail why Via Trading is better than their current supplier',
      'Position Via Trading as a complement — ask what categories or gaps exist with their current supplier, and continue discovery',
      'Ask for their current supplier\'s name so you can prepare a competitive comparison for the AM',
    ],
    correctIndex: 2,
    explanation:
      'The buyer registered or took the call for a reason — something prompted their interest. Don\'t criticize their current supplier. Instead, frame Via Trading as a second source: "A lot of our buyers actually work with us alongside their main supplier, especially for categories or volumes their primary source can\'t always cover." Then continue discovery to understand the gap.',
  },
]

export const bdrRoleSectionedQuiz: SectionedQuiz = {
  termMatch: [
    {
      term: 'BDR',
      definition: 'First point of contact for new prospects who qualifies their needs and routes them to the right Account Manager',
    },
    {
      term: 'Discovery Framework',
      definition: 'A structured sequence of questions asked one at a time to understand a buyer\'s business and needs',
    },
    {
      term: 'Intent Signal',
      definition: 'A verbal cue from a buyer that indicates their readiness and urgency to purchase',
    },
    {
      term: 'HubSpot Playbook',
      definition: 'A structured call guide embedded in the CRM that keeps conversations on track and ensures consistent discovery',
    },
    {
      term: 'Call Documentation',
      definition: 'The post-call process of logging notes, discovery fields, and routing recommendations in the CRM',
    },
  ],

  multipleChoice: bdrRoleQuiz,

  fillInBlank: [
    {
      id: 'bdr-fib-1',
      sentence: 'During discovery, a BDR should ask _____ question at a time to keep the conversation natural.',
      blank: 'one',
      options: ['one', 'two', 'three', 'all seven'],
      correctIndex: 0,
    },
    {
      id: 'bdr-fib-2',
      sentence: 'Call documentation should be completed within _____ minutes of ending the call, while details are still fresh.',
      blank: '15',
      options: ['5', '15', '30', '60'],
      correctIndex: 1,
    },
    {
      id: 'bdr-fib-3',
      sentence: 'The BDR\'s discovery framework includes _____ structured questions covering business type, inventory interest, experience, volume, timing, location, and additional context.',
      blank: '7',
      options: ['4', '5', '7', '10'],
      correctIndex: 2,
    },
    {
      id: 'bdr-fib-4',
      sentence: 'When re-engaging a dormant account that has been inactive for 60+ days, BDRs use the _____ playbook.',
      blank: 'BDR Qualifying Re-Engage',
      options: ['General Qualification', 'BDR Qualifying Re-Engage', 'Product Questions', 'Win-Back Campaign'],
      correctIndex: 1,
    },
  ],

  passThreshold: 0.85,
}
