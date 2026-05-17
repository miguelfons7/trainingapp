/**
 * Product Knowledge: Via Trading's retail partner programs and official taxonomy.
 * Source: internal program questionnaires + official product taxonomy.
 *
 * IMPORTANT: Do not hard-code program counts — programs change frequently.
 * Do not assume the audience is an Account Manager — this content is for all roles.
 */

export interface RetailProgram {
  id: string
  sku: string
  name: string
  retailPartner: string
  category: string
  type: 'Manifested' | 'Unmanifested' | 'Mixed'
  condition: string
  pricingModel: string
  priceRange: string
  fob: string
  products: string
  brands: string
  keyFeatures: string[]
  status: 'active' | 'partial'
}

/** Via Trading's official product taxonomy — 17 categories */
export const productCategories = [
  { id: 'mixed-lots', name: 'Mixed Lots', icon: 'Layers' },
  { id: 'automotive', name: 'Automotive', icon: 'Car' },
  { id: 'baby', name: 'Baby', icon: 'Baby' },
  { id: 'electronics', name: 'Electronics', icon: 'Monitor' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt' },
  { id: 'furniture', name: 'Furniture', icon: 'Sofa' },
  { id: 'health-beauty', name: 'Health and Beauty', icon: 'Heart' },
  { id: 'home-appliances', name: 'Home Appliances', icon: 'Plug' },
  { id: 'home-essentials', name: 'Home Essentials', icon: 'Home' },
  { id: 'miscellaneous', name: 'Miscellaneous', icon: 'Box' },
  { id: 'outdoors', name: 'Outdoors', icon: 'TreePine' },
  { id: 'pet-supplies', name: 'Pet Supplies', icon: 'Dog' },
  { id: 'seasonal', name: 'Seasonal', icon: 'Sun' },
  { id: 'sports-fitness', name: 'Sports and Fitness', icon: 'Dumbbell' },
  { id: 'supermarket', name: 'Supermarket', icon: 'ShoppingCart' },
  { id: 'tools-hardware', name: 'Tools and Hardware', icon: 'Wrench' },
  { id: 'toys-kids', name: 'Toys and Kids', icon: 'Gamepad2' },
]

/**
 * Parent SKU codes.
 * Via Trading cannot publicly advertise which retailers it works with,
 * so all programs use a "Parent SKU" name instead of the retailer name.
 */
export const skuNaming = [
  { retailer: 'Target', skus: ['TGT', 'ARW'] },
  { retailer: 'Walmart', skus: ['WM', 'WMAPP', 'WMCOM'] },
  { retailer: 'Home Depot', skus: ['HD', 'TRB', 'VHD'] },
  { retailer: 'Amazon', skus: ['AMZ'] },
  { retailer: 'Lowes', skus: ['LWS'] },
  { retailer: 'Zappos', skus: ['ZAP'] },
  { retailer: "Sam's Club", skus: ['SMS'] },
  { retailer: 'Wayfair', skus: ['WYF'] },
]

/** Known retail programs — this list is representative, not exhaustive */
export const retailPrograms: RetailProgram[] = [
  // === TARGET PROGRAMS ===
  {
    id: 'tgt-salvage',
    sku: 'LOAD-TGT',
    name: 'TGT Salvage',
    retailPartner: 'Target',
    category: 'General Merchandise',
    type: 'Unmanifested',
    condition: 'Customer Returns + Shelf-Pull mix',
    pricingModel: 'Tiered by load quality',
    priceRange: '$10,990 – $23,990',
    fob: 'Los Angeles, CA',
    products: 'Toys, Housewares, Home Décor, Bath, Baby, Outdoor, Furniture, Sporting Goods, Pet Supplies, Clothing, Accessories, Holiday, Footwear, Bedding, Personal Care, HBA/Cosmetics, Electronics',
    brands: 'Barbie, Disney, Fisher-Price, Hot Wheels, Lego, Little Tikes, Nerf, Samsung, Sony, KitchenAid, Keurig, Bissell, Hoover',
    keyFeatures: [
      'One of the cleanest customer return loads in the industry',
      'Majority retail-ready goods',
      'Significant percentage of Shelf-Pull merchandise mixed in',
      'Multiple pricing tiers available (e.g., Value, Prime, Max, Ocean Container)',
      'Can be floor-loaded in ocean containers for export',
      'Viewable at warehouse',
    ],
    status: 'active',
  },
  {
    id: 'tgt-dc',
    sku: 'LOAD-TGTDC',
    name: 'TGT DC (Distribution Center)',
    retailPartner: 'Target',
    category: 'General Merchandise',
    type: 'Unmanifested',
    condition: 'Mixed (Customer Returns + New items)',
    pricingModel: 'Varies by sub-program',
    priceRange: 'Contact for pricing',
    fob: 'Los Angeles, CA',
    products: 'Broad assortment sorted into sub-programs: TGTMix (general mix), RSGM (general merchandise), Apparel, and others',
    brands: 'National brands across all Target categories',
    keyFeatures: [
      'Sourced directly from Target distribution centers',
      'Sorted into sub-programs: TGTMix, RSGM, Apparel, and more',
      'Broader assortment than store-sourced loads',
      'Sub-programs may have different pricing and product mixes',
    ],
    status: 'active',
  },
  {
    id: 'tgt-premium',
    sku: 'LOAD-TGTPREM',
    name: 'TGT Premium',
    retailPartner: 'Target',
    category: 'General Merchandise',
    type: 'Manifested',
    condition: 'Cherry-picked Customer Returns',
    pricingModel: 'Premium pricing',
    priceRange: 'Contact for pricing',
    fob: 'Los Angeles, CA',
    products: 'Higher-value items cherry-picked from the customer returns stream by Target',
    brands: 'Name brands and higher-value items across categories',
    keyFeatures: [
      'Cherry-picked by Target from customer returns — higher quality selection',
      'Manifested — buyers get item-level detail before purchasing',
      'Sold at a higher rate than standard salvage loads',
      'Appeals to buyers looking for more predictable, higher-value merchandise',
    ],
    status: 'active',
  },
  {
    id: 'tgt-apparel',
    sku: 'LOAD-TGTAPP',
    name: 'TGT Apparel (TGTAPP)',
    retailPartner: 'Target',
    category: 'Clothing/Apparel',
    type: 'Unmanifested',
    condition: 'New Overstock',
    pricingModel: 'Flat per load',
    priceRange: 'Contact for pricing',
    fob: 'Los Angeles, CA',
    products: 'Kids, Women\'s, and Men\'s apparel — seasonal mix of Spring/Summer and Fall/Winter styles. Primarily private labels with some national brands. Small percentage may include shoes, accessories, or general merchandise.',
    brands: 'Target private labels and select national apparel brands',
    keyFeatures: [
      '90%+ New Master Case, all New Retail Ready condition',
      'Available in 12 pallet loads, 26 pallet loads, ocean containers, or by pallet (warehouse visits)',
      'Average 5ft pallet height',
      'Consistent ongoing program',
      'Viewable at warehouse',
    ],
    status: 'active',
  },
  {
    id: 'tgt-raw',
    sku: 'LOAD-TGTRAW',
    name: 'TGT RAW',
    retailPartner: 'Target',
    category: 'General Merchandise',
    type: 'Unmanifested',
    condition: 'Variable',
    pricingModel: 'Variable per truck',
    priceRange: 'Varies per truck',
    fob: 'Los Angeles, CA',
    products: 'General merchandise — contents vary significantly per truck',
    brands: 'National brands across Target categories',
    keyFeatures: [
      'Value varies depending on what comes in each truck',
      'Unmanifested — contents not detailed in advance',
      'Pricing reflects the variable nature of each load',
    ],
    status: 'active',
  },

  // === WALMART ===
  {
    id: 'walmart-apparel',
    sku: 'LOAD-VWMAPP',
    name: 'WMAPP (Walmart Apparel)',
    retailPartner: 'Walmart',
    category: 'Clothing/Apparel',
    type: 'Unmanifested',
    condition: 'Customer Returns & Overstock',
    pricingModel: 'Flat per truck',
    priceRange: '$43,000 – $45,000',
    fob: 'Various US locations',
    products: 'Walmart apparel, clothing, and accessories',
    brands: 'Walmart private labels and national apparel brands',
    keyFeatures: [
      'Full truckload apparel loads',
      'Flat pricing per truck',
      'Mix of customer returns and overstock',
      'Consistent program availability',
    ],
    status: 'active',
  },
  {
    id: 'walmart-exits',
    sku: 'LOAD-WMCMDE',
    name: 'WMCOM (Walmart Exits)',
    retailPartner: 'Walmart.com',
    category: 'General Merchandise',
    type: 'Manifested',
    condition: 'Customer Returns',
    pricingModel: '% of retail',
    priceRange: '$1,400 – $58,000',
    fob: 'Various US locations',
    products: 'General merchandise from Walmart.com marketplace returns',
    brands: 'National brands across all Walmart categories',
    keyFeatures: [
      'Manifested — item-level detail available',
      'Walmart.com marketplace returns',
      'Very wide price range for all budget levels',
      'Regular availability',
    ],
    status: 'active',
  },

  // === HOME DEPOT ===
  {
    id: 'hd-turbo',
    sku: 'LOAD-HDTRB',
    name: 'HD Turbo (TRB)',
    retailPartner: 'Home Depot',
    category: 'Tools / Hardware',
    type: 'Unmanifested',
    condition: 'Customer Returns',
    pricingModel: 'Flat per load',
    priceRange: '$7,800 – $10,800',
    fob: 'Various US locations',
    products: 'Tools, hardware, and home improvement merchandise from Home Depot returns',
    brands: 'DeWalt, Milwaukee, Ryobi, Ridgid, and other Home Depot brands',
    keyFeatures: [
      'Unmanifested customer returns',
      'Tools and hardware focused',
      'Flat pricing per load',
      'Regular availability',
    ],
    status: 'active',
  },
  {
    id: 'hd-manifested',
    sku: 'LOAD-VHD',
    name: 'HD Manifested (VHD)',
    retailPartner: 'Home Depot',
    category: 'Tools / Hardware',
    type: 'Manifested',
    condition: 'Customer Returns',
    pricingModel: '31% of wholesale',
    priceRange: '$2,200 – $14,800',
    fob: 'Various US locations',
    products: 'Manifested tools, hardware, and home improvement items with item-level detail',
    brands: 'DeWalt, Milwaukee, Ryobi, Ridgid, and other Home Depot brands',
    keyFeatures: [
      'Manifested — full item-level detail available before purchase',
      'Priced at 31% of wholesale value',
      'Wide price range supports different buyer budgets',
      'Regular availability',
    ],
    status: 'active',
  },

  // === AMAZON ===
  {
    id: 'amazon',
    sku: 'LOAD-AMZ',
    name: 'Amazon (AMZ)',
    retailPartner: 'Amazon',
    category: 'General Merchandise',
    type: 'Mixed',
    condition: 'Shelf Pulls & Customer Returns',
    pricingModel: 'Varies by load type',
    priceRange: 'Varies — contact for pricing',
    fob: 'Multiple US locations',
    products: 'Electronics, Clothing, Apparel, Housewares, Shoes, Accessories, Toys, Home Décor, Sporting Goods, Bedding, Personal Care, Health & Beauty, Tools, Hardware, Furniture, and more',
    brands: 'Broad variety including major national brands across all product categories',
    keyFeatures: [
      'Multiple manifested and unmanifested options',
      'Available from single pallets to full truckloads and ocean containers',
      'Shelf-Pull items in good condition',
      'Flexible sizing for different buyer needs',
      'Consistent ongoing program',
    ],
    status: 'active',
  },

  // === WAYFAIR ===
  {
    id: 'wayfair',
    sku: 'LOAD-WYF',
    name: 'WYF (Wayfair)',
    retailPartner: 'Wayfair',
    category: 'Furniture',
    type: 'Manifested',
    condition: 'Customer Returns',
    pricingModel: '% of retail',
    priceRange: '$439 – $16,600',
    fob: 'Various US locations',
    products: 'Furniture, home décor, rugs, bedding, kitchen and bath, outdoor furniture, and lighting',
    brands: 'Wayfair brands and national home furnishing brands',
    keyFeatures: [
      'Manifested — full item-level detail',
      'Furniture-focused loads',
      'Wide price range supports different budgets',
      'Regular availability',
    ],
    status: 'active',
  },

  // === ZAPPOS ===
  {
    id: 'zappos',
    sku: 'LOAD-ZAP',
    name: 'Zappos (ZAP)',
    retailPartner: 'Zappos',
    category: 'Shoes/Apparel',
    type: 'Manifested',
    condition: 'Customer Returns',
    pricingModel: '% of retail',
    priceRange: '$1,100 – $127,000',
    fob: 'Various US locations',
    products: 'Shoes, footwear, and apparel from Zappos returns',
    brands: 'National footwear and apparel brands',
    keyFeatures: [
      'Manifested — item-level detail available',
      'Footwear-focused program',
      'Part of Via Trading\'s WeSolveReturns (WSR) program',
      'Wide range of lot sizes',
      'Regular availability',
    ],
    status: 'active',
  },

  // === SAM'S CLUB ===
  {
    id: 'sams-club',
    sku: 'LOAD-SMSST',
    name: 'SMS (Sam\'s Club)',
    retailPartner: "Sam's Club",
    category: 'General Merchandise',
    type: 'Manifested',
    condition: 'Customer Returns',
    pricingModel: '20-35% of retail',
    priceRange: '$33.76 – $6,700',
    fob: 'Various US locations',
    products: 'General merchandise from Sam\'s Club stores and distribution centers',
    brands: 'National brands across all Sam\'s Club categories',
    keyFeatures: [
      'Manifested — item-level detail available',
      'Priced at 20-35% of retail value',
      'Wide range of lot sizes from small to large',
      'Regular availability',
    ],
    status: 'active',
  },

  // === LOWES ===
  {
    id: 'lowes',
    sku: 'LOAD-LWS',
    name: 'Lowes (LWS)',
    retailPartner: 'Lowes',
    category: 'Housewares / Home Improvement',
    type: 'Unmanifested',
    condition: 'Customer Returns',
    pricingModel: 'Flat price per load',
    priceRange: '$4,850 – $4,950 per load',
    fob: 'CA, OR, WY, NC',
    products: 'Fans, Toilets, Patio Furniture, Ceiling Fans, Wet/Dry Vac, Lighting, Vanities, Refrigerators, Tool Cabinets, Leaf Blowers, Flooring, Shelving, Ladders, Paint Sprayers, Air Conditioners, Sinks, Faucets, and more',
    brands: 'American Standard, Kobalt, Craftsman, DeWalt, Honeywell, Ego Power, Kichler, Harbor Breeze, Allen + Roth',
    keyFeatures: [
      'Regular ongoing program — always available',
      '22 to 26 pallets per load',
      'Multiple FOB locations for flexibility',
      'Can be floor-loaded into ocean containers for export',
      'Viewable at LA facility',
    ],
    status: 'active',
  },

  // === OTHER / SPECIALTY ===
  {
    id: 'costway',
    sku: 'LOAD-COSTWAY',
    name: 'Costway',
    retailPartner: 'Costway',
    category: 'Furniture',
    type: 'Unmanifested',
    condition: 'Customer Returns',
    pricingModel: 'Flat price per load',
    priceRange: 'From $6,875 per load',
    fob: 'CA, NJ',
    products: 'Furniture, Home & Patio items, Décor',
    brands: 'Costway house brands',
    keyFeatures: [
      'Furniture and home goods focused',
      'Multiple FOB options (California and New Jersey)',
      'Consistent program availability',
      'Customer return condition',
    ],
    status: 'active',
  },
  {
    id: 'tools-thf',
    sku: 'LOAD-THF',
    name: 'THF (Tools)',
    retailPartner: 'Department Store',
    category: 'Tools / Hardware',
    type: 'Manifested',
    condition: 'Customer Returns',
    pricingModel: '23% of retail',
    priceRange: 'Variable',
    fob: 'Various US locations',
    products: 'Tools and hardware from department store returns',
    brands: 'National tool and hardware brands',
    keyFeatures: [
      'Manifested — full item-level detail',
      'Priced at 23% of retail',
      'Tools and hardware focused',
    ],
    status: 'active',
  },
  {
    id: 'jcp',
    sku: 'LOAD-JCPDSHW',
    name: 'JCP Hardgoods',
    retailPartner: 'JCPenney',
    category: 'Housewares',
    type: 'Manifested',
    condition: 'Customer Returns',
    pricingModel: '% of retail',
    priceRange: 'Variable',
    fob: 'Various US locations',
    products: 'Housewares and hardgoods from JCPenney',
    brands: 'JCPenney private labels and national brands',
    keyFeatures: [
      'Manifested housewares loads',
      'Percentage of retail pricing',
      'Regular availability',
    ],
    status: 'active',
  },
  {
    id: 'boscovs',
    sku: 'LOAD-BV',
    name: "Boscov's (BV)",
    retailPartner: "Boscov's",
    category: 'General Merchandise',
    type: 'Manifested',
    condition: 'Customer Returns',
    pricingModel: '9-12% of retail',
    priceRange: 'Variable',
    fob: 'Various US locations',
    products: "General merchandise from Boscov's department stores",
    brands: 'National brands across department store categories',
    keyFeatures: [
      'Manifested — item-level detail available',
      'Priced at only 9-12% of retail — among the lowest pricing models',
      'Department store general merchandise',
    ],
    status: 'active',
  },
  {
    id: 'albertsons',
    sku: 'LOAD-CTC',
    name: 'Albertsons (CTC)',
    retailPartner: 'Albertsons / CTC Discount Store',
    category: 'General Merchandise',
    type: 'Manifested',
    condition: 'Customer Returns',
    pricingModel: '29-35% of retail',
    priceRange: '~$25,000',
    fob: 'Various US locations',
    products: 'General merchandise from Albertsons and CTC Discount Store',
    brands: 'National brands across retail categories',
    keyFeatures: [
      'Manifested loads',
      'Priced at 29-35% of retail',
      'Approximately $25K per load',
    ],
    status: 'active',
  },
]

/** Group programs by retail partner for display */
export const programsByPartner = {
  target: retailPrograms.filter((p) => p.retailPartner === 'Target'),
  walmart: retailPrograms.filter((p) =>
    ['Walmart', 'Walmart.com'].includes(p.retailPartner),
  ),
  homeDepot: retailPrograms.filter((p) => p.retailPartner === 'Home Depot'),
  amazon: retailPrograms.filter((p) => p.retailPartner === 'Amazon'),
  wayfair: retailPrograms.filter((p) => p.retailPartner === 'Wayfair'),
  zappos: retailPrograms.filter((p) => p.retailPartner === 'Zappos'),
  samsClub: retailPrograms.filter((p) => p.retailPartner === "Sam's Club"),
  lowes: retailPrograms.filter((p) => p.retailPartner === 'Lowes'),
  other: retailPrograms.filter((p) =>
    ['Costway', 'Department Store', 'JCPenney', "Boscov's", 'Albertsons / CTC Discount Store'].includes(p.retailPartner),
  ),
}
