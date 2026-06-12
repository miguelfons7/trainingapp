import { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { CompletionToast } from '../shared/CompletionToast'
import { useIdleLogout } from '../../hooks/useIdleLogout'

const MD_BREAKPOINT = 768

export function AppShell() {
  useIdleLogout()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  )
  const prevWidth = useRef(windowWidth)
  const location = useLocation()

  // Track window width
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-collapse when the window shrinks below 1024px (but don't force — user can re-expand)
  useEffect(() => {
    if (prevWidth.current >= 1024 && windowWidth < 1024) {
      setSidebarCollapsed(true)
    }
    if (prevWidth.current < 1024 && windowWidth >= 1024) {
      setSidebarCollapsed(false)
    }
    prevWidth.current = windowWidth
  }, [windowWidth])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const isMobile = windowWidth < MD_BREAKPOINT

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
          collapsed={sidebarCollapsed}
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
          isMobile ? '' : sidebarCollapsed ? 'md:ml-16' : 'md:ml-60'
        }`}
      >
        <TopBar onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
      <CompletionToast />
    </div>
  )
}
