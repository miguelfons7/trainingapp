import type { Course } from '../types'

export const courses: Course[] = [
  {
    id: 'intro-to-industry',
    title: 'Intro to the Liquidation Industry',
    description:
      'Learn the fundamentals of the secondary market and liquidation industry — how it works, who the key players are, and why this sector is booming.',
    icon: 'Warehouse',
    estimatedTime: '~45 min',
    imagePath: 'course-1-industry.png',
    status: 'available',
    modules: [
      {
        id: 'secondary-market',
        title: 'The Secondary Market',
        estimatedTime: '8 min',
        contentType: 'lesson',
        description: 'Understand what the secondary market is and how liquidation fits into the broader retail ecosystem.',
      },
      {
        id: 'reverse-logistics',
        title: 'Reverse Logistics',
        estimatedTime: '10 min',
        contentType: 'lesson',
        description: 'Learn how products flow from consumers back through the supply chain and into the liquidation pipeline.',
      },
      {
        id: 'product-conditions',
        title: 'Product Conditions',
        estimatedTime: '10 min',
        contentType: 'lesson',
        description: 'Master the different product condition grades — from new overstock to salvage — and what each means for buyers.',
      },
      {
        id: 'load-types',
        title: 'Load Types',
        estimatedTime: '7 min',
        contentType: 'lesson',
        description: 'Explore the different ways liquidation inventory is sold: pallets, truckloads, containers, and more.',
      },
      {
        id: 'buyer-types',
        title: 'Buyer Types',
        estimatedTime: '8 min',
        contentType: 'lesson',
        description: 'Identify the main buyer personas in the liquidation space and what motivates each type.',
      },
      {
        id: 'key-terminology',
        title: 'Key Terminology',
        estimatedTime: '5 min',
        contentType: 'lesson',
        description: 'Review essential industry terms and jargon you will encounter daily.',
      },
      {
        id: 'industry-knowledge-check',
        title: 'Industry Knowledge Check',
        estimatedTime: '10 min',
        contentType: 'quiz',
        description: 'Test your understanding of the liquidation industry fundamentals.',
      },
    ],
  },
  {
    id: 'who-is-via',
    title: 'Who Is Via Trading',
    description:
      'Discover Via Trading\'s story, mission, values, and what makes us the industry leader. Understand our platforms and competitive advantages.',
    icon: 'Building2',
    estimatedTime: '~30 min',
    imagePath: 'course-2-via-trading.png',
    status: 'available',
    modules: [
      {
        id: 'our-story',
        title: 'Our Story',
        estimatedTime: '8 min',
        contentType: 'lesson',
        description: 'Learn how Via Trading grew from a 6,000 sq ft warehouse to a 550,000+ sq ft industry leader.',
      },
      {
        id: 'mission-values',
        title: 'Mission & Values',
        estimatedTime: '5 min',
        contentType: 'lesson',
        description: 'Understand Via Trading\'s mission, core values, and the principles that guide everything we do.',
      },
      {
        id: 'our-platforms',
        title: 'Our Platforms',
        estimatedTime: '5 min',
        contentType: 'lesson',
        description: 'Explore Via Trading\'s three platforms: ViaTrading.com, WeSolveReturns.com, and LiquidateNow.com.',
      },
      {
        id: 'why-via',
        title: 'Why Via',
        estimatedTime: '8 min',
        contentType: 'lesson',
        description: 'Discover our competitive advantages and why 90%+ of our customers are repeat buyers.',
      },
      {
        id: 'via-knowledge-check',
        title: 'Via Knowledge Check',
        estimatedTime: '8 min',
        contentType: 'quiz',
        description: 'Test your knowledge of Via Trading\'s history, values, and platforms.',
      },
    ],
  },
  {
    id: 'product-knowledge',
    title: 'Product Knowledge',
    description:
      'Deep dive into the product categories Via Trading handles — from electronics and apparel to home goods and more. Learn how to evaluate and discuss inventory with confidence.',
    icon: 'Package',
    estimatedTime: '~60 min',
    imagePath: 'course-3-product.png',
    status: 'coming-soon',
    modules: [],
  },
  {
    id: 'sales-philosophy',
    title: 'Sales Philosophy & Process',
    description:
      'Master Via Trading\'s consultative sales approach. Learn the full sales cycle from prospecting to closing, and how to build lasting customer relationships.',
    icon: 'Target',
    estimatedTime: '~90 min',
    imagePath: 'course-4-sales.png',
    status: 'coming-soon',
    modules: [],
  },
  {
    id: 'bdr-role',
    title: 'BDR Role Training',
    description:
      'Everything you need to know about the Business Development Representative role — daily workflows, KPIs, outreach strategies, and how to hit your targets.',
    icon: 'Headphones',
    estimatedTime: '~60 min',
    imagePath: 'course-5-bdr.png',
    status: 'coming-soon',
    modules: [],
  },
  {
    id: 'tools-systems',
    title: 'Tools & Systems',
    description:
      'Get hands-on with the CRM, phone systems, email tools, and internal platforms you will use every day as an Account Manager at Via Trading.',
    icon: 'Settings',
    estimatedTime: '~45 min',
    imagePath: 'course-6-tools.png',
    status: 'coming-soon',
    modules: [],
  },
  {
    id: 'ongoing-development',
    title: 'Ongoing Development',
    description:
      'Continue growing your skills with advanced topics, industry updates, and professional development resources. This course evolves as you grow.',
    icon: 'TrendingUp',
    estimatedTime: '~ongoing',
    imagePath: 'course-7-development.png',
    status: 'coming-soon',
    modules: [],
  },
]

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id)
}

export { getProgram } from './programs'
