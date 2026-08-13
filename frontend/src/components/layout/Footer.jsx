import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">

      <div className="container footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            UtilityHub
          </Link>

          <p>
            Everyday Tools. One Powerful Platform.
          </p>
        </div>

        {/* Platform */}
        <div className="footer-column">
          <h4>Platform</h4>

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Legal */}
        <div className="footer-column">
          <h4>Legal</h4>

          <Link to="/terms">Terms of Use</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

        {/* Account */}
        <div className="footer-column">
          <h4>Account</h4>

          <Link to="/register">Register</Link>
          <Link to="/login">User Login</Link>
          <Link to="/admin/login">Admin Login</Link>
        </div>

      </div>

      <div className="container footer-bottom">
        <p>
          © 2026 UtilityHub. All rights reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;