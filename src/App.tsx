import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProgressProvider } from './context/ProgressContext'
import { ComplianceProvider } from './context/ComplianceContext'
import { ConstructionProvider } from './context/ConstructionContext'
import { CoursesProvider } from './context/CoursesContext'
import { AppShell } from './components/layout/AppShell'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { ResetPassword } from './pages/ResetPassword'
import { Home } from './pages/Home'
import { CourseView } from './pages/CourseView'
import { ModuleView } from './pages/ModuleView'
import { Certificates } from './pages/Certificates'
import { CertificateView } from './pages/CertificateView'
import { UserProfile } from './pages/UserProfile'
import { Acknowledgements } from './pages/Acknowledgements'
import { FinalExam } from './pages/FinalExam'
import { Loader2 } from 'lucide-react'

// Admin-only pages are code-split — regular users never download them
const Admin = lazy(() => import('./pages/Admin').then((m) => ({ default: m.Admin })))
const ContentEditorPage = lazy(() => import('./pages/ContentEditorPage').then((m) => ({ default: m.ContentEditorPage })))
const ContentPage = lazy(() => import('./pages/ContentPage').then((m) => ({ default: m.ContentPage })))
const ConstructionPage = lazy(() => import('./pages/ConstructionPage').then((m) => ({ default: m.ConstructionPage })))
const QuizCreatorPage = lazy(() => import('./pages/QuizCreatorPage').then((m) => ({ default: m.QuizCreatorPage })))
const AdminIssuesPage = lazy(() => import('./pages/AdminIssuesPage').then((m) => ({ default: m.AdminIssuesPage })))
const MigrationRunner = lazy(() => import('./pages/MigrationRunner').then((m) => ({ default: m.MigrationRunner })))
const DevLog = lazy(() => import('./pages/DevLog').then((m) => ({ default: m.DevLog })))

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
    <Suspense fallback={<LoadingScreen />}>
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
    </Suspense>
  )
}

function App() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
}

export default App
