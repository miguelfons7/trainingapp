import type { TermMatchPair, FillInBlankItem } from '../../../types'

/**
 * Small inline exercises sprinkled into each Via Trading module — max 4 items each.
 */

// After "Our Story" module
export const ourStoryFillBlanks: FillInBlankItem[] = [
  {
    id: 'via-inline-1',
    sentence: 'Via Trading was founded in _____ in a 6,000 square foot warehouse.',
    blank: '2002',
    options: ['1998', '2002', '2008', '2012'],
    correctIndex: 1,
  },
  {
    id: 'via-inline-2',
    sentence: 'Via Trading now operates from a facility of over _____ square feet.',
    blank: '550,000',
    options: ['100,000', '250,000', '550,000', '1,000,000'],
    correctIndex: 2,
  },
  {
    id: 'via-inline-3',
    sentence: 'Via Trading has served over _____ customers worldwide.',
    blank: '42,000',
    options: ['10,000', '25,000', '42,000', '100,000'],
    correctIndex: 2,
  },
]

// After "Mission & Values" module
export const missionValuesTermMatch: TermMatchPair[] = [
  {
    term: 'Honesty',
    definition: 'Transparent and truthful dealings with all stakeholders',
  },
  {
    term: 'Integrity',
    definition: 'Ethical business practices and consistent reliability',
  },
  {
    term: 'Transparency',
    definition: 'Open communication and clear processes in every interaction',
  },
]

// After "Our Platforms" module
export const platformsTermMatch: TermMatchPair[] = [
  {
    term: 'ViaTrading.com',
    definition: 'Wholesale marketplace where business buyers browse and purchase liquidation inventory',
  },
  {
    term: 'WeSolveReturns.com',
    definition: 'Returns management platform helping retailers process and liquidate returned merchandise',
  },
  {
    term: 'LiquidateNow.com',
    definition: 'Vendor-facing platform where retailers and manufacturers liquidate excess inventory',
  },
]

// After "Why Via" module
export const whyViaFillBlanks: FillInBlankItem[] = [
  {
    id: 'via-why-1',
    sentence: 'Over _____% of Via Trading\'s business comes from repeat customers.',
    blank: '90',
    options: ['50', '70', '80', '90'],
    correctIndex: 3,
  },
  {
    id: 'via-why-2',
    sentence: 'Via Trading received _____ years of Inc 500 recognition for rapid growth.',
    blank: '7',
    options: ['3', '5', '7', '10'],
    correctIndex: 2,
  },
  {
    id: 'via-why-3',
    sentence: 'Via Trading ships to over _____ countries worldwide.',
    blank: '129',
    options: ['50', '75', '100', '129'],
    correctIndex: 3,
  },
]
