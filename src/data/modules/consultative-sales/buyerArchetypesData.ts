/**
 * Sales-focused buyer archetypes for Course 4: Consultative Sales
 * Distinct from Course 1's buyerTypesData.ts — this version adds
 * sales signals, tailored follow-ups, and AM routing notes.
 */

export interface SalesArchetype {
  id: string
  name: string
  icon: string
  whoTheyAre: string
  careAbout: string[]
  signals: string[]
  tailoredFollowUps: string[]
  amNote: string
}

export const salesArchetypes: SalesArchetype[] = [
  {
    id: 'online-seller',
    name: 'Online Sellers',
    icon: 'ShoppingCart',
    whoTheyAre: 'Resellers on Amazon, eBay, Shopify, Whatnot, Poshmark, or their own website. They list individual items or small lots, rely on fast turns and consistent margins, and need detailed product data (SKU, UPC, brand) to create listings.',
    careAbout: [
      'Fast inventory turns',
      'Consistent supply',
      'Margin per item',
      'Easy categorization (SKU, UPC, brand data)',
    ],
    signals: [
      '"I sell on Amazon/eBay"',
      'Asks about manifests and item-level data',
      'Interested in specific categories, not everything',
      'Mentions listing speed or turn rate',
    ],
    tailoredFollowUps: [
      '"What categories move best for you online?"',
      '"How fast do you typically turn inventory?"',
      '"Are you looking for specific brands or general merchandise?"',
      '"Do you prefer manifested loads so you can pre-list?"',
    ],
    amNote: 'May prefer smaller, more frequent buys. Manifests are important. Ask about mixed loads vs. single-category preferences.',
  },
  {
    id: 'discount-store',
    name: 'Discount / Bargain Store Owners',
    icon: 'Store',
    whoTheyAre: 'Operators of brick-and-mortar discount stores, consignment shops, or bargain outlets. They want variety to keep shelves interesting, prioritize visual appeal, and often prefer to inspect merchandise before buying.',
    careAbout: [
      'Product variety and visual appeal',
      'Local pickup availability',
      'Condition transparency upfront',
      'High-margin, consumer-friendly inventory',
    ],
    signals: [
      '"I have a store in…"',
      'Asks about warehouse visits',
      'Interested in condition details',
      'Mentions foot traffic or store layout',
    ],
    tailoredFollowUps: [
      '"How many locations do you have?"',
      '"What categories work best for your customer base?"',
      '"Do you prefer pickup or delivery?"',
      '"Would you like to visit the warehouse and see merchandise in person?"',
    ],
    amNote: 'Warehouse visits are high-value for this buyer type. Relationship-driven — they want to inspect before buying and build trust over time.',
  },
  {
    id: 'bin-store',
    name: 'Bin Store Operators',
    icon: 'Archive',
    whoTheyAre: 'Retailers who operate stores where shoppers dig through bins of discounted merchandise on a weekly markdown schedule. Fast-growing segment that needs high-volume, varied general merchandise.',
    careAbout: [
      'Volume and variety in every load',
      'Consistent weekly or bi-weekly supply',
      'Affordable per-unit cost',
      'Easy processing — no complex sorting required',
    ],
    signals: [
      '"I run a bin store"',
      'Asks about GM truckloads',
      'Mentions weekly restock cycles',
      'Focused on volume over specific brands',
    ],
    tailoredFollowUps: [
      '"Do you have a permanent location or are you still setting up?"',
      '"Are you doing truckloads or pallets right now?"',
      '"What\'s your typical restock cycle?"',
      '"Have you visited our warehouse?"',
    ],
    amNote: 'Warehouse visits are extremely valuable. May start with pallets before scaling to truckloads. Higher price sensitivity but strong volume potential.',
  },
  {
    id: 'flea-market',
    name: 'Flea Market / Swap Meet Sellers',
    icon: 'Tent',
    whoTheyAre: 'Vendors at flea markets, swap meets, and weekend markets. They need affordable, varied inventory they can display and sell directly to consumers. Often cash-focused with smaller initial budgets.',
    careAbout: [
      'Affordable entry point',
      'Product variety for display',
      'Fast access to inventory',
      'Local convenience',
    ],
    signals: [
      '"I sell at the swap meet"',
      'Asks about case packs or small lots',
      'Mentions specific markets by name',
      'Budget-conscious language',
    ],
    tailoredFollowUps: [
      '"Do you have a permanent spot or rotate between markets?"',
      '"What categories sell best at your market?"',
      '"Are you looking to start small or go bigger?"',
    ],
    amNote: 'Great candidates for warehouse visits. Often start with cases or pallets. May scale to larger volumes over time. Loyalty is high when trust is built.',
  },
  {
    id: 'exporter',
    name: 'Exporters',
    icon: 'Globe',
    whoTheyAre: 'Buyers who purchase in large volumes and ship container loads to international markets — Latin America, Africa, the Middle East, Southeast Asia, and beyond. They need scale, consistency, and container-friendly logistics.',
    careAbout: [
      'Volume and consistency',
      'Container-friendly packaging and loading',
      'Competitive pricing at scale',
      'Reliable shipping timeline to port',
    ],
    signals: [
      '"I export to…"',
      'Asks about truckload+ quantities',
      'Mentions containers, ports, or freight',
      'Interested in FOB pricing',
    ],
    tailoredFollowUps: [
      '"Which countries or regions do you serve?"',
      '"Are you usually looking at full truckloads or larger?"',
      '"Do you arrange your own freight or need help with logistics?"',
    ],
    amNote: 'May need truckload minimums or multi-truckload commitments. Discuss FOB options and ports. Shipping cost is a critical factor in their total landed cost.',
  },
  {
    id: 'wholesaler',
    name: 'Wholesalers / Brokers',
    icon: 'Building2',
    whoTheyAre: 'Middlemen who buy in bulk from Via Trading and resell to their own network of retailers, online sellers, or smaller wholesalers. They care about per-unit economics and reliable supply they can mark up.',
    careAbout: [
      'Per-unit cost and markup potential',
      'Reliable, recurring supply',
      'Load consistency and predictability',
      'Speed of delivery',
    ],
    signals: [
      '"I resell to other businesses"',
      'Asks about volume pricing',
      'Mentions their own buyer network',
      'Focused on consistency over specific brands',
    ],
    tailoredFollowUps: [
      '"What does your buyer network look like — size and geography?"',
      '"What categories do your buyers ask for most?"',
      '"Are you looking for recurring programs or deal-by-deal?"',
    ],
    amNote: 'Can become high-volume recurring buyers. Focus on economics and reliability. They\'re evaluating whether your pricing allows them a viable margin for their own business.',
  },
  {
    id: 'auction-house',
    name: 'Auction Houses',
    icon: 'Gavel',
    whoTheyAre: 'Operators of live or online auction platforms who buy inventory to sell to the highest bidder. They need variety, visual interest, and a steady flow of interesting lots to keep bidders engaged.',
    careAbout: [
      'Visual interest and brand recognition',
      'Variety to keep auctions fresh',
      'Consistent new inventory flow',
      'Reasonable cost basis for profitable auctions',
    ],
    signals: [
      '"I run auctions on…"',
      'Asks about variety and mix',
      'Mentions online platforms like Whatnot',
      'Interested in unmanifested or surprise lots',
    ],
    tailoredFollowUps: [
      '"Is your auction live, online, or both?"',
      '"How often do you run events?"',
      '"What categories generate the most bidding excitement?"',
    ],
    amNote: 'Value variety and surprise factor. Unmanifested loads can work well for auction formats. Consistent supply schedule keeps their calendar full.',
  },
  {
    id: 'brand-new',
    name: 'Brand New / Just Starting',
    icon: 'Sparkles',
    whoTheyAre: 'First-time entrepreneurs exploring the liquidation business. They need education, reassurance, and a gentle entry point. These are future loyal customers — the extra time invested now pays dividends later.',
    careAbout: [
      'Education and understanding',
      'Proof that the business model works',
      'Reasonable entry point (no huge minimums)',
      'Responsive, patient support',
    ],
    signals: [
      '"I\'m just getting started"',
      '"How does this work?"',
      'Asks basic questions about conditions or pricing',
      'Unsure about business model or sales channel',
    ],
    tailoredFollowUps: [
      '"Are you thinking online, in-person, or both?"',
      '"Do you have capital for larger volumes, or would you prefer to start smaller?"',
      '"What drew you to the liquidation space?"',
    ],
    amNote: 'Future loyal customers. Assign to an experienced, patient AM. Warehouse visits are extremely valuable for building confidence. Extra attention now builds a long-term relationship.',
  },
]
