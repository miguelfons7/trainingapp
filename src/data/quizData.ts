export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What level dealer is Via Trading in the liquidation supply chain?',
    options: [
      'Level 3: Local reseller',
      'Level 1: Direct contracts with major retailers',
      'Level 2: Regional wholesaler',
      'Level 4: End consumer',
    ],
    correctIndex: 1,
    explanation:
      'Via Trading is a Level 1 dealer with direct contracts with Fortune 100 retailers like Walmart, Target, and Amazon. This means buyers get the closest-to-source pricing with no middleman markup.',
  },
  {
    id: 'q2',
    question: 'What is the difference between "New Overstock" and "Customer Returns"?',
    options: [
      'New Overstock is cheaper than Customer Returns',
      'New Overstock was never purchased by a consumer; Customer Returns were bought and sent back',
      'Customer Returns are always defective; New Overstock is always perfect',
      'There is no difference; they are the same condition',
    ],
    correctIndex: 1,
    explanation:
      'New Overstock consists of unsold retail merchandise still in original condition. Customer Returns are goods that consumers purchased and then returned for various reasons, and condition can range from brand new (still sealed) to non-functional.',
  },
  {
    id: 'q3',
    question: 'How many pallets can a standard Via Trading truckload (53-foot trailer) carry?',
    options: [
      'Up to 6 pallets',
      'Exactly 12 pallets',
      '12 to 24-30 pallets depending on how inventory is condensed',
      '50+ pallets',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading truckloads use 53-foot trailers that carry 12 to 24-30 pallets depending on how the inventory is condensed. Containers (up to 48 feet) typically carry fewer pallets.',
  },
  {
    id: 'q4',
    question: 'Which of the following is a core value of Via Trading?',
    options: [
      'Speed above all else',
      'Lowest price guaranteed',
      'Honesty, Integrity, and Transparency',
      'Technology-first approach',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading\'s core values are Honesty, Integrity, and Transparency. These values guide the company\'s approach to building long-term relationships with buyers, contributing to a 90%+ repeat business rate.',
  },
]
