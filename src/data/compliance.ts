import type { ComplianceItem } from '../types'

/**
 * Seed compliance items: hardcoded announcements that ship with the app.
 * Admins can create additional announcements via the Admin dashboard;
 * those are stored in localStorage (see ComplianceContext).
 */
export const complianceItems: ComplianceItem[] = [
  {
    id: 'tx-reseller-permit',
    title: 'Texas Reseller Permit Requirement',
    description:
      'All Texas-based customers are now required to provide a valid Texas Reseller Permit before purchases can be processed. This change is effective immediately for new customers and must be collected from existing TX customers by the deadline.',
    details:
      'The State of Texas has updated its tax compliance requirements for wholesale and liquidation transactions. Account Managers must verify that all Texas customers have a valid reseller permit on file. If a customer does not have one, direct them to the Texas Comptroller website to apply. Do not process orders for TX customers without a valid permit after the deadline.',
    requiredBy: '2026-06-01',
    priority: 'high',
    acknowledgedBy: [],
  },
]
