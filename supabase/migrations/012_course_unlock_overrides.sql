-- Migration 012: Course Unlock Overrides
-- Per-user exceptions to sequential course gating.
-- An override row means "this user may access this course regardless of sequence."

CREATE TABLE course_unlock_overrides (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id text NOT NULL,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_course_unlock_overrides_user ON course_unlock_overrides(user_id);

ALTER TABLE course_unlock_overrides ENABLE ROW LEVEL SECURITY;

-- Users need to read their own overrides to compute course locks client-side
CREATE POLICY "Users can read own unlock overrides"
  ON course_unlock_overrides FOR SELECT
  USING (auth.uid() = user_id);

-- Leadership and admins manage all overrides
CREATE POLICY "Leadership can manage unlock overrides"
  ON course_unlock_overrides FOR ALL
  USING (is_leadership_or_admin())
  WITH CHECK (is_leadership_or_admin());
