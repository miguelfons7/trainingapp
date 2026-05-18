/**
 * Structured content data for Course 5: BDR Role Training
 * All content sourced from Via Trading's BDR training framework.
 */


// ─── BDR Role Boundaries ────────────────────────────────────────

export const bdrResponsibilities: { do: string[]; dont: string[] } = {
  do: [
    'Welcome newly registered contacts and compiled leads',
    'Ask discovery questions to understand the buyer\'s business',
    'Qualify based on business type, volume, and timing',
    'Route to the right Account Manager with complete context notes',
    'Document everything in HubSpot for the AM',
    'Follow up with AMs to confirm they connected with routed leads',
    'Follow up with prospects who did not answer',
    'Re-engage dormant accounts using the BDR Qualifying Re-Engage playbook',
  ],
  dont: [
    'Close deals or negotiate pricing',
    'Quote specific prices or freight costs',
    'Promise specific inventory or availability',
    'Provide deep product education beyond basic awareness',
    'Handle complex objections in detail — route these to the AM',
    'Make commitments about timelines, discounts, or special arrangements',
  ],
}

// ─── Discovery Questions ────────────────────────────────────────

export interface DiscoveryQuestion {
  id: string
  number: number
  question: string
  goal: string
  followUps: string[]
  listenFor: string[]
}

export const discoveryQuestions: DiscoveryQuestion[] = [
  {
    id: 'dq-1',
    number: 1,
    question: 'Can you tell me a little about your business and how you usually sell product?',
    goal: 'Understand their business type and sales channels so the AM knows who they are talking to.',
    followUps: [
      'What platforms do you sell on?',
      'Do you have a physical store or is it mostly online?',
      'How long have you been in business?',
    ],
    listenFor: [
      'Business type: online seller, brick-and-mortar, exporter, bin store, flea market',
      'Sales channels: eBay, Amazon, Shopify, in-store, export market',
      'Scale indicators: solo operation vs. team, one location vs. multiple',
    ],
  },
  {
    id: 'dq-2',
    number: 2,
    question: 'What type of inventory are you most interested in right now?',
    goal: 'Identify their category focus so the AM can recommend the right programs.',
    followUps: [
      'Are you open to other categories or pretty focused on that?',
      'What categories have worked best for you in the past?',
      'Is there anything you specifically want to avoid?',
    ],
    listenFor: [
      'Specific categories: electronics, general merchandise, apparel, home goods',
      'Retailer preferences: mentions of Target, Walmart, Amazon by name',
      'Openness to variety vs. narrow focus',
    ],
  },
  {
    id: 'dq-3',
    number: 3,
    question: 'Have you worked with liquidation or wholesale inventory before?',
    goal: 'Gauge their experience level so the AM can adjust their approach accordingly.',
    followUps: [
      'What company were you working with?',
      'What went well? What didn\'t?',
      'How long ago was that?',
    ],
    listenFor: [
      'Experience level: brand new, some experience, very experienced',
      'Past supplier names — competitor intelligence for the AM',
      'Pain points from previous experiences: quality issues, communication gaps, pricing frustration',
    ],
  },
  {
    id: 'dq-4',
    number: 4,
    question: 'Are you usually looking for truckloads, pallets, or smaller lots?',
    goal: 'Understand their volume capacity so the AM can recommend appropriately sized orders.',
    followUps: [
      'How often do you typically restock?',
      'Do you have warehouse space or are you working out of a smaller setup?',
      'Do you have a forklift or dock for receiving?',
    ],
    listenFor: [
      'Volume preference: truckload, pallet, case-level',
      'Storage and logistics capacity',
      'Frequency: weekly, monthly, occasional',
    ],
  },
  {
    id: 'dq-5',
    number: 5,
    question: 'Are you looking to purchase in the near term, or are you mostly exploring for now?',
    goal: 'Assess timing and urgency so the AM can prioritize appropriately.',
    followUps: [
      'Is there a specific timeline you\'re working toward?',
      'Are you waiting on anything before you\'re ready to move forward?',
    ],
    listenFor: [
      'Timing: ready now, weeks, months, just exploring',
      'Urgency triggers: new store opening, seasonal demand, running low on stock',
      'Blockers: budget timing, space availability, partner approval',
    ],
  },
  {
    id: 'dq-6',
    number: 6,
    question: 'Where is your business based?',
    goal: 'Capture location for shipping logistics and AM territory assignment.',
    followUps: [
      'Are you close enough to visit our warehouse in person?',
      'Do you usually arrange your own freight or need shipping?',
    ],
    listenFor: [
      'City, state, and country for logistics planning',
      'Proximity to Via Trading\'s warehouse (local pickup potential)',
      'International vs. domestic — export buyers need different handling',
    ],
  },
  {
    id: 'dq-7',
    number: 7,
    question: 'Is there anything else you\'d want your Account Manager to know before they reach out?',
    goal: 'Capture anything the structured questions missed and signal the upcoming handoff.',
    followUps: [
      'What\'s the best way for them to reach you — phone, email, or WhatsApp?',
      'Is there a best time to call?',
    ],
    listenFor: [
      'Preferred communication method and best times',
      'Additional context: budget constraints, special requirements, concerns',
      'Questions they want the AM to address',
    ],
  },
]

// ─── Common BDR Objections ──────────────────────────────────────

export interface BdrObjection {
  id: string
  objection: string
  whyTheyAsk: string
  response: string
  doNot: string
}

export const bdrObjections: BdrObjection[] = [
  {
    id: 'obj-minimum',
    objection: 'What\'s the minimum order?',
    whyTheyAsk: 'They\'re trying to gauge whether they can afford to start, or whether Via Trading works at their scale.',
    response: 'Great question — it depends on the program and what you\'re looking for. Your Account Manager will walk you through options that fit your budget and volume. Let me make sure I get you connected with the right person.',
    doNot: 'Don\'t give specific minimums or dollar amounts. Program structures vary and the AM needs to match the right option to the buyer\'s situation.',
  },
  {
    id: 'obj-cost',
    objection: 'How much does it cost?',
    whyTheyAsk: 'Price is naturally top of mind. They want to know if Via Trading is within their range before investing more time.',
    response: 'I totally understand — pricing varies based on the program, category, and volume. That\'s exactly what your Account Manager will go over with you. They\'ll find something that works within your numbers. Let me get a few more details so I can connect you with the right person.',
    doNot: 'Don\'t quote prices, price ranges, or per-pallet estimates. Pricing depends on too many variables and an incorrect number sets the wrong expectation.',
  },
  {
    id: 'obj-order-now',
    objection: 'Can I just order something now?',
    whyTheyAsk: 'They\'re enthusiastic and ready to buy. This is a great sign, but the BDR isn\'t the right person to process an order.',
    response: 'I love that you\'re ready to go — that\'s great! Let me get you connected with your Account Manager right away. They\'ll walk you through what\'s available and help you get set up. Just a couple of quick questions so they\'re prepared when they call you.',
    doNot: 'Don\'t slow down their momentum with too many questions. Acknowledge the enthusiasm, gather essential discovery info quickly, and route to the AM as a priority.',
  },
  {
    id: 'obj-robot',
    objection: 'Are you a robot?',
    whyTheyAsk: 'They\'ve had bad experiences with automated systems or want to know they\'re talking to a real person who can actually help.',
    response: 'Ha — I\'m real! My name is [your name] and I\'m part of the team here at Via Trading. I\'m the first person you\'ll talk to, and my job is to learn a little about your business so I can connect you with the right Account Manager. How can I help you today?',
    doNot: 'Don\'t get thrown off or defensive. Keep it light and human. If using AI-assisted tools, be honest about it while emphasizing there\'s a real team behind the process.',
  },
  {
    id: 'obj-supplier',
    objection: 'I already have a supplier.',
    whyTheyAsk: 'They may be loyal to their current source, or they\'re signaling they don\'t need to be sold to. But they registered or took the call for a reason.',
    response: 'That\'s great — having a good supplier relationship is important. A lot of our buyers actually work with us as a second source, especially for categories or volumes their main supplier can\'t always cover. Can I ask what kind of inventory you usually source? That way if there\'s ever a fit, your Account Manager will know exactly what to offer.',
    doNot: 'Don\'t criticize their current supplier or position Via Trading as a replacement. Frame Via as a complement. If they took the call, something is missing — your job is to discover what that is.',
  },
]

// ─── Intent Signals ─────────────────────────────────────────────

export interface IntentSignal {
  level: 'strong' | 'medium' | 'exploratory'
  signals: string[]
  action: string
}

export const intentSignals: IntentSignal[] = [
  {
    level: 'strong',
    signals: [
      '"I\'m ready to buy this month"',
      '"How do I place an order?"',
      '"I need inventory for my new store opening"',
      '"Can I come pick up a load this week?"',
      'Asks about payment methods or shipping logistics',
    ],
    action: 'Move toward handoff quickly. Complete essential discovery questions, confirm contact info, and route to the AM as a priority. Don\'t slow down their momentum with unnecessary questions.',
  },
  {
    level: 'medium',
    signals: [
      '"Interested but still figuring out my plan"',
      '"Maybe in 2-3 months once I get my space set up"',
      '"I\'m comparing a few suppliers right now"',
      '"I want to understand my options first"',
      'Asks detailed questions about programs or categories',
    ],
    action: 'Complete the full discovery framework. These buyers need education and trust-building from the AM. Route with detailed notes about their timeline and what they\'re evaluating.',
  },
  {
    level: 'exploratory',
    signals: [
      '"Just exploring the liquidation industry"',
      '"Maybe someday — I\'m still in the research phase"',
      '"I registered to see what you guys do"',
      '"Not sure this is right for me yet"',
      'Vague answers to most discovery questions',
    ],
    action: 'Still route to an AM, but tag the contact as "exploratory" in your notes. Complete whatever discovery you can. These leads may convert later, so document what you learned for future follow-up.',
  },
]

// ─── Tone Principles ────────────────────────────────────────────

export interface TonePrinciple {
  id: string
  principle: string
  description: string
}

export const bdrTonePrinciples: TonePrinciple[] = [
  {
    id: 'welcoming',
    principle: 'Welcoming',
    description: 'You\'re the first voice a new buyer hears from Via Trading. Be warm, genuine, and make them feel like they made a good decision by reaching out. First impressions set the tone for the entire relationship.',
  },
  {
    id: 'professional',
    principle: 'Professional',
    description: 'Not overly casual, not robotic. Speak with clarity and purpose. You represent Via Trading before the buyer ever meets their AM, so your professionalism shapes their expectations.',
  },
  {
    id: 'low-pressure',
    principle: 'Low-Pressure',
    description: 'You\'re not closing a deal — you\'re opening a relationship. Keep it conversational and curious. The buyer should feel guided, not pushed. Your job is to learn about them, not sell to them.',
  },
  {
    id: 'natural',
    principle: 'Natural',
    description: 'Avoid sounding scripted even when using a playbook. Make the language your own. Use contractions, speak in short sentences, and let the conversation breathe. Real people don\'t talk in bullet points.',
  },
  {
    id: 'confident',
    principle: 'Confident',
    description: 'Know Via Trading\'s general offering and your role in the process. When you don\'t know something, it\'s perfectly fine to say "That\'s a great question — your Account Manager will be the best person to answer that in detail."',
  },
]

// ─── Language Dos and Don'ts ────────────────────────────────────

export interface LanguageGuidance {
  doSay: string
  dontSay: string
  why: string
}

export const bdrLanguageGuidance: LanguageGuidance[] = [
  {
    doSay: '"Inventory"',
    dontSay: '"Product" (too generic)',
    why: 'Shows industry knowledge and specificity. "Inventory" is how the liquidation world talks.',
  },
  {
    doSay: '"Account Manager"',
    dontSay: '"Sales rep" or "salesperson"',
    why: 'Positions the role as advisor, not traditional sales. It sets the buyer\'s expectations for a consultative relationship.',
  },
  {
    doSay: '"Let me connect you with..."',
    dontSay: '"Let me transfer you to..."',
    why: '"Transfer" sounds bureaucratic and impersonal. "Connect" sounds like you\'re introducing them to someone who will help.',
  },
  {
    doSay: '"Purchase," "source," "start with"',
    dontSay: 'Over-using "buy"',
    why: 'Varied language sounds natural and consultative. "Start with" is especially good for new buyers — it implies a beginning, not a one-time transaction.',
  },
  {
    doSay: '"The right fit for your needs"',
    dontSay: '"Make a sale" (even implied)',
    why: 'Focus on their outcome, not yours. The buyer should feel you\'re solving their problem, not hitting a quota.',
  },
  {
    doSay: '"We work with [specific retailers]"',
    dontSay: '"We have everything"',
    why: 'Specificity builds credibility. Vague claims sound like every other company. Naming specific programs shows you know the business.',
  },
]

// ─── Daily Workflow Steps ───────────────────────────────────────

export interface WorkflowStep {
  id: string
  time: string
  title: string
  description: string
  icon: string
  details: string[]
}

export const dailyWorkflowSteps: WorkflowStep[] = [
  {
    id: 'review-prep',
    time: '8:30 AM',
    title: 'Review & Prep',
    description: 'Start your day by getting organized. Know who you\'re calling and why before you pick up the phone.',
    icon: 'ClipboardList',
    details: [
      'Check HubSpot for new registrations that came in overnight',
      'Review your lead queue and prioritize by intent level',
      'Prep your call list — strongest signals first',
      'Check for any AM follow-up requests or notes from yesterday',
    ],
  },
  {
    id: 'first-call-block',
    time: '9:00 AM',
    title: 'First Call Block',
    description: 'Your most productive calling window. Focus on the highest-priority leads while your energy is fresh.',
    icon: 'Phone',
    details: [
      'Work through highest-priority leads: strong intent signals, recent registrations',
      'Use the appropriate HubSpot playbook for each call type',
      'Follow the discovery framework — one question at a time',
      'Take notes during the call, not after',
    ],
  },
  {
    id: 'documentation-routing',
    time: '10:30 AM',
    title: 'Documentation & Routing',
    description: 'Pause calling to properly document and route the leads you just spoke with.',
    icon: 'FileText',
    details: [
      'Complete call notes in HubSpot for every conversation',
      'Fill in all discovery fields while details are fresh',
      'Route qualified leads to the right AM with context notes',
      'Flag any leads that need special attention or follow-up',
    ],
  },
  {
    id: 'follow-up-block',
    time: '11:00 AM',
    title: 'Follow-Up Block',
    description: 'Circle back on yesterday\'s work. Follow up on no-answers and check that AMs connected with routed leads.',
    icon: 'RotateCcw',
    details: [
      'Call no-answers from yesterday — try again at a different time',
      'Check HubSpot to see if AMs connected with the leads you routed',
      'If an AM hasn\'t reached out, follow up with them directly',
      'Send WhatsApp or email follow-ups to prospects who didn\'t pick up',
    ],
  },
  {
    id: 'midday-break',
    time: '12:00 PM',
    title: 'Midday Break',
    description: 'Step away and recharge. Calling takes energy, and your afternoon performance depends on a real break.',
    icon: 'Coffee',
    details: [
      'Take a full break away from your desk',
      'Don\'t work through lunch — your call quality drops without rest',
    ],
  },
  {
    id: 'second-call-block',
    time: '1:00 PM',
    title: 'Second Call Block',
    description: 'Afternoon calling. Continue through the lead queue and tackle re-engagement calls for dormant accounts.',
    icon: 'PhoneOutgoing',
    details: [
      'Continue through the lead queue from this morning',
      'Re-engagement calls for dormant accounts using the BDR Qualifying Re-Engage playbook',
      'Try reaching morning no-answers again — different time can make a difference',
      'Log calls and notes as you go',
    ],
  },
  {
    id: 'admin-wrap-up',
    time: '3:00 PM',
    title: 'Admin & Wrap-Up',
    description: 'Final documentation pass and preparation for tomorrow.',
    icon: 'CheckSquare',
    details: [
      'Final documentation pass — make sure every call from today is logged',
      'Update any incomplete HubSpot notes or discovery fields',
      'Prepare tomorrow\'s call list based on today\'s no-answers and new leads',
      'Review which leads were routed and to whom',
    ],
  },
  {
    id: 'team-sync',
    time: '4:00 PM',
    title: 'Team Sync',
    description: 'Quick check-in with the Sales Director and AM team. This is where you improve.',
    icon: 'Users',
    details: [
      'Quick check-in with Sales Director or AM team',
      'Discuss handoff quality — are AMs getting what they need from your notes?',
      'Ask for feedback on any leads that didn\'t convert after routing',
      'Surface any patterns you\'re seeing: common objections, buyer trends, process questions',
    ],
  },
]

// ─── HubSpot Playbook Summaries ─────────────────────────────────

export interface PlaybookSummary {
  id: string
  name: string
  purpose: string
  whenToUse: string
  keyQuestions: string[]
}

export const hubspotPlaybooks: PlaybookSummary[] = [
  {
    id: 'general',
    name: 'General (Initial Qualification)',
    purpose: 'Primary discovery playbook for first contact with new registrants. Covers all 7 discovery questions in a structured flow.',
    whenToUse: 'First call with a newly registered buyer or a fresh compiled lead.',
    keyQuestions: [
      'What does your business look like?',
      'What inventory are you interested in?',
      'Have you worked with liquidation before?',
      'What volume are you looking for?',
      'What\'s your timeline?',
      'Where are you based?',
      'Anything else for your AM?',
    ],
  },
  {
    id: 'product-questions',
    name: 'Product Questions',
    purpose: 'Deep-dive playbook for buyers who come back with specific product or program questions. Focuses on capability and fit rather than basic discovery.',
    whenToUse: 'Second or third call, or when a buyer calls back asking detailed questions about specific programs or categories.',
    keyQuestions: [
      'What specific categories or programs are you asking about?',
      'What\'s your current sourcing setup?',
      'What volume and frequency do you need?',
      'Do you have receiving capabilities (forklift, dock)?',
      'What\'s your budget range per order?',
    ],
  },
  {
    id: 'initial-identification',
    name: 'Initial & Identification',
    purpose: 'Operational deep-dive for routing decisions. Helps identify the right AM based on buyer profile, location, and needs.',
    whenToUse: 'When you need more detail to make a confident routing decision, or when the initial call didn\'t capture enough context.',
    keyQuestions: [
      'What\'s your business name and location?',
      'How do you primarily sell — online, in-store, or export?',
      'What\'s your monthly purchasing capacity?',
      'Are you comparing multiple suppliers right now?',
      'What would make this partnership work for you?',
    ],
  },
  {
    id: 'bdr-reengagement',
    name: 'BDR Qualifying Re-Engage',
    purpose: 'Structured re-engagement playbook for dormant accounts. Designed to requalify buyers who registered or purchased in the past but went inactive.',
    whenToUse: 'When calling a contact who hasn\'t been active in 60+ days, or a previously registered buyer who never converted.',
    keyQuestions: [
      'Are you still in the liquidation business?',
      'What\'s changed since we last spoke?',
      'What are you currently sourcing, and from where?',
      'Is there anything that didn\'t work for you before that we should know about?',
      'Would it make sense to reconnect you with an Account Manager to explore what\'s new?',
    ],
  },
]

// ─── Post-Call Documentation ────────────────────────────────────

export const callNoteFields: string[] = [
  'Caller',
  'Company',
  'Business Type',
  'How They Sell',
  'Inventory Interest',
  'Experience Level',
  'Volume Preference',
  'Timing',
  'Location',
  'Key Notes',
  'Next Step',
  'Date/Time',
]

export const callNoteTemplate: string = `**Caller:** [Name]
**Company:** [Company]
**Business Type:** [Online seller / Store owner / Exporter / Other]
**How They Sell:** [Platform / In-store / Export market]
**Inventory Interest:** [Category/categories]
**Experience Level:** [New / Some experience / Very experienced]
**Volume Preference:** [Truckload / Pallet / Case / Exploring]
**Timing:** [Weeks / Months / Exploring]
**Location:** [City/State]
**Key Notes:** [Anything special the AM should know]
**Next Step:** [Assign to AM: Name]
**Date/Time:** [When called]`
