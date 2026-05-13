import type { TermMatchPair, ScenarioQuestion, FillInBlankItem } from '../../../types'

// --- Term Match: Via Trading Knowledge ---
export const viaTermMatchPairs: TermMatchPair[] = [
  {
    term: 'ViaTrading.com',
    definition: 'Primary wholesale liquidation platform for business buyers sourcing liquidation merchandise',
  },
  {
    term: 'WeSolveReturns.com',
    definition: 'Returns management and recommerce platform for helping retailers manage reverse logistics',
  },
  {
    term: 'LiquidateNow.com',
    definition: 'Vendor-facing platform where retailers and manufacturers liquidate excess and returned inventory',
  },
  {
    term: 'Honesty',
    definition: 'Core value: transparent dealings with all stakeholders',
  },
  {
    term: 'Integrity',
    definition: 'Core value: ethical business practices and reliability',
  },
  {
    term: 'Transparency',
    definition: 'Core value: open communication and clear processes',
  },
]

// --- Scenario Cards: Via Trading Situations ---
export const viaScenarios: ScenarioQuestion[] = [
  {
    id: 'via-scenario-1',
    scenario:
      'A prospect visits ViaTrading.com and calls asking why they should buy from Via instead of a local liquidation auction. How do you best convey Via\'s value?',
    options: [
      'Tell them auctions are a waste of time',
      'Highlight that Via Trading is a Level 1 dealer with direct retailer contracts, consistent supply, manifested loads, and dedicated Account Managers — benefits most auction houses can\'t match',
      'Offer to match any auction price',
      'Suggest they try the auction first and come back later',
    ],
    bestAnswerIndex: 1,
    explanation:
      'Via Trading\'s competitive advantages — Level 1 sourcing, manifested loads, dedicated Account Managers, and consistent supply — differentiate us from auction houses. Educating the buyer on these benefits builds trust and demonstrates our value without badmouthing competitors.',
  },
  {
    id: 'via-scenario-2',
    scenario:
      'A long-time customer mentions they\'re also looking into returns management for their own retail operation. Which Via Trading platform should you mention?',
    options: [
      'ViaTrading.com — they can list their returns there',
      'LiquidateNow.com — it\'s the vendor-facing liquidation platform',
      'WeSolveReturns.com — it\'s specifically built for returns management and recommerce',
      'Suggest they find a third-party returns processor',
    ],
    bestAnswerIndex: 2,
    explanation:
      'WeSolveReturns.com is Via Trading\'s dedicated returns management platform, specifically designed to help retailers manage their reverse logistics. Knowing all three platforms and when to recommend each is essential for Account Managers.',
  },
  {
    id: 'via-scenario-3',
    scenario:
      'A new buyer is hesitant because they had a bad experience with another liquidation company that misrepresented product conditions. How do you build confidence in Via Trading?',
    options: [
      'Promise that nothing will ever go wrong',
      'Offer a deep discount on their first order',
      'Share that Via Trading operates on Honesty, Integrity, and Transparency — backed by manifested loads, 42,000+ customers, 90%+ repeat business rate, and 7 years of Inc 500 recognition',
      'Tell them to just trust you',
    ],
    bestAnswerIndex: 2,
    explanation:
      'Via Trading\'s track record speaks for itself: 42,000+ customers served, 90%+ repeat business rate, and 7 years of Inc 500 recognition. Leading with concrete proof points — plus our commitment to manifested loads and transparent condition descriptions — directly addresses their concern.',
  },
]

// --- Fill in the Blank: Via Trading Knowledge ---
export const viaFillInBlanks: FillInBlankItem[] = [
  {
    id: 'via-fib-1',
    sentence:
      'Via Trading was founded in _____ by a team of 4 in a 6,000 square foot warehouse in Los Angeles.',
    blank: '2002',
    options: ['1998', '2002', '2006', '2010'],
    correctIndex: 1,
  },
  {
    id: 'via-fib-2',
    sentence:
      'Via Trading\'s three core values are Honesty, Integrity, and _____.',
    blank: 'Transparency',
    options: ['Innovation', 'Transparency', 'Speed', 'Profitability'],
    correctIndex: 1,
  },
  {
    id: 'via-fib-3',
    sentence:
      'Via Trading now operates from a _____ square foot facility in Lynwood, California.',
    blank: '550,000+',
    options: ['50,000', '150,000', '550,000+', '1,000,000'],
    correctIndex: 2,
  },
  {
    id: 'via-fib-4',
    sentence:
      'Over _____ of Via Trading\'s business comes from repeat customers, reflecting strong long-term relationships.',
    blank: '90%',
    options: ['50%', '70%', '80%', '90%'],
    correctIndex: 3,
  },
  {
    id: 'via-fib-5',
    sentence:
      'The platform where retailers and manufacturers can liquidate their excess inventory is called _____.',
    blank: 'LiquidateNow.com',
    options: ['ViaTrading.com', 'WeSolveReturns.com', 'LiquidateNow.com', 'BulkDealsDirect.com'],
    correctIndex: 2,
  },
]
