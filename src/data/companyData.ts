import type { KeyFact, Platform } from '../types'

export const companyStory = {
  founding:
    'Via Trading was founded in 2002 by a team of 4 in a 6,000 square foot warehouse in Los Angeles. The company emerged at a time when the liquidation industry lacked transparency, customer service, and ethical standards.',
  growth:
    'From that small beginning, Via Trading grew into one of the most recognized liquidation companies in the USA — operating from a 550,000+ square foot facility in Lynwood, California, serving 42,000+ customers across 129+ countries.',
  mission:
    'Via Trading is dedicated to the principles of continuous improvement, transparency & world class service. Our mission is to be the recognized leader in the liquidation industry & operate with a long term focus to develop high quality relationships with our customers, vendors & team members.',
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
    description: 'Primary wholesale liquidation platform — the leading e-commerce destination for business buyers sourcing liquidation merchandise.',
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
  'Walmart',
  'Target',
  'Amazon',
  'Home Depot',
  'Wayfair',
  "Sam's Club",
]

export const teamHighlights = [
  '100+ combined years of liquidation industry experience',
  'Multilingual Account Managers: English, Spanish, Hebrew, French, Turkish, Greek, Arabic, Korean',
  'Family-owned and operated — long-term business focus',
  'Entrepreneurial culture with empowered team members',
]
