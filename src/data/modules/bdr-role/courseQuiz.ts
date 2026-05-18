import type { QuizQuestion, SectionedQuiz } from '../../../types'

/**
 * End-of-course quiz for "BDR Role Training"
 * Sectioned format: 5 term match + 6 MC + 4 fill-in-blank = 15 items
 * Passing score: 85% (13 of 15 correct)
 */

/** Legacy flat quiz (kept for backward compatibility) */
export const bdrRoleQuiz: QuizQuestion[] = [
  {
    id: 'bdr-cq-1',
    question: 'What is the BDR\'s primary objective on a new buyer call?',
    options: [
      'Close the deal and process payment',
      'Welcome, prequalify, and route to the right Account Manager',
      'Provide detailed product education on every program',
      'Negotiate pricing and freight terms',
    ],
    correctIndex: 1,
    explanation:
      'The BDR\'s role is to welcome new prospects, ask discovery questions to understand their business, and route them to the right AM with complete context. BDRs don\'t close deals, quote prices, or provide deep product education.',
  },
  {
    id: 'bdr-cq-2',
    question: 'What should a BDR do when a buyer asks "How much does it cost?"',
    options: [
      'Quote a ballpark price to keep the conversation going',
      'Tell them pricing is confidential',
      'Acknowledge the question and redirect to the Account Manager',
      'Look up pricing in HubSpot and share it',
    ],
    correctIndex: 2,
    explanation:
      'BDRs don\'t quote prices. The right approach is to acknowledge the question ("I totally understand — pricing varies based on the program and what you\'re looking for") and redirect: "Your Account Manager will walk you through options that work within your numbers."',
  },
  {
    id: 'bdr-cq-3',
    question: 'How long should a typical BDR discovery call last?',
    options: [
      '1-2 minutes — just get basic info and transfer',
      '5-8 minutes — enough to complete discovery without losing momentum',
      '20-30 minutes — cover everything in depth',
      'As long as the buyer wants to talk',
    ],
    correctIndex: 1,
    explanation:
      'A BDR call should last about 5-8 minutes — long enough to work through the discovery framework and gather meaningful context, but short enough to keep the buyer\'s momentum and respect their time. Deep-dive conversations are the AM\'s job.',
  },
  {
    id: 'bdr-cq-4',
    question: 'When you identify a strong-intent buyer, what should you do?',
    options: [
      'Slow them down with all 7 discovery questions in full detail',
      'Move toward handoff quickly and confirm contact info',
      'Try to close the deal yourself to save the AM time',
      'Schedule a follow-up call for next week so they have time to think',
    ],
    correctIndex: 1,
    explanation:
      'Strong-intent buyers have a specific need, timeline, and often a volume in mind. Don\'t slow their momentum with an exhaustive discovery session. Gather essential info quickly, confirm their contact details, and route to the AM as a priority. Speed matters.',
  },
  {
    id: 'bdr-cq-5',
    question: 'What is the correct order for a BDR call?',
    options: [
      'Discovery → Opening → Closing → Documentation → Permission',
      'Opening → Permission → Discovery → Closing → Documentation',
      'Permission → Discovery → Closing → Opening → Documentation',
      'Opening → Discovery → Permission → Documentation → Closing',
    ],
    correctIndex: 1,
    explanation:
      'The flow is Opening (warm greeting, identify yourself) → Permission (ask if they have a few minutes) → Discovery (work through the questions) → Closing (set expectations for AM follow-up) → Documentation (log everything in HubSpot). Each step builds on the one before it.',
  },
  {
    id: 'bdr-cq-6',
    question: 'After routing a lead to an AM, what is the BDR\'s responsibility?',
    options: [
      'Nothing — the job is done once the lead is routed',
      'Call the buyer daily until the AM connects',
      'Follow up to confirm the AM connected with the buyer',
      'Take over the account if the AM doesn\'t respond within an hour',
    ],
    correctIndex: 2,
    explanation:
      'The BDR\'s job doesn\'t end at routing. Check HubSpot the next day to see if the AM has made contact. If not, follow up with the AM directly. Strong-intent leads lose momentum fast, and ensuring the handoff is complete is part of the BDR\'s accountability.',
  },
]

/** Sectioned quiz used by QuizBlock */
export const bdrRoleSectionedQuiz: SectionedQuiz = {
  termMatch: [
    {
      term: 'BDR',
      definition: 'First point of contact who qualifies new prospects and routes them to Account Managers',
    },
    {
      term: 'Discovery Framework',
      definition: 'A structured set of 7 questions asked one at a time to understand a buyer\'s business',
    },
    {
      term: 'Intent Signal',
      definition: 'A verbal cue from the buyer that indicates their readiness and urgency to purchase',
    },
    {
      term: 'HubSpot Playbook',
      definition: 'A structured call guide embedded in the CRM to keep conversations on track',
    },
    {
      term: 'Call Documentation',
      definition: 'The post-call process of logging notes, discovery fields, and routing recommendations in HubSpot',
    },
  ],

  multipleChoice: bdrRoleQuiz,

  fillInBlank: [
    {
      id: 'bdr-fib-1',
      sentence: 'A BDR should ask _____ question at a time during discovery.',
      blank: 'one',
      options: ['one', 'two', 'three', 'all seven'],
      correctIndex: 0,
    },
    {
      id: 'bdr-fib-2',
      sentence: 'The BDR\'s call documentation should be completed within _____ minutes of the call.',
      blank: '15',
      options: ['5', '15', '30', '60'],
      correctIndex: 1,
    },
    {
      id: 'bdr-fib-3',
      sentence: 'When a buyer asks about pricing, the BDR should redirect to the _____.',
      blank: 'Account Manager',
      options: ['Sales Director', 'Account Manager', 'warehouse team', 'website'],
      correctIndex: 1,
    },
    {
      id: 'bdr-fib-4',
      sentence: 'Before diving into discovery questions, always ask for _____.',
      blank: 'permission',
      options: ['their budget', 'permission', 'their email', 'a referral'],
      correctIndex: 1,
    },
  ],

  passThreshold: 0.85,
}
