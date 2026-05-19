-- Issue Reports table for user-submitted bug/issue reports
-- Migration 008

CREATE TABLE IF NOT EXISTS issue_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reported_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  page_url TEXT NOT NULL DEFAULT '',
  screenshot_url TEXT,
  user_agent TEXT,
  viewport TEXT,
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'in-progress', 'resolved', 'dismissed')),
  admin_note TEXT,
  resolved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_issue_reports_status ON issue_reports(status);
CREATE INDEX idx_issue_reports_reported_by ON issue_reports(reported_by);

ALTER TABLE issue_reports ENABLE ROW LEVEL SECURITY;

-- Any authenticated user can create their own reports
CREATE POLICY issue_reports_insert ON issue_reports
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = reported_by);

-- Users see their own reports, admins see all
CREATE POLICY issue_reports_select ON issue_reports
  FOR SELECT TO authenticated
  USING (auth.uid() = reported_by OR is_admin());

-- Only admins can update (change status, add notes)
CREATE POLICY issue_reports_update ON issue_reports
  FOR UPDATE TO authenticated
  USING (is_admin());

-- Auto-update updated_at on changes
CREATE TRIGGER set_issue_reports_updated_at
  BEFORE UPDATE ON issue_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
