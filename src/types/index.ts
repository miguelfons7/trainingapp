export interface SalesChannel {
  id: string
  name: string
  description: string
  icon: string
}

export interface DealerLevel {
  level: number
  title: string
  description: string
  example: string
  highlight?: boolean
}

export interface ProductCondition {
  id: string
  name: string
  definition: string
  whatToExpect: string
  buyerAppeal: string
  colorClass: string
  emphasized: boolean
  searchTerms: string[]
}

export interface LoadType {
  id: string
  name: string
  description: string
  details: string
  icon: string
  searchTerms: string[]
}

export interface BuyerType {
  id: string
  name: string
  icon: string
  shortDescription: string
  whatTheyCareAbout: string[]
  identifyingSignals: string[]
  searchTerms: string[]
}

export interface KeyFact {
  id: string
  icon: string
  value: string
  label: string
}

export interface Platform {
  name: string
  url: string
  description: string
}

export interface Advantage {
  id: string
  title: string
  icon: string
  shortDescription: string
  details: string
  searchTerms: string[]
}

export interface GlossaryTerm {
  id: string
  term: string
  category: string
  definition: string
  details?: string
  searchTerms: string[]
}
