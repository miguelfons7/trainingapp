import { useState, useCallback, useRef, useEffect, lazy, Suspense } from 'react'
import { Save, Send, Eye, Code, Pencil, Undo2, ClipboardCheck, Loader2 } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { PageContent, ContentBlock, BlockType, SectionedQuizData } from '../../types/blocks'
import { createDefaultBlock } from './blockDefaults'
import { BlockPalette } from './BlockPalette'
import { BlockWrapper } from './BlockWrapper'
import { BlockRenderer } from './BlockRenderer'
import { BLOCK_EDITORS } from './editors'
import { QuizEditor } from './editors/QuizEditor'
import { QuizBlock } from '../interactive/QuizBlock'
import { IconPicker } from './IconPicker'
import { ColorPicker } from './ColorPicker'
import { ImageUpload } from './ImageUpload'

// Monaco is heavy — load it only when code mode is opened
const MonacoEditor = lazy(() => import('@monaco-editor/react'))

/** dnd-kit sortable wrapper — provides the drag handle to BlockWrapper */
function SortableBlock({
  block,
  children,
  ...wrapperProps
}: {
  block: ContentBlock
  isFirst: boolean
  isLast: boolean
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  onDuplicate: () => void
  children: React.ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 20 : undefined,
        position: 'relative' as const,
      }}
    >
      <BlockWrapper
        block={block}
        {...wrapperProps}
        dragHandleProps={{ ...attributes, ...listeners }}
      >
        {children}
      </BlockWrapper>
    </div>
  )
}

interface BlockEditorProps {
  initialContent: PageContent
  onSave: (content: PageContent) => Promise<void>
  onPublish: () => Promise<void>
  isPublished: boolean
  lastSaved?: string
}

type EditorMode = 'visual' | 'preview' | 'code'

export function BlockEditor({
  initialContent,
  onSave,
  onPublish,
  isPublished,
  lastSaved,
}: BlockEditorProps) {
  const [content, setContent] = useState<PageContent>(initialContent)
  const [mode, setMode] = useState<EditorMode>('visual')
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [codeValue, setCodeValue] = useState('')
  const [codeError, setCodeError] = useState('')
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync code editor when switching to code mode
  useEffect(() => {
    if (mode === 'code') {
      setCodeValue(JSON.stringify(content, null, 2))
      setCodeError('')
    }
  }, [mode, content])

  // Auto-save debounce (5 seconds after last change)
  useEffect(() => {
    if (!dirty) return
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(() => {
      handleSave()
    }, 5000)
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirty, content])

  const updateContent = useCallback((updater: (prev: PageContent) => PageContent) => {
    setContent((prev) => {
      const next = updater(prev)
      setDirty(true)
      return next
    })
  }, [])

  // ── Block Operations ────────────────────────────────────
  function addBlock(type: BlockType) {
    const newBlock = createDefaultBlock(type)
    newBlock.order = content.blocks.length
    updateContent((prev) => ({
      ...prev,
      blocks: [...prev.blocks, newBlock],
    }))
  }

  function updateBlock(blockId: string, updated: ContentBlock) {
    updateContent((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === blockId ? updated : b)),
    }))
  }

  function deleteBlock(blockId: string) {
    updateContent((prev) => ({
      ...prev,
      blocks: prev.blocks
        .filter((b) => b.id !== blockId)
        .map((b, i) => ({ ...b, order: i })),
    }))
  }

  function moveBlock(blockId: string, direction: 'up' | 'down') {
    updateContent((prev) => {
      const blocks = [...prev.blocks].sort((a, b) => a.order - b.order)
      const idx = blocks.findIndex((b) => b.id === blockId)
      if (idx < 0) return prev
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1
      if (swapIdx < 0 || swapIdx >= blocks.length) return prev
      // Swap orders
      const temp = blocks[idx].order
      blocks[idx] = { ...blocks[idx], order: blocks[swapIdx].order }
      blocks[swapIdx] = { ...blocks[swapIdx], order: temp }
      return { ...prev, blocks }
    })
  }

  function duplicateBlock(blockId: string) {
    const original = content.blocks.find((b) => b.id === blockId)
    if (!original) return
    const copy: ContentBlock = {
      ...JSON.parse(JSON.stringify(original)),
      id: crypto.randomUUID(),
      order: content.blocks.length,
    }
    updateContent((prev) => ({
      ...prev,
      blocks: [...prev.blocks, copy],
    }))
  }

  // ── Section Wrapper Settings ────────────────────────────
  function updateSection(field: string, value: string) {
    updateContent((prev) => ({
      ...prev,
      section: { ...prev.section, [field]: value },
    }))
  }

  // Merge a patch into the optional hero image. Clearing the src drops the
  // whole field so the module falls back to the default moduleImageMap hero.
  function updateSectionHero(patch: { src?: string; alt?: string }) {
    updateContent((prev) => {
      const current = prev.section.heroImage ?? { src: '', alt: '' }
      const merged = { ...current, ...patch }
      return {
        ...prev,
        section: {
          ...prev.section,
          heroImage: merged.src ? merged : undefined,
        },
      }
    })
  }

  // ── Drag-and-drop reordering ────────────────────────────
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    updateContent((prev) => {
      const blocks = [...prev.blocks].sort((a, b) => a.order - b.order)
      const oldIndex = blocks.findIndex((b) => b.id === active.id)
      const newIndex = blocks.findIndex((b) => b.id === over.id)
      if (oldIndex < 0 || newIndex < 0) return prev
      const reordered = arrayMove(blocks, oldIndex, newIndex).map((b, i) => ({
        ...b,
        order: i,
      }))
      return { ...prev, blocks: reordered }
    })
  }

  // ── Save / Publish ──────────────────────────────────────
  async function handleSave() {
    setSaving(true)
    await onSave(content)
    setDirty(false)
    setSaving(false)
  }

  async function handlePublish() {
    setPublishing(true)
    await onSave(content)
    await onPublish()
    setDirty(false)
    setPublishing(false)
  }

  // ── Code Editor ─────────────────────────────────────────
  function handleCodeChange(value: string) {
    setCodeValue(value)
    try {
      const parsed = JSON.parse(value) as PageContent
      if (parsed.version && parsed.section && Array.isArray(parsed.blocks)) {
        setContent(parsed)
        setDirty(true)
        setCodeError('')
      } else {
        setCodeError('Invalid PageContent structure')
      }
    } catch {
      setCodeError('Invalid JSON')
    }
  }

  const sortedBlocks = [...content.blocks].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-via-card rounded-xl border border-via-border p-3 flex items-center justify-between gap-3 sticky top-14 z-10">
        <div className="flex items-center gap-2">
          {/* Mode toggles */}
          <div className="flex items-center bg-via-bg-subtle rounded-lg p-0.5">
            <button
              onClick={() => setMode('visual')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                mode === 'visual' ? 'bg-via-card text-via-navy shadow-sm' : 'text-via-text-light hover:text-via-text'
              }`}
            >
              <Pencil className="w-3.5 h-3.5" />
              Visual
            </button>
            <button
              onClick={() => setMode('code')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                mode === 'code' ? 'bg-via-card text-via-navy shadow-sm' : 'text-via-text-light hover:text-via-text'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Code
            </button>
            <button
              onClick={() => setMode('preview')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                mode === 'preview' ? 'bg-via-card text-via-navy shadow-sm' : 'text-via-text-light hover:text-via-text'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-xs text-via-text-light">
            {dirty && <span className="text-via-warning font-medium">Unsaved changes</span>}
            {!dirty && lastSaved && (
              <span>
                Saved {new Date(lastSaved).toLocaleTimeString()}
              </span>
            )}
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
              isPublished ? 'bg-via-success/15 text-via-success' : 'bg-via-warning/15 text-via-warning'
            }`}>
              {isPublished ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={saving || !dirty}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-via-navy bg-via-navy/10 rounded-lg hover:bg-via-navy/20 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-via-orange rounded-lg hover:bg-via-orange-light transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
            {publishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Visual Editor */}
      {mode === 'visual' && (
        <div className="space-y-4">
          {/* Section wrapper settings */}
          <div className="bg-via-card rounded-xl border border-via-border p-4">
            <p className="text-xs font-semibold text-via-navy uppercase tracking-wide mb-3">
              Page Settings
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-via-text mb-1.5">Title</label>
                <input
                  type="text"
                  value={content.section.title}
                  onChange={(e) => updateSection('title', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-via-text mb-1.5">Subtitle</label>
                <input
                  type="text"
                  value={content.section.subtitle}
                  onChange={(e) => updateSection('subtitle', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-via-text mb-1.5">Accent Color</label>
                <ColorPicker
                  value={content.section.accentColor}
                  onChange={(borderClass) => updateSection('accentColor', borderClass)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-via-text mb-1.5">Icon</label>
                <IconPicker
                  value={content.section.icon}
                  onChange={(icon) => updateSection('icon', icon ?? 'BookOpen')}
                  allowNone={false}
                />
              </div>
            </div>

            {/* Hero image — the banner at the top of the module page */}
            <div className="mt-3 pt-3 border-t border-via-border">
              <label className="block text-xs font-medium text-via-text mb-1.5">
                Hero Image{' '}
                <span className="font-normal text-via-text-light">
                  (optional — the banner at the top of this module; leave empty to use the default)
                </span>
              </label>
              <ImageUpload
                value={content.section.heroImage?.src ?? ''}
                onChange={(src) => updateSectionHero({ src })}
              />
              {content.section.heroImage?.src && (
                <input
                  type="text"
                  value={content.section.heroImage?.alt ?? ''}
                  onChange={(e) => updateSectionHero({ alt: e.target.value })}
                  placeholder="Alt text (image description, shown if the image fails to load)"
                  className="mt-2 w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                />
              )}
            </div>
          </div>

          {/* Blocks — drag the grip handle to reorder, or use the arrows */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sortedBlocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {sortedBlocks.map((block, idx) => {
                  const Editor = BLOCK_EDITORS[block.type as keyof typeof BLOCK_EDITORS]
                  return (
                    <SortableBlock
                      key={block.id}
                      block={block}
                      isFirst={idx === 0}
                      isLast={idx === sortedBlocks.length - 1}
                      onDelete={() => deleteBlock(block.id)}
                      onMoveUp={() => moveBlock(block.id, 'up')}
                      onMoveDown={() => moveBlock(block.id, 'down')}
                      onDuplicate={() => duplicateBlock(block.id)}
                    >
                      {Editor ? (
                        <Editor
                          block={block}
                          onChange={(updated: ContentBlock) => updateBlock(block.id, updated)}
                        />
                      ) : (
                        <p className="text-sm text-via-text-light">No editor for block type: {block.type}</p>
                      )}
                    </SortableBlock>
                  )
                })}
              </div>
            </SortableContext>
          </DndContext>

          {/* Quiz Data Editor (shown when quizData exists) */}
          {content.quizData && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 pt-4 pb-1">
                <ClipboardCheck className="w-5 h-5 text-via-orange" />
                <h2 className="text-sm font-bold text-via-navy uppercase tracking-wide">
                  Quiz Data
                </h2>
              </div>
              <QuizEditor
                quizData={content.quizData}
                onChange={(updated: SectionedQuizData) =>
                  updateContent((prev) => ({ ...prev, quizData: updated }))
                }
              />
            </div>
          )}

          {/* Add block palette */}
          <BlockPalette onAdd={addBlock} />
        </div>
      )}

      {/* Code Editor */}
      {mode === 'code' && (
        <div className="space-y-2">
          {codeError && (
            <p className="text-xs text-via-danger font-medium bg-red-50 rounded-lg p-2 border border-red-200">
              {codeError}
            </p>
          )}
          <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
            <div className="px-4 py-2 border-b border-via-border flex items-center justify-between">
              <span className="text-xs font-semibold text-via-navy">PageContent JSON</span>
              <button
                onClick={() => {
                  setCodeValue(JSON.stringify(content, null, 2))
                  setCodeError('')
                }}
                className="inline-flex items-center gap-1 text-xs text-via-text-light hover:text-via-navy cursor-pointer"
              >
                <Undo2 className="w-3 h-3" />
                Reset
              </button>
            </div>
            <Suspense
              fallback={
                <div className="h-[600px] flex items-center justify-center bg-[#1e1e1e]">
                  <Loader2 className="w-6 h-6 text-white/60 animate-spin" />
                </div>
              }
            >
              <MonacoEditor
                height="600px"
                language="json"
                theme="vs-dark"
                value={codeValue}
                onChange={(value) => handleCodeChange(value ?? '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 12,
                  tabSize: 2,
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </Suspense>
          </div>
        </div>
      )}

      {/* Preview Mode — renders on the same background/width learners see */}
      {mode === 'preview' && (
        <div className="bg-via-bg rounded-xl border border-via-border p-4 sm:p-8">
          <div className="max-w-3xl mx-auto">
            <BlockRenderer content={content} />
            {content.quizData && (
              <div className="mt-6">
                <QuizBlock
                  quizId="cms-preview"
                  cmsQuizData={content.quizData}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
