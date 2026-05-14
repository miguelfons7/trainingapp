import type { TermMatchPair, ScenarioQuestion, FillInBlankItem } from '../../../types'

// --- Term Match: Via Trading Knowledge ---
export const viaTermMatchPairs: TermMatchPair[] = [
  {
    term: 'Via Trading Corporation',
    definition: 'The parent umbrella company that houses Via Trading, LiquidateNow, and WeSolveReturns',
  },
  {
    term: 'ViaTrading.com',
    definition: 'Wholesale liquidation marketplace for business owners, serving 129+ countries',
  },
  {
    term: 'LiquidateNow.com',
    definition: 'Consignment-based platform where vendors list inventory and leverage Via Trading\'s buyer network',
  },
  {
    term: 'WeSolveReturns.com',
    definition: 'Return center solution for brands that processes returns and feeds inventory back to Via Trading',
  },
  {
    term: 'Honesty',
    definition: 'Core value: transparent dealings with all stakeholders',
  },
  {
    term: 'ESOP',
    definition: 'Employee Stock Ownership Plan that makes Via Trading employee-owned',
  },
]

// --- Scenario Cards: Via Trading Situations ---
export const viaScenarios: ScenarioQuestion[] = [
  {
    id: 'via-scenario-1',
    scenario:
      'A new employee asks you to explain the difference between Via Trading and LiquidateNow. How would you describe it?',
    options: [
      'They are the same company with different websites',
      'Via Trading buys inventory outright and resells it wholesale. LiquidateNow operates on consignment, where vendors list their inventory and Via Trading\'s buyer network does the selling.',
      'LiquidateNow is for international business owners only',
      'LiquidateNow handles returns and Via Trading handles overstock',
    ],
    bestAnswerIndex: 1,
    explanation:
      'Via Trading purchases inventory outright from retailers and sells it wholesale. LiquidateNow takes a different approach: vendors list their inventory on the platform and LiquidateNow leverages Via Trading\'s buyer network to sell it on a consignment basis.',
  },
  {
    id: 'via-scenario-2',
    scenario:
      'A brand reaches out because they have a large volume of customer returns and no way to process them. Which Via Trading platform would help them?',
    options: [
      'ViaTrading.com, where they can sell directly to business owners',
      'LiquidateNow.com, because it handles consignment sales',
      'WeSolveReturns.com, because it acts as a return center for brands without returns infrastructure',
      'They should find a third-party returns processor outside of Via Trading',
    ],
    bestAnswerIndex: 2,
    explanation:
      'WeSolveReturns.com is designed specifically for this situation. It provides a return center solution for brands that do not have their own returns infrastructure, processes the merchandise, and recovers value through Via Trading\'s marketplace.',
  },
  {
    id: 'via-scenario-3',
    scenario:
      'Someone asks what makes Via Trading different from other liquidation companies. What are the strongest points to share?',
    options: [
      'We are the cheapest in the market',
      'We have been around the longest',
      'Direct retailer contracts, 300+ years of combined team experience, ESOP ownership, dedicated Account Managers, and a 90%+ repeat business rate built on honesty, integrity, and transparency',
      'We have the biggest warehouse in the country',
    ],
    bestAnswerIndex: 2,
    explanation:
      'Via Trading\'s track record speaks for itself: direct retailer contracts at Level 1 pricing, a team with 300+ combined years of experience, family and employee ownership through the ESOP, dedicated Account Managers, and a 90%+ repeat business rate. These concrete proof points differentiate Via from competitors.',
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
      'Via Trading operates from _____ square feet of physical warehouse space, with over 550,000 sq ft including rack space.',
    blank: '250,000',
    options: ['50,000', '150,000', '250,000', '1,000,000'],
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
      'The platform where vendors can liquidate merchandise on a consignment basis is called _____.',
    blank: 'LiquidateNow.com',
    options: ['ViaTrading.com', 'WeSolveReturns.com', 'LiquidateNow.com', 'BulkDealsDirect.com'],
    correctIndex: 2,
  },
]
