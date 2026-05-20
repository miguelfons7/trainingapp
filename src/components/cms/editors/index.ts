import type { ComponentType } from 'react'
import type { BlockType } from '../../../types/blocks'

import { ParagraphEditor } from './ParagraphEditor'
import { HeadingEditor } from './HeadingEditor'
import { CalloutEditor } from './CalloutEditor'
import { BulletListEditor } from './BulletListEditor'
import { NumberedListEditor } from './NumberedListEditor'
import { ContentCardEditor } from './ContentCardEditor'
import { TwoColumnListEditor } from './TwoColumnListEditor'
import { StatGridEditor } from './StatGridEditor'
import { FlowDiagramEditor } from './FlowDiagramEditor'
import { InlineImageEditor } from './InlineImageEditor'
import { HeroImageEditor } from './HeroImageEditor'
import { ExpandableCardGroupEditor } from './ExpandableCardGroupEditor'
import { IconCardGridEditor } from './IconCardGridEditor'
import { ScenarioCardEditor } from './ScenarioCardEditor'
import { FillInBlankEditor } from './FillInBlankEditor'
import { TermMatchEditor } from './TermMatchEditor'
import { AdditionalResourcesEditor } from './AdditionalResourcesEditor'
import { DividerEditor } from './DividerEditor'

/**
 * Registry mapping each BlockType to its editor component.
 * Every editor accepts `{ block, onChange }` props.
 */
export const BLOCK_EDITORS: Record<
  BlockType,
  ComponentType<{ block: any; onChange: (b: any) => void }>
> = {
  paragraph: ParagraphEditor,
  heading: HeadingEditor,
  callout: CalloutEditor,
  bullet_list: BulletListEditor,
  numbered_list: NumberedListEditor,
  content_card: ContentCardEditor,
  two_column_list: TwoColumnListEditor,
  stat_grid: StatGridEditor,
  flow_diagram: FlowDiagramEditor,
  inline_image: InlineImageEditor,
  hero_image: HeroImageEditor,
  expandable_card: ExpandableCardGroupEditor,  // Reuse group editor for standalone cards
  expandable_card_group: ExpandableCardGroupEditor,
  icon_card_grid: IconCardGridEditor,
  scenario_card: ScenarioCardEditor,
  fill_in_blank: FillInBlankEditor,
  term_match: TermMatchEditor,
  additional_resources: AdditionalResourcesEditor,
  divider: DividerEditor,
}

// Re-export individual editors for direct imports
export { ParagraphEditor } from './ParagraphEditor'
export { HeadingEditor } from './HeadingEditor'
export { CalloutEditor } from './CalloutEditor'
export { BulletListEditor } from './BulletListEditor'
export { NumberedListEditor } from './NumberedListEditor'
export { ContentCardEditor } from './ContentCardEditor'
export { TwoColumnListEditor } from './TwoColumnListEditor'
export { StatGridEditor } from './StatGridEditor'
export { FlowDiagramEditor } from './FlowDiagramEditor'
export { InlineImageEditor } from './InlineImageEditor'
export { HeroImageEditor } from './HeroImageEditor'
export { ExpandableCardGroupEditor } from './ExpandableCardGroupEditor'
export { IconCardGridEditor } from './IconCardGridEditor'
export { ScenarioCardEditor } from './ScenarioCardEditor'
export { FillInBlankEditor } from './FillInBlankEditor'
export { TermMatchEditor } from './TermMatchEditor'
export { AdditionalResourcesEditor } from './AdditionalResourcesEditor'
export { DividerEditor } from './DividerEditor'
