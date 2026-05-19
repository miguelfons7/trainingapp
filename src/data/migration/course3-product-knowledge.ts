/**
 * CMS Migration — Course 3: Product Knowledge
 * Converts 10 lesson modules + 1 quiz to PageContent format.
 */
import { ContentBuilder, resetUid } from './helpers'
import type { MigrationEntry } from './helpers'
import { productCategories, skuNaming } from '../modules/product-knowledge/programsData'
import { productKnowledgeSectionedQuiz } from '../modules/product-knowledge/courseQuiz'
import {
  targetFillBlanks,
  walmartFillBlanks,
  homeDepotFillBlanks,
} from '../modules/product-knowledge/inlineExercises'

const COURSE_ID = 'product-knowledge'

// ─── Module 1: Product Overview ──────────────────────────

function productOverview(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'product-overview',
    'What We Sell',
    "An overview of Via Trading's product categories and retail partner programs",
    'border-blue-500',
    'ShoppingBag',
  )

  // What Does Via Trading Sell?
  b.heading('What Does Via Trading Sell?', 3)
  b.paragraph(
    'Via Trading purchases excess, returned, and overstock merchandise from major U.S. retailers and sells it in bulk to business owners around the world. The merchandise comes through structured <strong>programs</strong>, each tied to a specific retail partner. Each program has its own product mix, pricing model, and load format.',
  )
  b.paragraph(
    'This section gives you a working overview of what Via Trading sells, how programs are structured, and the types of products you will encounter. You do not need to memorize every detail right now — the goal is to build a general understanding that the rest of the training will expand on.',
  )

  // How Programs Work
  b.heading('How Programs Work', 3)
  b.paragraph(
    'Via Trading maintains ongoing relationships with major retailers. When those retailers need to move excess or returned merchandise, Via Trading facilitates the sale through a structured program. Depending on the program, the merchandise may follow different paths:',
  )
  b.twoColumnList(
    'Direct-Ship Programs',
    'blue',
    [
      "Many programs ship directly from the retailer's facilities (stores or distribution centers) to the buyer. Via Trading handles the sale, but the merchandise never passes through Via's warehouse.",
    ],
    'Warehouse-First Programs',
    'blue',
    [
      "Some programs require the merchandise to ship to Via Trading's facilities first. Via receives, sorts, and palletizes the goods before making them available for purchase. These loads may also be viewable at the warehouse.",
    ],
  )
  b.flowDiagram(
    'How Programs Work',
    ['Retailer Has Excess / Returns', 'Via Trading Program', 'Ships to Buyer'],
    'bg-blue-600',
    1,
  )

  // Manifested vs. Unmanifested
  b.heading('Manifested vs. Unmanifested', 3)
  b.paragraph(
    'One of the most important distinctions across programs is whether a load is <strong>manifested</strong> or <strong>unmanifested</strong>. This affects how the merchandise is priced, what the buyer knows before purchasing, and the types of buyers who gravitate toward each format.',
  )
  b.twoColumnList(
    'Manifested',
    'emerald',
    [
      'Full item-level detail available before purchase',
      'Buyer knows exactly what they are getting',
      'Priced as a percentage of retail or wholesale value',
      'Lower risk, appeals to newer or more cautious buyers',
    ],
    'Unmanifested',
    'amber',
    [
      'No item-level detail; buyer gets a general category mix',
      'Often viewable at the warehouse before purchase',
      'Flat pricing per load or tiered pricing',
      'Higher margins for experienced buyers who know the product',
    ],
  )

  // Parent SKU Naming
  b.heading('Parent SKU Naming', 3)
  b.paragraph(
    'Via Trading cannot publicly advertise which retailers it works with, so all programs use a <strong>Parent SKU</strong> code instead of the retailer name. You will see these codes throughout the system, on load listings, and in conversations with buyers.',
  )
  b.iconCardGrid(
    2,
    skuNaming.map((entry) => ({
      icon: 'Tag' as string,
      title: entry.retailer,
      description: `SKU: ${entry.skus.join(', ')}`,
    })),
  )

  // Product Categories Grid
  b.heading('Product Categories', 3)
  b.paragraph(
    'Via Trading organizes merchandise into 17 official product categories. Here is the full taxonomy:',
  )
  b.iconCardGrid(
    2,
    productCategories.map((cat) => ({
      icon: cat.icon as string,
      title: cat.name,
      description: '',
    })),
  )

  // What's Ahead callout
  b.callout(
    'orange',
    "The following modules will introduce each retail partner program in more detail. For now, the key takeaway is that Via Trading works across a wide range of product categories and retail partners, each with its own format and pricing. You will become more familiar with individual programs as you continue through the training.",
    "What's Ahead",
  )

  // Additional resources
  b.additionalResources([
    {
      title: 'Via Trading Product Categories',
      url: 'https://www.viatrading.com/product-category/all-wholesale-lots/',
      source: 'ViaTrading.com',
      description: 'Browse all available wholesale liquidation lots by product category.',
    },
    {
      title: 'How to Buy Wholesale Liquidation',
      url: 'https://www.viatrading.com/how-to-buy/',
      source: 'ViaTrading.com',
      description: 'Step-by-step guide on how to purchase liquidation merchandise from Via Trading.',
    },
  ])

  return { courseId: COURSE_ID, moduleId: 'product-overview', content: b.build() }
}

// ─── Module 2: Target Programs ───────────────────────────

function targetPrograms(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'target-programs',
    'Target Programs',
    "Via Trading's flagship retail partner with multiple sub-programs",
    'border-red-500',
    'Target',
  )

  // Introduction
  b.heading('Why Target Is the Flagship', 3)
  b.paragraph(
    'Target is Via Trading\'s most prominent retail partner. With <strong>several distinct sub-programs</strong>, Target provides a consistent and diverse supply of general merchandise, apparel, and specialty goods. The Target programs are among the most popular with buyers because of the quality of the merchandise and the strength of the Target brand.',
  )
  b.paragraph(
    'Most Target programs ship FOB Los Angeles, CA. Program details, pricing tiers, and availability can change — the descriptions below reflect the current lineup at a high level.',
  )

  // Product images
  b.inlineImage('program-tgt-salvage.webp', 'TGT Salvage loads', 'none', 'medium', 'TGT Salvage')
  b.inlineImage('program-tgt-premium.webp', 'TGT Premium loads', 'none', 'medium', 'TGT Premium')
  b.inlineImage('program-tgt-dc.webp', 'TGT DC loads', 'none', 'medium', 'TGT DC / New Mastercase')

  // Target Sub-Programs
  b.heading('Target Sub-Programs', 3)
  b.expandableCardGroup([
    {
      id: 'tgt-salvage',
      title: 'TGT Salvage',
      subtitle: 'Customer Returns / Salvage Loads',
      icon: 'Package',
      badge: { text: 'Unmanifested', color: 'amber' as const },
      accentColor: 'border-red-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p><p>The main customer return loads from Target. TGT Salvage is widely regarded as one of the cleanest customer return loads in the liquidation industry — a significant percentage of the merchandise is actually shelf-pull (never sold, just removed from the shelf), meaning many items are brand-new and retail-ready.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p><ul class="space-y-1.5"><li>• Unmanifested — no item-level detail provided</li><li>• General merchandise mix: electronics, toys, housewares, sporting goods, and more</li><li>• Multiple pricing tiers available to match different buyer budgets</li><li>• Loads can be viewed at Via Trading's warehouse before purchasing</li></ul></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-3">Pricing Tiers (examples)</p><div class="space-y-2"><div><strong>Value</strong> — $10,990: Entry-level tier with a broad mix of general merchandise. Great starting point for newer buyers.</div><div><strong>Prime</strong> — $12,990: Higher concentration of retail-ready goods. Better product mix than Value.</div><div><strong>Max</strong> — $23,990: Premium consolidation with the best product density and highest retail value per load.</div><div><strong>Ocean Container</strong> — $18,490: Floor-loaded into ocean containers for international export. Popular with overseas buyers.</div></div></div></div>`,
    },
    {
      id: 'tgt-dc',
      title: 'TGT DC / TGTMix',
      subtitle: 'New Retail-Ready DC Loads — From $8,100',
      icon: 'Warehouse',
      badge: { text: 'Unmanifested', color: 'amber' as const },
      accentColor: 'border-red-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p><p>Sourced directly from Target Distribution Centers rather than retail stores. Available in <strong>12 & 26 pallet lots</strong>. All items are in <strong>New Retail Ready Condition</strong>, with the very large majority (90%+) being New Master Case. Typically well over <strong>$100K retail per 26 pallet load</strong>. Starting from <strong>$8,100</strong>.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p><ul class="space-y-1.5"><li>• <strong>90%+ New Master Case</strong> — all items new and retail-ready</li><li>• Available in 12-pallet and 26-pallet lot sizes</li><li>• Well over $100K retail value per 26-pallet load</li><li>• Sorted into sub-programs by category (e.g., TGTMix, RSGM, Apparel)</li><li>• Unmanifested — no item-level detail provided</li></ul></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Categories</p><p class="text-xs">Toys, Home Decor, Lighting, Bedding & Domestics, Clothing, Fashion Accessories, Shoes, Kitchen, Baby Items, Outdoor Goods, Plants, Furniture, Bath, Luggage, Table Tops, Grills & Gardening, School/Office Supplies, Storage/Organization, Dining, Patio, Cookware & Bakeware</p></div></div>`,
    },
    {
      id: 'tgt-premium',
      title: 'TGT Premium',
      subtitle: 'Clean Customer Returns — From $166.24/pallet',
      icon: 'Star',
      badge: { text: 'Manifested', color: 'emerald' as const },
      accentColor: 'border-red-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p><p>Clean general merchandise customer return loads. Most items are in original packaging. One of the cleanest customer return loads in the industry, with a majority of <strong>retail-ready goods</strong>. Items are cherry-picked from customer returns <strong>by Target itself</strong> (not by Via Trading), resulting in a higher-quality selection. Available from <strong>$166.24</strong> at pallet level.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p><ul class="space-y-1.5"><li>• <strong>Manifested</strong> — buyers get item-level detail before purchasing</li><li>• Items are cherry-picked by Target, not Via Trading</li><li>• One of the cleanest customer return loads in the industry</li><li>• Most items in original packaging, majority retail-ready</li></ul></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p><p class="text-xs">Accessories, Action Figures, Audio/Video Accessories, Baby Items, Board Games, Coffee Makers, Electronics, Headphones, Small Appliances, Sporting Goods, Vacuums, Video Games/Accessories</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Brands</p><p class="text-xs">Apple, Barbie, Black & Decker, Bose, Clorox, Disney, Fisher Price, Hamilton Beach, Hasbro, Hoover, Keurig, Lego, Melissa & Doug, Nintendo, T-Fal, Vtech</p></div></div>`,
    },
    {
      id: 'tgt-apparel',
      title: 'TGT Apparel (TGTAPP)',
      subtitle: 'New Overstock Apparel',
      icon: 'Shirt',
      badge: { text: 'Unmanifested', color: 'amber' as const },
      accentColor: 'border-red-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p><p>TGT Apparel consists of <strong>New Overstock</strong> apparel from Target — these items were never purchased by consumers and are still in original condition. The loads include a mix of Kids, Women's, and Men's apparel across seasonal styles.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p><ul class="space-y-1.5"><li>• <strong>90%+ New Master Case</strong> — all items are new and retail-ready</li><li>• Available in 12-pallet loads, 26-pallet loads, ocean containers, or by pallet</li><li>• Primarily Target private labels with some national brands</li><li>• Average 5ft pallet height — viewable at warehouse</li></ul></div></div>`,
    },
    {
      id: 'tgt-raw',
      title: 'TGT RAW',
      subtitle: 'Variable-Value Loads',
      icon: 'Truck',
      badge: { text: 'Unmanifested', color: 'amber' as const },
      accentColor: 'border-red-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p><p>TGT RAW loads are variable in value — the product mix and overall worth depend on what comes in each individual truck. Pricing reflects this variability and can fluctuate.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p><ul class="space-y-1.5"><li>• Value varies depending on the contents of each truck</li><li>• Variable pricing that reflects the load composition</li><li>• Unmanifested — no item-level detail provided</li></ul></div></div>`,
    },
  ])

  // Highlight callout
  b.callout(
    'orange',
    'TGT Salvage is widely considered one of the cleanest customer return loads in the liquidation industry. A significant percentage of the merchandise is actually shelf-pull (never sold, just removed from the shelf), which means many items are brand-new and retail-ready.',
    'Did You Know?',
  )

  // Inline Exercise
  b.fillInBlank(targetFillBlanks, 'Quick Check: Target Programs')

  // Additional resources
  b.additionalResources([
    {
      title: 'Target Wholesale Liquidation Lots',
      url: 'https://www.viatrading.com/product-category/target-wholesale-liquidation/',
      source: 'ViaTrading.com',
      description: "Browse currently available Target liquidation loads on Via Trading's marketplace.",
    },
    {
      title: 'What Is Target Salvage Liquidation?',
      url: 'https://www.viatrading.com/blog/target-salvage-liquidation/',
      source: 'Via Trading Blog',
      description: 'A detailed breakdown of the Target Salvage program and what buyers can expect.',
    },
  ])

  return { courseId: COURSE_ID, moduleId: 'target-programs', content: b.build() }
}

// ─── Module 3: Walmart Programs ──────────────────────────

function walmartPrograms(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'walmart-programs',
    'Walmart Programs',
    'Multiple programs spanning apparel and general merchandise',
    'border-blue-500',
    'ShoppingCart',
  )

  // Introduction
  b.heading('Walmart at Via Trading', 3)
  b.paragraph(
    'Walmart is one of Via Trading\'s largest retail partners. Programs cover <strong>apparel (WMAPP)</strong>, <strong>general merchandise hardgoods (WMGM)</strong>, and <strong>online returns / new overstock (WMCOM)</strong>, providing buyers with a range of product types and price points.',
  )
  b.paragraph(
    'Unlike some programs that ship exclusively from Los Angeles, Walmart programs ship <strong>FOB from various US locations</strong>. These loads offer different manifest types and product mixes, giving buyers flexibility depending on their business model.',
  )
  b.inlineImage('program-wmgm.webp', 'Walmart General Merchandise loads — mixed hardgoods on pallets', 'none', 'large', 'Sample Walmart General Merchandise load')

  // Walmart Sub-Programs
  b.heading('Walmart Sub-Programs', 3)
  b.expandableCardGroup([
    {
      id: 'wm-apparel',
      title: 'WMAPP (Walmart Apparel)',
      subtitle: 'Customer Returns & Overstock',
      icon: 'Shirt',
      badge: { text: 'Unmanifested', color: 'amber' as const },
      accentColor: 'border-blue-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p><p>Full truckload apparel loads from Walmart consisting of a mix of customer returns and overstock merchandise. WMAPP is an unmanifested program with flat pricing and consistent availability.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p><ul class="space-y-1.5"><li>• Full truckload apparel loads with flat pricing</li><li>• Mix of customer returns and overstock merchandise</li><li>• Unmanifested — no item-level detail provided</li><li>• Consistent program availability</li></ul></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Details</p><p><strong>Price Range:</strong> $43,000 – $45,000</p><p><strong>FOB:</strong> Various US Locations</p><p><strong>Category:</strong> Apparel</p><p><strong>Pricing Model:</strong> Flat Rate per Truck</p></div></div>`,
    },
    {
      id: 'wm-gm',
      title: 'WMGM (Walmart General Merchandise)',
      subtitle: 'Customer Returns — Mostly Hardgoods',
      icon: 'Package',
      badge: { text: 'Unmanifested', color: 'amber' as const },
      accentColor: 'border-blue-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p><p>WM Customer Return General Merchandise Loads. One of Via Trading's most popular truckload programs. Loads are predominantly made up of hardgoods and sold at a flat price per load. While classified as Customer Returns, loads will include varying percentages of New Overstock and Shelf-Pull merchandise.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p><ul class="space-y-1.5"><li>• <strong>Unmanifested</strong> — loads predominantly hardgoods</li><li>• One of Via Trading's most popular truckload programs</li><li>• Sold at a flat price per load</li><li>• Loads include varying % of New Overstock and Shelf-Pull items</li><li>• Can be viewed at warehouse (FOB LA loads)</li><li>• Available from multiple FOB locations (LA, NV, IN, SC)</li></ul></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Products</p><p>Toys, kitchen and cookware, camping gear, indoor and outdoor furniture, exercise equipment, baby products, bedding, automotive, sporting goods, hardware, lighting, pet supplies, health & beauty, tools, outdoor goods, lawn & garden, and more.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Brands</p><p>Fisher Price, Playskool, Little Tikes, Disney, Coleman, Acme Furniture, and many other national and private label brands.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Details</p><p><strong>Price Range:</strong> From $10,990</p><p><strong>FOB:</strong> LA, NV, IN, SC</p><p><strong>Category:</strong> General Merchandise</p><p><strong>Pricing Model:</strong> Flat per Load</p></div></div>`,
    },
    {
      id: 'wm-com',
      title: 'WMCOM (Walmart Exits / Walmart.com)',
      subtitle: 'Box Damage & New Overstock Clearance',
      icon: 'Globe',
      badge: { text: 'Manifested', color: 'emerald' as const },
      accentColor: 'border-blue-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p><p>WMCOM & Stores Box Damage & New Overstock Clearance Program. Mix of Deep SKU and/or Assorted Loads. <strong>Fully Manifested.</strong> New Overstock Merchandise. This is a manifested program giving buyers item-level detail on what they are purchasing. The wide price range makes this program accessible to buyers at all budget levels.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p><ul class="space-y-1.5"><li>• <strong>Manifested</strong> — buyers get item-level detail before purchasing</li><li>• Mix of Deep SKU and/or Assorted Loads</li><li>• Deep SKU items are typically brand new master case</li><li>• More assorted items may include merchandise with slightly damaged master case</li><li>• Wide price range suitable for all budget levels</li><li>• Box Damage & New Overstock Clearance</li></ul></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Products</p><p>Toys, Baby Items, Electronics, Cellphones, Gadgets & Cutlery, Watches, Bedding & Domestics, Cosmetics, Fitness & Sporting Goods, Outdoor, Health Care, Pet Supplies, Hardware, Home Decor, Apparel, Shoes, Hair Care, Bath & Accessories, School Supplies, and more.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Brands</p><p>Samsung, Disney, Honeywell, Google, Little Tikes, Cuisinart, GE, Graco, Under Armour, Canon, Nerf, Skechers, Hot Wheels, GoPro, Champion, Barbie, and many more.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Details</p><p><strong>Price Range:</strong> From $3,164.65</p><p><strong>FOB:</strong> Various US Locations</p><p><strong>Category:</strong> General Merchandise</p><p><strong>Pricing Model:</strong> Per-Load (Manifested)</p></div></div>`,
    },
  ])

  // SKU Code Callout
  b.callout(
    'orange',
    '<strong>WM</strong> — General Walmart loads<br/><strong>WMGM</strong> — Walmart General Merchandise (hardgoods)<br/><strong>WMAPP</strong> — Walmart Apparel<br/><strong>WMCOM</strong> — Walmart.com exits / New Overstock',
    'Understanding Walmart SKU Codes',
  )

  // Inline Exercise
  b.fillInBlank(walmartFillBlanks, 'Quick Check: Walmart Programs')

  // Additional resources
  b.additionalResources([
    {
      title: 'Walmart Wholesale Liquidation Lots',
      url: 'https://www.viatrading.com/product-category/walmart-wholesale-liquidation/',
      source: 'ViaTrading.com',
      description: "Browse currently available Walmart liquidation loads on Via Trading's marketplace.",
    },
  ])

  return { courseId: COURSE_ID, moduleId: 'walmart-programs', content: b.build() }
}

// ─── Module 4: Home Depot Programs ───────────────────────

function homeDepotPrograms(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'home-depot-programs',
    'Home Depot Programs',
    'Tools, hardware, and home improvement loads in both manifested and unmanifested formats',
    'border-orange-500',
    'Wrench',
  )

  // Introduction
  b.heading('Home Depot at Via Trading', 3)
  b.paragraph(
    'Home Depot is a key retail partner focused on <strong>tools, hardware, and home improvement</strong> products. Via Trading offers two distinct Home Depot programs: <strong>HD Turbo (TRB)</strong>, which is unmanifested, and <strong>HD Manifested (VHD)</strong>, which provides full item-level detail.',
  )
  b.paragraph(
    'Home Depot is a great example of how the same retailer can offer both manifested and unmanifested options. The key tradeoff is <strong>transparency vs. pricing</strong>: manifested loads let the buyer see exactly what they are getting, while unmanifested loads come at a lower per-unit cost with more potential upside.',
  )
  b.inlineImage('program-hd.webp', 'Home Depot tools and hardware liquidation loads', 'none', 'large', 'Sample Home Depot load')

  // Home Depot Sub-Programs
  b.heading('Home Depot Sub-Programs', 3)
  b.expandableCardGroup([
    {
      id: 'hd-turbo',
      title: 'HD Turbo (TRB)',
      subtitle: 'Unmanifested Customer Returns',
      icon: 'EyeOff',
      badge: { text: 'Unmanifested', color: 'amber' as const },
      accentColor: 'border-orange-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p><p>HD Turbo is Via Trading's unmanifested Home Depot program. These loads are <strong>As-Is Customer Returns and will include Defective merchandise</strong>. No item-level detail is provided. The flat pricing model makes TRB a strong option for experienced tool resellers who are comfortable buying without a manifest.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p><ul class="space-y-1.5"><li>• <strong>Unmanifested</strong> — no item-level detail provided</li><li>• Tools and hardware focused</li><li>• Flat pricing model — predictable cost per load</li><li>• Loads include varying % of New Overstock and Shelf Pull Merchandise</li><li>• There is no guarantee of items, pallet heights, value or unit counts</li><li>• Best for experienced tool resellers</li></ul></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Details</p><p><strong>Price Range:</strong> $7,800 – $10,800</p><p><strong>FOB:</strong> Phoenix, AZ</p><p><strong>Category:</strong> Tools & Hardware</p><p><strong>Pricing Model:</strong> Flat Rate per Load</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p><p class="text-xs">Shower Heads, Wet/Dry Vacuum, Heater Fan, Mower, Range Hood, Locks, Sprayer, Welding Helmet, Hammer, Scales, Security Light, Vents, Boots, Night Light, Paint Kits, Ceiling Fans, Fans, Bins, Patio Furniture, Lighting, Tool Cabinets, Leaf Blowers, Flooring, Shelving, Faucets, Reciprocating Saws, Hose, Storage Units, Water Filters, Air Filters, Door Handles, Fire Pits, Mail Box, and more</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Brands</p><p class="text-xs">Wagner, Moen, Milwaukee, Husky, Hampton Bay, Hoover, Lasko, Ryobi, 3M, Halo, FEIT Electric, Dewalt, Ridgid, NuTone, Defiant, Echo, Siemens</p></div></div>`,
    },
    {
      id: 'hd-manifested',
      title: 'HD Manifested (VHD)',
      subtitle: 'Manifested Customer Returns',
      icon: 'FileText',
      badge: { text: 'Manifested', color: 'emerald' as const },
      accentColor: 'border-orange-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p><p>HD Manifested is Via Trading's manifested Home Depot program. Buyers receive full item-level detail before purchasing, making it a good fit for buyers who want to know exactly what they are getting. Pricing is based on a percentage of wholesale value rather than a flat rate.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p><ul class="space-y-1.5"><li>• <strong>Manifested</strong> — full item-level detail available before purchase</li><li>• Priced at 31% of wholesale value</li><li>• Tools, hardware, and home improvement products</li><li>• Good for buyers who want visibility into exactly what they are getting</li></ul></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Details</p><p><strong>Price Range:</strong> $2,200 – $14,800</p><p><strong>FOB:</strong> Various US Locations</p><p><strong>Category:</strong> Tools & Home Improvement</p><p><strong>Pricing Model:</strong> 31% of Wholesale Value</p></div></div>`,
    },
  ])

  // Comparison Card
  b.heading('Manifested vs. Unmanifested: A Side-by-Side Look', 3)
  b.paragraph(
    'Home Depot is a great example of how the same retail partner can offer both formats. The key tradeoff is <strong>transparency vs. pricing</strong>: manifested loads let the buyer see exactly what they are getting, while unmanifested loads come at a lower per-unit cost with more potential upside.',
  )
  b.twoColumnList(
    'HD Turbo (TRB) — Unmanifested',
    'amber',
    [
      'No item-level detail',
      'Flat pricing: $7,800 – $10,800',
      'Best for experienced tool resellers',
    ],
    'HD Manifested (VHD) — Manifested',
    'emerald',
    [
      'Full item-level detail available',
      '31% of wholesale value',
      'Good for buyers wanting visibility',
    ],
  )

  // Inline Exercise
  b.fillInBlank(homeDepotFillBlanks, 'Quick Check: Home Depot Programs')

  // Additional resources
  b.additionalResources([
    {
      title: 'Home Depot Wholesale Liquidation Lots',
      url: 'https://www.viatrading.com/product-category/home-depot-wholesale-liquidation/',
      source: 'ViaTrading.com',
      description: "Browse currently available Home Depot liquidation loads on Via Trading's marketplace.",
    },
  ])

  return { courseId: COURSE_ID, moduleId: 'home-depot-programs', content: b.build() }
}

// ─── Module 5: Amazon Programs ───────────────────────────

function amazonPrograms(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'amazon-programs',
    'Amazon Programs',
    'Flexible load sizes from single pallets to full truckloads',
    'border-indigo-500',
    'Package',
  )

  // Introduction
  b.heading('Amazon Liquidation Overview', 3)
  b.paragraph(
    'Amazon loads are marketed as <strong>Customer Returns</strong>, though the <strong>large majority of items will generally be Brand New, Poly Bagged &amp; with Retail Tags</strong>. All loads are <strong>fully manifested</strong> with the majority of items\' retail values provided by Amazon. Loads are available in various configurations from single pallets to full truckloads and ocean containers, making the program accessible to buyers of all sizes.',
  )
  b.paragraph(
    'There are two main types of AMZ loads: (1) <strong>Predominantly Apparel &amp; Shoes</strong>, and (2) <strong>Predominantly Home, Wireless, Toys &amp; Drugstore</strong>. The percentage-of-retail sales price can vary per load based on the commodity mix. The parent SKU for all Amazon programs is <strong>AMZ</strong>.',
  )
  b.inlineImage('program-amz.webp', 'Amazon shelf-pull loads on pallets', 'none', 'large', 'Sample Amazon load')

  // Amazon Program
  b.heading('Amazon Program', 3)
  b.expandableCardGroup([
    {
      id: 'amz',
      title: 'Amazon (AMZ)',
      subtitle: 'Shelf Pulls & Customer Returns',
      icon: 'Package',
      badge: { text: 'Manifested', color: 'emerald' as const },
      accentColor: 'border-indigo-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p><p>Amazon loads are fully manifested customer return merchandise spanning virtually every consumer product category. Although marketed as Customer Returns, the large majority of items are typically Brand New, Poly Bagged, and with Retail Tags. Retail values for the majority of items are provided by Amazon. Loads range from single pallets to full truckloads and ocean containers.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p><ul class="space-y-1.5"><li>• <strong>All lots are manifested</strong> with retail values provided by Amazon</li><li>• Large majority of items are Brand New, Poly Bagged & with Retail Tags</li><li>• Available from single pallets to full truckloads and ocean containers</li><li>• Two main load types: Apparel & Shoes, or Home, Wireless, Toys & Drugstore</li><li>• <strong>Similar smaller listings available</strong></li><li>• <strong>Can be viewed in warehouse</strong></li><li>• Consistent ongoing program</li><li>• Consolidation options available</li></ul></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Details</p><p><strong>Condition:</strong> Customer Returns (mostly Brand New)</p><p><strong>Price Range:</strong> From 6.50% of Retail; $1,333 – $155,181</p><p><strong>FOB:</strong> CA — Los Angeles</p><p><strong>Parent SKU:</strong> AMZ</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p><p class="text-xs">Electronics, Clothing, Housewares, Shoes, Accessories, Toys, Home D&eacute;cor, Sporting Goods, Bedding, Personal Care, Health & Beauty, Tools, Hardware, Furniture</p></div></div>`,
    },
  ])

  // Load Size Options
  b.heading('Load Size Options', 3)
  b.iconCardGrid(2, [
    { icon: 'Package', title: 'Single Pallets', description: 'Ideal for smaller buyers or those testing the Amazon program for the first time.' },
    { icon: 'Layers', title: 'Multi-Pallet Lots', description: 'Mid-size purchases for buyers ready to scale beyond single pallets.' },
    { icon: 'Truck', title: 'Full 26-Pallet Truckloads', description: 'Standard bulk option for established buyers looking for maximum value per load.' },
    { icon: 'Ship', title: 'Ocean Container Loads', description: 'Floor-loaded containers designed for international export buyers.' },
  ])

  // Additional resources
  b.additionalResources([
    {
      title: 'Amazon Wholesale Liquidation',
      url: 'https://www.viatrading.com/product-category/amazon-wholesale-liquidation/',
      source: 'ViaTrading.com',
      description: "Browse currently available Amazon liquidation loads on Via Trading's marketplace.",
    },
  ])

  return { courseId: COURSE_ID, moduleId: 'amazon-programs', content: b.build() }
}

// ─── Module 6: Wayfair Programs ──────────────────────────

function wayfairPrograms(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'wayfair-programs',
    'Wayfair Programs',
    'Furniture and home goods loads across five load types',
    'border-violet-500',
    'Sofa',
  )

  // Introduction
  b.heading('About the Wayfair Program', 3)
  b.paragraph(
    'Wayfair is a leading online furniture and home goods retailer. Via Trading\'s Wayfair program (<strong>WYF</strong>) offers loads priced at a <strong>flat percentage of retail</strong>. Most load types include full item-level manifests available within <strong>48 hours</strong>, giving buyers visibility into what they are purchasing. Inventory is available on a <strong>consistent weekly</strong> basis.',
  )
  b.paragraph(
    'Parent SKU: <strong>WYF</strong>. Multiple FOB locations: <strong>California, Florida, Illinois, Maryland, and Texas</strong>. These loads cover a wide range of home furnishings across five distinct load types, from small home décor items to large furniture pieces.',
  )
  b.inlineImage('program-wyf.webp', 'Wayfair furniture and home goods liquidation', 'none', 'large', 'Sample Wayfair load')

  // Wayfair Program
  b.heading('Wayfair Program', 3)
  b.expandableCardGroup([
    {
      id: 'wyf',
      title: 'WYF (Wayfair)',
      subtitle: 'Manifested Furniture & Home Goods',
      icon: 'Sofa',
      badge: { text: 'Manifested', color: 'emerald' as const },
      accentColor: 'border-violet-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p><p>Wayfair loads cover furniture, home d&eacute;cor, and related categories across five distinct load types, from small-item returns (350+ units) to large furniture returns (40+ items), plus shelf-pull imperfections, excess/clearance inventory, and salvage loads. Most load types come with full manifests available within 48 hours.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p><ul class="space-y-1.5"><li>• Manifested with full item-level detail (available within 48 hours)</li><li>• Consistent weekly inventory availability</li><li>• 5 distinct load types: Returns (Small & Large), Imperfection Shelf Pull, Excess & Clearance, and Salvage</li><li>• Priced at a flat % of retail</li><li>• Multiple FOB locations across 5 states</li></ul></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Details</p><p><strong>Condition:</strong> Returns, Shelf Pull, Excess, Clearance & Salvage</p><p><strong>Pricing Model:</strong> Flat % of Retail</p><p><strong>Retail Value:</strong> $55K – $95K per load</p><p><strong>FOB:</strong> CA, FL, IL, MD, TX</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p><p class="text-xs">Furniture, home decor, rugs, bedding, kitchen and bath, outdoor furniture, lighting</p></div></div>`,
    },
  ])

  // Wayfair Load Types
  b.heading('Wayfair Load Types', 3)
  b.iconCardGrid(2, [
    { icon: 'Package', title: 'Liquidation Returns: Small Items', description: '350+ units per load: nightstands, ceiling fans, lamps, rugs, tiles, wall art, curtains, outdoor décor, pet furniture, bar stools.' },
    { icon: 'Sofa', title: 'Liquidation Returns: Large Items', description: '40+ large items per load: sofas, dining tables, vanities, beds, patio sets, TV stands.' },
    { icon: 'Star', title: 'Imperfection: Shelf Pull', description: 'Like-new items with minor cosmetic flaws. Fully functional. Great margins for buyers who can overlook small imperfections.' },
    { icon: 'Tag', title: 'Excess & Clearance Inventory', description: 'Shelf-pulls and new items from discontinued or seasonal product lines. No customer return wear.' },
    { icon: 'AlertTriangle', title: 'Salvage', description: 'Unmanifested loads sold at a flat rate per truck. Items may have missing boxes from a set, chipped edges, cracked glass, or other cosmetic defects. Ideal for buyers who can sort and repair.' },
  ])

  // Additional resources
  b.additionalResources([
    {
      title: 'Wayfair Wholesale Liquidation Lots',
      url: 'https://www.viatrading.com/product-category/wayfair-wholesale-liquidation/',
      source: 'ViaTrading.com',
      description: "Browse currently available Wayfair liquidation loads on Via Trading's marketplace.",
    },
  ])

  return { courseId: COURSE_ID, moduleId: 'wayfair-programs', content: b.build() }
}

// ─── Module 7: Zappos Programs ───────────────────────────

function zapposPrograms(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'zappos-programs',
    'Zappos Programs',
    'Manifested shoes, clothing, and accessories from Zappos',
    'border-teal-500',
    'Footprints',
  )

  // Introduction
  b.heading('About the Zappos Program', 3)
  b.paragraph(
    'Zappos is known for its generous return policy, creating a consistent stream of quality merchandise. Via Trading\'s Zappos program offers <strong>shoes, clothing, and accessories</strong> in two condition types: <strong>Shelf Pulls</strong> and <strong>Customer Returns</strong>. The program is part of <strong>WeSolveReturns (WSR)</strong>, which processes returns for brands without their own infrastructure.',
  )
  b.paragraph(
    'Load Code: <strong>LOAD-ZAP</strong>. Fully manifested loads priced at 13.5% of retail value.',
  )
  b.inlineImage('program-zap.webp', 'Zappos brand name shoes on pallets', 'none', 'large', 'Sample Zappos pallet')

  // Zappos Program
  b.heading('Zappos Program', 3)
  b.expandableCardGroup([
    {
      id: 'zap',
      title: 'ZAP (Zappos)',
      subtitle: 'Shoes, Clothing & Accessories',
      icon: 'Footprints',
      badge: { text: 'Manifested', color: 'emerald' as const },
      accentColor: 'border-teal-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p><p>Zappos manifested loads covering shoes, clothing, and accessories. Available in two condition types: <strong>Shelf Pulls</strong> (items pulled from retail shelves before being sold, usually new and in good condition) and <strong>Customer Returns</strong> (previously purchased and returned items, ranging from like-new to lightly used). Priced at <strong>13.5% of retail value</strong>.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p><ul class="space-y-1.5"><li>• Manifested with item-level detail</li><li>• Priced at <strong>13.5% of retail value</strong></li><li>• Two condition types: Shelf Pulls (excellent condition) and Customer Returns (mixed condition)</li><li>• Includes shoes, clothing, handbags, backpacks, and accessories</li><li>• FOB: CA-Los Angeles and KY (Kentucky)</li></ul></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Details</p><p><strong>Condition:</strong> Shelf Pulls & Customer Returns</p><p><strong>Pricing:</strong> 13.5% of Retail</p><p><strong>Categories:</strong> Shoes, Clothing, Accessories</p><p><strong>FOB:</strong> CA & KY</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Brands</p><p class="text-xs">Adidas, ASICS, Calvin Klein, Clarks, Cole Haan, Columbia, Converse, Crocs, ECCO, Free People, GUESS, Hey Dude, Hoka, Jordan, Kate Spade, Levi's, Michael Kors, New Balance, Nike, PUMA, Sam Edelman, Skechers, Steve Madden, Stuart Weitzman, Ted Baker, The North Face, Timberland, Tommy Hilfiger, TOMS, UGG, Under Armour, Vans, and more</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p><p class="text-xs">Shoes (heels, sandals, sneakers, boots, flats, wedges), handbags, backpacks, shirts, pants, shorts, and more</p></div></div>`,
    },
  ])

  // WSR Callout
  b.callout(
    'info',
    'Zappos is part of Via Trading\'s <strong>WeSolveReturns (WSR)</strong> program. WSR acts as a return center for brands that don\'t have their own returns infrastructure. This means the Zappos relationship is managed through WSR, not as a direct retail partnership. WSR enables Via Trading to work with brands that wouldn\'t otherwise have a liquidation channel.',
    'WeSolveReturns (WSR) Connection',
  )

  // Additional resources
  b.additionalResources([
    {
      title: 'Brand Name Shoes Wholesale Liquidation',
      url: 'https://www.viatrading.com/product-category/brand-name-shoes-wholesale-liquidation/',
      source: 'ViaTrading.com',
      description: "Browse currently available brand name shoe liquidation loads on Via Trading's marketplace.",
    },
  ])

  return { courseId: COURSE_ID, moduleId: 'zappos-programs', content: b.build() }
}

// ─── Module 8: Sam's Club Programs ───────────────────────

function samsClubPrograms(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'sams-club-programs',
    "Sam's Club Programs",
    'Manifested general merchandise at 20-35% of retail',
    'border-indigo-500',
    'Store',
  )

  // Introduction
  b.heading("About the Sam's Club Program", 3)
  b.paragraph(
    'Sam\'s Club (<strong>SMS</strong>) offers manifested general merchandise loads with a wide range of lot sizes — from small lots to larger purchases. Loads are priced at <strong>20-35% of retail value</strong>, making them accessible for a variety of buyer budgets.',
  )
  b.paragraph(
    'Parent SKU: <strong>SMS</strong>. The program covers a broad assortment of general merchandise sourced from Sam\'s Club stores and distribution centers.',
  )
  b.inlineImage('program-sms.webp', "Sam's Club liquidation loads", 'none', 'large', "Sample Sam's Club load")

  // Sam's Club Program
  b.heading("Sam's Club Program", 3)
  b.expandableCardGroup([
    {
      id: 'sms',
      title: "SMS (Sam's Club)",
      subtitle: 'Manifested General Merchandise',
      icon: 'Store',
      badge: { text: 'Manifested', color: 'emerald' as const },
      accentColor: 'border-indigo-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Overview</p><p>Sam's Club <strong>generally clean customer return</strong> loads with full item-level manifests. Loads are predominantly customer returns but also include a percentage of New Overstock and Shelf Pull items. The program covers a broad assortment of general merchandise with lot sizes ranging from small to large, making it flexible for different buyer profiles.</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Key Features</p><ul class="space-y-1.5"><li>• Manifested — item-level detail available</li><li>• Priced at 20-35% of retail value</li><li>• Predominantly customer returns with % of New Overstock and Shelf Pull</li><li>• Viewable at facility — FOB Los Angeles</li><li>• Volume discounts available for multi-lot purchases</li></ul></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-2">Details</p><p><strong>Condition:</strong> Generally Clean Customer Returns</p><p><strong>Pricing Model:</strong> 20-35% of Retail</p><p><strong>Price Range:</strong> $33.76 – $6,700</p><p><strong>FOB:</strong> Los Angeles (viewable at facility)</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Products</p><p class="text-xs">Kitchen Electronics, Hardware, Mattresses, Electronics & Accessories, Outdoor Living, Furniture, Office Electronics, Home Improvement, Tools, Health & Beauty Aids, Gardening, Toys, Sporting Goods, Office Supplies, OTC, Apparel, and more</p></div><div><p class="text-xs font-semibold text-via-navy uppercase tracking-wide mb-1">Brands</p><p class="text-xs">Ninja, Sony, Garmin, Beats, Samsung, Nintendo, Apple, Roku, Fitbit, LG, Martha Stewart, Frigidaire, iRobot, Disney, Samsonite, Dyson, Bissell, Shark, KitchenAid, Instant Pot, Oral B, and many more plus Private Label brands</p></div></div>`,
    },
  ])

  // Volume Discount Callout
  b.callout(
    'tip',
    'Purchase <strong>3 Lots = 5% Discount</strong> | Purchase <strong>6 Lots = 8% Discount</strong>. Multi-lot buyers can significantly reduce their per-unit cost through these volume tiers.',
    'Volume Discounts Available',
  )

  // Additional resources
  b.additionalResources([
    {
      title: 'General Wholesale Liquidation Lots',
      url: 'https://www.viatrading.com/product-category/general-wholesale-liquidation/',
      source: 'ViaTrading.com',
      description: "Browse currently available general merchandise liquidation loads on Via Trading's marketplace.",
    },
  ])

  return { courseId: COURSE_ID, moduleId: 'sams-club-programs', content: b.build() }
}

// ─── Module 9: Other Programs ────────────────────────────

function otherPrograms(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'other-programs',
    'Additional Retail Partners',
    "Smaller and specialty programs that complement Via Trading's major partnerships",
    'border-teal-500',
    'Layers',
  )

  // Introduction
  b.heading('Beyond the Major Partners', 3)
  b.paragraph(
    'Beyond the major retail partners, Via Trading works with several additional partners. These tend to be more specialized and may appeal to buyers looking for specific product categories or pricing models. Each program offers its own advantages depending on what a buyer is looking for.',
  )

  // Specialty Programs
  b.heading('Specialty Programs', 3)
  b.expandableCardGroup([
    {
      id: 'he-shoes',
      title: 'HE Designer Shoes',
      icon: 'Footprints',
      badge: { text: 'Manifested', color: 'emerald' as const },
      accentColor: 'border-teal-500',
      content: `<div class="space-y-3"><p>Assorted shelf-pull women's designer shoe lots from a major department store. About 90% designer brands and 10% well-known private label. Loads include boots, heels, sandals, flats, sneakers, wedges, and more. Manifested and sold as a percentage of retail value.</p><p><strong>Price:</strong> From 8% of Retail ($720+)</p><p><strong>FOB:</strong> CA-Los Angeles</p></div>`,
    },
    {
      id: 'he-clothing',
      title: 'HE Designer Clothing',
      icon: 'Shirt',
      badge: { text: 'Manifested', color: 'emerald' as const },
      accentColor: 'border-teal-500',
      content: `<div class="space-y-3"><p>Shelf-pull women's designer clothing from a major department store. Mix of casual and formal wear across all seasons. Brands include Calvin Klein, GUESS, DKNY, Levi's, Jessica Simpson, Lucky Brand, BCBG, Anne Klein, and more. Loads typically available from 1 pallet and up.</p><p><strong>Price:</strong> From 12% of Retail ($4,500+)</p><p><strong>FOB:</strong> CA-Los Angeles</p></div>`,
    },
    {
      id: 'costway',
      title: 'Costway',
      icon: 'Sofa',
      badge: { text: 'Unmanifested', color: 'amber' as const },
      accentColor: 'border-teal-500',
      content: `<div class="space-y-3"><p>Furniture, home, and patio customer returns from an online-first furniture retailer. Loads available from two FOB locations.</p><p><strong>Price:</strong> From $6,875/load</p><p><strong>FOB:</strong> CA & NJ</p></div>`,
    },
    {
      id: 'jcp',
      title: 'JCPenney (JCP)',
      icon: 'Store',
      badge: { text: 'Manifested', color: 'emerald' as const },
      accentColor: 'border-teal-500',
      content: `<div class="space-y-3"><p>Manifested housewares and hardgoods from JCPenney stores. Priced as a percentage of retail value with full item-level detail.</p><p><strong>Price:</strong> % of Retail</p><p><strong>FOB:</strong> Various US Locations</p></div>`,
    },
    {
      id: 'boscovs',
      title: "Boscov's (BV)",
      icon: 'ShoppingCart',
      badge: { text: 'Manifested', color: 'emerald' as const },
      accentColor: 'border-teal-500',
      content: `<div class="space-y-3"><p>Manifested department store merchandise at 9-12% of retail - among the lowest pricing models across all Via Trading programs.</p><p><strong>Price:</strong> 9-12% of Retail</p><p><strong>FOB:</strong> Various US Locations</p></div>`,
    },
    {
      id: 'ctc',
      title: 'Albertsons / CTC (CTC)',
      icon: 'Package',
      badge: { text: 'Manifested', color: 'emerald' as const },
      accentColor: 'border-teal-500',
      content: `<div class="space-y-3"><p>Manifested general merchandise at 29-35% of retail. Larger loads averaging approximately $25K per load.</p><p><strong>Price:</strong> 29-35% of Retail (~$25K/load)</p><p><strong>FOB:</strong> Various US Locations</p></div>`,
    },
    {
      id: 'thf-tools',
      title: 'THF Tools',
      icon: 'Wrench',
      badge: { text: 'Manifested', color: 'emerald' as const },
      accentColor: 'border-teal-500',
      content: `<div class="space-y-3"><p>Manifested tools and hardware loads priced at 23% of retail. Export only - these loads are available exclusively for international export buyers. A specialty program for buyers focused on the tools category who operate outside the US.</p><p><strong>Price:</strong> 23% of Retail</p><p><strong>FOB:</strong> Various US Locations</p></div>`,
    },
  ])

  // Summary callout
  b.callout(
    'orange',
    "Via Trading's strength is breadth - whatever a buyer is looking for, there's likely a program that fits. From furniture and footwear to tools and department store goods, these specialty programs complement the major partnerships and ensure every buyer can find the right product at the right price point.",
    'Program Breadth',
  )

  // Additional resources
  b.additionalResources([
    {
      title: 'All Wholesale Liquidation Lots',
      url: 'https://www.viatrading.com/product-category/all-wholesale-lots/',
      source: 'ViaTrading.com',
      description: 'Browse all available wholesale liquidation lots across every retail partner.',
    },
  ])

  return { courseId: COURSE_ID, moduleId: 'other-programs', content: b.build() }
}

// ─── Module 10: LiquidateNow Offerings ───────────────────

function lnOfferings(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'liquidatenow-offerings',
    'LiquidateNow Offerings',
    "How LN's product catalog complements Via Trading's direct programs",
    'border-orange-500',
    'DollarSign',
  )

  // Context: How LN Differs
  b.heading("LiquidateNow vs. Via Trading's Wholesale Model", 3)
  b.paragraph(
    'In an earlier module, you learned what LiquidateNow is and how consignment works. This module focuses on what is actually <strong>available</strong> through LN and how those offerings fit into Via Trading\'s broader product catalog.',
  )
  b.paragraph(
    'The key difference is sourcing. Via Trading\'s direct programs (Target, Lowes, Home Depot, etc.) involve Via Trading purchasing merchandise outright from the retailer. Via owns the inventory and sets the pricing. With <strong>LiquidateNow</strong>, Via Trading does not own the inventory. Instead, vendors — retailers, manufacturers, and other businesses — list their own merchandise on the platform and set their own pricing expectations. LN acts as the marketplace and marketing engine.',
  )
  b.twoColumnList(
    'Via Trading Direct',
    'blue',
    [
      'Via buys inventory outright',
      'Via sets the pricing',
      'Structured ongoing programs',
      'Consistent, predictable inventory',
    ],
    'LiquidateNow (Consignment)',
    'orange',
    [
      'Vendor retains ownership until sold',
      'Vendor sets pricing expectations',
      'Wider variety of vendors and sources',
      'More diverse and unique inventory',
    ],
  )

  // Types of Merchandise on LiquidateNow
  b.heading('Types of Merchandise on LiquidateNow', 3)
  b.paragraph(
    "Because LiquidateNow accepts listings from a wide range of vendors, the product mix is broader and more varied than what appears in Via Trading's direct programs. Here are the main categories of merchandise available through LN.",
  )
  b.iconCardGrid(2, [
    { icon: 'Package', title: 'Overstock & Closeouts', description: 'Brand-new merchandise that retailers or manufacturers need to move due to seasonal changes, packaging updates, or excess production. Often in master case or pallet format.' },
    { icon: 'ArrowLeftRight', title: 'Customer Returns', description: 'Returned products from online and brick-and-mortar retailers. Condition varies from new-in-box to open-box. Typically sold in bulk by category.' },
    { icon: 'Store', title: 'Shelf Pulls & Discontinued Items', description: 'Products removed from retail shelves to make room for new inventory. Generally in good condition with original packaging intact.' },
    { icon: 'ShoppingBag', title: 'Direct-from-Brand Inventory', description: 'Merchandise listed directly by brands and manufacturers, not just retailers. This can include production overruns, packaging changes, and end-of-life products.' },
  ])

  // How Buyers Purchase on LN
  b.heading('How Buyers Purchase on LN', 3)
  b.paragraph(
    "From the buyer's perspective, browsing LiquidateNow is similar to browsing ViaTrading.com. Listings include product details, photos, pricing, and shipping information. The key difference is that the merchandise may ship directly from the vendor's location rather than from Via Trading's warehouse.",
  )
  b.flowDiagram(
    'LN Buyer Experience',
    ['Vendor Lists on LN', 'LN Markets to Network', 'Buyer Browses & Purchases', 'Direct Shipment to Buyer'],
    'bg-orange-600',
    2,
  )

  // The "Make an Offer" Feature
  b.heading('The "Make an Offer" Feature', 3)
  b.paragraph(
    'Many LiquidateNow listings use a <strong>"Make an Offer"</strong> setting, which allows buyers to submit an offer <strong>lower</strong> than the listed price. The vendor or client who owns the inventory then reviews the offer and decides whether to accept, counter, or decline. This is a key differentiator from Via Trading\'s direct programs, where pricing is fixed.',
  )
  b.callout(
    'orange',
    'Listings with this feature display an orange <strong>"Make an Offer"</strong> button on the website. When a buyer clicks it, they can propose a price below the listed amount. The vendor receives the offer and can respond directly.',
    'Make an Offer',
  )
  b.iconCardGrid(2, [
    { icon: 'HandCoins', title: 'Benefit for Buyers', description: 'Buyers have the opportunity to negotiate a lower price, which can mean better margins on resale. This flexibility is especially appealing for price-sensitive buyers or those purchasing in large quantities.' },
    { icon: 'Zap', title: 'Benefit for Vendors', description: 'Vendors can move inventory faster by being open to negotiation. Rather than waiting for a buyer willing to pay full price, they can evaluate offers and close deals more quickly, reducing holding costs.' },
  ])

  // How Vendors List on LN
  b.heading('How Vendors List on LN', 3)
  b.paragraph(
    'Vendors who want to liquidate inventory through LiquidateNow go through a straightforward onboarding process. They provide details about their merchandise — category, condition, quantity, photos, and pricing expectations. The LN team reviews the listing and, once approved, markets it to Via Trading\'s buyer network through the website, email campaigns, and direct outreach.',
  )
  b.paragraph(
    'This model works for vendors of all sizes. A small brand with a few pallets of overstock can list alongside a large retailer clearing thousands of units. LN handles the marketing and transaction logistics so the vendor can focus on their core business.',
  )

  // Why LN Complements Via Trading's Direct Programs
  b.heading("Why LN Complements Via Trading's Direct Programs", 3)
  b.paragraph(
    "LiquidateNow is not a competitor to Via Trading's wholesale programs — it is an extension of them. Together, they give the team a more complete inventory to offer buyers.",
  )
  b.bulletList([
    "<strong>Fills Product Gaps:</strong> Via's direct programs cover specific retail partners. LN brings in merchandise from vendors and brands that may not have a dedicated Via Trading program, expanding the product catalog.",
    '<strong>Unique & One-Time Lots:</strong> Some LN listings are one-time lots that would not fit into a structured ongoing program. These can include liquidations from business closures, seasonal clearance, or production overruns.',
    "<strong>Leverages the Buyer Network:</strong> Everything on LN benefits from Via Trading's network of 42,000+ business owners. The same team members who work with direct programs can also introduce buyers to relevant LN listings.",
  ])

  // Key Takeaway callout
  b.callout(
    'orange',
    'When a buyer asks for something that does not fit neatly into one of Via Trading\'s direct programs, check LiquidateNow. The broader vendor base, varied merchandise types, and the "Make an Offer" feature — which lets buyers negotiate below the listed price — mean there may be a listing that matches what they need. Think of LN as an extension of Via Trading\'s product catalog, not a separate platform.',
    'Key Takeaway',
  )

  // Additional resources
  b.additionalResources([
    {
      title: 'LiquidateNow Marketplace',
      url: 'https://www.liquidatenow.com/',
      source: 'LiquidateNow.com',
      description: 'Browse current LiquidateNow listings across all product categories.',
    },
    {
      title: 'Sell Your Inventory on LiquidateNow',
      url: 'https://www.liquidatenow.com/sell/',
      source: 'LiquidateNow.com',
      description: 'Information for vendors who want to list their excess inventory on LiquidateNow.',
    },
  ])

  return { courseId: COURSE_ID, moduleId: 'ln-offerings', content: b.build() }
}

// ─── Module 11: Product Knowledge Check (Quiz) ───────────

function productKnowledgeQuiz(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'product-knowledge-check',
    'Product Knowledge Check',
    'Test your understanding of Via Trading\'s product programs',
    'border-red-500',
    'ClipboardCheck',
  )

  b.paragraph(
    'This quiz covers all the key concepts from the Product Knowledge course. You need to score at least 85% to pass. Good luck!',
  )

  b.quizData({
    termMatch: productKnowledgeSectionedQuiz.termMatch,
    multipleChoice: productKnowledgeSectionedQuiz.multipleChoice.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    })),
    fillInBlank: productKnowledgeSectionedQuiz.fillInBlank.map((f) => ({
      id: f.id,
      sentence: f.sentence,
      blank: f.blank,
      options: f.options,
      correctIndex: f.correctIndex,
    })),
    passThreshold: 0.85,
    nextCourse: { id: 'sales-philosophy', title: 'Consultative Sales' },
  })

  return { courseId: COURSE_ID, moduleId: 'product-knowledge-check', content: b.build() }
}

// ─── Export all Course 3 entries ──────────────────────────

export function getCourse3Entries(): MigrationEntry[] {
  return [
    productOverview(),
    targetPrograms(),
    walmartPrograms(),
    homeDepotPrograms(),
    amazonPrograms(),
    wayfairPrograms(),
    zapposPrograms(),
    samsClubPrograms(),
    otherPrograms(),
    lnOfferings(),
    productKnowledgeQuiz(),
  ]
}
