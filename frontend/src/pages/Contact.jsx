import { Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-container">

          <span className="contact-label">
            CONTACT US
          </span>

          <h1>
            Have a question?
            <br />
            <span>Let's talk.</span>
          </h1>

          <p>
            Whether you have feedback, a suggestion, or need
            help with UtilityHub, we'd be happy to hear from you.
          </p>

        </div>
      </section>


      {/* Contact Content */}
      <section className="contact-content">

        <div className="contact-container contact-grid">

          {/* Contact Information */}
          <div className="contact-info">

            <span className="contact-label">
              GET IN TOUCH
            </span>

            <h2>
              We'd love to
              <br />
              <span>hear from you.</span>
            </h2>

            <p>
              Send us a message using the form and our team
              will get back to you as soon as possible.
            </p>


            <div className="contact-details">

              <div className="contact-detail">

                <div className="contact-detail-icon">
                  @
                </div>

                <div>
                  <span>Email</span>

                  <a href="mailto:support@utilityhub.com">
                    support@utilityhub.com
                  </a>
                </div>

              </div>


              <div className="contact-detail">

                <div className="contact-detail-icon">
                  ?
                </div>

                <div>
                  <span>Support</span>

                  <p>
                    We're here to help with your questions
                    and feedback.
                  </p>
                </div>

              </div>


              <div className="contact-detail">

                <div className="contact-detail-icon">
                  ✓
                </div>

                <div>
                  <span>Response</span>

                  <p>
                    We aim to respond to messages promptly.
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Contact Form */}
          <div className="contact-form-card">

            <form>

              <div className="form-row">

                <div className="contact-field">
                  <label htmlFor="name">
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                  />
                </div>


                <div className="contact-field">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>

              </div>


              <div className="contact-field">

                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help?"
                />

              </div>


              <div className="contact-field">

                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  rows="6"
                  placeholder="Write your message..."
                ></textarea>

              </div>


              <button
                type="submit"
                className="contact-submit"
              >
                Send Message
                <span>→</span>
              </button>

            </form>

            <p className="contact-form-note">
              By submitting this form, you agree to our{" "}
              <Link to="/privacy">
                Privacy Policy
              </Link>.
            </p>

          </div>

        </div>

      </section>


      {/* Bottom CTA */}
      <section className="contact-bottom">

        <div className="contact-container">

          <span className="contact-label">
            NEED SOMETHING ELSE?
          </span>

          <h2>
            Explore
            <br />
            <span>UtilityHub.</span>
          </h2>

          <Link
            to="/"
            className="contact-home-button"
          >
            Back to Home →
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Contact;