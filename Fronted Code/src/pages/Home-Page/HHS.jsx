import useScrollReveal from '../../hooks/useScrollReveal.js'
import { Link } from 'react-router-dom'
import './HHS.css'
import Navbar from '../../components/Navbar.jsx'
import Footer from '../../components/Footer.jsx'

const HHS = () => {
  useScrollReveal('.fade-up')

  return (
    <div className="hhs-home-page">
      <Navbar />
      <section className="hero">
        <div className="container">
          <div className="hero-layout">
            <div className="hero-content">
              <p className="hero-eyebrow">
                <i className="fas fa-bolt me-2" />The Future of Talent Acquisition
              </p>
              <h1 className="hero-title">
                Find Your
                <br />
                <span>Dream Job</span>
                <br />
                Today.
              </h1>
              <p className="hero-sub">
                Connect with top employers and discover thousands of opportunities tailored to your skills and ambitions. Your career breakthrough starts here.
              </p>

              <form className="search-wrapper" action="/candidates" method="get">
                <div className="search-input-group">
                  <svg className="search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="10.8" cy="10.8" r="6.3" />
                    <path d="m15.4 15.4 4.1 4.1" />
                  </svg>
                  <label className="search-field-label" htmlFor="home-job-search">What are you looking for?</label>
                  <input
                    id="home-job-search"
                    type="search"
                    className="search-input"
                    name="search"
                    placeholder="Job title, skill, or company"
                    aria-label="Job title, skill, or company"
                  />
                </div>
                <div className="search-divider" />
                <div className="search-input-group">
                  <svg className="search-icon search-icon-location" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M19 10.1c0 5-7 10.4-7 10.4S5 15.1 5 10.1a7 7 0 1 1 14 0Z" />
                    <circle cx="12" cy="10" r="2.2" />
                  </svg>
                  <label className="search-field-label" htmlFor="home-location-search">Where?</label>
                  <input
                    id="home-location-search"
                    type="text"
                    className="search-input"
                    name="location"
                    placeholder="City, state, or remote"
                    aria-label="City, state, or remote"
                    autoComplete="address-level2"
                  />
                </div>
                <button className="btn-search" type="submit">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="10.8" cy="10.8" r="6.3" />
                    <path d="m15.4 15.4 4.1 4.1" />
                  </svg>
                  Search jobs
                </button>
              </form>

              <div className="hero-tags">
                <span className="tag">UI/UX Design</span>
                <span className="tag">Software Engineer</span>
                <span className="tag">Product Manager</span>
                <span className="tag">Data Science</span>
                <span className="tag">Marketing</span>
                <span className="tag">Web Development</span>
                <span className="tag">App Development</span>
              </div>
            </div>

            <div className="hero-side">
              <div className="hero-panel">
                <div className="hero-panel-heading">
                  <span className="hero-panel-mark" aria-hidden="true">H</span>
                  <span>
                    <strong>HHS at a glance</strong>
                    <small>Built for better matches</small>
                  </span>
                  <span className="hero-panel-live"><i /> LIVE</span>
                </div>
                <div className="stat-item">
                  <div className="stat-num">10K+</div>
                  <div className="stat-label">Active Job Listings</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">4.5K</div>
                  <div className="stat-label">Companies Hiring</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">96%</div>
                  <div className="stat-label">Placement Success</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">110+</div>
                  <div className="stat-label">Countries Covered</div>
                </div>
              </div>

              <div className="floating-badge">
                <div className="badge-icon">
                  <i className="fas fa-check" />
                </div>
                <div>
                  <div className="badge-text-main">New Match!</div>
                  <div className="badge-text-sub">Senior Dev — Google</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="container">
          <div className="services-intro fade-up">
            <p className="section-label">
              <i className="fas fa-layer-group me-2" />What We Offer
            </p>
            <h2 className="section-title">Our Services</h2>
            <p className="services-intro-desc">
              Practical support for candidates, and a clearer path to prepared talent for companies.
            </p>
          </div>
          <div className="services-grid">
            <article className="service-card fade-up">
              <div className="service-icon text-dark" aria-hidden="true">
                <i className="fas fa-users " />
              </div>
              <h3 className="service-title">For Candidates</h3>
              <p className="service-desc">
                Build momentum with a supportive group, practical projects, and focused interview preparation.
              </p>
              <h4 className="service-subtitle">Learn, build, and get noticed</h4>
              <ul className="service-list">
                <li>Learn and stay accountable with peers</li>
                <li>Build real projects and practice interviews</li>
                <li>Complete optional technical tasks</li>
                <li>Showcase verified skills from beginner to job-ready</li>
              </ul>
            </article>
            <article className="service-card fade-up">
              <div className="service-icon" aria-hidden="true">
                <i className="fas fa-chart-line" />
              </div>
              <h3 className="service-title">For Companies</h3>
              <p className="service-desc">
                Meet promising students and graduates who are screened, assessed, and prepared before they are recommended.
              </p>
              <h4 className="service-subtitle">A stronger candidate shortlist</h4>
              <ul className="service-list">
                <li>Access pre-screened, pre-evaluated candidates</li>
                <li>Review skills and verified project portfolios</li>
                <li>See collaboration and communication assessments</li>
                <li>Spend less time sourcing and more time interviewing</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="jobs-section" id="jobs">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-7 fade-up">
              <p className="section-label">
                <i className="fas fa-briefcase me-2" />Latest Openings
              </p>
              <h2 className="section-title">Featured Jobs</h2>
            </div>
            <div className="col-lg-5 text-lg-end mt-3 mt-lg-0 fade-up">
              <Link to="/candidates#candidates" className="btn-apply btn-browse">
                Browse All Jobs <i className="fas fa-arrow-right ms-1" />
              </Link>
            </div>
          </div>
          <div className="jobs-grid">
            <div className="fade-up">
              <div className="job-card">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="company-logo">G</div>
                  <div>
                    <div className="job-title">Senior UX Designer</div>
                    <div className="job-company">Google • San Francisco</div>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="job-badge badge-full">Full-time</span>
                  <span className="job-badge badge-remote">Remote OK</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="job-salary">$140K–$180K</span>
                  <Link to="/candidates#candidates" className="btn-apply">
                    Apply
                  </Link>
                </div>
              </div>
            </div>
            <div className="fade-up">
              <div className="job-card">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="company-logo" style={{ background: 'linear-gradient(135deg, #3a3a3a, #181818)', color: '#f3f3f3' }}>
                    MS
                  </div>
                  <div>
                    <div className="job-title">Cloud Architect</div>
                    <div className="job-company">Microsoft • Seattle</div>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="job-badge badge-full">Full-time</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="job-salary">$160K–$210K</span>
                  <Link to="/candidates#candidates" className="btn-apply">
                    Apply
                  </Link>
                </div>
              </div>
            </div>
            <div className="fade-up">
              <div className="job-card">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="company-logo" style={{ background: 'linear-gradient(135deg, #4a4a4a, #202020)', color: '#f3f3f3' }}>
                    SP
                  </div>
                  <div>
                    <div className="job-title">Growth Marketing Lead</div>
                    <div className="job-company">Spotify • Remote</div>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="job-badge badge-remote">Remote</span>
                  <span className="job-badge badge-full">Full-time</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="job-salary">$110K–$140K</span>
                  <Link to="/candidates#candidates" className="btn-apply">
                    Apply
                  </Link>
                </div>
              </div>
            </div>
            <div className="fade-up">
              <div className="job-card">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="company-logo" style={{ background: 'linear-gradient(135deg, #2c2c2c, #141414)', color: '#e7e7e7' }}>
                    SH
                  </div>
                  <div>
                    <div className="job-title">Full Stack Developer</div>
                    <div className="job-company">Shopify • Toronto</div>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="job-badge badge-full">Full-time</span>
                  <span className="job-badge badge-remote">Remote OK</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="job-salary">$120K–$155K</span>
                  <Link to="/candidates#candidates" className="btn-apply">
                    Apply
                  </Link>
                </div>
              </div>
            </div>
            <div className="fade-up">
              <div className="job-card">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="company-logo" style={{ background: 'linear-gradient(135deg, #444444, #1d1d1d)', color: '#f4f4f4' }}>
                    NF
                  </div>
                  <div>
                    <div className="job-title">Data Scientist</div>
                    <div className="job-company">Netflix • Los Angeles</div>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="job-badge badge-full">Full-time</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="job-salary">$145K–$185K</span>
                  <Link to="/candidates#candidates" className="btn-apply">
                    Apply
                  </Link>
                </div>
              </div>
            </div>
            <div className="fade-up">
              <div className="job-card">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="company-logo" style={{ background: 'linear-gradient(135deg, #3e3e3e, #1b1b1b)', color: '#f4f4f4' }}>
                    AB
                  </div>
                  <div>
                    <div className="job-title">Product Designer</div>
                    <div className="job-company">Airbnb • Remote</div>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="job-badge badge-remote">Remote</span>
                  <span className="job-badge badge-part">Contract</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="job-salary">$95K–$125K</span>
                  <Link to="/candidates#candidates" className="btn-apply">
                    Apply
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="container">
          <div className="about-wrapper">
            <div className="about-image fade-up">
              <div className="about-img-placeholder">
                <i className="fas fa-handshake" style={{ fontSize: '5rem', color: 'rgba(250, 250, 250, 0.682)', position: 'relative', zIndex: 1 }} />
                <div className="about-big-text">HHS</div>
              </div>
            </div>
            <div className="about-content fade-up">
              <p className="section-label" style={{ color: '#ffffff' }}>
                <i className="fas fa-info-circle me-2" />Our Story
              </p>
              <h2 className="section-title mb-4" style={{ color: '#ffffff' }}>
                We Bridge Talent
                <br />
                With Opportunity.
              </h2>
              <p style={{ color: '#ffffff', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.75 }}>
                Founded in 2026, HHS has helped over 200,000 professionals find careers they love — while helping thousands of companies build world-class teams. We believe the right match changes lives.
              </p>
              <div className="about-feature">
                <div className="about-feature-icon">
                  <i className="fas fa-shield-alt" />
                </div>
                <div>
                  <div className="about-feature-title">Verified Employers</div>
                  <div className="about-feature-desc">Every employer on our platform goes through verification to protect candidates.</div>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon">
                  <i className="fas fa-brain" />
                </div>
                <div>
                  <div className="about-feature-title">Companies</div>
                  <div className="about-feature-desc">Our platform give canditates based on their score level to you, Find your dream candidate.</div>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon">
                  <i className="fas fa-globe" />
                </div>
                <div>
                  <div className="about-feature-title">Global Reach</div>
                  <div className="about-feature-desc">With opportunities spanning 110+ countries, your next dream job could be anywhere in the world.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        <Footer />
    </div>
  )
}

export default HHS
