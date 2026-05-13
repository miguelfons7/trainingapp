import type { QuizQuestion } from '../../../types'

export const viaQuizQuestions: QuizQuestion[] = [
  {
    id: 'via-q1',
    question: 'When was Via Trading founded?',
    options: ['1998', '2002', '2006', '2010'],
    correctIndex: 1,
    explanation:
      'Via Trading was founded in 2002 by a team of 4 in a 6,000 square foot warehouse in Los Angeles.',
  },
  {
    id: 'via-q2',
    question: "What is Via Trading's warehouse size?",
    options: [
      '50,000 sq ft',
      '150,000 sq ft',
      '550,000+ sq ft',
      '1,000,000 sq ft',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading operates from a 550,000+ square foot facility in Lynwood, California — a massive growth from the original 6,000 sq ft warehouse.',
  },
  {
    id: 'via-q3',
    question: "Which of the following is NOT one of Via Trading's three platforms?",
    options: [
      'ViaTrading.com',
      'WeSolveReturns.com',
      'BulkDealsDirect.com',
      'LiquidateNow.com',
    ],
    correctIndex: 2,
    explanation:
      "Via Trading's three platforms are ViaTrading.com (wholesale liquidation), WeSolveReturns.com (returns management), and LiquidateNow.com (vendor liquidation). BulkDealsDirect.com is not a Via Trading platform.",
  },
  {
    id: 'via-q4',
    question: "What percentage of Via Trading's business is repeat customers?",
    options: ['50%+', '70%+', '80%+', '90%+'],
    correctIndex: 3,
    explanation:
      "Over 90% of Via Trading's business comes from repeat customers. This exceptionally high rate reflects the company's commitment to honesty, integrity, and transparency in building long-term customer relationships.",
  },
]
