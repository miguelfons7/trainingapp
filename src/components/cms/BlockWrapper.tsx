import { useState } from 'react'
import { GripVertical, Trash2, ChevronUp, ChevronDown, Copy } from 'lucide-react'
import { BLOCK_CATALOG, type ContentBlock } from '../../types/blocks'
import { resolveIcon } from './iconResolver'

interface BlockWrapperProps {
  block: ContentBlock
  isFirst: boolean
  isLast: boolean
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  onDuplicate: () => void
  children: React.ReactNode
}

export function BlockWrapper({
  block,
  isFirst,
  isLast,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  children,
}: BlockWrapperProps) {
  const [collapsed, setCollapsed] = useState(false)
  const meta = BLOCK_CATALOG.find((b) => b.type === block.type)
  const Icon = meta ? resolveIcon(meta.icon) : GripVertical

  return (
    <div className="group relative bg-via-card rounded-xl border border-via-border hover:border-via-orange/40 transition-colors">
      {/* Block header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-via-border bg-via-bg-subtle/50 rounded-t-xl">
        <GripVertical className="w-4 h-4 text-via-text-light cursor-grab shrink-0" />
        <Icon className="w-4 h-4 text-via-orange shrink-0" />
        <span className="text-xs font-semibold text-via-navy uppercase tracking-wide flex-1">
          {meta?.label ?? block.type}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className="p-1 rounded text-via-text-light hover:text-via-navy hover:bg-via-bg-subtle transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            title="Move up"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className="p-1 rounded text-via-text-light hover:text-via-navy hover:bg-via-bg-subtle transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            title="Move down"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDuplicate}
            className="p-1 rounded text-via-text-light hover:text-via-navy hover:bg-via-bg-subtle transition-colors cursor-pointer"
            title="Duplicate"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded text-via-text-light hover:text-via-danger hover:bg-via-danger/10 transition-colors cursor-pointer"
            title="Delete block"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded text-via-text-light hover:text-via-navy transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Block content (editor form) */}
      {!collapsed && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  )
}
