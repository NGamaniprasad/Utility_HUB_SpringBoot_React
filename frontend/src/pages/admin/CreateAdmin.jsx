// import { Link } from "react-router-dom";
// import "./CreateAdmin.css";

// function CreateAdmin() {
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Backend API will be connected later.
//     alert("Admin will be created through the backend.");
//   };

//   return (
//     <main className="create-admin-page">

//       <section className="admin-page-header">
//         <div className="container admin-page-header-inner">

//           <div>
//             <span className="section-label">
//               ADMIN MANAGEMENT
//             </span>

//             <h1>Create Admin</h1>

//             <p>
//               Create a new administrator account.
//             </p>
//           </div>

//           <Link
//             to="/admin/admins"
//             className="btn btn-secondary"
//           >
//             Back to Admins
//           </Link>

//         </div>
//       </section>

//       <section className="create-admin-content">
//         <div className="container">

//           <div className="create-admin-card">

//             <form
//               className="create-admin-form"
//               onSubmit={handleSubmit}
//             >

//               <div className="form-group">
//                 <label htmlFor="name">
//                   Full Name
//                 </label>

//                 <input
//                   id="name"
//                   type="text"
//                   placeholder="Enter full name"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="email">
//                   Email Address
//                 </label>

//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="Enter email address"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password">
//                   Password
//                 </label>

//                 <input
//                   id="password"
//                   type="password"
//                   placeholder="Create password"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="confirmPassword">
//                   Confirm Password
//                 </label>

//                 <input
//                   id="confirmPassword"
//                   type="password"
//                   placeholder="Confirm password"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="role">
//                   Admin Role
//                 </label>

//                 <select
//                   id="role"
//                   defaultValue="ADMIN"
//                 >
//                   <option value="ADMIN">
//                     Admin
//                   </option>

//                   <option value="SUPER_ADMIN">
//                     Super Admin
//                   </option>
//                 </select>
//               </div>

//               <div className="create-admin-actions">

//                 <Link
//                   to="/admin/admins"
//                   className="btn btn-secondary"
//                 >
//                   Cancel
//                 </Link>

//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                 >
//                   Create Admin
//                 </button>

//               </div>

//             </form>

//           </div>

//         </div>
//       </section>

//     </main>
//   );
// }

// export default CreateAdmin;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateAdmin.css";

function CreateAdmin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ADMIN",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create admin."
        );
      }

      setSuccess(
        `Admin created successfully. Admin ID: ${data.adminId}`
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "ADMIN",
      });

    } catch (err) {
      console.error("Create admin error:", err);

      setError(
        err.message || "Unable to create admin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-admin-page">

      <section className="admin-page-header">
        <div className="container admin-page-header-inner">

          <div>
            <span className="section-label">
              ADMIN MANAGEMENT
            </span>

            <h1>Create Admin</h1>

            <p>
              Create a new administrator account.
            </p>
          </div>

          <Link
            to="/admin/admins"
            className="btn btn-secondary"
          >
            Back to Admins
          </Link>

        </div>
      </section>

      <section className="create-admin-content">
        <div className="container">

          <div className="create-admin-card">

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                {success}
              </div>
            )}

            <form
              className="create-admin-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">
                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={150}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  minLength={8}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">
                  Admin Role
                </label>

                <select
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="ADMIN">
                    Admin
                  </option>

                  <option value="SUPER_ADMIN">
                    Super Admin
                  </option>
                </select>
              </div>

              <div className="create-admin-actions">

                <Link
                  to="/admin/admins"
                  className="btn btn-secondary"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading
                    ? "Creating..."
                    : "Create Admin"}
                </button>

              </div>

            </form>

          </div>

        </div>
      </section>

    </main>
  );
}

export default CreateAdmin;