import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  BookOpen,
  Award,
  FileCheck,
  Shield,
  ScrollText,
  LogOut,
  ChevronLeft,
  GraduationCap,
  UserCircle,
  Layers,
  ClipboardCheck,
  Construction,
  Bug,
  AlertCircle,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCompliance } from '../../context/ComplianceContext'
import { supabase } from '../../lib/supabase'
import { APP_VERSION } from '../../version'
import { ReportIssueModal } from '../shared/ReportIssueModal'

interface NavItem {
  to: string
  icon: typeof Home
  label: string
  end: boolean
  badge?: number
}

interface NavSection {
  label: string
  items: NavItem[]
}

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, logout, isAdmin } = useAuth()
  const { pendingItems } = useCompliance()
  const navigate = useNavigate()
  const location = useLocation()
  const [showReportModal, setShowReportModal] = useState(false)
  const [openIssueCount, setOpenIssueCount] = useState(0)

  // Fetch open issue count for admins
  useEffect(() => {
    if (!isAdmin) return
    async function fetchCount() {
      const { count } = await supabase
        .from('issue_reports')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'open')
      setOpenIssueCount(count ?? 0)
    }
    fetchCount()
    // Refresh every 60 seconds
    const interval = setInterval(fetchCount, 60000)
    return () => clearInterval(interval)
  }, [isAdmin])

  const mainItems: NavItem[] = [
    { to: '/', icon: Home, label: 'Home', end: true },
    { to: '/course/intro-to-industry', icon: BookOpen, label: 'My Courses', end: false },
    { to: '/acknowledgements', icon: FileCheck, label: 'Acks', end: true, badge: pendingItems.length || undefined },
    { to: '/certificates', icon: Award, label: 'Certificates', end: true },
    { to: '/profile', icon: UserCircle, label: 'Profile', end: true },
  ]

  const toolItems: NavItem[] = isAdmin
    ? [
        { to: '/content', icon: Layers, label: 'Content', end: false },
        { to: '/quiz-creator', icon: ClipboardCheck, label: 'Quiz Creator', end: true },
        { to: '/construction', icon: Construction, label: 'Construction', end: true },
      ]
    : []

  const adminItems: NavItem[] = isAdmin
    ? [
        { to: '/admin', icon: Shield, label: 'Dashboard', end: true },
        { to: '/admin/issues', icon: AlertCircle, label: 'Issues', end: true, badge: openIssueCount || undefined },
        { to: '/dev-log', icon: ScrollText, label: 'Dev Log', end: true },
      ]
    : []

  const sections: NavSection[] = [
    { label: '', items: mainItems },
    ...(toolItems.length > 0 ? [{ label: 'Tools', items: toolItems }] : []),
    ...(adminItems.length > 0 ? [{ label: 'Admin', items: adminItems }] : []),
  ]

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-via-sidebar text-white z-30 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <LogoImage collapsed={collapsed} />
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {sections.map((section, sIdx) => (
          <div key={section.label || 'main'}>
            {/* Section divider + label */}
            {sIdx > 0 && (
              <div className={collapsed ? 'my-2 mx-2' : 'mt-4 mb-2 mx-1'}>
                {collapsed ? (
                  <hr className="border-white/10" />
                ) : (
                  <p className="text-[10px] text-white/30 uppercase tracking-wider font-semibold px-2">
                    {section.label}
                  </p>
                )}
              </div>
            )}

            {/* Items */}
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && item.badge && item.badge > 0 && (
                  <span className="ml-auto bg-via-danger text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="mx-2 mb-2 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
      >
        <ChevronLeft
          className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`}
        />
      </button>

      {/* User */}
      {user && (
        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="w-8 h-8 rounded-full bg-via-orange/30 flex items-center justify-center text-xs font-bold text-via-orange shrink-0 hover:bg-via-orange/40 transition-colors cursor-pointer"
              title="View profile"
            >
              {user.name.split(' ').map((n) => n[0]).join('')}
            </button>
            {!collapsed && (
              <button
                onClick={() => navigate('/profile')}
                className="flex-1 min-w-0 text-left hover:opacity-80 transition-opacity cursor-pointer"
                title="View profile"
              >
                <p className="text-xs font-medium text-white truncate">
                  {user.name}
                </p>
                <p className="text-[10px] text-white/40 truncate">{user.email}</p>
              </button>
            )}
            {!collapsed && (
              <button
                onClick={logout}
                className="text-white/40 hover:text-white transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Report Issue link */}
      <div className="px-2 pb-1">
        <button
          onClick={() => setShowReportModal(true)}
          className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors cursor-pointer ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Report an issue"
        >
          <Bug className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="text-xs">Report Issue</span>}
        </button>
      </div>

      {/* Version */}
      {!collapsed && (
        <div className="px-4 pb-3">
          <p className="text-[9px] text-white/25 text-center">v{APP_VERSION}</p>
        </div>
      )}

      {/* Report Issue Modal */}
      {showReportModal && (
        <ReportIssueModal
          currentPath={location.pathname}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </aside>
  )
}

/** Sidebar logo with fallback to icon if image doesn't load */
function LogoImage({ collapsed }: { collapsed: boolean }) {
  const [imgError, setImgError] = useState(false)
  const src = `${import.meta.env.BASE_URL}images/via-academy-hero.png`

  if (imgError) {
    return (
      <>
        <div className="w-8 h-8 bg-via-orange rounded-lg flex items-center justify-center shrink-0">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold tracking-wide">VIAcademy</h1>
            <p className="text-[10px] text-white/50">Training Platform</p>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <img
        src={src}
        alt="VIAcademy"
        onError={() => setImgError(true)}
        className="w-8 h-8 rounded-lg object-cover shrink-0"
      />
      {!collapsed && (
        <div className="overflow-hidden">
          <h1 className="text-sm font-bold tracking-wide">VIAcademy</h1>
          <p className="text-[10px] text-white/50">Training Platform</p>
        </div>
      )}
    </>
  )
}
