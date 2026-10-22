import { Link } from 'react-router-dom'
import { ROUTES } from '../../../routes.js'

function AboutHero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" />
      <div className="hero-glow glow-a" />
      <div className="hero-glow glow-b" />
      <div className="hero-bg-text">ABOUT&nbsp;&nbsp;US</div>

      <div className="hero-content">
        <div className="hero-eyebrow reveal">
          <span className="eyebrow-dot" />
          Our Story &amp; Mission
        </div>

        <h1 className="hero-title reveal d1">
          <span className="line-outline">WE ARE</span>
          <br />
          <span className="line-solid">Hire and Hired</span>
          <br />
          <span className="line-outline">Stars.</span>
        </h1>

        <div className="hero-split">
          <div>
            <p className="hero-desc reveal d2">
              Founded in 2026 by <strong style={{ color: 'var(--white)' }}>Iqra</strong> in Islamabad, Pakistan, Hire and Hired Stars was born from a simple belief: finding great work and great people should never be a game of luck. We built the platform you need.
            </p>
            <div className="hero-cta reveal d3">
              <Link to={`${ROUTES.aboutUs}#mission`} className="btn-white">
                Our Mission
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to={`${ROUTES.aboutUs}#services`} className="btn-ghost">Our Services</Link>
            </div>
          </div>

          <div className="hero-stat-strip reveal d3">
            <div className="hero-stat">
              <div className="stat-num">2026</div>
              <div className="stat-lbl">Founded</div>
            </div>
            <div className="hero-stat">
              <div className="stat-num">110+</div>
              <div className="stat-lbl">Countries</div>
            </div>
            <div className="hero-stat">
              <div className="stat-num">200K+</div>
              <div className="stat-lbl">Lives Changed</div>
            </div>
            <div className="hero-stat">
              <div className="stat-num">96%</div>
              <div className="stat-lbl">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
