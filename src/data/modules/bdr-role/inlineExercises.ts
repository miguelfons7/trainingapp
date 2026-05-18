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
      'Quote a ballpark price to keep the conversation going',
      'Say "I don\'t handle pricing" and move on',
      'Acknowledge the question and redirect: "Great question — pricing depends on the program and what you\'re looking for. Your Account Manager will walk you through the options that fit your budget. Let me ask a few questions so I can connect you with the right person."',
      'Transfer them to an AM immediately without asking anything',
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
      'Read them a list of every program Via Trading offers',
      'Welcome them, give a brief overview of Via Trading, and start asking about their business: "Welcome! We work with major retailers to sell their overstock and return inventory. To help connect you with the right person, can you tell me a little about your business?"',
      'Tell them to check the website for details',
      'Transfer them to an AM right away since they need product education',
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
      'Try to process the order yourself to avoid losing the sale',
      'Acknowledge their enthusiasm and route to the AM: "I love that you\'re ready to go! Let me connect you with your Account Manager right away — they\'ll get you set up. Just a couple of quick questions so they\'re prepared when they reach out."',
      'Tell them they need to slow down and answer all 7 discovery questions first',
      'Put them on hold while you figure out pricing',
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
      'Research shipping costs and provide a detailed answer',
      'Say "I have no idea" and transfer them',
      'Briefly acknowledge and bridge to the AM: "Good question — shipping depends on your location and order size. Your Account Manager will walk you through all the logistics details. Speaking of which, where is your business based?"',
      'Tell them shipping is too complicated to explain',
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
    options: ['budget', 'business type', 'shipping preference', 'purchase history'],
    correctIndex: 1,
  },
  {
    id: 'bdr-disc-2',
    sentence: 'You should ask _____ question(s) at a time during discovery.',
    blank: 'one',
    options: ['one', 'two', 'three', 'as many as possible'],
    correctIndex: 0,
  },
  {
    id: 'bdr-disc-3',
    sentence: 'The final discovery question is an open-ended: "Is there anything else you\'d want your _____ to know?"',
    blank: 'Account Manager',
    options: ['Sales Director', 'Account Manager', 'warehouse team', 'shipping department'],
    correctIndex: 1,
  },
  {
    id: 'bdr-disc-4',
    sentence: 'Before moving to the next question, you should always _____ what the buyer said.',
    blank: 'acknowledge',
    options: ['challenge', 'ignore', 'acknowledge', 'repeat'],
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
      'Exploratory — they\'re just looking around',
      'Medium — they\'re interested but not committed',
      'Strong — they have a specific need, timeline, and volume in mind',
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
      'Strong — they\'re actively buying',
      'Medium — they\'re interested and evaluating, with a general timeline',
      'Exploratory — they\'re just researching with no real timeline',
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
      'Strong — they\'re ready to get started',
      'Medium — they have a plan forming',
      'Exploratory — they\'re researching with no concrete plan or timeline',
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
      'Assume the AM is busy and will get to it eventually',
      'Call the buyer yourself and try to help them directly',
      'Follow up with the AM to make sure they\'ve seen the lead and plan to reach out today',
      'Re-route the lead to a different AM without telling anyone',
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
      'Keep calling every day until they pick up',
      'Mark them as unresponsive and move on permanently',
      'Send an email or WhatsApp message and schedule a follow-up for next week at a different time',
      'Leave 3 more voicemails today',
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
      'Get defensive and argue that the lead was qualified',
      'Ignore the feedback and keep doing what you\'re doing',
      'Ask for specific feedback — what was missing, what would have been more helpful — and use it to improve your discovery process',
      'Stop routing leads to that AM',
    ],
    bestAnswerIndex: 2,
    explanation:
      'Feedback from AMs is how you get better. Ask specifically what was missing: was it the wrong business type? Unclear on volume? Missing key context? Every piece of feedback tightens your discovery process and makes your next handoff stronger. This is a learning opportunity, not a criticism.',
  },
]
