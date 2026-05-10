import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Header } from './components/layout/Header'
import { CompanyOverview } from './components/sections/CompanyOverview'
import { SecondaryMarket } from './components/sections/SecondaryMarket'
import { ReverseLogistics } from './components/sections/ReverseLogistics'
import { ProductConditions } from './components/sections/ProductConditions'
import { LoadTypes } from './components/sections/LoadTypes'
import { BuyerTypes } from './components/sections/BuyerTypes'
import { WhyVia } from './components/sections/WhyVia'
import { Glossary } from './components/sections/Glossary'
import { Quiz } from './components/sections/Quiz'

const steps = [
  { label: 'Who Is Via Trading', component: CompanyOverview },
  { label: 'The Secondary Market', component: SecondaryMarket },
  { label: 'Reverse Logistics', component: ReverseLogistics },
  { label: 'Product Conditions', component: ProductConditions },
  { label: 'Load Types & Sizing', component: LoadTypes },
  { label: 'Who Our Buyers Are', component: BuyerTypes },
  { label: 'Why Buyers Choose Via', component: WhyVia },
  { label: 'Key Terminology', component: Glossary },
  { label: 'Knowledge Check', component: Quiz },
]

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)

  const goNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setDirection(1)
      setCurrentStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep((s) => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  const goToStep = useCallback((index: number) => {
    setDirection(index > currentStep ? 1 : -1)
    setCurrentStep(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  const StepComponent = steps[currentStep].component
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  return (
    <div className="min-h-screen bg-via-darker">
      <Header
        currentStep={currentStep}
        totalSteps={steps.length}
        stepLabel={steps[currentStep].label}
      />

      <nav className="bg-via-dark/80 backdrop-blur border-b border-via-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max px-4 sm:px-6 py-1">
            {steps.map((step, i) => (
              <button
                key={step.label}
                onClick={() => goToStep(i)}
                className={`px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  i === currentStep
                    ? 'text-via-orange border-via-orange'
                    : i < currentStep
                      ? 'text-slate-400 border-transparent hover:text-slate-300'
                      : 'text-slate-600 border-transparent hover:text-slate-500'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-10 pt-6 border-t border-via-border">
          <button
            onClick={goPrev}
            disabled={isFirst}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              isFirst
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-300 bg-via-card border border-via-border hover:bg-via-card-hover'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => goToStep(i)}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                  i === currentStep
                    ? 'bg-via-orange'
                    : i < currentStep
                      ? 'bg-via-orange/40'
                      : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={isLast}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              isLast
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-white bg-via-orange hover:bg-via-orange-light'
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      <footer className="bg-via-dark border-t border-via-border py-6 text-center">
        <p className="text-xs text-slate-600">
          Via Trading Sales Training &mdash; Phase 1: Industry Knowledge & Who We Are
        </p>
        <p className="text-xs text-slate-600 mt-1">
          Proof of Concept &middot; Internal Training Use Only
        </p>
      </footer>
    </div>
  )
}

export default App
