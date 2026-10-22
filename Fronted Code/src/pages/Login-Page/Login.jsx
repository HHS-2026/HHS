import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { loginUser } from '../../features/auth/services/authService'
import "./Login.css";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  async function handleSubmit(event) {
  event.preventDefault()
  setMessage('')
  setLoading(true)

  const formData = new FormData(event.currentTarget)

  const credentials = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

try {
  const response = await loginUser(credentials);

  const data = response.data;

  if (!data?.token) {
    throw new Error("Login response did not include a token");
  }

  const role = data.user?.role?.toLowerCase()
  if (role === 'candidate') {
    sessionStorage.setItem('token', data.token)
    navigate(ROUTES.candidateProfile)
  } else if (['company', 'company_admin', 'company_member', 'employer', 'recruiter'].includes(role)) {
    sessionStorage.setItem('token', data.token)
    navigate(ROUTES.companyProfile)
  } else {
    setMessage('This account does not have an HHS candidate or company role.')
  }
} catch (error) {
  setMessage(error.message || "Login failed. Please try again.");
} finally {
  setLoading(false);
}
  }

  return (
    <main className="login-page">
      <div className="login-shell">
        <Link
          className="login-brand"
          to={ROUTES.home}
          aria-label="Hire and Hired Stars home"
        >
          <span className="login-brand-mark" aria-hidden="true">
            H
          </span>
          <span>Hire and Hired Stars</span>
        </Link>

        <div className="login-layout">
          <section className="login-intro" aria-labelledby="login-welcome">
            <p className="login-eyebrow">
              <span /> YOUR NEXT CHAPTER STARTS HERE
            </p>
            <h1 id="login-welcome">
              Good to see
              <br />
              you <span>again.</span>
            </h1>
            <p className="login-intro-copy">
              Pick up where you left off. Your next great opportunity is closer
              than you think.
            </p>

            <div className="login-quote">
              <div className="login-quote-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote>
                “The right connection can change everything. I found mine here.”
              </blockquote>
              <div className="login-quote-person">
                <span className="login-avatar" aria-hidden="true">
                  JM
                </span>
                <span>
                  <strong>Jordan M.</strong>
                  <small>Found their next role</small>
                </span>
              </div>
            </div>
            <p className="login-community">
              <span aria-hidden="true">✦</span> A community built around what
              comes next.
            </p>
          </section>

          <section className="login-card" aria-labelledby="login-title">
            <div className="login-card-heading">
              <p className="login-card-kicker">WELCOME BACK</p>
              <h2 id="login-title">Log in to your account</h2>
              <p>Enter your details to continue.</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />

              <div className="login-password-label">
                <label htmlFor="login-password">Password</label>
                <a href="mailto:support@hireandhiredstars.com?subject=Password%20help">
                  Forgot password?
                </a>
              </div>
              <div className="login-password-field">
                <input
                  id="login-password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                />
                <button
                  className="login-password-toggle"
                  type="button"
                  aria-label={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                  aria-pressed={passwordVisible}
                  onClick={() => setPasswordVisible((visible) => !visible)}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>

              <label className="login-remember">
                <input type="checkbox" name="remember" />
                <span>Keep me logged in</span>
              </label>

              <button className="login-submit" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
                {!loading && <span aria-hidden="true">↗</span>}
              </button>
              {message && (
                <p className="login-status" role="status">
                  {message}
                </p>
              )}
            </form>

            <p className="login-signup">
              New to Hire and Hired Stars?{" "}
              <Link to={ROUTES.signup}>Create an account</Link>
            </p>
            <p className="login-terms">
              By continuing, you agree to our{" "}
              <a href="mailto:support@hireandhiredstars.com?subject=Terms%20of%20service">
                Terms
              </a>{" "}
              and{" "}
              <a href="mailto:support@hireandhiredstars.com?subject=Privacy%20policy">
                Privacy Policy
                </a>
                .
            </p>
          </section>
        </div>
        <footer className="login-footer">
          <span>© {new Date().getFullYear()} Hire and Hired Stars</span>
          <Link to={ROUTES.home}>
            Back to home <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </main>
  );
}

export default Login;
