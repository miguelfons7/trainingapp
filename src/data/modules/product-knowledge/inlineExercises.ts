import type { FillInBlankItem } from '../../../types'

/**
 * Inline fill-in-the-blank exercises for Product Knowledge modules.
 * Placed at the bottom of individual modules for knowledge reinforcement.
 */

// After "Target Programs" module
export const targetFillBlanks: FillInBlankItem[] = [
  {
    id: 'pk-tgt-1',
    sentence: 'Target has _____ dedicated programs with Via Trading.',
    blank: '4',
    options: ['2', '3', '4', '6'],
    correctIndex: 2,
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
    sentence: 'The TGT Salvage Max tier is priced at _____ per load.',
    blank: '$23,990',
    options: ['$10,990', '$12,990', '$18,490', '$23,990'],
    correctIndex: 3,
  },
  {
    id: 'pk-tgt-4',
    sentence: 'TGT Apparel merchandise is in _____ condition, with 90%+ retail ready.',
    blank: 'New Overstock',
    options: ['Customer Returns', 'New Overstock', 'Salvage', 'Refurbished'],
    correctIndex: 1,
  },
]

// After "Home Improvement Programs" module
export const homeImprovementFillBlanks: FillInBlankItem[] = [
  {
    id: 'pk-hi-1',
    sentence: 'Lowes loads are priced at _____ per load.',
    blank: '$4,850 – $4,950',
    options: ['$2,500 – $3,500', '$4,850 – $4,950', '$7,800 – $10,800', '$10,990 – $23,990'],
    correctIndex: 1,
  },
  {
    id: 'pk-hi-2',
    sentence: 'HD Manifested (VHD) is priced at _____% of wholesale value.',
    blank: '31',
    options: ['12', '23', '31', '50'],
    correctIndex: 2,
  },
  {
    id: 'pk-hi-3',
    sentence: 'Lowes offers _____ different FOB locations for pickup flexibility.',
    blank: '4',
    options: ['1', '2', '4', '6'],
    correctIndex: 2,
  },
  {
    id: 'pk-hi-4',
    sentence: 'HD Turbo (TRB) is an _____ program, meaning no item-level detail is provided.',
    blank: 'unmanifested',
    options: ['manifested', 'unmanifested', 'mixed', 'consignment'],
    correctIndex: 1,
  },
]
