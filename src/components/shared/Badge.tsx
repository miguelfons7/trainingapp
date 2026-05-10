const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-900/50 text-emerald-300 border border-emerald-700',
  amber: 'bg-amber-900/50 text-amber-300 border border-amber-700',
  sky: 'bg-sky-900/50 text-sky-300 border border-sky-700',
  slate: 'bg-slate-700/50 text-slate-300 border border-slate-600',
  red: 'bg-red-900/50 text-red-300 border border-red-700',
  orange: 'bg-orange-900/50 text-orange-300 border border-orange-700',
  teal: 'bg-teal-900/50 text-teal-300 border border-teal-700',
  purple: 'bg-purple-900/50 text-purple-300 border border-purple-700',
  blue: 'bg-blue-900/50 text-blue-300 border border-blue-700',
  indigo: 'bg-indigo-900/50 text-indigo-300 border border-indigo-700',
  violet: 'bg-violet-900/50 text-violet-300 border border-violet-700',
  rose: 'bg-rose-900/50 text-rose-300 border border-rose-700',
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
