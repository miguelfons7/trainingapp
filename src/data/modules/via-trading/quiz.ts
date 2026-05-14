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
    question: "How much physical warehouse space does Via Trading operate from?",
    options: [
      '50,000 sq ft',
      '150,000 sq ft',
      '250,000 sq ft',
      '1,000,000 sq ft',
    ],
    correctIndex: 2,
    explanation:
      'Via Trading operates from 250,000 square feet of physical warehouse space in Lynwood, California. With rack space, the total comes to over 550,000 square feet.',
  },
  {
    id: 'via-q3',
    question: "Which of the following is NOT one of Via Trading Corporation's three operating entities?",
    options: [
      'Via Trading',
      'WeSolveReturns',
      'BulkDealsDirect',
      'LiquidateNow',
    ],
    correctIndex: 2,
    explanation:
      "Via Trading Corporation houses three entities: Via Trading (wholesale liquidation), LiquidateNow (consignment-based liquidation), and WeSolveReturns (return center solution). BulkDealsDirect is not part of Via Trading Corporation.",
  },
  {
    id: 'via-q4',
    question: "What percentage of Via Trading's business is repeat customers?",
    options: ['50%+', '70%+', '80%+', '90%+'],
    correctIndex: 3,
    explanation:
      "Over 90% of Via Trading's business comes from repeat customers. This exceptionally high rate reflects the company's commitment to honesty, integrity, and transparency.",
  },
]
