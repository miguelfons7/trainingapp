/**
 * Block-based content types for the CMS editor.
 * Each block type maps to an existing shared/interactive component.
 */

// ─── Primitives ────────────────────────────────────────────
export type BlockId = string

/** Lucide icon name as a string (e.g. "BookOpen", "Stethoscope") */
export type LucideIconName = string

/** HTML string produced by rich text editor, sanitized before render */
export type RichText = string

export type BadgeColor =
  | 'emerald' | 'amber' | 'sky' | 'slate' | 'red' | 'orange'
  | 'teal' | 'purple' | 'blue' | 'indigo' | 'violet' | 'rose'

// ─── Base Block ────────────────────────────────────────────
export interface BlockBase {
  id: BlockId
  type: string
  order: number
}

// ─── Section Wrapper (page-level, not a block) ─────────────
export interface SectionWrapperData {
  sectionId: string
  title: string
  subtitle: string
  accentColor: string     // e.g. "border-sky-500"
  icon: LucideIconName
}

// ─── Content Blocks ────────────────────────────────────────

export interface ParagraphBlock extends BlockBase {
  type: 'paragraph'
  data: { content: RichText }
}

export interface HeadingBlock extends BlockBase {
  type: 'heading'
  data: { text: string; level: 3 | 4 }
}

export interface ContentCardBlock extends BlockBase {
  type: 'content_card'
  data: {
    title?: string
    children: BlockId[]
  }
}

export interface CalloutBlock extends BlockBase {
  type: 'callout'
  data: {
    style: 'info' | 'tip' | 'warning' | 'orange'
    title?: string
    content: RichText
  }
}

export interface BulletListBlock extends BlockBase {
  type: 'bullet_list'
  data: {
    items: string[]
    color?: string
  }
}

export interface TwoColumnListBlock extends BlockBase {
  type: 'two_column_list'
  data: {
    leftTitle: string
    leftColor: string
    leftItems: string[]
    rightTitle: string
    rightColor: string
    rightItems: string[]
  }
}

export interface NumberedListBlock extends BlockBase {
  type: 'numbered_list'
  data: { items: string[] }
}

// ─── Data Display Blocks ───────────────────────────────────

export interface StatGridBlock extends BlockBase {
  type: 'stat_grid'
  data: {
    columns: 2 | 3 | 4
    stats: Array<{
      icon: LucideIconName
      value: string
      label: string
    }>
  }
}

export interface FlowDiagramBlock extends BlockBase {
  type: 'flow_diagram'
  data: {
    label: string
    steps: string[]
    color: string
    highlightIndex?: number
  }
}

// ─── Image Blocks ──────────────────────────────────────────

export interface InlineImageBlock extends BlockBase {
  type: 'inline_image'
  data: {
    src: string
    alt: string
    float?: 'left' | 'right' | 'none'
    size?: 'small' | 'medium' | 'large'
    caption?: string
  }
}

export interface HeroImageBlock extends BlockBase {
  type: 'hero_image'
  data: {
    src: string
    alt: string
    aspectRatio: '16:9' | '4:3' | '1:1'
  }
}

// ─── Expandable Card Blocks ────────────────────────────────

export interface ExpandableCardItem {
  id: string
  title: string
  subtitle?: string
  badge?: { text: string; color: BadgeColor }
  icon?: LucideIconName
  accentColor?: string
  /** Rich text content rendered inside the card */
  content: RichText
}

export interface ExpandableCardGroupBlock extends BlockBase {
  type: 'expandable_card_group'
  data: {
    cards: ExpandableCardItem[]
  }
}

// ─── Icon Card Grid ────────────────────────────────────────

export interface IconCardGridBlock extends BlockBase {
  type: 'icon_card_grid'
  data: {
    columns: 1 | 2 | 3
    cards: Array<{
      icon: LucideIconName
      title: string
      description: string
    }>
  }
}

// ─── Interactive / Exercise Blocks ─────────────────────────

export interface ScenarioCardBlock extends BlockBase {
  type: 'scenario_card'
  data: {
    title?: string
    scenarios: Array<{
      id: string
      scenario: string
      options: string[]
      bestAnswerIndex: number
      explanation: string
    }>
  }
}

export interface FillInBlankBlock extends BlockBase {
  type: 'fill_in_blank'
  data: {
    title?: string
    items: Array<{
      id: string
      sentence: string
      blank: string
      options: string[]
      correctIndex: number
    }>
  }
}

export interface TermMatchBlock extends BlockBase {
  type: 'term_match'
  data: {
    title?: string
    pairs: Array<{
      term: string
      definition: string
    }>
  }
}

// ─── Resources & Dividers ──────────────────────────────────

export interface AdditionalResourcesBlock extends BlockBase {
  type: 'additional_resources'
  data: {
    resources: Array<{
      title: string
      url: string
      source: string
      description?: string
    }>
  }
}

export interface DividerBlock extends BlockBase {
  type: 'divider'
  data: {
    style: 'line' | 'space'
    size?: 'sm' | 'md' | 'lg'
  }
}

export interface VideoEmbedBlock extends BlockBase {
  type: 'video_embed'
  data: {
    /** Any YouTube URL form (watch, youtu.be, shorts, embed) */
    url: string
    title?: string
    caption?: string
  }
}

/** Standalone expandable card (not part of a group). Used in CMS code-mode content. */
export interface ExpandableCardBlock extends BlockBase {
  type: 'expandable_card'
  data: {
    title: string
    subtitle?: string
    content: string
  }
}

// ─── Union Type ────────────────────────────────────────────
export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ContentCardBlock
  | CalloutBlock
  | BulletListBlock
  | TwoColumnListBlock
  | NumberedListBlock
  | StatGridBlock
  | FlowDiagramBlock
  | InlineImageBlock
  | HeroImageBlock
  | ExpandableCardBlock
  | ExpandableCardGroupBlock
  | IconCardGridBlock
  | ScenarioCardBlock
  | FillInBlankBlock
  | TermMatchBlock
  | AdditionalResourcesBlock
  | DividerBlock
  | VideoEmbedBlock

export type BlockType = ContentBlock['type']

// ─── Quiz Data (CMS-editable quizzes) ─────────────────────
export interface SectionedQuizData {
  termMatch: Array<{ term: string; definition: string }>
  multipleChoice: Array<{
    id: string
    question: string
    options: string[]
    correctIndex: number
    explanation: string
  }>
  fillInBlank: Array<{
    id: string
    sentence: string
    blank: string
    options: string[]
    correctIndex: number
  }>
  passThreshold: number
  nextCourse?: { id: string; title: string }
}

// ─── Page Document ─────────────────────────────────────────
export interface PageContent {
  version: 1
  section: SectionWrapperData
  blocks: ContentBlock[]
  quizData?: SectionedQuizData
}

// ─── Block Metadata (for the palette/UI) ───────────────────
export interface BlockMeta {
  type: BlockType
  label: string
  icon: LucideIconName
  category: 'text' | 'layout' | 'data' | 'media' | 'accordion' | 'exercise' | 'other'
}

export const BLOCK_CATALOG: BlockMeta[] = [
  // Text
  { type: 'paragraph', label: 'Paragraph', icon: 'Type', category: 'text' },
  { type: 'heading', label: 'Heading', icon: 'Heading3', category: 'text' },
  { type: 'callout', label: 'Callout', icon: 'MessageSquare', category: 'text' },
  { type: 'bullet_list', label: 'Bullet List', icon: 'List', category: 'text' },
  { type: 'numbered_list', label: 'Numbered List', icon: 'ListOrdered', category: 'text' },
  // Layout
  { type: 'content_card', label: 'Content Card', icon: 'SquareStack', category: 'layout' },
  { type: 'two_column_list', label: 'Two-Column List', icon: 'Columns2', category: 'layout' },
  { type: 'divider', label: 'Divider', icon: 'Minus', category: 'layout' },
  // Data
  { type: 'stat_grid', label: 'Stat Grid', icon: 'BarChart3', category: 'data' },
  { type: 'flow_diagram', label: 'Flow Diagram', icon: 'GitBranch', category: 'data' },
  { type: 'icon_card_grid', label: 'Icon Card Grid', icon: 'LayoutGrid', category: 'data' },
  // Media
  { type: 'inline_image', label: 'Image', icon: 'Image', category: 'media' },
  { type: 'hero_image', label: 'Hero Image', icon: 'ImageUp', category: 'media' },
  { type: 'video_embed', label: 'Video (YouTube)', icon: 'Video', category: 'media' },
  // Accordion
  { type: 'expandable_card_group', label: 'Expandable Cards', icon: 'ChevronDown', category: 'accordion' },
  // Exercise
  { type: 'scenario_card', label: 'Scenario Exercise', icon: 'HelpCircle', category: 'exercise' },
  { type: 'fill_in_blank', label: 'Fill in the Blank', icon: 'TextCursorInput', category: 'exercise' },
  { type: 'term_match', label: 'Term Match', icon: 'ArrowLeftRight', category: 'exercise' },
  // Other
  { type: 'additional_resources', label: 'Resources', icon: 'ExternalLink', category: 'other' },
]
