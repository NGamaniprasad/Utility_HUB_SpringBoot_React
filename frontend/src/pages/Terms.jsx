import { Link } from "react-router-dom";
import "./Terms.css";

function Terms() {
  return (
    <div className="terms-page">

      {/* Hero */}
      <section className="terms-hero">
        <div className="terms-container">

          <span className="terms-label">
            LEGAL
          </span>

          <h1>
            Terms of
            <br />
            <span>Use.</span>
          </h1>

          <p>
            Please read these terms carefully before using
            UtilityHub and its services.
          </p>

          <div className="terms-updated">
            Last updated: August 2026
          </div>

        </div>
      </section>


      {/* Content */}
      <section className="terms-content">
        <div className="terms-container terms-layout">

          {/* Sidebar */}
          <aside className="terms-sidebar">

            <span>CONTENTS</span>

            <a href="#acceptance">
              01 &nbsp; Acceptance
            </a>

            <a href="#services">
              02 &nbsp; Our Services
            </a>

            <a href="#accounts">
              03 &nbsp; User Accounts
            </a>

            <a href="#acceptable-use">
              04 &nbsp; Acceptable Use
            </a>

            <a href="#intellectual-property">
              05 &nbsp; Intellectual Property
            </a>

            <a href="#disclaimer">
              06 &nbsp; Disclaimer
            </a>

            <a href="#changes">
              07 &nbsp; Changes
            </a>

          </aside>


          {/* Main Content */}
          <article className="terms-document">

            <section id="acceptance">
              <span className="terms-number">01</span>

              <h2>Acceptance of Terms</h2>

              <p>
                By accessing or using UtilityHub, you agree
                to be bound by these Terms of Use. If you do
                not agree with these terms, please do not use
                the platform.
              </p>

              <p>
                These terms apply to all visitors, registered
                users and anyone who accesses or uses
                UtilityHub.
              </p>
            </section>


            <section id="services">
              <span className="terms-number">02</span>

              <h2>Our Services</h2>

              <p>
                UtilityHub provides a collection of online
                utilities designed to help users perform
                everyday calculations, conversions, text
                operations, development tasks and other
                supported activities.
              </p>

              <p>
                We may add, modify, improve or remove
                utilities and features from the platform
                from time to time.
              </p>
            </section>


            <section id="accounts">
              <span className="terms-number">03</span>

              <h2>User Accounts</h2>

              <p>
                Some UtilityHub features may require you to
                create an account. You are responsible for
                providing accurate information and keeping
                your account credentials secure.
              </p>

              <p>
                You are responsible for activities performed
                through your account. Please contact us if you
                believe your account has been accessed without
                authorization.
              </p>
            </section>


            <section id="acceptable-use">
              <span className="terms-number">04</span>

              <h2>Acceptable Use</h2>

              <p>
                You agree to use UtilityHub only for lawful
                purposes and in a manner that does not
                interfere with the operation of the platform.
              </p>

              <ul>
                <li>
                  Do not attempt to gain unauthorized access.
                </li>

                <li>
                  Do not intentionally disrupt or damage the
                  platform.
                </li>

                <li>
                  Do not use the service for unlawful
                  activities.
                </li>

                <li>
                  Do not attempt to misuse or abuse platform
                  functionality.
                </li>
              </ul>
            </section>


            <section id="intellectual-property">
              <span className="terms-number">05</span>

              <h2>Intellectual Property</h2>

              <p>
                The UtilityHub platform, including its design,
                branding, original content and software, may
                be protected by applicable intellectual
                property laws.
              </p>

              <p>
                You may not reproduce, distribute or modify
                protected UtilityHub content without
                appropriate permission.
              </p>
            </section>


            <section id="disclaimer">
              <span className="terms-number">06</span>

              <h2>Disclaimer</h2>

              <p>
                UtilityHub is provided on an "as available"
                basis. While we aim to provide useful and
                reliable utilities, we do not guarantee that
                every feature will always be available,
                error-free or uninterrupted.
              </p>

              <p>
                Users should independently verify important
                results before relying on them for critical
                decisions.
              </p>
            </section>


            <section id="changes">
              <span className="terms-number">07</span>

              <h2>Changes to These Terms</h2>

              <p>
                We may update these Terms of Use when
                necessary. Updated terms will be reflected on
                this page with a revised update date.
              </p>

              <p>
                Continued use of UtilityHub after changes are
                published means you acknowledge the updated
                terms.
              </p>
            </section>


            <div className="terms-contact-box">

              <div>
                <span>QUESTIONS?</span>

                <h3>
                  Need clarification?
                </h3>
              </div>

              <Link to="/contact">
                Contact Us →
              </Link>

            </div>

          </article>

        </div>
      </section>

    </div>
  );
}

export default Terms;