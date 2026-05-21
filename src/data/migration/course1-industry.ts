/**
 * CMS Migration — Course 1: Intro to the Liquidation Industry
 * Converts 6 lesson modules + 1 quiz to PageContent format.
 */
import { ContentBuilder, resetUid } from './helpers'
import type { MigrationEntry } from './helpers'
import type { BadgeColor } from '../../types/blocks'
import { marketStats, salesChannels } from '../secondaryMarketData'
import { forwardPath, reversePath, dealerLevels, keyInsight } from '../reverseLogisticsData'
import { productConditions } from '../conditionsData'
import { loadTypes, loadTypesIntro } from '../loadTypesData'
import { buyerTypes, buyerTypesIntro } from '../buyerTypesData'
import { glossaryTerms, glossaryCategories } from '../glossaryData'
import {
  secondaryMarketTermMatch,
  reverseLogisticsFillBlanks,
  conditionsTermMatch,
  loadTypesFillBlanks,
  buyerTypesTermMatch,
} from '../modules/industry/inlineExercises'
import { industrySectionedQuiz } from '../modules/industry/courseQuiz'

const COURSE_ID = 'intro-to-industry'

// ─── Module 1: The Secondary Market ───────────────────────

function secondaryMarket(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'secondary-market',
    'The Secondary Market',
    'Understanding the ecosystem you\'re working in',
    'border-slate-500',
    'TrendingDown',
  )

  // What Is Liquidation?
  b.heading('What Is Liquidation?', 3)
  b.paragraph(
    'Before we get into the details, it helps to start with the big picture. <strong>Liquidation</strong> is the process by which unsold, returned, or excess merchandise from retailers and manufacturers is sold in bulk at deeply discounted prices. It is the umbrella term for an entire industry, and nearly everything you will learn in this training falls under it.',
  )
  b.paragraph(
    'When you hear people talk about the <strong>secondary market</strong>, they are referring to the network of businesses and channels where liquidated goods are bought and resold. When they mention <strong>reverse logistics</strong>, they mean the systems and processes that move returned or unsold products back through the supply chain to companies like Via Trading. <strong>Product conditions</strong> describe how those goods are categorized (new, used, damaged, and so on). <strong>Load types</strong> refer to how merchandise is grouped, sized, and shipped. And <strong>buyer types</strong> describe the different kinds of business owners who purchase liquidation merchandise and what they do with it.',
  )
  b.paragraph(
    'All of these concepts are pieces of the same puzzle. This course covers the liquidation industry from end to end. Each module ahead will explore one piece of this ecosystem so that by the time you finish, you will have a clear understanding of how the entire industry works and where Via Trading fits within it.',
  )

  // Why the Secondary Market Exists
  b.heading('Why the Secondary Market Exists', 3)
  b.paragraph(
    'Every year, major retailers like Walmart, Target, and Amazon generate millions of returned, unsold, and excess products. You might wonder why they don\'t just put returns back on the shelf. The short answer is economics. It is rarely cost-effective to inspect, repackage, and re-merchandise every returned item, especially at the enormous volume these retailers deal with daily. On top of that, warehouse space is expensive. For many retailers, the space those goods occupy is worth more than the inventory itself. Letting unsold or returned products sit in a warehouse costs money every single day.',
  )
  b.paragraph(
    'So instead of absorbing the loss, retailers sell these goods in bulk to <strong>liquidators</strong>, companies that specialize in purchasing surplus and returned merchandise at a deep discount and reselling it. That decision created an entire industry known as the <strong>secondary market</strong>, the network of businesses and channels where liquidated goods find new buyers and new life. Liquidation is technically a loss on the retailer\'s balance sheet, but it is far better than the alternative of destroying goods or paying indefinitely for storage. Retailers count on companies like Via Trading to take that inventory off their hands quickly, recover some value, and free up warehouse space for fresh products.',
  )
  b.paragraph(
    'The scale is staggering. American retailers generate an estimated <strong>$221 billion in returns annually</strong> (IHL Group). And that figure only covers customer returns. It doesn\'t include <strong>New Overstock</strong> (excess inventory that never sold), seasonal clearance, or products pulled from shelves due to packaging changes. When you add it all up, the secondary market represents one of the largest and least-understood sectors in retail.',
  )
  b.paragraph(
    'Here\'s how it works in practice: liquidators like Via Trading purchase this merchandise in bulk, sometimes entire truckloads at a time, and make it available to business owners at a fraction of the original retail price. It\'s a win for everyone involved. Retailers recover value from goods they\'d otherwise write off. Business owners get name-brand merchandise at steep discounts. And end consumers get access to affordable products. Along the way, goods that might have ended up in a landfill get a second life, which, in a world increasingly focused on sustainability, matters more than ever.',
  )
  b.paragraph(
    'How steep are the discounts? Liquidation merchandise is typically sold at a fraction of the original retail price. In many cases, the per-unit cost to the buyer is <strong>lower than the manufacturer\'s production cost</strong>, and often even cheaper than sourcing equivalent goods directly from overseas factories. That pricing dynamic is what makes the liquidation business model so attractive to entrepreneurs and business owners around the world.',
  )

  // Stat highlight
  b.statGrid(2, [
    { icon: 'TrendingUp', value: marketStats.annualValue, label: 'Combined annual value of merchandise retailers need to liquidate' },
    { icon: 'RotateCcw', value: marketStats.returnRate, label: 'Average retail return rate' },
  ])

  // How Goods Reach Liquidation
  b.heading('How Goods Reach Liquidation', 3)
  b.paragraph(
    'Products enter the secondary market through several different paths. Customer returns are the most well-known source, but they are far from the only one. Here are the most common routes merchandise takes to reach a liquidator like Via Trading.',
  )
  b.flowDiagram('Path 1: Customer Returns', ['Consumer Returns Item', 'Retailer', 'Return Processing Center', 'Liquidator', 'Secondary Market'], 'bg-blue-600', 3)
  b.flowDiagram('Path 2: Excess Inventory', ['Manufacturer Overproduces', 'Distributor/Retailer Can\'t Sell', 'Liquidator', 'Secondary Market'], 'bg-emerald-600', 2)
  b.flowDiagram('Path 3: Shelf Pulls', ['Product Sits on Shelf', 'Store Pulls for New Stock', 'Liquidator', 'Secondary Market'], 'bg-amber-600', 2)
  b.flowDiagram('Path 4: Business Closure', ['Company Closes / Downsizes', 'Needs to Clear Inventory', 'Liquidator', 'Secondary Market'], 'bg-rose-600', 2)

  // Where Secondary Market Goods Get Sold
  b.heading('Where Secondary Market Goods Get Sold', 3)
  b.iconCardGrid(
    3,
    salesChannels.map((ch) => ({
      icon: ch.icon as string,
      title: ch.name,
      description: ch.description,
    })),
  )

  // A Growing Industry
  b.heading('A Growing Industry', 3)
  b.paragraph(
    'The secondary market continues to grow as more business owners discover the opportunity. Traditional channels like flea markets, swap meets, and discount stores remain strong, but they now share the landscape with rapidly expanding new formats. <strong>Online sellers</strong> on platforms like Amazon, eBay, Whatnot, and Poshmark represent one of the fastest-growing segments. <strong>Bin stores</strong>, retail locations where shoppers dig through bins of discounted merchandise on a weekly markdown schedule, have exploded in popularity across the country. Even large established retailers like Staples are beginning to add bin store sections to their locations, recognizing the value in the secondary market. Meanwhile, <strong>exporters</strong> continue to ship container loads of liquidation goods to markets in Latin America, Africa, the Middle East, and beyond.',
  )
  b.paragraph(
    'Liquidation is never the first choice for a retailer since it represents a loss compared to full-price sales, but it is a necessary part of doing business at scale. As e-commerce continues to drive higher return rates and retailers face increasing pressure to manage excess inventory efficiently, the demand for professional liquidation partners only grows. Companies like Via Trading help retailers recover as much value as possible while freeing up valuable warehouse space. New channels, technologies, and buyer demographics continue to reshape how liquidation merchandise moves from retailers to end consumers.',
  )

  // Images
  b.inlineImage('course-2-via-trading.jpg', 'Via Trading\'s booth at the ASD Market Week trade show', 'left', 'medium', 'Via Trading at ASD Market Week')
  b.inlineImage('course-1-industry.jpg', 'A live liquidation auction at Via Trading\'s warehouse', 'right', 'medium', 'Live auction at Via Trading\'s warehouse')

  // Why This Matters callout
  b.callout('orange', marketStats.whyItMatters, 'Why This Matters')

  // Inline exercise
  b.termMatch(secondaryMarketTermMatch, 'Quick Check: Match the Terms')

  // Additional resources
  b.additionalResources([
    {
      title: 'Why Via Trading? Learn Why You Should Work With Us',
      url: 'https://www.viatrading.com/why-via-trading/',
      source: 'ViaTrading.com',
      description: 'An overview of Via Trading\'s position in the secondary market and what sets them apart.',
    },
    {
      title: 'How to Start a Liquidation Business',
      url: 'https://www.viatrading.com/blog/how-to-start-a-liquidation-business/',
      source: 'Via Trading Blog',
      description: 'A beginner\'s guide to entering the liquidation industry as a business owner.',
    },
    {
      title: 'What is Liquidation? A Complete Guide',
      url: 'https://www.viatrading.com/blog/what-is-liquidation/',
      source: 'Via Trading Blog',
      description: 'A comprehensive introduction to liquidation, how it works, and why the industry continues to grow.',
    },
  ])

  return { courseId: COURSE_ID, moduleId: 'secondary-market', content: b.build() }
}

// ─── Module 2: Reverse Logistics ──────────────────────────

function reverseLogistics(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'reverse-logistics',
    'Reverse Logistics: How Goods Flow',
    'Understanding the journey from retailer shelf to liquidation',
    'border-indigo-500',
    'ArrowLeftRight',
  )

  // What Is Reverse Logistics?
  b.heading('What Is Reverse Logistics?', 3)
  b.paragraph(
    'In traditional retail, goods flow in one direction: manufacturer to distributor to retailer to consumer. That\'s <strong>forward logistics</strong>, the supply chain most people picture when they think about how products reach store shelves. But what happens when a consumer returns something? Or when a retailer has 10,000 units of last season\'s inventory gathering dust in a warehouse? The product needs to flow backward through the system, and that process is called <strong>reverse logistics</strong>.',
  )
  b.paragraph(
    'Returns are not a small problem. In the United States alone, consumers return hundreds of billions of dollars worth of merchandise every year. Retailers can\'t realistically inspect, repackage, and reshelve every single item. The labor costs alone would erase any value they\'d recover. Instead, returned goods are aggregated at <strong>return processing centers</strong>, sorted into broad categories (electronics, apparel, home goods, etc.), palletized, and then sold to <strong>Level 1 dealers</strong> like Via Trading. From there, the merchandise flows outward again, this time into the secondary market.',
  )
  b.paragraph(
    'As a <strong>Level 1 dealer</strong>, Via Trading holds direct contracts with major retailers. This is a critical distinction for our buyers: when you purchase from Via, you\'re getting merchandise as close to the original source as possible, with no middleman markup, no mystery about where the goods came from. That direct relationship is one of Via Trading\'s strongest competitive advantages, and it\'s worth emphasizing in every sales conversation.',
  )

  // Flow diagrams
  b.flowDiagram('Forward Logistics (Normal Path)', forwardPath, 'bg-emerald-600')
  b.flowDiagram('Reverse Logistics (Liquidation Path)', reversePath, 'bg-indigo-600', 3)

  // The Dealer Levels
  b.heading('The Dealer Levels', 3)
  b.expandableCardGroup(
    dealerLevels.map((level) => ({
      id: `dealer-level-${level.level}`,
      title: level.title,
      subtitle: level.example,
      badge: level.highlight ? { text: 'Via Trading', color: 'indigo' as const } : undefined,
      accentColor: 'border-indigo-500',
      content: `<p>${level.description}</p>`,
    })),
  )

  // Key insight
  b.callout('info', keyInsight, 'Key Sales Insight')

  // Inline exercise
  b.fillInBlank(reverseLogisticsFillBlanks, 'Quick Check: Complete the Sentences')

  // Additional resources
  b.additionalResources([
    {
      title: 'How Does Via Trading Source Its Inventory?',
      url: 'https://www.viatrading.com/blog/how-does-via-trading-source-its-inventory/',
      source: 'Via Trading Blog',
      description: 'Learn how Via Trading sources inventory directly from major retailers through the reverse logistics pipeline.',
    },
    {
      title: 'Understanding Liquidation Merchandise Conditions',
      url: 'https://www.viatrading.com/blog/understanding-liquidation-merchandise-conditions/',
      source: 'Via Trading Blog',
      description: 'How product condition relates to how goods move through the reverse logistics process.',
    },
  ])

  return { courseId: COURSE_ID, moduleId: 'reverse-logistics', content: b.build() }
}

// ─── Module 3: Product Conditions ─────────────────────────

function productConditionsModule(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'product-conditions',
    'Product Conditions',
    'Via Trading\'s condition categories for liquidation merchandise',
    'border-amber-600',
    'Tags',
  )

  // Why Conditions Matter
  b.heading('Why Conditions Matter', 3)
  b.paragraph(
    'Understanding product conditions is one of the most important skills in the liquidation business. Condition directly determines pricing, expectations, and the amount of work required to resell. Consider the difference between a case of cosmetics that is factory-sealed and has never been opened, versus a product that has been out of the box and handled by consumers. Even if the retail value on paper looks similar, these are very different products with very different levels of risk and effort involved.',
  )
  b.paragraph(
    'The key thing to remember is that within any condition category, there is a range. Even factory-sealed goods can arrive with damaged boxes, cosmetic wear, or rust depending on how they were stored and transported. A single pallet of merchandise pulled from retail shelves might contain items in pristine condition alongside others with minor shelf wear or damaged packaging. No two loads are exactly alike, even when they carry the same condition label.',
  )
  b.paragraph(
    'Whether you are working with a buyer, a vendor, a truck driver, or a bank, Via Trading\'s values of honesty, integrity, and transparency should carry through every interaction. Accurately describing product conditions so that people know what to expect before they commit is a big part of why Via Trading has built long-term relationships with repeat customers. In an industry where others sometimes over-promise and under-deliver, telling it like it is builds real trust.',
  )

  // Expandable cards for each condition
  b.expandableCardGroup(
    productConditions.map((c) => ({
      id: c.id,
      title: c.name,
      badge: { text: c.name, color: c.colorClass as BadgeColor },
      accentColor: 'border-amber-500',
      content: `<div class="space-y-3"><div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">Definition</p><p>${c.definition}</p></div><div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">What to Expect</p><p>${c.whatToExpect}</p></div><div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-1">Key Considerations</p><p>${c.buyerAppeal}</p></div></div>`,
    })),
  )

  // Inline exercise
  b.termMatch(conditionsTermMatch, 'Quick Check: Match the Conditions')

  return { courseId: COURSE_ID, moduleId: 'product-conditions', content: b.build() }
}

// ─── Module 4: Shipping Terms (Load Types) ────────────────

function shippingTerms(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'shipping-terms',
    'Shipping Terms',
    'Standard lot sizes, shipping formats, and logistics terminology',
    'border-emerald-600',
    'Package',
  )

  b.paragraph(loadTypesIntro)

  // Context
  b.paragraph(
    'Understanding lot sizes is essential for anyone at Via Trading. Whether coordinating a shipment, helping a business owner choose the right format, or managing warehouse inventory, you will encounter these terms regularly. The right lot size depends on the buyer\'s budget, storage capacity, business model, and experience level.',
  )
  b.paragraph(
    'Via Trading has no minimum order, so business owners can start with a single <strong>case</strong> for a few hundred dollars and scale up to full <strong>truckloads</strong> worth tens of thousands. This flexibility is one of Via\'s biggest advantages, especially for new business owners who want to test the model without a massive upfront investment.',
  )

  // Domestic lot types
  b.heading('Domestic Lot Sizes', 3)
  const domesticTypes = loadTypes.filter((t) => t.id !== 'container')
  b.expandableCardGroup(
    domesticTypes.map((type) => ({
      id: type.id,
      title: type.name,
      subtitle: type.description,
      icon: type.icon,
      accentColor: 'border-emerald-500',
      content: `<p>${type.details}</p>`,
    })),
  )

  // Common Pallet Formats
  b.heading('Common Pallet Formats', 3)
  b.paragraph(
    'Pallets come in several different formats. Understanding these differences matters because the format affects how merchandise is received, sorted, and resold.',
  )
  b.iconCardGrid(2, [
    { icon: 'Package', title: 'Standard Pallet', description: 'Wooden 40"x48" base with merchandise stacked and shrink-wrapped on top.' },
    { icon: 'Archive', title: 'Gaylord', description: 'Large corrugated cardboard box (typically 40"x48"x48") placed on a pallet. Common for unsorted Customer Returns.' },
    { icon: 'Layers', title: 'Palletized Cases', description: 'Individual case packs neatly stacked on a pallet, offering organized, category-specific lots.' },
    { icon: 'LayoutGrid', title: 'Watermelon Bin', description: 'Large open-top bin on a pallet, used for bulk unsorted merchandise.' },
  ])

  // Truckload Capacity
  b.heading('Truckload Capacity & Pinwheeling', 3)
  b.paragraph(
    'A standard <strong>53-foot trailer</strong> holds <strong>26 pallets</strong> when loaded straight. However, if pallets are <strong>pinwheeled</strong> (rotated to alternate orientations, with some turned sideways), a 53-footer can fit up to <strong>28 pallets</strong>. A <strong>48-foot trailer</strong> holds <strong>22 pallets</strong> standard.',
  )
  b.paragraph(
    'These numbers assume standard <strong>8-foot tall pallets</strong>. Shorter pallets can be <strong>double-stacked</strong>, effectively doubling the capacity of the trailer.',
  )
  b.statGrid(2, [
    { icon: 'Truck', value: '48 ft', label: '22 pallets standard' },
    { icon: 'Truck', value: '53 ft', label: '26 standard / 28 pinwheeled' },
  ])
  b.inlineImage('module-load-types.png', 'Sample hand-loaded trucks from Via Trading\'s facility', 'none', 'large', 'Sample hand-loaded trucks from Via Trading\'s facility')

  // Ocean Containers
  const containerType = loadTypes.find((t) => t.id === 'container')
  if (containerType) {
    b.heading('International Shipping: Ocean Containers', 3)
    b.paragraph(`<strong>${containerType.name}</strong> — ${containerType.description}`)
    b.paragraph(containerType.details)
    b.paragraph('<strong>Hand-loading:</strong> Containers can also be hand-loaded (without pallets) to significantly increase capacity, sometimes by 2 to 3 times. Whether a container is hand-loaded depends on the merchandise type, destination, and the business owner\'s preferences.')
  }

  // Key Shipping Terms
  b.heading('Key Shipping Terms', 3)
  b.paragraph('You will encounter these terms regularly when discussing logistics with business owners and coordinating shipments.')
  b.iconCardGrid(2, [
    { icon: 'MapPin', title: 'FOB (Freight on Board)', description: 'Indicates the location where merchandise is available for pickup or shipping. Helps business owners calculate freight costs and also reveals whether a transaction is direct or brokered.' },
    { icon: 'FileText', title: 'BOL (Bill of Lading)', description: 'Shipping paperwork that accompanies a delivery. The recipient signs the BOL upon receipt. Always inspect shipments and note any visible damage on the BOL before signing.' },
    { icon: 'ArrowDown', title: 'Lift-Gate', description: 'A hydraulic platform at the rear of a delivery truck used to lower pallets to ground level. Required when there is no loading dock or forklift. Typically carries an additional surcharge.' },
    { icon: 'Building2', title: 'Loading Dock', description: 'A raised platform at a warehouse or business where trucks back up to unload. Without a dock, a lift-gate is needed for pallet deliveries.' },
    { icon: 'Layers', title: 'Double-Stacked', description: 'Placing one pallet on top of another inside a truck or container to maximize capacity. Only possible with shorter pallets that fit within height limits.' },
    { icon: 'Calculator', title: 'Landed Cost', description: 'The total cost of merchandise including purchase price plus all costs to receive it: shipping, customs fees, taxes, and any other charges. Essential for calculating true profit margins.' },
    { icon: 'Truck', title: 'Direct Shipment', description: 'A shipment sent directly from the retailer\'s facility to the buyer, without stopping at Via Trading\'s warehouse. This can reduce transit time and handling.' },
  ])
  b.inlineImage('liftgate.jpg', 'A hydraulic lift-gate on the rear of a delivery truck', 'none', 'medium', 'Lift-gate on a delivery truck')

  // Upcoming course note
  b.callout('info', 'This module covers the basics of shipping terminology and lot sizes. A more in-depth <strong>Shipping & Logistics</strong> course will go deeper into freight management, costs, carrier selection, and best practices.')

  // Inline exercise
  b.fillInBlank(loadTypesFillBlanks, 'Quick Check: Complete the Sentences')

  // Additional resources
  b.additionalResources([
    {
      title: 'How to Minimize Your Wholesale Shipping Costs',
      url: 'https://www.viatrading.com/how-to-minimize-your-wholesale-shipping-costs/',
      source: 'ViaTrading.com',
      description: 'Practical tips for reducing freight costs, including landed cost calculations and lot size strategies.',
    },
    {
      title: 'Shipping Information for the Wholesale Liquidation Industry',
      url: 'https://www.viatrading.com/shipping-information/',
      source: 'ViaTrading.com',
      description: 'Detailed shipping options, container sizes, and delivery logistics for liquidation buyers.',
    },
    {
      title: 'Glossary of Industry Terms',
      url: 'https://www.viatrading.com/glossary-of-industry-terms/',
      source: 'ViaTrading.com',
      description: 'Comprehensive glossary covering packing, shipping, industry, and payment terminology.',
    },
  ])

  return { courseId: COURSE_ID, moduleId: 'shipping-terms', content: b.build() }
}

// ─── Module 5: Buyer Types ────────────────────────────────

function buyerTypesModule(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'buyer-types',
    'Who Buys Liquidation Goods?',
    'A wide range of businesses and individuals participate in the secondary market',
    'border-sky-500',
    'Users',
  )

  b.paragraph(buyerTypesIntro)

  b.paragraph(
    'Via Trading has served over <strong>42,000 customers</strong> across <strong>129+ countries</strong>. There is no single buyer profile. The types shown below are the most common, but many business owners use combinations of these approaches or something entirely different. A flea market vendor might also sell online. An exporter might run a discount store in another country.',
  )
  b.paragraph(
    'Liquidation is becoming more mainstream every year. Even large established retailers like <strong>Staples</strong> are starting to add bin store sections to their stores, recognizing the value in the secondary market. The industry continues to grow as more businesses discover the opportunity.',
  )
  b.paragraph(
    'At Via Trading, our philosophy is simple: <strong>there is no reason we should not be able to work with anyone</strong>. Whether someone is buying a single pallet or filling containers every week, we are here to help them succeed.',
  )

  // Expandable cards for each buyer type
  b.expandableCardGroup(
    buyerTypes.map((buyer) => ({
      id: buyer.id,
      title: buyer.name,
      subtitle: buyer.shortDescription,
      icon: buyer.icon,
      accentColor: 'border-sky-500',
      content: `<div class="space-y-4"><div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-2">What They Care About</p><ul class="space-y-1">${buyer.whatTheyCareAbout.map((item) => `<li>• ${item}</li>`).join('')}</ul></div><div><p class="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-2">How to Spot Them</p><ul class="space-y-1">${buyer.identifyingSignals.map((s) => `<li>• ${s}</li>`).join('')}</ul></div></div>`,
    })),
  )

  b.callout(
    'info',
    'The categories above represent the most common types of businesses we work with, but they are far from exhaustive. Many buyers operate across multiple categories simultaneously. An online seller might also run a booth at a local flea market. A discount store owner might export to family overseas. The liquidation industry attracts creative, entrepreneurial people who find unique ways to build their businesses. At Via Trading, we are here to support all of them.',
    'Keep in Mind',
  )

  // Inline exercise
  b.termMatch(buyerTypesTermMatch, 'Quick Check: Match the Buyer Types')

  // Additional resources
  b.additionalResources([
    {
      title: 'Top 10 Places to Sell Liquidation Merchandise',
      url: 'https://www.viatrading.com/blog/top-10-places-to-sell-liquidation-merchandise/',
      source: 'Via Trading Blog',
      description: 'Explore the most popular sales channels that liquidation buyers use to resell merchandise.',
    },
    {
      title: 'How to Start a Bin Store Business',
      url: 'https://www.viatrading.com/blog/how-to-start-a-bin-store-business/',
      source: 'Via Trading Blog',
      description: 'A guide to one of the fastest-growing buyer segments in the liquidation industry.',
    },
  ])

  return { courseId: COURSE_ID, moduleId: 'buyer-types', content: b.build() }
}

// ─── Module 6: Key Terminology (Glossary) ─────────────────

function glossary(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'glossary',
    'Key Terminology',
    'Searchable glossary of liquidation industry terms',
    'border-rose-500',
    'BookOpen',
  )

  b.paragraph(
    'The liquidation industry has its own language. Some of these terms overlap with general business vocabulary, but many have specific meanings in the context of the <strong>secondary market</strong>. As you work with buyers and internal teams, you\'ll use these terms daily. Don\'t worry about memorizing everything right away; think of this as a reference you can come back to anytime.',
  )

  // Group terms by category — use expandable card groups
  for (const category of glossaryCategories) {
    const terms = glossaryTerms.filter((t) => t.category === category)
    if (terms.length === 0) continue

    b.heading(category, 3)
    b.expandableCardGroup(
      terms.map((term) => ({
        id: term.id,
        title: term.term,
        content: `<p>${term.definition}</p>${term.details ? `<p class="text-xs text-via-text-light mt-1.5">${term.details}</p>` : ''}`,
      })),
    )
  }

  return { courseId: COURSE_ID, moduleId: 'key-terminology', content: b.build() }
}

// ─── Module 7: Industry Knowledge Check (Quiz) ────────────

function industryQuiz(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'industry-knowledge-check',
    'Industry Knowledge Check',
    'Test your understanding of the liquidation industry',
    'border-blue-500',
    'ClipboardCheck',
  )

  b.paragraph(
    'This quiz covers all the key concepts from the Intro to the Liquidation Industry course. You need to score at least 85% to pass. Good luck!',
  )

  b.quizData({
    termMatch: industrySectionedQuiz.termMatch,
    multipleChoice: industrySectionedQuiz.multipleChoice.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    })),
    fillInBlank: industrySectionedQuiz.fillInBlank.map((f) => ({
      id: f.id,
      sentence: f.sentence,
      blank: f.blank,
      options: f.options,
      correctIndex: f.correctIndex,
    })),
    passThreshold: 0.85,
    nextCourse: { id: 'who-is-via', title: 'Who Is Via Trading' },
  })

  return { courseId: COURSE_ID, moduleId: 'industry-knowledge-check', content: b.build() }
}

// ─── Export all Course 1 entries ───────────────────────────

export function getCourse1Entries(): MigrationEntry[] {
  return [
    secondaryMarket(),
    reverseLogistics(),
    productConditionsModule(),
    shippingTerms(),
    buyerTypesModule(),
    glossary(),
    industryQuiz(),
  ]
}
