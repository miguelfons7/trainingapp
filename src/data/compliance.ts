import type { ComplianceItem } from '../types'

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
  {
    id: 'return-policy-update',
    title: 'Updated Return Policy Acknowledgement',
    description:
      'Via Trading has updated its company return policy. All team members must review and acknowledge the updated terms, including changes to the return window, condition requirements, and restocking procedures.',
    details:
      'Key changes include: the return request window has been adjusted to 48 hours from delivery, all returns must include original packaging and documentation, and a restocking fee structure has been clarified for different product categories. Make sure you understand these changes so you can communicate them accurately to customers.',
    requiredBy: '2026-07-15',
    priority: 'medium',
    acknowledgedBy: [],
  },
]
