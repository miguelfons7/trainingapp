import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { BLOCK_CATALOG, type BlockType } from '../../types/blocks'
import { resolveIcon } from './iconResolver'

interface BlockPaletteProps {
  onAdd: (type: BlockType) => void
}

const CATEGORY_LABELS: Record<string, string> = {
  text: 'Text',
  layout: 'Layout',
  data: 'Data & Charts',
  media: 'Media',
  accordion: 'Accordions',
  exercise: 'Exercises',
  other: 'Other',
}

const CATEGORY_ORDER = ['text', 'layout', 'data', 'media', 'accordion', 'exercise', 'other']

export function BlockPalette({ onAdd }: BlockPaletteProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = search.trim()
    ? BLOCK_CATALOG.filter((b) => b.label.toLowerCase().includes(search.toLowerCase()))
    : BLOCK_CATALOG

  const grouped = CATEGORY_ORDER
    .map((cat) => ({
      category: cat,
      label: CATEGORY_LABELS[cat] ?? cat,
      blocks: filtered.filter((b) => b.category === cat),
    }))
    .filter((g) => g.blocks.length > 0)

  function handleSelect(type: BlockType) {
    onAdd(type)
    setOpen(false)
    setSearch('')
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full py-3 border-2 border-dashed border-via-border rounded-xl text-sm font-medium text-via-text-light hover:border-via-orange hover:text-via-orange transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Block
      </button>
    )
  }

  return (
    <div className="bg-via-card rounded-xl border-2 border-via-orange/30 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-via-border">
        <span className="text-sm font-semibold text-via-navy">Add Block</span>
        <button
          onClick={() => { setOpen(false); setSearch('') }}
          className="p-1 rounded-lg text-via-text-light hover:text-via-text hover:bg-via-bg-subtle transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-2 border-b border-via-border">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blocks..."
          autoFocus
          className="w-full px-3 py-2 rounded-lg border border-via-border bg-white text-sm text-via-text placeholder:text-via-text-light/50 focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
        />
      </div>

      {/* Block list */}
      <div className="max-h-72 overflow-y-auto p-2">
        {grouped.length === 0 ? (
          <p className="text-sm text-via-text-light text-center py-4">No blocks match</p>
        ) : (
          grouped.map((group) => (
            <div key={group.category} className="mb-2 last:mb-0">
              <p className="text-[10px] font-bold text-via-text-light uppercase tracking-wider px-2 py-1">
                {group.label}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {group.blocks.map((block) => {
                  const Icon = resolveIcon(block.icon)
                  return (
                    <button
                      key={block.type}
                      onClick={() => handleSelect(block.type)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-via-text hover:bg-via-orange/10 hover:text-via-orange transition-colors cursor-pointer text-left"
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{block.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
