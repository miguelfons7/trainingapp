-- Migration 005: CMS Content Blocks
-- Stores structured block content for module pages, with
-- draft/publish workflow and full version history.

-- ============================================================
-- 1. module_content — one active row per module
-- ============================================================

CREATE TABLE IF NOT EXISTS module_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Text IDs matching courses.ts (not UUIDs — courses are defined in code)
  course_id text NOT NULL,
  module_id text NOT NULL,

  -- The actual content document (PageContent JSON)
  content jsonb NOT NULL DEFAULT '{}'::jsonb,

  -- Workflow status
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published')),

  -- Version counter (increments on each publish)
  version integer NOT NULL DEFAULT 1,

  -- Metadata
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz,

  -- Each module has exactly one active content row
  UNIQUE(course_id, module_id)
);

-- ============================================================
-- 2. module_content_versions — immutable history
-- ============================================================

CREATE TABLE IF NOT EXISTS module_content_versions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

  module_content_id uuid REFERENCES module_content(id) ON DELETE CASCADE NOT NULL,

  content jsonb NOT NULL,
  version integer NOT NULL,

  published_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  published_at timestamptz DEFAULT now(),

  UNIQUE(module_content_id, version)
);

-- ============================================================
-- 3. Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_module_content_lookup
  ON module_content (course_id, module_id);

CREATE INDEX IF NOT EXISTS idx_module_content_versions_lookup
  ON module_content_versions (module_content_id, version DESC);

-- ============================================================
-- 4. Row-Level Security
-- ============================================================

ALTER TABLE module_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_content_versions ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can READ published content (needed for learners)
CREATE POLICY "Authenticated users can read published content"
  ON module_content FOR SELECT
  TO authenticated
  USING (
    status = 'published'
    OR is_admin()
  );

-- Only admins can INSERT/UPDATE/DELETE
CREATE POLICY "Admins can manage module content"
  ON module_content FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Version history: everyone can read
CREATE POLICY "Authenticated users can read content versions"
  ON module_content_versions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert content versions"
  ON module_content_versions FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- ============================================================
-- 5. updated_at trigger
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_module_content_updated_at'
  ) THEN
    CREATE TRIGGER set_module_content_updated_at
      BEFORE UPDATE ON module_content
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END
$$;
