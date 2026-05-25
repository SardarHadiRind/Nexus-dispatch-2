import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link to="/" className="logo">
              <i className="fas fa-route logo-icon"></i>
              Nexus<span className="text-gradient">Dispatch</span>
            </Link>
            <p>
              Empowering owner-operators and fleets with end-to-end dispatching, route
              optimization, and back-office solutions.
            </p>
            <div className="footer-socials">
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/pricing">Pricing Plans</Link></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Load Board</a></li>
              <li><a href="#">Driver Portal</a></li>
              <li><a href="#">Blog & News</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <a href="mailto:dispatch@nexus.com">
                  <i className="fas fa-envelope"></i> dispatch@nexus.com
                </a>
              </li>
              <li>
                <a href="tel:+18005550199">
                  <i className="fas fa-phone"></i> +1 (800) 555-0199
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-map-marker-alt"></i> 112 Logistics Way, Suite 400
                  <br />
                  Chicago, IL 60601
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Nexus Dispatch LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
