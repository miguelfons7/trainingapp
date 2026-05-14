import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, BookOpen, Award, FileCheck, Shield, ScrollText, LogOut, ChevronLeft, GraduationCap } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCompliance } from '../../context/ComplianceContext'
import { APP_VERSION } from '../../version'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, logout, isAdmin } = useAuth()
  const { pendingItems } = useCompliance()
  const navItems = [
    { to: '/', icon: Home, label: 'Home', end: true },
    { to: '/course/intro-to-industry', icon: BookOpen, label: 'My Courses', end: false },
    { to: '/acknowledgements', icon: FileCheck, label: 'Acks', end: true },
    { to: '/certificates', icon: Award, label: 'Certificates', end: true },
    ...(isAdmin
      ? [
          { to: '/admin', icon: Shield, label: 'Admin', end: false },
          { to: '/dev-log', icon: ScrollText, label: 'Dev Log', end: true },
        ]
      : []),
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
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => (
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
            {!collapsed && item.label === 'Acks' && pendingItems.length > 0 && (
              <span className="ml-auto bg-via-danger text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {pendingItems.length}
              </span>
            )}
          </NavLink>
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
            <div className="w-8 h-8 rounded-full bg-via-orange/30 flex items-center justify-center text-xs font-bold text-via-orange shrink-0">
              {user.name.split(' ').map((n) => n[0]).join('')}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">
                  {user.name}
                </p>
                <p className="text-[10px] text-white/40 truncate">{user.email}</p>
              </div>
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

      {/* Version */}
      {!collapsed && (
        <div className="px-4 pb-3">
          <p className="text-[9px] text-white/25 text-center">v{APP_VERSION}</p>
        </div>
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
            <h1 className="text-sm font-bold tracking-wide">Via Academy</h1>
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
        alt="Via Academy"
        onError={() => setImgError(true)}
        className="w-8 h-8 rounded-lg object-cover shrink-0"
      />
      {!collapsed && (
        <div className="overflow-hidden">
          <h1 className="text-sm font-bold tracking-wide">Via Academy</h1>
          <p className="text-[10px] text-white/50">Training Platform</p>
        </div>
      )}
    </>
  )
}
