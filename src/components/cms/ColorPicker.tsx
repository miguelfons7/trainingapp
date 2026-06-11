interface ColorPickerProps {
  /** Tailwind border class, e.g. "border-sky-500" */
  value: string
  onChange: (borderClass: string) => void
}

/** The app's course accent palette — matches existing course colors */
const ACCENT_COLORS: { border: string; swatch: string; label: string }[] = [
  { border: 'border-blue-500', swatch: 'bg-blue-500', label: 'Blue' },
  { border: 'border-orange-500', swatch: 'bg-orange-500', label: 'Orange' },
  { border: 'border-red-500', swatch: 'bg-red-500', label: 'Red' },
  { border: 'border-teal-500', swatch: 'bg-teal-500', label: 'Teal' },
  { border: 'border-violet-500', swatch: 'bg-violet-500', label: 'Violet' },
  { border: 'border-sky-500', swatch: 'bg-sky-500', label: 'Sky' },
  { border: 'border-emerald-500', swatch: 'bg-emerald-500', label: 'Emerald' },
  { border: 'border-amber-500', swatch: 'bg-amber-500', label: 'Amber' },
  { border: 'border-rose-500', swatch: 'bg-rose-500', label: 'Rose' },
  { border: 'border-indigo-500', swatch: 'bg-indigo-500', label: 'Indigo' },
]

/**
 * Accent color swatch picker for section settings. Replaces the raw
 * "border-sky-500" text input — a typo'd class silently rendered nothing.
 */
export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {ACCENT_COLORS.map((c) => (
        <button
          key={c.border}
          type="button"
          onClick={() => onChange(c.border)}
          className={`w-7 h-7 rounded-full ${c.swatch} transition-transform cursor-pointer hover:scale-110 ${
            value === c.border
              ? 'ring-2 ring-offset-2 ring-via-navy scale-110'
              : ''
          }`}
          title={c.label}
        />
      ))}
    </div>
  )
}
