import { getPasswordStrength } from '../../utils/passwordStrength'

export default function PasswordStrengthMeter({ password }) {
  const strength = getPasswordStrength(password)

  return (
    <div className="password-strength">
      <div className="password-strength-bar">
        <div
          className="password-strength-fill"
          style={{ width: strength.width, backgroundColor: strength.color }}
        />
      </div>
      <span style={{ color: strength.color, fontSize: '0.85rem', fontWeight: 500 }}>
        {strength.label}
      </span>
    </div>
  )
}
