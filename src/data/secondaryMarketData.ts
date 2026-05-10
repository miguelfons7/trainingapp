import type { SalesChannel } from '../types'

export const marketStats = {
  annualValue: '$300B+',
  returnRate: '8-10%',
  description:
    'The secondary market is where unsold, returned, and excess consumer products are discounted and resold. It is one of the largest and least understood segments of the retail economy.',
  whyItExists:
    'Retailers cannot economically inspect, repackage, and reshelve every returned item. They turn to liquidators who purchase this merchandise in bulk and make it available to business buyers.',
  whyItMatters:
    'Understanding the secondary market directly affects how you talk to buyers. Some prospects are experienced liquidation veterans. Others are brand new. Knowing this industry lets you meet them where they are.',
}

export const salesChannels: SalesChannel[] = [
  {
    id: 'online-marketplaces',
    name: 'Online Marketplaces',
    description:
      'eBay, Amazon, Facebook Marketplace, Poshmark, OfferUp, and independent e-commerce stores',
    icon: 'ShoppingCart',
  },
  {
    id: 'discount-stores',
    name: 'Discount & Bargain Stores',
    description:
      'Brick-and-mortar shops that sell name-brand goods at steep discounts',
    icon: 'Store',
  },
  {
    id: 'flea-markets',
    name: 'Flea Markets & Swap Meets',
    description:
      'Vendor-driven markets with high foot traffic and bargain-seeking consumers',
    icon: 'Tent',
  },
  {
    id: 'bin-stores',
    name: 'Bin Stores',
    description:
      'Retail locations where all items are sold at a flat price, often restocked weekly',
    icon: 'Archive',
  },
  {
    id: 'auction-houses',
    name: 'Auction Houses',
    description:
      'Both consumer and wholesale auctions, live and online',
    icon: 'Gavel',
  },
  {
    id: 'value-retailers',
    name: 'Value Retailers',
    description:
      'Large chains like TJMaxx, Marshalls, and Big Lots that buy liquidation at scale',
    icon: 'Building2',
  },
  {
    id: 'dollar-stores',
    name: 'Dollar Stores',
    description:
      'Chains like Dollar General, Family Dollar, and Dollar Tree',
    icon: 'CircleDollarSign',
  },
  {
    id: 'exporters',
    name: 'Exporters',
    description:
      'Businesses that purchase in bulk and ship to international markets where demand and margins are strong',
    icon: 'Globe',
  },
  {
    id: 'wholesalers',
    name: 'Wholesalers & Brokers',
    description:
      'Intermediaries who buy large lots, break them down, and resell to smaller buyers',
    icon: 'Warehouse',
  },
]
