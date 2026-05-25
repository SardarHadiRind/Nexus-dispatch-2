import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/dashboard', end: true, icon: 'fa-th-large', label: 'Dashboard' },
  { to: '/dashboard/calendar', icon: 'fa-calendar-alt', label: 'Calendar' },
  { to: '/dashboard/video', icon: 'fa-video', label: 'Video Call' },
  { to: '/dashboard/documents', icon: 'fa-file-contract', label: 'Documents' },
  { to: '/dashboard/payments', icon: 'fa-wallet', label: 'Payments' },
]

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="portal-shell">
      <aside className="portal-sidebar">
        <div className="portal-sidebar-brand">
          <i className="fas fa-route"></i>
          Nexus<span className="text-gradient">Portal</span>
        </div>
        <div className="portal-role-badge">
          <i className={`fas ${user?.role === 'investor' ? 'fa-chart-line' : 'fa-truck'}`}></i>
          {user?.role === 'investor' ? 'Investor' : 'Entrepreneur'}
        </div>
        <nav className="portal-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `portal-nav-link${isActive ? ' active' : ''}`}
            >
              <i className={`fas ${item.icon}`}></i>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="portal-sidebar-footer">
          <p className="portal-user-name">{user?.name}</p>
          <p className="portal-user-email">{user?.email}</p>
          <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>
      <main className="portal-main">
        <Outlet />
      </main>
    </div>
  )
}
