import type { ProductCondition } from '../types'

export const conditionsIntro =
  'Not all liquidation inventory is the same. At Via Trading, we categorize merchandise into several condition types. Each condition affects pricing, what you can expect to receive, and how much work might be involved in reselling. These are Via Trading\'s official condition categories. Other companies in the industry may use different names or groupings, but these are the terms we use internally and with our customers.'

export const productConditions: ProductCondition[] = [
  {
    id: 'customer-returns',
    name: 'Customer Returns',
    definition:
      'Goods that were purchased by consumers and then returned to the retailer for any reason. Returns happen for all sorts of reasons: buyer\'s remorse, wrong size or color, cosmetic preferences, defects, or even one-time use for an event.',
    whatToExpect:
      'Every load is different. You can expect the good, the bad, and the ugly. Some items may still be sealed in original packaging, essentially brand new. Others might be missing boxes from a set, slightly used, or occasionally non-functional. Certain retailer programs have a reputation for "cleaner" loads than others, but there are no guarantees. Customer return loads more commonly come unmanifested, meaning there is high uncertainty about exactly what you will receive. Manifested versions exist but tend to be priced higher.',
    buyerAppeal:
      'Customer returns are typically more available and more affordable than other conditions. Despite the uncertainty, they have been a cornerstone of Via Trading\'s business for over two decades. Many experienced buyers build their entire operation around returns because of the lower acquisition cost and the volume available.',
    colorClass: 'amber',
    emphasized: false,
    searchTerms: ['returns', 'returned', 'buyer remorse', 'wrong size', 'defective', 'refund'],
  },
  {
    id: 'new-overstock',
    name: 'New Overstock',
    definition:
      'Merchandise that never reached the sales floor or was never purchased by a consumer. These are excess goods from retailers, distributors, or manufacturers that need to be cleared due to discontinuation, seasonal changes, packaging updates, over-ordering, or simply slow sales.',
    whatToExpect:
      'Items are typically in original retail packaging and in excellent condition since no consumer ever handled them. That said, even new overstock can occasionally have damaged boxes or cosmetic wear from storage and transportation. Expect deep SKU counts (many units of the same item). These lots tend to be retail-ready, meaning you have a better understanding of exactly what you are getting.',
    buyerAppeal:
      'The upside is low risk and consistency. The tradeoff is that new overstock is generally more expensive than returns, and it can be harder to find the same product repeatedly. Sometimes items did not sell for a reason, whether it is a less popular color, style, or brand.',
    colorClass: 'emerald',
    emphasized: false,
    searchTerms: ['overstock', 'closeout', 'new', 'excess', 'discontinued', 'sealed', 'original packaging'],
  },
  {
    id: 'shelf-pulls',
    name: 'Shelf Pulls',
    definition:
      'Goods that were physically displayed on a retailer\'s sales floor but remained unsold and were pulled from the shelves. Also known as MOS (Merchandise On Sale). These items could be pulled for any number of reasons: they are out of season, discontinued, slow-moving, or the retailer is making room for new stock.',
    whatToExpect:
      'Items are always in original retail packaging and may have additional clearance or markdown tags. The condition is generally very clean, though some dents or scratches from normal in-store handling should be expected. Shelf pulls tend to skew towards seasonal items, since seasonal merchandise is one of the most common reasons products get pulled from the floor.',
    buyerAppeal:
      'A good middle ground. Cleaner than customer returns but typically less expensive than new overstock. Solid margin potential with relatively low sorting effort.',
    colorClass: 'sky',
    emphasized: false,
    searchTerms: ['shelf pulls', 'MOS', 'merchandise on sale', 'pulled', 'clearance', 'display'],
  },
  {
    id: 'master-case',
    name: 'Master Case',
    definition:
      'Factory-sealed cases of merchandise still in the original manufacturer packaging. These items never left the "brown box" they were shipped in from the manufacturer, which is why they are sometimes referred to as "brown box" goods in the industry.',
    whatToExpect:
      'Products arrive in the same condition as when they left the manufacturer. Sealed, organized, and consistent quality. These lots are often fully manifested (though not always), feature deep SKU counts, and items are brand new. You can expect items that require assembly to sometimes be included. Even with master cases, there is still some possibility of damaged boxes or cosmetic issues depending on how goods were stored and transported.',
    buyerAppeal:
      'Highest consistency and quality assurance. Easy to inventory and resell. Premium pricing reflects the condition, but buyers get the most predictable product.',
    colorClass: 'teal',
    emphasized: false,
    searchTerms: ['master case', 'factory sealed', 'manufacturer packaging', 'bulk', 'case pack', 'brown box'],
  },
  {
    id: 'as-is',
    name: 'As-Is',
    definition:
      'Products sold in their current condition without any warranty or guarantee. The buyer accepts the product in whatever state it is in at the time of purchase.',
    whatToExpect:
      'Condition varies widely. Items are not inspected or graded individually. What you see is what you get, and there may be little documentation about the history of the goods.',
    buyerAppeal:
      'Often priced attractively due to the uncertainty factor. Best suited for experienced buyers who are comfortable with risk assessment and have the ability to sort and test merchandise themselves.',
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
      'Products have known issues such as cosmetic damage, missing parts, or functional problems. They are clearly marked as defective so there is no ambiguity about what you are purchasing.',
    buyerAppeal:
      'Lowest acquisition cost. Best for buyers with repair capabilities or those who sell replacement parts. Not recommended for buyers looking for retail-ready merchandise.',
    colorClass: 'red',
    emphasized: false,
    searchTerms: ['defective', 'damaged', 'broken', 'non-functional'],
  },
  {
    id: 'irregulars',
    name: 'Irregulars',
    definition:
      'Products with minor cosmetic or manufacturing variations that do not meet the retailer\'s standard specifications but are otherwise fully functional.',
    whatToExpect:
      'Items may have slight color differences, sizing inconsistencies, or minor cosmetic flaws. They are often still in original packaging and work exactly as intended.',
    buyerAppeal:
      'Fully functional products at a discount. The imperfections are often unnoticeable to end consumers, making these a good option for resellers who want working merchandise at a lower cost.',
    colorClass: 'orange',
    emphasized: false,
    searchTerms: ['irregulars', 'irregular', 'cosmetic', 'manufacturing variation', 'imperfect'],
  },
  {
    id: 'refurbished',
    name: 'Refurbished',
    definition:
      'Items that have been inspected, repaired if needed, and verified to meet quality standards before being resold.',
    whatToExpect:
      'Products have been professionally restored. They function like new but may show minor signs of previous use. They often come with a limited warranty from the refurbisher.',
    buyerAppeal:
      'Near-new functionality at a significant discount. Particularly strong for electronics and appliances where professional refurbishment adds substantial value and buyer confidence.',
    colorClass: 'purple',
    emphasized: false,
    searchTerms: ['refurbished', 'restored', 'reconditioned', 'renewed', 'certified'],
  },
]
