import { useMemo } from 'react'
import { glossaryTerms } from '../data/glossaryData'
import type { GlossaryTerm } from '../types'

function matchesQuery(searchableText: string, query: string): boolean {
  return searchableText.toLowerCase().includes(query.toLowerCase().trim())
}

function buildSearchText(term: GlossaryTerm): string {
  return [term.term, term.definition, term.details ?? '', term.category, ...term.searchTerms].join(' ')
}

export function useSearch(query: string) {
  const filteredTerms = useMemo(() => {
    if (!query.trim()) return glossaryTerms
    return glossaryTerms.filter((term) => matchesQuery(buildSearchText(term), query))
  }, [query])

  return {
    filteredTerms,
    totalResults: filteredTerms.length,
    hasQuery: query.trim().length > 0,
  }
}
