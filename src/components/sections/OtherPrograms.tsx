import {
  Layers,
  Sofa,
  Store,
  Wrench,
  ShoppingCart,
  Package,
} from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { Badge } from '../shared/Badge'
import { AdditionalResources } from '../shared/AdditionalResources'

const otherPrograms = [
  {
    id: 'costway',
    name: 'Costway',
    icon: <Sofa className="w-4 h-4 text-via-text-light" />,
    badge: { text: 'Unmanifested', color: 'amber' },
    description: 'Furniture, home, and patio customer returns from an online-first furniture retailer. Loads available from two FOB locations.',
    price: 'From $6,875/load',
    fob: 'CA & NJ',
  },
  {
    id: 'jcp',
    name: 'JCPenney (JCP)',
    icon: <Store className="w-4 h-4 text-via-text-light" />,
    badge: { text: 'Manifested', color: 'emerald' },
    description: 'Manifested housewares and hardgoods from JCPenney stores. Priced as a percentage of retail value with full item-level detail.',
    price: '% of Retail',
    fob: 'Various US Locations',
  },
  {
    id: 'boscovs',
    name: "Boscov's (BV)",
    icon: <ShoppingCart className="w-4 h-4 text-via-text-light" />,
    badge: { text: 'Manifested', color: 'emerald' },
    description: 'Manifested department store merchandise at 9-12% of retail — among the lowest pricing models across all Via Trading programs.',
    price: '9-12% of Retail',
    fob: 'Various US Locations',
  },
  {
    id: 'ctc',
    name: 'Albertsons / CTC (CTC)',
    icon: <Package className="w-4 h-4 text-via-text-light" />,
    badge: { text: 'Manifested', color: 'emerald' },
    description: 'Manifested general merchandise at 29-35% of retail. Larger loads averaging approximately $25K per load.',
    price: '29-35% of Retail (~$25K/load)',
    fob: 'Various US Locations',
  },
  {
    id: 'thf-tools',
    name: 'THF Tools',
    icon: <Wrench className="w-4 h-4 text-via-text-light" />,
    badge: { text: 'Manifested', color: 'emerald' },
    description: 'Manifested tools and hardware loads priced at 23% of retail. A specialty program for buyers focused on the tools category.',
    price: '23% of Retail',
    fob: 'Various US Locations',
  },
]

export function OtherPrograms() {
  return (
    <SectionWrapper
      id="other-programs"
      title="Additional Retail Partners"
      subtitle="Smaller and specialty programs that complement Via Trading's major partnerships"
      accentColor="border-teal-500"
      icon={<Layers className="w-5 h-5" />}
    >
      {/* Introduction */}
      <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          Beyond the Major Partners
        </h3>
        <p className="text-sm text-via-text leading-relaxed">
          Beyond the major retail partners, Via Trading works with several additional partners. These tend to be more specialized and may appeal to buyers looking for specific product categories or pricing models. Each program offers its own advantages depending on what a buyer is looking for.
        </p>
      </div>

      {/* Program Cards */}
      <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
        Specialty Programs
      </h3>
      <div className="space-y-3 mb-6">
        {otherPrograms.map((program) => (
          <div
            key={program.id}
            className="bg-via-card rounded-xl border border-via-border p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              {program.icon}
              <span className="text-sm font-semibold text-via-navy">{program.name}</span>
              <Badge text={program.badge.text} color={program.badge.color} />
            </div>
            <p className="text-sm text-via-text leading-relaxed mb-3">
              {program.description}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-via-bg-subtle rounded-lg p-2.5">
                <p className="text-xs text-via-text-light uppercase tracking-wide">Price</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">{program.price}</p>
              </div>
              <div className="bg-via-bg-subtle rounded-lg p-2.5">
                <p className="text-xs text-via-text-light uppercase tracking-wide">FOB</p>
                <p className="text-sm font-semibold text-via-navy mt-0.5">{program.fob}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary callout */}
      <div className="bg-via-orange/10 rounded-lg border border-via-orange/30 p-4 mb-0">
        <p className="text-sm text-orange-700 font-medium mb-1">Program Breadth</p>
        <p className="text-sm text-orange-700">
          Via Trading's strength is breadth — whatever a buyer is looking for, there's likely a program that fits. From furniture and footwear to tools and department store goods, these specialty programs complement the major partnerships and ensure every buyer can find the right product at the right price point.
        </p>
      </div>

      <AdditionalResources
        resources={[
          {
            title: 'All Wholesale Liquidation Lots',
            url: 'https://www.viatrading.com/product-category/all-wholesale-lots/',
            source: 'ViaTrading.com',
            description: 'Browse all available wholesale liquidation lots across every retail partner.',
          },
        ]}
      />
    </SectionWrapper>
  )
}
