-- Migration 015: Per-User Program Assignment
-- Users are assigned to a training program (BDR, AM, ...). Home, gating,
-- and certificates scope to the assigned program. Null = default (first program).

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS program_id text;

-- No new RLS needed: existing profile policies already let users read their
-- own row and admins manage all rows.
