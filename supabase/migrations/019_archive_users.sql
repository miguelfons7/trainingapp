-- 019_archive_users.sql
--
-- Lets admins ARCHIVE users who no longer work here, without losing any data.
-- Archiving is a soft, reversible state: the profile and all history
-- (progress, certificates, activity) are kept. An archived user is hidden from
-- active admin lists and blocked from signing in.

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS archived_at timestamptz;

-- Admin-only, reversible archive/restore. SECURITY DEFINER so it can set the
-- auth-layer ban; the is_admin() guard still reads the CALLER's role via
-- auth.uid(). You cannot archive your own account (avoids locking yourself out).
CREATE OR REPLACE FUNCTION set_user_archived(target_user_id uuid, p_archived boolean)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Only admins can archive users';
  END IF;
  IF target_user_id = auth.uid() THEN
    RAISE EXCEPTION 'You cannot archive your own account';
  END IF;

  IF p_archived THEN
    UPDATE profiles SET archived_at = now() WHERE id = target_user_id;
    -- Block sign-in at the auth layer (reversible). Existing sessions lapse at
    -- next token refresh; the client also gates an archived profile immediately.
    UPDATE auth.users
      SET banned_until = now() + interval '100 years'
      WHERE id = target_user_id;
  ELSE
    UPDATE profiles SET archived_at = NULL WHERE id = target_user_id;
    UPDATE auth.users SET banned_until = NULL WHERE id = target_user_id;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION set_user_archived(uuid, boolean) TO authenticated;
