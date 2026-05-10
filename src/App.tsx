import { useMemo } from 'react'
import { Header } from './components/layout/Header'
import { SectionNav, sections } from './components/layout/SectionNav'
import { useActiveSection } from './hooks/useActiveSection'
import { SecondaryMarket } from './components/sections/SecondaryMarket'
import { ReverseLogistics } from './components/sections/ReverseLogistics'
import { ProductConditions } from './components/sections/ProductConditions'
import { LoadTypes } from './components/sections/LoadTypes'
import { BuyerTypes } from './components/sections/BuyerTypes'
import { CompanyOverview } from './components/sections/CompanyOverview'
import { WhyVia } from './components/sections/WhyVia'
import { Glossary } from './components/sections/Glossary'

function App() {
  const sectionIds = useMemo(() => sections.map((s) => s.id), [])
  const { activeSection, scrollToSection } = useActiveSection(sectionIds)

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <SectionNav activeSection={activeSection} onNavigate={scrollToSection} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        <SecondaryMarket />
        <ReverseLogistics />
        <ProductConditions />
        <LoadTypes />
        <BuyerTypes />
        <CompanyOverview />
        <WhyVia />
        <Glossary />
      </main>
      <footer className="bg-white border-t border-slate-200 py-6 text-center">
        <p className="text-xs text-slate-400">
          Via Trading Sales Training &mdash; Phase 1: Industry Knowledge & Who We Are
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Proof of Concept &middot; Internal Training Use Only
        </p>
      </footer>
    </div>
  )
}

export default App
