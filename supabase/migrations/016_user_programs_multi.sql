-- Migration 016: Multiple Programs Per User
-- Replaces the single profiles.program_id assignment with a many-to-many
-- user<->program link, so a user can hold several training programs at once
-- (and have NONE until an admin assigns one). profiles.program_id is kept
-- (deprecated) for back-compat; the app now reads user_programs.
--
-- New users get no rows here (handle_new_user doesn't touch this table), so
-- they start unassigned and see a "no program" state until assigned.

CREATE TABLE IF NOT EXISTS user_programs (
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  program_id text NOT NULL,
  assigned_at timestamptz NOT NULL DEFAULT now(),
  assigned_by uuid REFERENCES profiles(id),
  PRIMARY KEY (user_id, program_id)
);

CREATE INDEX IF NOT EXISTS idx_user_programs_user ON user_programs(user_id);

ALTER TABLE user_programs ENABLE ROW LEVEL SECURITY;

-- Users see their own assignments; leadership/admin see all.
DROP POLICY IF EXISTS "Read own or all programs" ON user_programs;
CREATE POLICY "Read own or all programs"
  ON user_programs FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR is_leadership_or_admin());

-- Only admins assign or remove programs.
DROP POLICY IF EXISTS "Admins assign programs" ON user_programs;
CREATE POLICY "Admins assign programs"
  ON user_programs FOR INSERT TO authenticated
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins remove programs" ON user_programs;
CREATE POLICY "Admins remove programs"
  ON user_programs FOR DELETE TO authenticated
  USING (is_admin());

-- Backfill: preserve every existing single-program assignment.
-- (Users with a NULL program_id were only ever defaulting to the first
-- program in code; they intentionally get NO row and become "unassigned".)
INSERT INTO user_programs (user_id, program_id)
SELECT id, program_id FROM profiles WHERE program_id IS NOT NULL
ON CONFLICT (user_id, program_id) DO NOTHING;

-- Verify
SELECT
  (SELECT count(*) FROM user_programs) AS rows_after_backfill,
  (SELECT count(*) FROM profiles WHERE program_id IS NOT NULL) AS profiles_with_program,
  (SELECT count(*) FROM profiles WHERE program_id IS NULL) AS profiles_unassigned;
