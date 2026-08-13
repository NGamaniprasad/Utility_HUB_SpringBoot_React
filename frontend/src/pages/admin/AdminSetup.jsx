import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSetup.css";

function AdminSetup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/setup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Admin setup failed."
        );
      }

      setMessage(
        `Admin created successfully. Your Admin ID is ${data.adminId}`
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/admin/login");
      }, 3000);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-setup-page">

      <section className="simple-page">
        <div className="container narrow-container">

          <span className="section-label">
            ADMINISTRATION
          </span>

          <h1>First Admin Setup</h1>

          <p>
            Create the first administrator account for
            UtilityHub. This setup can only be completed once.
          </p>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <label>
              Full Name

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </label>


            <label>
              Email

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </label>


            <label>
              Password

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                minLength={8}
              />
            </label>


            <label>
              Confirm Password

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
            </label>


            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={loading}
            >
              {loading
                ? "Creating Admin..."
                : "Create First Admin"}
            </button>

          </form>

          <p>
            Already have an admin account?{" "}
            <Link to="/admin/login">
              Admin Login
            </Link>
          </p>

        </div>
      </section>

    </main>
  );
}

export default AdminSetup;