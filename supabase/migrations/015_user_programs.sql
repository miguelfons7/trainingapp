-- Migration 015: Per-User Program Assignment
-- Users are assigned to a training program (BDR, AM, ...). Home, gating,
-- and certificates scope to the assigned program. Null = default (first program).

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS program_id text;

-- Pin program_id in the self-update policy: program assignment is
-- admin-managed (like role and team_id) — without this, any user could
-- switch their own program from the browser console.
DROP POLICY IF EXISTS "Users can update own profile (limited)" ON profiles;
CREATE POLICY "Users can update own profile (limited)"
  ON profiles FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid()
    -- Users cannot change their own role, team, or program
    AND role = (SELECT role FROM profiles WHERE id = auth.uid())
    AND team_id IS NOT DISTINCT FROM (SELECT team_id FROM profiles WHERE id = auth.uid())
    AND program_id IS NOT DISTINCT FROM (SELECT program_id FROM profiles WHERE id = auth.uid())
  );
