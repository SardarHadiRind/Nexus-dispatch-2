import { useState } from 'react'
import PageHeader from '../components/PageHeader'

const faqs = [
  {
    q: 'Do you force dispatch?',
    a: 'Never. You are the boss. We present you with the best load options available, but the final decision to book a load is always 100% yours.',
  },
  {
    q: 'What documents do I need to get started?',
    a: 'We require a valid MC Authority, W-9, Certificate of Insurance (showing $1M auto liability & $100k cargo), and a Notice of Assignment (NOA) if you use a factoring company.',
  },
  {
    q: 'How quickly can I start getting loads?',
    a: 'Once you submit your registration and required documents, our onboarding process takes less than 24 hours. You can be rolling with your first load the next day.',
  },
  {
    q: 'Do you help with factoring setup?',
    a: 'Yes! We have established relationships with top factoring companies and can help you get set up quickly to ensure you get paid on time, every time.',
  },
]

export default function Services() {
  const [activeFaq, setActiveFaq] = useState(null)

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index))
  }

  return (
    <>
      <PageHeader
        bgClass="bg-services"
        title={
          <>
            Our <span className="text-gradient">Services</span>
          </>
        }
        description="From load negotiating to backend administration, we provide an expansive suite of services to ensure your trucks never stop producing revenue."
      />

      <section className="section">
        <div className="container">
          <div className="hero-grid" style={{ alignItems: 'center', marginBottom: '6rem' }}>
            <div className="fade-up">
              <img
                src="/assets/service_load_booking.png"
                alt="Load Booking"
                style={{ borderRadius: '1rem', boxShadow: 'var(--shadow-lg)' }}
              />
            </div>
            <div className="fade-up" style={{ transitionDelay: '0.2s' }}>
              <div className="service-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Load Booking & Negotiation</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Finding freight isn&apos;t enough; securing top-paying freight is the goal. We leverage
                established broker relationships and private load boards to negotiate premium rates,
                taking into account market trends, equipment type, and lane preferences.
              </p>
              <ul className="feature-list">
                <li className="feature-item">
                  <i className="fas fa-check-circle feature-icon"></i>
                  <div>
                    <strong>Rate Negotiation</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Aggressive bidding to maximize RPM (Rate Per Mile).
                    </p>
                  </div>
                </li>
                <li className="feature-item">
                  <i className="fas fa-check-circle feature-icon"></i>
                  <div>
                    <strong>Lane Optimization</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Booking freight that leads to &apos;hot&apos; markets rather than dead zones.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="hero-grid" style={{ alignItems: 'center', marginBottom: '6rem' }}>
            <div className="fade-up" style={{ order: 2 }}>
              <img
                src="/assets/service_back_office.png"
                alt="Back Office"
                style={{ borderRadius: '1rem', boxShadow: 'var(--shadow-lg)' }}
              />
            </div>
            <div className="fade-up" style={{ order: 1, transitionDelay: '0.2s' }}>
              <div className="service-icon">
                <i className="fas fa-file-invoice"></i>
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Documentation & Back Office</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Your time shouldn&apos;t be spent scanning documents and begging brokers for detention pay.
                We&apos;ll handle the paperwork from start to finish, ensuring you get paid quickly and
                accurately.
              </p>
              <ul className="feature-list">
                <li className="feature-item">
                  <i className="fas fa-check-circle feature-icon"></i>
                  <div>
                    <strong>Carrier Packets & Rate Cons</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      We fill out packets, verify insurance, and sign rate confirmations.
                    </p>
                  </div>
                </li>
                <li className="feature-item">
                  <i className="fas fa-check-circle feature-icon"></i>
                  <div>
                    <strong>Invoicing & Factoring</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Seamless integration with your factoring company for fast payouts.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="hero-grid" style={{ alignItems: 'center' }}>
            <div className="fade-up">
              <img
                src="/assets/about_warehouse.png"
                alt="Driver Support"
                style={{ borderRadius: '1rem', boxShadow: 'var(--shadow-lg)' }}
              />
            </div>
            <div className="fade-up" style={{ transitionDelay: '0.2s' }}>
              <div className="service-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>24/7 Driver Support</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                The road doesn&apos;t sleep, and neither do we. Our team is available 24/7 to solve
                on-the-road issues, from lumpers and layovers to navigating complex delivery facilities.
              </p>
              <ul className="feature-list">
                <li className="feature-item">
                  <i className="fas fa-check-circle feature-icon"></i>
                  <div>
                    <strong>Emergency Assistance</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Immediate communication with brokers in case of breakdown or delay.
                    </p>
                  </div>
                </li>
                <li className="feature-item">
                  <i className="fas fa-check-circle feature-icon"></i>
                  <div>
                    <strong>Route Planning</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Providing directions, weather updates, and optimized stop planning.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section"
        style={{ backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)' }}
      >
        <div className="container">
          <div className="section-header fade-up">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about partnering with Nexus Dispatch.</p>
          </div>

          <div className="faq-container fade-up" style={{ maxWidth: 800, margin: '0 auto' }}>
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className={`faq-item${activeFaq === index ? ' active' : ''}`}
              >
                <button type="button" className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.q}</span>
                  <i className="fas fa-plus faq-icon"></i>
                </button>
                <div
                  className="faq-answer"
                  style={{
                    maxHeight: activeFaq === index ? '500px' : null,
                  }}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
