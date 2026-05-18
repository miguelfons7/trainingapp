import type { QuizQuestion, SectionedQuiz } from '../../../types'

/**
 * End-of-course quiz for "Intro to the Liquidation Industry"
 * Sectioned format: 4 term match + 8 MC + 4 fill-in-blank = 16 items
 * Passing score: 85% (14 of 16 correct)
 *
 * CONCEPT ISOLATION (no cross-section leakage):
 *   TM: Gaylord, Reverse Logistics, LTL, Landed Cost
 *   MC: secondary market, Level 1 advantage, bin store needs, FOB, manifests,
 *       e-commerce impact, exporter pallet preference, truckload economics
 *   FIB: 53-ft trailer capacity, New Overstock, Shelf Pulls, Level 1 = 70%
 */

export const industryCourseQuiz: QuizQuestion[] = [
  {
    id: 'cq-1',
    question: 'Why does the secondary market exist?',
    options: [
      'To compete directly with traditional retail stores on price',
      'To provide an outlet for the massive volume of unsold, returned, and excess merchandise that major retailers generate',
      'To serve as a recycling and disposal center for damaged goods',
      'To manufacture lower-cost alternatives to brand-name products',
    ],
    correctIndex: 1,
    explanation:
      'The secondary market exists because major retailers generate enormous volumes of unsold, returned, and excess merchandise. Rather than destroying this inventory, it flows into the secondary market where it can be resold at discounted prices through liquidation companies.',
  },
  {
    id: 'cq-2',
    question: 'What is the biggest advantage of buying from a Level 1 dealer instead of a broker?',
    options: [
      'Level 1 dealers always offer the lowest prices in the market',
      'Level 1 dealers have direct retailer contracts, giving them access to the freshest inventory with no middleman markup',
      'Level 1 dealers exclusively sell electronics and high-value categories',
      'Level 1 dealers offer financing and payment plans that brokers cannot',
    ],
    correctIndex: 1,
    explanation:
      'Level 1 dealers like Via Trading have direct contracts with major retailers, which means they handle inventory first — before brokers or smaller dealers see it. This results in fresher merchandise at better pricing because there\'s no middleman adding markup.',
  },
  {
    id: 'cq-3',
    question: 'A buyer tells you they operate a bin store with a weekly markdown schedule. Which factor matters MOST when sourcing inventory for them?',
    options: [
      'Premium brand names and high retail values per item',
      'High product density and broad assorted variety per load',
      'Manifested loads with detailed item-level breakdowns',
      'Category-specific pallets focused on a single product type',
    ],
    correctIndex: 1,
    explanation:
      'Bin store operators need high-volume, assorted merchandise that creates a "treasure hunt" experience for their customers. Product density (more units per pallet) and variety matter more than specific brands or manifests, because bin stores reprice everything on a weekly markdown cycle.',
  },
  {
    id: 'cq-4',
    question: 'Why should a buyer pay close attention to the FOB location listed on a deal?',
    options: [
      'It tells them the warranty terms for the merchandise',
      'It determines the pallet format they will receive',
      'It reveals the pickup location for freight calculation and whether the transaction is direct or brokered',
      'It indicates the condition grade of the merchandise',
    ],
    correctIndex: 2,
    explanation:
      'FOB (Freight On Board) indicates the location where merchandise is available for pickup or shipping. This helps buyers calculate freight costs accurately and also reveals whether they\'re dealing with a direct source or a middleman, since FOB locations at odd locations often signal brokered deals.',
  },
  {
    id: 'cq-5',
    question: 'What does a "manifested" load provide that an "unmanifested" load does not?',
    options: [
      'A guarantee that all items are in working condition',
      'A detailed list of every item — brand, quantity, and estimated value — available before purchase',
      'Faster shipping and priority processing',
      'A lower per-unit cost due to reduced sorting requirements',
    ],
    correctIndex: 1,
    explanation:
      'A manifested load includes item-level detail that buyers can review before committing to a purchase. This transparency lets them evaluate the lot\'s value, plan their resale strategy, and make informed purchasing decisions. Unmanifested loads offer a general category but no item breakdown.',
  },
  {
    id: 'cq-6',
    question: 'How has the rapid growth of e-commerce impacted the liquidation industry?',
    options: [
      'It reduced the volume of liquidation inventory because online shoppers return less',
      'It had no meaningful impact since liquidation primarily handles retail store inventory',
      'It significantly increased inventory volume because online purchases have much higher return rates than in-store purchases',
      'It eliminated the need for physical warehouses in the liquidation supply chain',
    ],
    correctIndex: 2,
    explanation:
      'E-commerce has dramatically expanded the liquidation industry. Online purchases have return rates of 20-30% compared to 8-10% for in-store purchases. This surge in returns creates a massive volume of merchandise that flows into the secondary market.',
  },
  {
    id: 'cq-7',
    question: 'An exporter loading a shipping container for international delivery would MOST likely prefer which pallet format?',
    options: [
      'Gaylords, because they protect merchandise during ocean transit',
      'Standard pallets with shrink-wrapped loose items for easy inspection',
      'Palletized cases, because they stack efficiently and maximize container space',
      'Watermelon bins, because they hold the most merchandise by weight',
    ],
    correctIndex: 2,
    explanation:
      'Palletized cases (case packs stacked on pallets) are ideal for exporters because the uniform boxes stack tightly and maximize container utilization. When shipping internationally, efficient space usage is critical because container costs are fixed regardless of how much merchandise fits inside.',
  },
  {
    id: 'cq-8',
    question: 'What is the primary economic benefit of purchasing a full truckload instead of individual pallets?',
    options: [
      'Truckload buyers receive higher-quality merchandise',
      'Per-unit cost drops significantly because shipping and handling costs are spread across far more merchandise',
      'Truckload orders always include manifests while pallet orders do not',
      'Truckload buyers get priority customer support from their Account Manager',
    ],
    correctIndex: 1,
    explanation:
      'Buying by the truckload dramatically lowers the per-unit cost. Shipping a full trailer of 22-28 pallets costs far less per pallet than shipping individual pallets via LTL. The fixed costs of freight, handling, and logistics are distributed across a much larger quantity of merchandise.',
  },
]

export const industrySectionedQuiz: SectionedQuiz = {
  termMatch: [
    {
      term: 'Gaylord',
      definition: 'A large cardboard box mounted on a pallet, commonly used for loose or assorted merchandise',
    },
    {
      term: 'Reverse Logistics',
      definition: 'The process of moving goods backward through the supply chain — from consumer returns to liquidation',
    },
    {
      term: 'LTL (Less Than Load)',
      definition: 'A shipping method for 1–6 pallets that shares trailer space with other shipments',
    },
    {
      term: 'Landed Cost',
      definition: 'The total cost of merchandise including purchase price, shipping, and all delivery fees',
    },
  ],
  multipleChoice: industryCourseQuiz,
  fillInBlank: [
    {
      id: 'cq-fib-1',
      sentence: 'A standard 53-foot trailer holds _____ pallets when loaded straight.',
      blank: '26',
      options: ['12', '22', '26', '48'],
      correctIndex: 2,
    },
    {
      id: 'cq-fib-2',
      sentence: 'Merchandise that was never purchased by a consumer and is still in original condition is classified as _____.',
      blank: 'New Overstock',
      options: ['Customer Returns', 'New Overstock', 'Salvage', 'Clearance'],
      correctIndex: 1,
    },
    {
      id: 'cq-fib-3',
      sentence: 'Items removed from retail sales floors that were never purchased by a consumer are called _____.',
      blank: 'Shelf Pulls',
      options: ['Customer Returns', 'New Overstock', 'Salvage', 'Shelf Pulls'],
      correctIndex: 3,
    },
    {
      id: 'cq-fib-4',
      sentence: 'Level 1 dealers handle approximately _____% of all salvage goods entering the secondary market.',
      blank: '70',
      options: ['30', '50', '70', '90'],
      correctIndex: 2,
    },
  ],
}
