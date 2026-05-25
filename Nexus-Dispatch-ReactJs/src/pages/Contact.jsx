import PageHeader from '../components/PageHeader'
import { handleFormSubmit } from '../utils/formUtils'

export default function Contact() {
  return (
    <>
      <PageHeader
        bgClass="bg-contact"
        title={
          <>
            Get in <span className="text-gradient">Touch</span>
          </>
        }
        description="Have questions about our pricing, services, or need a custom fleet quote? Drop us a message below."
      />

      <section className="section">
        <div className="container hero-grid">
          <div className="fade-up">
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Contact Information</h2>
            <div className="feature-item" style={{ marginBottom: '2rem' }}>
              <div className="icon-box" style={{ marginTop: 0 }}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h4 style={{ fontSize: '1.25rem' }}>Headquarters</h4>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  112 Logistics Way, Suite 400
                  <br />
                  Chicago, IL 60601
                </p>
              </div>
            </div>
            <div className="feature-item" style={{ marginBottom: '2rem' }}>
              <div className="icon-box" style={{ marginTop: 0 }}>
                <i className="fas fa-phone-alt"></i>
              </div>
              <div>
                <h4 style={{ fontSize: '1.25rem' }}>Phone</h4>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  +1 (800) 555-0199 <em>(Available 24/7)</em>
                </p>
              </div>
            </div>
            <div className="feature-item" style={{ marginBottom: '2rem' }}>
              <div className="icon-box" style={{ marginTop: 0 }}>
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <h4 style={{ fontSize: '1.25rem' }}>Email</h4>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>dispatch@nexus.com</p>
              </div>
            </div>

            <div
              style={{
                marginTop: '3rem',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-color)',
                height: 250,
              }}
            >
              <iframe
                title="Chicago office map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.528343750597!2d-87.6243!3d41.8818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2ca3324fc69b%3A0xc39f80a4f323c8e3!2sChicago%2C%20IL!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="form-card fade-up" style={{ transitionDelay: '0.2s' }}>
            <form id="contact-form" onSubmit={(e) => handleFormSubmit(e, 'contact-form')}>
              <div className="form-group">
                <label className="form-label" htmlFor="contactName">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="contactName"
                  className="form-control"
                  required
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contactEmail">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  className="form-control"
                  required
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contactSubject">
                  Subject Request
                </label>
                <select id="contactSubject" className="form-control" style={{ appearance: 'auto' }}>
                  <option value="general">General Inquiry</option>
                  <option value="quote">Get a Quote</option>
                  <option value="fleet">Fleet Setup</option>
                  <option value="support">Driver Support</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contactMessage">
                  Message *
                </label>
                <textarea
                  id="contactMessage"
                  className="form-control"
                  required
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Message <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
