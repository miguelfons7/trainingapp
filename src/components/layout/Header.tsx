interface HeaderProps {
  currentStep: number
  totalSteps: number
  stepLabel: string
}

export function Header({ currentStep, totalSteps, stepLabel }: HeaderProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <header className="bg-via-dark border-b border-via-border px-4 sm:px-6 py-5">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-via-orange rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              Via Trading Sales Training
            </p>
            <h1 className="text-lg sm:text-xl font-bold text-white">
              Phase 1: Industry Knowledge & Who We Are
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>{stepLabel}</span>
          <span>{currentStep + 1} of {totalSteps}</span>
        </div>
        <div className="w-full bg-via-navy rounded-full h-1.5">
          <div
            className="bg-via-orange h-1.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </header>
  )
}
