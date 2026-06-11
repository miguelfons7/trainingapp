-- Migration 013: Learning Activity Events
-- Powers streaks, the Active Learners admin view, and visibility into
-- failed quiz attempts (which module_progress alone cannot show).

CREATE TABLE learning_activity (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id text NOT NULL,
  module_id text NOT NULL,
  event text NOT NULL CHECK (event IN ('module_started', 'module_completed', 'quiz_attempted')),
  score integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_learning_activity_user_time ON learning_activity(user_id, created_at DESC);

ALTER TABLE learning_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users insert own activity"
  ON learning_activity FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users read own activity"
  ON learning_activity FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Leadership reads all activity"
  ON learning_activity FOR SELECT
  USING (is_leadership_or_admin());
