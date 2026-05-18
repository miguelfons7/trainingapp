/**
 * Structured content data for Course 4: Consultative Sales
 * All content sourced from Via Trading's sales training framework.
 */

// ─── Five-Step Consultative Method ───────────────────────────────
export interface ConsultativeStep {
  id: string
  step: number
  title: string
  focus: string
  timeAllocation: string
  role: string
  description: string
  examples: string[]
}

export const fiveSteps: ConsultativeStep[] = [
  {
    id: 'summarize',
    step: 1,
    title: 'Summarize',
    focus: 'Understand their business and needs',
    timeAllocation: '~40%',
    role: 'Ask, listen, confirm',
    description:
      'This is the diagnostic phase. You ask open-ended questions, listen carefully, and summarize what you hear to confirm understanding. The goal is to understand their business, what they sell, who they sell to, what challenges they face, and what they need from a supplier. If you do this step well, everything that follows will feel natural.',
    examples: [
      '"Tell me about your business — how do you usually sell product?"',
      '"What\'s been working well with your current supplier? What hasn\'t?"',
      '"So it sounds like you\'re running a discount store in Phoenix, doing about 3-4 pallets a month, and the main frustration is inconsistent quality from your current broker. Is that right?"',
    ],
  },
  {
    id: 'state-idea',
    step: 2,
    title: 'State the Idea',
    focus: 'Present one clear recommendation',
    timeAllocation: '~10%',
    role: 'Direct suggestion',
    description:
      'Based on your diagnosis, present one clear, tailored recommendation. Not a catalog dump — a specific suggestion that connects directly to what they told you. This is the moment where your expertise becomes visible.',
    examples: [
      '"Based on what you\'re telling me, I think our Target general merchandise program would be a strong fit for your store."',
      '"For what you\'re describing, I\'d recommend starting with a mixed New Overstock pallet — it gives you variety to test what moves."',
    ],
  },
  {
    id: 'explain-how',
    step: 3,
    title: 'Explain How It Works',
    focus: 'Walk through relevant details',
    timeAllocation: '~15%',
    role: 'Practical mechanics',
    description:
      'Walk through the relevant mechanics — only the details that matter to this buyer. A bin store operator needs to know about weekly flow and category mix. An exporter needs to know about container loading and FOB pricing. Don\'t explain everything; explain what\'s relevant.',
    examples: [
      '"You\'d receive a 24-pallet truckload with a manifest ahead of time, and we typically ship within 24 hours."',
      '"Each pallet runs about 200-300 units of mixed general merchandise — housewares, small electronics, toys, seasonal."',
    ],
  },
  {
    id: 'reinforce-benefits',
    step: 4,
    title: 'Reinforce Benefits',
    focus: 'Tie features to their needs',
    timeAllocation: '~15%',
    role: 'Connect to goals',
    description:
      'Connect what you just explained to what they told you in Step 1. This is where the conversation comes full circle. Every benefit you mention should tie back to a need they expressed. If they said consistency matters, show how your program delivers consistency.',
    examples: [
      '"The advantage for you is steady supply without the inconsistency you\'ve had with your broker, and because we\'re direct — no middleman — your per-unit cost should come in significantly lower."',
      '"What that means for your online store is you can list new products every week without worrying about sourcing gaps."',
    ],
  },
  {
    id: 'close',
    step: 5,
    title: 'Close',
    focus: 'Propose next step',
    timeAllocation: '~20%',
    role: 'Make it easy to move forward',
    description:
      'Propose the next step clearly and make it easy to say yes. If the first four steps went well, this should feel like the natural conclusion of the conversation, not a high-pressure moment. The close is the follow-up appointment, not the final verdict.',
    examples: [
      '"Should I pull a manifest for you to review?"',
      '"Would you like to start with one truckload and see how it goes?"',
      '"Let me get this load reserved. What\'s the best shipping address?"',
    ],
  },
]

// ─── Question Types ──────────────────────────────────────────────
export interface QuestionType {
  id: string
  type: string
  definition: string
  whenToUse: string
  examples: string[]
  icon: string
}

export const questionTypes: QuestionType[] = [
  {
    id: 'open',
    type: 'Open Questions',
    definition: 'Invite broad, detailed answers that give the buyer room to share.',
    whenToUse: 'Early in the conversation to understand the big picture. These are your primary diagnostic tool.',
    examples: [
      '"Tell me about your business."',
      '"What\'s working well with your current supplier?"',
      '"What does a typical week look like for you in terms of foot traffic and sell-through?"',
    ],
    icon: 'MessageCircle',
  },
  {
    id: 'closed',
    type: 'Closed Questions',
    definition: 'Elicit specific yes/no or short factual answers.',
    whenToUse: 'To confirm details, narrow down options, or verify what you\'ve heard.',
    examples: [
      '"Are you currently buying truckloads or pallets?"',
      '"Do you have a forklift at your warehouse?"',
      '"Is your store open seven days a week?"',
    ],
    icon: 'CheckCircle',
  },
  {
    id: 'probing',
    type: 'Probing Questions',
    definition: 'Dig deeper into surface-level answers to uncover what really matters.',
    whenToUse: 'When an answer is vague or when you sense there\'s more behind what they\'re saying.',
    examples: [
      '"What kind of quality issues — condition or categories?"',
      '"What does growth look like for you over the next year?"',
      '"When you say the pricing doesn\'t work — compared to what?"',
    ],
    icon: 'Search',
  },
  {
    id: 'leading',
    type: 'Leading Questions',
    definition: 'Guide the buyer toward a realization or conclusion they\'re already close to reaching.',
    whenToUse: 'Sparingly, and only after you\'ve done enough discovery to know the answer yourself. Use to confirm, not manipulate.',
    examples: [
      '"So if you could get consistent supply without the middleman markup, that would free up margin for you?"',
      '"It sounds like having a dedicated contact who knows your business would save you a lot of back-and-forth?"',
    ],
    icon: 'ArrowRight',
  },
]

// ─── Active Listening Rules ──────────────────────────────────────
export interface ListeningRule {
  id: string
  rule: string
  description: string
  example: string
  icon: string
}

export const activeListeningRules: ListeningRule[] = [
  {
    id: 'dont-interrupt',
    rule: 'Don\'t Interrupt',
    description: 'Let them finish completely, even if you already know where they\'re going. Cutting someone off signals that your agenda matters more than theirs.',
    example: 'A buyer starts explaining a problem with their current supplier. Wait for the full story before responding — the last sentence often reveals the real issue.',
    icon: 'Pause',
  },
  {
    id: 'take-notes',
    rule: 'Take Notes',
    description: 'Write down key details: names, numbers, pain points, specific products mentioned. Notes are your patient chart — they allow you to reference specifics later and show the buyer you were paying attention.',
    example: 'When they mention "I usually do about 4 pallets a month," jot it down. Referencing it later ("You mentioned 4 pallets a month…") builds trust.',
    icon: 'PenLine',
  },
  {
    id: 'acknowledge',
    rule: 'Acknowledge Before Moving On',
    description: 'Brief reflection before the next question. This prevents the conversation from feeling like an interrogation. A simple acknowledgment shows you heard them and creates a natural bridge.',
    example: '"That makes sense — consistent supply really is everything when your shelves need to stay full. So tell me more about…"',
    icon: 'ThumbsUp',
  },
  {
    id: 'listen-for-gaps',
    rule: 'Listen for What They Don\'t Say',
    description: 'Gaps in what a buyer shares are often more revealing than what they say out loud. If someone never mentions profitability, they may be struggling. If they keep redirecting to price, margins are tight. If they\'re hesitant about volume, cash flow may be a constraint.',
    example: 'A buyer talks enthusiastically about their business growth but avoids the topic of margins. That silence is a signal — their volume might be growing but profitability isn\'t keeping pace.',
    icon: 'EyeOff',
  },
  {
    id: 'summarize',
    rule: 'Summarize Before Transitioning',
    description: 'Before moving from discovery to your recommendation, summarize what you heard. This creates a natural bridge, confirms your understanding, and makes the buyer feel heard. It also makes your recommendation feel earned, not forced.',
    example: '"So it sounds like you\'re running a discount store in Phoenix, doing about 3-4 pallets a month, and the main frustration is inconsistent quality from your current broker. Is that right?"',
    icon: 'ListChecks',
  },
]

// ─── K.L.A.P.D.O.C. Objection Handling ──────────────────────────
export interface KlapdocStep {
  id: string
  letter: string
  title: string
  description: string
  example: string
}

export const klapdocSteps: KlapdocStep[] = [
  {
    id: 'keep-calm',
    letter: 'K',
    title: 'Keep Calm',
    description: 'Don\'t react negatively. An objection is information, not an attack. Your tone in the first two seconds after hearing an objection sets the trajectory for the rest of the conversation.',
    example: 'Buyer says "Your prices are way too high." Instead of getting defensive, take a breath and respond with genuine curiosity.',
  },
  {
    id: 'listen',
    letter: 'L',
    title: 'Listen',
    description: 'Let them finish completely. Two ears, one mouth — use them in that ratio. The buyer often reveals the real issue in the second or third sentence, not the first.',
    example: 'Let the buyer explain their full concern without jumping in. They might start with price but end up revealing that shipping costs are the real issue.',
  },
  {
    id: 'acknowledge',
    letter: 'A',
    title: 'Acknowledge',
    description: 'Validate their concern before doing anything else. This is not agreeing with them — it\'s showing you heard them and respect their perspective. Without this step, anything you say next will feel dismissive.',
    example: '"I totally understand that concern — price is a big factor, and you need to make sure the numbers work for your business."',
  },
  {
    id: 'probe',
    letter: 'P',
    title: 'Probe',
    description: 'Ask clarifying questions to find the real issue beneath the surface. The stated objection is rarely the root cause. "Too expensive" might mean "I don\'t see the value," or "I can\'t afford the volume you\'re suggesting," or "My current supplier quoted less."',
    example: '"When you say the price is too high — compared to what you\'re paying now, or compared to where you need to be for your margin to work?"',
  },
  {
    id: 'define',
    letter: 'D',
    title: 'Define',
    description: 'Restate the specific, real objection in clear terms. This does two things: it shows the buyer you truly understand, and it gives you a precise target to address rather than a vague complaint.',
    example: '"So the core issue is that at this per-pallet price, your margin after shipping doesn\'t hit the 25% you need. Is that right?"',
  },
  {
    id: 'overcome',
    letter: 'O',
    title: 'Overcome',
    description: 'Address the real, defined objection using the Features → Benefits → Needs framework. Now that you know the actual problem, you can offer a targeted solution rather than a generic pitch.',
    example: '"Here\'s what I\'d suggest — if we moved to truckload instead of individual pallets, your per-unit cost drops significantly. At truckload pricing, you\'d be well within your 25% target."',
  },
  {
    id: 'close',
    letter: 'C',
    title: 'Close',
    description: 'Attempt to move forward after overcoming. Don\'t leave the objection hanging — transition naturally into the next step or the close. If the buyer still has concerns, cycle back to Probe.',
    example: '"Does that address your concern? Great — let me pull up a truckload manifest and we can see what\'s available this week."',
  },
]

// ─── Common Objections Quick Reference ──────────────────────────
export interface CommonObjection {
  id: string
  objection: string
  rootIssue: string
  keyProbe: string
  likelyOvercome: string
}

export const commonObjections: CommonObjection[] = [
  {
    id: 'price-high',
    objection: '"Price is too high"',
    rootIssue: 'Margin pressure',
    keyProbe: '"Compared to what baseline?"',
    likelyOvercome: 'Per-unit economics, volume pricing, no middleman markup',
  },
  {
    id: 'have-supplier',
    objection: '"I already have a supplier"',
    rootIssue: 'Switching cost / loyalty',
    keyProbe: '"What\'s working? What\'s not?"',
    likelyOvercome: 'Position as complement, highlight gaps in their current setup',
  },
  {
    id: 'think-about-it',
    objection: '"I need to think about it"',
    rootIssue: 'Unresolved concern',
    keyProbe: '"What specifically are you weighing?"',
    likelyOvercome: 'Address the real concern, offer a smaller first commitment',
  },
  {
    id: 'quality-concerns',
    objection: '"Quality concerns"',
    rootIssue: 'Past bad experience',
    keyProbe: '"What happened?"',
    likelyOvercome: 'Manifests, warehouse visits, AM relationship, product guarantees',
  },
  {
    id: 'not-right-time',
    objection: '"Not the right time"',
    rootIssue: 'Budget / readiness',
    keyProbe: '"What would make it the right time?"',
    likelyOvercome: 'Smaller start, future follow-up on their timeline',
  },
  {
    id: 'shipping-expensive',
    objection: '"Shipping is too expensive"',
    rootIssue: 'Total cost calculation',
    keyProbe: '"What are you paying now for freight?"',
    likelyOvercome: 'Truckload economics, local pickup, FOB options',
  },
]

// ─── Closing Techniques ──────────────────────────────────────────
export interface ClosingTechnique {
  id: string
  name: string
  description: string
  whenToUse: string
  examples: string[]
  icon: string
}

export const closingTechniques: ClosingTechnique[] = [
  {
    id: 'trial',
    name: 'Trial Close',
    description: 'A soft check to gauge readiness before making the full ask. It tests the water without committing either side.',
    whenToUse: 'Mid-conversation, after presenting your recommendation but before asking for the order.',
    examples: [
      '"How does that sound so far?"',
      '"Is this the kind of thing that would work for your business?"',
    ],
    icon: 'ThermometerSun',
  },
  {
    id: 'summary',
    name: 'Summary Close',
    description: 'Recap the buyer\'s needs, your recommendation, and the key benefits — then ask. This is powerful because it demonstrates you listened and shows a clear thread from their problem to your solution.',
    whenToUse: 'After a thorough discovery conversation where you\'ve identified clear needs.',
    examples: [
      '"So just to pull this together — you\'re a bin store in Dallas needing two truckloads a month of general merchandise, variety and consistent supply are your priorities. Our Target GM program hits all of those. Should I pull a manifest for you to review?"',
    ],
    icon: 'ClipboardList',
  },
  {
    id: 'assumed',
    name: 'Assumed Close',
    description: 'Proceed as if the buyer has already decided to move forward, shifting the conversation to logistics rather than whether to buy.',
    whenToUse: 'When the buyer has given multiple positive signals and the conversation is flowing naturally toward a purchase.',
    examples: [
      '"Great, let me pull up the available manifests. Would you prefer email or should we walk through them together tomorrow?"',
      '"I\'ll get this load reserved. What\'s the best shipping address?"',
    ],
    icon: 'ArrowRightCircle',
  },
  {
    id: 'alternative',
    name: 'Alternative Close',
    description: 'Give two positive options instead of a yes/no question. Both choices move the buyer forward — they\'re just choosing which path.',
    whenToUse: 'When the buyer seems interested but hasn\'t committed. The choice gives them control while keeping momentum.',
    examples: [
      '"Would you rather start with the GM truckload or the electronics pallet?"',
      '"Would you like one truckload first, or lock in two at the volume price?"',
    ],
    icon: 'GitBranch',
  },
  {
    id: 'special',
    name: 'Special Close',
    description: 'Leverage genuine scarcity or a time-limited opportunity. Only use when the urgency is real — manufactured scarcity destroys trust.',
    whenToUse: 'When a specific load or deal genuinely won\'t be available long — not as a pressure tactic.',
    examples: [
      '"We just got in a load from [retailer] that\'s exactly what you described. These tend to move fast — within a day or two. Want me to hold it while you review the manifest?"',
    ],
    icon: 'Clock',
  },
  {
    id: 'fear',
    name: 'Fear Close',
    description: 'Highlight what the buyer loses by not acting. This connects to pain they\'ve already expressed — you\'re reflecting their own words back, not creating new pressure.',
    whenToUse: 'Sparingly. Only when the buyer has explicitly described a pain point that not acting will perpetuate.',
    examples: [
      '"You mentioned your current broker has been unreliable and it\'s costing you sales when shelves are empty. Every week without consistent supply is revenue you\'re not making. Would it make sense to run a test order with us while you evaluate?"',
    ],
    icon: 'AlertTriangle',
  },
]

// ─── Tone Principles ────────────────────────────────────────────
export interface TonePrinciple {
  id: string
  principle: string
  description: string
}

export const tonePrinciples: TonePrinciple[] = [
  {
    id: 'welcoming',
    principle: 'Welcoming',
    description: 'Like a smart, organized colleague who\'s genuinely glad to help. Not overly enthusiastic — warm and natural.',
  },
  {
    id: 'professional',
    principle: 'Professional',
    description: 'Not overly casual, not robotic. Speak with authority but stay approachable. Know your product, know your customer.',
  },
  {
    id: 'low-pressure',
    principle: 'Low-Pressure',
    description: 'Conversational, curious, helpful. You\'re an advisor, not a closer. The buyer should never feel pushed into a corner.',
  },
  {
    id: 'natural',
    principle: 'Natural',
    description: 'Avoid sounding scripted. Make the language your own. Use contractions, speak in short sentences, let the conversation breathe.',
  },
  {
    id: 'confident',
    principle: 'Confident',
    description: 'Know Via\'s offering inside and out. When you don\'t know something, say so and find out — that\'s confidence, not weakness.',
  },
]

// ─── Language Guidance ───────────────────────────────────────────
export interface LanguageGuidance {
  doSay: string
  dontSay: string
  why: string
}

export const languageGuidance: LanguageGuidance[] = [
  {
    doSay: '"Inventory"',
    dontSay: '"Product" (too generic)',
    why: 'Shows industry knowledge and specificity.',
  },
  {
    doSay: '"Purchase," "get," "source," "start with"',
    dontSay: 'Over-using "buy"',
    why: 'Varied language sounds natural and consultative.',
  },
  {
    doSay: '"Account Manager"',
    dontSay: '"Sales rep" or "salesperson"',
    why: 'Positions the role as advisor, not traditional sales.',
  },
  {
    doSay: '"Let me connect you with…"',
    dontSay: '"Let me transfer you to…"',
    why: '"Transfer" sounds bureaucratic; "connect" sounds personal.',
  },
  {
    doSay: '"The right fit for your needs"',
    dontSay: '"Make a sale" (even implied)',
    why: 'Focus on their outcome, not yours.',
  },
  {
    doSay: '"We work with [specific retailers]"',
    dontSay: '"We have everything"',
    why: 'Specificity builds credibility; vague claims don\'t.',
  },
]

// ─── Needs Hierarchy ─────────────────────────────────────────────
export interface NeedsLevel {
  id: string
  level: string
  description: string
  examples: string[]
}

export const needsHierarchy: NeedsLevel[] = [
  {
    id: 'profit',
    level: 'Profit',
    description: 'The ultimate driver. Every buyer is in business to make money. Everything else supports this goal.',
    examples: ['Revenue growth', 'Cost reduction', 'Return on investment'],
  },
  {
    id: 'margin',
    level: 'Margin',
    description: 'Maximize per-unit profit. Buyers focused on margin want the best possible cost basis to maximize what they earn on each item sold.',
    examples: ['Per-unit cost', 'Pricing power', 'Category selection for highest margins'],
  },
  {
    id: 'volume',
    level: 'Volume',
    description: 'Maximize throughput. Buyers focused on volume want consistent, large quantities they can move quickly, even at thinner margins.',
    examples: ['Consistent supply', 'Large lot sizes', 'Fast inventory turns'],
  },
  {
    id: 'business-drivers',
    level: 'Business Drivers',
    description: 'Operational realities that shape how they buy: storage capacity, cash flow, logistics capabilities, and team size.',
    examples: ['Warehouse space', 'Available capital', 'Shipping/receiving capability', 'Staff to process inventory'],
  },
  {
    id: 'personal-drivers',
    level: 'Personal Drivers',
    description: 'Individual factors that influence decisions: risk tolerance, ambition level, time availability, and personal obligations.',
    examples: ['Risk comfort level', 'Growth ambition', 'Time commitment', 'Family obligations'],
  },
]

// ─── Features → Benefits → Needs Examples ────────────────────────
export interface FeatureBenefitNeed {
  id: string
  feature: string
  benefit: string
  need: string
}

export const featureBenefitNeeds: FeatureBenefitNeed[] = [
  {
    id: 'direct-contracts',
    feature: 'Via Trading has direct contracts with Fortune 100 retailers',
    benefit: 'Lower per-unit cost with no middleman markup',
    need: 'Stronger margins for reselling',
  },
  {
    id: 'dedicated-am',
    feature: 'Every buyer gets a dedicated Account Manager',
    benefit: 'One person who knows your business, your preferences, and your history',
    need: 'Consistent, reliable sourcing without starting over every call',
  },
  {
    id: 'open-warehouse',
    feature: 'Via Trading\'s warehouse is open to the public Monday through Friday',
    benefit: 'Inspect merchandise in person before purchasing',
    need: 'Confidence in what you\'re buying, reduced risk',
  },
  {
    id: 'manifested-loads',
    feature: 'Manifested loads include a detailed item list before purchase',
    benefit: 'You know exactly what you\'re getting — brands, quantities, retail values',
    need: 'Predictable inventory for planning and pricing',
  },
  {
    id: 'next-day-shipping',
    feature: '95% of orders ship within 24 hours',
    benefit: 'Inventory arrives fast, keeping your shelves stocked or listings active',
    need: 'Minimal downtime between orders and revenue',
  },
]

// ─── Account Growth Strategies ───────────────────────────────────
export interface GrowthStrategy {
  id: string
  title: string
  description: string
  example: string
  icon: string
}

export const growthStrategies: GrowthStrategy[] = [
  {
    id: 'volume-ladder',
    title: 'Move Up the Volume Ladder',
    description: 'Help buyers progress from smaller to larger purchases as trust grows and the economics become clear. Pallets to truckloads is the most common jump, and the savings are significant.',
    example: '"You\'ve been doing 4-5 pallets a month consistently. At that rate, a truckload saves you about $X per pallet because you\'re eliminating the per-pallet shipping premium. Want me to run the numbers?"',
    icon: 'TrendingUp',
  },
  {
    id: 'category-expansion',
    title: 'Expand Categories',
    description: 'Once you understand what a buyer sells and how they sell it, suggest adjacent categories that fit their business model. Use your knowledge of what performs well for similar buyers.',
    example: '"I know electronics have been your bread and butter, but we just got in kitchen and home goods returns that are doing really well for online sellers like you. Want me to send you a manifest to look at?"',
    icon: 'Layers',
  },
  {
    id: 'recurring-programs',
    title: 'Create Recurring Programs',
    description: 'Once you understand a buyer\'s purchasing cycle, propose a regular schedule. This builds predictability for both sides and ensures they don\'t go to a competitor when they need to restock.',
    example: '"You\'ve been ordering about every three weeks. Would it help if I started earmarking loads for you on that schedule? That way you\'d always have first pick."',
    icon: 'RefreshCw',
  },
]

// ─── Dormant Account Responses ───────────────────────────────────
export interface DormantResponse {
  id: string
  buyerSays: string
  approach: string
}

export const dormantResponses: DormantResponse[] = [
  {
    id: 'am-doesnt-call',
    buyerSays: '"My AM doesn\'t call me"',
    approach: 'Acknowledge the gap, ask about their current situation, re-qualify their needs, and position yourself as their fresh start.',
  },
  {
    id: 'wrong-products',
    buyerSays: '"You don\'t have the right products"',
    approach: 'Ask which categories they need. Inventory changes constantly — what wasn\'t available six months ago might be in stock today.',
  },
  {
    id: 'shipping-slow',
    buyerSays: '"Shipping took too long"',
    approach: 'Discuss current timelines (95% next-day), ask about their location, and explore pickup options if they\'re local.',
  },
  {
    id: 'freight-expensive',
    buyerSays: '"Freight is too expensive"',
    approach: 'Discuss truckload economics vs. pallet shipping, explore FOB options, and calculate the total delivered cost to show the real picture.',
  },
  {
    id: 'not-in-business',
    buyerSays: '"I\'m not in business anymore"',
    approach: 'Ask if they plan to restart. If yes, keep the door open. If no, thank them warmly and close the file.',
  },
]
