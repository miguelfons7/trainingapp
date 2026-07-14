-- 017_harden_handle_new_user.sql
--
-- Hardens the auto-provisioning trigger for the Google sign-in rollout.
-- Two changes vs. migration 001, both defensive:
--
--   1. Idempotency guard. The original did a blind INSERT INTO profiles for
--      every new auth.users row. If Supabase ever creates a NEW auth user for
--      an email that already owns a profile (e.g. an existing email+password
--      user whose Google sign-in did not auto-link because their email was
--      unconfirmed), that blind INSERT trips the profiles.email UNIQUE
--      constraint, raises inside this AFTER-INSERT trigger, and rolls back the
--      whole auth.users insert -> an opaque sign-in failure. Returning early
--      when a profile already exists turns that hard failure into a safe no-op
--      (the user's existing account and progress are untouched; password login
--      still works). NOTE: this does not by itself carry progress over to a
--      Google login — that requires the existing account's email to be
--      confirmed so Supabase auto-links to the same UUID. See the rollout
--      checklist / migration comment below.
--
--   2. Domain backstop (defense in depth). The primary domain gate is the
--      Google "Internal" consent screen. This adds a code-level invariant so a
--      console misconfiguration alone cannot auto-provision arbitrary Google
--      accounts: a non-viatrading.com email is only provisioned when an admin
--      explicitly invited that exact address. RAISE here rolls back the
--      auth.users insert in the same transaction, so no orphan login is left.

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _invitation RECORD;
BEGIN
  -- (1) Idempotency: never double-insert a profile for an email that already
  -- has one. Prevents an opaque unique_violation from aborting the sign-in.
  IF EXISTS (SELECT 1 FROM profiles WHERE email = NEW.email) THEN
    RETURN NEW;
  END IF;

  -- Find the most recent valid invitation for this email
  SELECT * INTO _invitation
  FROM invitations
  WHERE email = NEW.email
    AND accepted_at IS NULL
    AND expires_at > now()
  ORDER BY created_at DESC
  LIMIT 1;

  -- (2) Domain backstop: only auto-provision @viatrading.com, unless an admin
  -- explicitly invited a different address.
  IF _invitation.id IS NULL
     AND lower(split_part(NEW.email, '@', 2)) <> 'viatrading.com' THEN
    RAISE EXCEPTION 'Auto-provisioning blocked for non-viatrading.com email: %', NEW.email;
  END IF;

  -- Create profile from invitation data or defaults. full_name falls back to
  -- Google's `name` claim, then the email local-part.
  INSERT INTO profiles (id, email, full_name, role, team_id, invited_by)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
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

-- Trigger definition is unchanged (on_auth_user_created, AFTER INSERT on
-- auth.users) — CREATE OR REPLACE FUNCTION above swaps the body in place.
