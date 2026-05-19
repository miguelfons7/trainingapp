/**
 * Generates separate SQL files per course for CMS migration.
 * Run with: npx tsx scripts/generate-migration-per-course.ts
 * Outputs: scripts/migration-course1.sql, scripts/migration-course2.sql, etc.
 */
import { writeFileSync } from 'fs'
import { getEntriesByCourse } from '../src/data/migration/index'

const courses = [
  { id: 'intro-to-industry', file: 'migration-course1.sql' },
  { id: 'who-is-via', file: 'migration-course2.sql' },
  { id: 'product-knowledge', file: 'migration-course3.sql' },
  { id: 'sales-philosophy', file: 'migration-course4.sql' },
  { id: 'bdr-role', file: 'migration-course5.sql' },
]

for (const course of courses) {
  const entries = getEntriesByCourse(course.id)
  if (entries.length === 0) continue

  const lines: string[] = []
  lines.push(`-- CMS Content Migration: ${course.id} (${entries.length} modules)`)
  lines.push(`-- Generated: ${new Date().toISOString()}`)
  lines.push('')
  lines.push('DO $$')
  lines.push('DECLARE')
  lines.push("  admin_id uuid := (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1);")
  lines.push('BEGIN')
  lines.push('')

  for (const entry of entries) {
    const contentJson = JSON.stringify(entry.content).replace(/'/g, "''")
    lines.push(`  -- Module: ${entry.courseId} / ${entry.moduleId}`)
    lines.push(`  INSERT INTO module_content (course_id, module_id, content, status, version, created_by, updated_by)`)
    lines.push(`  VALUES ('${entry.courseId}', '${entry.moduleId}', '${contentJson}'::jsonb, 'draft', 1, admin_id, admin_id)`)
    lines.push(`  ON CONFLICT (course_id, module_id) DO UPDATE SET content = EXCLUDED.content, updated_by = EXCLUDED.updated_by, updated_at = now();`)
    lines.push('')
  }

  lines.push('END $$;')
  lines.push('')

  const sql = lines.join('\n')
  writeFileSync(`scripts/${course.file}`, sql, 'utf8')
  console.log(`${course.file}: ${entries.length} modules, ${(sql.length / 1024).toFixed(1)}KB`)
}
