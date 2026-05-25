import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header({ theme, onToggleTheme }) {
  const { isAuthenticated } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const themeIcon = theme === 'dark' ? 'fa-sun' : 'fa-moon'

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <i className="fas fa-route logo-icon"></i>
          Nexus<span className="text-gradient">Dispatch</span>
        </Link>

        <nav className={`nav-links${menuOpen ? ' active' : ''}`} id="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
            About Us
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
            Services
          </NavLink>
          <NavLink to="/pricing" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
            Pricing
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
            Contact
          </NavLink>
          <div className="nav-actions mobile-only-hidden">
            <button
              type="button"
              className="theme-toggle"
              id="theme-toggle"
              aria-label="Toggle Theme"
              onClick={onToggleTheme}
            >
              <i className={`fas ${themeIcon}`}></i>
            </button>
            <NavLink
              to={isAuthenticated ? '/dashboard' : '/login'}
              className="btn btn-outline btn-sm portal-nav-btn"
              onClick={closeMenu}
            >
              <i className={`fas ${isAuthenticated ? 'fa-th-large' : 'fa-sign-in-alt'}`}></i>
              {isAuthenticated ? 'Portal' : 'Login'}
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => `btn btn-primary${isActive ? ' active' : ''}`}
              onClick={closeMenu}
            >
              Driver Registration
            </NavLink>
          </div>
        </nav>

        <button
          type="button"
          className="mobile-menu-btn"
          id="mobile-menu-btn"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </header>
  )
}
