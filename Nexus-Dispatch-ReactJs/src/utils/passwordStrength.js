export function getPasswordStrength(password) {
  if (!password) return { score: 0, label: 'Enter a password', color: '#94a3b8' }

  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  if (score <= 1) return { score: 1, label: 'Weak', color: '#ef4444', width: '25%' }
  if (score === 2) return { score: 2, label: 'Fair', color: '#f59e0b', width: '50%' }
  if (score === 3) return { score: 3, label: 'Good', color: '#3b82f6', width: '75%' }
  return { score: 4, label: 'Strong', color: '#22c55e', width: '100%' }
}
