interface StatCardProps {
  icon: React.ReactNode
  value: string
  label: string
}

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="bg-via-card rounded-xl border border-via-border p-5 flex flex-col items-center text-center gap-2">
      <span className="text-via-orange">{icon}</span>
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-xs text-slate-400 uppercase tracking-wide font-medium">
        {label}
      </span>
    </div>
  )
}
