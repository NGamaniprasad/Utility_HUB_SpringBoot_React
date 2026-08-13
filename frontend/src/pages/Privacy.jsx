import { Link } from "react-router-dom";
import "./Privacy.css";

function Privacy() {
  return (
    <div className="privacy-page">

      {/* Hero */}
      <section className="privacy-hero">
        <div className="privacy-container">

          <span className="privacy-label">
            LEGAL
          </span>

          <h1>
            Privacy
            <br />
            <span>Policy.</span>
          </h1>

          <p>
            Learn how UtilityHub handles information when
            you use our platform.
          </p>

          <div className="privacy-updated">
            Last updated: August 2026
          </div>

        </div>
      </section>


      {/* Content */}
      <section className="privacy-content">

        <div className="privacy-container privacy-layout">

          {/* Sidebar */}
          <aside className="privacy-sidebar">

            <span>CONTENTS</span>

            <a href="#information">
              01 &nbsp; Information We Collect
            </a>

            <a href="#usage">
              02 &nbsp; How We Use Information
            </a>

            <a href="#cookies">
              03 &nbsp; Cookies
            </a>

            <a href="#sharing">
              04 &nbsp; Information Sharing
            </a>

            <a href="#security">
              05 &nbsp; Data Security
            </a>

            <a href="#rights">
              06 &nbsp; Your Choices
            </a>

            <a href="#changes">
              07 &nbsp; Policy Changes
            </a>

          </aside>


          {/* Document */}
          <article className="privacy-document">

            <section id="information">

              <span className="privacy-number">
                01
              </span>

              <h2>
                Information We Collect
              </h2>

              <p>
                When you use UtilityHub, we may collect
                information that you provide directly, such as
                your name, email address and account details.
              </p>

              <p>
                We may also collect basic technical information
                required to operate, maintain and improve the
                platform.
              </p>

            </section>


            <section id="usage">

              <span className="privacy-number">
                02
              </span>

              <h2>
                How We Use Information
              </h2>

              <p>
                Information may be used to provide and maintain
                UtilityHub services, manage user accounts,
                respond to support requests and improve the
                overall user experience.
              </p>

              <ul>
                <li>
                  Provide requested services and features.
                </li>

                <li>
                  Maintain and improve the platform.
                </li>

                <li>
                  Respond to questions and support requests.
                </li>

                <li>
                  Protect the security and integrity of the
                  service.
                </li>
              </ul>

            </section>


            <section id="cookies">

              <span className="privacy-number">
                03
              </span>

              <h2>
                Cookies and Similar Technologies
              </h2>

              <p>
                UtilityHub may use cookies or similar
                technologies to support essential functionality,
                remember preferences and understand how users
                interact with the platform.
              </p>

              <p>
                You can manage cookie preferences through
                available browser settings. Disabling certain
                cookies may affect some functionality.
              </p>

            </section>


            <section id="sharing">

              <span className="privacy-number">
                04
              </span>

              <h2>
                Information Sharing
              </h2>

              <p>
                We do not intend to sell personal information
                to third parties. Information may be shared
                when necessary to provide services, comply with
                applicable legal requirements or protect the
                security and rights of UtilityHub and its users.
              </p>

            </section>


            <section id="security">

              <span className="privacy-number">
                05
              </span>

              <h2>
                Data Security
              </h2>

              <p>
                We take reasonable measures to protect
                information handled through UtilityHub.
                However, no internet-based service can
                guarantee absolute security.
              </p>

              <p>
                Users should also take appropriate steps to
                protect their account credentials and devices.
              </p>

            </section>


            <section id="rights">

              <span className="privacy-number">
                06
              </span>

              <h2>
                Your Choices
              </h2>

              <p>
                Depending on the functionality available,
                you may be able to update account information,
                manage preferences or request assistance with
                information associated with your account.
              </p>

              <p>
                For privacy-related questions, please contact
                the UtilityHub team.
              </p>

            </section>


            <section id="changes">

              <span className="privacy-number">
                07
              </span>

              <h2>
                Changes to This Policy
              </h2>

              <p>
                We may update this Privacy Policy periodically
                to reflect changes to our services or practices.
                The updated version will be published on this
                page with a revised date.
              </p>

            </section>


            {/* Contact Box */}
            <div className="privacy-contact-box">

              <div>

                <span>
                  PRIVACY QUESTIONS?
                </span>

                <h3>
                  We're happy to help.
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

export default Privacy;