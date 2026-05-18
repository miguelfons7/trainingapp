import type { QuizQuestion, SectionedQuiz } from '../../../types'

/**
 * End-of-course quiz for "Consultative Sales"
 * Sectioned format: 5 term match + 8 MC + 5 fill-in-blank = 18 items
 * Passing score: 85% (16 of 18 correct)
 *
 * CONCEPT ISOLATION (no cross-section leakage):
 *   TM: Consultative Selling, Funnelling Technique, Trial Close,
 *       Summary Close, Features → Benefits → Needs
 *   MC: K.L.A.P.D.O.C. first response (Keep Calm), listening gaps,
 *       open vs "or" questions, "I need to think about it" handling,
 *       5-Step diagnostic time, language guidance, volume ladder, supplier objection
 *   FIB: P = Probe, 30% rule, triage nurse, Summarize step, D = Define
 */

export const salesPhilosophyQuiz: QuizQuestion[] = [
  {
    id: 'sp-cq-1',
    question: 'A buyer says "Your prices are way too high." According to Via Trading\'s objection handling approach, what should you do FIRST?',
    options: [
      'Immediately explain why your prices are justified with a feature comparison',
      'Stay calm and avoid reacting negatively — your tone in the first few seconds sets the trajectory for the entire conversation',
      'Ask the buyer what price they were expecting so you can meet them halfway',
      'Offer a discount on their first order to demonstrate value',
    ],
    correctIndex: 1,
    explanation:
      'The first step in K.L.A.P.D.O.C. is Keep Calm. An objection is information, not an attack. If you react defensively or rush to justify, you lose the buyer\'s trust. Taking a breath and responding with composure signals confidence and sets up the rest of the framework.',
  },
  {
    id: 'sp-cq-2',
    question: 'During a discovery call, you notice the buyer enthusiastically describes their business growth but never once mentions profitability. What does this gap most likely indicate?',
    options: [
      'They are testing you to see if you\'ll bring up pricing first',
      'Margins are tight — their volume may be growing but profitability isn\'t keeping pace',
      'They don\'t understand their own financials and need education',
      'Profitability is strong and doesn\'t need to be discussed',
    ],
    correctIndex: 1,
    explanation:
      'Active listening includes paying attention to what a buyer does NOT say. When someone avoids mentioning profitability while emphasizing growth, it often signals that margins are a pain point. This gap gives the AM valuable insight for tailoring their recommendation around margin improvement.',
  },
  {
    id: 'sp-cq-3',
    question: 'Which question better opens a discovery conversation: "Are you looking for truckloads or pallets?" versus "Tell me about what you\'re looking for."',
    options: [
      'The first question, because it efficiently narrows down the buyer\'s volume preference',
      'Both are equally effective since they ask about the same topic',
      'The second question, because it lets the buyer share what actually matters rather than constraining them to choices you\'ve predetermined',
      'The first question, because it sounds more professional and industry-savvy',
    ],
    correctIndex: 2,
    explanation:
      '"Are you looking for truckloads or pallets?" assumes you already know the only two options. The buyer might need something entirely different — cases, a specific program, or help figuring out what they need. "Tell me about what you\'re looking for" opens the door for them to share their actual situation.',
  },
  {
    id: 'sp-cq-4',
    question: 'A buyer says "I need to think about it." Rather than accepting this at face value, what should you do?',
    options: [
      'Give them space and schedule a follow-up call for next week',
      'Offer a time-limited discount to create urgency',
      'Acknowledge the feeling, then ask what specifically they\'re weighing — there\'s almost always an unresolved concern beneath the surface',
      'Repeat your recommendation with more enthusiasm to build their confidence',
    ],
    correctIndex: 2,
    explanation:
      '"I need to think about it" almost always signals an unresolved concern the buyer hasn\'t expressed. Instead of accepting the stall, acknowledge their need for consideration, then gently probe: "What specifically are you weighing?" or "What part of this isn\'t sitting right?" Finding the real concern lets you address it.',
  },
  {
    id: 'sp-cq-5',
    question: 'Why does the 5-Step Consultative Method dedicate the largest portion of time to the very first step?',
    options: [
      'The first step involves presenting all available programs so the buyer can choose',
      'Spending more time on administration and paperwork upfront saves time later',
      'A thorough diagnostic ensures the recommendation feels earned and natural — if you understand their needs deeply, everything that follows flows logically',
      'The first step is designed to build rapport through casual conversation before getting to business',
    ],
    correctIndex: 2,
    explanation:
      'The diagnostic phase takes the most time because it\'s the foundation for everything else. When you truly understand a buyer\'s business, challenges, and goals, your recommendation connects directly to their situation. The buyer feels heard, the solution feels tailored, and the close feels like a natural next step rather than a pressure tactic.',
  },
  {
    id: 'sp-cq-6',
    question: 'In Via Trading\'s sales approach, why should you say "Account Manager" instead of "sales rep" or "salesperson"?',
    options: [
      'It\'s a corporate requirement for all Via Trading communications',
      'It positions the role as an advisor and partner, not a traditional salesperson — setting the buyer\'s expectations for a consultative relationship',
      'Buyers respond better to longer, more formal titles',
      'It distinguishes Via Trading employees from competitors\' sales teams',
    ],
    correctIndex: 1,
    explanation:
      'Language shapes perception. "Sales rep" implies someone trying to sell you something. "Account Manager" implies someone who manages your account — an advisor who knows your business and looks out for your interests. This subtle distinction sets the right expectation from the very first interaction.',
  },
  {
    id: 'sp-cq-7',
    question: 'A buyer has been ordering 4-5 pallets per month from Via Trading for over a year. Their AM should recommend:',
    options: [
      'Staying at the same volume since the buyer seems comfortable with their current purchasing pattern',
      'Moving to truckload purchasing, where the per-unit cost drops significantly because shipping and handling are spread across more merchandise',
      'Switching to a different program with better margins regardless of the buyer\'s preference',
      'Reducing their order frequency to build up larger orders every quarter',
    ],
    correctIndex: 1,
    explanation:
      'This is the volume ladder in action. A buyer consistently ordering 4-5 pallets monthly is an ideal candidate for the pallets-to-truckload jump. At that volume, a truckload saves them significantly per pallet because the shipping premium disappears. The AM should present the economics and make it easy to try.',
  },
  {
    id: 'sp-cq-8',
    question: 'A buyer says "I already have a supplier." What is the recommended approach?',
    options: [
      'Explain why Via Trading is superior to their current supplier',
      'Ask for their supplier\'s name so you can compare pricing head-to-head',
      'Position Via Trading as a complement — not a replacement — and ask what gaps or categories their current supplier doesn\'t cover',
      'End the conversation politely since they\'re clearly not interested',
    ],
    correctIndex: 2,
    explanation:
      'Never attack a buyer\'s existing relationships. Instead, acknowledge that having a good supplier is important, then explore gaps: "A lot of our buyers work with us as a second source, especially for categories their main supplier can\'t always cover." If they took the call, something is missing — your job is to discover what.',
  },
]

export const salesPhilosophySectionedQuiz: SectionedQuiz = {
  termMatch: [
    {
      term: 'Consultative Selling',
      definition: 'An approach where the salesperson acts as an advisor, diagnosing buyer needs before recommending solutions',
    },
    {
      term: 'Funnelling Technique',
      definition: 'A questioning strategy that moves from broad open questions to narrow specific questions to confirming understanding',
    },
    {
      term: 'Trial Close',
      definition: 'A soft check to gauge a buyer\'s readiness before making the full ask — "How does that sound so far?"',
    },
    {
      term: 'Summary Close',
      definition: 'A close that recaps the buyer\'s needs and your recommendation together, demonstrating that you listened',
    },
    {
      term: 'Features → Benefits → Needs',
      definition: 'A framework connecting what a product IS, to what it DOES for the buyer, to what they ultimately NEED',
    },
  ],

  multipleChoice: salesPhilosophyQuiz,

  fillInBlank: [
    {
      id: 'sp-fib-1',
      sentence: 'The letter P in K.L.A.P.D.O.C. stands for _____.',
      blank: 'Probe',
      options: ['Persuade', 'Present', 'Probe', 'Pause'],
      correctIndex: 2,
    },
    {
      id: 'sp-fib-2',
      sentence: 'During discovery, the salesperson should contribute approximately _____% of the talking.',
      blank: '30',
      options: ['30', '50', '60', '70'],
      correctIndex: 0,
    },
    {
      id: 'sp-fib-3',
      sentence: 'In Via Trading\'s doctor/patient sales model, the BDR acts as the _____ while the AM acts as the doctor.',
      blank: 'triage nurse',
      options: ['receptionist', 'triage nurse', 'pharmacist', 'surgeon'],
      correctIndex: 1,
    },
    {
      id: 'sp-fib-4',
      sentence: 'The first step of the 5-Step Consultative Method — and the one allocated the most time — is called _____.',
      blank: 'Summarize',
      options: ['Close', 'Summarize', 'State the Idea', 'Reinforce Benefits'],
      correctIndex: 1,
    },
    {
      id: 'sp-fib-5',
      sentence: 'The letter D in K.L.A.P.D.O.C. stands for _____.',
      blank: 'Define',
      options: ['Deliver', 'Define', 'Discuss', 'Decide'],
      correctIndex: 1,
    },
  ],

  passThreshold: 0.85,
}
