import { Link } from 'react-router-dom'
import './Footer.css'

const footerGroups = [
  {
    title: 'Explore',
    links: [
      { to: '/about-us', label: 'About us' },
      { to: '/companies', label: 'For companies' },
      { to: '/candidates', label: 'For candidates' },
      { to: '/#services', label: 'Our services' },
    ],
  },
  {
    title: 'Quick links',
    links: [
      { to: '/#jobs', label: 'Featured jobs' },
      { to: '/candidates#plans', label: 'Candidate plans' },
      { to: '/companies#pricing', label: 'Company pricing' },
      { to: '/about-us#mission', label: 'Our mission' },
    ],
  },
]

function Footer() {
  return (
    <div className="hhs-footer">
      <section className="footer-cta" aria-labelledby="footer-cta-title">
        <div className="footer-cta-glow" aria-hidden="true" />
        <div className="footer-cta-inner">
          <div className="footer-cta-copy">
            <p className="footer-eyebrow"><span /> MAKE YOUR NEXT MOVE</p>
            <h2 id="footer-cta-title">The right opportunity<br />is closer than you think.</h2>
            <p className="footer-cta-description">
              Find your next role or meet the people who will move your team forward.
            </p>
          </div>
          <div className="footer-cta-actions">
            <Link className="footer-action footer-action-primary" to="/candidates">
              <span>Find a job</span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h12M10 4l6 6-6 6" />
              </svg>
            </Link>
            <Link className="footer-action footer-action-secondary" to="/companies">
              <span>Hire talent</span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h12M10 4l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <span className="footer-cta-watermark" aria-hidden="true">HHS</span>
        </div>
      </section>

      <footer className="footer-main">
        <div className="footer-main-inner">
          <div className="footer-brand-block">
            <Link className="footer-brand" to="/" aria-label="Hire and Hired Stars home">
              <span className="footer-brand-mark" aria-hidden="true">H</span>
              <span>Hire and Hired Stars</span>
            </Link>
            <p className="footer-brand-copy">
              Connecting ambitious people with teams building what comes next.
            </p>
            <span className="footer-location">
              <span aria-hidden="true" /> Built for talent, everywhere.
            </span>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {footerGroups.map(({ title, links }) => (
              <div className="footer-nav-group" key={title}>
                <h3>{title}</h3>
                <ul>
                  {links.map(({ to, label }) => (
                    <li key={to}>
                      <Link to={to}>
                        {label}
                        <span aria-hidden="true">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-legal">
          <span>© {new Date().getFullYear()} Hire and Hired Stars. All rights reserved.</span>
          <span className="footer-legal-note"><span aria-hidden="true">✦</span> Good things happen when talent meets opportunity.</span>
        </div>
      </footer>
    </div>
  )
}

export default Footer
