import type { Program } from '../types'

export const programs: Program[] = [
  {
    id: 'new-am-training',
    title: 'New AM Training Program',
    description:
      'Comprehensive onboarding program for new Account Managers at Via Trading. Covers industry fundamentals, company knowledge, product expertise, sales techniques, and the tools you need to succeed.',
    courseIds: [
      'intro-to-industry',
      'who-is-via',
      'product-knowledge',
      'sales-philosophy',
      'tools-systems',
      'bdr-role',
      'ongoing-development',
    ],
    estimatedTime: '~6 hours',
    icon: 'GraduationCap',
  },
]

export function getProgram(): Program {
  return programs[0]
}
