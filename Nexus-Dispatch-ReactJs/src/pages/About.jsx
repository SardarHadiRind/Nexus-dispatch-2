import PageHeader from '../components/PageHeader'

export default function About() {
  return (
    <>
      <PageHeader
        bgClass="bg-about"
        title={
          <>
            Our <span className="text-gradient">Story</span>
          </>
        }
        description="Built by industry veterans, Nexus Dispatch was founded with one goal: To return power and profitability to the driver."
      />

      <section className="section">
        <div className="container">
          <div className="hero-grid" style={{ alignItems: 'center' }}>
            <div className="fade-up">
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why We Exist</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1.05rem' }}>
                The trucking industry is the backbone of the economy, yet drivers are often left
                dealing with predatory brokers, volatile rate markets, and mountains of stressful
                paperwork.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.05rem' }}>
                We founded Nexus Dispatch to bridge the gap. We wanted to create an elite agency that
                handles rate negotiations and back-office operations so owner-operators can focus
                purely on executing safe, consistent deliveries and growing their businesses.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <h3
                    style={{
                      color: 'var(--primary-color)',
                      fontSize: '2.5rem',
                      marginBottom: '0.5rem',
                      fontFamily: 'Outfit',
                    }}
                  >
                    10+
                  </h3>
                  <p style={{ fontWeight: 500 }}>Years of Experience</p>
                </div>
                <div>
                  <h3
                    style={{
                      color: 'var(--primary-color)',
                      fontSize: '2.5rem',
                      marginBottom: '0.5rem',
                      fontFamily: 'Outfit',
                    }}
                  >
                    5K+
                  </h3>
                  <p style={{ fontWeight: 500 }}>Loads Booked</p>
                </div>
              </div>
            </div>
            <div className="fade-up" style={{ transitionDelay: '0.2s' }}>
              <img
                src="/assets/about_warehouse.png"
                alt="Warehouse and Logistics"
                style={{ borderRadius: '1.5rem', boxShadow: 'var(--shadow-lg)' }}
              />
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
            <h2>
              Meet the <span className="text-gradient">Team</span>
            </h2>
            <p>The industry veterans working around the clock to maximize your gross revenue.</p>
          </div>

          <div className="team-grid fade-up">
            <div className="team-card">
              <img src="/assets/team_member_1.png" alt="Director of Logistics" className="team-img" />
              <div className="team-overlay">
                <div className="team-info">
                  <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.25rem' }}>
                    Marcus Vance
                  </h3>
                  <p
                    style={{
                      color: 'var(--primary-color)',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      marginBottom: '1rem',
                    }}
                  >
                    Director of Logistics
                  </p>
                  <p
                    style={{
                      color: '#cbd5e1',
                      fontSize: '0.85rem',
                      marginBottom: '1.5rem',
                      lineHeight: 1.4,
                    }}
                  >
                    Former fleet owner with 15 years experience in negotiating specialized freight.
                  </p>
                  <div className="team-socials">
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="mailto:#"><i className="fas fa-envelope"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="team-card" style={{ transitionDelay: '0.1s' }}>
              <img src="/assets/team_member_2.png" alt="Senior Dispatcher" className="team-img" />
              <div className="team-overlay">
                <div className="team-info">
                  <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.25rem' }}>
                    Elena Rostova
                  </h3>
                  <p
                    style={{
                      color: 'var(--primary-color)',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      marginBottom: '1rem',
                    }}
                  >
                    Senior Lead Dispatcher
                  </p>
                  <p
                    style={{
                      color: '#cbd5e1',
                      fontSize: '0.85rem',
                      marginBottom: '1.5rem',
                      lineHeight: 1.4,
                    }}
                  >
                    Expert in lane optimization and emergency OTR driver support.
                  </p>
                  <div className="team-socials">
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="mailto:#"><i className="fas fa-envelope"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="team-card" style={{ transitionDelay: '0.2s' }}>
              <img
                src="/assets/service_load_booking.png"
                alt="Operations Manager"
                className="team-img"
              />
              <div className="team-overlay">
                <div className="team-info">
                  <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.25rem' }}>
                    David Chen
                  </h3>
                  <p
                    style={{
                      color: 'var(--primary-color)',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      marginBottom: '1rem',
                    }}
                  >
                    Operations Manager
                  </p>
                  <p
                    style={{
                      color: '#cbd5e1',
                      fontSize: '0.85rem',
                      marginBottom: '1.5rem',
                      lineHeight: 1.4,
                    }}
                  >
                    Master of back-office efficiency, ensuring our drivers get paid on time.
                  </p>
                  <div className="team-socials">
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="mailto:#"><i className="fas fa-envelope"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
