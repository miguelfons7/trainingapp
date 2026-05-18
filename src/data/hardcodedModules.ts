/**
 * Set of module IDs that have hardcoded TSX section components.
 * Used by ContentManager and ContentEditorPage to distinguish
 * "Built-in" modules from those with no content at all.
 *
 * Keep in sync with the contentMap in ModuleView.tsx.
 */
export const hardcodedModuleIds = new Set([
  // Course 1 — Intro to the Liquidation Industry
  'secondary-market',
  'reverse-logistics',
  'product-conditions',
  'shipping-terms',
  'buyer-types',
  'key-terminology',
  // Course 2 — Who Is Via Trading
  'our-story',
  'mission-values',
  'our-platforms',
  'liquidatenow',
  'wesolvereturns',
  'why-via',
  // Course 3 — Product Knowledge
  'product-overview',
  'target-programs',
  'walmart-programs',
  'home-depot-programs',
  'amazon-programs',
  'wayfair-programs',
  'zappos-programs',
  'sams-club-programs',
  'other-programs',
  'ln-offerings',
  // Course 4 — Consultative Sales
  'consultative-mindset',
  'asking-right-questions',
  'listening-beyond-words',
  'know-your-patients',
  'five-step-method',
  'when-patients-push-back',
  'art-of-the-close',
  'transaction-to-partnership',
  'triage-and-diagnosis',
  // Course 5 — BDR Role Training
  'bdr-role-overview',
  'bdr-daily-workflow',
  'bdr-opening-calls',
  'bdr-discovery-framework',
  'bdr-objections-routing',
  'bdr-tools-hubspot',
  'bdr-follow-ups',
])
