export function Header() {
  const phases = [
    'Industry & Company',
    'Sales Methodology',
    'BDR Track',
    'AM Track',
    'Advanced Skills',
  ]

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              Via Trading Sales Training
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Phase 1: Industry Knowledge & Who We Are
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          {phases.map((phase, i) => (
            <div key={phase} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === 0 ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                />
                <span
                  className={`text-xs hidden sm:inline ${
                    i === 0
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  {phase}
                </span>
              </div>
              {i < phases.length - 1 && (
                <div className="w-4 sm:w-8 h-px bg-slate-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
