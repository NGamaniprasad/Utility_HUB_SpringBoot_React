import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">

        <Link to="/" className="brand">
          UtilityHub
        </Link>

        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="header-actions">
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>

          <Link to="/login" className="btn btn-secondary">
            User Login
          </Link>

          <Link to="/admin/login" className="admin-login-link">
            Admin Login
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Header;