import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Loader2, AlertCircle, History, Layers } from 'lucide-react'
import { useState } from 'react'
import { getCourseById } from '../data/courses'
import { useAuth } from '../context/AuthContext'
import { useModuleContent } from '../hooks/useModuleContent'
import { BlockEditor } from '../components/cms/BlockEditor'
import { VersionHistory } from '../components/cms/VersionHistory'
import { createBlankContent } from '../lib/contentService'
import { hardcodedModuleIds } from '../data/hardcodedModules'
import type { PageContent } from '../types/blocks'

export function ContentEditorPage() {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>()
  const { user, isAdmin } = useAuth()
  const { record, content, loading, error, isPublished, save, publish, reload } = useModuleContent(
    courseId,
    moduleId,
    user?.id,
  )
  const [showVersions, setShowVersions] = useState(false)
  const [creating, setCreating] = useState(false)

  const course = courseId ? getCourseById(courseId) : undefined
  const currentModule = course?.modules.find((m) => m.id === moduleId)

  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
          <AlertCircle className="w-12 h-12 text-via-danger mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-via-navy mb-2">Access Restricted</h1>
          <p className="text-sm text-via-text-light">Only admins can edit content.</p>
        </div>
      </div>
    )
  }

  if (!course || !currentModule || !courseId || !moduleId) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-via-text-light hover:text-via-navy transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Admin
        </Link>
        <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
          <p className="text-via-text-light">Course or module not found.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-via-navy animate-spin" />
        </div>
      </div>
    )
  }

  // No CMS content yet — offer to create
  const hasBuiltIn = moduleId ? hardcodedModuleIds.has(moduleId) : false

  if (!content) {
    async function handleCreate() {
      if (!courseId || !moduleId || !user?.id) return
      setCreating(true)
      const accentColor = course?.id === 'intro-to-industry'
        ? 'border-blue-500'
        : course?.id === 'who-is-via'
        ? 'border-orange-500'
        : course?.id === 'product-knowledge'
        ? 'border-red-500'
        : course?.id === 'sales-philosophy'
        ? 'border-teal-500'
        : course?.id === 'bdr-role'
        ? 'border-sky-500'
        : 'border-blue-500'

      await createBlankContent(courseId, moduleId, currentModule?.title ?? moduleId, accentColor, user.id)
      await reload()
      setCreating(false)
    }

    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <Link
          to={`/course/${courseId}/module/${moduleId}`}
          className="inline-flex items-center gap-1.5 text-sm text-via-text-light hover:text-via-navy transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {currentModule.title}
        </Link>

        <div className="bg-via-card rounded-xl border border-via-border p-12 text-center">
          {hasBuiltIn ? (
            <>
              <Layers className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-via-navy mb-2">Create CMS Override</h2>
              <p className="text-sm text-via-text-light mb-6 max-w-md mx-auto">
                This module has built-in content. Create CMS content to customize or replace it.
                Once published, the CMS version will take priority over the built-in version.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-via-navy mb-2">No CMS Content Yet</h2>
              <p className="text-sm text-via-text-light mb-6 max-w-md mx-auto">
                This module doesn&apos;t have any content. Create a blank document to start building with the visual editor.
              </p>
            </>
          )}
          <button
            onClick={handleCreate}
            disabled={creating}
            className="inline-flex items-center gap-2 px-6 py-3 bg-via-orange text-white font-semibold rounded-xl hover:bg-via-orange-light transition-colors cursor-pointer disabled:opacity-50"
          >
            {creating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : hasBuiltIn ? (
              'Create CMS Content'
            ) : (
              'Create Blank Content'
            )}
          </button>
        </div>
      </div>
    )
  }

  const handleSave = async (updatedContent: PageContent) => {
    await save(updatedContent)
  }

  const handlePublish = async () => {
    await publish()
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            to={`/course/${courseId}/module/${moduleId}`}
            className="inline-flex items-center gap-1.5 text-sm text-via-text-light hover:text-via-navy transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Module
          </Link>
          <h1 className="text-xl font-bold text-via-navy">{currentModule.title}</h1>
          <p className="text-xs text-via-text-light">
            {course.title} &middot; Content Editor
          </p>
        </div>

        <button
          onClick={() => setShowVersions(!showVersions)}
          className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            showVersions
              ? 'bg-via-navy text-white'
              : 'text-via-navy bg-via-navy/10 hover:bg-via-navy/20'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          Versions
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Version history panel */}
      {showVersions && (
        <div className="bg-via-card rounded-xl border border-via-border p-4 mb-4">
          <VersionHistory
            courseId={courseId}
            moduleId={moduleId}
            userId={user?.id ?? ''}
            currentVersion={record?.version ?? 0}
            onRollback={reload}
          />
        </div>
      )}

      {/* Block editor */}
      <BlockEditor
        initialContent={content}
        onSave={handleSave}
        onPublish={handlePublish}
        isPublished={isPublished}
        lastSaved={record?.updatedAt}
      />
    </div>
  )
}
