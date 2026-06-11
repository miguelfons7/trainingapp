-- ============================================================
-- VIAcademy Database Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- ─── TABLES ─────────────────────────────────────────────────

-- Teams / Departments
CREATE TABLE teams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text NOT NULL UNIQUE,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'leadership', 'admin')),
  team_id uuid REFERENCES teams(id) ON DELETE SET NULL,
  avatar_url text,
  invited_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Course assignments (who needs to take what)
CREATE TABLE course_assignments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id text NOT NULL,
  assigned_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  assigned_at timestamptz DEFAULT now(),
  due_date timestamptz,
  UNIQUE(user_id, course_id)
);

-- Module progress (replaces localStorage)
CREATE TABLE module_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id text NOT NULL,
  module_id text NOT NULL,
  status text NOT NULL DEFAULT 'not-started' CHECK (status IN ('not-started', 'in-progress', 'completed')),
  score integer CHECK (score IS NULL OR (score >= 0 AND score <= 100)),
  started_at timestamptz,
  completed_at timestamptz,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id, module_id)
);

-- Invitations (invite-only signup)
CREATE TABLE invitations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'leadership', 'admin')),
  team_id uuid REFERENCES teams(id) ON DELETE SET NULL,
  invited_by uuid REFERENCES profiles(id) ON DELETE SET NULL NOT NULL,
  token uuid NOT NULL DEFAULT gen_random_uuid(),
  accepted_at timestamptz,
  expires_at timestamptz DEFAULT now() + interval '7 days',
  created_at timestamptz DEFAULT now()
);

-- Content change requests (leadership can submit)
CREATE TABLE content_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  requested_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  course_id text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-review', 'approved', 'rejected', 'completed')),
  reviewed_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  review_note text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ─── INDEXES ────────────────────────────────────────────────

CREATE INDEX idx_profiles_team ON profiles(team_id);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_course_assignments_user ON course_assignments(user_id);
CREATE INDEX idx_course_assignments_course ON course_assignments(course_id);
CREATE INDEX idx_module_progress_user ON module_progress(user_id);
CREATE INDEX idx_module_progress_course ON module_progress(user_id, course_id);
CREATE INDEX idx_invitations_email ON invitations(email);
CREATE INDEX idx_invitations_token ON invitations(token);
CREATE INDEX idx_content_requests_status ON content_requests(status);

-- ─── HELPER FUNCTIONS ───────────────────────────────────────

-- Get current user's role
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$;

-- Get current user's team
CREATE OR REPLACE FUNCTION get_my_team_id()
RETURNS uuid
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT team_id FROM profiles WHERE id = auth.uid();
$$;

-- Check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin');
$$;

-- Check if user is leadership or admin
CREATE OR REPLACE FUNCTION is_leadership_or_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('leadership', 'admin'));
$$;

-- ─── AUTO-CREATE PROFILE ON SIGNUP ──────────────────────────

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _invitation RECORD;
BEGIN
  -- Find the most recent valid invitation for this email
  SELECT * INTO _invitation
  FROM invitations
  WHERE email = NEW.email
    AND accepted_at IS NULL
    AND expires_at > now()
  ORDER BY created_at DESC
  LIMIT 1;

  -- Create profile from invitation data or defaults
  INSERT INTO profiles (id, email, full_name, role, team_id, invited_by)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(_invitation.role, 'user'),
    _invitation.team_id,
    _invitation.invited_by
  );

  -- Mark invitation as accepted
  IF _invitation.id IS NOT NULL THEN
    UPDATE invitations SET accepted_at = now() WHERE id = _invitation.id;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── AUTO-UPDATE updated_at ─────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER module_progress_updated_at
  BEFORE UPDATE ON module_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER content_requests_updated_at
  BEFORE UPDATE ON content_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── ROW LEVEL SECURITY ─────────────────────────────────────

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_requests ENABLE ROW LEVEL SECURITY;

-- TEAMS: everyone can read, admins can write
CREATE POLICY "Anyone authenticated can view teams"
  ON teams FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can insert teams"
  ON teams FOR INSERT TO authenticated WITH CHECK (is_admin());

CREATE POLICY "Admins can update teams"
  ON teams FOR UPDATE TO authenticated USING (is_admin());

CREATE POLICY "Admins can delete teams"
  ON teams FOR DELETE TO authenticated USING (is_admin());

-- PROFILES: scoped by role
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Leadership can view their team"
  ON profiles FOR SELECT TO authenticated
  USING (
    get_my_role() = 'leadership'
    AND team_id = get_my_team_id()
  );

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT TO authenticated
  USING (is_admin());

CREATE POLICY "Users can update own profile (limited)"
  ON profiles FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid()
    -- Users cannot change their own role or team
    AND role = (SELECT role FROM profiles WHERE id = auth.uid())
    AND team_id IS NOT DISTINCT FROM (SELECT team_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE TO authenticated
  USING (is_admin());

-- COURSE_ASSIGNMENTS: scoped by role
CREATE POLICY "Users can view own assignments"
  ON course_assignments FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Leadership can view team assignments"
  ON course_assignments FOR SELECT TO authenticated
  USING (
    get_my_role() IN ('leadership', 'admin')
    AND (
      is_admin()
      OR user_id IN (SELECT id FROM profiles WHERE team_id = get_my_team_id())
    )
  );

CREATE POLICY "Leadership can assign courses to their team"
  ON course_assignments FOR INSERT TO authenticated
  WITH CHECK (
    is_leadership_or_admin()
    AND (
      is_admin()
      OR user_id IN (SELECT id FROM profiles WHERE team_id = get_my_team_id())
    )
  );

CREATE POLICY "Leadership can remove team assignments"
  ON course_assignments FOR DELETE TO authenticated
  USING (
    is_leadership_or_admin()
    AND (
      is_admin()
      OR user_id IN (SELECT id FROM profiles WHERE team_id = get_my_team_id())
    )
  );

-- MODULE_PROGRESS: users own their progress, leadership/admin can view
CREATE POLICY "Users can view own progress"
  ON module_progress FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own progress"
  ON module_progress FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own progress"
  ON module_progress FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Leadership can view team progress"
  ON module_progress FOR SELECT TO authenticated
  USING (
    get_my_role() IN ('leadership', 'admin')
    AND (
      is_admin()
      OR user_id IN (SELECT id FROM profiles WHERE team_id = get_my_team_id())
    )
  );

-- INVITATIONS: admins manage all, leadership can invite users to their team
CREATE POLICY "Admins can do anything with invitations"
  ON invitations FOR ALL TO authenticated
  USING (is_admin());

CREATE POLICY "Leadership can create user invitations for their team"
  ON invitations FOR INSERT TO authenticated
  WITH CHECK (
    get_my_role() = 'leadership'
    AND role = 'user'
    AND team_id = get_my_team_id()
  );

CREATE POLICY "Leadership can view their team invitations"
  ON invitations FOR SELECT TO authenticated
  USING (
    get_my_role() = 'leadership'
    AND team_id = get_my_team_id()
  );

-- CONTENT_REQUESTS: leadership creates, admins manage
CREATE POLICY "Users can view own content requests"
  ON content_requests FOR SELECT TO authenticated
  USING (requested_by = auth.uid());

CREATE POLICY "Leadership can create content requests"
  ON content_requests FOR INSERT TO authenticated
  WITH CHECK (is_leadership_or_admin());

CREATE POLICY "Leadership can update own pending requests"
  ON content_requests FOR UPDATE TO authenticated
  USING (requested_by = auth.uid() AND status = 'pending')
  WITH CHECK (requested_by = auth.uid());

CREATE POLICY "Admins can manage all content requests"
  ON content_requests FOR ALL TO authenticated
  USING (is_admin());

-- ─── SEED DATA ──────────────────────────────────────────────

-- Default teams (Via Trading departments)
INSERT INTO teams (name) VALUES
  ('Sales'),
  ('Operations'),
  ('Leadership'),
  ('New Hires');
