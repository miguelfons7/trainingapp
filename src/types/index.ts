// --- Platform Structure ---

export interface Program {
  id: string
  title: string
  description: string
  courseIds: string[]
  estimatedTime: string
  icon: string
}

export interface Course {
  id: string
  title: string
  description: string
  icon: string
  estimatedTime: string
  modules: CourseModule[]
  status: 'available' | 'coming-soon'
  imagePath?: string
}

export interface CourseModule {
  id: string
  title: string
  estimatedTime: string
  contentType: 'lesson' | 'quiz' | 'interactive'
  description?: string
}

// --- User & Progress ---

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'leadership' | 'admin'
  teamId?: string
  /** Assigned training program (e.g. BDR vs AM); undefined = default program */
  programId?: string
}

export interface ModuleProgress {
  moduleId: string
  courseId: string
  status: 'not-started' | 'in-progress' | 'completed'
  score?: number
  completedAt?: string
  startedAt?: string
  timeSpentSeconds?: number
}

export type ComplianceStatus = 'draft' | 'scheduled' | 'live' | 'archived'

export interface ComplianceItem {
  id: string
  title: string
  description: string
  details: string
  requiredBy: string
  priority: 'high' | 'medium'
  acknowledgedBy: string[]
  createdBy?: string      // admin email (absent for seed items)
  createdAt?: string      // ISO date string
  status: ComplianceStatus
  scheduledAt?: string    // ISO date string for scheduled publish
  departments: string[]   // empty = all departments
  updatedAt?: string      // ISO date string
  updatedBy?: string      // admin email who last edited
}

// --- Existing content types ---

export interface SalesChannel {
  id: string
  name: string
  description: string
  icon: string
}

export interface DealerLevel {
  level: number
  title: string
  description: string
  example: string
  highlight?: boolean
}

export interface ProductCondition {
  id: string
  name: string
  definition: string
  whatToExpect: string
  buyerAppeal: string
  colorClass: string
  emphasized: boolean
  searchTerms: string[]
}

export interface LoadType {
  id: string
  name: string
  description: string
  details: string
  icon: string
  searchTerms: string[]
}

export interface BuyerType {
  id: string
  name: string
  icon: string
  shortDescription: string
  whatTheyCareAbout: string[]
  identifyingSignals: string[]
  searchTerms: string[]
}

export interface KeyFact {
  id: string
  icon: string
  value: string
  label: string
}

export interface Platform {
  name: string
  url: string
  description: string
}

export interface Advantage {
  id: string
  title: string
  icon: string
  shortDescription: string
  details: string
  searchTerms: string[]
}

export interface GlossaryTerm {
  id: string
  term: string
  category: string
  definition: string
  details?: string
  searchTerms: string[]
}

// --- Interactive exercise types ---

export interface TermMatchPair {
  term: string
  definition: string
}

export interface ScenarioQuestion {
  id: string
  scenario: string
  options: string[]
  bestAnswerIndex: number
  explanation: string
}

export interface FillInBlankItem {
  id: string
  sentence: string
  blank: string
  options: string[]
  correctIndex: number
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

/** Sectioned quiz format: term match + MC + fill-in-blank */
export interface SectionedQuiz {
  termMatch: TermMatchPair[]
  multipleChoice: QuizQuestion[]
  fillInBlank: FillInBlankItem[]
  passThreshold?: number // defaults to 0.85
}

