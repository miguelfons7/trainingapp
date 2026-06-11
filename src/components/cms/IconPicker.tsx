import { useState, useRef, useEffect } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { ICON_NAMES, resolveIcon } from './iconResolver'

interface IconPickerProps {
  value: string | undefined
  onChange: (iconName: string | undefined) => void
  /** Allow clearing the icon (for optional icon fields) */
  allowNone?: boolean
}

/**
 * Visual icon picker for CMS editors. Only offers icons the renderer can
 * actually resolve — eliminates the silent typo failure mode of raw text inputs.
 */
export function IconPicker({ value, onChange, allowNone = true }: IconPickerProps) {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  const SelectedIcon = value ? resolveIcon(value) : null
  const filtered = ICON_NAMES.filter((n) =>
    n.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange cursor-pointer"
      >
        {SelectedIcon ? (
          <>
            <SelectedIcon className="w-4 h-4 text-via-navy" />
            <span className="flex-1 text-left">{value}</span>
          </>
        ) : (
          <span className="flex-1 text-left text-via-text-light">No icon</span>
        )}
        {allowNone && value && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation()
              onChange(undefined)
            }}
            className="p-0.5 rounded hover:bg-via-bg-subtle text-via-text-light hover:text-via-danger"
            title="Clear icon"
          >
            <X className="w-3.5 h-3.5" />
          </span>
        )}
        <ChevronDown className="w-4 h-4 text-via-text-light" />
      </button>

      {open && (
        <div className="absolute z-30 mt-1 w-72 rounded-lg border border-via-border bg-white shadow-xl p-2">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search icons..."
            autoFocus
            className="w-full px-2.5 py-1.5 mb-2 rounded-md border border-via-border text-xs focus:outline-none focus:ring-1 focus:ring-via-orange/40"
          />
          <div className="grid grid-cols-6 gap-1 max-h-48 overflow-y-auto">
            {filtered.map((name) => {
              const Icon = resolveIcon(name)
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    onChange(name)
                    setOpen(false)
                    setFilter('')
                  }}
                  className={`p-2 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                    value === name
                      ? 'bg-via-orange/15 text-via-orange'
                      : 'text-via-text hover:bg-via-bg-subtle'
                  }`}
                  title={name}
                >
                  <Icon className="w-4 h-4" />
                </button>
              )
            })}
            {filtered.length === 0 && (
              <p className="col-span-6 text-xs text-via-text-light text-center py-3">
                No icons match
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
