import { Component, type ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
}

/**
 * Catches render errors anywhere in the tree and shows a branded recovery
 * screen instead of a blank white page.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-via-bg flex items-center justify-center px-4">
          <div className="bg-via-card rounded-xl border border-via-border p-10 text-center max-w-md">
            <p className="text-4xl mb-4">😵</p>
            <h1 className="text-xl font-bold text-via-navy mb-2">Something went wrong</h1>
            <p className="text-sm text-via-text-light mb-6">
              An unexpected error occurred. Refreshing usually fixes it — if not, let your admin
              know.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-lg bg-via-navy text-white text-sm font-semibold hover:bg-via-navy-light transition-colors cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
