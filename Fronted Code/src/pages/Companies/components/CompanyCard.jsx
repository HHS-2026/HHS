function CompanyCard({ company, badge, index }) {
  return (
    <article
      className="company-row reveal"
      style={{ transitionDelay: `${index * 0.04}s` }}
    >
      <div className="company-logo-box">{company.initials}</div>
      <div className="company-info">
        <div className="company-name">{company.name}</div>
        <div className="company-sub">
          <span>{company.sector}</span>
          <span className="company-sub-dot" />
          <span>{company.country}</span>
          <span className="company-sub-dot" />
          <span>{company.size}</span>
        </div>
      </div>
      {badge && <span className={`company-badge ${badge.cls}`}>{badge.label}</span>}
      <div className="company-open-roles">
        <div className="company-jobs">{company.jobs}</div>
        <div className="company-jobs-lbl">Open Roles</div>
      </div>
      <div className="company-arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </article>
  )
}

export default CompanyCard
