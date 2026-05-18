import type { QuizQuestion, SectionedQuiz } from '../../../types'

/**
 * End-of-course quiz for "Consultative Sales"
 * Sectioned format: 5 term match + 8 MC + 5 fill-in-blank = 18 items
 * Passing score: 85% (16 of 18 correct)
 */

/** Legacy flat quiz (kept for backward compatibility) */
export const salesPhilosophyQuiz: QuizQuestion[] = [
  {
    id: 'sp-cq-1',
    question: 'Which step of the 5-Step Consultative Method gets approximately 40% of the conversation time?',
    options: [
      'State the Idea',
      'Summarize',
      'Close',
      'Reinforce Benefits',
    ],
    correctIndex: 1,
    explanation:
      'The Summarize step takes about 40% of the conversation. This is the diagnostic phase where you ask questions, listen, and confirm understanding before making any recommendation.',
  },
  {
    id: 'sp-cq-2',
    question: 'In the K.L.A.P.D.O.C. framework, what should you do immediately after Acknowledging a buyer\'s objection?',
    options: [
      'Close the deal',
      'Overcome the objection',
      'Probe to find the real issue',
      'Define the solution',
    ],
    correctIndex: 2,
    explanation:
      'After Acknowledge comes Probe. You need to ask clarifying questions to find the real issue beneath the surface objection before you can define and overcome it.',
  },
  {
    id: 'sp-cq-3',
    question: 'Why are open-ended questions preferred over "or" questions during discovery?',
    options: [
      'They take less time to ask',
      '"Or" questions limit the buyer to choices you\'ve predetermined, while open questions let them share what actually matters',
      'Open questions are more formal and professional',
      '"Or" questions always confuse the buyer',
    ],
    correctIndex: 1,
    explanation:
      '"Are you looking for truckloads or pallets?" assumes you know the only two options. "Tell me about what you\'re looking for" lets the buyer share their actual needs — which might include something you hadn\'t considered.',
  },
  {
    id: 'sp-cq-4',
    question: 'What is the primary role of a BDR in Via Trading\'s sales process?',
    options: [
      'Close deals and quote pricing',
      'Welcome new prospects, discover their business needs, and route them to the right Account Manager',
      'Provide deep product education and program recommendations',
      'Handle objections and negotiate pricing',
    ],
    correctIndex: 1,
    explanation:
      'The BDR is the triage nurse — they welcome, ask discovery questions, qualify, and route to an AM. BDRs don\'t close deals, quote prices, or make product promises.',
  },
  {
    id: 'sp-cq-5',
    question: 'Which active listening rule focuses on understanding what a buyer is NOT telling you?',
    options: [
      'Don\'t Interrupt',
      'Take Notes',
      'Listen for What They Don\'t Say',
      'Summarize Before Transitioning',
    ],
    correctIndex: 2,
    explanation:
      '"Listen for What They Don\'t Say" means paying attention to gaps. If a buyer never mentions profitability, they may be struggling. If they keep redirecting to price, margins are tight.',
  },
  {
    id: 'sp-cq-6',
    question: 'What makes the Summary Close particularly effective?',
    options: [
      'It puts maximum pressure on the buyer to decide',
      'It summarizes the buyer\'s needs and your recommendation together, demonstrating that you listened and connecting their problem to your solution',
      'It offers the lowest possible price',
      'It uses fear of missing out to motivate the buyer',
    ],
    correctIndex: 1,
    explanation:
      'The Summary Close works because it reflects the buyer\'s own words back to them: "You need X, your challenge is Y, and here\'s how this program addresses both." It proves you listened and makes the recommendation feel earned.',
  },
  {
    id: 'sp-cq-7',
    question: 'Via Trading\'s 90%+ repeat business rate primarily demonstrates:',
    options: [
      'That they have the lowest prices in the industry',
      'Trust built through expertise, honest communication, and the dedicated Account Manager relationship',
      'That buyers have no other options',
      'That they spend the most on marketing',
    ],
    correctIndex: 1,
    explanation:
      'A 90%+ repeat rate doesn\'t come from price alone — it comes from trust. Via Trading\'s consultative approach, transparent communication, and dedicated AM relationships create partnerships that last.',
  },
  {
    id: 'sp-cq-8',
    question: 'In the Features → Benefits → Needs framework, what does the phrase "What that means for you is…" bridge?',
    options: [
      'A need to a close',
      'A question to an answer',
      'A feature to a benefit',
      'An objection to a solution',
    ],
    correctIndex: 2,
    explanation:
      '"What that means for you is…" bridges a feature (what it IS) to a benefit (what it DOES for them). Example: "We ship 95% of orders within 24 hours [feature]. What that means for you is your shelves stay stocked without gaps [benefit]."',
  },
]

/** Sectioned quiz used by QuizBlock */
export const salesPhilosophySectionedQuiz: SectionedQuiz = {
  termMatch: [
    {
      term: 'Consultative Selling',
      definition: 'An approach where the salesperson acts as an advisor, diagnosing buyer needs before recommending solutions',
    },
    {
      term: 'K.L.A.P.D.O.C.',
      definition: 'Keep calm, Listen, Acknowledge, Probe, Define, Overcome, Close — a structured objection handling framework',
    },
    {
      term: 'The 30% Rule',
      definition: 'The salesperson contributes roughly 30% of the talking during discovery, with the buyer doing 70%',
    },
    {
      term: 'Funnelling Technique',
      definition: 'A questioning strategy that moves from broad open questions to narrow specific questions to confirming',
    },
    {
      term: 'BDR Role',
      definition: 'Business Development Representative who qualifies new prospects and routes them to Account Managers',
    },
  ],

  multipleChoice: salesPhilosophyQuiz,

  fillInBlank: [
    {
      id: 'sp-fib-1',
      sentence: 'The first and longest step of the 5-Step Method is called _____.',
      blank: 'Summarize',
      options: ['Close', 'Summarize', 'State the Idea', 'Reinforce Benefits'],
      correctIndex: 1,
    },
    {
      id: 'sp-fib-2',
      sentence: 'The _____ technique moves from broad open questions to narrow specific questions to confirming.',
      blank: 'Funnelling',
      options: ['Probing', 'Leading', 'Funnelling', 'Closing'],
      correctIndex: 2,
    },
    {
      id: 'sp-fib-3',
      sentence: 'The letter P in K.L.A.P.D.O.C. stands for _____.',
      blank: 'Probe',
      options: ['Persuade', 'Present', 'Probe', 'Pause'],
      correctIndex: 2,
    },
    {
      id: 'sp-fib-4',
      sentence: 'During discovery, the salesperson should talk approximately _____% of the time.',
      blank: '30',
      options: ['30', '50', '60', '70'],
      correctIndex: 0,
    },
    {
      id: 'sp-fib-5',
      sentence: 'In Via Trading\'s doctor/patient model, the BDR acts as the _____ while the AM acts as the doctor.',
      blank: 'triage nurse',
      options: ['receptionist', 'triage nurse', 'pharmacist', 'surgeon'],
      correctIndex: 1,
    },
  ],

  passThreshold: 0.85,
}
