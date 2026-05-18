/**
 * Supabase CRUD operations for CMS module content.
 */
import { supabase } from './supabase'
import type { PageContent } from '../types/blocks'

export interface ModuleContentRecord {
  id: string
  courseId: string
  moduleId: string
  content: PageContent
  status: 'draft' | 'published'
  version: number
  createdBy: string | null
  updatedBy: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

export interface ContentVersion {
  id: string
  version: number
  publishedBy: string | null
  publishedAt: string
}

/** Fetch the current content document for a module */
export async function fetchModuleContent(
  courseId: string,
  moduleId: string,
): Promise<ModuleContentRecord | null> {
  const { data, error } = await supabase
    .from('module_content')
    .select('*')
    .eq('course_id', courseId)
    .eq('module_id', moduleId)
    .maybeSingle()

  if (error || !data) return null

  return {
    id: data.id,
    courseId: data.course_id,
    moduleId: data.module_id,
    content: data.content as PageContent,
    status: data.status as 'draft' | 'published',
    version: data.version,
    createdBy: data.created_by,
    updatedBy: data.updated_by,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    publishedAt: data.published_at,
  }
}

/** Save content as a draft (upsert) */
export async function saveModuleContent(
  courseId: string,
  moduleId: string,
  content: PageContent,
  userId: string,
): Promise<{ error?: string }> {
  const { error } = await supabase
    .from('module_content')
    .upsert(
      {
        course_id: courseId,
        module_id: moduleId,
        content: content as unknown as Record<string, unknown>,
        status: 'draft',
        updated_by: userId,
        created_by: userId,
      },
      { onConflict: 'course_id,module_id' },
    )

  return error ? { error: error.message } : {}
}

/** Publish content: update status, snapshot to versions table */
export async function publishModuleContent(
  courseId: string,
  moduleId: string,
  userId: string,
): Promise<{ error?: string }> {
  // 1. Fetch current content
  const { data: current, error: fetchError } = await supabase
    .from('module_content')
    .select('*')
    .eq('course_id', courseId)
    .eq('module_id', moduleId)
    .single()

  if (fetchError || !current) {
    return { error: fetchError?.message ?? 'Content not found' }
  }

  const newVersion = current.version + 1

  // 2. Update status to published, increment version
  const { error: updateError } = await supabase
    .from('module_content')
    .update({
      status: 'published',
      version: newVersion,
      updated_by: userId,
      published_at: new Date().toISOString(),
    })
    .eq('id', current.id)

  if (updateError) return { error: updateError.message }

  // 3. Create version snapshot
  const { error: versionError } = await supabase
    .from('module_content_versions')
    .insert({
      module_content_id: current.id,
      content: current.content,
      version: newVersion,
      published_by: userId,
    })

  if (versionError) return { error: versionError.message }

  return {}
}

/** List all versions for a module */
export async function fetchContentVersions(
  courseId: string,
  moduleId: string,
): Promise<ContentVersion[]> {
  // First get the module_content id
  const { data: mc } = await supabase
    .from('module_content')
    .select('id')
    .eq('course_id', courseId)
    .eq('module_id', moduleId)
    .maybeSingle()

  if (!mc) return []

  const { data: versions } = await supabase
    .from('module_content_versions')
    .select('id, version, published_by, published_at')
    .eq('module_content_id', mc.id)
    .order('version', { ascending: false })

  return (versions ?? []).map((v) => ({
    id: v.id,
    version: v.version,
    publishedBy: v.published_by,
    publishedAt: v.published_at,
  }))
}

/** Rollback to a previous version */
export async function rollbackToVersion(
  courseId: string,
  moduleId: string,
  versionId: string,
  userId: string,
): Promise<{ error?: string }> {
  // Fetch the version snapshot
  const { data: versionRow, error: fetchError } = await supabase
    .from('module_content_versions')
    .select('content')
    .eq('id', versionId)
    .single()

  if (fetchError || !versionRow) {
    return { error: fetchError?.message ?? 'Version not found' }
  }

  // Overwrite the living document with the snapshot content
  const { error: updateError } = await supabase
    .from('module_content')
    .update({
      content: versionRow.content,
      status: 'draft',
      updated_by: userId,
    })
    .eq('course_id', courseId)
    .eq('module_id', moduleId)

  return updateError ? { error: updateError.message } : {}
}

/** Create a blank content document for a module */
export async function createBlankContent(
  courseId: string,
  moduleId: string,
  sectionTitle: string,
  accentColor: string,
  userId: string,
): Promise<{ error?: string }> {
  const blankContent: PageContent = {
    version: 1,
    section: {
      sectionId: moduleId,
      title: sectionTitle,
      subtitle: '',
      accentColor,
      icon: 'BookOpen',
    },
    blocks: [],
  }

  return saveModuleContent(courseId, moduleId, blankContent, userId)
}
