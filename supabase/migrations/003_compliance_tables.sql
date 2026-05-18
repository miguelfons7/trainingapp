-- Migration 003: Compliance items + acknowledgements
-- Moves compliance/announcements from localStorage to Supabase

-- Compliance items (seed announcements + admin-created)
CREATE TABLE IF NOT EXISTS compliance_items (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  details text NOT NULL,
  required_by text NOT NULL,
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium')),
  created_by uuid REFERENCES auth.users(id),
  is_seed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Acknowledgements (who acknowledged which item)
CREATE TABLE IF NOT EXISTS compliance_acknowledgements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id text NOT NULL REFERENCES compliance_items(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  acknowledged_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (item_id, user_id)
);

-- RLS
ALTER TABLE compliance_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_acknowledgements ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read compliance items
CREATE POLICY "Authenticated users can read compliance items"
  ON compliance_items FOR SELECT
  TO authenticated
  USING (true);

-- Admins can insert compliance items
CREATE POLICY "Admins can create compliance items"
  ON compliance_items FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Admins can update compliance items (non-seed only)
CREATE POLICY "Admins can update non-seed compliance items"
  ON compliance_items FOR UPDATE
  TO authenticated
  USING (is_admin() AND is_seed = false);

-- Admins can delete compliance items (non-seed only)
CREATE POLICY "Admins can delete non-seed compliance items"
  ON compliance_items FOR DELETE
  TO authenticated
  USING (is_admin() AND is_seed = false);

-- All authenticated users can read acknowledgements (needed for admin views)
CREATE POLICY "Authenticated users can read acknowledgements"
  ON compliance_acknowledgements FOR SELECT
  TO authenticated
  USING (true);

-- Users can insert their own acknowledgements
CREATE POLICY "Users can acknowledge items"
  ON compliance_acknowledgements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Seed the existing compliance item
INSERT INTO compliance_items (id, title, description, details, required_by, priority, is_seed, created_at)
VALUES (
  'tx-reseller-permit',
  'Texas Reseller Permit Requirement',
  'All Texas-based customers are now required to provide a valid Texas Reseller Permit before purchases can be processed. This change is effective immediately for new customers and must be collected from existing TX customers by the deadline.',
  'The State of Texas has updated its tax compliance requirements for wholesale and liquidation transactions. Account Managers must verify that all Texas customers have a valid reseller permit on file. If a customer does not have one, direct them to the Texas Comptroller website to apply. Do not process orders for TX customers without a valid permit after the deadline.',
  '2026-06-01',
  'high',
  true,
  now()
) ON CONFLICT (id) DO NOTHING;
