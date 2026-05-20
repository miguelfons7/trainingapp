import { useState } from 'react'
import DOMPurify from 'dompurify'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { FlowDiagram } from '../shared/FlowDiagram'
import { Badge } from '../shared/Badge'
import { InlineImage } from '../shared/InlineImage'
import { StatCard } from '../shared/StatCard'
import { ImagePlaceholder } from '../shared/ImagePlaceholder'
import { AdditionalResources } from '../shared/AdditionalResources'
import { ScenarioCard } from '../interactive/ScenarioCard'
import { FillInBlank } from '../interactive/FillInBlank'
import { TermMatch } from '../interactive/TermMatch'
import { resolveIcon } from './iconResolver'

import type {
  PageContent,
  ContentBlock,
  ParagraphBlock,
  HeadingBlock,
  ContentCardBlock,
  CalloutBlock,
  BulletListBlock,
  TwoColumnListBlock,
  NumberedListBlock,
  StatGridBlock,
  FlowDiagramBlock,
  InlineImageBlock,
  HeroImageBlock,
  ExpandableCardBlock,
  ExpandableCardGroupBlock,
  IconCardGridBlock,
  ScenarioCardBlock,
  FillInBlankBlock,
  TermMatchBlock,
  AdditionalResourcesBlock,
  DividerBlock,
} from '../../types/blocks'

// ─── Helpers ──────────────────────────────────────────────

/** Sanitize a RichText HTML string before rendering. */
function sanitize(html: string): string {
  return DOMPurify.sanitize(html)
}

/** Build a lookup table so content_card blocks can find their children. */
function buildBlockMap(blocks: ContentBlock[]): Map<string, ContentBlock> {
  const map = new Map<string, ContentBlock>()
  for (const b of blocks) {
    map.set(b.id, b)
  }
  return map
}

/** Map callout style to Tailwind color token. */
const CALLOUT_COLORS: Record<string, string> = {
  info: 'blue',
  tip: 'emerald',
  warning: 'amber',
  orange: 'orange',
  success: 'emerald',
}

/** Grid-column class per column count. */
const GRID_COLS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
}

/** Divider spacing. */
const DIVIDER_SIZE: Record<string, string> = {
  sm: 'my-4',
  md: 'my-6',
  lg: 'my-10',
}

// ─── Individual Block Renderers ───────────────────────────

function ParagraphRenderer({ block }: { block: ParagraphBlock }) {
  // Support both CMS editor field name (content) and alternative (html)
  const html = block.data.content || (block.data as Record<string, string>).html || ''
  return (
    <div
      className="text-sm text-via-text leading-relaxed mb-4"
      dangerouslySetInnerHTML={{ __html: sanitize(html) }}
    />
  )
}

function HeadingRenderer({ block }: { block: HeadingBlock }) {
  // Support both number (3/4) and string ("h2"/"h3"/"h4") level formats
  const rawLevel = block.data.level
  const isH2 = rawLevel === 'h2' as unknown as number
  const isH3 = rawLevel === 3 || rawLevel === 'h3' as unknown as number
  if (isH2) {
    return <h2 className="text-lg font-bold text-via-navy mb-3 mt-2">{block.data.text}</h2>
  }
  const Tag = isH3 ? 'h3' : 'h4'
  const classes = isH3
    ? 'text-sm font-semibold text-via-text uppercase tracking-wide mb-3'
    : 'text-sm font-semibold text-via-navy uppercase tracking-wide mb-3'
  return <Tag className={classes}>{block.data.text}</Tag>
}

function ContentCardRenderer({
  block,
  blockMap,
}: {
  block: ContentCardBlock
  blockMap: Map<string, ContentBlock>
}) {
  const children = block.data.children
    .map((id) => blockMap.get(id))
    .filter((b): b is ContentBlock => b !== undefined)
    .sort((a, b) => a.order - b.order)

  return (
    <div className="bg-via-card rounded-xl border border-via-border p-6 mb-6">
      {block.data.title && (
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          {block.data.title}
        </h3>
      )}
      {children.map((child) => (
        <BlockSwitch key={child.id} block={child} blockMap={blockMap} />
      ))}
    </div>
  )
}

function CalloutRenderer({ block }: { block: CalloutBlock }) {
  // Support both CMS editor field names (style/content) and alternatives (variant/html)
  const d = block.data as Record<string, string | undefined>
  const style = block.data.style || (d.variant as CalloutBlock['data']['style']) || 'info'
  const content = block.data.content || d.html || ''
  const color = CALLOUT_COLORS[style] || 'blue'
  return (
    <div className={`bg-${color}-50 rounded-lg border border-${color}-200 p-4 mb-6`}>
      {block.data.title && (
        <p className={`text-sm text-${color}-700 font-medium mb-1`}>{block.data.title}</p>
      )}
      <div
        className={`text-sm text-${color}-700`}
        dangerouslySetInnerHTML={{ __html: sanitize(content) }}
      />
    </div>
  )
}

function BulletListRenderer({ block }: { block: BulletListBlock }) {
  const dotColor = block.data.color ?? 'via-orange'
  return (
    <ul className="space-y-2 mb-6">
      {block.data.items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className={`w-1.5 h-1.5 rounded-full bg-${dotColor} mt-1.5 shrink-0`} />
          <span
            className="text-sm text-via-text leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitize(item) }}
          />
        </li>
      ))}
    </ul>
  )
}

function TwoColumnListRenderer({ block }: { block: TwoColumnListBlock }) {
  const { leftTitle, leftColor, leftItems, rightTitle, rightColor, rightItems } = block.data
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <p className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          {leftTitle}
        </p>
        <ul className="space-y-2">
          {leftItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className={`w-1.5 h-1.5 rounded-full bg-${leftColor} mt-1.5 shrink-0`} />
              <span className="text-sm text-via-text leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-sm font-semibold text-via-navy uppercase tracking-wide mb-3">
          {rightTitle}
        </p>
        <ul className="space-y-2">
          {rightItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className={`w-1.5 h-1.5 rounded-full bg-${rightColor} mt-1.5 shrink-0`} />
              <span className="text-sm text-via-text leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function NumberedListRenderer({ block }: { block: NumberedListBlock }) {
  return (
    <ol className="space-y-2 mb-6 list-none">
      {block.data.items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-via-orange text-white text-xs font-bold shrink-0 mt-0.5">
            {i + 1}
          </span>
          <span className="text-sm text-via-text leading-relaxed">{item}</span>
        </li>
      ))}
    </ol>
  )
}

function StatGridRenderer({ block }: { block: StatGridBlock }) {
  const cols = GRID_COLS[block.data.columns] ?? GRID_COLS[3]
  return (
    <div className={`grid ${cols} gap-4 mb-6`}>
      {block.data.stats.map((stat, i) => {
        const IconComponent = resolveIcon(stat.icon)
        return (
          <StatCard
            key={i}
            icon={<IconComponent className="w-6 h-6" />}
            value={stat.value}
            label={stat.label}
          />
        )
      })}
    </div>
  )
}

function FlowDiagramRenderer({ block }: { block: FlowDiagramBlock }) {
  return (
    <FlowDiagram
      steps={block.data.steps}
      label={block.data.label}
      color={block.data.color}
      highlightIndex={block.data.highlightIndex}
    />
  )
}

function InlineImageRenderer({ block }: { block: InlineImageBlock }) {
  return (
    <div className="overflow-hidden mb-4">
      <InlineImage
        src={block.data.src}
        alt={block.data.alt}
        float={block.data.float}
        size={block.data.size}
        caption={block.data.caption}
      />
    </div>
  )
}

function HeroImageRenderer({ block }: { block: HeroImageBlock }) {
  return (
    <div className="mb-6">
      <ImagePlaceholder
        src={block.data.src}
        alt={block.data.alt}
        aspectRatio={block.data.aspectRatio}
      />
    </div>
  )
}

/** Standalone expandable_card block (single card with its own state). */
function ExpandableCardSingleRenderer({ block }: { block: ExpandableCardBlock }) {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className="mb-3">
      <ExpandableCard
        title={block.data.title}
        subtitle={block.data.subtitle}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded((v) => !v)}
      >
        <div dangerouslySetInnerHTML={{ __html: sanitize(block.data.content) }} />
      </ExpandableCard>
    </div>
  )
}

function ExpandableCardGroupRenderer({ block }: { block: ExpandableCardGroupBlock }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="space-y-3 mb-6">
      {block.data.cards.map((card) => {
        const IconComponent = card.icon ? resolveIcon(card.icon) : undefined
        return (
          <ExpandableCard
            key={card.id}
            title={card.title}
            subtitle={card.subtitle}
            badge={card.badge ? <Badge text={card.badge.text} color={card.badge.color} /> : undefined}
            icon={IconComponent ? <IconComponent className="w-5 h-5" /> : undefined}
            isExpanded={expanded.has(card.id)}
            onToggle={() => toggle(card.id)}
            accentColor={card.accentColor}
          >
            <div dangerouslySetInnerHTML={{ __html: sanitize(card.content) }} />
          </ExpandableCard>
        )
      })}
    </div>
  )
}

function IconCardGridRenderer({ block }: { block: IconCardGridBlock }) {
  const cols = GRID_COLS[block.data.columns] ?? GRID_COLS[2]
  return (
    <div className={`grid ${cols} gap-4 mb-6`}>
      {block.data.cards.map((card, i) => {
        const IconComponent = resolveIcon(card.icon)
        return (
          <div
            key={i}
            className="bg-via-card rounded-xl border border-via-border p-5 flex flex-col items-center text-center gap-2"
          >
            <IconComponent className="w-6 h-6 text-via-orange" />
            <p className="text-sm font-semibold text-via-navy">{card.title}</p>
            <p className="text-xs text-via-text-light leading-relaxed">{card.description}</p>
          </div>
        )
      })}
    </div>
  )
}

function ScenarioCardRenderer({ block }: { block: ScenarioCardBlock }) {
  return <ScenarioCard scenarios={block.data.scenarios} title={block.data.title} />
}

function FillInBlankRenderer({ block }: { block: FillInBlankBlock }) {
  return <FillInBlank items={block.data.items} title={block.data.title} />
}

function TermMatchRenderer({ block }: { block: TermMatchBlock }) {
  return <TermMatch pairs={block.data.pairs} title={block.data.title} />
}

function AdditionalResourcesRenderer({ block }: { block: AdditionalResourcesBlock }) {
  return <AdditionalResources resources={block.data.resources} />
}

function DividerRenderer({ block }: { block: DividerBlock }) {
  const spacing = DIVIDER_SIZE[block.data.size ?? 'md']
  if (block.data.style === 'space') {
    return <div className={spacing} />
  }
  return <hr className={`border-t border-via-border ${spacing}`} />
}

// ─── Block Switch ─────────────────────────────────────────

interface BlockSwitchProps {
  block: ContentBlock
  blockMap: Map<string, ContentBlock>
}

function BlockSwitch({ block, blockMap }: BlockSwitchProps) {
  switch (block.type) {
    case 'paragraph':
      return <ParagraphRenderer block={block} />
    case 'heading':
      return <HeadingRenderer block={block} />
    case 'content_card':
      return <ContentCardRenderer block={block} blockMap={blockMap} />
    case 'callout':
      return <CalloutRenderer block={block} />
    case 'bullet_list':
      return <BulletListRenderer block={block} />
    case 'two_column_list':
      return <TwoColumnListRenderer block={block} />
    case 'numbered_list':
      return <NumberedListRenderer block={block} />
    case 'stat_grid':
      return <StatGridRenderer block={block} />
    case 'flow_diagram':
      return <FlowDiagramRenderer block={block} />
    case 'inline_image':
      return <InlineImageRenderer block={block} />
    case 'hero_image':
      return <HeroImageRenderer block={block} />
    case 'expandable_card':
      return <ExpandableCardSingleRenderer block={block} />
    case 'expandable_card_group':
      return <ExpandableCardGroupRenderer block={block} />
    case 'icon_card_grid':
      return <IconCardGridRenderer block={block} />
    case 'scenario_card':
      return <ScenarioCardRenderer block={block} />
    case 'fill_in_blank':
      return <FillInBlankRenderer block={block} />
    case 'term_match':
      return <TermMatchRenderer block={block} />
    case 'additional_resources':
      return <AdditionalResourcesRenderer block={block} />
    case 'divider':
      return <DividerRenderer block={block} />
    default:
      return null
  }
}

// ─── Main Component ───────────────────────────────────────

interface BlockRendererProps {
  content: PageContent
}

export function BlockRenderer({ content }: BlockRendererProps) {
  const { section, blocks } = content
  const blockMap = buildBlockMap(blocks)

  // Sort blocks by order, filter out children that are rendered inside content_cards
  const childIds = new Set<string>()
  for (const b of blocks) {
    if (b.type === 'content_card') {
      for (const childId of b.data.children) {
        childIds.add(childId)
      }
    }
  }

  const topLevelBlocks = blocks
    .filter((b) => !childIds.has(b.id))
    .sort((a, b) => a.order - b.order)

  const SectionIcon = resolveIcon(section.icon)

  return (
    <SectionWrapper
      id={section.sectionId}
      title={section.title}
      subtitle={section.subtitle}
      accentColor={section.accentColor}
      icon={<SectionIcon className="w-5 h-5" />}
    >
      {topLevelBlocks.map((block) => (
        <BlockSwitch key={block.id} block={block} blockMap={blockMap} />
      ))}
    </SectionWrapper>
  )
}
