/**
 * Runs the CMS migration by inserting all 43 modules as drafts into Supabase.
 * Uses the Supabase REST API with admin email/password auth.
 *
 * Usage: npx tsx scripts/run-migration.ts <admin-email> <admin-password>
 *
 * Or, if you want to skip auth and use the service role key:
 * SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/run-migration.ts --service-role
 */
import { createClient } from '@supabase/supabase-js'
import { getAllEntries } from '../src/data/migration/index'

const SUPABASE_URL = 'https://xdogiyfqqpvwrvysexrt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhkb2dpeWZxcXB2d3J2eXNleHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwODY2NzgsImV4cCI6MjA5NDY2MjY3OH0.0V9IjWY2Eo2DsIQwDjdnFRtrQBt-8peEeEIOjkTN1Fg'

async function main() {
  const args = process.argv.slice(2)

  let supabase: ReturnType<typeof createClient>
  let userId: string

  if (args[0] === '--service-role') {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceKey) {
      console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY env var not set')
      process.exit(1)
    }
    supabase = createClient(SUPABASE_URL, serviceKey)
    // Get admin user id
    const { data: admin } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'admin')
      .limit(1)
      .single()
    if (!admin) {
      console.error('ERROR: No admin user found')
      process.exit(1)
    }
    userId = admin.id
  } else if (args.length >= 2) {
    const [email, password] = args
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (authError || !authData.user) {
      console.error('ERROR: Authentication failed:', authError?.message)
      process.exit(1)
    }
    userId = authData.user.id
    console.log(`Authenticated as ${email} (${userId})`)
  } else {
    console.error('Usage: npx tsx scripts/run-migration.ts <email> <password>')
    console.error('   or: SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/run-migration.ts --service-role')
    process.exit(1)
  }

  const entries = getAllEntries()
  console.log(`\nMigrating ${entries.length} modules...\n`)

  let success = 0
  let skipped = 0
  let errors = 0

  for (const entry of entries) {
    // Check if content already exists
    const { data: existing } = await supabase
      .from('module_content')
      .select('id')
      .eq('course_id', entry.courseId)
      .eq('module_id', entry.moduleId)
      .maybeSingle()

    if (existing) {
      console.log(`  SKIP  ${entry.courseId}/${entry.moduleId} (already exists)`)
      skipped++
      continue
    }

    const { error } = await supabase
      .from('module_content')
      .upsert(
        {
          course_id: entry.courseId,
          module_id: entry.moduleId,
          content: entry.content as unknown as Record<string, unknown>,
          status: 'draft',
          updated_by: userId,
          created_by: userId,
        },
        { onConflict: 'course_id,module_id' },
      )

    if (error) {
      console.error(`  FAIL  ${entry.courseId}/${entry.moduleId}: ${error.message}`)
      errors++
    } else {
      console.log(`  OK    ${entry.courseId}/${entry.moduleId}`)
      success++
    }
  }

  console.log(`\n--- Results ---`)
  console.log(`  Migrated: ${success}`)
  console.log(`  Skipped:  ${skipped}`)
  console.log(`  Errors:   ${errors}`)
  console.log(`  Total:    ${entries.length}`)

  if (errors > 0) process.exit(1)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
