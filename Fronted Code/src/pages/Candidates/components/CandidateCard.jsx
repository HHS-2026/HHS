function CandidateCard({ candidate, badge, index, pageSize }) {
  const stars = Array.from(
    { length: 5 },
    (_, starIndex) => (starIndex < candidate.rating ? '★' : '☆'),
  ).join('')

  return (
    <article
      className="candidate-card reveal"
      style={{ transitionDelay: `${(index % pageSize) * 0.06}s` }}
    >
      <div className="candidate-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="candidate-avatar">{candidate.initials}</div>
          <div>
            <div className="candidate-name">{candidate.name}</div>
            <div className="candidate-role">{candidate.role}</div>
          </div>
        </div>
        <span className={`candidate-badge ${badge.cls}`}>{badge.label}</span>
      </div>
      <div className="candidate-meta">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {candidate.location}
        <span className="c-dot" />
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        {candidate.exp} exp.
      </div>
      <div className="skill-tags">
        {candidate.skills.map((skill) => (
          <span className="skill-tag" key={skill}>{skill}</span>
        ))}
      </div>
      <div className="candidate-footer">
        <div>
          <div className="candidate-salary">
            {candidate.salary}
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '11px', fontWeight: 500, color: 'var(--t4)' }}> /yr</span>
          </div>
          <div className="candidate-salary-lbl">Expected</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <div className="rating-stars" role="img" aria-label={`${candidate.rating} out of 5 stars`}>
            {stars}
          </div>
        </div>
      </div>
    </article>
  )
}

export default CandidateCard
