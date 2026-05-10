import type { BuyerType } from '../types'

export const buyerTypesIntro =
  'Via Trading serves a diverse range of business buyers. Understanding these buyer types is essential because each has different needs, different experience levels, and different reasons for choosing a liquidation supplier.'

export const buyerTypes: BuyerType[] = [
  {
    id: 'online-sellers',
    name: 'Online Sellers',
    icon: 'Monitor',
    shortDescription: 'Sell through Amazon, eBay, Shopify, Poshmark, and other platforms',
    whatTheyCareAbout: [
      'Fast inventory turns and consistent supply',
      'Profitable margins and ease of listing (SKU data, manifests, UPC codes)',
      'Product condition and grading accuracy',
      'Manifested loads to evaluate items before purchasing',
    ],
    identifyingSignals: [
      'Mentions eBay, Amazon, or Shopify',
      'Asks about condition and grading',
      'Interested in fast shipping and turnover',
    ],
    searchTerms: ['online', 'amazon', 'ebay', 'shopify', 'poshmark', 'e-commerce', 'ecommerce'],
  },
  {
    id: 'discount-stores',
    name: 'Discount / Bargain Store Owners',
    icon: 'Store',
    shortDescription: 'Operate brick-and-mortar retail locations selling name-brand goods at steep discounts',
    whatTheyCareAbout: [
      'Variety and visual appeal to keep customers returning',
      'Quick access to fresh inventory',
      'Local pickup options when possible',
      'Knowing product condition upfront',
    ],
    identifyingSignals: [
      'Mentions store location or square footage',
      'Asks about "popular items"',
      'Concerned about display quality',
    ],
    searchTerms: ['store', 'retail', 'discount', 'bargain', 'brick and mortar', 'shop'],
  },
  {
    id: 'bin-stores',
    name: 'Bin Store Operators',
    icon: 'Archive',
    shortDescription: 'Run retail locations where items are sold at a flat price, often on a weekly markdown schedule',
    whatTheyCareAbout: [
      'High-volume assorted merchandise for "treasure hunt" experience',
      'Consistent replenishment on a schedule',
      'Product density and quantity per pallet',
      'Competitive pricing for thin margins',
    ],
    identifyingSignals: [
      'Mentions "bin store" or "discount model"',
      'Asks about product assortment',
      'Concerned about density or quantity per pallet',
    ],
    searchTerms: ['bin store', 'bin', 'flat price', 'markdown', 'treasure hunt'],
  },
  {
    id: 'flea-market',
    name: 'Flea Market / Swap Meet Sellers',
    icon: 'Tent',
    shortDescription: 'Operate booths or stands at markets with varied merchandise',
    whatTheyCareAbout: [
      'Affordable entry points and varied merchandise',
      'Products that sell quickly to foot traffic',
      'Ability to test different categories',
      'Local convenience and pickup options',
    ],
    identifyingSignals: [
      'Mentions flea market, swap meet, or booth',
      'Asks about smaller lot sizes',
      'Price-sensitive, testing multiple categories',
    ],
    searchTerms: ['flea market', 'swap meet', 'booth', 'vendor', 'stand'],
  },
  {
    id: 'exporters',
    name: 'Exporters',
    icon: 'Globe',
    shortDescription: 'Purchase in bulk and ship to international markets across Latin America, Asia, Africa, and beyond',
    whatTheyCareAbout: [
      'Volume and consistency for container filling',
      'Container-friendly packaging and palletization',
      'Competitive pricing at scale',
      'Shipping logistics and FOB options',
    ],
    identifyingSignals: [
      'Mentions international shipping or specific countries',
      'Asks about container loading',
      'Wants large, consistent loads',
    ],
    searchTerms: ['export', 'international', 'container', 'overseas', 'global', 'shipping'],
  },
  {
    id: 'wholesalers',
    name: 'Wholesalers / Brokers',
    icon: 'Warehouse',
    shortDescription: 'Buy large lots and resell in smaller quantities to their own buyer network',
    whatTheyCareAbout: [
      'Lowest possible acquisition cost to maintain margin after markup',
      'Large, consistent volume availability',
      'Product diversity for their downstream buyers',
      'Fast fulfillment and reliable logistics',
    ],
    identifyingSignals: [
      'Mentions reselling to other businesses',
      'Asks about bulk pricing and volume discounts',
      'Has warehouse or distribution capability',
    ],
    searchTerms: ['wholesaler', 'broker', 'resell', 'distribute', 'level 2', 'middleman'],
  },
  {
    id: 'auction-houses',
    name: 'Auction Houses',
    icon: 'Gavel',
    shortDescription: 'Run live or online auctions selling liquidation merchandise to consumers or businesses',
    whatTheyCareAbout: [
      'Diverse, interesting inventory that drives bidder engagement',
      'Products with recognizable brand names',
      'Variety within each lot for auction excitement',
      'Consistent supply to maintain auction schedule',
    ],
    identifyingSignals: [
      'Mentions auction platform or live events',
      'Asks about brand diversity in loads',
      'Interested in manifested lots',
    ],
    searchTerms: ['auction', 'bidding', 'live auction', 'online auction'],
  },
  {
    id: 'new-entrepreneurs',
    name: 'New / Just Getting Started',
    icon: 'Rocket',
    shortDescription: 'First-time buyers exploring the liquidation space as a business opportunity',
    whatTheyCareAbout: [
      'Education, guidance, and patience',
      'Proof that the business model works',
      'Reasonable minimums to test with low risk',
      'Responsive support when questions arise',
    ],
    identifyingSignals: [
      'New business with limited history',
      'Asking basic process questions',
      'Testing multiple suppliers',
      'Budget-conscious and cautious',
    ],
    searchTerms: ['new', 'starting', 'beginner', 'first time', 'entrepreneur', 'getting started'],
  },
]
