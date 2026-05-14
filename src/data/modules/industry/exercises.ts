import type { TermMatchPair, ScenarioQuestion, FillInBlankItem } from '../../../types'

// --- Term Match: Industry Terminology ---
export const industryTermMatchPairs: TermMatchPair[] = [
  {
    term: 'New Overstock',
    definition: 'Unsold retail merchandise still in original condition, never purchased by a consumer',
  },
  {
    term: 'Customer Returns',
    definition: 'Goods purchased by consumers and sent back to the retailer for various reasons',
  },
  {
    term: 'Shelf Pulls',
    definition: 'Items removed from retail sales floors that remained unsold, in original packaging',
  },
  {
    term: 'Salvage',
    definition: 'Merchandise found to be significantly compromised: broken, missing parts, or heavily damaged',
  },
  {
    term: 'Manifest',
    definition: 'A document listing all items in a lot, including brand, model number, quantity, and value',
  },
  {
    term: 'Level 1 Dealer',
    definition: 'Bulk buyer with direct contracts with major retailers, like Via Trading',
  },
  {
    term: 'Reverse Logistics',
    definition: 'The process of moving goods backward through the supply chain from consumer to liquidation',
  },
  {
    term: 'FOB',
    definition: 'Freight on Board, indicates the location where merchandise is available for pickup or shipping',
  },
]

// --- Scenario Cards: Sales Situations ---
export const industryScenarios: ScenarioQuestion[] = [
  {
    id: 'scenario-1',
    scenario:
      'A new buyer calls and says they want to start a bin store. They have a $5,000 budget and want only brand-new, sealed electronics. What is the best way to set their expectations?',
    options: [
      'Tell them you can get exactly what they want at that price point',
      'Explain that their budget will get them started, but sealed electronics in perfect condition command higher prices, and suggest a mixed New Overstock pallet as a great entry point',
      'Tell them bin stores don\'t work and suggest a different business model',
      'Recommend they wait until they have $50,000 to start',
    ],
    bestAnswerIndex: 1,
    explanation:
      'Setting realistic expectations is key. A $5,000 budget is a good start, but sealed brand-name electronics in perfect condition are premium products. Pointing them toward a mixed New Overstock pallet lets them test the waters, learn the business, and grow from there, which builds a long-term relationship.',
  },
  {
    id: 'scenario-2',
    scenario:
      'A buyer asks: "What\'s the difference between your product and what I can get from a Level 2 dealer down the street?" How do you respond?',
    options: [
      'Say there is no difference',
      'Tell them the Level 2 dealer is selling inferior products',
      'Explain that as a Level 1 dealer, Via Trading sources directly from Fortune 100 retailers, meaning fresher inventory, better pricing, and no middleman markup compared to Level 2 or 3 dealers',
      'Refuse to discuss competitors',
    ],
    bestAnswerIndex: 2,
    explanation:
      'Via Trading is a Level 1 dealer with direct retailer contracts. This means the inventory is closer to the source, more competitively priced, and hasn\'t been picked over by intermediaries. Educating the buyer about dealer levels builds trust through transparency, one of Via\'s core values.',
  },
  {
    id: 'scenario-3',
    scenario:
      'A buyer receives their first pallet and calls, frustrated that about 15% of items show cosmetic damage. They expected everything to be perfect. What do you do?',
    options: [
      'Offer an immediate full refund',
      'Tell them that\'s normal and they should have known better',
      'Acknowledge their concern, explain that some level of compromise is expected with Customer Returns and it varies by load, then offer to walk them through how to maximize value from every item, including repair, bundling, and resale strategies',
      'Blame the shipping company',
    ],
    bestAnswerIndex: 2,
    explanation:
      'Education and empathy are the right approach. Customer Returns will always have some level of compromise. The rate varies by load and category, which is why we avoid quoting specific percentages. Helping the buyer understand how to handle these items (repair, bundle, sell for parts) turns a complaint into a learning moment and builds long-term loyalty.',
  },
  {
    id: 'scenario-4',
    scenario:
      'An experienced exporter wants to buy 10 truckloads of mixed general merchandise for shipping to Central America. They ask for "the lowest possible price." How do you handle pricing?',
    options: [
      'Immediately offer the lowest price you can to win the deal',
      'Ask about their target categories, destination country regulations, and preferred conditions first, then build a customized quote that delivers real value, not just low cost',
      'Tell them your prices are non-negotiable',
      'Refer them to a competitor who might be cheaper',
    ],
    bestAnswerIndex: 1,
    explanation:
      'Via Trading\'s consultative sales approach means understanding the buyer\'s needs first. Exporters have specific requirements around product categories, country regulations, and sizing. Building a customized solution shows expertise and creates more value than simply cutting price.',
  },
]

// --- Fill in the Blank: Industry Knowledge ---
export const industryFillInBlanks: FillInBlankItem[] = [
  {
    id: 'fib-1',
    sentence:
      'Via Trading is a _____ dealer, meaning we have direct contracts with major retailers like Walmart, Target, and Amazon.',
    blank: 'Level 1',
    options: ['Level 1', 'Level 2', 'Level 3', 'Regional'],
    correctIndex: 0,
  },
  {
    id: 'fib-2',
    sentence:
      'At Via Trading, we call excess unsold merchandise _____, while the broader industry may refer to it as excess inventory.',
    blank: 'New Overstock',
    options: ['New Overstock', 'Surplus Goods', 'Deadstock', 'Clearance'],
    correctIndex: 0,
  },
  {
    id: 'fib-3',
    sentence:
      'A standard Via Trading truckload uses a 53-foot trailer that can carry _____ pallets depending on how inventory is condensed.',
    blank: '12 to 24-30',
    options: ['6 to 8', '12 to 24-30', '50 to 60', '4 to 6'],
    correctIndex: 1,
  },
  {
    id: 'fib-4',
    sentence:
      'The process of moving goods backward through the supply chain, from consumer back to liquidation, is called _____.',
    blank: 'reverse logistics',
    options: ['forward shipping', 'reverse logistics', 'return processing', 'backhaul delivery'],
    correctIndex: 1,
  },
  {
    id: 'fib-5',
    sentence:
      'A _____ is a document listing all items in a lot, helping buyers evaluate the purchase before committing.',
    blank: 'manifest',
    options: ['manifest', 'invoice', 'purchase order', 'packing slip'],
    correctIndex: 0,
  },
]
