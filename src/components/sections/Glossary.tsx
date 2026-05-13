import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { SectionWrapper } from '../shared/SectionWrapper'
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
  const { filteredTerms, totalResults, hasQuery } = useSearch(searchQuery)

  return (
    <SectionWrapper
      id="glossary"
      title="Key Terminology"
      subtitle="Searchable glossary of liquidation industry terms"
      accentColor="border-rose-500"
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
            <h3 className="text-sm font-semibold text-via-text uppercase tracking-wide mb-3">
              {category}
            </h3>
            <div className="space-y-3">
              {terms.map((term) => (
                <div
                  key={term.id}
                  className="bg-via-card rounded-xl border border-via-border p-4"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-bold text-via-navy">{term.term}</span>
                    <Badge
                      text={term.category}
                      color={categoryColors[term.category] ?? 'slate'}
                    />
                  </div>
                  <p className="text-sm text-via-text leading-relaxed">{term.definition}</p>
                  {term.details && (
                    <p className="text-xs text-via-text-light mt-1.5">{term.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {hasQuery && totalResults === 0 && (
        <div className="text-center py-8 text-via-text-light">
          <p className="text-sm">No terms found matching "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-via-orange text-sm mt-2 hover:underline cursor-pointer"
          >
            Clear search
          </button>
        </div>
      )}
    </SectionWrapper>
  )
}
