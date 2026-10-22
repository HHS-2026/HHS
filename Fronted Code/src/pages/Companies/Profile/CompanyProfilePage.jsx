import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../routes.js'
import {
  getCompanyProfile,
  saveCompanyProfile,
  saveRecruiterProfile,
} from './companyProfileService.js'
import './CompanyProfilePage.css'

const initialCompany = {
  legalName: '',
  brandName: '',
  website: '',
  companyEmail: '',
  country: '',
  city: '',
  businessAddress: '',
  registrationNumber: '',
  evidenceDescription: '',
  evidenceFile: null,
  businessPhone: '',
  applicantName: '',
  applicantTitle: '',
  applicantIdentityEvidence: null,
  applicantAuthorized: false,
  acceptEmployerPolicies: false,
  acceptAntiFraudRules: false,
}

const initialRecruiter = {
  fullName: '',
  email: '',
  phone: '',
  jobTitle: '',
  responsibilities: '',
  companyEmail: '',
  affiliationProof: '',
  administratorName: '',
  administratorEmail: '',
  administratorConfirmed: false,
  identityEvidence: null,
  acceptConductPolicy: false,
  acceptPrivacyPolicy: false,
  acceptAntiFraudRules: false,
}

const statusLabel = (status) => {
  if (status === 'verified' || status === 'approved') return 'Verified'
  if (status === 'rejected') return 'Needs attention'
  if (status === 'pending' || status === 'under_review') return 'Under review'
  return 'Not submitted'
}

function StatusBadge({ status }) {
  const verified = status === 'verified' || status === 'approved'
  const pending = status === 'pending' || status === 'under_review'

  return (
    <span className={`verification-badge${verified ? ' is-verified' : ''}${pending ? ' is-pending' : ''}`}>
      <span aria-hidden="true">{verified ? '✓' : pending ? '◷' : '•'}</span>
      {statusLabel(status)}
    </span>
  )
}

function Field({ label, name, value, onChange, type = 'text', required = false, placeholder = '', autoComplete }) {
  return (
    <label className="company-profile-field">
      <span>{label}{required && <span className="required-mark"> *</span>}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
      />
    </label>
  )
}

function FileField({ label, name, onChange, accept = '.pdf,.png,.jpg,.jpeg' }) {
  return (
    <label className="company-profile-field">
      <span>{label}</span>
      <input
        className="company-profile-file"
        name={name}
        type="file"
        accept={accept}
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
      <small>PDF or image file. Only submit documentation needed for verification.</small>
    </label>
  )
}

function Consent({ name, checked, onChange, children }) {
  return (
    <label className="company-profile-consent">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} required />
      <span>{children}</span>
    </label>
  )
}

function CompanyProfilePage() {
  const hasSession = Boolean(sessionStorage.getItem('token'))
  const [company, setCompany] = useState(initialCompany)
  const [recruiter, setRecruiter] = useState(initialRecruiter)
  const [companyStatus, setCompanyStatus] = useState('not_submitted')
  const [recruiterStatus, setRecruiterStatus] = useState('not_submitted')
  const [activeTab, setActiveTab] = useState('company')
  const [loading, setLoading] = useState(hasSession)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    if (!hasSession) return

    let active = true
    getCompanyProfile()
      .then((profile) => {
        if (!active || !profile) return
        setCompanyStatus(profile.verificationStatus ?? profile.status ?? 'not_submitted')
        setRecruiterStatus(profile.recruiterVerificationStatus ?? 'not_submitted')
        if (profile.company) {
          setCompany((current) => ({ ...current, ...profile.company }))
        }
      })
      .catch((error) => {
        if (active) {
          setMessage(error.message)
          setMessageType('error')
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [hasSession])

  const update = (setter) => (event) => {
    const { name, value, type, checked } = event.target
    setter((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const verifiedCompany = companyStatus === 'verified' || companyStatus === 'approved'

  async function submitCompany(event) {
    event.preventDefault()
    if (!hasSession) {
      setMessage('Please log in before submitting your company application.')
      setMessageType('error')
      return
    }
    setSaving(true)
    setMessage('')
    try {
      const result = await saveCompanyProfile(company)
      setCompanyStatus(result.verificationStatus ?? result.status ?? 'pending')
      setMessage('Company application submitted. Recruiter applications open after HHS verifies this company.')
      setMessageType('success')
    } catch (error) {
      setMessage(error.message)
      setMessageType('error')
    } finally {
      setSaving(false)
    }
  }

  async function submitRecruiter(event) {
    event.preventDefault()
    if (!hasSession) {
      setMessage('Please log in before submitting your recruiter application.')
      setMessageType('error')
      return
    }
    if (!verifiedCompany) {
      setMessage('The company must be verified before a recruiter can apply.')
      setMessageType('error')
      return
    }
    if (!recruiter.companyEmail && !recruiter.affiliationProof.trim()) {
      setMessage('Add a company-specific email or describe another way to verify your affiliation.')
      setMessageType('error')
      return
    }

    setSaving(true)
    setMessage('')
    try {
      const result = await saveRecruiterProfile(recruiter)
      setRecruiterStatus(result.verificationStatus ?? result.status ?? 'pending')
      setMessage('Recruiter application submitted. This account will be reviewed separately from the company.')
      setMessageType('success')
    } catch (error) {
      setMessage(error.message)
      setMessageType('error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="company-profile-page">
      <header className="company-profile-topbar">
        <Link className="company-profile-brand" to={ROUTES.home}>
          <span className="company-profile-mark" aria-hidden="true">H</span>
          <span>HIRE AND HIRED STARS</span>
        </Link>
        <Link className="company-profile-back" to={ROUTES.companies}>← Companies</Link>
      </header>

      <div className="company-profile-shell">
        <section className="company-profile-intro">
          <p className="company-profile-kicker">EMPLOYER VERIFICATION</p>
          <h1>Build your company profile.<br /><span>Earn trust, one step at a time.</span></h1>
          <p className="company-profile-lede">
            Verify your organization first. Every person recruiting through HHS must then apply and be approved on their own.
          </p>
        </section>

        <section className="company-verification-flow" aria-label="Verification stages">
          <div className={`verification-stage${verifiedCompany ? ' is-complete' : ' is-current'}`}>
            <span className="verification-stage-number">{verifiedCompany ? '✓' : '01'}</span>
            <span><strong>Company verification</strong><small>Organization review</small></span>
            <StatusBadge status={companyStatus} />
          </div>
          <span className="verification-stage-connector" aria-hidden="true" />
          <div className={`verification-stage${verifiedCompany ? ' is-current' : ' is-locked'}`}>
            <span className="verification-stage-number">02</span>
            <span><strong>Recruiter verification</strong><small>Individual review</small></span>
            <StatusBadge status={recruiterStatus} />
          </div>
        </section>

        <div className="company-profile-workspace">
          <aside className="company-profile-sidebar">
            <p className="company-profile-sidebar-title">APPLICATIONS</p>
            <button
              className={`company-profile-tab${activeTab === 'company' ? ' is-active' : ''}`}
              type="button"
              onClick={() => setActiveTab('company')}
            >
              <span className="company-profile-tab-icon">01</span>
              <span><strong>Company profile</strong><small>Required first</small></span>
              <StatusBadge status={companyStatus} />
            </button>
            <button
              className={`company-profile-tab${activeTab === 'recruiter' ? ' is-active' : ''}`}
              type="button"
              disabled={!verifiedCompany}
              onClick={() => setActiveTab('recruiter')}
            >
              <span className="company-profile-tab-icon">02</span>
              <span><strong>My recruiter profile</strong><small>{verifiedCompany ? 'Individual approval' : 'Unlocks after company verification'}</small></span>
              <StatusBadge status={recruiterStatus} />
            </button>
            <div className="company-profile-security-note">
              <span aria-hidden="true">◈</span>
              <p><strong>Separate approvals</strong>Your company approval never verifies its employees automatically.</p>
            </div>
          </aside>

          <section className="company-profile-form-panel">
            {!hasSession && (
              <p className="company-profile-message is-error" role="status">
                Log in with your company or recruiter account before submitting an application.{' '}
                <Link to={ROUTES.login}>Log in</Link>
              </p>
            )}
            {message && (
              <p className={`company-profile-message is-${messageType}`} role="status" aria-live="polite">
                {message}
              </p>
            )}
            {loading && <p className="company-profile-loading" role="status">Loading your application status…</p>}

            {activeTab === 'company' ? (
              <form className="company-profile-form" onSubmit={submitCompany}>
                <div className="company-form-heading">
                  <div>
                    <p className="company-profile-kicker">STAGE 01 · ORGANIZATION</p>
                    <h2>Company application</h2>
                    <p>Share the details HHS needs to confirm your organization is legitimate.</p>
                  </div>
                  <StatusBadge status={companyStatus} />
                </div>

                <fieldset disabled={saving || loading || verifiedCompany}>
                  <div className="company-profile-section">
                    <h3>Company details</h3>
                    <div className="company-profile-grid">
                      <Field label="Registered or legal business name" name="legalName" value={company.legalName} onChange={update(setCompany)} required autoComplete="organization" />
                      <Field label="Public brand name" name="brandName" value={company.brandName} onChange={update(setCompany)} required />
                      <Field label="Official website" name="website" value={company.website} onChange={update(setCompany)} type="url" placeholder="https://example.com" />
                      <Field label="Company-domain email" name="companyEmail" value={company.companyEmail} onChange={update(setCompany)} type="email" placeholder="you@company.com" />
                      <Field label="Country" name="country" value={company.country} onChange={update(setCompany)} required autoComplete="country-name" />
                      <Field label="City" name="city" value={company.city} onChange={update(setCompany)} required autoComplete="address-level2" />
                      <Field label="Business address (if applicable)" name="businessAddress" value={company.businessAddress} onChange={update(setCompany)} autoComplete="street-address" />
                      <Field label="Business phone or reliable contact" name="businessPhone" value={company.businessPhone} onChange={update(setCompany)} type="tel" required autoComplete="tel" />
                    </div>
                  </div>

                  <div className="company-profile-section">
                    <h3>Registration and evidence</h3>
                    <div className="company-profile-grid">
                      <Field label="Business registration number (if applicable)" name="registrationNumber" value={company.registrationNumber} onChange={update(setCompany)} />
                      <FileField label="Registration or supporting document" name="evidenceFile" onChange={(file) => setCompany((current) => ({ ...current, evidenceFile: file }))} />
                    </div>
                    <label className="company-profile-field company-profile-field-wide">
                      <span>Describe your registration or alternative evidence <span className="required-mark">*</span></span>
                      <textarea name="evidenceDescription" value={company.evidenceDescription} onChange={update(setCompany)} rows="3" required placeholder="For example: registration certificate, nonprofit status, sole proprietor documentation, or another suitable proof for your legal structure." />
                    </label>
                  </div>

                  <div className="company-profile-section">
                    <h3>Authorized applicant</h3>
                    <div className="company-profile-grid">
                      <Field label="Your full legal name" name="applicantName" value={company.applicantName} onChange={update(setCompany)} required autoComplete="name" />
                      <Field label="Your title / authority at the company" name="applicantTitle" value={company.applicantTitle} onChange={update(setCompany)} required />
                      <FileField label="Applicant identity evidence (if requested)" name="applicantIdentityEvidence" onChange={(file) => setCompany((current) => ({ ...current, applicantIdentityEvidence: file }))} />
                    </div>
                    <p className="company-profile-verification-copy">HHS may request identity evidence or use an identity verification provider to confirm the applicant's identity and authority.</p>
                    <div className="company-profile-consents">
                      <Consent name="applicantAuthorized" checked={company.applicantAuthorized} onChange={update(setCompany)}>
                        I am authorized to submit this application on behalf of the company.
                      </Consent>
                      <Consent name="acceptEmployerPolicies" checked={company.acceptEmployerPolicies} onChange={update(setCompany)}>
                        I accept the HHS employer policies.
                      </Consent>
                      <Consent name="acceptAntiFraudRules" checked={company.acceptAntiFraudRules} onChange={update(setCompany)}>
                        I confirm this application is accurate and accept HHS anti-fraud rules.
                      </Consent>
                    </div>
                  </div>

                  <div className="company-profile-submit-row">
                    <p>Submitting starts a review. It does not immediately verify the company.</p>
                    <button className="company-profile-submit" type="submit">
                      {saving ? 'Submitting…' : companyStatus === 'not_submitted' ? 'Submit company for review' : 'Update company application'}
                      <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </fieldset>
                {verifiedCompany && (
                  <p className="company-profile-locked-note">This company has been verified. Its submitted profile is locked; contact HHS to make a change.</p>
                )}
              </form>
            ) : (
              <form className="company-profile-form" onSubmit={submitRecruiter}>
                <div className="company-form-heading">
                  <div>
                    <p className="company-profile-kicker">STAGE 02 · INDIVIDUAL</p>
                    <h2>Recruiter application</h2>
                    <p>Apply with your own account. Company verification does not approve individual recruiters.</p>
                  </div>
                  <StatusBadge status={recruiterStatus} />
                </div>
                <fieldset disabled={saving || loading || recruiterStatus === 'verified' || recruiterStatus === 'approved'}>
                  <div className="company-profile-section">
                    <h3>Your details</h3>
                    <div className="company-profile-grid">
                      <Field label="Full legal name" name="fullName" value={recruiter.fullName} onChange={update(setRecruiter)} required autoComplete="name" />
                      <Field label="Your account email" name="email" value={recruiter.email} onChange={update(setRecruiter)} type="email" required autoComplete="email" />
                      <Field label="Phone number" name="phone" value={recruiter.phone} onChange={update(setRecruiter)} type="tel" required autoComplete="tel" />
                      <Field label="Job title" name="jobTitle" value={recruiter.jobTitle} onChange={update(setRecruiter)} required />
                    </div>
                    <label className="company-profile-field company-profile-field-wide">
                      <span>Recruiting responsibilities <span className="required-mark">*</span></span>
                      <textarea name="responsibilities" value={recruiter.responsibilities} onChange={update(setRecruiter)} rows="3" required placeholder="What roles do you recruit for, and what hiring responsibilities do you hold?" />
                    </label>
                  </div>

                  <div className="company-profile-section">
                    <h3>Company affiliation</h3>
                    <div className="company-profile-grid">
                      <Field label="Company-specific email" name="companyEmail" value={recruiter.companyEmail} onChange={update(setRecruiter)} type="email" placeholder="you@company.com" />
                      <Field label="Authorized administrator's name" name="administratorName" value={recruiter.administratorName} onChange={update(setRecruiter)} required />
                      <Field label="Administrator's company email" name="administratorEmail" value={recruiter.administratorEmail} onChange={update(setRecruiter)} type="email" required />
                    </div>
                    <label className="company-profile-field company-profile-field-wide">
                      <span>Alternative proof of affiliation (if no company email)</span>
                      <textarea name="affiliationProof" value={recruiter.affiliationProof} onChange={update(setRecruiter)} rows="2" placeholder="Describe another way HHS can confirm your affiliation." />
                    </label>
                    <Consent name="administratorConfirmed" checked={recruiter.administratorConfirmed} onChange={update(setRecruiter)}>
                      The authorized administrator named above has confirmed my authority to recruit for this company.
                    </Consent>
                  </div>

                  <div className="company-profile-section">
                    <h3>Verification and conduct</h3>
                    <div className="company-profile-grid">
                      <FileField label="Identity verification document (only if requested)" name="identityEvidence" onChange={(file) => setRecruiter((current) => ({ ...current, identityEvidence: file }))} />
                      <p className="company-profile-verification-copy">Your email and phone must be verified before approval. HHS may request identity verification through a reputable provider when warranted.</p>
                    </div>
                    <div className="company-profile-consents">
                      <Consent name="acceptConductPolicy" checked={recruiter.acceptConductPolicy} onChange={update(setRecruiter)}>
                        I accept the HHS recruiter conduct policy.
                      </Consent>
                      <Consent name="acceptPrivacyPolicy" checked={recruiter.acceptPrivacyPolicy} onChange={update(setRecruiter)}>
                        I will protect candidate information and follow HHS privacy requirements.
                      </Consent>
                      <Consent name="acceptAntiFraudRules" checked={recruiter.acceptAntiFraudRules} onChange={update(setRecruiter)}>
                        I accept HHS anti-fraud rules and confirm my information is accurate.
                      </Consent>
                    </div>
                  </div>

                  <div className="company-profile-submit-row">
                    <p>This application is reviewed separately from the company.</p>
                    <button className="company-profile-submit" type="submit">
                      {saving ? 'Submitting…' : 'Submit recruiter for review'}
                      <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </fieldset>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default CompanyProfilePage
