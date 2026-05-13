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

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="relative text-via-text-light hover:text-via-navy transition-colors"
        >
          <Bell className="w-5 h-5" />
          {pendingItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-via-danger text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {pendingItems.length}
            </span>
          )}
        </Link>
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
