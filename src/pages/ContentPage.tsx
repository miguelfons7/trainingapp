import { Layers, Shield } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { ContentHub } from '../components/admin/ContentHub'

export function ContentPage() {
  const { isAdmin } = useAuth()

  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
          <Shield className="w-12 h-12 text-via-danger mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-via-navy mb-2">Access Restricted</h1>
          <p className="text-sm text-via-text-light">Only admins can access content management.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-via-navy flex items-center justify-center">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-via-navy">Content Manager</h1>
          <p className="text-sm text-via-text-light">Manage courses, modules, and CMS content</p>
        </div>
      </div>
      <ContentHub />
    </div>
  )
}
