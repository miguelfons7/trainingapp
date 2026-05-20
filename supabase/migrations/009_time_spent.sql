-- Add time_spent_seconds to module_progress for tracking how long users spend on each module
-- Migration 009

ALTER TABLE module_progress ADD COLUMN IF NOT EXISTS time_spent_seconds integer CHECK (time_spent_seconds >= 0);
