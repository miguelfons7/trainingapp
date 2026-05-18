-- Migration 004: Announcement Lifecycle & Audit Log
-- Adds status (draft/scheduled/live/archived), scheduled_at, departments[], updated_at/by
-- Creates audit_log table for tracking admin actions

-- ============================================================
-- 1. Add lifecycle columns to compliance_items
-- ============================================================

-- Status: draft (created but not visible), scheduled (auto-publishes at scheduled_at),
--         live (visible to users), archived (hidden from users)
ALTER TABLE compliance_items
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'live'
    CHECK (status IN ('draft', 'scheduled', 'live', 'archived'));

-- When to auto-publish (only for status = 'scheduled')
ALTER TABLE compliance_items
  ADD COLUMN IF NOT EXISTS scheduled_at timestamptz;

-- Which departments this applies to (empty = all departments)
ALTER TABLE compliance_items
  ADD COLUMN IF NOT EXISTS departments text[] NOT NULL DEFAULT '{}';

-- Track last edit
ALTER TABLE compliance_items
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE compliance_items
  ADD COLUMN IF NOT EXISTS updated_by uuid REFERENCES auth.users(id);

-- Set existing rows to 'live' status (they're already visible)
UPDATE compliance_items SET status = 'live' WHERE status IS NULL;

-- ============================================================
-- 2. Update RLS on compliance_items
-- ============================================================

-- Drop old SELECT policy and create a new one:
-- Regular users only see 'live' items; admins see everything
DROP POLICY IF EXISTS "Authenticated users can read compliance items" ON compliance_items;

CREATE POLICY "Users see live items, admins see all"
  ON compliance_items FOR SELECT
  TO authenticated
  USING (
    status = 'live'
    OR is_admin()
  );

-- ============================================================
-- 3. Create audit_log table
-- ============================================================

CREATE TABLE IF NOT EXISTS audit_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  actor_id uuid NOT NULL REFERENCES auth.users(id),
  action text NOT NULL,          -- 'create', 'update', 'delete', 'status_change', 'archive'
  entity_type text NOT NULL,     -- 'announcement', 'user', 'course', etc.
  entity_id text NOT NULL,       -- ID of the affected entity
  entity_title text,             -- Human-readable title for display
  details jsonb DEFAULT '{}',    -- Changed fields, old/new values, etc.
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for fast lookups by entity
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_actor ON audit_log(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON audit_log(created_at DESC);

-- Enable RLS
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can read the audit log
CREATE POLICY "Admins can read audit log"
  ON audit_log FOR SELECT
  TO authenticated
  USING (is_admin());

-- Any authenticated user can insert (the app inserts on their behalf)
CREATE POLICY "Authenticated users can insert audit log"
  ON audit_log FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = actor_id);

-- ============================================================
-- 4. Done
-- ============================================================
