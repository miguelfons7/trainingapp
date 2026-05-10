import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
import { ExpandableCard } from '../shared/ExpandableCard'
import { Badge } from '../shared/Badge'
import { SearchBar } from '../layout/SearchBar'
import { useSearch } from '../../hooks/useSearch'
import { glossaryCategories } from '../../data/glossaryData'

const categoryColors: Record<string, string> = {
  'Industry Basics': 'rose',
  'Shipping & Sizing': 'emerald',
  'Product Types': 'amber',
  'Business Terms': 'blue',
  'Retail Concepts': 'purple',
}

export function Glossary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const { filteredTerms, totalResults, hasQuery } = useSearch(searchQuery)

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <SectionWrapper
      id="glossary"
      title="Key Terminology"
      subtitle="Searchable glossary of liquidation industry terms"
      accentColor="border-rose-600"
      icon={<BookOpen className="w-5 h-5" />}
    >
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        resultCount={totalResults}
        hasQuery={hasQuery}
      />

      {glossaryCategories.map((category) => {
        const terms = filteredTerms.filter((t) => t.category === category)
        if (terms.length === 0) return null

        return (
          <div key={category} className="mb-6">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
              {category}
            </h3>
            <div className="space-y-2">
              {terms.map((term) => (
                <ExpandableCard
                  key={term.id}
                  title={term.term}
                  badge={
                    <Badge
                      text={term.category}
                      color={categoryColors[term.category] ?? 'slate'}
                    />
                  }
                  isExpanded={expandedIds.has(term.id)}
                  onToggle={() => toggle(term.id)}
                  accentColor="border-rose-500"
                >
                  <p className="mb-2">{term.definition}</p>
                  {term.details && (
                    <p className="text-slate-500 text-xs mt-1">{term.details}</p>
                  )}
                </ExpandableCard>
              ))}
            </div>
          </div>
        )
      })}

      {hasQuery && totalResults === 0 && (
        <div className="text-center py-8 text-slate-500">
          <p className="text-sm">No terms found matching "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-rose-600 text-sm mt-2 hover:underline cursor-pointer"
          >
            Clear search
          </button>
        </div>
      )}
    </SectionWrapper>
  )
}
