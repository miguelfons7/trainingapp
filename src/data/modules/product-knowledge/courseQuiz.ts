import type { QuizQuestion, SectionedQuiz } from '../../../types'

/**
 * End-of-course quiz for "Product Knowledge"
 * Sectioned format: 4 term match + 8 MC + 4 fill-in-blank = 16 items
 * Passing score: 85% (14 of 16 correct)
 */

/** Legacy flat quiz (kept for backward compatibility) */
export const productKnowledgeQuiz: QuizQuestion[] = [
  {
    id: 'pk-cq-1',
    question: 'How many retail partner programs does Via Trading currently operate?',
    options: [
      '8',
      '12',
      '18',
      '24',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading currently operates 18 retail partner programs across 12+ retail partners covering 8 product categories.',
  },
  {
    id: 'pk-cq-2',
    question: 'What makes a load "manifested"?',
    options: [
      'It ships in a standard container',
      'It includes full item-level detail so the buyer knows exactly what is inside before purchasing',
      'It is sold at a flat price regardless of contents',
      'It has been inspected and repaired by Via Trading',
    ],
    correctIndex: 1,
    explanation:
      'A manifested load includes item-level detail — the buyer can see a list of every item, brand, and estimated value before purchasing. This contrasts with unmanifested loads where the buyer gets a general category but no item-level breakdown.',
  },
  {
    id: 'pk-cq-3',
    question: 'How many pricing tiers does the TGT Salvage program have?',
    options: [
      '2 — Standard and Premium',
      '3 — Value, Prime, and Max',
      '4 — Value, Prime, Max, and Ocean Container',
      '5 — Budget, Value, Prime, Max, and Ocean Container',
    ],
    correctIndex: 2,
    explanation:
      'TGT Salvage has four pricing tiers: Value ($10,990), Prime ($12,990), Max ($23,990), and Ocean Container ($18,490). Each tier reflects a different quality level and load configuration.',
  },
  {
    id: 'pk-cq-4',
    question: 'Which Home Depot program offers full item-level manifests?',
    options: [
      'HD Turbo (TRB)',
      'HD Manifested (VHD)',
      'Both programs are manifested',
      'Neither program is manifested',
    ],
    correctIndex: 1,
    explanation:
      'HD Manifested (VHD) provides item-level detail and is priced at 31% of wholesale value. HD Turbo (TRB) is unmanifested with flat per-load pricing.',
  },
  {
    id: 'pk-cq-5',
    question: 'What is the pricing model for Boscov\'s loads?',
    options: [
      'Flat price per load',
      'Tiered pricing by quality',
      '9-12% of retail value',
      '31% of wholesale value',
    ],
    correctIndex: 2,
    explanation:
      'Boscov\'s loads are priced at 9-12% of retail value, making them among the lowest-priced programs in Via Trading\'s catalog. This appeals to budget-conscious buyers.',
  },
  {
    id: 'pk-cq-6',
    question: 'How does LiquidateNow differ from Via Trading\'s direct programs?',
    options: [
      'LN only sells furniture and home goods',
      'LN is consignment-based — vendors list their own inventory and set pricing, while Via\'s direct programs involve Via purchasing inventory outright',
      'LN only serves international buyers',
      'LN inventory is always unmanifested',
    ],
    correctIndex: 1,
    explanation:
      'LiquidateNow operates on a consignment model. Vendors retain ownership of their inventory until it sells, and they set their own pricing expectations. Via Trading\'s direct programs involve Via buying inventory outright from retailers.',
  },
  {
    id: 'pk-cq-7',
    question: 'Which Lowes program detail is correct?',
    options: [
      'Lowes loads are manifested with item-level detail',
      'Lowes only ships from California',
      'Lowes loads are unmanifested customer returns with 22-26 pallets per load, available from multiple FOB locations',
      'Lowes loads are priced as a percentage of retail value',
    ],
    correctIndex: 2,
    explanation:
      'Lowes loads are unmanifested customer returns, typically containing 22-26 pallets per load. They are available from multiple FOB locations including CA, OR, WY, and NC, priced at $4,850-$4,950 per load.',
  },
  {
    id: 'pk-cq-8',
    question: 'What condition is TGT Apparel merchandise?',
    options: [
      'Customer Returns — mixed condition',
      'New Overstock — 90%+ retail ready',
      'Salvage — damaged or incomplete',
      'Refurbished — inspected and repaired',
    ],
    correctIndex: 1,
    explanation:
      'TGT Apparel is New Overstock condition, with 90%+ of items in new master case and retail-ready condition. This is a high-margin apparel program popular with clothing resellers.',
  },
]

/** Sectioned quiz format for the new quiz layout */
export const productKnowledgeSectionedQuiz: SectionedQuiz = {
  termMatch: [
    {
      term: 'Manifested',
      definition: 'A load with full item-level detail available before purchase, priced as a percentage of retail or wholesale',
    },
    {
      term: 'TGT Salvage',
      definition: 'Via Trading\'s flagship Target program with four pricing tiers, known as one of the cleanest customer return loads in the industry',
    },
    {
      term: 'LiquidateNow',
      definition: 'Consignment-based platform where vendors list their own inventory and leverage Via Trading\'s buyer network',
    },
    {
      term: 'FOB',
      definition: 'Freight on Board — the pickup location where merchandise is available, which affects shipping costs and logistics',
    },
  ],
  multipleChoice: productKnowledgeQuiz,
  fillInBlank: [
    {
      id: 'pk-cq-fib-1',
      sentence: 'Via Trading operates _____ retail partner programs across 12+ partners.',
      blank: '18',
      options: ['8', '12', '18', '24'],
      correctIndex: 2,
    },
    {
      id: 'pk-cq-fib-2',
      sentence: 'TGT Salvage Value tier is priced at _____ per load.',
      blank: '$10,990',
      options: ['$4,950', '$7,800', '$10,990', '$18,490'],
      correctIndex: 2,
    },
    {
      id: 'pk-cq-fib-3',
      sentence: 'HD Manifested (VHD) loads are priced at _____% of wholesale value.',
      blank: '31',
      options: ['9', '20', '31', '50'],
      correctIndex: 2,
    },
    {
      id: 'pk-cq-fib-4',
      sentence: 'Lowes loads typically contain _____ to 26 pallets per load.',
      blank: '22',
      options: ['10', '16', '22', '30'],
      correctIndex: 2,
    },
  ],
}
