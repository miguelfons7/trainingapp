import type { TermMatchPair, ScenarioQuestion, FillInBlankItem } from '../../../types'

/**
 * Inline exercises for Course 4: Consultative Sales
 * 7 exercise datasets spread across 7 of 9 lesson modules.
 */

// ─── Module 2: Asking the Right Questions ────────────────────────
// TermMatch — "Match the Question Types"
export const questionTypesTermMatch: TermMatchPair[] = [
  {
    term: '"Tell me about your business."',
    definition: 'Open Question — invites a broad, detailed answer',
  },
  {
    term: '"Do you have a forklift at your warehouse?"',
    definition: 'Closed Question — elicits a specific yes/no answer',
  },
  {
    term: '"What kind of quality issues — condition or categories?"',
    definition: 'Probing Question — digs deeper into a surface-level answer',
  },
  {
    term: '"So consistent supply without a middleman would free up margin?"',
    definition: 'Leading Question — guides the buyer toward a realization',
  },
  {
    term: '"What does growth look like for you over the next year?"',
    definition: 'Open Question — encourages the buyer to share their vision',
  },
  {
    term: '"Are you currently buying truckloads or pallets?"',
    definition: 'Closed Question — narrows to a specific factual answer',
  },
]

// ─── Module 3: Listening Beyond Words ────────────────────────────
// ScenarioCard — "Reading Between the Lines"
export const listeningScenarios: ScenarioQuestion[] = [
  {
    id: 'listening-1',
    scenario:
      'A buyer talks enthusiastically about expanding to a second store location, increasing their order frequency, and hiring more staff. However, they never once mention profitability or margins. What is the most likely hidden concern?',
    options: [
      'They are extremely profitable and don\'t need to discuss it',
      'Their volume is growing but profitability may not be keeping pace',
      'They forgot to mention it',
      'Margins aren\'t relevant to their business',
    ],
    bestAnswerIndex: 1,
    explanation:
      'When a buyer talks about growth but avoids the topic of margins, it often signals that volume is outpacing profitability. They may be scaling up without the cost structure to support it. A good follow-up would be: "That\'s great growth — how are your margins holding up as you scale?"',
  },
  {
    id: 'listening-2',
    scenario:
      'During a call, a buyer keeps bringing the conversation back to price on every topic you discuss. You mention a new program — they ask the price. You describe the quality — they ask the price. You explain shipping — they ask about shipping cost. What does this pattern likely indicate?',
    options: [
      'They are just trying to waste your time',
      'They are comparing you against a cheaper competitor',
      'Their margins are tight and every dollar matters to their business model',
      'They have no interest in buying',
    ],
    bestAnswerIndex: 2,
    explanation:
      'Repeated price focus almost always signals tight margins. Instead of getting frustrated, acknowledge it: "I can tell price is a major factor for you — totally understandable. Let me make sure we find something that works within your numbers." Then probe: "What per-unit cost do you need to hit for your margin to work?"',
  },
  {
    id: 'listening-3',
    scenario:
      'A buyer says "I\'m fine with my current supplier" but agreed to take your call, asked detailed questions about your Target program, and requested a manifest. Their words say one thing, but their actions say another. What is the best interpretation?',
    options: [
      'They are truly happy and just being polite',
      'They are completely ready to switch to Via Trading',
      'They have unmet needs their current supplier isn\'t filling, even if they haven\'t admitted it yet',
      'They are gathering information for their current supplier',
    ],
    bestAnswerIndex: 2,
    explanation:
      'Actions speak louder than words. A buyer who is truly satisfied wouldn\'t invest time on a detailed call and request a manifest. Something is missing from their current setup — inconsistency, limited selection, poor service, or pricing gaps. Don\'t push the switch; position Via as a complement: "We often work as a second source, especially for inventory your supplier doesn\'t carry."',
  },
]

// ─── Module 4: Know Your Patients ────────────────────────────────
// FillInBlank — "Quick Check: Buyer Needs"
export const buyerNeedsFillBlanks: FillInBlankItem[] = [
  {
    id: 'bn-fib-1',
    sentence: 'At the top of the Customer Needs Hierarchy, the ultimate driver for every buyer is _____.',
    blank: 'Profit',
    options: ['Volume', 'Profit', 'Variety', 'Speed'],
    correctIndex: 1,
  },
  {
    id: 'bn-fib-2',
    sentence: 'A buyer focused on _____ wants to maximize per-unit earnings, while a buyer focused on volume wants to maximize throughput.',
    blank: 'margin',
    options: ['margin', 'speed', 'variety', 'consistency'],
    correctIndex: 0,
  },
  {
    id: 'bn-fib-3',
    sentence: 'In the Features → Benefits → Needs framework, the phrase "What that means for you is…" is used to bridge from a _____ to a _____.',
    blank: 'feature to a benefit',
    options: ['benefit to a need', 'feature to a benefit', 'need to a close', 'question to an answer'],
    correctIndex: 1,
  },
  {
    id: 'bn-fib-4',
    sentence: 'Business drivers like storage capacity, cash flow, and team size shape _____ a buyer purchases, while personal drivers like risk tolerance shape _____ they make decisions.',
    blank: 'how… how',
    options: ['what… when', 'how… how', 'where… why', 'when… what'],
    correctIndex: 1,
  },
]

// ─── Module 5: The 5-Step Method ─────────────────────────────────
// ScenarioCard — "Identify the Step"
export const fiveStepScenarios: ScenarioQuestion[] = [
  {
    id: 'step-1',
    scenario:
      'An Account Manager says: "So just to make sure I have this right — you\'re running an online store on eBay, mostly selling electronics, doing about 5 pallets a month, and the main challenge is that your current supplier\'s quality has been inconsistent. Is that accurate?" Which step of the 5-Step Method is the AM performing?',
    options: [
      'Step 2: State the Idea',
      'Step 1: Summarize',
      'Step 4: Reinforce Benefits',
      'Step 5: Close',
    ],
    bestAnswerIndex: 1,
    explanation:
      'This is the Summarize step — the AM is reflecting back what the buyer told them to confirm understanding before making a recommendation. This is the diagnostic phase, and it should take up about 40% of the conversation.',
  },
  {
    id: 'step-2',
    scenario:
      'An Account Manager says: "The advantage for you is steady supply without the inconsistency you\'ve been dealing with, and because we\'re direct — no middleman — your per-unit cost should come in lower than what you\'re paying now." Which step is this?',
    options: [
      'Step 1: Summarize',
      'Step 3: Explain How It Works',
      'Step 4: Reinforce Benefits',
      'Step 5: Close',
    ],
    bestAnswerIndex: 2,
    explanation:
      'This is the Reinforce Benefits step — the AM is connecting Via Trading\'s features directly to the buyer\'s stated needs. Notice how the AM references what the buyer told them (inconsistency, middleman pricing) to make the benefit feel personal and relevant.',
  },
  {
    id: 'step-3',
    scenario:
      'An AM has been on a call for 15 minutes. They asked one surface-level question ("What are you looking for?"), then immediately launched into a detailed explanation of every program Via Trading offers. They covered Target, Walmart, Amazon, and Home Depot in detail. What went wrong?',
    options: [
      'They spent too long on Step 1',
      'They skipped Steps 1-2 and jumped straight to Step 3, turning a consultative conversation into a product catalog dump',
      'They should have closed sooner',
      'Nothing — covering all programs is thorough',
    ],
    bestAnswerIndex: 1,
    explanation:
      'The AM skipped the diagnostic work. One surface question is not enough to understand the buyer\'s business. Without a proper summary of needs (Step 1) and a targeted recommendation (Step 2), explaining every program is just a catalog dump. The buyer ends up overwhelmed instead of helped. Prescription before diagnosis is malpractice.',
  },
]

// ─── Module 6: When Patients Push Back ───────────────────────────
// ScenarioCard — "Handle the Objection"
export const objectionScenarios: ScenarioQuestion[] = [
  {
    id: 'obj-1',
    scenario:
      'A buyer says: "Your prices are too high." Using K.L.A.P.D.O.C., what should your FIRST response be after keeping calm?',
    options: [
      'Immediately explain why your prices are justified',
      'Offer a discount to match their expectations',
      'Listen fully, then acknowledge: "I understand — price is a big factor and you need the numbers to work." Then probe: "When you say too high — compared to what you\'re paying now, or compared to what your margin needs?"',
      'Tell them they\'re comparing apples to oranges',
    ],
    bestAnswerIndex: 2,
    explanation:
      'K.L.A.P.D.O.C. requires you to Listen first, then Acknowledge before you Probe. Jumping to defense (explaining prices) or concession (offering discounts) skips the critical steps that help you understand the real issue. The probe question "compared to what?" helps you distinguish between a competitive pricing issue and a margin issue — each requires a different solution.',
  },
  {
    id: 'obj-2',
    scenario:
      'A buyer says: "I need to think about it." You\'ve had a good conversation and presented a strong recommendation. What\'s the best approach?',
    options: [
      'Say "Take your time" and end the call',
      'Push harder — they\'re about to buy and just need more pressure',
      'Acknowledge it\'s a fair decision, then probe: "Absolutely — it\'s smart to think it through. What specifically are you weighing?" This helps surface the unresolved concern.',
      'Offer a big discount to close them right now',
    ],
    bestAnswerIndex: 2,
    explanation:
      '"I need to think about it" almost always means there\'s an unresolved concern they haven\'t voiced. The Probe step surfaces it. Maybe it\'s budget timing, maybe they need to check warehouse space, or maybe they\'re comparing you to another supplier. Once you know the real issue, you can address it specifically. Pushing harder or offering discounts without knowing the real issue wastes leverage.',
  },
  {
    id: 'obj-3',
    scenario:
      'A buyer says: "I already have a supplier I\'m happy with." They seem genuine but agreed to take your call. How do you handle this objection?',
    options: [
      'Accept it and move on — they\'re clearly not interested',
      'Criticize their current supplier to make Via look better',
      'Acknowledge their loyalty, then position Via as a complement: "That\'s great — a good supplier relationship is hard to find. We often work as a second source, especially for categories or volumes your current supplier can\'t always fill. What areas do you ever have trouble sourcing?"',
      'Ignore the objection and keep pitching',
    ],
    bestAnswerIndex: 2,
    explanation:
      'Never trash a competitor — it destroys credibility. Instead, respect the relationship and position Via Trading as a complement, not a replacement. The "second source" framing is low-threat and opens the door. If they agreed to take your call, something is missing from their current setup. Your job is to discover what that is, not to convince them to switch.',
  },
  {
    id: 'obj-4',
    scenario:
      'A buyer has raised a concern about quality ("I\'ve been burned before with condition"). You probe and discover they bought unmanifested returns from another liquidator and 40% of items were unsellable. Using K.L.A.P.D.O.C., you\'ve reached the Define step. What\'s the best way to Define and Overcome?',
    options: [
      '"Our stuff is better quality, trust me"',
      '"So the core issue is that without knowing what you\'re getting upfront, you\'ve had too many unsellable items. Is that right?" If yes: "Here\'s what I\'d suggest — our manifested programs list every item before you buy, so you can review brands, quantities, and retail values. You\'d know exactly what you\'re getting before spending a dollar. Plus you\'re welcome to visit our warehouse and inspect in person."',
      '"That\'s just how liquidation works — you win some, you lose some"',
      'Skip ahead and offer them a free pallet to try',
    ],
    bestAnswerIndex: 1,
    explanation:
      'The Define step restates their specific concern clearly: "without knowing what you\'re getting, too many items were unsellable." The Overcome step uses Features → Benefits → Needs: manifested loads (feature) let you review everything before buying (benefit) so you\'re confident in what you\'re getting (need). The warehouse visit offer adds another layer of confidence. This is a targeted solution, not a generic reassurance.',
  },
]

// ─── Module 8: From Transaction to Partnership ───────────────────
// FillInBlank — "Quick Check: Account Growth"
export const accountGrowthFillBlanks: FillInBlankItem[] = [
  {
    id: 'ag-fib-1',
    sentence: 'The most common volume jump for growing buyers is from individual _____ to full _____.',
    blank: 'pallets… truckloads',
    options: ['cases… pallets', 'pallets… truckloads', 'truckloads… containers', 'items… cases'],
    correctIndex: 1,
  },
  {
    id: 'ag-fib-2',
    sentence: 'When re-engaging a dormant account, the opening should include: "The purpose of this call is not to _____, but to understand how we might work together again."',
    blank: 'sell',
    options: ['sell', 'complain', 'pressure', 'discount'],
    correctIndex: 0,
  },
  {
    id: 'ag-fib-3',
    sentence: 'Expanding a buyer from one product category into additional categories is called _____.',
    blank: 'category expansion',
    options: ['volume ladder', 'category expansion', 'recurring programs', 'cross-selling'],
    correctIndex: 1,
  },
  {
    id: 'ag-fib-4',
    sentence: 'Via Trading\'s _____% repeat business rate is evidence that their relationship-based approach builds lasting partnerships.',
    blank: '90+',
    options: ['50+', '70+', '80+', '90+'],
    correctIndex: 3,
  },
]

// ─── Module 9: Triage & Diagnosis: BDR + AM ─────────────────────
// ScenarioCard — "BDR or AM?"
export const roleScenarios: ScenarioQuestion[] = [
  {
    id: 'role-1',
    scenario:
      'A newly registered buyer calls and asks: "How much does a truckload of Target returns cost?" The person on the phone is a BDR. What should they do?',
    options: [
      'Quote a specific price to keep the buyer engaged',
      'Say "I don\'t know" and hang up',
      'Acknowledge the question, explain that pricing varies by program and load, and let them know their Account Manager will walk them through options that fit their business and budget',
      'Transfer them immediately without any conversation',
    ],
    bestAnswerIndex: 2,
    explanation:
      'BDRs don\'t quote pricing — that\'s the AM\'s role. But they shouldn\'t dismiss the question either. The right move is to validate the question ("Great question — pricing depends on the program and what you\'re looking for"), gather context, and set the expectation that the AM is the right person to discuss specifics. The BDR is a bridge, not a closer.',
  },
  {
    id: 'role-2',
    scenario:
      'An Account Manager receives a warm lead from the BDR. The notes say: "Online seller in Atlanta, eBay, 5 pallets/month, electronics focus, bought from competitor 8 months ago but AM never followed up." The AM\'s first call should:',
    options: [
      'Start from scratch with basic discovery questions as if they know nothing',
      'Reference the BDR notes to show they\'re prepared, validate key details, then go deeper: "I saw you\'re interested in electronics — what categories within that have worked best for you?"',
      'Immediately pitch the most expensive program available',
      'Ask the buyer to re-explain everything they told the BDR',
    ],
    bestAnswerIndex: 1,
    explanation:
      'The AM should never make the buyer repeat themselves. The BDR\'s notes are the patient chart — use them. Referencing what you already know proves you\'re prepared and respect their time. Then go one layer deeper than the BDR did. The buyer told the BDR "electronics" — the AM asks which categories within electronics. That\'s the diagnostic progression from triage to specialist.',
  },
  {
    id: 'role-3',
    scenario:
      'During a BDR call, the buyer shares a detailed story about a bad experience with another liquidator — damaged goods, no support, lost money. The buyer is clearly emotional about it. Should the BDR attempt to resolve this concern fully, or handle it differently?',
    options: [
      'Spend 20 minutes addressing every concern in detail',
      'Cut them off and redirect to the discovery questions',
      'Listen empathetically, acknowledge the frustration, note the details for the AM, and briefly reassure: "I\'m sorry to hear that — that\'s exactly why we assign dedicated Account Managers. Yours will be able to speak to our quality programs and how we handle situations like that."',
      'Promise that Via Trading would never let that happen',
    ],
    bestAnswerIndex: 2,
    explanation:
      'The BDR\'s role is triage, not therapy. Listen fully, acknowledge genuinely, take notes, and bridge to the AM. The buyer needs to feel heard (that\'s the BDR\'s job) and then needs a specialist who can address the concern in depth (that\'s the AM\'s job). Making promises the BDR can\'t back up damages credibility.',
  },
]
