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
    question: 'What does it mean when a load is described as "manifested"?',
    options: [
      'The load has been inspected and every item is guaranteed to work',
      'A detailed list of items (brand, model, quantity, value) is included with the load',
      'The load has been certified by the manufacturer',
      'The items have been sorted by condition and category',
    ],
    correctIndex: 1,
    explanation:
      'A manifested load comes with a manifest — a document listing all items including brand, model number, quantity, and wholesale value. This gives buyers transparency to evaluate a purchase before committing. Not all loads come with manifests, and manifests are generated by the retailer\'s facility so minor discrepancies are normal.',
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
    question: 'What is the difference between LTL and a full truckload shipment?',
    options: [
      'LTL is for international shipping only; truckloads are domestic only',
      'LTL ships 1-6 pallets sharing trailer space; a truckload fills an entire 53-foot trailer',
      'LTL is faster than truckload shipping',
      'There is no difference — they are the same thing',
    ],
    correctIndex: 1,
    explanation:
      'LTL (Less Than Truckload) ships 1-6 pallets and shares trailer space with other shipments. A full truckload fills an entire trailer (typically 53 feet) with 12 to 24-30 pallets. Larger shipments generally mean lower per-unit costs, but LTL gives smaller buyers access to freight shipping without needing a full load.',
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
