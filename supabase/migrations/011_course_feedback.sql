-- Migration 011: Course Feedback
-- Post-quiz feedback: rating, relevance, difficulty, optional comment

CREATE TABLE course_feedback (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id text NOT NULL,
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  relevance text NOT NULL CHECK (relevance IN ('very', 'somewhat', 'not-really')),
  difficulty text NOT NULL CHECK (difficulty IN ('too-easy', 'just-right', 'too-hard')),
  comment text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_course_feedback_course ON course_feedback(course_id);
CREATE INDEX idx_course_feedback_user ON course_feedback(user_id);

ALTER TABLE course_feedback ENABLE ROW LEVEL SECURITY;

-- Users can insert their own feedback
CREATE POLICY "Users can insert own feedback"
  ON course_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own feedback (e.g., retake quiz)
CREATE POLICY "Users can update own feedback"
  ON course_feedback FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can read their own feedback
CREATE POLICY "Users can read own feedback"
  ON course_feedback FOR SELECT
  USING (auth.uid() = user_id);

-- Admins and leadership can read all feedback
CREATE POLICY "Leadership can read all feedback"
  ON course_feedback FOR SELECT
  USING (is_leadership_or_admin());
