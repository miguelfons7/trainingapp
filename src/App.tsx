import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProgressProvider } from './context/ProgressContext'
import { ComplianceProvider } from './context/ComplianceContext'
import { AppShell } from './components/layout/AppShell'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { CourseView } from './pages/CourseView'
import { ModuleView } from './pages/ModuleView'
import { Admin } from './pages/Admin'
import { Certificates } from './pages/Certificates'
import { Acknowledgements } from './pages/Acknowledgements'
import { DevLog } from './pages/DevLog'
import { FinalExam } from './pages/FinalExam'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
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
        <Route path="admin" element={<Admin />} />
        <Route path="dev-log" element={<DevLog />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter basename="/trainingapp">
      <AuthProvider>
        <ProgressProvider>
          <ComplianceProvider>
            <AppRoutes />
          </ComplianceProvider>
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
