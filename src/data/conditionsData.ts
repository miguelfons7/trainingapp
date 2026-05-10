import type { ProductCondition } from '../types'

export const conditionsIntro =
  'Not all liquidation inventory is the same. Product condition determines pricing, buyer expectations, and the amount of work involved in reselling. You need to know these categories fluently.'

export const productConditions: ProductCondition[] = [
  {
    id: 'new-overstock',
    name: 'New Overstock',
    definition:
      'Overstock merchandise still in original condition. Goods displayed for sale in a retail environment but remained unsold due to discontinuation, seasonal changes, packaging updates, or over-ordering.',
    whatToExpect:
      'Items are typically in original retail packaging. Condition is generally excellent since these products were never purchased by a consumer. Some may have minor shelf wear from being displayed.',
    buyerAppeal:
      'High quality, low risk, easy to resell. The tradeoff is higher cost compared to returns, and sometimes items didn\'t sell for a reason — less popular colors, styles, or brands.',
    colorClass: 'emerald',
    emphasized: true,
    searchTerms: ['overstock', 'closeout', 'new', 'excess', 'discontinued', 'sealed', 'original packaging'],
  },
  {
    id: 'customer-returns',
    name: 'Customer Returns',
    definition:
      'Goods returned to retailers by customers for various reasons — buyer\'s remorse, wrong size or color, cosmetic issues, defects, or one-time use.',
    whatToExpect:
      'Condition ranges from brand new (still sealed) to non-functional. Open or damaged packaging is common. Industry estimates suggest 10-25% of items in a standard returns lot may be non-working or compromised.',
    buyerAppeal:
      'Returns can be sourced for significantly less than overstocks, and the goods were originally purchased because consumers wanted them. Active buyers report similar profit margins (20-25%) though returns require more sorting and processing work.',
    colorClass: 'amber',
    emphasized: true,
    searchTerms: ['returns', 'returned', 'buyer remorse', 'wrong size', 'defective', 'refund'],
  },
  {
    id: 'shelf-pulls',
    name: 'Shelf Pulls',
    definition:
      'Goods physically on the retail sales floor but remained unsold and were pulled from shelves. Also known as MOS (Merchandise On Sale).',
    whatToExpect:
      'Always in original retail packaging. May have additional clearance tags. Could show minor blemishes, scratches, or signs of in-store handling. Damage rate is lower than customer returns.',
    buyerAppeal:
      'Strong for buyers who want near-new condition without paying full overstock prices. Good margin potential with relatively low sorting effort.',
    colorClass: 'sky',
    emphasized: true,
    searchTerms: ['shelf pulls', 'MOS', 'merchandise on sale', 'pulled', 'clearance', 'display'],
  },
  {
    id: 'as-is',
    name: 'As-Is',
    definition:
      'Products sold in their current condition without warranty. The buyer accepts the product in whatever state it is in.',
    whatToExpect:
      'Condition varies widely. Items are not inspected or graded individually. What you see is what you get.',
    buyerAppeal:
      'Often priced attractively due to the uncertainty factor. Suitable for experienced buyers comfortable with risk assessment.',
    colorClass: 'slate',
    emphasized: false,
    searchTerms: ['as is', 'as-is', 'no warranty', 'current condition'],
  },
  {
    id: 'defective',
    name: 'Defective',
    definition:
      'Items with identified defects or damage that prevent normal use or sale at full value.',
    whatToExpect:
      'Products have known issues — cosmetic damage, missing parts, or functional problems. Clearly marked as defective.',
    buyerAppeal:
      'Lowest acquisition cost. Best for buyers with repair capabilities or those who sell parts.',
    colorClass: 'red',
    emphasized: false,
    searchTerms: ['defective', 'damaged', 'broken', 'non-functional'],
  },
  {
    id: 'irregulars',
    name: 'Irregulars',
    definition:
      'Products with minor cosmetic or manufacturing variations that don\'t meet the retailer\'s standard specifications.',
    whatToExpect:
      'Items are functional but may have slight color differences, sizing inconsistencies, or minor cosmetic flaws. Often still in original packaging.',
    buyerAppeal:
      'Fully functional products at a discount. Minor imperfections are often unnoticeable to end consumers.',
    colorClass: 'orange',
    emphasized: false,
    searchTerms: ['irregulars', 'irregular', 'cosmetic', 'manufacturing variation', 'imperfect'],
  },
  {
    id: 'master-case',
    name: 'Master Case',
    definition:
      'Bulk items in original manufacturer packaging. These are factory-sealed cases that have never been opened at the retail level.',
    whatToExpect:
      'Products arrive in the same condition as they left the manufacturer. Sealed, organized, and consistent quality.',
    buyerAppeal:
      'Highest consistency and quality assurance. Easy to inventory and resell. Premium pricing reflects the condition.',
    colorClass: 'teal',
    emphasized: false,
    searchTerms: ['master case', 'factory sealed', 'manufacturer packaging', 'bulk', 'case pack'],
  },
  {
    id: 'refurbished',
    name: 'Refurbished',
    definition:
      'Restored items that have been inspected, repaired if needed, and verified to meet quality standards.',
    whatToExpect:
      'Products have been professionally restored. They function like new but may show minor signs of previous use. Often come with limited warranty.',
    buyerAppeal:
      'Near-new functionality at a significant discount. Good for electronics and appliances where refurbishment adds substantial value.',
    colorClass: 'purple',
    emphasized: false,
    searchTerms: ['refurbished', 'restored', 'reconditioned', 'renewed', 'certified'],
  },
]
