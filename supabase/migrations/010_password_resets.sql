-- Migration 010: Password Reset Tokens
-- Admin-generated reset links (no email required)

-- Ensure pgcrypto is available for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Token table (mirrors invitations pattern)
CREATE TABLE password_resets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token uuid NOT NULL DEFAULT gen_random_uuid(),
  expires_at timestamptz DEFAULT now() + interval '24 hours',
  used_at timestamptz,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_password_resets_token ON password_resets(token);

-- RLS: admins can insert/read, nobody else
ALTER TABLE password_resets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage password resets"
  ON password_resets FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Validation function (anon-accessible, like validate_invitation_token)
CREATE OR REPLACE FUNCTION validate_password_reset_token(reset_token text)
RETURNS TABLE(email text, full_name text, status text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.email,
    p.full_name,
    CASE
      WHEN pr.used_at IS NOT NULL THEN 'used'
      WHEN pr.expires_at < now() THEN 'expired'
      ELSE 'valid'
    END AS status
  FROM password_resets pr
  JOIN profiles p ON p.id = pr.user_id
  WHERE pr.token = reset_token::uuid;
END;
$$;

-- Password update function (anon-accessible via valid token)
CREATE OR REPLACE FUNCTION reset_password_with_token(reset_token text, new_password text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_record password_resets%ROWTYPE;
BEGIN
  -- Find valid token
  SELECT * INTO v_record
  FROM password_resets
  WHERE token = reset_token::uuid
    AND expires_at > now()
    AND used_at IS NULL;

  IF v_record.id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid or expired reset link');
  END IF;

  -- Update password in auth.users
  UPDATE auth.users
  SET encrypted_password = crypt(new_password, gen_salt('bf')),
      updated_at = now()
  WHERE id = v_record.user_id;

  -- Mark token as used
  UPDATE password_resets
  SET used_at = now()
  WHERE id = v_record.id;

  RETURN jsonb_build_object('success', true);
END;
$$;
