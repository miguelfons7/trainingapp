import { useState, useRef, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Bell, Menu } from 'lucide-react'
import { useCompliance } from '../../context/ComplianceContext'
import { getCourseById } from '../../data/courses'

interface TopBarProps {
  onMenuToggle: () => void
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const location = useLocation()
  const { pendingItems } = useCompliance()
  const [showNotif, setShowNotif] = useState(false)
  const bellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setShowNotif(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const breadcrumbs = buildBreadcrumbs(location.pathname)

  return (
    <header className="h-14 bg-via-card border-b border-via-border flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-via-text-light hover:text-via-text transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="flex items-center gap-1.5 text-sm">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.path} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-via-border">/</span>}
              {i === breadcrumbs.length - 1 ? (
                <span className="text-via-navy font-medium">{crumb.label}</span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-via-text-light hover:text-via-navy transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>

      <div className="relative flex items-center gap-3" ref={bellRef}>
        <button
          onClick={() => setShowNotif(!showNotif)}
          className="relative text-via-text-light hover:text-via-navy transition-colors cursor-pointer"
        >
          <Bell className="w-5 h-5" />
          {pendingItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-via-danger text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {pendingItems.length}
            </span>
          )}
        </button>

        {showNotif && (
          <div className="absolute right-0 top-10 w-72 bg-white rounded-xl border border-via-border shadow-lg z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-via-border">
              <p className="text-sm font-semibold text-via-navy">Notifications</p>
            </div>
            {pendingItems.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <Bell className="w-6 h-6 text-via-text-light mx-auto mb-2" />
                <p className="text-sm text-via-text-light">No new notifications</p>
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto">
                {pendingItems.map((item) => (
                  <Link
                    key={item.id}
                    to="/"
                    onClick={() => setShowNotif(false)}
                    className="block px-4 py-3 hover:bg-via-bg-subtle border-b border-via-border last:border-b-0"
                  >
                    <p className="text-sm font-medium text-via-navy">{item.title}</p>
                    <p className="text-xs text-via-text-light mt-0.5 line-clamp-1">{item.description}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

interface Breadcrumb {
  label: string
  path: string
}

function buildBreadcrumbs(pathname: string): Breadcrumb[] {
  const crumbs: Breadcrumb[] = [{ label: 'Home', path: '/' }]

  const parts = pathname.split('/').filter(Boolean)

  if (parts[0] === 'course' && parts[1]) {
    const course = getCourseById(parts[1])
    if (course) {
      crumbs.push({ label: course.title, path: `/course/${parts[1]}` })
    }

    if (parts[2] === 'module' && parts[3]) {
      const mod = course?.modules.find((m) => m.id === parts[3])
      if (mod) {
        crumbs.push({
          label: mod.title,
          path: `/course/${parts[1]}/module/${parts[3]}`,
        })
      }
    }
  }

  if (parts[0] === 'admin') {
    crumbs.push({ label: 'Admin Dashboard', path: '/admin' })
  }

  return crumbs
}
