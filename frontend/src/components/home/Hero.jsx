import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">

        <div className="hero-content">
          <span className="hero-label">
            UTILITYHUB
          </span>

          <h1>
            Powerful Tools for Everyday Tasks
          </h1>

          <p>
            Convert, calculate, generate and simplify your daily work —
            all in one place.
          </p>

          <div className="hero-actions">
            <Link
              to="/register"
              className="btn btn-primary btn-large"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="btn btn-secondary btn-large"
            >
              User Login
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card">

            <div className="visual-card-header">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="visual-content">
              <div className="visual-line large"></div>
              <div className="visual-line"></div>
              <div className="visual-line short"></div>

              <div className="visual-boxes">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;