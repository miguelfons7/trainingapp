const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-700 border border-emerald-500',
  amber: 'bg-amber-100 text-amber-700 border border-amber-500',
  sky: 'bg-sky-100 text-sky-700 border border-sky-500',
  slate: 'bg-via-border text-via-text border border-via-border',
  red: 'bg-red-100 text-red-700 border border-red-500',
  orange: 'bg-orange-100 text-orange-700 border border-orange-500',
  teal: 'bg-teal-100 text-teal-700 border border-teal-500',
  purple: 'bg-purple-100 text-purple-700 border border-purple-500',
  blue: 'bg-blue-100 text-blue-700 border border-blue-500',
  indigo: 'bg-indigo-100 text-indigo-700 border border-indigo-500',
  violet: 'bg-violet-100 text-violet-700 border border-violet-500',
  rose: 'bg-rose-100 text-rose-700 border border-rose-500',
}

interface BadgeProps {
  text: string
  color: string
}

export function Badge({ text, color }: BadgeProps) {
  const classes = colorMap[color] ?? colorMap.slate
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide ${classes}`}
    >
      {text}
    </span>
  )
}
