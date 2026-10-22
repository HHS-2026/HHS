import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from '../routes.js'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'About Us' },
  { to: '/companies', label: 'Companies' },
  { to: '/candidates', label: 'Candidates' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <div className="site-nav-inner">
        <Link className="site-nav-brand" to="/" onClick={() => setMenuOpen(false)}>
          Hire and Hired Stars
        </Link>
        <button
          className="site-nav-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`site-nav-menu${menuOpen ? ' is-open' : ''}`}>
          <ul className="site-nav-links">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link className="site-nav-cta" to={ROUTES.login} onClick={() => setMenuOpen(false)}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
