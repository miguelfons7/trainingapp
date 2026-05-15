import type { QuizQuestion, SectionedQuiz } from '../../../types'

/**
 * End-of-course quiz for "Intro to the Liquidation Industry"
 * Sectioned format: 4 term match + 8 MC + 4 fill-in-blank = 16 items
 * Passing score: 85% (14 of 16 correct)
 */

/** Legacy flat quiz (kept for backward compatibility) */
export const industryCourseQuiz: QuizQuestion[] = [
  {
    id: 'cq-1',
    question: 'What is the primary reason the secondary market exists?',
    options: [
      'To compete with traditional retail stores',
      'To provide an outlet for unsold, returned, and excess merchandise from retailers',
      'To manufacture cheaper versions of brand-name products',
      'To serve as a recycling center for damaged goods',
    ],
    correctIndex: 1,
    explanation:
      'The secondary market exists because major retailers generate enormous volumes of unsold, returned, and excess merchandise that needs an outlet. Rather than destroying it, this inventory flows into the secondary market where it can be resold at discounted prices.',
  },
  {
    id: 'cq-2',
    question: 'What distinguishes a Level 1 dealer from a Level 2 or Level 3 dealer?',
    options: [
      'Level 1 dealers only sell electronics',
      'Level 1 dealers have direct contracts with major retailers and handle ~70% of salvage goods',
      'Level 1 dealers sell directly to consumers',
      'Level 1 dealers only operate in the United States',
    ],
    correctIndex: 1,
    explanation:
      'Level 1 dealers like Via Trading have direct contracts with major retailers (Walmart, Target, Amazon, etc.) and handle approximately 70% of all salvage goods entering the secondary market. This gives them access to the freshest inventory at the best prices.',
  },
  {
    id: 'cq-4',
    question: 'What is a manifest and why is it important to buyers?',
    options: [
      'A shipping label that shows the weight of a pallet',
      'A document listing all items in a lot with brand, model, quantity, and value, essential for evaluating a purchase',
      'A receipt showing the final sale price',
      'A government form required for international shipping',
    ],
    correctIndex: 1,
    explanation:
      'A manifest is a detailed document listing every item in a lot, including brand, model number, quantity, and wholesale value. It allows buyers to evaluate a purchase before committing and is a key differentiator for transparent liquidation companies like Via Trading.',
  },
  {
    id: 'cq-6',
    question: 'A buyer mentions they operate a bin store and need weekly replenishment. What type of merchandise would best suit their needs?',
    options: [
      'Category-specific electronics pallets',
      'High-volume assorted merchandise with strong product density',
      'Individual cases of premium items',
      'Salvage-grade goods for repair',
    ],
    correctIndex: 1,
    explanation:
      'Bin store operators need high-volume, assorted merchandise that creates a "treasure hunt" experience for their customers. They typically restock on a weekly markdown schedule and care most about product density and competitive pricing.',
  },
  {
    id: 'cq-7',
    question: 'What does FOB stand for and why does it matter in liquidation?',
    options: [
      'Free Of Burden, it means the buyer has no obligations',
      'Freight On Board; it indicates the pickup/shipping location and helps calculate freight costs',
      'First Order Bonus, a discount for new customers',
      'Federal Oversight Board, a regulatory requirement',
    ],
    correctIndex: 1,
    explanation:
      'FOB (Freight On Board) indicates the location where merchandise is available for pickup or shipping. It helps buyers calculate freight costs and also reveals whether a transaction is direct or brokered, which is important for evaluating the source of inventory.',
  },
  {
    id: 'cq-9',
    question: 'What are the common pallet formats a buyer might receive?',
    options: [
      'Only standard wooden pallets',
      'Standard Pallets, Gaylords, Palletized Cases, and Watermelon Bins',
      'Only shrink-wrapped cases',
      'Loose merchandise in cardboard boxes',
    ],
    correctIndex: 1,
    explanation:
      'There are several common pallet formats: Standard Pallets (wooden 48"x48" with stacked merchandise), Gaylords (large cardboard boxes on pallets), Palletized Cases (case packs stacked on pallets), and Watermelon Bins (large open-top bins). The format affects how buyers receive, sort, and resell.',
  },
  {
    id: 'cq-10',
    question: 'What is "reverse logistics" in the liquidation industry?',
    options: [
      'Shipping products faster to retail stores',
      'The process of moving goods backward through the supply chain, from consumer back to liquidation',
      'Returning defective products to manufacturers',
      'A logistics company that specializes in reverse delivery routes',
    ],
    correctIndex: 1,
    explanation:
      'Reverse logistics describes the flow of goods backward through the supply chain: consumers return items to retailers, retailers aggregate returns, and those goods flow to liquidation companies like Via Trading who distribute them to the secondary market.',
  },
  {
    id: 'cq-11',
    question: 'What is the difference between LTL and a full truckload shipment?',
    options: [
      'LTL is for international shipping only; truckloads are domestic only',
      'LTL ships 1-6 pallets sharing trailer space; a truckload fills an entire trailer with 22-28 pallets',
      'LTL is faster than truckload shipping',
      'There is no difference; they are the same thing',
    ],
    correctIndex: 1,
    explanation:
      'LTL (Less Than Load) ships 1 to 6 pallets and shares trailer space with other shipments. A full truckload fills an entire trailer (48-foot or 53-foot) with 22 to 28 pallets depending on trailer size and configuration. Larger shipments generally mean lower per-unit costs.',
  },
]

/** Sectioned quiz format for the new quiz layout */
export const industrySectionedQuiz: SectionedQuiz = {
  termMatch: [
    {
      term: 'New Overstock',
      definition: 'Unsold retail merchandise still in original condition, never purchased by a consumer',
    },
    {
      term: 'Customer Returns',
      definition: 'Goods purchased by consumers and sent back to the retailer for various reasons',
    },
    {
      term: 'Shelf Pulls (MOS)',
      definition: 'Items removed from retail sales floors that remained unsold, typically in original packaging',
    },
    {
      term: 'Salvage',
      definition: 'Merchandise found to be significantly compromised: broken, missing parts, or heavily damaged',
    },
  ],
  multipleChoice: industryCourseQuiz,
  fillInBlank: [
    {
      id: 'cq-fib-1',
      sentence: 'At Via Trading, unsold merchandise that was never purchased by a consumer is called _____.',
      blank: 'New Overstock',
      options: ['New Overstock', 'Clearance', 'Deadstock', 'Surplus'],
      correctIndex: 0,
    },
    {
      id: 'cq-fib-2',
      sentence: 'A standard 53-foot trailer holds _____ pallets when loaded straight, or up to 28 if pinwheeled.',
      blank: '26',
      options: ['12', '22', '26', '52'],
      correctIndex: 2,
    },
    {
      id: 'cq-fib-3',
      sentence: 'Level 1 dealers handle approximately _____% of all salvage goods entering the secondary market.',
      blank: '70',
      options: ['30', '50', '70', '90'],
      correctIndex: 2,
    },
    {
      id: 'cq-fib-4',
      sentence: 'The total cost of merchandise including purchase price, shipping, and all delivery fees is called the _____.',
      blank: 'landed cost',
      options: ['retail price', 'wholesale price', 'landed cost', 'MSRP'],
      correctIndex: 2,
    },
  ],
}
