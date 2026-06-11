import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  RemoveFormatting,
} from 'lucide-react'

interface RichTextEditorProps {
  /** HTML string (same storage format as before — plain strings still render) */
  value: string
  onChange: (html: string) => void
  placeholder?: string
  /** Approx. visual height in rows (default 5) */
  rows?: number
}

/**
 * WYSIWYG editor for CMS rich-text fields (paragraphs, callouts, card content).
 * Replaces raw-HTML textareas: authors click toolbar buttons instead of
 * hand-typing <strong> tags. Emits HTML, so existing content needs no migration.
 */
export function RichTextEditor({ value, onChange, placeholder, rows = 5 }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // headings have their own block type
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-via-orange underline' },
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: `prose prose-sm max-w-none focus:outline-none px-3 py-2.5 text-sm text-via-text`,
        style: `min-height: ${rows * 1.6}rem`,
        ...(placeholder ? { 'data-placeholder': placeholder } : {}),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Sync external value changes (e.g. switching between blocks)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor])

  if (!editor) return null

  function setLink() {
    if (!editor) return
    const prev = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('Link URL', prev ?? 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().unsetLink().run()
      return
    }
    editor.chain().focus().setLink({ href: url }).run()
  }

  const btn = (active: boolean) =>
    `p-1.5 rounded transition-colors cursor-pointer ${
      active
        ? 'bg-via-orange/15 text-via-orange'
        : 'text-via-text-light hover:bg-via-bg-subtle hover:text-via-navy'
    }`

  return (
    <div className="rounded-lg border border-via-border bg-white focus-within:ring-2 focus-within:ring-via-orange/30 focus-within:border-via-orange">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-via-border bg-via-bg-subtle/60 rounded-t-lg">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btn(editor.isActive('bold'))}
          title="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btn(editor.isActive('italic'))}
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>
        <span className="w-px h-4 bg-via-border mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btn(editor.isActive('bulletList'))}
          title="Bullet list"
        >
          <List className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btn(editor.isActive('orderedList'))}
          title="Numbered list"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>
        <span className="w-px h-4 bg-via-border mx-1" />
        <button
          type="button"
          onClick={setLink}
          className={btn(editor.isActive('link'))}
          title="Add / edit link"
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          className={btn(false)}
          title="Clear formatting"
        >
          <RemoveFormatting className="w-3.5 h-3.5" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
