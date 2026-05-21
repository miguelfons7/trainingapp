import type { PageContent, ContentBlock } from '../types/blocks'

/**
 * Normalize a single block's data to use standard CMS field names.
 *
 * Some content was authored with alternative field names:
 *   - paragraph: data.html → data.content
 *   - callout:   data.variant → data.style, data.html → data.content
 *   - heading:   data.level "h2"/"h3"/"h4" → 3/4
 *
 * This function converts them to the canonical names so editors work correctly.
 * When content is saved through the editor, it writes back the standard names,
 * effectively migrating the data.
 */
function normalizeBlock(block: ContentBlock): ContentBlock {
  const d = block.data as Record<string, unknown>

  switch (block.type) {
    case 'paragraph': {
      if (!d.content && d.html) {
        return {
          ...block,
          data: { content: d.html as string },
        } as ContentBlock
      }
      return block
    }

    case 'heading': {
      const level = d.level
      if (typeof level === 'string') {
        const numLevel = level === 'h4' ? 4 : 3 // h2, h3 both map to 3
        return {
          ...block,
          data: { ...block.data, level: numLevel },
        } as ContentBlock
      }
      return block
    }

    case 'callout': {
      const updates: Record<string, unknown> = { ...block.data }
      let changed = false

      if (!d.style && d.variant) {
        updates.style = d.variant
        delete updates.variant
        changed = true
      }
      if (!d.content && d.html) {
        updates.content = d.html
        delete updates.html
        changed = true
      }

      return changed
        ? ({ ...block, data: updates } as ContentBlock)
        : block
    }

    default:
      return block
  }
}

/**
 * Normalize all blocks in a PageContent to use standard field names.
 * Safe to call on already-normalized content (no-op).
 */
export function normalizePageContent(content: PageContent): PageContent {
  return {
    ...content,
    blocks: content.blocks.map(normalizeBlock),
  }
}
