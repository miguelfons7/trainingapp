import type { LoadType } from '../types'

export const loadTypesIntro =
  'Liquidation merchandise is sold and shipped in standard lot sizes and formats. Understanding these terms is important for anyone working at Via Trading. This module covers the basics. A more in-depth shipping and logistics course will go deeper into freight management, costs, and best practices.'

export const loadTypeInsight = ''

export const loadTypes: LoadType[] = [
  {
    id: 'case',
    name: 'Case',
    description:
      'The smallest standard purchase unit. A case contains a set number of individual items, usually within a single category.',
    details:
      'Cases are a low-commitment way to test a category or supplement existing inventory. Available across all product conditions and categories. Many new business owners start with cases before scaling up to pallets.',
    icon: 'Package',
    searchTerms: ['case', 'case pack', 'small lot', 'individual', 'single category'],
  },
  {
    id: 'pallet',
    name: 'Pallet',
    description:
      'A wooden or plastic structure (standard 40 inch by 48 inch base) loaded with merchandise. Pallets come in several formats, so it is important to understand the differences.',
    details:
      'Can contain assorted merchandise across categories or be category-specific. Common pallet formats include: Standard Pallets (wooden 40"x48" with merchandise stacked and shrink-wrapped), Gaylords (large corrugated cardboard boxes, typically 40"x48"x48", placed on a pallet, common for unsorted customer returns), Palletized Cases (individual case packs stacked on a pallet for organized category-specific lots), and Watermelon Bins (large open-top bins on pallets, used for bulk unsorted merchandise). The format affects how merchandise is received, sorted, and resold.',
    icon: 'LayoutGrid',
    searchTerms: ['pallet', '40x48', 'wooden', 'standard', 'gaylord', 'watermelon bin'],
  },
  {
    id: 'ltl',
    name: 'LTL (Less Than Load)',
    description:
      'A shipment of 1 to 6 pallets that shares trailer space with other shipments. LTL is cost-effective for mid-size orders that do not require a full truck.',
    details:
      'LTL is a common shipping method for business owners who need more than a few pallets but not a full truck. Residential delivery is available with a lift-gate surcharge. LTL drivers lower pallets to the curb or loading dock only. No inside delivery. If more than 6 pallets are needed, it may require consolidation or two separate LTL shipments.',
    icon: 'Layers',
    searchTerms: ['LTL', 'less than load', 'partial', 'multi-pallet', 'freight'],
  },
  {
    id: 'truckload',
    name: 'Truckload',
    description:
      'A full trailer dedicated to a single shipment. Via Trading uses 48-foot and 53-foot trailers. A standard 53-foot trailer holds 26 pallets. If pallets are pinwheeled (rotated to alternate orientations), a 53-footer can hold up to 28 pallets.',
    details:
      'Truckloads represent the highest domestic volume and typically the lowest per-unit cost. A 48-foot trailer holds 22 pallets, while a 53-foot holds 26 (or up to 28 if pinwheeled). These numbers assume standard 8-foot tall pallets. Shorter pallets can be double-stacked, effectively doubling capacity. Customers have a 2-hour window to unload upon delivery, after which detention charges may apply. The driver will not assist with unloading.',
    icon: 'Truck',
    searchTerms: ['truckload', 'TL', 'trailer', '53-foot', '48-foot', 'full load', 'FTL', 'pinwheel'],
  },
  {
    id: 'container',
    name: 'Ocean Container',
    description:
      'Steel shipping containers used for international shipments. Containers come in several standard sizes: 20-foot, 40-foot, 40-foot High Cube, and 45-foot High Cube.',
    details:
      'A 20-foot container holds 10 pallet positions (20 if double-stacked). A 40-foot container holds 20 pallet positions (40 double-stacked). A 40-foot High Cube container also holds 20 pallet positions (40 double-stacked) but has extra height (8.95 feet vs 7.95 feet). A 45-foot High Cube holds 22 pallet positions (44 double-stacked). Containers can also be hand-loaded (without pallets) to significantly increase capacity, sometimes by 2 to 3 times. Whether a container is hand-loaded depends on the merchandise type, destination, and the business owner\'s preferences.',
    icon: 'Ship',
    searchTerms: ['container', 'ocean', '20-foot', '40-foot', '45-foot', 'high cube', 'international', 'export'],
  },
]
