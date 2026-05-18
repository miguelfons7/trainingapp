import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

/** Breakpoint widths matching Tailwind defaults */
const MD_BREAKPOINT = 768
const LG_BREAKPOINT = 1024

export function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  )
  const location = useLocation()

  // Track window width for responsive sidebar
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Determine sidebar state based on screen size
  const isMobile = windowWidth < MD_BREAKPOINT
  const isMedium = windowWidth >= MD_BREAKPOINT && windowWidth < LG_BREAKPOINT

  // On medium screens, force collapsed. On large screens, respect user toggle.
  const effectiveCollapsed = isMedium ? true : sidebarCollapsed

  return (
    <div className="min-h-screen bg-via-bg">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar: hidden on mobile, always visible on md+ */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={effectiveCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile sidebar drawer */}
      {isMobile && (
        <div
          className={`fixed z-30 transition-transform ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main content — margin matches sidebar width on md+ */}
      <div
        className={`transition-all duration-300 ${
          isMobile ? '' : effectiveCollapsed ? 'md:ml-16' : 'md:ml-60'
        }`}
      >
        <TopBar onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
