import type { KeyFact, Platform } from '../types'

export const companyStory = {
  founding:
    'Via Trading Corporation is the umbrella company that houses three operating entities: Via Trading (the wholesale liquidation business), LiquidateNow, and WeSolveReturns, with more branches on the way. It all started in 2002, when a team of 4 launched a wholesale liquidation company from a 6,000 square foot warehouse in Los Angeles. The industry at the time lacked transparency, customer service, and ethical standards, and Via Trading set out to change that.',
  growth:
    'From that small beginning, Via Trading grew into one of the most recognized liquidation companies in the USA, now operating from 250,000 square feet of physical warehouse space in Lynwood, California. With rack space factored in, the total comes to over 550,000 square feet. Via Trading serves 42,000+ customers across 129+ countries.',
  mission:
    'Via Trading is dedicated to the principles of continuous improvement, transparency, and world-class service. Our mission is to be the recognized leader in the liquidation industry and operate with a long-term focus to develop high-quality relationships with our customers, vendors, and team members. We believe in the American dream: that anyone with the drive and determination to build something can do it. Via Trading helps new entrepreneurs start with just a single case pack and grow into a full business. Every day, we see business owners turn a small investment into something they can be proud of, and we are honored to be part of that journey.',
}

export const coreValues = [
  { name: 'Honesty', description: 'Transparent dealings with all stakeholders' },
  { name: 'Integrity', description: 'Ethical business practices and reliability' },
  { name: 'Transparency', description: 'Open communication and clear processes' },
]

export const keyFacts: KeyFact[] = [
  { id: 'founded', icon: 'Calendar', value: '2002', label: 'Founded' },
  { id: 'customers', icon: 'Users', value: '42,000+', label: 'Customers Served' },
  { id: 'transactions', icon: 'Receipt', value: '317,000+', label: 'Transactions Completed' },
  { id: 'volume', icon: 'TrendingUp', value: '$8B+', label: 'Business Volume' },
  { id: 'countries', icon: 'Globe', value: '129+', label: 'Countries Shipped' },
  { id: 'facility', icon: 'Warehouse', value: '550,000+', label: 'Sq Ft Facility' },
  { id: 'inc500', icon: 'Award', value: '7 Years', label: 'Inc 500 Recognition' },
  { id: 'repeat', icon: 'RefreshCcw', value: '90%+', label: 'Repeat Business Rate' },
]

export const platforms: Platform[] = [
  {
    name: 'ViaTrading.com',
    url: 'https://viatrading.com',
    description: 'Primary wholesale liquidation platform and the leading e-commerce destination for business owners sourcing liquidation merchandise.',
  },
  {
    name: 'WeSolveReturns.com',
    url: 'https://wesolvereturns.com',
    description: 'Returns management and recommerce platform, focused on helping retailers manage their reverse logistics.',
  },
  {
    name: 'LiquidateNow.com',
    url: 'https://liquidatenow.com',
    description: 'Vendor-facing platform where retailers and manufacturers can liquidate their excess and returned inventory.',
  },
]

export const retailerPartners = [
  'Target',
  'Walmart',
  'Wayfair',
  'Home Depot',
  'Amazon',
  "Sam's Club",
  "Macy's",
  'JCPenney',
  'Harbor Freight',
]

export const teamHighlights = [
  '300+ combined years of liquidation industry experience',
  'Multilingual Account Managers: English, Spanish, Hebrew, French, Turkish, Greek, Arabic, Russian, Ukrainian',
  'Family-owned and operated, and employee-owned through our ESOP program',
  'Entrepreneurial culture with empowered team members',
]
