

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserManagement.css";

const API_BASE_URL = "http://localhost:8080/api/admin";

function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // =========================================================
  // GET RESPONSE SAFELY
  // =========================================================

  const readResponse = async (response) => {
    const text = await response.text();

    if (!text) {
      return null;
    }

    try {
      return JSON.parse(text);
    } catch {
      return {
        message: text,
      };
    }
  };

  // =========================================================
  // HANDLE AUTH ERROR
  // =========================================================

  const handleAuthError = (response) => {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminName");
      localStorage.removeItem("adminRole");

      navigate("/admin/login", { replace: true });

      return true;
    }

    return false;
  };

  // =========================================================
  // LOAD USERS
  // =========================================================

  const loadUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login", { replace: true });
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/users`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (handleAuthError(response)) {
        return;
      }

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to load users."
        );
      }

      setUsers(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error("LOAD USERS ERROR:", err);

      setError(
        err.message || "Unable to load users."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadUsers();
  }, []);

  // =========================================================
  // EDIT USER
  // =========================================================

  const handleEdit = (user) => {
    setSelectedUser(user);

    setEditName(user.name || "");
    setEditEmail(user.email || "");

    setError("");
  };

  // =========================================================
  // CLOSE EDIT MODAL
  // =========================================================

  const closeEdit = () => {
    if (saving) {
      return;
    }

    setSelectedUser(null);
    setEditName("");
    setEditEmail("");
  };

  // =========================================================
  // SAVE USER
  // =========================================================

  const handleSave = async () => {
    if (!selectedUser) {
      return;
    }

    if (!editName.trim()) {
      setError("Name is required.");
      return;
    }

    if (!editEmail.trim()) {
      setError("Email is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_BASE_URL}/users/${selectedUser.userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: editName.trim(),
            email: editEmail.trim(),
          }),
        }
      );

      if (handleAuthError(response)) {
        return;
      }

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to update user."
        );
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.userId === selectedUser.userId
            ? data
            : user
        )
      );

      closeEdit();

    } catch (err) {
      console.error("UPDATE USER ERROR:", err);

      setError(
        err.message || "Unable to update user."
      );

    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // ACTIVATE / DEACTIVATE USER
  // =========================================================

  const handleStatus = async (user) => {
    const action = user.active
      ? "deactivate"
      : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    setActionLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");

      const endpoint = user.active
        ? `${API_BASE_URL}/users/${user.userId}/deactivate`
        : `${API_BASE_URL}/users/${user.userId}/activate`;

      const response = await fetch(
        endpoint,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (handleAuthError(response)) {
        return;
      }

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          data?.message ||
          `Unable to ${action} user.`
        );
      }

      /*
       * Backend returns UserManagementResponse,
       * so update the row directly.
       */

      if (data) {
        setUsers((currentUsers) =>
          currentUsers.map((item) =>
            item.userId === user.userId
              ? data
              : item
          )
        );
      } else {
        /*
         * If backend ever returns 204,
         * update the status locally.
         */

        setUsers((currentUsers) =>
          currentUsers.map((item) =>
            item.userId === user.userId
              ? {
                  ...item,
                  active: !item.active,
                }
              : item
          )
        );
      }

    } catch (err) {
      console.error("STATUS ERROR:", err);

      setError(
        err.message ||
        "Unable to update user status."
      );

    } finally {
      setActionLoading(false);
    }
  };

  // =========================================================
  // DELETE USER
  // =========================================================

  const handleDelete = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    setActionLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_BASE_URL}/users/${user.userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (handleAuthError(response)) {
        return;
      }

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          data?.message ||
          "Unable to delete user."
        );
      }

      /*
       * DELETE endpoint returns 204 No Content.
       * Therefore we do not expect JSON here.
       */

      setUsers((currentUsers) =>
        currentUsers.filter(
          (item) =>
            item.userId !== user.userId
        )
      );

    } catch (err) {
      console.error("DELETE USER ERROR:", err);

      setError(
        err.message ||
        "Unable to delete user."
      );

    } finally {
      setActionLoading(false);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="user-management-page">

      {/* HEADER */}

      <section className="admin-page-header">

        <div className="container admin-page-header-inner">

          <div>

            <span className="section-label">
              ADMINISTRATION
            </span>

            <h1>
              User Management
            </h1>

            <p>
              View and manage registered
              UtilityHub users.
            </p>

          </div>

          <Link
            to="/admin/dashboard"
            className="btn btn-secondary"
          >
            Back to Dashboard
          </Link>

        </div>

      </section>


      {/* CONTENT */}

      <section className="user-management-content">

        <div className="container">

          <div className="user-management-heading">

            <div>

              <h2>
                Registered Users
              </h2>

              <p>
                Manage user accounts and
                account status.
              </p>

            </div>

          </div>


          {/* ERROR */}

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}


          {/* LOADING */}

          {loading ? (

            <div className="user-management-message">
              Loading users...
            </div>

          ) : users.length === 0 ? (

            <div className="user-management-message">
              No users found.
            </div>

          ) : (

            <div className="user-table-wrapper">

              <table className="user-table">

                <thead>

                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {users.map((user) => (

                    <tr key={user.userId}>

                      <td>
                        <strong>
                          {user.userId}
                        </strong>
                      </td>

                      <td>
                        {user.name}
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>

                        <span
                          className={
                            user.active
                              ? "user-status"
                              : "user-status user-status-inactive"
                          }
                        >
                          {user.active
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </td>

                      <td>

                        <div className="user-action-buttons">

                          <button
                            type="button"
                            className="user-table-action"
                            onClick={() =>
                              handleEdit(user)
                            }
                            disabled={actionLoading}
                          >
                            Edit
                          </button>


                          <button
                            type="button"
                            className="user-table-action"
                            onClick={() =>
                              handleStatus(user)
                            }
                            disabled={actionLoading}
                          >
                            {user.active
                              ? "Deactivate"
                              : "Activate"}
                          </button>


                          <button
                            type="button"
                            className="user-table-action user-delete-action"
                            onClick={() =>
                              handleDelete(user)
                            }
                            disabled={actionLoading}
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </section>


      {/* EDIT USER MODAL */}

      {selectedUser && (

        <div className="user-modal-overlay">

          <div className="user-modal">

            <div className="user-modal-header">

              <div>

                <span className="section-label">
                  USER MANAGEMENT
                </span>

                <h2>
                  Edit User
                </h2>

              </div>

              <button
                type="button"
                className="user-modal-close"
                onClick={closeEdit}
                disabled={saving}
              >
                ×
              </button>

            </div>


            <div className="user-modal-body">

              <div className="form-group">

                <label>
                  User ID
                </label>

                <input
                  type="text"
                  value={selectedUser.userId}
                  disabled
                />

              </div>


              <div className="form-group">

                <label>
                  Name
                </label>

                <input
                  type="text"
                  value={editName}
                  onChange={(event) =>
                    setEditName(event.target.value)
                  }
                />

              </div>


              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  value={editEmail}
                  onChange={(event) =>
                    setEditEmail(event.target.value)
                  }
                />

              </div>

            </div>


            <div className="user-modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeEdit}
                disabled={saving}
              >
                Cancel
              </button>


              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default UserManagement;

