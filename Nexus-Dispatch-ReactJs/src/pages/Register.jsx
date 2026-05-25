import PageHeader from '../components/PageHeader'
import { handleFormSubmit, validateRegistrationForm } from '../utils/formUtils'

export default function Register() {
  const onBlurValidate = (e) => {
    if (e.target.value.trim() !== '') {
      validateRegistrationForm(e.target.closest('form'))
    }
  }

  return (
    <>
      <PageHeader
        bgClass="bg-register"
        title={
          <>
            Driver <span className="text-gradient">Registration</span>
          </>
        }
        description="Complete this brief application to begin onboarding. Our team will review your MC# and get you set up within 24 hours."
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="form-card fade-up">
            <form
              id="registration-form"
              onSubmit={(e) => handleFormSubmit(e, 'registration-form')}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="form-control"
                    required
                    placeholder="John"
                    onBlur={onBlurValidate}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lastName">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    required
                    placeholder="Doe"
                    onBlur={onBlurValidate}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    required
                    placeholder="john@example.com"
                    onBlur={onBlurValidate}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-control"
                    required
                    placeholder="(555) 000-0000"
                    onBlur={onBlurValidate}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="mcNumber">
                    MC Number *
                  </label>
                  <input
                    type="text"
                    id="mcNumber"
                    className="form-control"
                    required
                    placeholder="e.g. 123456"
                    onBlur={onBlurValidate}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="dotNumber">
                    DOT Number *
                  </label>
                  <input
                    type="text"
                    id="dotNumber"
                    className="form-control"
                    required
                    placeholder="e.g. 987654"
                    onBlur={onBlurValidate}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="equipmentType">
                  Equipment Type *
                </label>
                <select
                  id="equipmentType"
                  className="form-control"
                  required
                  style={{ appearance: 'auto' }}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select equipment
                  </option>
                  <option value="dry_van">Dry Van</option>
                  <option value="reefer">Reefer</option>
                  <option value="flatbed">Flatbed</option>
                  <option value="stepdeck">Step Deck</option>
                  <option value="hotshot">Hotshot</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="preferredLanes">
                  Preferred Lanes / Operational Areas
                </label>
                <textarea
                  id="preferredLanes"
                  className="form-control"
                  placeholder="e.g. Midwest to Southeast only..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.125rem' }}
              >
                Submit Application <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
