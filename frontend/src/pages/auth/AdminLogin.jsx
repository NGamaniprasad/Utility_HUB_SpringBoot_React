// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "./AdminLogin.css";

// function AdminLogin() {
//   const navigate = useNavigate();

//   const [adminId, setAdminId] = useState("");
//   const [password, setPassword] = useState("");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");
//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/admin/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             adminId,
//             password,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Invalid Admin ID or password."
//         );
//       }

//       // Save JWT
//       localStorage.setItem("adminToken", data.token);

//       // Save admin information
//       localStorage.setItem("adminId", data.adminId);
//       localStorage.setItem("adminName", data.name);
//       localStorage.setItem("adminRole", data.role);

//       // Keep this for compatibility with your existing frontend
//       localStorage.setItem("adminLoggedIn", "true");

//       navigate("/admin/dashboard");

//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <main className="admin-login-page">

//       <section className="admin-login-section">
//         <div className="container">

//           <div className="admin-login-card">

//             <div className="admin-login-header">

//               <span className="section-label">
//                 ADMINISTRATION
//               </span>

//               <h1>Admin Login</h1>

//               <p>
//                 Login using your Admin ID and password.
//               </p>

//             </div>


//             {error && (
//               <div className="admin-login-error">
//                 {error}
//               </div>
//             )}


//             <form
//               className="admin-login-form"
//               onSubmit={handleSubmit}
//             >

//               <div className="form-group">

//                 <label htmlFor="adminId">
//                   Admin ID
//                 </label>

//                 <input
//                   id="adminId"
//                   name="adminId"
//                   type="text"
//                   placeholder="Enter Admin ID"
//                   value={adminId}
//                   onChange={(event) =>
//                     setAdminId(event.target.value)
//                   }
//                   required
//                 />

//               </div>


//               <div className="form-group">

//                 <label htmlFor="password">
//                   Password
//                 </label>

//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(event) =>
//                     setPassword(event.target.value)
//                   }
//                   required
//                 />

//               </div>


//               <button
//                 type="submit"
//                 className="btn btn-primary btn-large"
//                 disabled={loading}
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </button>

//             </form>


//             <div className="admin-login-footer">

//               <Link to="/">
//                 Back to Home
//               </Link>

//             </div>

//           </div>

//         </div>
//       </section>

//     </main>
//   );
// }

// export default AdminLogin;



// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "./AdminLogin.css";

// function AdminLogin() {
//   const navigate = useNavigate();

//   const [adminId, setAdminId] = useState("");
//   const [password, setPassword] = useState("");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");
//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/admin/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//           body: JSON.stringify({
//             adminId: adminId.trim(),
//             password,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Invalid Admin ID or password."
//         );
//       }

//       // ==========================================
//       // VALIDATE LOGIN RESPONSE
//       // ==========================================

//       if (!data.token) {
//         throw new Error(
//           "Login succeeded but no JWT token was returned."
//         );
//       }

//       if (!data.adminId) {
//         throw new Error(
//           "Login succeeded but no Admin ID was returned."
//         );
//       }

//       if (!data.role) {
//         throw new Error(
//           "Login succeeded but no admin role was returned."
//         );
//       }

//       // ==========================================
//       // NORMALIZE ROLE
//       // ==========================================

//       let normalizedRole =
//         String(data.role)
//           .trim()
//           .toUpperCase();

//       // Prevent ROLE_ROLE_SUPER_ADMIN
//       if (normalizedRole.startsWith("ROLE_")) {
//         normalizedRole =
//           normalizedRole.substring(5);
//       }

//       // ==========================================
//       // SAVE JWT
//       // ==========================================

//       localStorage.setItem(
//         "adminToken",
//         data.token
//       );

//       // ==========================================
//       // SAVE ADMIN INFORMATION
//       // ==========================================

//       localStorage.setItem(
//         "adminId",
//         data.adminId
//       );

//       localStorage.setItem(
//         "adminName",
//         data.name || ""
//       );

//       localStorage.setItem(
//         "adminRole",
//         normalizedRole
//       );

//       localStorage.setItem(
//         "adminLoggedIn",
//         "true"
//       );

//       // ==========================================
//       // DEBUG
//       // ==========================================

//       console.log(
//         "=========================================="
//       );

//       console.log(
//         "ADMIN LOGIN SUCCESS"
//       );

//       console.log(
//         "Admin ID:",
//         data.adminId
//       );

//       console.log(
//         "Admin Name:",
//         data.name
//       );

//       console.log(
//         "Admin Role from backend:",
//         data.role
//       );

//       console.log(
//         "Normalized Role:",
//         normalizedRole
//       );

//       console.log(
//         "JWT Token:",
//         data.token
//       );

//       console.log(
//         "=========================================="
//       );

//       // ==========================================
//       // REDIRECT
//       // ==========================================

//       navigate("/admin/dashboard");

//     } catch (error) {

//       console.error(
//         "Admin login error:",
//         error
//       );

//       setError(
//         error.message ||
//         "Unable to login."
//       );

//     } finally {

//       setLoading(false);

//     }
//   };


//   return (
//     <main className="admin-login-page">

//       <section className="admin-login-section">

//         <div className="container">

//           <div className="admin-login-card">

//             <div className="admin-login-header">

//               <span className="section-label">
//                 ADMINISTRATION
//               </span>

//               <h1>
//                 Admin Login
//               </h1>

//               <p>
//                 Login using your Admin ID and password.
//               </p>

//             </div>


//             {error && (
//               <div className="admin-login-error">
//                 {error}
//               </div>
//             )}


//             <form
//               className="admin-login-form"
//               onSubmit={handleSubmit}
//             >

//               {/* ADMIN ID */}

//               <div className="form-group">

//                 <label htmlFor="adminId">
//                   Admin ID
//                 </label>

//                 <input
//                   id="adminId"
//                   name="adminId"
//                   type="text"
//                   placeholder="Enter Admin ID"
//                   value={adminId}
//                   onChange={(event) =>
//                     setAdminId(event.target.value)
//                   }
//                   required
//                 />

//               </div>


//               {/* PASSWORD */}

//               <div className="form-group">

//                 <label htmlFor="password">
//                   Password
//                 </label>

//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(event) =>
//                     setPassword(event.target.value)
//                   }
//                   required
//                 />

//               </div>


//               {/* LOGIN */}

//               <button
//                 type="submit"
//                 className="btn btn-primary btn-large"
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Logging in..."
//                   : "Login"}
//               </button>

//             </form>


//             <div className="admin-login-footer">

//               <Link to="/">
//                 Back to Home
//               </Link>

//             </div>

//           </div>

//         </div>

//       </section>

//     </main>
//   );
// }

// export default AdminLogin;

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            adminId: adminId.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Invalid Admin ID or password."
        );
      }

      // ==========================================
      // VALIDATE LOGIN RESPONSE
      // ==========================================

      if (!data.token) {
        throw new Error(
          "Login succeeded but no JWT token was returned."
        );
      }

      if (!data.adminId) {
        throw new Error(
          "Login succeeded but no Admin ID was returned."
        );
      }

      if (!data.role) {
        throw new Error(
          "Login succeeded but no admin role was returned."
        );
      }

      // ==========================================
      // NORMALIZE ROLE
      // ==========================================

      let normalizedRole =
        String(data.role)
          .trim()
          .toUpperCase();

      /*
       * If backend returns:
       *
       * ROLE_SUPER_ADMIN
       *
       * convert it to:
       *
       * SUPER_ADMIN
       *
       * because the JWT filter adds ROLE_ itself.
       */

      if (normalizedRole.startsWith("ROLE_")) {
        normalizedRole =
          normalizedRole.substring(5);
      }

      // ==========================================
      // SAVE JWT
      // ==========================================

      localStorage.setItem(
        "adminToken",
        data.token
      );

      // ==========================================
      // SAVE ADMIN INFORMATION
      // ==========================================

      localStorage.setItem(
        "adminId",
        data.adminId
      );

      localStorage.setItem(
        "adminName",
        data.name || ""
      );

      localStorage.setItem(
        "adminRole",
        normalizedRole
      );

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      // ==========================================
      // DEBUG
      // ==========================================

      console.log(
        "=========================================="
      );

      console.log(
        "ADMIN LOGIN SUCCESS"
      );

      console.log(
        "Admin ID:",
        data.adminId
      );

      console.log(
        "Admin Name:",
        data.name
      );

      console.log(
        "Role from backend:",
        data.role
      );

      console.log(
        "Normalized Role:",
        normalizedRole
      );

      console.log(
        "JWT Token:",
        data.token
      );

      console.log(
        "=========================================="
      );

      // ==========================================
      // REDIRECT
      // ==========================================

      navigate("/admin/dashboard");

    } catch (error) {

      console.error(
        "Admin login error:",
        error
      );

      setError(
        error.message ||
        "Unable to login."
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">

      <section className="admin-login-section">

        <div className="container">

          <div className="admin-login-card">

            <div className="admin-login-header">

              <span className="section-label">
                ADMINISTRATION
              </span>

              <h1>
                Admin Login
              </h1>

              <p>
                Login using your Admin ID and password.
              </p>

            </div>

            {error && (
              <div className="admin-login-error">
                {error}
              </div>
            )}

            <form
              className="admin-login-form"
              onSubmit={handleSubmit}
            >

              {/* ADMIN ID */}

              <div className="form-group">

                <label htmlFor="adminId">
                  Admin ID
                </label>

                <input
                  id="adminId"
                  name="adminId"
                  type="text"
                  placeholder="Enter Admin ID"
                  value={adminId}
                  onChange={(event) =>
                    setAdminId(event.target.value)
                  }
                  required
                />

              </div>

              {/* PASSWORD */}

              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />

              </div>

              {/* LOGIN */}

              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={loading}
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>

            </form>

            <div className="admin-login-footer">

              <Link to="/">
                Back to Home
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default AdminLogin;