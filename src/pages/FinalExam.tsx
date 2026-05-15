import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ProgramFinalExam } from '../components/interactive/ProgramFinalExam'
import { programExamQuestions, EXAM_TIME_LIMIT_MINUTES } from '../data/modules/programExam'
import { useProgress } from '../context/ProgressContext'

export function FinalExam() {
  const { completeModule } = useProgress()

  const handleComplete = (score: number, total: number, passed: boolean) => {
    if (passed) {
      // Record program exam as completed
      completeModule('program-exam', 'final-exam', Math.round((score / total) * 100))
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-via-text-light hover:text-via-navy transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <ProgramFinalExam
        questions={programExamQuestions}
        timeLimitMinutes={EXAM_TIME_LIMIT_MINUTES}
        programTitle="New AM Training Program"
        onComplete={handleComplete}
      />
    </div>
  )
}
