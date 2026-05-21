import { useState, useEffect, useCallback } from 'react'
import type { PageContent } from '../types/blocks'
import {
  fetchModuleContent,
  saveModuleContent,
  publishModuleContent,
  type ModuleContentRecord,
} from '../lib/contentService'
import { normalizePageContent } from '../lib/normalizeContent'

interface UseModuleContentReturn {
  record: ModuleContentRecord | null
  content: PageContent | null
  loading: boolean
  error: string | null
  isPublished: boolean
  isDirty: boolean
  /** Save current content as draft */
  save: (content: PageContent) => Promise<void>
  /** Publish current content */
  publish: () => Promise<void>
  /** Refresh from Supabase */
  reload: () => Promise<void>
}

export function useModuleContent(
  courseId: string | undefined,
  moduleId: string | undefined,
  userId: string | undefined,
): UseModuleContentReturn {
  const [record, setRecord] = useState<ModuleContentRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  const load = useCallback(async () => {
    if (!courseId || !moduleId) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    const result = await fetchModuleContent(courseId, moduleId)
    setRecord(result)
    setLoading(false)
  }, [courseId, moduleId])

  useEffect(() => {
    load()
  }, [load])

  const save = useCallback(
    async (content: PageContent) => {
      if (!courseId || !moduleId || !userId) return
      setError(null)
      const result = await saveModuleContent(courseId, moduleId, content, userId)
      if (result.error) {
        setError(result.error)
      } else {
        setIsDirty(false)
        // Update local record
        setRecord((prev) =>
          prev
            ? { ...prev, content, status: 'draft' as const, updatedAt: new Date().toISOString() }
            : {
                id: '',
                courseId,
                moduleId,
                content,
                status: 'draft' as const,
                version: 1,
                createdBy: userId,
                updatedBy: userId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                publishedAt: null,
              },
        )
      }
    },
    [courseId, moduleId, userId],
  )

  const publish = useCallback(async () => {
    if (!courseId || !moduleId || !userId) return
    setError(null)
    const result = await publishModuleContent(courseId, moduleId, userId)
    if (result.error) {
      setError(result.error)
    } else {
      await load()
    }
  }, [courseId, moduleId, userId, load])

  return {
    record,
    content: record?.content ? normalizePageContent(record.content) : null,
    loading,
    error,
    isPublished: record?.status === 'published',
    isDirty,
    save,
    publish,
    reload: load,
  }
}
