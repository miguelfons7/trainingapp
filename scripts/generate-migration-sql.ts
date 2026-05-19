/**
 * Generates SQL INSERT statements for all 43 CMS migration entries.
 * Run with: npx tsx scripts/generate-migration-sql.ts > scripts/migration.sql
 *
 * The output SQL can be pasted into the Supabase SQL Editor.
 */
import { getAllEntries } from '../src/data/migration/index'

const entries = getAllEntries()

console.log('-- CMS Content Migration: Insert all modules as draft')
console.log(`-- Generated: ${new Date().toISOString()}`)
console.log(`-- Total entries: ${entries.length}`)
console.log('')
console.log('-- Look up the first admin user to attribute content to')
console.log('DO $$')
console.log('DECLARE')
console.log("  admin_id uuid := (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1);")
console.log('BEGIN')
console.log('')

for (const entry of entries) {
  const contentJson = JSON.stringify(entry.content).replace(/'/g, "''")
  console.log(`  -- Module: ${entry.courseId} / ${entry.moduleId}`)
  console.log(`  INSERT INTO module_content (course_id, module_id, content, status, version, created_by, updated_by)`)
  console.log(`  VALUES ('${entry.courseId}', '${entry.moduleId}', '${contentJson}'::jsonb, 'draft', 1, admin_id, admin_id)`)
  console.log(`  ON CONFLICT (course_id, module_id) DO UPDATE SET content = EXCLUDED.content, updated_by = EXCLUDED.updated_by, updated_at = now();`)
  console.log('')
}

console.log('END $$;')
console.log('')
console.log(`-- Done: ${entries.length} modules inserted/updated as draft`)
