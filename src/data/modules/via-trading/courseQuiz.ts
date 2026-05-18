import type { QuizQuestion, SectionedQuiz } from '../../../types'

/**
 * End-of-course quiz for "Who Is Via Trading"
 * Sectioned format: 4 term match + 8 MC + 4 fill-in-blank = 16 items
 * Passing score: 85% (14 of 16 correct)
 *
 * CONCEPT ISOLATION (no cross-section leakage):
 *   TM: ESOP, Inc 500, Dedicated Account Manager, Open Warehouse
 *   MC: WeSolveReturns use case, buyer network importance, Tampa expansion,
 *       LN consignment model, core values in practice, repeat rate drivers,
 *       vendor scenario, founding growth story
 *   FIB: founded in 2002, 250K sq ft, 129+ countries, 90% repeat rate
 */

export const viaCourseQuiz: QuizQuestion[] = [
  {
    id: 'via-cq-1',
    question: 'A brand sells products online but has no infrastructure to process customer returns. Which Via Trading platform solves their problem?',
    options: [
      'LiquidateNow, which handles vendor excess inventory on consignment',
      'WeSolveReturns, which acts as an outsourced return center and feeds recovered inventory into Via Trading\'s marketplace',
      'Via Trading\'s direct wholesale channel, which purchases returns in bulk',
      'The Via Trading open warehouse, where brands can drop off returns in person',
    ],
    correctIndex: 1,
    explanation:
      'WeSolveReturns was built specifically for brands that don\'t have their own returns infrastructure. It processes returns, recovers value from the merchandise, and feeds that inventory into Via Trading\'s marketplace for resale.',
  },
  {
    id: 'via-cq-2',
    question: 'What makes Via Trading\'s global buyer network strategically important beyond just wholesale sales?',
    options: [
      'It gives Via Trading leverage to negotiate lower prices with retailers',
      'It provides the established demand side — tens of thousands of business owners worldwide — that makes both LiquidateNow and WeSolveReturns viable',
      'It enables Via Trading to sell directly to consumers at retail prices',
      'It is primarily used for auction-based sales of high-value merchandise',
    ],
    correctIndex: 1,
    explanation:
      'Via Trading spent 20+ years building a global buyer network. Both LiquidateNow and WeSolveReturns leverage this network — without built-in demand from thousands of active business owners, neither platform would have the audience to sell into.',
  },
  {
    id: 'via-cq-3',
    question: 'Why is Via Trading\'s expansion to Tampa, Florida strategically significant?',
    options: [
      'Tampa has lower commercial real estate costs than California',
      'It reduces freight costs for East Coast and international buyers while expanding Via Trading\'s geographic reach',
      'Florida has no state income tax, reducing Via Trading\'s overhead',
      'Tampa is closer to major retailers\' distribution centers',
    ],
    correctIndex: 1,
    explanation:
      'Tampa gives Via Trading a second distribution hub on the East Coast, significantly reducing shipping distances and freight costs for buyers in the Eastern U.S., Southeast, and international markets. Geographic expansion makes Via Trading more competitive in regions where California shipping was a cost barrier.',
  },
  {
    id: 'via-cq-4',
    question: 'How does LiquidateNow\'s consignment model work compared to Via Trading\'s direct purchase programs?',
    options: [
      'LiquidateNow buys inventory at auction while direct programs negotiate fixed prices',
      'LiquidateNow vendors list their own inventory and set pricing expectations, while Via Trading\'s direct programs involve Via purchasing inventory outright from retailers',
      'LiquidateNow focuses exclusively on international sales while direct programs are domestic only',
      'LiquidateNow charges sellers a flat monthly listing fee while direct programs take a percentage of each sale',
    ],
    correctIndex: 1,
    explanation:
      'On LiquidateNow, vendors retain ownership of their inventory and set their own pricing expectations. Via Trading\'s direct programs work differently — Via negotiates and purchases inventory outright from retailers at wholesale prices, then resells to its buyer network.',
  },
  {
    id: 'via-cq-5',
    question: 'Via Trading\'s core values are Honesty, Integrity, and Transparency. Which daily business practice BEST reflects all three?',
    options: [
      'Offering the lowest possible prices to undercut competitors',
      'Providing manifested loads with full item-level detail so buyers know exactly what they\'re purchasing before committing',
      'Only selling premium-condition merchandise to avoid quality complaints',
      'Requiring all transactions to be completed in person at the warehouse',
    ],
    correctIndex: 1,
    explanation:
      'Manifested loads embody all three core values: Honesty in disclosing exact item contents, Integrity in accurate condition grading, and Transparency in sharing retail values. This practice builds the trust that sustains Via Trading\'s long-term buyer relationships.',
  },
  {
    id: 'via-cq-6',
    question: 'What primarily sustains Via Trading\'s exceptionally high repeat buyer rate?',
    options: [
      'Long-term purchase contracts that lock buyers into recurring orders',
      'Being the only option in the liquidation market for most product categories',
      'Trust built through transparent communication, consistent product quality, and a dedicated person who understands each buyer\'s business',
      'Frequent price discounts and promotional offers for returning customers',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading\'s repeat rate comes from relationship-based selling, not contracts or discounts. Buyers return because they trust the company\'s transparency, rely on consistent product quality, and value having a dedicated Account Manager who knows their business inside and out.',
  },
  {
    id: 'via-cq-7',
    question: 'A vendor has 500 pallets of excess inventory and no buyer relationships. What can Via Trading offer them?',
    options: [
      'A direct purchase of all 500 pallets at a fixed wholesale price within 48 hours',
      'Access to Via Trading\'s global buyer network through LiquidateNow, where the vendor controls pricing and retains ownership until each lot sells',
      'A consignment arrangement where Via Trading sets the pricing and the vendor receives payment after 90 days',
      'A referral to third-party auction houses that specialize in excess inventory',
    ],
    correctIndex: 1,
    explanation:
      'LiquidateNow is designed for this exact scenario. Vendors who have excess inventory but no established buyer relationships can list on LiquidateNow to access Via Trading\'s global network. The vendor retains ownership, sets their own pricing expectations, and only pays when merchandise sells.',
  },
  {
    id: 'via-cq-8',
    question: 'What about Via Trading\'s founding story — 4 people in a small LA warehouse — is most relevant to how the sales team should represent the company today?',
    options: [
      'It shows the company was always well-funded and supported by large investors',
      'It demonstrates that Via Trading was built from the ground up through hard work, relationships, and reinvestment — not outside capital',
      'It proves that small teams are more effective than large organizations',
      'It is mainly useful as a conversation starter with nostalgic buyers who prefer smaller companies',
    ],
    correctIndex: 1,
    explanation:
      'The founding story matters because it\'s authentic — Via Trading grew from 4 people and 6,000 sq ft to where it is today through reinvestment and relationship building, not venture capital or outside funding. This resonates with buyers because most of them are building their own businesses the same way.',
  },
]

export const viaSectionedQuiz: SectionedQuiz = {
  termMatch: [
    {
      term: 'ESOP',
      definition: 'Employee Stock Ownership Plan that gives employees an ownership stake alongside family ownership',
    },
    {
      term: 'Inc 500',
      definition: 'Annual recognition of the fastest-growing privately held companies in the United States',
    },
    {
      term: 'Dedicated Account Manager',
      definition: 'A single point of contact assigned to each buyer who learns their business, preferences, and order history',
    },
    {
      term: 'Open Warehouse',
      definition: 'Via Trading\'s facility in Lynwood, California where buyers can visit in person and inspect merchandise Monday through Friday',
    },
  ],
  multipleChoice: viaCourseQuiz,
  fillInBlank: [
    {
      id: 'via-cq-fib-1',
      sentence: 'Via Trading was founded in _____ by a team of 4 in a small Los Angeles warehouse.',
      blank: '2002',
      options: ['1998', '2002', '2006', '2010'],
      correctIndex: 1,
    },
    {
      id: 'via-cq-fib-2',
      sentence: 'Via Trading operates from over _____ square feet of warehouse space in Lynwood, California.',
      blank: '250,000',
      options: ['50,000', '150,000', '250,000', '500,000'],
      correctIndex: 2,
    },
    {
      id: 'via-cq-fib-3',
      sentence: 'Via Trading\'s buyer network spans over _____ countries worldwide.',
      blank: '129',
      options: ['45', '80', '129', '200'],
      correctIndex: 2,
    },
    {
      id: 'via-cq-fib-4',
      sentence: 'Over _____% of Via Trading\'s revenue comes from repeat buyers.',
      blank: '90',
      options: ['50', '70', '80', '90'],
      correctIndex: 3,
    },
  ],
}
