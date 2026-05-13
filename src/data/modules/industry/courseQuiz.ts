import type { QuizQuestion } from '../../../types'

/**
 * End-of-course quiz for "Intro to the Liquidation Industry"
 * 12 unique questions covering all modules — no repeats from inline exercises.
 * Passing score: 85% (10 of 12 correct)
 */
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
    id: 'cq-3',
    question: 'Why does Via Trading use the term "New Overstock" instead of "excess inventory"?',
    options: [
      'They mean different things',
      'It sounds more premium and confuses buyers',
      'It\'s Via Trading\'s preferred terminology that emphasizes the product is new and unsold',
      'It\'s required by law',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading uses specific terminology that reflects the product accurately. "New Overstock" emphasizes that the merchandise is brand new and was never purchased by a consumer — it simply went unsold. When speaking with industry contacts, you may hear "excess inventory" used interchangeably.',
  },
  {
    id: 'cq-4',
    question: 'What is a manifest and why is it important to buyers?',
    options: [
      'A shipping label that shows the weight of a pallet',
      'A document listing all items in a lot with brand, model, quantity, and value — essential for evaluating a purchase',
      'A receipt showing the final sale price',
      'A government form required for international shipping',
    ],
    correctIndex: 1,
    explanation:
      'A manifest is a detailed document listing every item in a lot, including brand, model number, quantity, and wholesale value. It allows buyers to evaluate a purchase before committing and is a key differentiator for transparent liquidation companies like Via Trading.',
  },
  {
    id: 'cq-5',
    question: 'What is the key difference between Shelf Pulls (MOS) and Customer Returns?',
    options: [
      'Shelf Pulls are more expensive',
      'Customer Returns are always defective',
      'Shelf Pulls were never purchased by a consumer; Customer Returns were bought and sent back',
      'There is no difference — they are the same product type',
    ],
    correctIndex: 2,
    explanation:
      'Shelf Pulls (MOS — Merchandise On Sale) are items that remained unsold on retail shelves and were pulled for liquidation. They are typically in original packaging with minor handling wear. Customer Returns, on the other hand, were actually purchased by consumers and then returned for various reasons.',
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
      'Free Of Burden — it means the buyer has no obligations',
      'Freight On Board — it indicates the pickup/shipping location and helps calculate freight costs',
      'First Order Bonus — a discount for new customers',
      'Federal Oversight Board — a regulatory requirement',
    ],
    correctIndex: 1,
    explanation:
      'FOB (Freight On Board) indicates the location where merchandise is available for pickup or shipping. It helps buyers calculate freight costs and also reveals whether a transaction is direct or brokered — important for evaluating the source of inventory.',
  },
  {
    id: 'cq-8',
    question: 'An exporter wants to fill a shipping container for Central America. What should you focus on first?',
    options: [
      'Offering the lowest possible price immediately',
      'Understanding their target categories, destination country regulations, and preferred conditions',
      'Telling them to start with a single pallet first',
      'Directing them to a competitor',
    ],
    correctIndex: 1,
    explanation:
      'Exporters have specific needs around product categories, country regulations, container-friendly packaging, and pricing at scale. Understanding these needs first allows you to build a customized solution that delivers real value — which is Via Trading\'s consultative approach.',
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
      'There are several common pallet formats: Standard Pallets (wooden 48"×48" with stacked merchandise), Gaylords (large cardboard boxes on pallets), Palletized Cases (case packs stacked on pallets), and Watermelon Bins (large open-top bins). The format affects how buyers receive, sort, and resell.',
  },
  {
    id: 'cq-10',
    question: 'What is "reverse logistics" in the liquidation industry?',
    options: [
      'Shipping products faster to retail stores',
      'The process of moving goods backward through the supply chain — from consumer back to liquidation',
      'Returning defective products to manufacturers',
      'A logistics company that specializes in reverse delivery routes',
    ],
    correctIndex: 1,
    explanation:
      'Reverse logistics describes the flow of goods backward through the supply chain: consumers return items to retailers, retailers aggregate returns, and those goods flow to liquidation companies like Via Trading who distribute them to the secondary market.',
  },
  {
    id: 'cq-11',
    question: 'A new buyer calls asking for advice on getting started. They have a $3,000 budget. What approach reflects Via Trading\'s values best?',
    options: [
      'Tell them the minimum order is $10,000',
      'Educate them on options within their budget, suggest a starter pallet, and guide them with patience',
      'Send them to a competitor with lower prices',
      'Pressure them to buy a truckload for better per-unit pricing',
    ],
    correctIndex: 1,
    explanation:
      'Via Trading\'s values of honesty, integrity, and transparency mean treating new buyers with patience and education. Helping them start small, learn the business, and grow builds long-term relationships — over 90% of Via\'s business comes from repeat customers.',
  },
  {
    id: 'cq-12',
    question: 'Which of the following is NOT a common sales channel in the secondary market?',
    options: [
      'Online marketplaces (Amazon, eBay, Whatnot)',
      'Discount and bin stores',
      'Direct-to-manufacturer returns',
      'Export to international markets',
    ],
    correctIndex: 2,
    explanation:
      'Common secondary market sales channels include online marketplaces, discount stores, bin stores, flea markets, auction houses, and export. "Direct-to-manufacturer returns" is not a sales channel — manufacturers are part of the supply side, not the resale distribution side.',
  },
]
