import type { FillInBlankItem } from '../../../types'

/**
 * Inline fill-in-the-blank exercises for Product Knowledge modules.
 * Placed at the bottom of individual modules for knowledge reinforcement.
 */

// After "Target Programs" module
export const targetFillBlanks: FillInBlankItem[] = [
  {
    id: 'pk-tgt-1',
    sentence: 'The TGT Premium sub-program is _____, meaning buyers get item-level detail.',
    blank: 'manifested',
    options: ['unmanifested', 'manifested', 'consignment', 'wholesale'],
    correctIndex: 1,
  },
  {
    id: 'pk-tgt-2',
    sentence: 'TGT Salvage is known as one of the _____ customer return loads in the industry.',
    blank: 'cleanest',
    options: ['largest', 'cleanest', 'cheapest', 'newest'],
    correctIndex: 1,
  },
  {
    id: 'pk-tgt-3',
    sentence: 'The TGT DC program sources merchandise from Target _____.',
    blank: 'Distribution Centers',
    options: ['Retail Stores', 'Distribution Centers', 'Online Returns', 'Warehouses'],
    correctIndex: 1,
  },
  {
    id: 'pk-tgt-4',
    sentence: 'TGT Premium items are cherry-picked by _____, not by Via Trading.',
    blank: 'Target',
    options: ['Target', 'Via Trading', 'the buyer', 'a third party'],
    correctIndex: 0,
  },
]

// After "Walmart & Home Depot" module
export const walmartHdFillBlanks: FillInBlankItem[] = [
  {
    id: 'pk-wmhd-1',
    sentence: 'WMAPP (Walmart Apparel) loads are priced at approximately _____ per truckload.',
    blank: '$43,000 – $45,000',
    options: ['$4,850 – $4,950', '$10,990 – $23,990', '$43,000 – $45,000', '$58,000 – $60,000'],
    correctIndex: 2,
  },
  {
    id: 'pk-wmhd-2',
    sentence: 'HD Manifested (VHD) is priced at _____% of wholesale value.',
    blank: '31',
    options: ['12', '23', '31', '50'],
    correctIndex: 2,
  },
  {
    id: 'pk-wmhd-3',
    sentence: 'HD Turbo (TRB) is an _____ program, meaning no item-level detail is provided.',
    blank: 'unmanifested',
    options: ['manifested', 'unmanifested', 'mixed', 'consignment'],
    correctIndex: 1,
  },
  {
    id: 'pk-wmhd-4',
    sentence: 'WMCOM (Walmart Exits) provides _____ loads with item-level detail from Walmart.com returns.',
    blank: 'manifested',
    options: ['unmanifested', 'manifested', 'consignment', 'flat-priced'],
    correctIndex: 1,
  },
]

// Keep legacy export name for backward compatibility
export const homeImprovementFillBlanks = walmartHdFillBlanks
