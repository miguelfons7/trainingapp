import type { ScenarioQuestion, FillInBlankItem } from '../../../types'

/**
 * Inline exercises for Course 5: BDR Role Training
 * 4 exercise datasets spread across 4 of 7 lesson modules.
 */

// ─── Module 1: Your Role as a BDR ──────────────────────────────
// ScenarioCard — "BDR or Not BDR?"
export const roleBoundaryScenarios: ScenarioQuestion[] = [
  {
    id: 'bdr-role-1',
    scenario:
      'A buyer calls and asks: "What\'s a truckload of Target returns cost?" You\'re a BDR. What should you do?',
    options: [
      'Give them a general price range you\'ve heard AMs quote before, and let them know the exact number will depend on what program they go with',
      'Ask them what their budget is first so you can narrow down which programs to mention, then share the pricing details that fit their range',
      'Acknowledge the question, explain that pricing depends on the program and their needs, and let them know the AM will walk them through options that fit their budget',
      'Pull up the current Target inventory list and walk them through what\'s available so they have context before the AM follows up with pricing',
    ],
    bestAnswerIndex: 2,
    explanation:
      'BDRs don\'t quote pricing — that\'s the AM\'s role. But you should never dismiss the question. Acknowledge it, set the expectation that the AM handles specifics, and use it as a bridge into your discovery questions. You\'re building trust, not gatekeeping.',
  },
  {
    id: 'bdr-role-2',
    scenario:
      'A new registrant calls and says: "I just signed up — what do you guys sell?" This is their first interaction with Via Trading. What should you do?',
    options: [
      'Walk them through Via Trading\'s top programs one by one so they understand the full range of inventory available and can tell the AM what interests them most',
      'Welcome them, give a brief one-sentence overview of Via Trading, and pivot to asking about their business so you can connect them with the right Account Manager',
      'Send them the product catalog via email and let them know an Account Manager will follow up once they\'ve had time to review the options on their own',
      'Ask them what product categories they\'re interested in, then explain those specific programs in detail so the call is efficient and they feel informed',
    ],
    bestAnswerIndex: 1,
    explanation:
      'This is a perfect BDR moment. Welcome them warmly, give a one-sentence overview, and pivot to discovery. Your job isn\'t to educate them on every program — it\'s to learn about their business so the AM can tailor the conversation. First impressions matter.',
  },
  {
    id: 'bdr-role-3',
    scenario:
      'A buyer says: "I want to place an order for 3 pallets right now." They\'re clearly ready to buy. What should you do as a BDR?',
    options: [
      'Start the order process by confirming what product categories they want, then pass the details to the AM so they can finalize and close the sale quickly',
      'Match their energy, grab essential info quickly, and connect them with their Account Manager right away so the AM can get them set up while they\'re ready to move',
      'Complete the full discovery framework first since even high-intent buyers benefit from having the AM receive a thorough profile before the handoff call',
      'Confirm their contact info and let them know the AM will call back within 24 hours with program options, product availability, and pricing details',
    ],
    bestAnswerIndex: 1,
    explanation:
      'A strong-intent buyer is the best kind of lead. Don\'t slow them down with a full discovery session, and definitely don\'t try to handle the order yourself. Match their energy, gather essential info quickly, and get them to the AM fast. Speed matters here.',
  },
  {
    id: 'bdr-role-4',
    scenario:
      'A buyer asks: "Can you tell me more about your shipping options and freight costs?" What\'s the right BDR move?',
    options: [
      'Share what you know about general shipping options like LTL and full truckload, then let them know the AM will give exact freight quotes based on their specific order',
      'Let them know you\'ll have the AM send over a detailed shipping breakdown via email, and ask if there\'s anything else they\'d like included in that information',
      'Acknowledge the question, note that shipping depends on location and order size, and bridge to discovery: "Your AM will cover the logistics — speaking of which, where is your business based?"',
      'Explain that Via Trading ships nationwide and offers both pickup and delivery options, then transition to asking about their warehouse setup and receiving capabilities',
    ],
    bestAnswerIndex: 2,
    explanation:
      'Shipping details and freight costs are AM territory. But notice how the response uses the question as a natural bridge into a discovery question (location). You\'re not dismissing them — you\'re redirecting while still gathering useful information.',
  },
]

// ─── Module 4: The Discovery Framework ──────────────────────────
// FillInBlank — "Discovery Quick Check"
export const discoveryFillBlanks: FillInBlankItem[] = [
  {
    id: 'bdr-disc-1',
    sentence: 'The first discovery question focuses on understanding the buyer\'s _____.',
    blank: 'business type',
    options: ['budget', 'business type', 'order volume', 'product interest'],
    correctIndex: 1,
  },
  {
    id: 'bdr-disc-2',
    sentence: 'You should ask _____ question(s) at a time during discovery.',
    blank: 'one',
    options: ['one', 'two', 'three', 'four'],
    correctIndex: 0,
  },
  {
    id: 'bdr-disc-3',
    sentence: 'The final discovery question is an open-ended: "Is there anything else you\'d want your _____ to know?"',
    blank: 'Account Manager',
    options: ['Sales Director', 'Account Manager', 'warehouse team', 'operations team'],
    correctIndex: 1,
  },
  {
    id: 'bdr-disc-4',
    sentence: 'Before moving to the next question, you should always _____ what the buyer said.',
    blank: 'acknowledge',
    options: ['summarize', 'verify', 'acknowledge', 'repeat'],
    correctIndex: 2,
  },
]

// ─── Module 5: Handling Objections & Routing ────────────────────
// ScenarioCard — "Read the Intent"
export const intentSignalScenarios: ScenarioQuestion[] = [
  {
    id: 'bdr-intent-1',
    scenario:
      'A buyer says: "I\'m looking to buy 2 truckloads this month for my new store opening." What level of intent is this?',
    options: [
      'Exploratory — they\'re excited about the idea but haven\'t committed to a supplier yet',
      'Medium — they have volume and timing in mind but are still evaluating options',
      'Strong — they have a specific need, timeline, and volume ready to act on',
    ],
    bestAnswerIndex: 2,
    explanation:
      'This is a textbook strong-intent signal. They mentioned a specific volume (2 truckloads), a specific timeline (this month), and a specific reason (new store opening). Move toward handoff quickly — complete essential discovery, confirm contact info, and route to the AM as a priority.',
  },
  {
    id: 'bdr-intent-2',
    scenario:
      'A buyer says: "I\'m comparing a few suppliers, probably will decide in the next couple months." What level of intent is this?',
    options: [
      'Strong — they\'re actively in the market and working toward a purchasing decision',
      'Medium — they\'re evaluating options with a general timeline but haven\'t committed',
      'Exploratory — they\'re gathering information but the timeline is too vague to be real',
    ],
    bestAnswerIndex: 1,
    explanation:
      'This is medium intent. They\'re actively in the market ("comparing suppliers") with a loose timeline ("next couple months"). Complete the full discovery framework so the AM has rich context. Note in your documentation that they\'re evaluating multiple options — the AM will need to differentiate Via Trading.',
  },
  {
    id: 'bdr-intent-3',
    scenario:
      'A buyer says: "I\'m just curious about the liquidation industry — maybe someday I\'ll start a business." What level of intent is this?',
    options: [
      'Strong — their curiosity shows genuine interest and they\'re ready to learn more',
      'Medium — they\'re in the early planning stages and building knowledge for a future move',
      'Exploratory — they\'re researching with no concrete plan or timeline in place',
    ],
    bestAnswerIndex: 2,
    explanation:
      'This is exploratory intent. "Just curious" and "maybe someday" signal no concrete plan or timeline. Still complete whatever discovery you can and route to the AM with an "exploratory" tag. These leads may convert later, and the information you capture now saves time if they come back.',
  },
]

// ─── Module 7: Follow-Ups & Accountability ──────────────────────
// ScenarioCard — "Follow-Up Check"
export const followUpScenarios: ScenarioQuestion[] = [
  {
    id: 'bdr-fu-1',
    scenario:
      'You routed a strong-intent lead to an AM yesterday. Today you check HubSpot and see no activity on the contact — no calls, no notes, nothing. What should you do?',
    options: [
      'Give the AM another day or two since they may be prioritizing existing accounts and will get to new leads when their schedule opens up',
      'Send the buyer a follow-up email yourself to keep them warm and let them know their AM will be reaching out shortly with program details',
      'Follow up with the AM directly to confirm they\'ve seen the lead and ask if they plan to reach out today, since strong-intent leads lose momentum quickly',
      'Flag the lead in HubSpot as high-priority and send the AM a summary of the discovery notes so they have everything they need to make the call',
    ],
    bestAnswerIndex: 2,
    explanation:
      'Strong-intent leads lose momentum fast. If the AM hasn\'t reached out within a day, follow up directly with them. This isn\'t about being pushy — it\'s about making sure the buyer gets the experience they deserve. Your job doesn\'t end at routing; it ends when the AM connects.',
  },
  {
    id: 'bdr-fu-2',
    scenario:
      'You called a prospect 3 times this week and got voicemail every time. What\'s the right next step?',
    options: [
      'Increase your call frequency and try calling at different times throughout the day until you find their availability window this week',
      'Close the lead as unresponsive in HubSpot and focus your energy on newer prospects who are more likely to engage and convert',
      'Switch to a different channel like email or WhatsApp with a brief message, and schedule a follow-up call for next week at a different time of day',
      'Leave a more detailed voicemail explaining Via Trading\'s programs and pricing so they have enough information to call you back when they\'re ready',
    ],
    bestAnswerIndex: 2,
    explanation:
      'Three call attempts with no answer means you need to switch channels. Send a brief, friendly email or WhatsApp message, then schedule a follow-up for next week at a different time of day. People have different availability patterns — morning callers might answer in the afternoon. Persistence is good, but smart persistence is better.',
  },
  {
    id: 'bdr-fu-3',
    scenario:
      'An AM tells you the lead you routed "wasn\'t qualified." What should you do?',
    options: [
      'Review your discovery notes to confirm you captured everything correctly, then explain to the AM what information you gathered and why you classified it as qualified',
      'Note the feedback internally and adjust your qualification criteria going forward, focusing on routing only leads that have confirmed budget and immediate purchase intent',
      'Ask the AM for specific feedback on what was missing or what would have been more helpful, and use their input to sharpen your discovery process for future leads',
      'Discuss the situation with your manager to get a second opinion on whether the lead met qualification standards and how to handle disagreements with AMs',
    ],
    bestAnswerIndex: 2,
    explanation:
      'Feedback from AMs is how you get better. Ask specifically what was missing: was it the wrong business type? Unclear on volume? Missing key context? Every piece of feedback tightens your discovery process and makes your next handoff stronger. This is a learning opportunity, not a criticism.',
  },
]
