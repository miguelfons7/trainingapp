import type { QuizQuestion } from '../../types'

/**
 * Program Final Exam for "New AM Training Program"
 * Pulls questions from Course 1 (Industry), Course 2 (Via Trading), and Course 3 (Product Knowledge).
 * 25 questions total, 80% passing (20 correct), timed at 25 minutes.
 */

export const EXAM_TIME_LIMIT_MINUTES = 25

export const programExamQuestions: QuizQuestion[] = [
  // --- Course 1: Industry Knowledge (10 questions) ---
  {
    id: 'pe-1',
    question: 'What is liquidation?',
    options: [
      'A type of bankruptcy filing',
      'The process of selling unsold, returned, or excess merchandise in bulk at discounted prices',
      'A government program to redistribute unsold goods',
      'A retail pricing strategy for end-of-season items',
    ],
    correctIndex: 1,
    explanation:
      'Liquidation is the umbrella term for the process of selling off unsold, returned, or excess merchandise in bulk at deeply discounted prices. It is the foundation of the entire industry.',
  },
  {
    id: 'pe-2',
    question: 'Why do major retailers sell returned merchandise to liquidators instead of putting it back on shelves?',
    options: [
      'Returned items are always defective',
      'It is too expensive to inspect, repackage, and re-merchandise every item at scale',
      'Retailers are legally required to dispose of returns',
      'Consumers refuse to buy returned merchandise',
    ],
    correctIndex: 1,
    explanation:
      'For major retailers, the economics of inspecting, repackaging, and re-merchandising every returned item at scale do not work. The warehouse space alone costs more than the recovery value in many cases.',
  },
  {
    id: 'pe-3',
    question: 'What condition describes merchandise that was never purchased by a consumer and is still in original packaging?',
    options: [
      'Customer Returns',
      'Salvage',
      'New Overstock',
      'Shelf Pulls',
    ],
    correctIndex: 2,
    explanation:
      'New Overstock is Via Trading\'s term for unsold merchandise still in original condition. It was never purchased by a consumer. The broader industry sometimes calls this "excess inventory."',
  },
  {
    id: 'pe-4',
    question: 'What is the key difference between a wholesaler and a broker in the secondary market?',
    options: [
      'Wholesalers operate online; brokers operate in person',
      'Wholesalers purchase and own the inventory; brokers connect buyers and sellers without owning product',
      'There is no difference',
      'Wholesalers sell to consumers; brokers sell to businesses',
    ],
    correctIndex: 1,
    explanation:
      'Wholesalers purchase and take ownership of merchandise, then resell in smaller quantities. Brokers never own the product; they connect buyers with sellers and earn a commission or fee.',
  },
  {
    id: 'pe-5',
    question: 'How many pallets can a standard 53-foot trailer hold?',
    options: [
      '12 pallets',
      '22 pallets',
      '26 pallets (or 28 if pinwheeled)',
      '40 pallets',
    ],
    correctIndex: 2,
    explanation:
      'A standard 53-foot trailer holds 26 pallets when loaded straight. If pallets are pinwheeled (rotated to alternate orientations), it can fit up to 28. These numbers assume standard 8-foot tall pallets.',
  },
  {
    id: 'pe-6',
    question: 'What does FOB stand for and what does it indicate?',
    options: [
      'Free On Board; the shipping cost is free',
      'Freight On Board; the location where merchandise is available for pickup or shipping',
      'Full Order Bulk; a type of bulk pricing',
      'Forward Order Booking; a pre-order system',
    ],
    correctIndex: 1,
    explanation:
      'FOB (Freight On Board) indicates where merchandise is available for pickup or shipping. It helps buyers calculate freight costs and reveals whether a transaction is direct or brokered.',
  },
  {
    id: 'pe-7',
    question: 'What type of business operates retail locations where merchandise is sold at flat prices on a weekly markdown schedule?',
    options: [
      'Dollar stores',
      'Bin stores',
      'Pawn shops',
      'Outlet malls',
    ],
    correctIndex: 1,
    explanation:
      'Bin stores sell merchandise from large bins at flat prices that decrease throughout the week. The "treasure hunt" experience has made this one of the fastest-growing segments in the secondary market.',
  },
  {
    id: 'pe-8',
    question: 'What is "reverse logistics"?',
    options: [
      'Shipping products in reverse alphabetical order',
      'The process of moving goods backward through the supply chain, from consumer back to liquidation',
      'A method of expedited shipping',
      'Returning products to the manufacturer for repair',
    ],
    correctIndex: 1,
    explanation:
      'Reverse logistics describes the flow of goods backward through the supply chain. Consumers return items to retailers, retailers aggregate returns, and those goods flow to liquidation companies like Via Trading.',
  },
  {
    id: 'pe-9',
    question: 'What is a manifest?',
    options: [
      'A warranty document for liquidated goods',
      'A detailed list of items in a lot including brand, model, quantity, and value',
      'A shipping label required for international transport',
      'A contract between buyer and seller',
    ],
    correctIndex: 1,
    explanation:
      'A manifest is a detailed document listing every item in a lot. It gives buyers transparency to evaluate a purchase before committing and is a key differentiator for companies like Via Trading.',
  },
  {
    id: 'pe-10',
    question: 'What distinguishes Via Trading as a Level 1 dealer?',
    options: [
      'They sell only premium products',
      'They have direct contracts with major retailers and handle ~70% of salvage goods entering the secondary market',
      'They only operate in California',
      'They have the largest warehouse in the industry',
    ],
    correctIndex: 1,
    explanation:
      'Level 1 dealers have direct contracts with major retailers like Walmart, Target, and Amazon. They handle approximately 70% of all salvage goods entering the secondary market and offer the freshest inventory at the best prices.',
  },

  // --- Course 2: Via Trading Knowledge (10 questions) ---
  {
    id: 'pe-11',
    question: 'What is Via Trading Corporation?',
    options: [
      'Another name for ViaTrading.com',
      'The parent umbrella company housing Via Trading, LiquidateNow, and WeSolveReturns',
      'A franchise system for liquidation stores',
      'Via Trading\'s international division',
    ],
    correctIndex: 1,
    explanation:
      'Via Trading Corporation is the umbrella company. Under it operate three entities: Via Trading (wholesale liquidation), LiquidateNow (consignment-based liquidation), and WeSolveReturns (return center solution).',
  },
  {
    id: 'pe-12',
    question: 'When was Via Trading founded and where?',
    options: [
      'New York, 1998',
      'Los Angeles, 2002',
      'Miami, 2005',
      'Dallas, 2010',
    ],
    correctIndex: 1,
    explanation:
      'Via Trading was founded in 2002 by a team of 4 in a 6,000 square foot warehouse in Los Angeles, California.',
  },
  {
    id: 'pe-13',
    question: 'What are Via Trading\'s three core values?',
    options: [
      'Speed, Innovation, and Growth',
      'Quality, Price, and Service',
      'Honesty, Integrity, and Transparency',
      'Efficiency, Technology, and Scale',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading\'s three core values are Honesty, Integrity, and Transparency. These guide every interaction with customers, vendors, and team members.',
  },
  {
    id: 'pe-14',
    question: 'How does LiquidateNow work?',
    options: [
      'Via Trading buys inventory and sells it on LiquidateNow',
      'Vendors list their inventory on a consignment basis and LiquidateNow leverages Via Trading\'s buyer network to sell it',
      'It is an auction platform for liquidation goods',
      'Consumers sell their used goods through it',
    ],
    correctIndex: 1,
    explanation:
      'LiquidateNow is consignment-based. Vendors list their merchandise and set pricing expectations. LiquidateNow markets the inventory to Via Trading\'s buyer network. When it sells, the vendor gets paid.',
  },
  {
    id: 'pe-15',
    question: 'What problem does WeSolveReturns solve?',
    options: [
      'It processes customer refunds for Via Trading',
      'It provides a return center solution for brands without their own returns infrastructure',
      'It ships returned products back to manufacturers',
      'It is a consumer complaint resolution service',
    ],
    correctIndex: 1,
    explanation:
      'WeSolveReturns acts as a return center for brands and companies that do not have their own returns infrastructure. It processes returns, recovers value, and feeds inventory into Via Trading\'s marketplace.',
  },
  {
    id: 'pe-16',
    question: 'How large is Via Trading\'s physical warehouse space?',
    options: [
      '50,000 sq ft',
      '150,000 sq ft',
      '250,000 sq ft (550,000+ with rack space)',
      '1,000,000 sq ft',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading operates from 250,000 square feet of physical warehouse space in Lynwood, California. Including rack space, the total exceeds 550,000 square feet.',
  },
  {
    id: 'pe-17',
    question: 'What does Via Trading\'s ESOP mean for employees?',
    options: [
      'Employees get free products',
      'Employees own a stake in the company through an Employee Stock Ownership Plan',
      'Employees can work remotely',
      'It is a retirement savings account',
    ],
    correctIndex: 1,
    explanation:
      'Via Trading\'s ESOP (Employee Stock Ownership Plan) gives team members ownership in the company. Combined with family ownership, it means every employee has a stake in Via Trading\'s success.',
  },
  {
    id: 'pe-18',
    question: 'How many customers has Via Trading served and across how many countries?',
    options: [
      '5,000+ customers, 30 countries',
      '15,000+ customers, 50 countries',
      '42,000+ customers, 129+ countries',
      '100,000+ customers, 200 countries',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading has served over 42,000 customers across 129+ countries, demonstrating global reach built over more than two decades.',
  },
  {
    id: 'pe-19',
    question: 'What does Via Trading\'s 90%+ repeat business rate indicate?',
    options: [
      'They have no competition',
      'Business owners trust the relationship, products, and service',
      'They require long-term contracts',
      'They are the cheapest option available',
    ],
    correctIndex: 1,
    explanation:
      'A 90%+ repeat business rate reflects deep customer trust. It is built on honesty, integrity, transparency, consistent product quality, and strong Account Manager relationships.',
  },
  {
    id: 'pe-20',
    question: 'Where is Via Trading expanding beyond its California headquarters?',
    options: [
      'New York City',
      'Dallas, Texas',
      'Tampa, Florida',
      'Chicago, Illinois',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading is expanding to Tampa, Florida, demonstrating continued investment in growth and the ability to serve more business owners across the country.',
  },

  // --- Course 3: Product Knowledge (5 questions) ---
  {
    id: 'pe-21',
    question: 'How many retail partner programs does Via Trading currently operate?',
    options: ['6', '12', '18', '24'],
    correctIndex: 2,
    explanation:
      'Via Trading operates 18 retail partner programs across 12+ retail partners, spanning categories from general merchandise and apparel to tools, furniture, and footwear.',
  },
  {
    id: 'pe-22',
    question: 'What is the difference between a manifested and an unmanifested load?',
    options: [
      'Manifested loads are bigger than unmanifested loads',
      'Manifested loads include an item-level inventory list; unmanifested loads are sold without detailed contents information',
      'Manifested loads are only available for export',
      'There is no real difference — the terms are interchangeable',
    ],
    correctIndex: 1,
    explanation:
      'Manifested loads come with a detailed item-level inventory list so the buyer knows exactly what is in the load before purchasing. Unmanifested loads are sold by category and condition without a detailed manifest.',
  },
  {
    id: 'pe-23',
    question: 'Which retail partner does Via Trading have the most programs with?',
    options: ['Amazon', 'Walmart', 'Target', 'Home Depot'],
    correctIndex: 2,
    explanation:
      'Target has four programs with Via Trading: TGT Salvage (general merchandise), TGT Apparel (New Overstock clothing), TGT Premium, and TGT Distribution Center — more than any other retail partner.',
  },
  {
    id: 'pe-24',
    question: 'What makes TGT Salvage loads notable in the industry?',
    options: [
      'They are the cheapest loads available',
      'They are considered one of the cleanest customer return loads in the industry, with a significant percentage of Shelf-Pull merchandise',
      'They only contain electronics',
      'They are exclusively available for export',
    ],
    correctIndex: 1,
    explanation:
      'TGT Salvage loads are known as one of the cleanest customer return loads in the industry. The majority of goods are retail-ready, and a significant percentage of Shelf-Pull merchandise is mixed in.',
  },
  {
    id: 'pe-25',
    question: 'How do LiquidateNow offerings complement Via Trading\'s direct programs?',
    options: [
      'They do not — LiquidateNow operates completely independently',
      'LiquidateNow replaces Via Trading\'s direct programs',
      'LiquidateNow offers consignment-based merchandise from vendors who list their own inventory, adding unique lots that fill gaps in Via\'s direct supply',
      'LiquidateNow only sells to international buyers',
    ],
    correctIndex: 2,
    explanation:
      'LiquidateNow offers consignment-based merchandise from vendors who list their inventory directly. This adds unique, vendor-controlled lots that complement Via Trading\'s direct retailer programs, giving buyers more options and variety.',
  },
]
