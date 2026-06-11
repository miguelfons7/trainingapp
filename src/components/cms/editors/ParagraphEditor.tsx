import type { ParagraphBlock } from '../../../types/blocks'
import { RichTextEditor } from '../RichTextEditor'

interface Props {
  block: ParagraphBlock
  onChange: (updated: ParagraphBlock) => void
}

export function ParagraphEditor({ block, onChange }: Props) {
  return (
    <div>
      <label className="block text-xs font-medium text-via-text mb-1.5">Content</label>
      <RichTextEditor
        value={block.data.content}
        onChange={(html) =>
          onChange({ ...block, data: { ...block.data, content: html } })
        }
        placeholder="Enter paragraph text..."
        rows={5}
      />
    </div>
  )
}
