import type { QuizQuestion, SectionedQuiz } from '../../../types'

/**
 * End-of-course quiz for "Who Is Via Trading"
 * Sectioned format: 4 term match + 8 MC + 4 fill-in-blank = 16 items
 * Passing score: 85% (14 of 16 correct)
 */

/** Legacy flat quiz (kept for backward compatibility) */
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
    id: 'via-cq-3',
    question: 'What are Via Trading\'s three core values?',
    options: [
      'Speed, Innovation, and Growth',
      'Quality, Price, and Service',
      'Honesty, Integrity, and Transparency',
      'Efficiency, Technology, and Scale',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading\'s three core values are Honesty, Integrity, and Transparency. These guide every interaction with customers, vendors, and team members.',
  },
  {
    id: 'via-cq-5',
    question: 'How does LiquidateNow differ from Via Trading\'s traditional wholesale model?',
    options: [
      'LiquidateNow only sells to international business owners',
      'LiquidateNow operates on a consignment basis, where vendors list inventory and set their own pricing expectations',
      'LiquidateNow is a consumer-facing retail platform',
      'LiquidateNow purchases inventory outright at a premium',
    ],
    correctIndex: 1,
    explanation:
      'LiquidateNow is consignment-based. Instead of Via Trading buying inventory outright, vendors list their merchandise and LiquidateNow markets it to Via Trading\'s buyer network. When it sells, the vendor gets paid.',
  },
  {
    id: 'via-cq-6',
    question: 'What problem does WeSolveReturns solve?',
    options: [
      'It helps consumers return products to retailers more easily',
      'It provides a return center solution for brands that do not have their own returns infrastructure',
      'It manages Via Trading\'s internal product returns',
      'It is a shipping service for returned goods',
    ],
    correctIndex: 1,
    explanation:
      'WeSolveReturns acts as a return center for brands and companies that do not have their own returns infrastructure. It processes returns, recovers value from the merchandise, and feeds that inventory into Via Trading\'s marketplace.',
  },
  {
    id: 'via-cq-7',
    question: 'What makes Via Trading\'s buyer network so important to LiquidateNow and WeSolveReturns?',
    options: [
      'The buyer network is not relevant to the other platforms',
      'It only matters for international sales',
      'Via Trading\'s network of 42,000+ business owners across 129+ countries is what makes both platforms viable, providing the demand side for merchandise',
      'The buyer network is used exclusively for auction sales',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading built a buyer network of 42,000+ business owners across 129+ countries over more than 20 years. Both LiquidateNow and WeSolveReturns leverage this network. Without it, neither platform would have the audience to sell into.',
  },
  {
    id: 'via-cq-9',
    question: 'What does Via Trading\'s 90%+ repeat business rate indicate?',
    options: [
      'They have no competition',
      'Business owners trust them and are satisfied with the relationship, products, and service',
      'They lock customers into long-term contracts',
      'They are the cheapest option in the market',
    ],
    correctIndex: 1,
    explanation:
      'A 90%+ repeat business rate reflects deep customer trust. It is built on Via Trading\'s commitment to honesty, integrity, transparency, consistent product quality, and strong Account Manager relationships.',
  },
  {
    id: 'via-cq-11',
    question: 'Which city is Via Trading expanding to beyond its Lynwood, California headquarters?',
    options: [
      'New York City',
      'Dallas, Texas',
      'Tampa, Florida',
      'Chicago, Illinois',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading is expanding to Tampa, Florida, demonstrating continued investment in growth and the ability to serve even more business owners across the country.',
  },
  {
    id: 'via-cq-12',
    question: 'What recognition has Via Trading received that demonstrates its growth trajectory?',
    options: [
      'Forbes Top 10 every year since founding',
      '7 years of Inc 500 recognition for rapid growth',
      'Fortune 500 company status',
      'NASDAQ listed company',
    ],
    correctIndex: 1,
    explanation:
      'Via Trading received 7 years of Inc 500 recognition, which highlights the company\'s exceptional growth. The Inc 500 list recognizes the fastest-growing private companies in America.',
  },
]

/** Sectioned quiz format for the new quiz layout */
export const viaSectionedQuiz: SectionedQuiz = {
  termMatch: [
    {
      term: 'Via Trading Corporation',
      definition: 'The parent umbrella company that houses Via Trading, LiquidateNow, and WeSolveReturns',
    },
    {
      term: 'LiquidateNow',
      definition: 'Consignment-based platform where vendors list inventory and leverage Via Trading\'s buyer network to sell',
    },
    {
      term: 'WeSolveReturns',
      definition: 'Return center solution for brands that processes returns and feeds inventory to Via Trading',
    },
    {
      term: 'ESOP',
      definition: 'Employee Stock Ownership Plan that makes Via Trading employee-owned alongside family ownership',
    },
  ],
  multipleChoice: viaCourseQuiz,
  fillInBlank: [
    {
      id: 'via-cq-fib-1',
      sentence: 'Via Trading operates from _____ square feet of physical warehouse space in Lynwood, California.',
      blank: '250,000',
      options: ['50,000', '150,000', '250,000', '1,000,000'],
      correctIndex: 2,
    },
    {
      id: 'via-cq-fib-2',
      sentence: 'Via Trading has served over _____ customers across 129+ countries.',
      blank: '42,000',
      options: ['5,000', '15,000', '42,000', '100,000'],
      correctIndex: 2,
    },
    {
      id: 'via-cq-fib-3',
      sentence: 'Via Trading was founded in _____ by a team of 4 in a 6,000 sq ft warehouse in Los Angeles.',
      blank: '2002',
      options: ['1998', '2002', '2006', '2010'],
      correctIndex: 1,
    },
    {
      id: 'via-cq-fib-4',
      sentence: 'Over _____% of Via Trading\'s business comes from repeat customers, reflecting strong long-term relationships.',
      blank: '90',
      options: ['50', '70', '80', '90'],
      correctIndex: 3,
    },
  ],
}
