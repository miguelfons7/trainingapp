interface StatCardProps {
  icon: React.ReactNode
  value: string
  label: string
}

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col items-center text-center gap-2">
      <span className="text-blue-600">{icon}</span>
      <span className="text-2xl font-bold text-slate-900">{value}</span>
      <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">
        {label}
      </span>
    </div>
  )
}
