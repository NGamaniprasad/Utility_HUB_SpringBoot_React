import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-container">

          <span className="about-label">
            ABOUT UTILITYHUB
          </span>

          <h1>
            Everything useful,
            <br />
            <span>in one place.</span>
          </h1>

          <p className="about-intro">
            UtilityHub is a simple and modern platform that
            brings useful everyday utilities together so you
            can complete common tasks faster and easier.
          </p>

        </div>
      </section>


      {/* Mission Section */}
      <section className="about-mission">
        <div className="about-container about-two-column">

          <div className="about-heading">
            <span className="about-label">
              OUR MISSION
            </span>

            <h2>
              Making everyday
              <br />
              tasks <span>simpler.</span>
            </h2>
          </div>

          <div className="about-text">
            <p>
              We believe simple tasks should not require
              complicated workflows or multiple websites.
            </p>

            <p>
              UtilityHub brings different categories of
              useful tools into one organized platform,
              giving users a convenient place to get things
              done.
            </p>

            <p>
              Our focus is on simplicity, usability and a
              clean experience that anyone can understand.
            </p>
          </div>

        </div>
      </section>


      {/* Features Section */}
      <section className="about-features">
        <div className="about-container">

          <div className="about-section-header">
            <span className="about-label">
              WHY UTILITYHUB
            </span>

            <h2>
              Designed for
              <br />
              <span>everyday use.</span>
            </h2>

            <p>
              A straightforward platform focused on making
              useful tools easier to access.
            </p>
          </div>


          <div className="about-feature-grid">

            <article className="about-feature-card">
              <div className="feature-icon">
                01
              </div>

              <h3>Simple</h3>

              <p>
                Clean interfaces and straightforward
                workflows make utilities easy to use.
              </p>
            </article>


            <article className="about-feature-card">
              <div className="feature-icon">
                02
              </div>

              <h3>Organized</h3>

              <p>
                Tools are arranged into clear categories
                so you can quickly find what you need.
              </p>
            </article>


            <article className="about-feature-card">
              <div className="feature-icon">
                03
              </div>

              <h3>Accessible</h3>

              <p>
                UtilityHub is designed to provide a
                consistent experience across devices.
              </p>
            </article>

          </div>

        </div>
      </section>


      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-container">

          <span className="about-label">
            GET STARTED
          </span>

          <h2>
            Ready to make things
            <br />
            <span>simpler?</span>
          </h2>

          <p>
            Create your UtilityHub account and start
            exploring useful tools.
          </p>

          <div className="about-cta-actions">

            <Link
              to="/register"
              className="about-primary-button"
            >
              Create Account
              <span>→</span>
            </Link>

            <Link
              to="/"
              className="about-secondary-button"
            >
              Back to Home
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}

export default About;