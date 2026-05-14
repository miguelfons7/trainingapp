import type { LoadType } from '../types'

export const loadTypesIntro =
  'Liquidation merchandise is sold in standard lot sizes. Understanding these formats is important for anyone working at Via Trading, whether you are discussing options with a buyer, coordinating logistics, or managing warehouse operations.'

export const loadTypeInsight = ''

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
      'A wooden or plastic structure (standard 48 inch by 48 inch base) loaded with merchandise. Pallets come in several formats, so it is important to understand the differences.',
    details:
      'Can contain assorted merchandise across categories or be category-specific. Pallets are a versatile format that works for a wide range of buyers. Common pallet formats include: Standard Pallets (wooden 48"×48" with merchandise stacked and shrink-wrapped), Gaylords (large corrugated cardboard boxes placed on a pallet, common for unsorted returns), Palletized Cases (individual case packs stacked on a pallet for organized category-specific lots), and Watermelon Bins (large open-top bins on pallets, used for bulk unsorted merchandise). The format affects how merchandise is received, sorted, and resold.',
    icon: 'LayoutGrid',
    searchTerms: ['pallet', '48x48', 'wooden', 'standard'],
  },
  {
    id: 'ltl',
    name: 'LTL (Less Than Truckload)',
    description:
      'A shipment of 1 to 6 pallets that shares trailer space with other shipments. If more than 6 pallets are needed, it may require consolidation or two separate LTL shipments.',
    details:
      'LTL is a common shipping method for buyers who need more than a few pallets but not a full truck. Residential delivery is available with a lift-gate surcharge. LTL drivers lower pallets to the curb or loading dock only. No inside delivery.',
    icon: 'Layers',
    searchTerms: ['LTL', 'less than truckload', 'partial', 'multi-pallet', 'freight'],
  },
  {
    id: 'truckload',
    name: 'Truckload / Container',
    description:
      'A full trailer of merchandise. Via Trading uses 48-foot and 53-foot trailers. A 48-foot trailer holds 22 pallets (44 if double-stacked). A 53-foot trailer holds 26 pallets (52 if double-stacked).',
    details:
      'Truckloads represent the highest volume and typically the lowest per-unit cost. Customers have a 2-hour window to unload upon delivery, after which detention charges may apply. The driver will not assist with unloading. For international shipments, ocean containers are used instead: a 20-foot container holds 10 pallets (20 double-stacked), a 40-foot holds 20 pallets (40 double-stacked), and a 45-foot high-cube holds 22 pallets (44 double-stacked). Hand-loading containers (without pallets) can increase capacity by 2 to 3 times.',
    icon: 'Truck',
    searchTerms: ['truckload', 'TL', 'trailer', '53-foot', 'container', '48-foot', 'full load', 'FTL'],
  },
]
