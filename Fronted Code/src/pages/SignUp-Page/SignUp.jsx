import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import "./SignUp.css";

function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(
      "Account registration is not available yet. Please check back soon.",
    );
  }

  return (
    <main className="signup-page">
      <div className="signup-shell">
        <Link
          className="signup-brand"
          to={ROUTES.home}
          aria-label="Hire and Hired Stars home"
        >
          <span className="signup-brand-mark" aria-hidden="true">
            H
          </span>
          <span>Hire and Hired Stars</span>
        </Link>

        <div className="signup-layout">
          <section className="signup-intro" aria-labelledby="signup-welcome">
            <p className="signup-eyebrow">
              <span aria-hidden="true" /> YOUR NEXT CHAPTER STARTS HERE
            </p>
            <h1 id="signup-welcome">
              Make your
              <br />
              next move <span>matter.</span>
            </h1>
            <p className="signup-intro-copy">
              Meet the people and opportunities that move your future forward.
              Your next chapter starts with one small step.
            </p>

            <div className="signup-highlight">
              <span className="signup-highlight-icon" aria-hidden="true">
                ✦
              </span>
              <span>
                <strong>A better match starts here.</strong>
                <small>
                  Thoughtful connections for ambitious people and teams.
                </small>
              </span>
            </div>

            <p className="signup-community">
              Built for people ready to do meaningful work.
            </p>
          </section>

          <section className="signup-card" aria-labelledby="signup-title">
            <div className="signup-card-heading">
              <p className="signup-card-kicker">GET STARTED</p>
              <h2 id="signup-title">Create your account</h2>
              <p>It only takes a moment to get started.</p>
            </div>

            <form className="signup-form" onSubmit={handleSubmit}>
              <label className="signup-field-label" htmlFor="signup-name">
                Full name
              </label>
              <input
                className="signup-input"
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                required
              />

              <label className="signup-field-label" htmlFor="signup-email">
                Email address
              </label>
              <input
                className="signup-input"
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />

              <label className="signup-field-label" htmlFor="signup-password">
                Password
              </label>
              <div className="signup-password-field">
                <input
                  className="signup-input"
                  id="signup-password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                />
                <button
                  className="signup-password-toggle"
                  type="button"
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                  aria-pressed={passwordVisible}
                  onClick={() => setPasswordVisible((visible) => !visible)}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
              <p className="signup-password-hint">
                Use at least 8 characters for a stronger password.
              </p>

              <label className="signup-consent">
                <input type="checkbox" name="terms" required />
                <span>
                  I agree to the{" "}
                  <a href="mailto:support@hireandhiredstars.com?subject=Terms%20of%20service">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="mailto:support@hireandhiredstars.com?subject=Privacy%20policy">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              <button className="signup-submit" type="submit">
                Create account <span aria-hidden="true">↗</span>
              </button>
              {message && (
                <p className="signup-status" role="status">
                  {message}
                </p>
              )}
            </form>

            <p className="signup-login">
              Already have an account? <Link to={ROUTES.login}>Log in</Link>
            </p>
          </section>
        </div>

        <footer className="signup-footer">
          <span>© {new Date().getFullYear()} Hire and Hired Stars</span>
          <Link to={ROUTES.home}>
            Back to home <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </main>
  );
}

export default SignUp;