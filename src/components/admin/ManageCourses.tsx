import { useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  GripVertical,
  BookOpen,
  Loader2,
  Save,
} from 'lucide-react'
import { useCourses } from '../../context/CoursesContext'
import type { Course, CourseModule, Program } from '../../types'

// ---- Slug helper ----
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// ---- Course Form ----
interface CourseFormData {
  id: string
  title: string
  description: string
  icon: string
  estimatedTime: string
  status: 'available' | 'coming-soon'
  imagePath: string
}

const EMPTY_COURSE: CourseFormData = {
  id: '',
  title: '',
  description: '',
  icon: 'BookOpen',
  estimatedTime: '~30 min',
  status: 'coming-soon',
  imagePath: '',
}

const ICON_OPTIONS = [
  'Warehouse', 'Building2', 'Package', 'Target', 'Headphones',
  'Settings', 'TrendingUp', 'BookOpen', 'GraduationCap', 'Users',
  'Shield', 'Briefcase', 'Globe', 'Lightbulb', 'Award',
]

// ---- Module Form ----
interface ModuleFormData {
  id: string
  title: string
  estimatedTime: string
  contentType: 'lesson' | 'quiz' | 'interactive'
  description: string
}

const EMPTY_MODULE: ModuleFormData = {
  id: '',
  title: '',
  estimatedTime: '10 min',
  contentType: 'lesson',
  description: '',
}

// ========================================
// Main Component
// ========================================
export function ManageCourses() {
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

  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set())
  const [showNewCourse, setShowNewCourse] = useState(false)
  const [showNewProgram, setShowNewProgram] = useState(false)
  const [editingCourse, setEditingCourse] = useState<string | null>(null)
  const [editingModule, setEditingModule] = useState<string | null>(null) // "courseId::moduleId"
  const [addingModuleTo, setAddingModuleTo] = useState<string | null>(null)
  const [editingProgram, setEditingProgram] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Form states
  const [courseForm, setCourseForm] = useState<CourseFormData>(EMPTY_COURSE)
  const [moduleForm, setModuleForm] = useState<ModuleFormData>(EMPTY_MODULE)
  const [programForm, setProgramForm] = useState<{ title: string; description: string; courseIds: string[]; estimatedTime: string }>({
    title: '', description: '', courseIds: [], estimatedTime: '~6 hours',
  })

  function toggleCourse(id: string) {
    setExpandedCourses((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // ---- Course CRUD ----

  async function handleCreateCourse() {
    setSaving(true)
    setError('')
    try {
      const id = courseForm.id || toSlug(courseForm.title)
      await createCourse({
        id,
        title: courseForm.title,
        description: courseForm.description,
        icon: courseForm.icon,
        estimatedTime: courseForm.estimatedTime,
        status: courseForm.status,
        imagePath: courseForm.imagePath || undefined,
      })
      setShowNewCourse(false)
      setCourseForm(EMPTY_COURSE)
    } catch (e: any) {
      setError(e.message ?? 'Failed to create course')
    }
    setSaving(false)
  }

  function startEditCourse(course: Course) {
    setEditingCourse(course.id)
    setCourseForm({
      id: course.id,
      title: course.title,
      description: course.description,
      icon: course.icon,
      estimatedTime: course.estimatedTime,
      status: course.status,
      imagePath: course.imagePath ?? '',
    })
  }

  async function handleSaveCourse() {
    if (!editingCourse) return
    setSaving(true)
    setError('')
    try {
      await updateCourse(editingCourse, {
        title: courseForm.title,
        description: courseForm.description,
        icon: courseForm.icon,
        estimatedTime: courseForm.estimatedTime,
        status: courseForm.status,
        imagePath: courseForm.imagePath || undefined,
      })
      setEditingCourse(null)
    } catch (e: any) {
      setError(e.message ?? 'Failed to save course')
    }
    setSaving(false)
  }

  async function handleDeleteCourse(id: string) {
    setSaving(true)
    setError('')
    try {
      await deleteCourse(id)
    } catch (e: any) {
      setError(e.message ?? 'Failed to delete course')
    }
    setSaving(false)
  }

  // ---- Module CRUD ----

  function startAddModule(courseId: string) {
    setAddingModuleTo(courseId)
    setModuleForm(EMPTY_MODULE)
    setExpandedCourses((prev) => new Set(prev).add(courseId))
  }

  async function handleCreateModule() {
    if (!addingModuleTo) return
    setSaving(true)
    setError('')
    try {
      const id = moduleForm.id || toSlug(moduleForm.title)
      await createModule(addingModuleTo, {
        id,
        title: moduleForm.title,
        estimatedTime: moduleForm.estimatedTime,
        contentType: moduleForm.contentType,
        description: moduleForm.description || undefined,
      })
      setAddingModuleTo(null)
      setModuleForm(EMPTY_MODULE)
    } catch (e: any) {
      setError(e.message ?? 'Failed to create module')
    }
    setSaving(false)
  }

  function startEditModule(courseId: string, mod: CourseModule) {
    setEditingModule(`${courseId}::${mod.id}`)
    setModuleForm({
      id: mod.id,
      title: mod.title,
      estimatedTime: mod.estimatedTime,
      contentType: mod.contentType,
      description: mod.description ?? '',
    })
  }

  async function handleSaveModule() {
    if (!editingModule) return
    const [courseId, moduleId] = editingModule.split('::')
    setSaving(true)
    setError('')
    try {
      await updateModule(courseId, moduleId, {
        title: moduleForm.title,
        estimatedTime: moduleForm.estimatedTime,
        contentType: moduleForm.contentType,
        description: moduleForm.description || undefined,
      })
      setEditingModule(null)
    } catch (e: any) {
      setError(e.message ?? 'Failed to save module')
    }
    setSaving(false)
  }

  async function handleDeleteModule(courseId: string, moduleId: string) {
    setSaving(true)
    setError('')
    try {
      await deleteModule(courseId, moduleId)
    } catch (e: any) {
      setError(e.message ?? 'Failed to delete module')
    }
    setSaving(false)
  }

  // ---- Program CRUD ----

  function startEditProgram(program: Program) {
    setEditingProgram(program.id)
    setProgramForm({
      title: program.title,
      description: program.description,
      courseIds: [...program.courseIds],
      estimatedTime: program.estimatedTime,
    })
  }

  async function handleSaveProgram() {
    if (!editingProgram) return
    setSaving(true)
    setError('')
    try {
      await updateProgram(editingProgram, {
        title: programForm.title,
        description: programForm.description,
        courseIds: programForm.courseIds,
        estimatedTime: programForm.estimatedTime,
      })
      setEditingProgram(null)
    } catch (e: any) {
      setError(e.message ?? 'Failed to save program')
    }
    setSaving(false)
  }

  async function handleCreateProgram() {
    setSaving(true)
    setError('')
    try {
      await createProgram({
        id: toSlug(programForm.title),
        title: programForm.title,
        description: programForm.description,
        courseIds: programForm.courseIds,
        estimatedTime: programForm.estimatedTime,
        icon: 'GraduationCap',
      })
      setShowNewProgram(false)
      setProgramForm({ title: '', description: '', courseIds: [], estimatedTime: '~6 hours' })
    } catch (e: any) {
      setError(e.message ?? 'Failed to create program')
    }
    setSaving(false)
  }

  async function handleDeleteProgram(id: string) {
    setSaving(true)
    setError('')
    try {
      await deleteProgram(id)
    } catch (e: any) {
      setError(e.message ?? 'Failed to delete program')
    }
    setSaving(false)
  }

  function toggleCourseInProgram(courseId: string) {
    setProgramForm((prev) => {
      const ids = prev.courseIds.includes(courseId)
        ? prev.courseIds.filter((id) => id !== courseId)
        : [...prev.courseIds, courseId]
      return { ...prev, courseIds: ids }
    })
  }

  // ---- Inline input styles ----
  const inputClass = 'w-full rounded-lg border border-via-border bg-white px-3 py-2 text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange'
  const selectClass = 'rounded-lg border border-via-border bg-white px-3 py-2 text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange'
  const btnPrimary = 'inline-flex items-center gap-1.5 px-4 py-2 bg-via-orange text-white text-sm font-semibold rounded-lg hover:bg-via-orange-light transition-colors cursor-pointer disabled:opacity-50'
  const btnSecondary = 'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-via-navy bg-via-navy/10 rounded-lg hover:bg-via-navy/20 transition-colors cursor-pointer'

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between">
          <p className="text-sm text-red-700">{error}</p>
          <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ============ PROGRAMS ============ */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-via-text uppercase tracking-wide">Programs</h2>
          <button onClick={() => setShowNewProgram(!showNewProgram)} className={btnSecondary}>
            <Plus className="w-3.5 h-3.5" />
            New Program
          </button>
        </div>

        {/* New program form */}
        {showNewProgram && (
          <div className="bg-via-card rounded-xl border border-via-orange/30 p-4 mb-3 space-y-3">
            <input
              placeholder="Program title"
              value={programForm.title}
              onChange={(e) => setProgramForm((p) => ({ ...p, title: e.target.value }))}
              className={inputClass}
            />
            <textarea
              placeholder="Description"
              value={programForm.description}
              onChange={(e) => setProgramForm((p) => ({ ...p, description: e.target.value }))}
              className={`${inputClass} h-16 resize-none`}
            />
            <div>
              <p className="text-xs font-semibold text-via-text mb-1.5">Courses in program:</p>
              <div className="flex flex-wrap gap-2">
                {courses.map((c) => (
                  <label key={c.id} className="inline-flex items-center gap-1.5 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={programForm.courseIds.includes(c.id)}
                      onChange={() => toggleCourseInProgram(c.id)}
                      className="accent-via-orange"
                    />
                    {c.title}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleCreateProgram} disabled={saving || !programForm.title.trim()} className={btnPrimary}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Create Program
              </button>
              <button onClick={() => setShowNewProgram(false)} className="text-sm text-via-text-light hover:text-via-text cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Program list */}
        {programs.map((program) => {
          const isEditing = editingProgram === program.id
          return (
            <div key={program.id} className="bg-via-card rounded-xl border border-via-border p-4 mb-3">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    value={programForm.title}
                    onChange={(e) => setProgramForm((p) => ({ ...p, title: e.target.value }))}
                    className={inputClass}
                  />
                  <textarea
                    value={programForm.description}
                    onChange={(e) => setProgramForm((p) => ({ ...p, description: e.target.value }))}
                    className={`${inputClass} h-16 resize-none`}
                  />
                  <div>
                    <p className="text-xs font-semibold text-via-text mb-1.5">Courses in program:</p>
                    <div className="flex flex-wrap gap-2">
                      {courses.map((c) => (
                        <label key={c.id} className="inline-flex items-center gap-1.5 text-xs cursor-pointer">
                          <input
                            type="checkbox"
                            checked={programForm.courseIds.includes(c.id)}
                            onChange={() => toggleCourseInProgram(c.id)}
                            className="accent-via-orange"
                          />
                          {c.title}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleSaveProgram} disabled={saving} className={btnPrimary}>
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save
                    </button>
                    <button onClick={() => setEditingProgram(null)} className="text-sm text-via-text-light hover:text-via-text cursor-pointer">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-via-navy">{program.title}</p>
                    <p className="text-xs text-via-text-light mt-0.5">{program.courseIds.length} courses &middot; {program.estimatedTime}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEditProgram(program)} className="p-1.5 rounded-lg hover:bg-via-bg-subtle text-via-text-light hover:text-via-navy cursor-pointer" title="Edit program">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteProgram(program.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-via-text-light hover:text-red-500 cursor-pointer" title="Delete program">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </section>

      {/* ============ COURSES ============ */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-via-text uppercase tracking-wide">Courses</h2>
          <button onClick={() => setShowNewCourse(!showNewCourse)} className={btnSecondary}>
            <Plus className="w-3.5 h-3.5" />
            New Course
          </button>
        </div>

        {/* New course form */}
        {showNewCourse && (
          <div className="bg-via-card rounded-xl border border-via-orange/30 p-4 mb-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Course title"
                value={courseForm.title}
                onChange={(e) => setCourseForm((p) => ({ ...p, title: e.target.value, id: toSlug(e.target.value) }))}
                className={inputClass}
              />
              <input
                placeholder="ID (auto-generated)"
                value={courseForm.id}
                onChange={(e) => setCourseForm((p) => ({ ...p, id: e.target.value }))}
                className={`${inputClass} text-via-text-light`}
              />
            </div>
            <textarea
              placeholder="Description"
              value={courseForm.description}
              onChange={(e) => setCourseForm((p) => ({ ...p, description: e.target.value }))}
              className={`${inputClass} h-16 resize-none`}
            />
            <div className="grid grid-cols-3 gap-3">
              <select
                value={courseForm.icon}
                onChange={(e) => setCourseForm((p) => ({ ...p, icon: e.target.value }))}
                className={selectClass}
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
              <input
                placeholder="~30 min"
                value={courseForm.estimatedTime}
                onChange={(e) => setCourseForm((p) => ({ ...p, estimatedTime: e.target.value }))}
                className={inputClass}
              />
              <select
                value={courseForm.status}
                onChange={(e) => setCourseForm((p) => ({ ...p, status: e.target.value as 'available' | 'coming-soon' }))}
                className={selectClass}
              >
                <option value="coming-soon">Coming Soon</option>
                <option value="available">Available</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleCreateCourse} disabled={saving || !courseForm.title.trim()} className={btnPrimary}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Create Course
              </button>
              <button onClick={() => { setShowNewCourse(false); setCourseForm(EMPTY_COURSE) }} className="text-sm text-via-text-light hover:text-via-text cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Course list */}
        {courses.map((course) => {
          const isExpanded = expandedCourses.has(course.id)
          const isEditing = editingCourse === course.id
          const isAddingModule = addingModuleTo === course.id

          return (
            <div key={course.id} className="bg-via-card rounded-xl border border-via-border overflow-hidden mb-3">
              {/* Course header */}
              <div className="flex items-center justify-between px-4 py-3">
                <button onClick={() => toggleCourse(course.id)} className="flex items-center gap-2 text-left flex-1 min-w-0 cursor-pointer">
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-via-text-light shrink-0" /> : <ChevronRight className="w-4 h-4 text-via-text-light shrink-0" />}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-via-navy truncate">{course.title}</p>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        course.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {course.status === 'available' ? 'Available' : 'Coming Soon'}
                      </span>
                    </div>
                    <p className="text-[10px] text-via-text-light">{course.modules.length} modules &middot; {course.estimatedTime}</p>
                  </div>
                </button>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button onClick={() => startAddModule(course.id)} className="p-1.5 rounded-lg hover:bg-emerald-50 text-via-text-light hover:text-emerald-600 cursor-pointer" title="Add module">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button onClick={() => startEditCourse(course)} className="p-1.5 rounded-lg hover:bg-via-bg-subtle text-via-text-light hover:text-via-navy cursor-pointer" title="Edit course">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteCourse(course.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-via-text-light hover:text-red-500 cursor-pointer" title="Delete course">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Course edit form */}
              {isEditing && (
                <div className="border-t border-via-border bg-via-bg-subtle/50 px-4 py-3 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input value={courseForm.title} onChange={(e) => setCourseForm((p) => ({ ...p, title: e.target.value }))} className={inputClass} placeholder="Title" />
                    <div className="flex gap-2">
                      <select value={courseForm.status} onChange={(e) => setCourseForm((p) => ({ ...p, status: e.target.value as any }))} className={selectClass}>
                        <option value="coming-soon">Coming Soon</option>
                        <option value="available">Available</option>
                      </select>
                      <input value={courseForm.estimatedTime} onChange={(e) => setCourseForm((p) => ({ ...p, estimatedTime: e.target.value }))} className={inputClass} placeholder="Time" />
                    </div>
                  </div>
                  <textarea value={courseForm.description} onChange={(e) => setCourseForm((p) => ({ ...p, description: e.target.value }))} className={`${inputClass} h-16 resize-none`} placeholder="Description" />
                  <div className="grid grid-cols-2 gap-3">
                    <select value={courseForm.icon} onChange={(e) => setCourseForm((p) => ({ ...p, icon: e.target.value }))} className={selectClass}>
                      {ICON_OPTIONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                    </select>
                    <input value={courseForm.imagePath} onChange={(e) => setCourseForm((p) => ({ ...p, imagePath: e.target.value }))} className={inputClass} placeholder="Image filename (e.g. course-6-tools.png)" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleSaveCourse} disabled={saving} className={btnPrimary}>
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save
                    </button>
                    <button onClick={() => setEditingCourse(null)} className="text-sm text-via-text-light hover:text-via-text cursor-pointer">Cancel</button>
                  </div>
                </div>
              )}

              {/* Module list */}
              {isExpanded && (
                <div className="border-t border-via-border">
                  {course.modules.map((mod, idx) => {
                    const modKey = `${course.id}::${mod.id}`
                    const isEditingMod = editingModule === modKey

                    if (isEditingMod) {
                      return (
                        <div key={mod.id} className="px-4 py-3 border-b border-via-border last:border-b-0 bg-via-bg-subtle/50 space-y-2">
                          <div className="grid grid-cols-3 gap-2">
                            <input value={moduleForm.title} onChange={(e) => setModuleForm((p) => ({ ...p, title: e.target.value }))} className={inputClass} placeholder="Title" />
                            <input value={moduleForm.estimatedTime} onChange={(e) => setModuleForm((p) => ({ ...p, estimatedTime: e.target.value }))} className={inputClass} placeholder="Time" />
                            <select value={moduleForm.contentType} onChange={(e) => setModuleForm((p) => ({ ...p, contentType: e.target.value as any }))} className={selectClass}>
                              <option value="lesson">Lesson</option>
                              <option value="quiz">Quiz</option>
                              <option value="interactive">Interactive</option>
                            </select>
                          </div>
                          <input value={moduleForm.description} onChange={(e) => setModuleForm((p) => ({ ...p, description: e.target.value }))} className={inputClass} placeholder="Description" />
                          <div className="flex items-center gap-2">
                            <button onClick={handleSaveModule} disabled={saving} className={btnPrimary}>
                              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                              Save
                            </button>
                            <button onClick={() => setEditingModule(null)} className="text-sm text-via-text-light hover:text-via-text cursor-pointer">Cancel</button>
                          </div>
                        </div>
                      )
                    }

                    return (
                      <div
                        key={mod.id}
                        className="flex items-center justify-between px-4 py-2.5 border-b border-via-border last:border-b-0 hover:bg-via-bg-subtle/30 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <GripVertical className="w-3.5 h-3.5 text-via-text-light/30 shrink-0" />
                          <span className="text-xs font-bold text-via-text-light w-5 text-center shrink-0">{idx + 1}</span>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-via-text truncate">{mod.title}</p>
                            <p className="text-[10px] text-via-text-light">{mod.estimatedTime} &middot; {mod.contentType}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={() => startEditModule(course.id, mod)} className="p-1 rounded hover:bg-via-bg-subtle text-via-text-light hover:text-via-navy cursor-pointer" title="Edit module">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteModule(course.id, mod.id)} className="p-1 rounded hover:bg-red-50 text-via-text-light hover:text-red-500 cursor-pointer" title="Delete module">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )
                  })}

                  {/* Add module form */}
                  {isAddingModule && (
                    <div className="px-4 py-3 border-t border-via-orange/30 bg-via-bg-subtle/50 space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          value={moduleForm.title}
                          onChange={(e) => setModuleForm((p) => ({ ...p, title: e.target.value, id: toSlug(e.target.value) }))}
                          className={inputClass}
                          placeholder="Module title"
                        />
                        <input value={moduleForm.estimatedTime} onChange={(e) => setModuleForm((p) => ({ ...p, estimatedTime: e.target.value }))} className={inputClass} placeholder="10 min" />
                        <select value={moduleForm.contentType} onChange={(e) => setModuleForm((p) => ({ ...p, contentType: e.target.value as any }))} className={selectClass}>
                          <option value="lesson">Lesson</option>
                          <option value="quiz">Quiz</option>
                          <option value="interactive">Interactive</option>
                        </select>
                      </div>
                      <input value={moduleForm.description} onChange={(e) => setModuleForm((p) => ({ ...p, description: e.target.value }))} className={inputClass} placeholder="Description (optional)" />
                      <div className="flex items-center gap-2">
                        <button onClick={handleCreateModule} disabled={saving || !moduleForm.title.trim()} className={btnPrimary}>
                          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                          Add Module
                        </button>
                        <button onClick={() => setAddingModuleTo(null)} className="text-sm text-via-text-light hover:text-via-text cursor-pointer">Cancel</button>
                      </div>
                    </div>
                  )}

                  {/* Empty state */}
                  {course.modules.length === 0 && !isAddingModule && (
                    <div className="px-4 py-6 text-center">
                      <BookOpen className="w-8 h-8 text-via-text-light/30 mx-auto mb-2" />
                      <p className="text-xs text-via-text-light">No modules yet</p>
                      <button onClick={() => startAddModule(course.id)} className="mt-2 text-xs text-via-orange hover:underline cursor-pointer">
                        Add the first module
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </section>
    </div>
  )
}
