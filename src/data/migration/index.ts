/**
 * CMS Migration — Aggregates all course migration entries.
 */
import { getCourse1Entries } from './course1-industry'
import { getCourse2Entries } from './course2-via-trading'
import { getCourse3Entries } from './course3-product-knowledge'
import { getCourse4Entries } from './course4-consultative-sales'
import { getCourse5Entries } from './course5-bdr-role'
import type { MigrationEntry } from './helpers'

export type { MigrationEntry }

/** Get all migration entries for a specific course */
export function getEntriesByCourse(courseId: string): MigrationEntry[] {
  switch (courseId) {
    case 'intro-to-industry':
      return getCourse1Entries()
    case 'who-is-via':
      return getCourse2Entries()
    case 'product-knowledge':
      return getCourse3Entries()
    case 'sales-philosophy':
      return getCourse4Entries()
    case 'bdr-role':
      return getCourse5Entries()
    default:
      return []
  }
}

/** Get all migration entries across all courses */
export function getAllEntries(): MigrationEntry[] {
  return [
    ...getCourse1Entries(),
    ...getCourse2Entries(),
    ...getCourse3Entries(),
    ...getCourse4Entries(),
    ...getCourse5Entries(),
  ]
}

/** Course metadata for the migration runner UI */
export const MIGRATION_COURSES = [
  { id: 'intro-to-industry', title: 'Intro to the Liquidation Industry', moduleCount: 7 },
  { id: 'who-is-via', title: 'Who Is Via Trading', moduleCount: 7 },
  { id: 'product-knowledge', title: 'Product Knowledge', moduleCount: 11 },
  { id: 'sales-philosophy', title: 'Consultative Sales', moduleCount: 10 },
  { id: 'bdr-role', title: 'BDR Role Training', moduleCount: 8 },
]
