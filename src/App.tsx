import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProgressProvider } from './context/ProgressContext'
import { ComplianceProvider } from './context/ComplianceContext'
import { ConstructionProvider } from './context/ConstructionContext'
import { CoursesProvider } from './context/CoursesContext'
import { AppShell } from './components/layout/AppShell'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { ResetPassword } from './pages/ResetPassword'
import { Home } from './pages/Home'
import { CourseView } from './pages/CourseView'
import { ModuleView } from './pages/ModuleView'
import { Admin } from './pages/Admin'
import { ContentEditorPage } from './pages/ContentEditorPage'
import { Certificates } from './pages/Certificates'
import { CertificateView } from './pages/CertificateView'
import { UserProfile } from './pages/UserProfile'
import { Acknowledgements } from './pages/Acknowledgements'
import { DevLog } from './pages/DevLog'
import { FinalExam } from './pages/FinalExam'
import { MigrationRunner } from './pages/MigrationRunner'
import { ContentPage } from './pages/ContentPage'
import { ConstructionPage } from './pages/ConstructionPage'
import { QuizCreatorPage } from './pages/QuizCreatorPage'
import { AdminIssuesPage } from './pages/AdminIssuesPage'
import { Loader2 } from 'lucide-react'

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-via-bg flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-via-navy animate-spin mx-auto mb-3" />
        <p className="text-sm text-via-text-light">Loading VIAcademy...</p>
      </div>
    </div>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) return <LoadingScreen />

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/" replace /> : <Signup />}
      />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* Standalone (no AppShell chrome) so printing is clean */}
      <Route
        path="/certificate/:courseId"
        element={
          <ProtectedRoute>
            <CertificateView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="course/:courseId" element={<CourseView />} />
        <Route path="course/:courseId/module/:moduleId" element={<ModuleView />} />
        <Route path="acknowledgements" element={<Acknowledgements />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="final-exam" element={<FinalExam />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="profile/:userId" element={<UserProfile />} />
        <Route path="content" element={<ContentPage />} />
        <Route path="content/:courseId/:moduleId" element={<ContentEditorPage />} />
        <Route path="quiz-creator" element={<QuizCreatorPage />} />
        <Route path="construction" element={<ConstructionPage />} />
        <Route path="admin" element={<Admin />} />
        <Route path="admin/issues" element={<AdminIssuesPage />} />
        <Route path="admin/content/:courseId/:moduleId" element={<ContentEditorPage />} />
        <Route path="admin/migrate" element={<MigrationRunner />} />
        <Route path="dev-log" element={<DevLog />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CoursesProvider>
          <ProgressProvider>
            <ComplianceProvider>
              <ConstructionProvider>
                <AppRoutes />
              </ConstructionProvider>
            </ComplianceProvider>
          </ProgressProvider>
        </CoursesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
