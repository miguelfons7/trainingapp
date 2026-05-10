import type { LoadType } from '../types'

export const loadTypesIntro =
  'Liquidation merchandise is sold in standard lot sizes. These terms come up in every sales conversation, so know them cold.'

export const loadTypeInsight =
  "A buyer's preferred load size tells you a lot about their business. Case buyers are often just starting out. Pallet buyers are established but small. Truckload buyers have warehouse space, working capital, and proven sales channels."

export const loadTypes: LoadType[] = [
  {
    id: 'case',
    name: 'Case',
    description:
      'The smallest standard purchase unit. A case contains a set number of individual items, usually within a single category.',
    details:
      'Good for buyers who are testing a category or have limited storage space. Low commitment, low risk entry point.',
    icon: 'Package',
    searchTerms: ['case', 'case pack', 'small lot', 'individual', 'single category'],
  },
  {
    id: 'pallet',
    name: 'Pallet',
    description:
      'A wooden structure (standard 48" x 48" base) loaded with merchandise, typically stacked 6-7 feet high.',
    details:
      'Can contain assorted merchandise across categories or be category-specific. This is the most common entry point for new buyers.',
    icon: 'LayoutGrid',
    searchTerms: ['pallet', '48x48', 'wooden', 'standard', 'entry point'],
  },
  {
    id: 'multi-pallet',
    name: 'Multi-Pallet Lot',
    description:
      'A purchase of several pallets, often offered at a discount compared to single-pallet pricing.',
    details:
      'Common for buyers who have validated a category and are ready to scale up. Better per-unit economics.',
    icon: 'Layers',
    searchTerms: ['multi-pallet', 'multiple pallets', 'lot', 'bulk', 'discount'],
  },
  {
    id: 'truckload',
    name: 'Truckload',
    description:
      'A full trailer of palleted merchandise. 26-foot trailers hold ~12 pallets. 53-foot trailers hold ~24 pallets.',
    details:
      'Highest volume = lowest per-unit cost. Some truckloads are hand-stacked (no pallets), which is common for bulky items like furniture.',
    icon: 'Truck',
    searchTerms: ['truckload', 'TL', 'trailer', '26-foot', '53-foot', '12 pallets', '24 pallets', 'hand-stacked'],
  },
]
