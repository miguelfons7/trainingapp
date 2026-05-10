import type { LoadType } from '../types'

export const loadTypesIntro =
  'Liquidation merchandise is sold in standard lot sizes. These terms come up in every sales conversation, so know them cold.'

export const loadTypeInsight =
  'Understanding load types helps you match the right product format to what the buyer needs. Any buyer can purchase at any level — from a single case to full truckloads.'

export const loadTypes: LoadType[] = [
  {
    id: 'case',
    name: 'Case',
    description:
      'The smallest standard purchase unit. A case contains a set number of individual items, usually within a single category.',
    details:
      'Cases are a low-commitment way to test a category or supplement existing inventory. Available across all product conditions and categories.',
    icon: 'Package',
    searchTerms: ['case', 'case pack', 'small lot', 'individual', 'single category'],
  },
  {
    id: 'pallet',
    name: 'Pallet',
    description:
      'A wooden structure (standard 48" x 48" base) loaded with merchandise, typically stacked 6-7 feet high.',
    details:
      'Can contain assorted merchandise across categories or be category-specific. Pallets are a versatile format that works for a wide range of buyers.',
    icon: 'LayoutGrid',
    searchTerms: ['pallet', '48x48', 'wooden', 'standard'],
  },
  {
    id: 'ltl',
    name: 'LTL (Less Than Truckload)',
    description:
      'A shipment of multiple pallets that does not fill an entire trailer. LTL shipments typically range up to 12 pallets.',
    details:
      'LTL is a common shipping method when a buyer needs more than a few pallets but not a full truckload. Freight is shared with other shipments on the same trailer.',
    icon: 'Layers',
    searchTerms: ['LTL', 'less than truckload', 'partial', 'multi-pallet', 'freight'],
  },
  {
    id: 'truckload',
    name: 'Truckload / Container',
    description:
      'A full trailer of merchandise. At Via Trading, truckloads use 53-foot trailers carrying 12 to 24-30 pallets depending on how the inventory is condensed.',
    details:
      'Containers are similar but use shipping containers (up to 48 feet in length) and typically carry fewer pallets than a 53-foot trailer. Containers are common for export shipments.',
    icon: 'Truck',
    searchTerms: ['truckload', 'TL', 'trailer', '53-foot', 'container', '48-foot', 'full load', 'FTL'],
  },
]
