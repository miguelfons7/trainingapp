import type { QuizQuestion } from '../../../types'

/**
 * End-of-course quiz for "Who Is Via Trading"
 * 12 unique questions covering all modules including LiquidateNow and WeSolveReturns.
 * Passing score: 85%
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
    question: 'What is Via Trading Corporation?',
    options: [
      'The name of Via Trading\'s warehouse',
      'A marketing brand used for international sales',
      'The parent umbrella company that houses Via Trading, LiquidateNow, and WeSolveReturns',
      'A separate company that partners with Via Trading',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading Corporation is the umbrella company. Under it are three operating entities: Via Trading (wholesale liquidation), LiquidateNow (consignment-based liquidation), and WeSolveReturns (return center solution).',
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
    id: 'via-cq-4',
    question: 'How much warehouse space does Via Trading operate from?',
    options: [
      '50,000 sq ft in Los Angeles',
      '150,000 sq ft in Compton',
      '250,000 sq ft of physical warehouse space (550,000+ sq ft with rack space) in Lynwood, California',
      '1,000,000 sq ft in Ontario, California',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading operates from 250,000 square feet of physical warehouse space in Lynwood, California. When you include rack space, the total comes to over 550,000 square feet.',
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
    id: 'via-cq-8',
    question: 'How many customers has Via Trading served and across how many countries?',
    options: [
      '5,000+ customers across 30 countries',
      '15,000+ customers across 50 countries',
      '42,000+ customers across 129+ countries',
      '100,000+ customers across 200 countries',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading has served over 42,000 customers across 129+ countries, reflecting the company\'s global reach.',
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
    id: 'via-cq-10',
    question: 'How does Via Trading describe its ownership structure?',
    options: [
      'Publicly traded on the stock exchange',
      'Venture-capital backed startup',
      'Family-owned and operated, and employee-owned through an ESOP program',
      'Owned by a private equity firm',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading is family-owned and operated, and also employee-owned through their ESOP (Employee Stock Ownership Plan) program. This gives team members a real stake in the company\'s success.',
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
