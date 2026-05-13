import type { QuizQuestion } from '../../../types'

/**
 * End-of-course quiz for "Who Is Via Trading"
 * 10 unique questions covering all modules — no repeats from inline exercises.
 * Passing score: 85% (9 of 10 correct)
 */
export const viaCourseQuiz: QuizQuestion[] = [
  {
    id: 'via-cq-1',
    question: 'Where was Via Trading founded and in what year?',
    options: [
      'New York, 1998',
      'Los Angeles, 2002',
      'Miami, 2005',
      'Dallas, 2010',
    ],
    correctIndex: 1,
    explanation:
      'Via Trading was founded in 2002 by a team of 4 in a 6,000 square foot warehouse in Los Angeles, California.',
  },
  {
    id: 'via-cq-2',
    question: 'What are Via Trading\'s three core values?',
    options: [
      'Speed, Innovation, and Growth',
      'Quality, Price, and Service',
      'Honesty, Integrity, and Transparency',
      'Efficiency, Technology, and Scale',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading\'s three core values — Honesty, Integrity, and Transparency — guide every interaction with customers, vendors, and team members. These values have been central to the company since its founding.',
  },
  {
    id: 'via-cq-3',
    question: 'What makes WeSolveReturns.com different from ViaTrading.com?',
    options: [
      'WeSolveReturns is for consumers; ViaTrading is for businesses',
      'WeSolveReturns handles returns management for retailers; ViaTrading is the wholesale marketplace for buyers',
      'They are the same platform with different names',
      'WeSolveReturns only operates internationally',
    ],
    correctIndex: 1,
    explanation:
      'WeSolveReturns.com is Via Trading\'s returns management platform, helping retailers efficiently process and liquidate returned merchandise. ViaTrading.com is the wholesale marketplace where business buyers browse and purchase liquidation inventory.',
  },
  {
    id: 'via-cq-4',
    question: 'What does LiquidateNow.com primarily serve?',
    options: [
      'End consumers looking for deals',
      'International export buyers',
      'Retailers and manufacturers who want to liquidate excess and returned inventory',
      'Auction house operators',
    ],
    correctIndex: 2,
    explanation:
      'LiquidateNow.com is Via Trading\'s vendor-facing platform where retailers and manufacturers can liquidate their excess and returned inventory. This is the supply side of Via Trading\'s business — where inventory enters the pipeline.',
  },
  {
    id: 'via-cq-5',
    question: 'How many customers has Via Trading served across how many countries?',
    options: [
      '5,000+ customers across 30 countries',
      '15,000+ customers across 50 countries',
      '42,000+ customers across 129+ countries',
      '100,000+ customers across 200 countries',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading has served over 42,000 customers across 129+ countries, reflecting the company\'s global reach and the universal demand for liquidation merchandise.',
  },
  {
    id: 'via-cq-6',
    question: 'What is the size of Via Trading\'s current facility and where is it located?',
    options: [
      '50,000 sq ft in Los Angeles',
      '150,000 sq ft in Compton',
      '550,000+ sq ft in Lynwood, California',
      '1,000,000 sq ft in Ontario, California',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading operates from a 550,000+ square foot facility in Lynwood, California — a massive growth from the original 6,000 sq ft warehouse where the company started in 2002.',
  },
  {
    id: 'via-cq-7',
    question: 'What does Via Trading\'s 90%+ repeat business rate tell you about the company?',
    options: [
      'They have no competition',
      'Their customers trust them and are satisfied with the relationship, products, and service',
      'They lock customers into long-term contracts',
      'They are the cheapest option in the market',
    ],
    correctIndex: 1,
    explanation:
      'A 90%+ repeat business rate is exceptionally high and reflects deep customer trust. It\'s built on Via Trading\'s commitment to honesty, integrity, transparency, consistent product quality, and strong Account Manager relationships.',
  },
  {
    id: 'via-cq-8',
    question: 'A prospect had a bad experience with another liquidation company. How should you build confidence in Via Trading?',
    options: [
      'Guarantee that nothing will ever go wrong',
      'Offer an unusually deep discount',
      'Share proof points: 42,000+ customers, 90%+ repeat rate, Inc 500 recognition, manifested loads, and our core values',
      'Tell them to just trust you',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading\'s track record speaks for itself. Leading with concrete proof points plus our commitment to manifested loads and transparent condition descriptions directly addresses the buyer\'s concern without making empty promises.',
  },
  {
    id: 'via-cq-9',
    question: 'Why is understanding all three Via Trading platforms important for an Account Manager?',
    options: [
      'You need to memorize URLs for a test',
      'It helps identify cross-selling opportunities and better serve customers who may need multiple services',
      'Each platform has a different commission structure',
      'Only senior managers need to know all three',
    ],
    correctIndex: 1,
    explanation:
      'Understanding how ViaTrading.com, WeSolveReturns.com, and LiquidateNow.com connect helps Account Managers identify cross-selling opportunities. A buyer on ViaTrading.com might also need returns management, or a vendor on LiquidateNow.com might know potential buyers.',
  },
  {
    id: 'via-cq-10',
    question: 'What recognition has Via Trading received that demonstrates its growth?',
    options: [
      'Forbes Top 10 every year since founding',
      '7 years of Inc 500 recognition for rapid growth',
      'Fortune 500 company status',
      'NASDAQ listed company',
    ],
    correctIndex: 1,
    explanation:
      'Via Trading received 7 years of Inc 500 recognition, which highlights the company\'s exceptional growth trajectory. The Inc 500 list recognizes the fastest-growing private companies in America.',
  },
]
