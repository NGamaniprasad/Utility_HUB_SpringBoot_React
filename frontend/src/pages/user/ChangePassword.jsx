
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ChangePassword.css";

function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const token =
      localStorage.getItem("userToken");

    if (!token) {
      navigate("/login");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        "New passwords do not match."
      );
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "New password must be at least 8 characters."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/change-password",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "CHANGE PASSWORD RESPONSE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to change password."
        );
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setSuccess(
        "Password changed successfully. Please login again."
      );

      // The old JWT can remain technically valid,
      // but forcing a fresh login is cleaner.
      localStorage.removeItem(
        "userToken"
      );

      localStorage.removeItem(
        "userLoggedIn"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error(
        "CHANGE PASSWORD ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to change password."
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
            SECURITY
          </span>

          <h1>
            Change Password
          </h1>

          <p>
            Create a new password for your
            UtilityHub account.
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

            <label htmlFor="currentPassword">
              Current Password
            </label>

            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(
                  event.target.value
                )
              }
              required
            />

          </div>

          <div className="form-group">

            <label htmlFor="newPassword">
              New Password
            </label>

            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(
                  event.target.value
                )
              }
              minLength={8}
              required
            />

          </div>

          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              minLength={8}
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading
              ? "Changing..."
              : "Change Password"}
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

export default ChangePassword;

