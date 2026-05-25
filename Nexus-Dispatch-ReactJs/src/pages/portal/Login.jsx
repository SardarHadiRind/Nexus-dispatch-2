import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, DEMO_USERS } from '../../context/AuthContext'
import PasswordStrengthMeter from '../../components/portal/PasswordStrengthMeter'

export default function Login() {
  const { login, verifyOtp } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('investor')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  const handleCredentials = (e) => {
    e.preventDefault()
    setError('')
    const result = login(email, password, role)
    if (result.ok) setStep(2)
    else setError(result.error)
  }

  const handleOtp = (e) => {
    e.preventDefault()
    setError('')
    if (otp.length !== 6) {
      setError('Enter the 6-digit OTP code.')
      return
    }
    if (verifyOtp(otp)) {
      navigate('/dashboard')
    } else {
      setError('Invalid OTP. Use any 6 digits for demo.')
    }
  }

  const fillDemo = (type) => {
    const key = type === 'investor' ? 'investor@nexus.com' : 'founder@nexus.com'
    const demo = DEMO_USERS[key]
    setEmail(key)
    setPassword(demo.password)
    setRole(demo.role)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <i className="fas fa-route login-logo"></i>
          <h1>
            Nexus<span className="text-gradient">Portal</span>
          </h1>
          <p>Secure access for Investors & Entrepreneurs</p>
        </div>

        <div className="login-steps">
          <span className={step >= 1 ? 'active' : ''}>1. Credentials</span>
          <span className={step >= 2 ? 'active' : ''}>2. 2FA Verify</span>
        </div>

        {step === 1 && (
          <>
            <div className="login-mode-toggle">
              <button
                type="button"
                className={mode === 'login' ? 'active' : ''}
                onClick={() => setMode('login')}
              >
                Login
              </button>
              <button
                type="button"
                className={mode === 'signup' ? 'active' : ''}
                onClick={() => setMode('signup')}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleCredentials} className="login-form">
              <div className="form-group">
                <label className="form-label">Role</label>
                <div className="role-select">
                  <button
                    type="button"
                    className={`role-btn${role === 'investor' ? ' active' : ''}`}
                    onClick={() => setRole('investor')}
                  >
                    <i className="fas fa-chart-line"></i> Investor
                  </button>
                  <button
                    type="button"
                    className={`role-btn${role === 'entrepreneur' ? ' active' : ''}`}
                    onClick={() => setRole('entrepreneur')}
                  >
                    <i className="fas fa-truck"></i> Entrepreneur
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                {(mode === 'signup' || password.length > 0) && (
                  <PasswordStrengthMeter password={password} />
                )}
              </div>

              {error && <p className="login-error">{error}</p>}

              <button type="submit" className="btn btn-primary login-submit">
                Continue to 2FA <i className="fas fa-arrow-right"></i>
              </button>
            </form>

            <div className="demo-accounts">
              <p>Demo accounts:</p>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => fillDemo('investor')}>
                Investor Demo
              </button>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => fillDemo('entrepreneur')}>
                Entrepreneur Demo
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleOtp} className="login-form">
            <div className="otp-info">
              <i className="fas fa-shield-alt"></i>
              <p>
                We sent a 6-digit code to <strong>{email}</strong>
              </p>
              <p className="otp-hint">Demo: enter any 6 digits (e.g. 123456)</p>
            </div>

            <div className="form-group">
              <label className="form-label">One-Time Password</label>
              <div className="otp-inputs">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="otp-digit"
                    value={otp[i] || ''}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '')
                      const arr = otp.split('')
                      arr[i] = val
                      setOtp(arr.join('').slice(0, 6))
                      if (val && e.target.nextElementSibling) {
                        e.target.nextElementSibling.focus()
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !otp[i] && e.target.previousElementSibling) {
                        e.target.previousElementSibling.focus()
                      }
                    }}
                  />
                ))}
              </div>
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="btn btn-primary login-submit">
              Verify & Enter Portal <i className="fas fa-check"></i>
            </button>
            <button type="button" className="btn btn-outline login-back" onClick={() => setStep(1)}>
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
