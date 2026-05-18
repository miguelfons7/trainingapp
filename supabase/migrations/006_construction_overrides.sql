-- Migration 006: Construction Overrides
-- Allows admins to mark courses, modules, or programs as "under construction"
-- from the admin panel, overriding the hardcoded status in courses.ts.

CREATE TABLE IF NOT EXISTS construction_overrides (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

  -- What kind of entity this override applies to
  entity_type text NOT NULL
    CHECK (entity_type IN ('course', 'module', 'program')),

  -- The entity ID (matches course.id, module.id, or program.id in code)
  entity_id text NOT NULL,

  -- For modules: the parent course_id (used for lookups)
  parent_id text,

  -- Whether this override is currently active
  is_active boolean NOT NULL DEFAULT true,

  -- Optional message shown to users (e.g. "Back online Monday!")
  message text NOT NULL DEFAULT '',

  -- Metadata
  updated_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  -- One override per entity
  UNIQUE(entity_type, entity_id)
);

-- ── Indexes ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_construction_active
  ON construction_overrides (entity_type, is_active)
  WHERE is_active = true;

-- ── Row-Level Security ──────────────────────────────────
ALTER TABLE construction_overrides ENABLE ROW LEVEL SECURITY;

-- Everyone authenticated can read (needed for frontend checks)
CREATE POLICY "Authenticated users can read construction overrides"
  ON construction_overrides FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can manage
CREATE POLICY "Admins can manage construction overrides"
  ON construction_overrides FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ── updated_at trigger ──────────────────────────────────
-- Reuse the function from migration 005 if it exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_construction_overrides_updated_at'
  ) THEN
    CREATE TRIGGER set_construction_overrides_updated_at
      BEFORE UPDATE ON construction_overrides
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END
$$;
