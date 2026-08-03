-- 018_invite_course_assignments.sql
--
-- Lets an admin pre-assign courses when inviting someone. The courses are
-- stored on the invitation and turned into course_assignments rows when the
-- person signs up (password OR Google — handle_new_user matches by email
-- either way), so a new hire lands already set up with their courses.
--
-- Supersedes the handle_new_user() body from migration 017 (keeps the
-- idempotency guard + @viatrading.com domain backstop) and adds the course
-- pre-assignment step.

ALTER TABLE invitations
  ADD COLUMN IF NOT EXISTS course_ids text[] NOT NULL DEFAULT '{}';

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _invitation RECORD;
BEGIN
  -- Idempotency: never double-insert a profile for an email that already has one
  IF EXISTS (SELECT 1 FROM profiles WHERE email = NEW.email) THEN
    RETURN NEW;
  END IF;

  -- Most recent valid invitation for this email
  SELECT * INTO _invitation
  FROM invitations
  WHERE email = NEW.email AND accepted_at IS NULL AND expires_at > now()
  ORDER BY created_at DESC LIMIT 1;

  -- Domain backstop: only auto-provision @viatrading.com unless explicitly invited
  IF _invitation.id IS NULL
     AND lower(split_part(NEW.email, '@', 2)) <> 'viatrading.com' THEN
    RAISE EXCEPTION 'Auto-provisioning blocked for non-viatrading.com email: %', NEW.email;
  END IF;

  INSERT INTO profiles (id, email, full_name, role, team_id, invited_by)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(_invitation.role, 'user'),
    _invitation.team_id,
    _invitation.invited_by
  );

  IF _invitation.id IS NOT NULL THEN
    UPDATE invitations SET accepted_at = now() WHERE id = _invitation.id;

    -- Pre-assign any courses chosen at invite time (free-form assignment)
    IF _invitation.course_ids IS NOT NULL
       AND array_length(_invitation.course_ids, 1) > 0 THEN
      INSERT INTO course_assignments (user_id, course_id, assigned_by)
      SELECT NEW.id, cid, _invitation.invited_by
      FROM unnest(_invitation.course_ids) AS cid
      ON CONFLICT (user_id, course_id) DO NOTHING;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;
