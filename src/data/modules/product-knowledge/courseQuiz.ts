import type { QuizQuestion, SectionedQuiz } from '../../../types'

/**
 * End-of-course quiz for "Product Knowledge"
 * Sectioned format: 4 term match + 8 MC + 4 fill-in-blank = 16 items
 * Passing score: 85% (14 of 16 correct)
 *
 * CONCEPT ISOLATION (no cross-section leakage):
 *   TM: Parent SKU, Condition Grading, Direct Ship, Unmanifested Load
 *   MC: TGT Premium vs Salvage, manifested program recommendation, new buyer reassurance,
 *       HD program trade-off, online seller manifest needs, LN vs direct pricing,
 *       discount store sourcing, program pricing factors
 *   FIB: VHD = 31%, TGT = Target, Zappos = WSR, Make an Offer feature
 */

export const productKnowledgeQuiz: QuizQuestion[] = [
  {
    id: 'pk-cq-1',
    question: 'What makes TGT Premium loads more expensive than standard TGT Salvage?',
    options: [
      'Premium loads contain exclusively electronics and high-value items',
      'Premium items are cherry-picked from the returns stream and include full item manifests, giving buyers greater transparency',
      'Premium loads are larger and contain more pallets per shipment',
      'Premium loads ship faster because they skip Via Trading\'s warehouse',
    ],
    correctIndex: 1,
    explanation:
      'TGT Premium loads are manifested and contain items hand-selected by the retailer from the customer returns stream. This cherry-picking means higher average item quality, and the manifest gives buyers full visibility into what they\'re purchasing — both of which justify the premium pricing.',
  },
  {
    id: 'pk-cq-2',
    question: 'A buyer tells you they need to know exactly what items they\'re purchasing before they commit. Which type of program should you recommend?',
    options: [
      'Any program with flat-rate pricing, since the cost is predictable',
      'Unmanifested assorted loads, which offer the widest product variety',
      'Manifested programs that provide item-level detail — brands, quantities, and estimated values — before purchase',
      'LiquidateNow listings, which always include detailed product photography',
    ],
    correctIndex: 2,
    explanation:
      'Manifested programs provide a detailed list of every item in the load before the buyer commits. This is essential for buyers who need to evaluate value, plan resale pricing, or ensure the merchandise fits their business model before purchasing.',
  },
  {
    id: 'pk-cq-3',
    question: 'A first-time buyer is nervous about merchandise quality and wants reassurance before making a purchase. What can Via Trading offer that many competitors cannot?',
    options: [
      'A money-back guarantee on all merchandise regardless of condition',
      'Free sample pallets shipped to the buyer\'s location for evaluation',
      'An open warehouse where buyers can visit in person to inspect merchandise before purchasing',
      'Video inspections conducted by Via Trading\'s quality control team',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading\'s warehouse is open to the public Monday through Friday, allowing buyers to walk through and physically inspect merchandise before committing to a purchase. This level of access is rare in the liquidation industry and helps new buyers build confidence in the product quality.',
  },
  {
    id: 'pk-cq-4',
    question: 'What is the key trade-off between HD Turbo (TRB) and HD Manifested (VHD)?',
    options: [
      'TRB ships faster but VHD includes a warranty on all items',
      'TRB has lower flat pricing but no item-level detail, while VHD costs more but provides full item manifests',
      'TRB is available for local pickup only, while VHD ships nationwide',
      'TRB contains only power tools, while VHD includes all home improvement categories',
    ],
    correctIndex: 1,
    explanation:
      'HD Turbo (TRB) uses flat per-load pricing, making it more affordable, but buyers don\'t get item-level detail before purchasing. HD Manifested (VHD) costs more per unit but provides a full manifest so buyers know exactly what they\'re getting. The choice depends on whether the buyer prioritizes cost or transparency.',
  },
  {
    id: 'pk-cq-5',
    question: 'An online seller wants to list items individually on their e-commerce store with accurate product descriptions. Why are manifested loads critical for their business model?',
    options: [
      'Manifested loads ship faster, allowing quicker listing turnaround',
      'Manifested loads always contain higher-quality items suitable for online sale',
      'Manifests provide item-level detail before the load arrives, letting the seller prepare listings, set prices, and plan storage in advance',
      'Manifested loads include pre-made product descriptions and photos the seller can use',
    ],
    correctIndex: 2,
    explanation:
      'Online sellers need to create individual listings with accurate descriptions, photos, and pricing. A manifest gives them this information before the load even arrives — they can prepare listings, calculate margins, and allocate storage space ahead of time, turning inventory faster.',
  },
  {
    id: 'pk-cq-6',
    question: 'How does purchasing through LiquidateNow differ from Via Trading\'s direct purchase programs?',
    options: [
      'LiquidateNow only sells internationally, while direct programs are domestic',
      'LiquidateNow vendors set their own pricing and retain ownership until a sale, while Via Trading\'s direct programs feature Via-negotiated wholesale pricing',
      'LiquidateNow merchandise is always higher quality because vendors curate their listings',
      'LiquidateNow charges buyers a membership fee, while direct programs are free to access',
    ],
    correctIndex: 1,
    explanation:
      'LiquidateNow operates on a consignment model where vendors list their own inventory, set their own pricing expectations, and retain ownership until a buyer purchases. Via Trading\'s direct programs involve Via buying inventory outright from retailers at negotiated prices and reselling to its buyer network.',
  },
  {
    id: 'pk-cq-7',
    question: 'A discount store buyer prioritizes getting the lowest possible per-unit cost over knowing specific item details. What type of load should you suggest?',
    options: [
      'Manifested premium loads with cherry-picked high-value items',
      'Category-specific pallets with detailed brand breakdowns',
      'Unmanifested assorted loads with flat per-load pricing',
      'LiquidateNow consignment listings where they can negotiate with vendors',
    ],
    correctIndex: 2,
    explanation:
      'Unmanifested loads are priced lower because the buyer trades item-level transparency for cost savings. For discount store operators who reprice everything anyway and care most about volume and variety at the lowest cost, unmanifested assorted loads with flat pricing are the best fit.',
  },
  {
    id: 'pk-cq-8',
    question: 'Why do some Via Trading programs cost more per unit than others, even when the merchandise comes from the same retailer?',
    options: [
      'Higher-priced programs include shipping in the purchase price',
      'Higher condition grades and greater manifest transparency command premium pricing because they reduce buyer risk',
      'More expensive programs have longer return windows if the buyer is unsatisfied',
      'Pricing is random and depends on when the merchandise was received',
    ],
    correctIndex: 1,
    explanation:
      'Program pricing reflects two main factors: condition grade and transparency. Cherry-picked premium items in better condition cost more than salvage. Manifested loads with full item detail cost more than unmanifested loads. Both factors reduce buyer risk, and that reduced risk is reflected in the pricing.',
  },
]

export const productKnowledgeSectionedQuiz: SectionedQuiz = {
  termMatch: [
    {
      term: 'Parent SKU',
      definition: 'A code name used to identify a retail partner\'s program without publicly naming the retailer',
    },
    {
      term: 'Condition Grading',
      definition: 'The system for classifying merchandise quality — New Overstock, Customer Returns, Shelf Pulls, and Salvage',
    },
    {
      term: 'Direct Ship',
      definition: 'Merchandise that flows straight from the retailer\'s facility to the buyer, bypassing Via Trading\'s warehouse',
    },
    {
      term: 'Unmanifested Load',
      definition: 'A shipment without item-level detail — the buyer knows the general category but not the specific items inside',
    },
  ],
  multipleChoice: productKnowledgeQuiz,
  fillInBlank: [
    {
      id: 'pk-cq-fib-1',
      sentence: 'HD Manifested (VHD) loads are priced at _____% of wholesale value.',
      blank: '31',
      options: ['9', '20', '31', '50'],
      correctIndex: 2,
    },
    {
      id: 'pk-cq-fib-2',
      sentence: 'The code TGT refers to _____ programs in Via Trading\'s system.',
      blank: 'Target',
      options: ['Amazon', 'Home Depot', 'Target', 'Walmart'],
      correctIndex: 2,
    },
    {
      id: 'pk-cq-fib-3',
      sentence: 'Zappos merchandise is processed through Via Trading\'s _____ platform.',
      blank: 'WeSolveReturns',
      options: ['Direct Purchase', 'LiquidateNow', 'Premium Select', 'WeSolveReturns'],
      correctIndex: 3,
    },
    {
      id: 'pk-cq-fib-4',
      sentence: 'On LiquidateNow, the _____ feature lets buyers propose a price below the vendor\'s listing.',
      blank: 'Make an Offer',
      options: ['Best Price', 'Counter Bid', 'Make an Offer', 'Price Match'],
      correctIndex: 2,
    },
  ],
}
