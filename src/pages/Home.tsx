import { useAuth } from '../context/AuthContext'
import { useCompliance } from '../context/ComplianceContext'
import { courses } from '../data/courses'
import { ComplianceBanner } from '../components/home/ComplianceBanner'
import { ContinueLearning } from '../components/home/ContinueLearning'
import { ProgramCard } from '../components/home/ProgramCard'
import { CourseCard } from '../components/home/CourseCard'

export function Home() {
  const { user } = useAuth()
  const { acknowledgeItem } = useCompliance()

  const firstName = user?.name?.split(' ')[0] ?? 'Learner'

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-via-navy">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-sm text-via-text-light">
          Pick up where you left off or explore new courses below.
        </p>
      </div>

      {/* Compliance banner */}
      <ComplianceBanner onAcknowledge={acknowledgeItem} />

      {/* Continue learning */}
      <ContinueLearning />

      {/* Program overview */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-via-navy">Your Program</h2>
        <ProgramCard />
      </section>

      {/* Courses grid */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-via-navy">Courses</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}
