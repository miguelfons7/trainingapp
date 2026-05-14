import type { DealerLevel } from '../types'

export const forwardPath = [
  'Manufacturer',
  'Distributor',
  'Retailer',
  'Consumer',
]

export const reversePath = [
  'Consumer Returns',
  'Retailer',
  'Return Processing Center',
  'Liquidator',
  'Secondary Market Buyer',
  'End Consumer',
]

export const dealerLevels: DealerLevel[] = [
  {
    level: 1,
    title: 'Level 1: Bulk Buyers (Liquidators)',
    description:
      'Companies with direct contracts with major retailers. They purchase in massive volume (full truckloads, container loads) directly from the source. Level 1 dealers account for approximately 70% of all salvage goods entering the secondary market.',
    example: 'Via Trading operates at this level',
    highlight: true,
  },
  {
    level: 2,
    title: 'Level 2: Regional Wholesalers',
    description:
      'Businesses that buy from Level 1 dealers, break loads into smaller lots, and resell to smaller buyers. Some sorting and categorization happens at this stage. A markup is added to cover handling and freight.',
    example: 'Regional distributors and mid-size wholesalers',
  },
  {
    level: 3,
    title: 'Level 3: Local Resellers',
    description:
      'The discount store owners, flea market vendors, online sellers, and auction operators who buy from Level 1 or Level 2 dealers and sell directly to end consumers.',
    example: 'Store owners, eBay sellers, flea market vendors',
  },
  {
    level: 4,
    title: 'Level 4: End Consumers',
    description:
      'The shoppers who buy from Level 3 sellers at a discount from original retail.',
    example: 'Everyday bargain shoppers',
  },
]

export const keyInsight =
  'Via Trading is a Level 1 dealer. When you talk to buyers, you\'re offering them the opportunity to buy as close to the source as possible. That means lower costs, better selection, and fresher inventory compared to buying from a middleman.'
