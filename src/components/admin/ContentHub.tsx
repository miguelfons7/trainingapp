import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Loader2,
  Save,
  BookOpen,
  FileText,
  ExternalLink,
  Layers,
  CheckCircle,
  Clock,
  Minus,
  GraduationCap,
  Search,
} from 'lucide-react'
import { useCourses } from '../../context/CoursesContext'
import { supabase } from '../../lib/supabase'
import { hardcodedModuleIds } from '../../data/hardcodedModules'
import type { Course, CourseModule, Program } from '../../types'

// ── Helpers ──────────────────────────────────────────────

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// ── CMS status fetcher ──────────────────────────────────

interface CmsStatus {
  status: 'draft' | 'published'
  version: number
}

// ── Sub-tabs ────────────────────────────────────────────

type ContentTab = 'programs' | 'courses'

// ── Icon options ────────────────────────────────────────

const ICON_OPTIONS = [
  'Warehouse', 'Building2', 'Package', 'Target', 'Headphones',
  'Settings', 'TrendingUp', 'BookOpen', 'GraduationCap', 'Users',
  'Shield', 'Briefcase', 'Globe', 'Lightbulb', 'Award',
]

// ========================================================
// Main Component
// ========================================================

export function ContentHub() {
  const {
    courses,
    programs,
    createCourse,
    updateCourse,
    deleteCourse,
    createModule,
    updateModule,
    deleteModule,
    createProgram,
    updateProgram,
    deleteProgram,
  } = useCourses()

  // ── Sub-tab ──
  const [activeTab, setActiveTab] = useState<ContentTab>('courses')

  // ── CMS status ──
  const [cmsMap, setCmsMap] = useState<Map<string, CmsStatus>>(new Map())

  useEffect(() => {
    async function loadCms() {
      const { data } = await supabase
        .from('module_content')
        .select('course_id, module_id, status, version')
      const map = new Map<string, CmsStatus>()
      for (const row of data ?? []) {
        map.set(`${row.course_id}::${row.module_id}`, {
          status: row.status as 'draft' | 'published',
          version: row.version,
        })
      }
      setCmsMap(map)
    }
    loadCms()
  }, [])

  // ── Expanded state ──
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set())
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set())

  // ── CRUD state ──
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // ── Search ──
  const [search, setSearch] = useState('')

  // ── "Used in" index: courseId → program titles ──
  const courseUsedIn = useMemo(() => {
    const map = new Map<string, string[]>()
    for (const p of programs) {
      for (const cid of p.courseIds) {
        const list = map.get(cid) ?? []
        list.push(p.title)
        map.set(cid, list)
      }
    }
    return map
  }, [programs])

  // ── Stats ──
  const totalModules = courses.reduce((a, c) => a + c.modules.length, 0)
  const cmsPublished = [...cmsMap.values()].filter((s) => s.status === 'published').length
  const cmsDrafts = cmsMap.size - cmsPublished

  // ── Toggle helpers ──
  function toggleCourse(id: string) {
    setExpandedCourses((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }
  function toggleProgram(id: string) {
    setExpandedPrograms((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // ── Styles ──
  const inputClass = 'w-full rounded-lg border border-via-border bg-white px-3 py-2 text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange'
  const selectClass = 'rounded-lg border border-via-border bg-white px-3 py-2 text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange'
  const btnPrimary = 'inline-flex items-center gap-1.5 px-4 py-2 bg-via-orange text-white text-sm font-semibold rounded-lg hover:bg-via-orange-light transition-colors cursor-pointer disabled:opacity-50'
  const btnGhost = 'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-via-navy bg-via-navy/10 rounded-lg hover:bg-via-navy/20 transition-colors cursor-pointer'

  return (
    <div className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between">
          <p className="text-sm text-red-700">{error}</p>
          <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Overview stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatBox label="Programs" value={programs.length} />
        <StatBox label="Courses" value={courses.length} />
        <StatBox label="Total Modules" value={totalModules} />
        <StatBox label="CMS Published" value={cmsPublished} color="emerald" />
        <StatBox label="CMS Drafts" value={cmsDrafts} color="amber" />
      </div>

      {/* Sub-tab navigation */}
      <div className="flex items-center gap-6 border-b border-via-border">
        <TabButton
          active={activeTab === 'programs'}
          onClick={() => setActiveTab('programs')}
          icon={<GraduationCap className="w-4 h-4" />}
          label="Programs"
          count={programs.length}
        />
        <TabButton
          active={activeTab === 'courses'}
          onClick={() => setActiveTab('courses')}
          icon={<BookOpen className="w-4 h-4" />}
          label="Courses & Modules"
          count={courses.length}
        />
      </div>

      {/* ═══════════ PROGRAMS TAB ═══════════ */}
      {activeTab === 'programs' && (
        <ProgramsSection
          programs={programs}
          courses={courses}
          expandedPrograms={expandedPrograms}
          toggleProgram={toggleProgram}
          saving={saving}
          setSaving={setSaving}
          setError={setError}
          createProgram={createProgram}
          updateProgram={updateProgram}
          deleteProgram={deleteProgram}
          inputClass={inputClass}
          btnPrimary={btnPrimary}
          btnGhost={btnGhost}
        />
      )}

      {/* ═══════════ COURSES TAB ═══════════ */}
      {activeTab === 'courses' && (
        <CoursesSection
          courses={courses}
          courseUsedIn={courseUsedIn}
          cmsMap={cmsMap}
          expandedCourses={expandedCourses}
          toggleCourse={toggleCourse}
          setExpandedCourses={setExpandedCourses}
          search={search}
          setSearch={setSearch}
          saving={saving}
          setSaving={setSaving}
          setError={setError}
          createCourse={createCourse}
          updateCourse={updateCourse}
          deleteCourse={deleteCourse}
          createModule={createModule}
          updateModule={updateModule}
          deleteModule={deleteModule}
          inputClass={inputClass}
          selectClass={selectClass}
          btnPrimary={btnPrimary}
          btnGhost={btnGhost}
        />
      )}
    </div>
  )
}

// ========================================================
// Stat Box
// ========================================================

function StatBox({ label, value, color }: { label: string; value: number; color?: 'emerald' | 'amber' }) {
  const textColor = color === 'emerald' ? 'text-emerald-600' : color === 'amber' ? 'text-amber-600' : 'text-via-navy'
  return (
    <div className="bg-via-card rounded-xl border border-via-border p-3 text-center">
      <p className={`text-xl font-bold ${textColor}`}>{value}</p>
      <p className="text-[10px] text-via-text-light">{label}</p>
    </div>
  )
}

// ========================================================
// Tab Button
// ========================================================

function TabButton({ active, onClick, icon, label, count }: {
  active: boolean; onClick: () => void; icon: React.ReactNode; label: string; count: number
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-1 py-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
        active
          ? 'border-via-orange text-via-navy'
          : 'border-transparent text-via-text-light hover:text-via-navy hover:border-via-border'
      }`}
    >
      {icon}
      {label}
      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
        active ? 'bg-via-orange/10 text-via-orange' : 'bg-via-bg-subtle text-via-text-light'
      }`}>
        {count}
      </span>
    </button>
  )
}

// ========================================================
// PROGRAMS SECTION
// ========================================================

function ProgramsSection({
  programs, courses, expandedPrograms, toggleProgram,
  saving, setSaving, setError,
  createProgram, updateProgram, deleteProgram,
  inputClass, btnPrimary, btnGhost,
}: {
  programs: Program[]; courses: Course[]
  expandedPrograms: Set<string>; toggleProgram: (id: string) => void
  saving: boolean; setSaving: (v: boolean) => void; setError: (v: string) => void
  createProgram: (p: Program) => Promise<void>
  updateProgram: (id: string, u: Partial<Program>) => Promise<void>
  deleteProgram: (id: string) => Promise<void>
  inputClass: string; btnPrimary: string; btnGhost: string
}) {
  const [showCreate, setShowCreate] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', description: '', courseIds: [] as string[], estimatedTime: '~6 hours' })

  function startEdit(p: Program) {
    setEditingId(p.id)
    setForm({ title: p.title, description: p.description, courseIds: [...p.courseIds], estimatedTime: p.estimatedTime })
  }

  async function handleCreate() {
    setSaving(true)
    try {
      await createProgram({
        id: toSlug(form.title),
        title: form.title,
        description: form.description,
        courseIds: form.courseIds,
        estimatedTime: form.estimatedTime,
        icon: 'GraduationCap',
      })
      setShowCreate(false)
      setForm({ title: '', description: '', courseIds: [], estimatedTime: '~6 hours' })
    } catch (e: any) { setError(e.message ?? 'Failed to create program') }
    setSaving(false)
  }

  async function handleSave() {
    if (!editingId) return
    setSaving(true)
    try {
      await updateProgram(editingId, {
        title: form.title, description: form.description,
        courseIds: form.courseIds, estimatedTime: form.estimatedTime,
      })
      setEditingId(null)
    } catch (e: any) { setError(e.message ?? 'Failed to save program') }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    setSaving(true)
    try { await deleteProgram(id) } catch (e: any) { setError(e.message ?? 'Failed to delete') }
    setSaving(false)
  }

  function toggleCourseInForm(cid: string) {
    setForm((prev) => ({
      ...prev,
      courseIds: prev.courseIds.includes(cid)
        ? prev.courseIds.filter((id) => id !== cid)
        : [...prev.courseIds, cid],
    }))
  }

  const CourseCheckboxes = () => (
    <div>
      <p className="text-xs font-semibold text-via-text mb-2">Courses in this program:</p>
      <div className="grid grid-cols-2 gap-1.5">
        {courses.map((c) => (
          <label key={c.id} className="inline-flex items-center gap-2 text-xs cursor-pointer p-1.5 rounded-lg hover:bg-via-bg-subtle">
            <input
              type="checkbox"
              checked={form.courseIds.includes(c.id)}
              onChange={() => toggleCourseInForm(c.id)}
              className="accent-via-orange"
            />
            <span className="truncate">{c.title}</span>
          </label>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-via-text-light">{programs.length} program{programs.length !== 1 ? 's' : ''}</p>
        <button onClick={() => { setShowCreate(true); setForm({ title: '', description: '', courseIds: [], estimatedTime: '~6 hours' }) }} className={btnGhost}>
          <Plus className="w-3.5 h-3.5" />
          New Program
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="bg-via-card rounded-xl border-2 border-via-orange/30 p-4 space-y-3">
          <p className="text-sm font-semibold text-via-navy">Create New Program</p>
          <input placeholder="Program title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className={inputClass} />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className={`${inputClass} h-16 resize-none`} />
          <input placeholder="Estimated time (e.g. ~6 hours)" value={form.estimatedTime} onChange={(e) => setForm((p) => ({ ...p, estimatedTime: e.target.value }))} className={inputClass} />
          <CourseCheckboxes />
          <div className="flex items-center gap-2 pt-1">
            <button onClick={handleCreate} disabled={saving || !form.title.trim()} className={btnPrimary}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              Create Program
            </button>
            <button onClick={() => setShowCreate(false)} className="text-sm text-via-text-light hover:text-via-text cursor-pointer">Cancel</button>
          </div>
        </div>
      )}

      {/* Program table */}
      <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-via-bg-subtle border-b border-via-border">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-via-text-light uppercase tracking-wide w-8"></th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-via-text-light uppercase tracking-wide">Program</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-via-text-light uppercase tracking-wide">Courses</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-via-text-light uppercase tracking-wide">Est. Time</th>
              <th className="text-right px-4 py-2.5 text-xs font-semibold text-via-text-light uppercase tracking-wide w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program) => {
              const isExpanded = expandedPrograms.has(program.id)
              const isEditing = editingId === program.id
              return (
                <ProgramRow
                  key={program.id}
                  program={program}
                  courses={courses}
                  isExpanded={isExpanded}
                  isEditing={isEditing}
                  form={form}
                  setForm={setForm}
                  toggleProgram={toggleProgram}
                  startEdit={startEdit}
                  handleSave={handleSave}
                  handleDelete={handleDelete}
                  cancelEdit={() => setEditingId(null)}
                  toggleCourseInForm={toggleCourseInForm}
                  saving={saving}
                  inputClass={inputClass}
                  btnPrimary={btnPrimary}
                />
              )
            })}
            {programs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-via-text-light">
                  No programs yet. Create one to group courses together.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ProgramRow({
  program, courses, isExpanded, isEditing, form, setForm,
  toggleProgram, startEdit, handleSave, handleDelete, cancelEdit, toggleCourseInForm,
  saving, inputClass, btnPrimary,
}: {
  program: Program; courses: Course[]; isExpanded: boolean; isEditing: boolean
  form: { title: string; description: string; courseIds: string[]; estimatedTime: string }
  setForm: React.Dispatch<React.SetStateAction<typeof form>>
  toggleProgram: (id: string) => void
  startEdit: (p: Program) => void
  handleSave: () => Promise<void>
  handleDelete: (id: string) => Promise<void>
  cancelEdit: () => void
  toggleCourseInForm: (cid: string) => void
  saving: boolean; inputClass: string; btnPrimary: string
}) {
  const programCourses = program.courseIds
    .map((cid) => courses.find((c) => c.id === cid))
    .filter(Boolean) as Course[]

  return (
    <>
      <tr className="border-b border-via-border hover:bg-via-bg-subtle/30 transition-colors">
        <td className="px-4 py-3">
          <button onClick={() => toggleProgram(program.id)} className="cursor-pointer text-via-text-light hover:text-via-navy">
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </td>
        <td className="px-4 py-3">
          <p className="font-semibold text-via-navy">{program.title}</p>
          {program.description && (
            <p className="text-[11px] text-via-text-light mt-0.5 line-clamp-1">{program.description}</p>
          )}
        </td>
        <td className="px-4 py-3">
          <span className="text-sm text-via-text">{programCourses.length} course{programCourses.length !== 1 ? 's' : ''}</span>
        </td>
        <td className="px-4 py-3 text-sm text-via-text-light">{program.estimatedTime}</td>
        <td className="px-4 py-3 text-right">
          <div className="flex items-center justify-end gap-1">
            <button onClick={() => startEdit(program)} className="p-1.5 rounded-lg hover:bg-via-bg-subtle text-via-text-light hover:text-via-navy cursor-pointer" title="Edit">
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => handleDelete(program.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-via-text-light hover:text-red-500 cursor-pointer" title="Delete">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded: edit form or course list */}
      {isExpanded && (
        <tr>
          <td colSpan={5} className="bg-via-bg-subtle/50 px-6 py-3 border-b border-via-border">
            {isEditing ? (
              <div className="space-y-3 max-w-2xl">
                <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className={inputClass} placeholder="Title" />
                <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className={`${inputClass} h-16 resize-none`} placeholder="Description" />
                <input value={form.estimatedTime} onChange={(e) => setForm((p) => ({ ...p, estimatedTime: e.target.value }))} className={inputClass} placeholder="Estimated time" />
                <div>
                  <p className="text-xs font-semibold text-via-text mb-2">Courses in this program:</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {courses.map((c) => (
                      <label key={c.id} className="inline-flex items-center gap-2 text-xs cursor-pointer p-1.5 rounded-lg hover:bg-white">
                        <input type="checkbox" checked={form.courseIds.includes(c.id)} onChange={() => toggleCourseInForm(c.id)} className="accent-via-orange" />
                        <span className="truncate">{c.title}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleSave} disabled={saving} className={btnPrimary}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save
                  </button>
                  <button onClick={cancelEdit} className="text-sm text-via-text-light hover:text-via-text cursor-pointer">Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs font-semibold text-via-text-light uppercase tracking-wide mb-2">Courses in this program</p>
                {programCourses.length === 0 ? (
                  <p className="text-xs text-via-text-light">No courses assigned. Click edit to add courses.</p>
                ) : (
                  <div className="space-y-1.5">
                    {programCourses.map((course, idx) => (
                      <div key={course.id} className="flex items-center gap-3 p-2 rounded-lg bg-white border border-via-border">
                        <span className="text-xs font-bold text-via-text-light w-5 text-center">{idx + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-via-navy truncate">{course.title}</p>
                          <p className="text-[10px] text-via-text-light">{course.modules.length} modules · {course.estimatedTime}</p>
                        </div>
                        <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          course.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {course.status === 'available' ? 'Available' : 'Coming Soon'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={() => startEdit(program)} className="mt-3 text-xs text-via-orange hover:underline cursor-pointer">
                  Edit courses in this program
                </button>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  )
}

// ========================================================
// COURSES SECTION
// ========================================================

function CoursesSection({
  courses, courseUsedIn, cmsMap,
  expandedCourses, toggleCourse, setExpandedCourses, search, setSearch,
  saving, setSaving, setError,
  createCourse, updateCourse, deleteCourse,
  createModule, updateModule, deleteModule,
  inputClass, selectClass, btnPrimary, btnGhost,
}: {
  courses: Course[]; courseUsedIn: Map<string, string[]>
  cmsMap: Map<string, CmsStatus>
  expandedCourses: Set<string>; toggleCourse: (id: string) => void
  setExpandedCourses: React.Dispatch<React.SetStateAction<Set<string>>>
  search: string; setSearch: (s: string) => void
  saving: boolean; setSaving: (v: boolean) => void; setError: (v: string) => void
  createCourse: (c: Omit<Course, 'modules'>) => Promise<void>
  updateCourse: (id: string, u: Partial<Omit<Course, 'modules'>>) => Promise<void>
  deleteCourse: (id: string) => Promise<void>
  createModule: (courseId: string, m: CourseModule) => Promise<void>
  updateModule: (courseId: string, moduleId: string, u: Partial<CourseModule>) => Promise<void>
  deleteModule: (courseId: string, moduleId: string) => Promise<void>
  inputClass: string; selectClass: string; btnPrimary: string; btnGhost: string
}) {
  const [showCreate, setShowCreate] = useState(false)
  const [editingCourse, setEditingCourse] = useState<string | null>(null)
  const [editingModule, setEditingModule] = useState<string | null>(null)
  const [addingModuleTo, setAddingModuleTo] = useState<string | null>(null)

  const [courseForm, setCourseForm] = useState({
    id: '', title: '', description: '', icon: 'BookOpen', estimatedTime: '~30 min', status: 'coming-soon' as 'available' | 'coming-soon', imagePath: '',
  })
  const [moduleForm, setModuleForm] = useState({
    id: '', title: '', estimatedTime: '10 min', contentType: 'lesson' as 'lesson' | 'quiz' | 'interactive', description: '',
  })

  const filteredCourses = search
    ? courses.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
    : courses

  // ── Course CRUD ──

  async function handleCreateCourse() {
    setSaving(true)
    try {
      const id = courseForm.id || toSlug(courseForm.title)
      await createCourse({
        id, title: courseForm.title, description: courseForm.description,
        icon: courseForm.icon, estimatedTime: courseForm.estimatedTime,
        status: courseForm.status, imagePath: courseForm.imagePath || undefined,
      })
      setShowCreate(false)
      setCourseForm({ id: '', title: '', description: '', icon: 'BookOpen', estimatedTime: '~30 min', status: 'coming-soon', imagePath: '' })
    } catch (e: any) { setError(e.message ?? 'Failed to create course') }
    setSaving(false)
  }

  function startEditCourse(course: Course) {
    setEditingCourse(course.id)
    setCourseForm({
      id: course.id, title: course.title, description: course.description,
      icon: course.icon, estimatedTime: course.estimatedTime,
      status: course.status, imagePath: course.imagePath ?? '',
    })
  }

  async function handleSaveCourse() {
    if (!editingCourse) return
    setSaving(true)
    try {
      await updateCourse(editingCourse, {
        title: courseForm.title, description: courseForm.description,
        icon: courseForm.icon, estimatedTime: courseForm.estimatedTime,
        status: courseForm.status, imagePath: courseForm.imagePath || undefined,
      })
      setEditingCourse(null)
    } catch (e: any) { setError(e.message ?? 'Failed to save course') }
    setSaving(false)
  }

  async function handleDeleteCourse(id: string) {
    setSaving(true)
    try { await deleteCourse(id) } catch (e: any) { setError(e.message ?? 'Failed to delete course') }
    setSaving(false)
  }

  // ── Module CRUD ──

  function startAddModule(courseId: string) {
    setAddingModuleTo(courseId)
    setModuleForm({ id: '', title: '', estimatedTime: '10 min', contentType: 'lesson', description: '' })
    setExpandedCourses((prev) => new Set(prev).add(courseId))
  }


  async function handleCreateModule() {
    if (!addingModuleTo) return
    setSaving(true)
    try {
      const id = moduleForm.id || toSlug(moduleForm.title)
      await createModule(addingModuleTo, {
        id, title: moduleForm.title, estimatedTime: moduleForm.estimatedTime,
        contentType: moduleForm.contentType, description: moduleForm.description || undefined,
      })
      setAddingModuleTo(null)
    } catch (e: any) { setError(e.message ?? 'Failed to create module') }
    setSaving(false)
  }

  function startEditModule(courseId: string, mod: CourseModule) {
    setEditingModule(`${courseId}::${mod.id}`)
    setModuleForm({
      id: mod.id, title: mod.title, estimatedTime: mod.estimatedTime,
      contentType: mod.contentType, description: mod.description ?? '',
    })
  }

  async function handleSaveModule() {
    if (!editingModule) return
    const [courseId, moduleId] = editingModule.split('::')
    setSaving(true)
    try {
      await updateModule(courseId, moduleId, {
        title: moduleForm.title, estimatedTime: moduleForm.estimatedTime,
        contentType: moduleForm.contentType, description: moduleForm.description || undefined,
      })
      setEditingModule(null)
    } catch (e: any) { setError(e.message ?? 'Failed to save module') }
    setSaving(false)
  }

  async function handleDeleteModule(courseId: string, moduleId: string) {
    setSaving(true)
    try { await deleteModule(courseId, moduleId) } catch (e: any) { setError(e.message ?? 'Failed to delete module') }
    setSaving(false)
  }

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 text-via-text-light absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full rounded-lg border border-via-border bg-white pl-9 pr-3 py-2 text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-via-text-light hover:text-via-text cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button onClick={() => { setShowCreate(true); setCourseForm({ id: '', title: '', description: '', icon: 'BookOpen', estimatedTime: '~30 min', status: 'coming-soon', imagePath: '' }) }} className={btnGhost}>
          <Plus className="w-3.5 h-3.5" />
          New Course
        </button>
      </div>

      {/* Create course form */}
      {showCreate && (
        <div className="bg-via-card rounded-xl border-2 border-via-orange/30 p-4 space-y-3">
          <p className="text-sm font-semibold text-via-navy">Create New Course</p>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Course title" value={courseForm.title} onChange={(e) => setCourseForm((p) => ({ ...p, title: e.target.value, id: toSlug(e.target.value) }))} className={inputClass} />
            <input placeholder="ID (auto-generated)" value={courseForm.id} onChange={(e) => setCourseForm((p) => ({ ...p, id: e.target.value }))} className={`${inputClass} text-via-text-light`} />
          </div>
          <textarea placeholder="Description" value={courseForm.description} onChange={(e) => setCourseForm((p) => ({ ...p, description: e.target.value }))} className={`${inputClass} h-16 resize-none`} />
          <div className="grid grid-cols-4 gap-3">
            <select value={courseForm.icon} onChange={(e) => setCourseForm((p) => ({ ...p, icon: e.target.value }))} className={selectClass}>
              {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
            <input placeholder="~30 min" value={courseForm.estimatedTime} onChange={(e) => setCourseForm((p) => ({ ...p, estimatedTime: e.target.value }))} className={inputClass} />
            <select value={courseForm.status} onChange={(e) => setCourseForm((p) => ({ ...p, status: e.target.value as any }))} className={selectClass}>
              <option value="coming-soon">Coming Soon</option>
              <option value="available">Available</option>
            </select>
            <input placeholder="Image filename" value={courseForm.imagePath} onChange={(e) => setCourseForm((p) => ({ ...p, imagePath: e.target.value }))} className={inputClass} />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button onClick={handleCreateCourse} disabled={saving || !courseForm.title.trim()} className={btnPrimary}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              Create Course
            </button>
            <button onClick={() => setShowCreate(false)} className="text-sm text-via-text-light hover:text-via-text cursor-pointer">Cancel</button>
          </div>
        </div>
      )}

      {/* Course table */}
      <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-via-bg-subtle border-b border-via-border">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-via-text-light uppercase tracking-wide w-8"></th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-via-text-light uppercase tracking-wide">Course</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-via-text-light uppercase tracking-wide">Modules</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-via-text-light uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-via-text-light uppercase tracking-wide">Used In</th>
              <th className="text-right px-4 py-2.5 text-xs font-semibold text-via-text-light uppercase tracking-wide w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => {
              const isExpanded = expandedCourses.has(course.id)
              const isEditing = editingCourse === course.id
              const usedIn = courseUsedIn.get(course.id) ?? []

              return (
                <CourseRowGroup
                  key={course.id}
                  course={course}
                  isExpanded={isExpanded}
                  isEditing={isEditing}
                  usedIn={usedIn}
                  cmsMap={cmsMap}
                  toggleCourse={toggleCourse}
                  startEditCourse={startEditCourse}
                  handleSaveCourse={handleSaveCourse}
                  handleDeleteCourse={handleDeleteCourse}
                  cancelEditCourse={() => setEditingCourse(null)}
                  courseForm={courseForm}
                  setCourseForm={setCourseForm}
                  // Module props
                  addingModuleTo={addingModuleTo}
                  editingModule={editingModule}
                  moduleForm={moduleForm}
                  setModuleForm={setModuleForm}
                  startAddModule={startAddModule}
                  handleCreateModule={handleCreateModule}
                  startEditModule={startEditModule}
                  handleSaveModule={handleSaveModule}
                  handleDeleteModule={handleDeleteModule}
                  cancelAddModule={() => setAddingModuleTo(null)}
                  cancelEditModule={() => setEditingModule(null)}
                  saving={saving}
                  inputClass={inputClass}
                  selectClass={selectClass}
                  btnPrimary={btnPrimary}
                />
              )
            })}
            {filteredCourses.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-via-text-light">
                  {search ? 'No courses match your search.' : 'No courses yet. Create one to get started.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ========================================================
// Course Row Group (course row + expanded modules)
// ========================================================

function CourseRowGroup({
  course, isExpanded, isEditing, usedIn, cmsMap,
  toggleCourse, startEditCourse, handleSaveCourse, handleDeleteCourse, cancelEditCourse,
  courseForm, setCourseForm,
  addingModuleTo, editingModule, moduleForm, setModuleForm,
  startAddModule, handleCreateModule, startEditModule, handleSaveModule, handleDeleteModule,
  cancelAddModule, cancelEditModule,
  saving, inputClass, selectClass, btnPrimary,
}: {
  course: Course; isExpanded: boolean; isEditing: boolean; usedIn: string[]
  cmsMap: Map<string, CmsStatus>
  toggleCourse: (id: string) => void
  startEditCourse: (c: Course) => void
  handleSaveCourse: () => Promise<void>
  handleDeleteCourse: (id: string) => Promise<void>
  cancelEditCourse: () => void
  courseForm: any; setCourseForm: any
  addingModuleTo: string | null; editingModule: string | null
  moduleForm: any; setModuleForm: any
  startAddModule: (courseId: string) => void
  handleCreateModule: () => Promise<void>
  startEditModule: (courseId: string, mod: CourseModule) => void
  handleSaveModule: () => Promise<void>
  handleDeleteModule: (courseId: string, moduleId: string) => Promise<void>
  cancelAddModule: () => void; cancelEditModule: () => void
  saving: boolean; inputClass: string; selectClass: string; btnPrimary: string
}) {
  const isAddingModule = addingModuleTo === course.id

  return (
    <>
      {/* Course row */}
      <tr className="border-b border-via-border hover:bg-via-bg-subtle/30 transition-colors">
        <td className="px-4 py-3">
          <button onClick={() => toggleCourse(course.id)} className="cursor-pointer text-via-text-light hover:text-via-navy">
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </td>
        <td className="px-4 py-3">
          <p className="font-semibold text-via-navy">{course.title}</p>
          <p className="text-[11px] text-via-text-light mt-0.5">{course.estimatedTime}</p>
        </td>
        <td className="px-4 py-3">
          <span className="text-sm text-via-text">{course.modules.length}</span>
        </td>
        <td className="px-4 py-3">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
            course.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {course.status === 'available' ? 'Available' : 'Coming Soon'}
          </span>
        </td>
        <td className="px-4 py-3">
          {usedIn.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {usedIn.map((name) => (
                <span key={name} className="px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 text-[10px] font-medium truncate max-w-[120px]">
                  {name}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-[11px] text-via-text-light">—</span>
          )}
        </td>
        <td className="px-4 py-3 text-right">
          <div className="flex items-center justify-end gap-1">
            <button onClick={() => startAddModule(course.id)} className="p-1.5 rounded-lg hover:bg-emerald-50 text-via-text-light hover:text-emerald-600 cursor-pointer" title="Add module">
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => startEditCourse(course)} className="p-1.5 rounded-lg hover:bg-via-bg-subtle text-via-text-light hover:text-via-navy cursor-pointer" title="Edit course">
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => handleDeleteCourse(course.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-via-text-light hover:text-red-500 cursor-pointer" title="Delete course">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </td>
      </tr>

      {/* Course edit form (inline below the row) */}
      {isEditing && (
        <tr>
          <td colSpan={6} className="bg-via-bg-subtle/50 px-6 py-3 border-b border-via-border">
            <div className="space-y-3 max-w-3xl">
              <div className="grid grid-cols-2 gap-3">
                <input value={courseForm.title} onChange={(e: any) => setCourseForm((p: any) => ({ ...p, title: e.target.value }))} className={inputClass} placeholder="Title" />
                <div className="grid grid-cols-2 gap-2">
                  <select value={courseForm.status} onChange={(e: any) => setCourseForm((p: any) => ({ ...p, status: e.target.value }))} className={selectClass}>
                    <option value="coming-soon">Coming Soon</option>
                    <option value="available">Available</option>
                  </select>
                  <input value={courseForm.estimatedTime} onChange={(e: any) => setCourseForm((p: any) => ({ ...p, estimatedTime: e.target.value }))} className={inputClass} placeholder="Time" />
                </div>
              </div>
              <textarea value={courseForm.description} onChange={(e: any) => setCourseForm((p: any) => ({ ...p, description: e.target.value }))} className={`${inputClass} h-16 resize-none`} placeholder="Description" />
              <div className="grid grid-cols-2 gap-3">
                <select value={courseForm.icon} onChange={(e: any) => setCourseForm((p: any) => ({ ...p, icon: e.target.value }))} className={selectClass}>
                  {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
                <input value={courseForm.imagePath} onChange={(e: any) => setCourseForm((p: any) => ({ ...p, imagePath: e.target.value }))} className={inputClass} placeholder="Image filename" />
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleSaveCourse} disabled={saving} className={btnPrimary}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save
                </button>
                <button onClick={cancelEditCourse} className="text-sm text-via-text-light hover:text-via-text cursor-pointer">Cancel</button>
              </div>
            </div>
          </td>
        </tr>
      )}

      {/* Expanded modules */}
      {isExpanded && (
        <tr>
          <td colSpan={6} className="bg-via-bg-subtle/30 border-b border-via-border p-0">
            <div className="ml-8 mr-4 my-2">
              {/* Module sub-table header */}
              <div className="flex items-center gap-3 px-3 py-1.5 text-[10px] font-semibold text-via-text-light uppercase tracking-wide">
                <span className="w-5 text-center">#</span>
                <span className="flex-1">Module</span>
                <span className="w-16 text-center">Type</span>
                <span className="w-16 text-center">Time</span>
                <span className="w-20 text-center">CMS</span>
                <span className="w-28 text-right">Actions</span>
              </div>

              {/* Module rows */}
              {course.modules.map((mod, idx) => {
                const modKey = `${course.id}::${mod.id}`
                const isEditingMod = editingModule === modKey
                const cms = cmsMap.get(modKey)
                const isQuiz = mod.contentType === 'quiz'

                if (isEditingMod) {
                  return (
                    <div key={mod.id} className="px-3 py-2 bg-white rounded-lg border border-via-border mb-1.5 space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <input value={moduleForm.title} onChange={(e: any) => setModuleForm((p: any) => ({ ...p, title: e.target.value }))} className={inputClass} placeholder="Title" />
                        <input value={moduleForm.estimatedTime} onChange={(e: any) => setModuleForm((p: any) => ({ ...p, estimatedTime: e.target.value }))} className={inputClass} placeholder="Time" />
                        <select value={moduleForm.contentType} onChange={(e: any) => setModuleForm((p: any) => ({ ...p, contentType: e.target.value }))} className={selectClass}>
                          <option value="lesson">Lesson</option>
                          <option value="quiz">Quiz</option>
                          <option value="interactive">Interactive</option>
                        </select>
                      </div>
                      <input value={moduleForm.description} onChange={(e: any) => setModuleForm((p: any) => ({ ...p, description: e.target.value }))} className={inputClass} placeholder="Description" />
                      <div className="flex items-center gap-2">
                        <button onClick={handleSaveModule} disabled={saving} className={btnPrimary}>
                          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          Save
                        </button>
                        <button onClick={cancelEditModule} className="text-sm text-via-text-light hover:text-via-text cursor-pointer">Cancel</button>
                      </div>
                    </div>
                  )
                }

                return (
                  <div
                    key={mod.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 transition-colors"
                  >
                    <span className="text-xs font-bold text-via-text-light w-5 text-center shrink-0">{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-via-text truncate">{mod.title}</p>
                      {mod.description && (
                        <p className="text-[10px] text-via-text-light truncate">{mod.description}</p>
                      )}
                    </div>
                    <span className="w-16 text-center text-[10px] text-via-text-light capitalize shrink-0">{mod.contentType}</span>
                    <span className="w-16 text-center text-[10px] text-via-text-light shrink-0">{mod.estimatedTime}</span>

                    {/* CMS status */}
                    <div className="w-20 text-center shrink-0">
                      {cms ? (
                        cms.status === 'published' ? (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                            <CheckCircle className="w-3 h-3" />
                            v{cms.version}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                            <Clock className="w-3 h-3" />
                            Draft
                          </span>
                        )
                      ) : isQuiz ? (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold">
                          <Minus className="w-3 h-3" />
                          Quiz
                        </span>
                      ) : hardcodedModuleIds.has(mod.id) ? (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                          <Layers className="w-3 h-3" />
                          Built-in
                        </span>
                      ) : (
                        <span className="text-[10px] text-via-text-light">—</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="w-28 flex items-center justify-end gap-1 shrink-0">
                      {!isQuiz && (
                        <Link
                          to={`/admin/content/${course.id}/${mod.id}`}
                          className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold text-via-navy bg-via-navy/10 rounded-md hover:bg-via-navy/20 transition-colors"
                          title="Edit content in CMS"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Content
                        </Link>
                      )}
                      <button onClick={() => startEditModule(course.id, mod)} className="p-1 rounded hover:bg-via-bg-subtle text-via-text-light hover:text-via-navy cursor-pointer" title="Edit metadata">
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button onClick={() => handleDeleteModule(course.id, mod.id)} className="p-1 rounded hover:bg-red-50 text-via-text-light hover:text-red-500 cursor-pointer" title="Delete module">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )
              })}

              {/* Add module form */}
              {isAddingModule && (
                <div className="px-3 py-2 bg-white rounded-lg border-2 border-via-orange/30 mt-1.5 space-y-2">
                  <p className="text-xs font-semibold text-via-navy">New Module</p>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      value={moduleForm.title}
                      onChange={(e) => setModuleForm((p: any) => ({ ...p, title: e.target.value, id: toSlug(e.target.value) }))}
                      className={inputClass} placeholder="Module title"
                    />
                    <input value={moduleForm.estimatedTime} onChange={(e) => setModuleForm((p: any) => ({ ...p, estimatedTime: e.target.value }))} className={inputClass} placeholder="10 min" />
                    <select value={moduleForm.contentType} onChange={(e) => setModuleForm((p: any) => ({ ...p, contentType: e.target.value }))} className={selectClass}>
                      <option value="lesson">Lesson</option>
                      <option value="quiz">Quiz</option>
                      <option value="interactive">Interactive</option>
                    </select>
                  </div>
                  <input value={moduleForm.description} onChange={(e) => setModuleForm((p: any) => ({ ...p, description: e.target.value }))} className={inputClass} placeholder="Description (optional)" />
                  <div className="flex items-center gap-2">
                    <button onClick={handleCreateModule} disabled={saving || !moduleForm.title.trim()} className={btnPrimary}>
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                      Add Module
                    </button>
                    <button onClick={cancelAddModule} className="text-sm text-via-text-light hover:text-via-text cursor-pointer">Cancel</button>
                  </div>
                </div>
              )}

              {/* Empty state */}
              {course.modules.length === 0 && !isAddingModule && (
                <div className="px-3 py-6 text-center">
                  <FileText className="w-6 h-6 text-via-text-light/30 mx-auto mb-1.5" />
                  <p className="text-xs text-via-text-light">No modules yet</p>
                  <button onClick={() => startAddModule(course.id)} className="mt-1.5 text-xs text-via-orange hover:underline cursor-pointer">
                    Add the first module
                  </button>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
