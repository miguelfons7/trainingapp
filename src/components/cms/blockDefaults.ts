import type {
  ContentBlock,
  BlockType,
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

function uid(): string {
  return crypto.randomUUID()
}

/**
 * Create a new block with a unique ID and sensible default data.
 * The returned `order` is always 0 -- callers should adjust it
 * to the insertion position before committing to the block list.
 */
export function createDefaultBlock(type: BlockType): ContentBlock {
  switch (type) {
    case 'paragraph':
      return {
        id: uid(),
        type: 'paragraph',
        order: 0,
        data: { content: '' },
      } satisfies ParagraphBlock

    case 'heading':
      return {
        id: uid(),
        type: 'heading',
        order: 0,
        data: { text: 'New Heading', level: 3 },
      } satisfies HeadingBlock

    case 'content_card':
      return {
        id: uid(),
        type: 'content_card',
        order: 0,
        data: { title: '', children: [] },
      } satisfies ContentCardBlock

    case 'callout':
      return {
        id: uid(),
        type: 'callout',
        order: 0,
        data: { style: 'info', title: '', content: '' },
      } satisfies CalloutBlock

    case 'bullet_list':
      return {
        id: uid(),
        type: 'bullet_list',
        order: 0,
        data: { items: ['Item 1'] },
      } satisfies BulletListBlock

    case 'two_column_list':
      return {
        id: uid(),
        type: 'two_column_list',
        order: 0,
        data: {
          leftTitle: 'Do',
          leftColor: 'emerald-500',
          leftItems: ['Example item'],
          rightTitle: "Don't",
          rightColor: 'red-500',
          rightItems: ['Example item'],
        },
      } satisfies TwoColumnListBlock

    case 'numbered_list':
      return {
        id: uid(),
        type: 'numbered_list',
        order: 0,
        data: { items: ['Step 1'] },
      } satisfies NumberedListBlock

    case 'stat_grid':
      return {
        id: uid(),
        type: 'stat_grid',
        order: 0,
        data: {
          columns: 3,
          stats: [
            { icon: 'BarChart', value: '0', label: 'Stat' },
          ],
        },
      } satisfies StatGridBlock

    case 'flow_diagram':
      return {
        id: uid(),
        type: 'flow_diagram',
        order: 0,
        data: {
          label: 'Process Flow',
          steps: ['Step 1', 'Step 2', 'Step 3'],
          color: 'bg-via-orange',
        },
      } satisfies FlowDiagramBlock

    case 'inline_image':
      return {
        id: uid(),
        type: 'inline_image',
        order: 0,
        data: {
          src: '',
          alt: 'Image description',
          float: 'right',
          size: 'medium',
        },
      } satisfies InlineImageBlock

    case 'hero_image':
      return {
        id: uid(),
        type: 'hero_image',
        order: 0,
        data: {
          src: '',
          alt: 'Hero image',
          aspectRatio: '16:9',
        },
      } satisfies HeroImageBlock

    case 'expandable_card':
      return {
        id: uid(),
        type: 'expandable_card',
        order: 0,
        data: { title: 'Card Title', content: '<p>Card content goes here.</p>' },
      } satisfies ExpandableCardBlock

    case 'expandable_card_group':
      return {
        id: uid(),
        type: 'expandable_card_group',
        order: 0,
        data: {
          cards: [
            {
              id: uid(),
              title: 'Card Title',
              content: '<p>Card content goes here.</p>',
            },
          ],
        },
      } satisfies ExpandableCardGroupBlock

    case 'icon_card_grid':
      return {
        id: uid(),
        type: 'icon_card_grid',
        order: 0,
        data: {
          columns: 2,
          cards: [
            { icon: 'Star', title: 'Card Title', description: 'Short description.' },
          ],
        },
      } satisfies IconCardGridBlock

    case 'scenario_card':
      return {
        id: uid(),
        type: 'scenario_card',
        order: 0,
        data: {
          title: 'Scenario Practice',
          scenarios: [
            {
              id: uid(),
              scenario: 'Describe the scenario here.',
              options: ['Option A', 'Option B', 'Option C'],
              bestAnswerIndex: 0,
              explanation: 'Explain why Option A is best.',
            },
          ],
        },
      } satisfies ScenarioCardBlock

    case 'fill_in_blank':
      return {
        id: uid(),
        type: 'fill_in_blank',
        order: 0,
        data: {
          title: 'Fill in the Blanks',
          items: [
            {
              id: uid(),
              sentence: 'The _____ is correct.',
              blank: 'answer',
              options: ['answer', 'question', 'problem'],
              correctIndex: 0,
            },
          ],
        },
      } satisfies FillInBlankBlock

    case 'term_match':
      return {
        id: uid(),
        type: 'term_match',
        order: 0,
        data: {
          title: 'Match the Terms',
          pairs: [
            { term: 'Term', definition: 'Definition' },
          ],
        },
      } satisfies TermMatchBlock

    case 'additional_resources':
      return {
        id: uid(),
        type: 'additional_resources',
        order: 0,
        data: {
          resources: [
            { title: 'Resource Title', url: 'https://example.com', source: 'Source', description: '' },
          ],
        },
      } satisfies AdditionalResourcesBlock

    case 'divider':
      return {
        id: uid(),
        type: 'divider',
        order: 0,
        data: { style: 'line', size: 'md' },
      } satisfies DividerBlock
  }
}
