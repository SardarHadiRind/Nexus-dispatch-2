/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const DEMO_USERS = {
  'investor@nexus.com': { password: 'Investor1!', role: 'investor', name: 'Alex Investor' },
  'founder@nexus.com': { password: 'Founder1!', role: 'entrepreneur', name: 'Sam Entrepreneur' },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nexus_user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('nexus_user', JSON.stringify(user))
    else localStorage.removeItem('nexus_user')
  }, [user])

  const login = (email, password, role) => {
    const demo = DEMO_USERS[email.toLowerCase()]
    if (demo && demo.password === password && demo.role === role) {
      setUser({ email, role: demo.role, name: demo.name })
      return { ok: true }
    }
    if (password.length >= 8 && role) {
      setUser({
        email,
        role,
        name: role === 'investor' ? 'Guest Investor' : 'Guest Entrepreneur',
      })
      return { ok: true }
    }
    return { ok: false, error: 'Invalid credentials. Try demo accounts or password 8+ chars.' }
  }

  const verifyOtp = () => true

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, verifyOtp, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export { DEMO_USERS }
