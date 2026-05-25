import { Link } from 'react-router-dom'
import TypeEffect from '../components/TypeEffect'
import HeroCarousel from '../components/HeroCarousel'
import Marquee from '../components/Marquee'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-gradient"></div>
        <div className="container hero-grid">
          <div className="hero-content fade-up">
            <h1>
              Maximize Your Earnings. <br />
              <TypeEffect />
            </h1>
            <p>
              Premium 24/7 truck dispatching solutions. We negotiate the best rates, handle all
              documentation, and plan the most efficient routes so you can keep moving forward.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/pricing" className="btn btn-primary">
                View Our Plans <i className="fas fa-arrow-right"></i>
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Get a Quote
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <h4>$2B+</h4>
                <p>Gross Volume Generated</p>
              </div>
              <div className="stat-item">
                <h4>24/7</h4>
                <p>Dispatch Support</p>
              </div>
              <div className="stat-item">
                <h4>98%</h4>
                <p>Driver Retention</p>
              </div>
            </div>
          </div>

          <div className="hero-image fade-up" style={{ transitionDelay: '0.2s' }}>
            <HeroCarousel />
            <div className="floating-card glass">
              <div className="icon-box">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <h5 style={{ marginBottom: '0.25rem' }}>Rate Negotiation</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  Top paying loads secured.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="section">
        <div className="container">
          <div className="section-header fade-up">
            <h2>Our Core Services</h2>
            <p>
              We provide comprehensive logistics and transportation solutions, tailored to maximize
              efficiency and driver profitability.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card fade-up">
              <div className="service-icon">
                <i className="fas fa-boxes"></i>
              </div>
              <h3>Load Booking</h3>
              <p>
                We utilize advanced load boards and our broker network to find the highest paying
                loads for your specific equipment.
              </p>
              <Link to="/services" className="service-link">
                Learn More <i className="fas fa-angle-right"></i>
              </Link>
            </div>

            <div className="service-card fade-up" style={{ transitionDelay: '0.1s' }}>
              <div className="service-icon">
                <i className="fas fa-route"></i>
              </div>
              <h3>Route Planning</h3>
              <p>
                Optimized routing to reduce deadhead miles, avoid traffic/weather delays, and
                maximize your fuel efficiency.
              </p>
              <Link to="/services" className="service-link">
                Learn More <i className="fas fa-angle-right"></i>
              </Link>
            </div>

            <div className="service-card fade-up" style={{ transitionDelay: '0.2s' }}>
              <div className="service-icon">
                <i className="fas fa-file-contract"></i>
              </div>
              <h3>Documentation</h3>
              <p>
                From rate cons to invoicing, factoring setup, and carrier packets—we handle 100% of
                the back-office paperwork.
              </p>
              <Link to="/services" className="service-link">
                Learn More <i className="fas fa-angle-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section fade-up">
        <div className="container">
          <div className="cta-box">
            <div className="cta-pattern"></div>
            <h2>Ready to scale your trucking business?</h2>
            <p>
              Join hundreds of satisfied owner-operators who have increased their weekly gross
              revenue by an average of 14% with Nexus Dispatch.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link
                to="/register"
                className="btn btn-primary"
                style={{ position: 'relative', zIndex: 5 }}
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="btn btn-outline"
                style={{
                  position: 'relative',
                  zIndex: 5,
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.3)',
                }}
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
