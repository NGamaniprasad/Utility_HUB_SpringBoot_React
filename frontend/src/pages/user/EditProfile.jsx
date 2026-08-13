
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    setName(localStorage.getItem("userName") || "");
    setEmail(localStorage.getItem("userEmail") || "");
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("userToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      const data = await response.json();

      console.log("UPDATE PROFILE RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update profile."
        );
      }

      // Save updated information
      localStorage.setItem(
        "userName",
        data.name
      );

      localStorage.setItem(
        "userEmail",
        data.email
      );

      setName(data.name);
      setEmail(data.email);

      setSuccess(
        "Profile updated successfully."
      );

    } catch (err) {
      console.error(
        "UPDATE PROFILE ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to update profile."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <Link
            to="/user/dashboard"
            className="auth-logo"
          >
            UtilityHub
          </Link>

          <span className="section-label">
            MY ACCOUNT
          </span>

          <h1>
            Edit Profile
          </h1>

          <p>
            Update your UtilityHub account
            information.
          </p>

        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {success && (
          <div className="auth-success">
            {success}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </form>

        <div className="auth-footer">

          <Link to="/user/dashboard">
            ← Back to Dashboard
          </Link>

        </div>

      </div>

    </main>
  );
}

export default EditProfile;

