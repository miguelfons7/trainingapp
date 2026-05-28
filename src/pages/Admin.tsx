import { useState } from 'react'
import { Shield, Users, BarChart3, BookPlus, Megaphone, UserPlus, Building2, UserCog, MessageSquareText } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { UserProgressTable } from '../components/admin/UserProgressTable'
import { CourseStats } from '../components/admin/CourseStats'
import { AssignCourses } from '../components/admin/AssignCourses'
import { ComplianceManager } from '../components/admin/ComplianceManager'
import { InviteUsers } from '../components/admin/InviteUsers'
import { ManageTeams } from '../components/admin/ManageTeams'
import { ManageUsers } from '../components/admin/ManageUsers'
import { FeedbackManager } from '../components/admin/FeedbackManager'

type TabKey = 'progress' | 'compliance' | 'stats' | 'assign' | 'invite' | 'teams' | 'users' | 'feedback'

const tabs: { key: TabKey; label: string; icon: typeof Users }[] = [
  { key: 'progress', label: 'User Progress', icon: Users },
  { key: 'users', label: 'Manage Users', icon: UserCog },
  { key: 'teams', label: 'Manage Teams', icon: Building2 },
  { key: 'invite', label: 'Invite Users', icon: UserPlus },
  { key: 'compliance', label: 'Announcements', icon: Megaphone },
  { key: 'stats', label: 'Course Stats', icon: BarChart3 },
  { key: 'feedback', label: 'Feedback', icon: MessageSquareText },
  { key: 'assign', label: 'Assign Courses', icon: BookPlus },
]

export function Admin() {
  const { isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState<TabKey>('progress')

  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
          <Shield className="w-12 h-12 text-via-danger mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-via-navy mb-2">Access Restricted</h1>
          <p className="text-sm text-via-text-light">
            You do not have permission to view this page. Please sign in with an admin account.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-via-navy flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-via-navy">Admin Dashboard</h1>
          <p className="text-sm text-via-text-light">Manage users, announcements, and courses</p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-via-border mb-6">
        <nav className="-mb-px flex flex-wrap gap-1" aria-label="Admin tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'border-via-orange text-via-navy'
                    : 'border-transparent text-via-text-light hover:text-via-navy hover:border-via-border'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === 'progress' && <UserProgressTable />}
      {activeTab === 'users' && <ManageUsers />}
      {activeTab === 'teams' && <ManageTeams />}
      {activeTab === 'compliance' && <ComplianceManager />}
      {activeTab === 'stats' && <CourseStats />}
      {activeTab === 'assign' && <AssignCourses />}
      {activeTab === 'feedback' && <FeedbackManager />}
      {activeTab === 'invite' && <InviteUsers />}
    </div>
  )
}
