-- ============================================================
-- Invitation Token Validation (public / anon-accessible)
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- This function allows unauthenticated (anon) users to validate
-- an invitation token on the signup page. It returns limited info
-- (email, role, team name, status) without exposing the full row.

CREATE OR REPLACE FUNCTION validate_invitation_token(invite_token text)
RETURNS TABLE(
  email text,
  role text,
  team_name text,
  status text
)
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    i.email,
    i.role,
    t.name AS team_name,
    CASE
      WHEN i.accepted_at IS NOT NULL THEN 'accepted'
      WHEN i.expires_at < now() THEN 'expired'
      ELSE 'valid'
    END AS status
  FROM invitations i
  LEFT JOIN teams t ON t.id = i.team_id
  WHERE i.token = invite_token::uuid;
END;
$$;

-- Grant anon access so unauthenticated visitors can validate tokens
GRANT EXECUTE ON FUNCTION validate_invitation_token(text) TO anon;
GRANT EXECUTE ON FUNCTION validate_invitation_token(text) TO authenticated;
