import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'
import { courses as hardcodedCourses } from '../data/courses'
import { programs as hardcodedPrograms } from '../data/programs'
import type { Course, CourseModule, Program } from '../types'

// ----- Context value -----

interface CoursesContextValue {
  courses: Course[]
  programs: Program[]
  loading: boolean
  getCourseById: (id: string) => Course | undefined
  getProgram: () => Program
  /** Resolve a user's assigned program; null/unknown falls back to the first program */
  getProgramForUser: (programId?: string) => Program | undefined
  // CRUD methods for admin
  createCourse: (course: Omit<Course, 'modules'>) => Promise<void>
  updateCourse: (id: string, updates: Partial<Omit<Course, 'modules'>>) => Promise<void>
  deleteCourse: (id: string) => Promise<void>
  createModule: (courseId: string, mod: CourseModule) => Promise<void>
  updateModule: (courseId: string, moduleId: string, updates: Partial<CourseModule>) => Promise<void>
  deleteModule: (courseId: string, moduleId: string) => Promise<void>
  reorderModules: (courseId: string, moduleIds: string[]) => Promise<void>
  createProgram: (program: Program) => Promise<void>
  updateProgram: (id: string, updates: Partial<Program>) => Promise<void>
  deleteProgram: (id: string) => Promise<void>
  reload: () => Promise<void>
}

const CoursesContext = createContext<CoursesContextValue | undefined>(undefined)

// ----- DB row → app types -----

interface DBCourse {
  id: string
  title: string
  description: string
  icon: string
  estimated_time: string
  status: string
  image_path: string | null
  sort_order: number
}

interface DBModule {
  id: string
  course_id: string
  title: string
  estimated_time: string
  content_type: string
  description: string | null
  sort_order: number
}

interface DBProgram {
  id: string
  title: string
  description: string
  course_ids: string[]
  estimated_time: string
  icon: string
  sort_order: number
}

function dbCoursesToApp(dbCourses: DBCourse[], dbModules: DBModule[]): Course[] {
  const modulesByCourse = new Map<string, CourseModule[]>()
  for (const m of dbModules) {
    const list = modulesByCourse.get(m.course_id) ?? []
    list.push({
      id: m.id,
      title: m.title,
      estimatedTime: m.estimated_time,
      contentType: m.content_type as CourseModule['contentType'],
      description: m.description ?? undefined,
    })
    modulesByCourse.set(m.course_id, list)
  }

  return dbCourses
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      icon: c.icon,
      estimatedTime: c.estimated_time,
      status: c.status as Course['status'],
      imagePath: c.image_path ?? undefined,
      modules: (modulesByCourse.get(c.id) ?? []),
    }))
}

function dbProgramsToApp(dbPrograms: DBProgram[]): Program[] {
  return dbPrograms
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      courseIds: p.course_ids,
      estimatedTime: p.estimated_time,
      icon: p.icon,
    }))
}

// ----- Provider -----

export function CoursesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>(hardcodedCourses)
  const [programs, setPrograms] = useState<Program[]>(hardcodedPrograms)
  const [loading, setLoading] = useState(true)

  const loadFromDB = useCallback(async () => {
    const [coursesRes, modulesRes, programsRes] = await Promise.all([
      supabase.from('managed_courses').select('*').order('sort_order'),
      supabase.from('managed_modules').select('*').order('sort_order'),
      supabase.from('managed_programs').select('*').order('sort_order'),
    ])

    for (const res of [coursesRes, modulesRes, programsRes]) {
      if (res.error) console.error('Failed to load managed content:', res.error.message)
    }

    if (coursesRes.data && coursesRes.data.length > 0 && modulesRes.data) {
      setCourses(dbCoursesToApp(coursesRes.data as DBCourse[], modulesRes.data as DBModule[]))
    }
    // Fall back to hardcoded if DB is empty (migration not run yet)

    if (programsRes.data && programsRes.data.length > 0) {
      setPrograms(dbProgramsToApp(programsRes.data as DBProgram[]))
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    if (user) {
      loadFromDB().catch((err) => {
        console.error('Failed to load courses from DB:', err)
        setLoading(false)
      })
    } else {
      // Not logged in — use hardcoded defaults
      setCourses(hardcodedCourses)
      setPrograms(hardcodedPrograms)
      setLoading(false)
    }
  }, [user, loadFromDB])

  const getCourseById = useCallback(
    (id: string) => courses.find((c) => c.id === id),
    [courses],
  )

  const getProgram = useCallback(() => programs[0], [programs])

  const getProgramForUser = useCallback(
    (programId?: string) =>
      (programId ? programs.find((p) => p.id === programId) : undefined) ?? programs[0],
    [programs],
  )

  // ----- CRUD: Courses -----

  const createCourse = useCallback(
    async (course: Omit<Course, 'modules'>) => {
      const maxOrder = courses.length > 0 ? Math.max(...courses.map((_, i) => i + 1)) : 0
      const { error } = await supabase.from('managed_courses').insert({
        id: course.id,
        title: course.title,
        description: course.description,
        icon: course.icon,
        estimated_time: course.estimatedTime,
        status: course.status,
        image_path: course.imagePath ?? null,
        sort_order: maxOrder + 1,
        created_by: user?.id ?? null,
        updated_by: user?.id ?? null,
      })
      if (error) throw error
      // Optimistic update
      setCourses((prev) => [...prev, { ...course, modules: [] }])
    },
    [courses, user],
  )

  const updateCourse = useCallback(
    async (id: string, updates: Partial<Omit<Course, 'modules'>>) => {
      const dbUpdates: Record<string, unknown> = { updated_by: user?.id }
      if (updates.title !== undefined) dbUpdates.title = updates.title
      if (updates.description !== undefined) dbUpdates.description = updates.description
      if (updates.icon !== undefined) dbUpdates.icon = updates.icon
      if (updates.estimatedTime !== undefined) dbUpdates.estimated_time = updates.estimatedTime
      if (updates.status !== undefined) dbUpdates.status = updates.status
      if (updates.imagePath !== undefined) dbUpdates.image_path = updates.imagePath

      const { error } = await supabase
        .from('managed_courses')
        .update(dbUpdates as any)
        .eq('id', id)
      if (error) throw error
      setCourses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      )
    },
    [user],
  )

  const deleteCourse = useCallback(
    async (id: string) => {
      const { error } = await supabase.from('managed_courses').delete().eq('id', id)
      if (error) throw error
      setCourses((prev) => prev.filter((c) => c.id !== id))
    },
    [],
  )

  // ----- CRUD: Modules -----

  const createModule = useCallback(
    async (courseId: string, mod: CourseModule) => {
      const course = courses.find((c) => c.id === courseId)
      const maxOrder = course ? course.modules.length + 1 : 1
      const { error } = await supabase.from('managed_modules').insert({
        id: mod.id,
        course_id: courseId,
        title: mod.title,
        estimated_time: mod.estimatedTime,
        content_type: mod.contentType,
        description: mod.description ?? null,
        sort_order: maxOrder,
      })
      if (error) throw error
      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseId ? { ...c, modules: [...c.modules, mod] } : c,
        ),
      )
    },
    [courses],
  )

  const updateModule = useCallback(
    async (courseId: string, moduleId: string, updates: Partial<CourseModule>) => {
      const dbUpdates: Record<string, unknown> = {}
      if (updates.title !== undefined) dbUpdates.title = updates.title
      if (updates.estimatedTime !== undefined) dbUpdates.estimated_time = updates.estimatedTime
      if (updates.contentType !== undefined) dbUpdates.content_type = updates.contentType
      if (updates.description !== undefined) dbUpdates.description = updates.description

      const { error } = await supabase
        .from('managed_modules')
        .update(dbUpdates as any)
        .eq('course_id', courseId)
        .eq('id', moduleId)
      if (error) throw error
      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseId
            ? {
                ...c,
                modules: c.modules.map((m) =>
                  m.id === moduleId ? { ...m, ...updates } : m,
                ),
              }
            : c,
        ),
      )
    },
    [],
  )

  const deleteModule = useCallback(
    async (courseId: string, moduleId: string) => {
      const { error } = await supabase
        .from('managed_modules')
        .delete()
        .eq('course_id', courseId)
        .eq('id', moduleId)
      if (error) throw error
      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseId
            ? { ...c, modules: c.modules.filter((m) => m.id !== moduleId) }
            : c,
        ),
      )
    },
    [],
  )

  const reorderModules = useCallback(
    async (courseId: string, moduleIds: string[]) => {
      // Update sort_order for each module
      const promises = moduleIds.map((id, index) =>
        supabase
          .from('managed_modules')
          .update({ sort_order: index + 1 } as any)
          .eq('course_id', courseId)
          .eq('id', id),
      )
      await Promise.all(promises)

      setCourses((prev) =>
        prev.map((c) => {
          if (c.id !== courseId) return c
          const moduleMap = new Map(c.modules.map((m) => [m.id, m]))
          return {
            ...c,
            modules: moduleIds.map((id) => moduleMap.get(id)!).filter(Boolean),
          }
        }),
      )
    },
    [],
  )

  // ----- CRUD: Programs -----

  const createProgram = useCallback(
    async (program: Program) => {
      const maxOrder = programs.length + 1
      const { error } = await supabase.from('managed_programs').insert({
        id: program.id,
        title: program.title,
        description: program.description,
        course_ids: program.courseIds,
        estimated_time: program.estimatedTime,
        icon: program.icon,
        sort_order: maxOrder,
        created_by: user?.id ?? null,
        updated_by: user?.id ?? null,
      })
      if (error) throw error
      setPrograms((prev) => [...prev, program])
    },
    [programs, user],
  )

  const updateProgram = useCallback(
    async (id: string, updates: Partial<Program>) => {
      const dbUpdates: Record<string, unknown> = { updated_by: user?.id }
      if (updates.title !== undefined) dbUpdates.title = updates.title
      if (updates.description !== undefined) dbUpdates.description = updates.description
      if (updates.courseIds !== undefined) dbUpdates.course_ids = updates.courseIds
      if (updates.estimatedTime !== undefined) dbUpdates.estimated_time = updates.estimatedTime
      if (updates.icon !== undefined) dbUpdates.icon = updates.icon

      const { error } = await supabase
        .from('managed_programs')
        .update(dbUpdates as any)
        .eq('id', id)
      if (error) throw error
      setPrograms((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      )
    },
    [user],
  )

  const deleteProgram = useCallback(
    async (id: string) => {
      const { error } = await supabase.from('managed_programs').delete().eq('id', id)
      if (error) throw error
      setPrograms((prev) => prev.filter((p) => p.id !== id))
    },
    [],
  )

  return (
    <CoursesContext.Provider
      value={{
        courses,
        programs,
        loading,
        getCourseById,
        getProgram,
        getProgramForUser,
        createCourse,
        updateCourse,
        deleteCourse,
        createModule,
        updateModule,
        deleteModule,
        reorderModules,
        createProgram,
        updateProgram,
        deleteProgram,
        reload: loadFromDB,
      }}
    >
      {children}
    </CoursesContext.Provider>
  )
}

export function useCourses() {
  const ctx = useContext(CoursesContext)
  if (!ctx) throw new Error('useCourses must be used within CoursesProvider')
  return ctx
}
