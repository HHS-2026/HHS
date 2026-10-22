import './Ask.css'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes'

const choices = [
  {
    key: 'hire',
    className: 'hire-btn',
    href: ROUTES.companies,
    title: 'I want to hire',
    description: 'Find prepared talent for your team',
  },
  {
    key: 'work',
    className: 'work-btn',
    href: ROUTES.candidates,
    title: 'I want to get hired',
    description: 'Explore roles and grow your career',
  },
]

function Ask() {
  return (
    <main className="hire-container">
      <Link className="ask-home-link" to={ROUTES.home} aria-label="Return to Hire and Hired Stars home">
        <span className="ask-brand-mark" aria-hidden="true">H</span>
        <span>Hire and Hired Stars</span>
      </Link>

      <section className="hire-box" aria-labelledby="ask-title">
        <p className="ask-eyebrow">One platform. Two paths.</p>
        <h1 className="ask-title" id="ask-title">Welcome</h1>
        <p className="ask-subtitle">How would you like to get started?</p>

        <div className="ask-buttons">
          {choices.map(({ key, className, href, title, description }) => (
            <Link key={key} className={`ask-choice ${className}`} to={href}>
              <span className="ask-choice-icon" aria-hidden="true">↗</span>
              <span className="ask-choice-copy">
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
              <span className="ask-choice-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Ask