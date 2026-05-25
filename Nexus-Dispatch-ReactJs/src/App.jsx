import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Login from './pages/portal/Login'
import Dashboard from './pages/portal/Dashboard'
import CalendarPage from './pages/portal/CalendarPage'
import VideoCallPage from './pages/portal/VideoCallPage'
import DocumentsPage from './pages/portal/DocumentsPage'
import PaymentsPage from './pages/portal/PaymentsPage'
import DashboardLayout from './components/portal/DashboardLayout'
import ProtectedRoute from './components/portal/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="contact" element={<Contact />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/calendar" element={<CalendarPage />} />
        <Route path="/dashboard/video" element={<VideoCallPage />} />
        <Route path="/dashboard/documents" element={<DocumentsPage />} />
        <Route path="/dashboard/payments" element={<PaymentsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
