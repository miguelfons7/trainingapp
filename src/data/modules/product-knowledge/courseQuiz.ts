import type { QuizQuestion, SectionedQuiz } from '../../../types'

/**
 * End-of-course quiz for "Product Knowledge"
 * Sectioned format: 4 term match + 8 MC + 4 fill-in-blank = 16 items
 * Passing score: 85% (14 of 16 correct)
 *
 * NOTE: Avoid questions about specific program counts — these change frequently.
 */

/** Legacy flat quiz (kept for backward compatibility) */
export const productKnowledgeQuiz: QuizQuestion[] = [
  {
    id: 'pk-cq-1',
    question: 'Why does Via Trading use Parent SKU codes (like TGT, WM, HD) instead of retailer names?',
    options: [
      'It is easier for the warehouse to process',
      'Via Trading cannot publicly advertise which retailers it works with',
      'It is a government requirement for liquidation companies',
      'Retailers prefer to remain anonymous',
    ],
    correctIndex: 1,
    explanation:
      'Via Trading uses Parent SKU codes because it cannot publicly advertise which retailers it works with. For example, Target programs use TGT and ARW, Walmart uses WM, and Home Depot uses HD.',
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
    question: 'What is unique about TGT Premium compared to TGT Salvage?',
    options: [
      'Premium loads are larger',
      'Premium items are cherry-picked by Target from customer returns and the loads are manifested',
      'Premium loads are cheaper than Salvage',
      'Premium loads only contain electronics',
    ],
    correctIndex: 1,
    explanation:
      'TGT Premium is manifested and contains items cherry-picked by Target from the customer returns stream. These are higher-quality items sold at a higher rate than standard salvage loads.',
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
    question: 'How does merchandise flow differ across Via Trading programs?',
    options: [
      'All merchandise is shipped to Via Trading\'s warehouse first',
      'All merchandise ships directly from the retailer to the buyer',
      'Some programs ship directly from the retailer to the buyer, while others go through Via Trading\'s facilities first',
      'Via Trading picks up all merchandise from retail stores',
    ],
    correctIndex: 2,
    explanation:
      'Merchandise flow varies by program. Some programs ship directly from the retailer\'s facilities to the buyer, reducing fuel and storage costs. Other programs require merchandise to be shipped to Via Trading\'s facilities first before going to customers.',
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
    question: 'What is the "Make an Offer" feature on LiquidateNow?',
    options: [
      'A way for vendors to offer discounts automatically',
      'A feature that lets buyers submit an offer below the listed price for the vendor to consider',
      'An auction system where buyers bid against each other',
      'A referral program for returning buyers',
    ],
    correctIndex: 1,
    explanation:
      'The "Make an Offer" feature allows buyers to submit an offer lower than the listed price. The vendor then reviews and considers the offer. This is represented by an orange "Make an Offer" button on the LiquidateNow website.',
  },
  {
    id: 'pk-cq-8',
    question: 'Which retail partner\'s program is part of Via Trading\'s WeSolveReturns (WSR) program?',
    options: [
      'Target',
      'Walmart',
      'Zappos',
      'Amazon',
    ],
    correctIndex: 2,
    explanation:
      'Zappos is part of Via Trading\'s WeSolveReturns (WSR) program, which processes returns for brands that don\'t have their own returns infrastructure. The Zappos program provides manifested footwear loads.',
  },
]

/** Sectioned quiz format for the new quiz layout */
export const productKnowledgeSectionedQuiz: SectionedQuiz = {
  termMatch: [
    {
      term: 'Manifested',
      definition: 'A load with full item-level detail available before purchase, so the buyer knows exactly what they are getting',
    },
    {
      term: 'Parent SKU',
      definition: 'The code name used to identify a retail partner\'s program without publicly naming the retailer (e.g., TGT for Target, WM for Walmart)',
    },
    {
      term: 'LiquidateNow',
      definition: 'Consignment-based platform where vendors list their own inventory and leverage Via Trading\'s buyer network',
    },
    {
      term: 'Make an Offer',
      definition: 'A LiquidateNow feature that lets buyers submit a price lower than the listing for the vendor to consider',
    },
  ],
  multipleChoice: productKnowledgeQuiz,
  fillInBlank: [
    {
      id: 'pk-cq-fib-1',
      sentence: 'Via Trading uses _____ codes to refer to its retail partners without naming them publicly.',
      blank: 'Parent SKU',
      options: ['Brand', 'Parent SKU', 'Wholesale', 'Retail'],
      correctIndex: 1,
    },
    {
      id: 'pk-cq-fib-2',
      sentence: 'TGT Premium loads are _____, meaning buyers get item-level detail before purchasing.',
      blank: 'manifested',
      options: ['unmanifested', 'manifested', 'consignment', 'flat-priced'],
      correctIndex: 1,
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
      sentence: 'Zappos is part of Via Trading\'s _____ program.',
      blank: 'WeSolveReturns',
      options: ['LiquidateNow', 'WeSolveReturns', 'Direct Purchase', 'Premium'],
      correctIndex: 1,
    },
  ],
}
