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
      'They are confident in their margins and are focused on scaling operations as fast as possible',
      'Their volume is growing but profitability may not be keeping pace with the expansion',
      'They are testing whether you will bring up margins first to see how consultative you are',
      'They are prioritizing market share over margin right now and plan to optimize costs later',
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
      'They are methodically building a cost comparison spreadsheet against another supplier',
      'They are testing your pricing knowledge to gauge how experienced you are as a rep',
      'Their margins are tight and every dollar matters to their current business model',
      'They have a fixed budget for this quarter and want to maximize what they can get',
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
      'They are satisfied overall but are doing routine due diligence to benchmark their current deal',
      'They are preparing to switch and are gathering the information they need to justify it internally',
      'They have unmet needs their current supplier isn\'t filling, even if they haven\'t admitted it yet',
      'They are researching additional suppliers to have backup options in case their main source has issues',
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
    options: ['benefit to a need', 'feature to a benefit', 'need to a close', 'feature to a need'],
    correctIndex: 1,
  },
  {
    id: 'bn-fib-4',
    sentence: 'Business drivers like storage capacity, cash flow, and team size shape _____ a buyer purchases, while personal drivers like risk tolerance shape _____ they make decisions.',
    blank: 'how… how',
    options: ['what… why', 'how… how', 'where… when', 'what… how'],
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
      'Step 2: State the Idea — the AM is framing a tailored recommendation based on the buyer\'s profile',
      'Step 1: Summarize — the AM is reflecting back what the buyer shared to confirm understanding',
      'Step 4: Reinforce Benefits — the AM is connecting the buyer\'s needs to specific advantages',
      'Step 5: Close — the AM is confirming details before asking the buyer to commit',
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
      'Step 1: Summarize — the AM is reflecting key points the buyer shared about their situation',
      'Step 3: Explain How It Works — the AM is describing Via Trading\'s supply chain and pricing model',
      'Step 4: Reinforce Benefits — the AM is tying Via Trading\'s strengths to the buyer\'s stated needs',
      'Step 5: Close — the AM is making a final value statement before asking for the commitment',
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
      'They spent too long on Step 1 and didn\'t leave enough time for the buyer to ask follow-up questions',
      'They skipped Steps 1-2 and jumped straight to Step 3, turning a consultative call into a product dump',
      'They covered the right material but should have closed with a specific recommendation at the end',
      'They explained the programs in the wrong order and should have led with the most relevant one first',
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
      'Walk them through your pricing structure and explain why it reflects the quality and consistency they\'d be getting compared to unmanifested alternatives',
      'Offer to adjust the pricing or find a lower-cost program that fits their budget, showing flexibility and willingness to work with them',
      'Acknowledge the concern first, then probe to understand what they\'re comparing against: "I hear you — price has to work. When you say too high, is that versus what you pay now or what your margin needs?"',
      'Redirect the conversation to value by highlighting the total cost of ownership including shipping, manifests, and return rates versus cheaper competitors',
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
      'Respect their process and schedule a follow-up call for next week, giving them space to review the information and make a decision on their own timeline',
      'Reinforce the key benefits one more time and remind them of the specific program you recommended, making sure the value is clear before you wrap up the call',
      'Acknowledge the need to think it over, then probe to surface the specific concern: "That makes sense. What part are you weighing most — the timing, the investment, or something else?"',
      'Offer a limited-time incentive like free shipping on their first order to create a reason for them to move forward today rather than waiting',
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
      'Respect the relationship but share a few specific ways Via Trading outperforms most competitors, like manifested loads and direct retailer sourcing, to plant a seed for the future',
      'Ask them directly what their supplier does well and where the gaps are, since every supplier has weaknesses and you want to identify where Via Trading can step in',
      'Acknowledge the loyalty and position Via as a complement rather than a replacement: "That\'s great. We often work as a second source for categories or volumes your main supplier can\'t always cover."',
      'Thank them for their time, send a follow-up email with your product catalog and pricing, and let them know you\'re available whenever they want to explore additional options',
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
      'Share testimonials from similar buyers who had the same concern and now purchase regularly, reinforcing that many customers switched from unmanifested sources and saw major improvements in sellable rates',
      'Restate the core issue — too many unsellable items from blind buys — then show how manifested programs solve it: they can review every item, brand, and retail value before purchasing, plus visit the warehouse to inspect in person',
      'Offer to send them a sample pallet at a reduced price so they can evaluate the quality firsthand before committing to a larger order, reducing their risk while building confidence',
      'Explain how Via Trading\'s direct retailer relationships result in higher-quality inventory overall, and walk them through the grading and sorting process that happens before loads are listed for sale',
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
    options: ['sell', 'pitch', 'close', 'convince'],
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
      'Give a general price range based on what they know about Target loads, keeping the buyer engaged while they gather basic discovery information',
      'Explain that pricing depends on the specific program and load, and ask a few discovery questions so the AM can come prepared with the right options',
      'Acknowledge the question, explain that pricing varies by program and load, and let them know their Account Manager will walk through options that fit their business',
      'Gather the buyer\'s contact details and business info first, then look up current Target pricing in the system to give them an accurate quote before the AM call',
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
      'Open with fresh discovery questions to form their own assessment of the buyer\'s needs, rather than relying on secondhand notes that may be incomplete',
      'Reference the BDR notes to show they\'re prepared, validate key details, then go deeper: "I saw you\'re interested in electronics — what categories have worked best for you?"',
      'Lead with Via Trading\'s electronics programs and let the buyer react, using their responses to gauge fit before going into detailed discovery questions',
      'Confirm the BDR\'s notes are accurate by reading them back to the buyer, then ask what else they\'d like to share before making a recommendation',
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
      'Address the concern directly by explaining Via Trading\'s quality controls and return policies in detail, since the buyer needs reassurance before they\'ll be open to next steps',
      'Acknowledge the frustration briefly and pivot back to the discovery questions, since staying on topic ensures you gather the information the AM needs for the handoff',
      'Listen fully, acknowledge the frustration, note the specifics for the AM, and bridge by letting them know their dedicated Account Manager can speak to quality programs in depth',
      'Ask follow-up questions about what happened to fully understand the situation, then document everything so the AM has a complete picture of the buyer\'s past experience',
    ],
    bestAnswerIndex: 2,
    explanation:
      'The BDR\'s role is triage, not therapy. Listen fully, acknowledge genuinely, take notes, and bridge to the AM. The buyer needs to feel heard (that\'s the BDR\'s job) and then needs a specialist who can address the concern in depth (that\'s the AM\'s job). Making promises the BDR can\'t back up damages credibility.',
  },
]
