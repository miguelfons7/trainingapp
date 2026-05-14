import type { SalesChannel } from '../types'

export const marketStats = {
  annualValue: '$300B+',
  returnRate: '8-10%',
  description:
    'The secondary market is where unsold, returned, and excess consumer products are discounted and resold. It is one of the largest and least understood segments of the retail economy.',
  whyItExists:
    'Retailers cannot economically inspect, repackage, and reshelve every returned item. They turn to liquidators who purchase this merchandise in bulk and make it available to business owners.',
  whyItMatters:
    'Understanding the liquidation industry is foundational to working at Via Trading, regardless of your role. Whether you\'re working with buyers, vendors, drivers, or internal teams, knowing how this industry works helps you communicate effectively and make better decisions.',
}

export const salesChannels: SalesChannel[] = [
  {
    id: 'online-marketplaces',
    name: 'Online Marketplaces',
    description:
      'Sellers use platforms like Amazon, eBay, Shopify, Poshmark, Whatnot, Facebook Marketplace, WhatsApp, and their own proprietary websites to list and sell individual items or small lots. This is one of the fastest-growing segments, as it allows sellers to reach customers worldwide from anywhere with an internet connection.',
    icon: 'ShoppingCart',
  },
  {
    id: 'discount-stores',
    name: 'Discount & Bargain Stores',
    description:
      'Brick-and-mortar retail shops that sell name-brand goods at steep discounts. These range from small independent storefronts to regional chains. They rely on a steady flow of diverse merchandise to keep customers coming back.',
    icon: 'Store',
  },
  {
    id: 'flea-markets',
    name: 'Flea Markets & Swap Meets',
    description:
      'Open-air or indoor vendor markets where individual sellers rent booth space to sell merchandise directly to consumers. In the US, these are commonly known as flea markets or swap meets. This category also includes yard sales and garage sales, where individuals sell goods from their homes. These markets exist in various forms worldwide and are driven by high foot traffic and bargain-seeking shoppers.',
    icon: 'Tent',
  },
  {
    id: 'bin-stores',
    name: 'Bin Stores',
    description:
      'A retail format that has grown rapidly in recent years where merchandise is displayed in large open bins. Customers dig through the bins to find items, often sold at a flat price that decreases throughout the week (for example, $7 on Saturday, $5 on Monday, $1 on Thursday). The name comes from the large bins used to display merchandise. The "treasure hunt" experience has made this model increasingly popular across the US.',
    icon: 'Archive',
  },
  {
    id: 'auction-houses',
    name: 'Auction Houses',
    description:
      'Auction houses sell liquidation merchandise through competitive bidding, both in-person and online. They range from local auction companies handling small lots to large platforms that move millions of dollars in merchandise each month. This channel is popular with experienced buyers who know how to evaluate lots quickly and bid strategically.',
    icon: 'Gavel',
  },
  {
    id: 'value-retailers',
    name: 'Value Retailers',
    description:
      'Large retail chains like TJMaxx, Marshalls, Burlington, and Big Lots that purchase liquidation and closeout merchandise at scale to offer brand-name products at discounted prices in their stores.',
    icon: 'Building2',
  },
  {
    id: 'dollar-stores',
    name: 'Dollar Stores',
    description:
      'Chains like Dollar General, Family Dollar, Dollar Tree, and the traditional 99¢ Only Stores that source deeply discounted merchandise. These stores thrive on high volume, low price-point inventory.',
    icon: 'CircleDollarSign',
  },
  {
    id: 'exporters',
    name: 'Exporters',
    description:
      'Businesses that purchase liquidation merchandise in bulk and ship it to international markets, particularly in Latin America, Africa, the Middle East, and Southeast Asia. Demand for American brand-name goods is strong in many of these regions, and exporters can often achieve higher margins abroad than domestic resellers can locally.',
    icon: 'Globe',
  },
  {
    id: 'wholesalers',
    name: 'Wholesalers & Brokers',
    description:
      'These are two distinct roles. Wholesalers purchase and take ownership of large lots, then break them down into smaller quantities to resell to their own buyer network, typically operating on thin margins. Brokers, on the other hand, do not own the product. They connect buyers and sellers, often never physically handling the merchandise, and earn a commission or fee on each transaction.',
    icon: 'Warehouse',
  },
]
