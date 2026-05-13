import type { TermMatchPair, FillInBlankItem } from '../../../types'

/**
 * Small inline exercises sprinkled into each module — max 4 items each.
 * These appear at the bottom of the module content section to reinforce learning.
 */

// After "The Secondary Market" module
export const secondaryMarketTermMatch: TermMatchPair[] = [
  {
    term: 'Secondary Market',
    definition: 'Ecosystem where unsold, returned, and excess products are resold at a discount',
  },
  {
    term: 'Liquidation',
    definition: 'Bulk resale of unsold or returned merchandise from retailers',
  },
  {
    term: 'Overstock',
    definition: 'Excess unsold retail merchandise still in original condition',
  },
  {
    term: 'Bin Store',
    definition: 'Retail format selling items at flat prices from large bins',
  },
]

// After "Reverse Logistics" module
export const reverseLogisticsFillBlanks: FillInBlankItem[] = [
  {
    id: 'rl-fib-1',
    sentence: 'The process of moving goods backward through the supply chain is called _____.',
    blank: 'reverse logistics',
    options: ['forward shipping', 'reverse logistics', 'backhaul delivery', 'direct sourcing'],
    correctIndex: 1,
  },
  {
    id: 'rl-fib-2',
    sentence: 'A _____ dealer has direct contracts with major retailers like Walmart and Target.',
    blank: 'Level 1',
    options: ['Level 1', 'Level 2', 'Level 3', 'Regional'],
    correctIndex: 0,
  },
  {
    id: 'rl-fib-3',
    sentence: 'Level 1 dealers handle approximately _____% of all salvage goods entering the secondary market.',
    blank: '70',
    options: ['30', '50', '70', '90'],
    correctIndex: 2,
  },
  {
    id: 'rl-fib-4',
    sentence: 'Via Trading is a _____ dealer, sourcing directly from Fortune 100 retailers.',
    blank: 'Level 1',
    options: ['Level 1', 'Level 2', 'Level 3', 'Independent'],
    correctIndex: 0,
  },
]

// After "Product Conditions" module
export const conditionsTermMatch: TermMatchPair[] = [
  {
    term: 'New Overstock',
    definition: 'Unsold retail merchandise — never purchased by a consumer',
  },
  {
    term: 'Customer Returns',
    definition: 'Goods purchased by consumers and sent back to the retailer',
  },
  {
    term: 'Shelf Pulls',
    definition: 'Items removed from sales floors that remained unsold, in original packaging',
  },
  {
    term: 'Salvage',
    definition: 'Merchandise found to be significantly compromised — broken or missing parts',
  },
]

// After "Load Types" module
export const loadTypesFillBlanks: FillInBlankItem[] = [
  {
    id: 'lt-fib-1',
    sentence: 'A standard pallet base measures _____ inches by 48 inches.',
    blank: '48',
    options: ['36', '42', '48', '60'],
    correctIndex: 2,
  },
  {
    id: 'lt-fib-2',
    sentence: 'LTL stands for _____.',
    blank: 'Less Than Truckload',
    options: ['Less Than Truckload', 'Large Trailer Load', 'Local Transport Line', 'Liquidation Transfer Lot'],
    correctIndex: 0,
  },
  {
    id: 'lt-fib-3',
    sentence: 'A _____ is a large corrugated cardboard box placed on a pallet, common for unsorted returns.',
    blank: 'Gaylord',
    options: ['Pallet jack', 'Gaylord', 'Watermelon bin', 'Case pack'],
    correctIndex: 1,
  },
  {
    id: 'lt-fib-4',
    sentence: 'A 53-foot trailer can carry _____ pallets depending on how inventory is condensed.',
    blank: '12 to 24-30',
    options: ['6 to 8', '12 to 24-30', '50 to 60', '4 to 6'],
    correctIndex: 1,
  },
]

// After "Buyer Types" module
export const buyerTypesTermMatch: TermMatchPair[] = [
  {
    term: 'Bin Store Operator',
    definition: 'Runs retail locations selling items at flat prices on a weekly markdown schedule',
  },
  {
    term: 'Exporter',
    definition: 'Purchases in bulk and ships to international markets',
  },
  {
    term: 'Online Seller',
    definition: 'Sells through platforms like Amazon, eBay, Whatnot, and Facebook Marketplace',
  },
  {
    term: 'Wholesaler / Broker',
    definition: 'Buys large lots and resells in smaller quantities to their own buyer network',
  },
]
