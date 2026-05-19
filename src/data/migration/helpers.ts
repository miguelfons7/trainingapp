/**
 * CMS Migration Helpers
 * Builder utilities for constructing PageContent objects from hardcoded data.
 */
import type {
  PageContent,
  ContentBlock,
  SectionWrapperData,
  SectionedQuizData,
  LucideIconName,
  BadgeColor,
} from '../../types/blocks'

let _uid = 0
/** Generate a unique block ID for migration content */
function uid(): string {
  return `mig-${++_uid}-${Math.random().toString(36).slice(2, 8)}`
}

/** Reset the UID counter (call between modules) */
export function resetUid() {
  _uid = 0
}

/**
 * ContentBuilder — fluent builder for constructing PageContent.
 *
 * Usage:
 *   const content = new ContentBuilder('module-id', 'Title', 'Subtitle', 'border-blue-500', 'BookOpen')
 *     .paragraph('Some text...')
 *     .heading('Section Title', 3)
 *     .build()
 */
export class ContentBuilder {
  private blocks: ContentBlock[] = []
  private order = 0
  private sectionData: SectionWrapperData
  private _quizData?: SectionedQuizData

  constructor(
    sectionId: string,
    title: string,
    subtitle: string,
    accentColor: string,
    icon: LucideIconName,
  ) {
    this.sectionData = { sectionId, title, subtitle, accentColor, icon }
  }

  private nextOrder(): number {
    return this.order++
  }

  // ─── Text Blocks ────────────────────────────────────────

  paragraph(content: string): this {
    this.blocks.push({
      id: uid(),
      type: 'paragraph',
      order: this.nextOrder(),
      data: { content },
    } as ContentBlock)
    return this
  }

  heading(text: string, level: 3 | 4 = 3): this {
    this.blocks.push({
      id: uid(),
      type: 'heading',
      order: this.nextOrder(),
      data: { text, level },
    } as ContentBlock)
    return this
  }

  callout(
    style: 'info' | 'tip' | 'warning' | 'orange',
    content: string,
    title?: string,
  ): this {
    this.blocks.push({
      id: uid(),
      type: 'callout',
      order: this.nextOrder(),
      data: { style, content, title },
    } as ContentBlock)
    return this
  }

  bulletList(items: string[], color?: string): this {
    this.blocks.push({
      id: uid(),
      type: 'bullet_list',
      order: this.nextOrder(),
      data: { items, color },
    } as ContentBlock)
    return this
  }

  numberedList(items: string[]): this {
    this.blocks.push({
      id: uid(),
      type: 'numbered_list',
      order: this.nextOrder(),
      data: { items },
    } as ContentBlock)
    return this
  }

  twoColumnList(
    leftTitle: string,
    leftColor: string,
    leftItems: string[],
    rightTitle: string,
    rightColor: string,
    rightItems: string[],
  ): this {
    this.blocks.push({
      id: uid(),
      type: 'two_column_list',
      order: this.nextOrder(),
      data: { leftTitle, leftColor, leftItems, rightTitle, rightColor, rightItems },
    } as ContentBlock)
    return this
  }

  // ─── Layout Blocks ──────────────────────────────────────

  /** Content card with nested child blocks. Pass a builder function to add children. */
  contentCard(title: string | undefined, childrenFn: (cb: ChildBuilder) => void): this {
    const childBuilder = new ChildBuilder()
    childrenFn(childBuilder)
    const childBlocks = childBuilder.getBlocks()

    // Assign orders to children starting after the card itself
    const cardOrder = this.nextOrder()
    const childIds: string[] = []

    for (const child of childBlocks) {
      child.order = this.nextOrder()
      childIds.push(child.id)
      this.blocks.push(child)
    }

    // Insert the card block before its children (at the reserved order)
    this.blocks.push({
      id: uid(),
      type: 'content_card',
      order: cardOrder,
      data: { title, children: childIds },
    } as ContentBlock)

    return this
  }

  divider(style: 'line' | 'space' = 'space', size?: 'sm' | 'md' | 'lg'): this {
    this.blocks.push({
      id: uid(),
      type: 'divider',
      order: this.nextOrder(),
      data: { style, size },
    } as ContentBlock)
    return this
  }

  // ─── Data Display Blocks ────────────────────────────────

  statGrid(
    columns: 2 | 3 | 4,
    stats: Array<{ icon: LucideIconName; value: string; label: string }>,
  ): this {
    this.blocks.push({
      id: uid(),
      type: 'stat_grid',
      order: this.nextOrder(),
      data: { columns, stats },
    } as ContentBlock)
    return this
  }

  flowDiagram(
    label: string,
    steps: string[],
    color: string,
    highlightIndex?: number,
  ): this {
    this.blocks.push({
      id: uid(),
      type: 'flow_diagram',
      order: this.nextOrder(),
      data: { label, steps, color, highlightIndex },
    } as ContentBlock)
    return this
  }

  iconCardGrid(
    columns: 1 | 2 | 3,
    cards: Array<{ icon: LucideIconName; title: string; description: string }>,
  ): this {
    this.blocks.push({
      id: uid(),
      type: 'icon_card_grid',
      order: this.nextOrder(),
      data: { columns, cards },
    } as ContentBlock)
    return this
  }

  // ─── Image Blocks ───────────────────────────────────────

  inlineImage(
    src: string,
    alt: string,
    float?: 'left' | 'right' | 'none',
    size?: 'small' | 'medium' | 'large',
    caption?: string,
  ): this {
    this.blocks.push({
      id: uid(),
      type: 'inline_image',
      order: this.nextOrder(),
      data: { src, alt, float, size, caption },
    } as ContentBlock)
    return this
  }

  heroImage(src: string, alt: string, aspectRatio: '16:9' | '4:3' | '1:1' = '16:9'): this {
    this.blocks.push({
      id: uid(),
      type: 'hero_image',
      order: this.nextOrder(),
      data: { src, alt, aspectRatio },
    } as ContentBlock)
    return this
  }

  // ─── Expandable / Accordion Blocks ──────────────────────

  expandableCardGroup(
    cards: Array<{
      id: string
      title: string
      subtitle?: string
      badge?: { text: string; color: BadgeColor }
      icon?: LucideIconName
      accentColor?: string
      content: string
    }>,
  ): this {
    this.blocks.push({
      id: uid(),
      type: 'expandable_card_group',
      order: this.nextOrder(),
      data: { cards },
    } as ContentBlock)
    return this
  }

  // ─── Interactive / Exercise Blocks ──────────────────────

  scenarioCard(
    scenarios: Array<{
      id: string
      scenario: string
      options: string[]
      bestAnswerIndex: number
      explanation: string
    }>,
    title?: string,
  ): this {
    this.blocks.push({
      id: uid(),
      type: 'scenario_card',
      order: this.nextOrder(),
      data: { title, scenarios },
    } as ContentBlock)
    return this
  }

  fillInBlank(
    items: Array<{
      id: string
      sentence: string
      blank: string
      options: string[]
      correctIndex: number
    }>,
    title?: string,
  ): this {
    this.blocks.push({
      id: uid(),
      type: 'fill_in_blank',
      order: this.nextOrder(),
      data: { title, items },
    } as ContentBlock)
    return this
  }

  termMatch(
    pairs: Array<{ term: string; definition: string }>,
    title?: string,
  ): this {
    this.blocks.push({
      id: uid(),
      type: 'term_match',
      order: this.nextOrder(),
      data: { title, pairs },
    } as ContentBlock)
    return this
  }

  // ─── Resources ──────────────────────────────────────────

  additionalResources(
    resources: Array<{
      title: string
      url: string
      source: string
      description?: string
    }>,
  ): this {
    this.blocks.push({
      id: uid(),
      type: 'additional_resources',
      order: this.nextOrder(),
      data: { resources },
    } as ContentBlock)
    return this
  }

  // ─── Quiz Data ──────────────────────────────────────────

  quizData(data: SectionedQuizData): this {
    this._quizData = data
    return this
  }

  // ─── Build ──────────────────────────────────────────────

  build(): PageContent {
    return {
      version: 1,
      section: this.sectionData,
      blocks: this.blocks,
      ...(this._quizData ? { quizData: this._quizData } : {}),
    }
  }
}

/**
 * ChildBuilder — for building content_card children.
 * Supports paragraph, heading, callout, bulletList, numberedList.
 */
class ChildBuilder {
  private blocks: ContentBlock[] = []

  paragraph(content: string): this {
    this.blocks.push({
      id: uid(),
      type: 'paragraph',
      order: 0,
      data: { content },
    } as ContentBlock)
    return this
  }

  heading(text: string, level: 3 | 4 = 3): this {
    this.blocks.push({
      id: uid(),
      type: 'heading',
      order: 0,
      data: { text, level },
    } as ContentBlock)
    return this
  }

  bulletList(items: string[], color?: string): this {
    this.blocks.push({
      id: uid(),
      type: 'bullet_list',
      order: 0,
      data: { items, color },
    } as ContentBlock)
    return this
  }

  callout(
    style: 'info' | 'tip' | 'warning' | 'orange',
    content: string,
    title?: string,
  ): this {
    this.blocks.push({
      id: uid(),
      type: 'callout',
      order: 0,
      data: { style, content, title },
    } as ContentBlock)
    return this
  }

  getBlocks(): ContentBlock[] {
    return this.blocks
  }
}

/** Convenience type for module migration entries */
export interface MigrationEntry {
  courseId: string
  moduleId: string
  content: PageContent
}
