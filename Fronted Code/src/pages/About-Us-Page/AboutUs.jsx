import useScrollReveal from '../../hooks/useScrollReveal.js'
import './AboutUs.css'
import Navbar from '../../components/Navbar.jsx'
import AboutHero from './components/AboutHero.jsx'
import Footer from '../../components/Footer.jsx'

const MARQUEE_ITEMS = [
  'Built on potential',
  'Driven by people',
  'Made for meaningful work',
  'Connecting talent worldwide',
]

const AboutUs = () => {
  useScrollReveal('.reveal')

  return (
    <div className="about-us-page">
      <Navbar />
      <AboutHero />

      <div className="marquee-strip">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <span className="marquee-item" key={`${item}-${index}`}>
              <span className="m-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <section className="mission-section" id="mission">
        <div className="section-inner">
          <div className="section-tag reveal">Why We Exist</div>
          <h2 className="section-title reveal d1">MISSION &amp; VISION</h2>

          <div className="mission-grid">
            <div className="mission-card reveal d1">
              <span className="mission-card-num">M</span>
              <div className="mission-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className="mission-label">Our Mission</div>
              <div className="mission-title">Eliminate Friction From Hiring</div>
              <p className="mission-desc">We exist to make the connection between talented people and great companies as seamless, fair, and fast as possible. Every qualified person deserves access to their best opportunity — regardless of background, geography, or who they know.</p>
            </div>

            <div className="mission-card reveal d2">
              <span className="mission-card-num">V</span>
              <div className="mission-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className="mission-label">Our Vision</div>
              <div className="mission-title">A World Where Work Works For Everyone</div>
              <p className="mission-desc">We envision a future where every person on earth can discover work that is meaningful, well-compensated, and perfectly aligned with their unique potential — and where every company can build teams that unlock their full ambition.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="founder-values">
          <div className="values-title">Core Beliefs</div>
          <div className="values-list">
            <div className="value-item">
              <div className="value-num">01</div>
              <div>
                <div className="value-title">Talent is evenly distributed; opportunity is not.</div>
                <div className="value-desc">We believe every student deserves access to real career opportunities, regardless of background or experience level.</div>
              </div>
            </div>
            <div className="value-item">
              <div className="value-num">02</div>
              <div>
                <div className="value-title">Skills Matter More Than Certificates.</div>
                <div className="value-desc">We believe practical skills, real projects, and the ability to solve problems are more important than just academic grades or theoretical knowledge.</div>
              </div>
            </div>
            <div className="value-item">
              <div className="value-num">03</div>
              <div>
                <div className="value-title">Learning Is Stronger Together.</div>
                <div className="value-desc">We believe students grow faster when they learn, collaborate, and build projects together in supportive communities.</div>
              </div>
            </div>
            <div className="value-item">
              <div className="value-num">04</div>
              <div>
                <div className="value-title">Growth Through Real Experience.</div>
                <div className="value-desc">We believe the best way to prepare students for the professional world is through hands-on experience, real projects, and meaningful internships.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="section-inner">
          <div className="section-tag reveal">Our Journey</div>
          <h2 className="section-title reveal d1">FROM IDEA TO<br />GLOBAL PLATFORM</h2>

          <div className="timeline-wrap reveal d2">
            <div className="timeline-line" />
            <div className="tl-entries">
              <article className="tl-entry left">
                <div className="tl-card">
                  <div className="tl-year">2026</div>
                  <div className="tl-title">A Better Way to Connect</div>
                  <p className="tl-desc">
                    Founded by Iqra in Islamabad, HHS began with a simple idea: make meaningful work and great talent easier to find.
                  </p>
                </div>
                <div className="tl-dot"><span className="tl-dot-inner" /></div>
                <div className="tl-blank" />
              </article>
              <article className="tl-entry right">
                <div className="tl-blank" />
                <div className="tl-dot"><span className="tl-dot-inner" /></div>
                <div className="tl-card">
                  <div className="tl-year">Today</div>
                  <div className="tl-title">Built for Both Sides</div>
                  <p className="tl-desc">
                    Candidates build skills and find opportunities while companies meet prepared, promising talent.
                  </p>
                </div>
              </article>
              <article className="tl-entry left">
                <div className="tl-card">
                  <div className="tl-year">The Vision</div>
                  <div className="tl-title">Opportunity Without Borders</div>
                  <p className="tl-desc">
                    We are working toward a world where people everywhere can discover work that fits their potential.
                  </p>
                </div>
                <div className="tl-dot"><span className="tl-dot-inner" /></div>
                <div className="tl-blank" />
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-inner">
          <div className="services-header">
            <div>
              <div className="section-tag reveal">What We Offer</div>
              <h2 className="section-title reveal d1">OUR SERVICES &amp;<br />ADVANTAGES</h2>
            </div>
            <p className="section-desc reveal d2" style={{ marginTop: 0 }}>
              End-to-end solutions for candidates and companies — all under one roof.
            </p>
          </div>

          <div className="services-grid">
            <div className="srv-card reveal">
              <span className="srv-num">01</span>
              <div className="srv-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div className="srv-title">Candidates</div>
              <p className="srv-desc">We provide a comprehensive platform for job seekers to enhance their profiles, connect with opportunities they deserve, and advance their careers from day one. We believe in empowering candidates with the tools and resources they need to succeed in their job search and preparation.</p>
              <div className="srv-tags"><span className="s-tag">Guaranteed Jobs</span><span className="s-tag">Preparation</span><span className="s-tag">Real-Time Projects</span></div>
            </div>

            <div className="srv-card reveal d1">
              <span className="srv-num">02</span>
              <div className="srv-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div className="srv-title">Companies</div>
              <p className="srv-desc">We provide a comprehensive platform for companies to streamline their hiring process, find the right talent, and build a strong workforce without wasting their time and a lot of money.</p>
              <div className="srv-tags"><span className="s-tag">Time Saving</span><span className="s-tag">Hire in ~ 13 Days</span><span className="s-tag">Talented Candidates</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="awards-section">
        <div className="section-inner">
          <div className="section-tag reveal">Recognition</div>
          <h2 className="section-title reveal d1">AWARDS &amp;<br />RECOGNITION</h2>

          <div className="awards-grid">
            <div className="award-card reveal">
              <div className="award-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <div className="award-year">2021</div>
              <div className="award-title">Forbes 30 Under 30</div>
              <div className="award-by">Enterprise Technology</div>
            </div>

            <div className="award-card reveal d1">
              <div className="award-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className="award-year">2022</div>
              <div className="award-title">Best HR Tech Platform</div>
              <div className="award-by">TechCrunch Disrupt</div>
            </div>

            <div className="award-card reveal d2">
              <div className="award-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
                </svg>
              </div>
              <div className="award-year">2023</div>
              <div className="award-title">Most Influential Leader</div>
              <div className="award-by">HR Technology Magazine</div>
            </div>

            <div className="award-card reveal d3">
              <div className="award-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="award-year">2024</div>
              <div className="award-title">Top Workplace for Inclusion</div>
              <div className="award-by">Glassdoor Awards</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutUs
