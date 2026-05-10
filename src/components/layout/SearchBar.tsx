import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  resultCount: number
  hasQuery: boolean
}

export function SearchBar({ value, onChange, resultCount, hasQuery }: SearchBarProps) {
  return (
    <div className="relative max-w-md mx-auto mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search glossary terms..."
        className="w-full pl-10 pr-20 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
      />
      {hasQuery && (
        <>
          <span className="absolute right-10 top-1/2 -translate-y-1/2 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {resultCount}
          </span>
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  )
}
