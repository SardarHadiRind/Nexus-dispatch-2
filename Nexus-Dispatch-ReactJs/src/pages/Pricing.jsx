import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

export default function Pricing() {
  const [miles, setMiles] = useState(2500)
  const [rate, setRate] = useState(2.5)

  const current = miles * rate
  const nexus = miles * rate * 1.15
  const extra = nexus - current

  const fmt = (n) =>
    '$' + n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })

  return (
    <>
      <PageHeader
        bgClass="bg-pricing"
        title={
          <>
            Transparent <span className="text-gradient">Pricing</span>
          </>
        }
        description="No hidden fees. No forced dispatch. Choose the plan that best fits your operational goals."
      />

      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <div
            className="form-card glass fade-up"
            style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              Driver Earnings <span className="text-gradient">Calculator</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              See how much more you could make with Nexus Dispatch&apos;s negotiated rates (avg 15%
              higher).
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                textAlign: 'left',
                marginBottom: '2rem',
              }}
            >
              <div>
                <label className="form-label" htmlFor="milesSlider">
                  Weekly Miles:{' '}
                  <span id="milesValue" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                    {miles.toLocaleString()}
                  </span>
                </label>
                <input
                  type="range"
                  id="milesSlider"
                  min="1000"
                  max="4000"
                  step="50"
                  value={miles}
                  className="slider"
                  onChange={(e) => setMiles(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="rateSlider">
                  Current Rate ($/mi):{' '}
                  <span id="rateValue" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                    ${rate.toFixed(2)}
                  </span>
                </label>
                <input
                  type="range"
                  id="rateSlider"
                  min="1.50"
                  max="5.00"
                  step="0.05"
                  value={rate}
                  className="slider"
                  onChange={(e) => setRate(Number(e.target.value))}
                />
              </div>
            </div>

            <div
              style={{
                background: 'var(--bg-color)',
                padding: '1.5rem',
                borderRadius: '1rem',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Estimated Weekly Gross</h3>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Without Nexus</p>
                  <h4 id="currentEarnings" style={{ fontSize: '1.75rem' }}>
                    {fmt(current)}
                  </h4>
                </div>
                <div style={{ fontSize: '2rem', color: 'var(--text-muted)' }}>
                  <i className="fas fa-arrow-right"></i>
                </div>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    With Nexus (+15%)
                  </p>
                  <h4 id="nexusEarnings" style={{ fontSize: '2.25rem', color: 'var(--primary-color)' }}>
                    {fmt(nexus)}
                  </h4>
                </div>
              </div>
              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px dashed var(--border-color)',
                }}
              >
                <p style={{ fontSize: '1.125rem' }}>
                  You could earn{' '}
                  <strong id="extraEarnings" style={{ color: '#22c55e' }}>
                    +{fmt(extra)}
                  </strong>{' '}
                  more per week!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="pricing-grid">
            <div className="pricing-card fade-up">
              <h3>Percentage Plan</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Pay only when you drive.</p>
              <div className="pricing-price">
                5% <span>/ gross load</span>
              </div>
              <ul className="pricing-features">
                <li><i className="fas fa-check"></i> Premium Load Board Access</li>
                <li><i className="fas fa-check"></i> Rate Negotiation</li>
                <li><i className="fas fa-check"></i> Standard Paperwork Processing</li>
                <li><i className="fas fa-check"></i> Credit Checks on Brokers</li>
              </ul>
              <Link to="/register" className="btn btn-outline" style={{ width: '100%' }}>
                Select Plan
              </Link>
            </div>

            <div className="pricing-card popular fade-up" style={{ transitionDelay: '0.1s' }}>
              <div className="pricing-badge">Most Popular</div>
              <h3>Flat Rate Plan</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Predictable weekly expenses.
              </p>
              <div className="pricing-price">
                $250 <span>/ truck weekly</span>
              </div>
              <ul className="pricing-features">
                <li><i className="fas fa-check"></i> Everything in Percentage Plan</li>
                <li><i className="fas fa-check"></i> Full Back-Office Support</li>
                <li><i className="fas fa-check"></i> Direct Factoring Integration</li>
                <li><i className="fas fa-check"></i> 24/7 Dedicated Dispatcher</li>
                <li><i className="fas fa-check"></i> Advanced Route Optimization</li>
              </ul>
              <Link to="/register" className="btn btn-primary" style={{ width: '100%' }}>
                Select Plan
              </Link>
            </div>

            <div className="pricing-card fade-up" style={{ transitionDelay: '0.2s' }}>
              <h3>Fleet Plan</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>For carriers with 5+ trucks.</p>
              <div className="pricing-price">
                Custom <span>/ pricing</span>
              </div>
              <ul className="pricing-features">
                <li><i className="fas fa-check"></i> Volume Discount Pricing</li>
                <li><i className="fas fa-check"></i> Dedicated Account Manager</li>
                <li><i className="fas fa-check"></i> Fleet Data Analytics Reports</li>
                <li><i className="fas fa-check"></i> VIP Onboarding</li>
              </ul>
              <Link to="/contact" className="btn btn-outline" style={{ width: '100%' }}>
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
