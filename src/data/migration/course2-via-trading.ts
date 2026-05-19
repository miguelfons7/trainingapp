/**
 * CMS Migration — Course 2: Who Is Via Trading
 * Converts 6 lesson modules + 1 quiz to PageContent format.
 */
import { ContentBuilder, resetUid } from './helpers'
import type { MigrationEntry } from './helpers'
import {
  companyStory,
  keyFacts,
  teamHighlights,
  coreValues,
  retailerPartners,
} from '../companyData'
import { advantages } from '../advantagesData'
import {
  ourStoryFillBlanks,
  missionValuesTermMatch,
  platformsTermMatch,
  whyViaFillBlanks,
} from '../modules/via-trading/inlineExercises'
import { viaSectionedQuiz } from '../modules/via-trading/courseQuiz'

const COURSE_ID = 'who-is-via'

// ─── Module 1: Our Story (CompanyOverview.tsx) ────────────

function ourStory(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'who-is-via',
    'Our Story',
    'How Via Trading grew from a small warehouse to an industry leader',
    'border-via-orange',
    'Building2',
  )

  // Company logo
  b.inlineImage('viatrading-logo-dark.svg', 'Via Trading Corporation', 'none', 'medium')

  // Via Trading Corporation Umbrella
  b.heading('Via Trading Corporation', 3)
  b.paragraph(
    'Via Trading Corporation is the parent umbrella company that houses three operating entities, with more branches on the way:',
  )
  b.bulletList([
    '<strong>Via Trading</strong> — The core wholesale liquidation business. Via Trading buys excess and returned merchandise from major retailers and sells it to business owners around the world. Over two decades, it has built a massive buyer network spanning 129+ countries.',
    '<strong>LiquidateNow</strong> — A consignment-based liquidation platform that leverages Via Trading\'s established buyer network and marketing infrastructure. Retailers and manufacturers list their inventory, and LiquidateNow connects them directly with qualified buyers.',
    '<strong>WeSolveReturns</strong> — A return center solution for brands that do not have their own returns infrastructure. WeSolveReturns processes and generates revenue from returned merchandise, which is then sold through Via Trading\'s marketplace.',
  ], 'orange')

  // Founding Story
  b.heading('How It All Started', 3)
  b.paragraph(companyStory.founding)
  b.paragraph(companyStory.growth)
  b.paragraph(
    'Via Trading\'s journey is a real <strong>bootstrap story</strong>. In 2002, four people in a 6,000 square-foot warehouse on Pico Boulevard in Los Angeles had an idea: what if they could buy excess merchandise from retailers and resell it? Within two years, they had outgrown that space and moved to a 24,000 sq ft facility on Saturn Avenue. By 2005, they needed 65,000 sq ft on Alameda Street. And by 2008, Via Trading moved into its current home, a massive facility on <strong>Industry Way in Lynwood, California</strong> that has grown to 250,000 square feet of physical space and over 550,000 square feet with rack space.',
  )
  b.paragraph(
    'Today, approximately <strong>800 pallets</strong> pass through the facility every day. Over <strong>10,000 pallets</strong> are in stock at any given time. Business owners can walk in Monday through Friday, inspect merchandise in person, and purchase on the spot, no appointment needed.',
  )

  // Growth Timeline
  b.heading('Growth Timeline', 3)
  b.flowDiagram(
    'Warehouse Growth Timeline',
    [
      '2002 — Pico Blvd, LA (6,000 sq ft)',
      '2004 — Saturn Ave (24,000 sq ft)',
      '2005 — Alameda St (65,000 sq ft)',
      '2008 — Industry Way, Lynwood (250,000 sq ft)',
      'Today — Expanded (550,000+ sq ft with rack space)',
    ],
    'bg-orange-600',
  )

  // Warehouse aerial photo
  b.inlineImage(
    'Warehouse aerial.png',
    'Aerial view of Via Trading\'s 250,000 sq ft warehouse in Lynwood, California',
    'none',
    'large',
    'Via Trading\'s 250,000 sq ft warehouse in Lynwood, California',
  )

  // Key Facts
  b.heading('Key Facts', 3)
  b.statGrid(
    4,
    keyFacts.map((fact) => ({
      icon: fact.icon as string,
      value: fact.value,
      label: fact.label,
    })),
  )

  // Team Highlights
  b.heading('Team Highlights', 3)
  b.bulletList(teamHighlights, 'orange')

  // Inline exercise
  b.fillInBlank(ourStoryFillBlanks, 'Quick Check: Complete the Sentences')

  return { courseId: COURSE_ID, moduleId: 'our-story', content: b.build() }
}

// ─── Module 2: Mission & Values (MissionValues.tsx) ──────

function missionValues(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'mission-values',
    'Mission & Values',
    'The principles that guide everything we do at Via Trading',
    'border-via-orange',
    'Star',
  )

  // Mission Statement
  b.callout('orange', `"${companyStory.mission}"`, 'Our Mission')

  // Empowering Business Owners
  b.paragraph(
    'At its core, Via Trading believes in <strong>empowering business owners</strong> to build their own enterprises. Whether someone is buying their first case pack or filling a container for export, Via exists to give them the tools, inventory, and support they need to succeed. This belief in the American dream, that anyone with determination can build something meaningful, drives every decision the company makes.',
  )

  // Values Intro
  b.paragraph(
    'Values are not just words on a wall at Via Trading. They are how business gets done every day. In an industry that has historically lacked <strong>transparency</strong> and <strong>standardization</strong>, Via made a deliberate choice to operate differently. These three principles are not just aspirational; they are the reason over <strong>90% of Via\'s sales</strong> come from repeat customers.',
  )

  // Core Values
  b.heading('Core Values', 3)
  b.iconCardGrid(
    3,
    coreValues.map((value) => ({
      icon: value.name === 'Honesty' ? 'Heart' : value.name === 'Integrity' ? 'Shield' : 'Eye',
      title: value.name,
      description: value.description,
    })),
  )

  // What This Means in Practice
  b.heading('What This Means in Practice', 3)
  b.bulletList([
    '<strong>Honesty in Every Interaction</strong> — We accurately describe product conditions and set realistic expectations. If a load contains 15% compromised items, we say so upfront. Transparency is not a sales tactic; it is how we operate across every department and every conversation.',
    '<strong>Integrity in Every Commitment</strong> — We honor our commitments. If we promise a delivery date or a specific product mix, we follow through. Our 90%+ repeat business rate is proof this approach works.',
    '<strong>Transparency in Every Process</strong> — Manifested loads, clear condition descriptions, and open communication. Business owners know exactly what they are getting before committing to a purchase.',
  ])

  // Inline exercise
  b.termMatch(missionValuesTermMatch, 'Quick Check: Match the Values')

  return { courseId: COURSE_ID, moduleId: 'mission-values', content: b.build() }
}

// ─── Module 3: Our Platforms (OurPlatforms.tsx) ──────────

function ourPlatforms(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'our-platforms',
    'Our Platforms',
    'How Via Trading Corporation\'s three platforms work together',
    'border-via-orange',
    'Globe',
  )

  // Platform Overview
  b.inlineImage('inline-ecommerce.jpg', 'E-commerce platform', 'right', 'small', 'Reaching buyers worldwide')
  b.paragraph(
    'Via Trading Corporation operates three distinct platforms, each serving a different part of the liquidation ecosystem. Understanding how they connect is important for every employee, regardless of your role. Everything is powered by <strong>Via Trading</strong>, the wholesale liquidation company that established the buyer network and marketplace that makes the other two platforms possible.',
  )

  // Corporate Structure
  b.heading('Corporate Structure', 3)
  b.paragraph(
    'Via Trading, the wholesale liquidation company, is the engine that powers the entire ecosystem. Its buyer network and marketplace infrastructure are what make LiquidateNow and WeSolveReturns possible.',
  )
  b.iconCardGrid(3, [
    {
      icon: 'ShoppingCart',
      title: 'ViaTrading.com',
      description: 'Wholesale Liquidation',
    },
    {
      icon: 'DollarSign',
      title: 'LiquidateNow.com',
      description: 'Consignment Platform',
    },
    {
      icon: 'RotateCcw',
      title: 'WeSolveReturns.com',
      description: 'Return Center Solution',
    },
  ])

  // The Three Platforms
  b.heading('The Three Platforms', 3)

  // ViaTrading.com
  b.expandableCardGroup([
    {
      id: 'platform-viatrading',
      title: 'ViaTrading.com',
      subtitle: 'Wholesale Liquidation Marketplace',
      icon: 'ShoppingCart',
      accentColor: 'border-blue-500',
      content:
        '<p>The flagship platform and the foundation of the entire Via Trading ecosystem. ViaTrading.com is where business owners browse and purchase liquidation merchandise by category, condition, and load type. Over two decades, this platform has built a buyer network spanning 129+ countries, and that network powers everything else Via Trading does.</p>',
    },
    {
      id: 'platform-liquidatenow',
      title: 'LiquidateNow.com',
      subtitle: 'Consignment-Based Liquidation Platform',
      icon: 'DollarSign',
      accentColor: 'border-orange-500',
      content:
        '<p>LiquidateNow leverages Via Trading\'s established buyer network and marketing infrastructure to help businesses liquidate their merchandise on a consignment basis. Instead of Via Trading purchasing the inventory outright, retailers and manufacturers list their goods and LiquidateNow connects them directly with qualified business owners. This gives vendors more control over pricing while giving them access to Via Trading\'s massive reach.</p>',
    },
    {
      id: 'platform-wesolvereturns',
      title: 'WeSolveReturns.com',
      subtitle: 'Return Center Solution',
      icon: 'RotateCcw',
      accentColor: 'border-emerald-500',
      content:
        '<p>WeSolveReturns acts as a return center for brands and companies that do not have their own returns infrastructure. Rather than letting returns pile up or writing them off as a loss, WeSolveReturns processes those returns and offers companies a way to make money on them. The recovered merchandise is then sold through Via Trading\'s marketplace, completing the cycle.</p>',
    },
  ])

  // How They Connect
  b.heading('How They Connect', 3)
  b.paragraph(
    '<strong>ViaTrading.com</strong> is the foundation. It established the massive buyer network of business owners who purchase liquidation goods. Without this network, the other platforms would not exist.',
  )
  b.paragraph(
    '<strong>LiquidateNow.com</strong> leverages that same buyer network and Via Trading\'s marketing platform to help businesses liquidate their merchandise on a consignment basis. Vendors list their inventory, and LiquidateNow puts it in front of Via Trading\'s global audience.',
  )
  b.paragraph(
    '<strong>WeSolveReturns.com</strong> acts as a return center for brands that do not have their own returns solution. It processes their returns, recovers value from the merchandise, and feeds that inventory back into Via Trading\'s marketplace for resale.',
  )
  b.paragraph(
    '<em>Each platform feeds into and strengthens the others. The upcoming LiquidateNow and WeSolveReturns modules in this course will go deeper into how each one works.</em>',
  )

  // Major Retailer Partners
  b.heading('Major Retailer Partners', 3)
  b.bulletList(
    retailerPartners.map((partner) => partner),
  )

  // Inline exercise
  b.termMatch(platformsTermMatch, 'Quick Check: Match the Platforms')

  return { courseId: COURSE_ID, moduleId: 'our-platforms', content: b.build() }
}

// ─── Module 4: LiquidateNow (LiquidateNow.tsx) ──────────

function liquidateNow(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'liquidatenow',
    'LiquidateNow',
    'Consignment-based liquidation powered by Via Trading\'s buyer network',
    'border-orange-500',
    'DollarSign',
  )

  // LN logo
  b.inlineImage('liquidatenow-logo.png', 'LiquidateNow — Powered by Via Trading', 'none', 'medium')

  // What Is LiquidateNow?
  b.heading('What Is LiquidateNow?', 3)
  b.paragraph(
    '<strong>LiquidateNow.com</strong> is a consignment-based liquidation platform operated under the Via Trading Corporation umbrella. It exists to help businesses liquidate their excess, returned, or unwanted merchandise without having to sell it at a steep upfront discount to a liquidator.',
  )
  b.paragraph(
    'Instead of Via Trading purchasing the inventory outright (which is how the traditional wholesale model works), LiquidateNow allows vendors to list their merchandise and set their own pricing expectations. LiquidateNow then markets that inventory to Via Trading\'s massive network of business owners around the world. When the goods sell, the vendor gets paid. It is a more flexible option for companies that want more control over how their inventory is priced and sold.',
  )

  // How It Works
  b.heading('How It Works', 3)
  b.flowDiagram(
    'How Consignment Works on LiquidateNow',
    ['Vendor Lists Inventory', 'LiquidateNow Markets It', 'Buyer Purchases', 'Vendor Gets Paid'],
    'bg-orange-600',
    1,
  )
  b.bulletList([
    '<strong>Vendor Lists Inventory</strong> — A retailer, manufacturer, or business with excess inventory lists their goods on LiquidateNow. They provide details about the merchandise, including category, condition, and quantity.',
    '<strong>LiquidateNow Markets It</strong> — This is where Via Trading\'s buyer network becomes the key advantage. LiquidateNow puts the inventory in front of 42,000+ business owners across 129+ countries using Via Trading\'s marketing platform, email campaigns, and direct Account Manager outreach.',
    '<strong>Buyer Purchases, Vendor Gets Paid</strong> — When a business owner purchases the inventory, LiquidateNow handles the transaction and the vendor receives payment. The vendor benefits from Via Trading\'s reach without having to find individual buyers themselves.',
  ], 'orange')

  // Why LiquidateNow Matters
  b.heading('Why LiquidateNow Matters', 3)
  b.paragraph(
    'Traditional liquidation typically works one way: a liquidator buys everything at a deep discount and the retailer moves on. That model works well in many cases, and it is the foundation of Via Trading\'s wholesale business. But not every company wants to sell at rock-bottom prices. Some vendors have merchandise that holds more value and they want more say in how it is priced.',
  )
  b.paragraph(
    'LiquidateNow gives those vendors an alternative. By tapping into Via Trading\'s existing buyer network and marketing infrastructure, vendors get access to a massive audience without having to build their own sales channel. It is a win for the vendor (better pricing) and a win for business owners (more inventory to choose from).',
  )

  // Connection to Via Trading
  b.callout(
    'orange',
    'LiquidateNow would not exist without Via Trading\'s wholesale liquidation business. The buyer network, marketing platform, and industry relationships that Via Trading built over 20+ years are what make LiquidateNow possible. Everything is connected.',
    'Powered by Via Trading',
  )

  return { courseId: COURSE_ID, moduleId: 'liquidatenow', content: b.build() }
}

// ─── Module 5: WeSolveReturns (WeSolveReturns.tsx) ──────

function weSolveReturns(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'wesolvereturns',
    'WeSolveReturns',
    'A return center solution for brands and companies',
    'border-emerald-500',
    'RotateCcw',
  )

  // WSR logo
  b.inlineImage('wsr-logo.svg', 'WeSolveReturns — Powered by Via Trading', 'none', 'medium')

  // What Is WeSolveReturns?
  b.heading('What Is WeSolveReturns?', 3)
  b.paragraph(
    '<strong>WeSolveReturns.com</strong> is a return center solution for brands and companies that do not have their own returns infrastructure. Many businesses, especially e-commerce brands and mid-size retailers, struggle with what to do when customers return products. Setting up a full returns operation is expensive and complicated. WeSolveReturns solves that problem.',
  )
  b.paragraph(
    'Instead of letting returns pile up in a warehouse, get written off, or end up in a landfill, WeSolveReturns processes those returns and offers the company a way to make money on merchandise that would otherwise be a total loss. The recovered goods are then sold through Via Trading\'s marketplace, where business owners around the world purchase them.',
  )

  // How It Works
  b.heading('How It Works', 3)
  b.flowDiagram(
    'How WeSolveReturns Works',
    ['Brand Ships Returns', 'WSR Processes & Sorts', 'Merchandise Recovered', 'Sold on Via Trading'],
    'bg-emerald-600',
    1,
  )
  b.bulletList([
    '<strong>Brand Ships Returns</strong> — A brand or company sends their returned merchandise to WeSolveReturns. This could be anything from electronics and apparel to home goods and general merchandise. Rather than dealing with it themselves, they hand it off to a team that specializes in this exact process.',
    '<strong>WSR Processes and Sorts</strong> — WeSolveReturns receives the merchandise, inspects it, sorts it by condition and category, and prepares it for resale. This is the value-add: turning a pile of unsorted returns into organized, marketable inventory.',
    '<strong>Merchandise Recovered and Sold</strong> — The processed merchandise is listed and sold through Via Trading\'s marketplace. The original brand recovers value on products that would have otherwise been a write-off. Business owners get access to more inventory at competitive prices.',
  ], 'emerald')

  // The Problem It Solves
  b.heading('The Problem It Solves', 3)
  b.paragraph(
    'Returns are one of the biggest headaches in retail and e-commerce. The return rate for online purchases can be as high as 20 to 30 percent in some categories. For many companies, especially smaller brands or those without established reverse logistics operations, processing returns is expensive, time-consuming, and often not worth the effort for individual items.',
  )
  b.paragraph(
    'WeSolveReturns removes that burden entirely. The brand gets a returns solution without building one from scratch, and they get paid for merchandise that might otherwise end up in a landfill. It aligns perfectly with Via Trading\'s core belief that returned goods still have value and deserve a second life.',
  )

  // Connection to Via Trading
  b.callout(
    'tip',
    'WeSolveReturns feeds directly into Via Trading\'s supply chain. The returns it processes become inventory on ViaTrading.com, which business owners then purchase and resell. This creates a sustainable loop: brands recover value, Via Trading gets more inventory, and business owners get more product to build their businesses with.',
    'The Full Circle',
  )

  return { courseId: COURSE_ID, moduleId: 'wesolvereturns', content: b.build() }
}

// ─── Module 6: Why Via (WhyVia.tsx) ─────────────────────

function whyVia(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'why-via',
    'Why Business Owners Choose Via',
    'The key advantages that make Via Trading a leader in the liquidation industry',
    'border-violet-500',
    'Star',
  )

  // Intro paragraph with images
  b.inlineImage('via-sales-team.jpg', 'Via Trading Sales Team', 'right', 'small', 'The Via Trading sales team')
  b.paragraph(
    'Here is what makes Via Trading different from other companies in the liquidation space. These are not marketing slogans; they are <strong>real operational advantages</strong> that make a tangible difference for business owners. Many customers work with multiple suppliers simultaneously, and Via often becomes their <strong>primary source</strong> because of consistent pricing, reliable inventory, and the dedicated <strong>Account Manager relationship</strong>.',
  )
  b.inlineImage(
    'personalized-service.jpg',
    'Via Trading\'s Account Management team at work',
    'none',
    'large',
    'Via Trading\'s Account Management team',
  )

  // Expandable cards for advantages
  b.expandableCardGroup(
    advantages.map((advantage) => ({
      id: advantage.id,
      title: advantage.title,
      subtitle: advantage.shortDescription,
      icon: advantage.icon as string,
      accentColor: 'border-violet-500',
      content: `<p>${advantage.details}</p>`,
    })),
  )

  // Our Commitment callout
  b.callout(
    'orange',
    'Via Trading is dedicated to helping business owners succeed at every stage of their journey. From a first-time entrepreneur buying a single case pack to an experienced operator filling containers for export, Via provides the inventory, support, and partnership to help every customer grow.',
    'Our Commitment',
  )

  // Additional Resources
  b.additionalResources([
    {
      title: 'Why Via Trading? Learn Why You Should Work With Us',
      url: 'https://www.viatrading.com/why-via-trading/',
      source: 'ViaTrading.com',
      description: 'The full story of what makes Via Trading the industry leader in wholesale liquidation.',
    },
    {
      title: 'Via Trading on Inc. 500',
      url: 'https://www.viatrading.com/blog/via-trading-inc-500/',
      source: 'Via Trading Blog',
      description: 'How Via Trading earned 7 years of recognition on the Inc. 500 list of fastest-growing companies.',
    },
  ])

  // Inline exercise
  b.fillInBlank(whyViaFillBlanks, 'Quick Check: Complete the Sentences')

  return { courseId: COURSE_ID, moduleId: 'why-via', content: b.build() }
}

// ─── Module 7: Via Knowledge Check (Quiz) ────────────────

function viaQuiz(): MigrationEntry {
  resetUid()
  const b = new ContentBuilder(
    'via-knowledge-check',
    'Via Trading Knowledge Check',
    'Test your understanding of Via Trading Corporation',
    'border-via-orange',
    'ClipboardCheck',
  )

  b.paragraph(
    'This quiz covers all the key concepts from the Who Is Via Trading course. You need to score at least 85% to pass. Good luck!',
  )

  b.quizData({
    termMatch: viaSectionedQuiz.termMatch,
    multipleChoice: viaSectionedQuiz.multipleChoice.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    })),
    fillInBlank: viaSectionedQuiz.fillInBlank.map((f) => ({
      id: f.id,
      sentence: f.sentence,
      blank: f.blank,
      options: f.options,
      correctIndex: f.correctIndex,
    })),
    passThreshold: 0.85,
    nextCourse: { id: 'product-knowledge', title: 'Product Knowledge' },
  })

  return { courseId: COURSE_ID, moduleId: 'via-knowledge-check', content: b.build() }
}

// ─── Export all Course 2 entries ─────────────────────────

export function getCourse2Entries(): MigrationEntry[] {
  return [
    ourStory(),
    missionValues(),
    ourPlatforms(),
    liquidateNow(),
    weSolveReturns(),
    whyVia(),
    viaQuiz(),
  ]
}
