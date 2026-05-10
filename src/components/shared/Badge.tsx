const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-800',
  amber: 'bg-amber-100 text-amber-800',
  sky: 'bg-sky-100 text-sky-800',
  slate: 'bg-slate-100 text-slate-800',
  red: 'bg-red-100 text-red-800',
  orange: 'bg-orange-100 text-orange-800',
  teal: 'bg-teal-100 text-teal-800',
  purple: 'bg-purple-100 text-purple-800',
  blue: 'bg-blue-100 text-blue-800',
  indigo: 'bg-indigo-100 text-indigo-800',
  violet: 'bg-violet-100 text-violet-800',
  rose: 'bg-rose-100 text-rose-800',
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
