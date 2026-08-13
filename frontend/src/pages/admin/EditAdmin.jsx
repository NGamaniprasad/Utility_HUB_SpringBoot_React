// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import "./EditAdmin.css";

// function EditAdmin() {
//   const { adminId } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "ADMIN",
//     active: true,
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   // ==========================================
//   // LOAD ADMIN
//   // ==========================================

//   useEffect(() => {

//     const token =
//       localStorage.getItem("adminToken");

//     const currentRole =
//       localStorage.getItem("adminRole");

//     console.log(
//       "EditAdmin: adminId =",
//       adminId
//     );

//     console.log(
//       "EditAdmin: localStorage role =",
//       currentRole
//     );

//     console.log(
//       "EditAdmin: token exists =",
//       !!token
//     );

//     if (!token) {
//       navigate("/admin/login");
//       return;
//     }

//     if (currentRole !== "SUPER_ADMIN") {
//       navigate("/admin/dashboard");
//       return;
//     }

//     loadAdmin(token);

//   }, [adminId]);


//   // ==========================================
//   // LOAD ADMIN
//   // ==========================================

//   const loadAdmin = async (token) => {

//     try {

//       setLoading(true);
//       setError("");

//       console.log(
//         "Loading admin:",
//         adminId
//       );

//       const response = await fetch(
//         "http://localhost:8080/api/admin/all",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       );

//       console.log(
//         "GET /api/admin/all status:",
//         response.status
//       );

//       if (response.status === 401) {
//         throw new Error(
//           "Your login session has expired."
//         );
//       }

//       if (response.status === 403) {
//         throw new Error(
//           "Your current account is not authorized to manage administrators."
//         );
//       }

//       if (!response.ok) {
//         throw new Error(
//           "Failed to load administrators."
//         );
//       }

//       const admins =
//         await response.json();

//       const admin =
//         admins.find(
//           (item) =>
//             item.adminId === adminId
//         );

//       if (!admin) {
//         throw new Error(
//           "Admin not found."
//         );
//       }

//       console.log(
//         "Admin loaded:",
//         admin
//       );

//       // SUPER_ADMIN cannot be edited
//       if (admin.role === "SUPER_ADMIN") {

//         alert(
//           "SUPER_ADMIN cannot be edited."
//         );

//         navigate("/admin/admins");

//         return;
//       }

//       setFormData({
//         name: admin.name || "",
//         email: admin.email || "",
//         password: "",
//         role: admin.role || "ADMIN",
//         active: admin.active === true,
//       });

//     } catch (err) {

//       console.error(
//         "Load admin error:",
//         err
//       );

//       setError(
//         err.message ||
//         "Failed to load administrator."
//       );

//     } finally {

//       setLoading(false);

//     }
//   };


//   // ==========================================
//   // HANDLE INPUT
//   // ==========================================

//   const handleChange = (event) => {

//     const {
//       name,
//       value,
//       type,
//       checked,
//     } = event.target;

//     setFormData((current) => ({
//       ...current,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : value,
//     }));
//   };


//   // ==========================================
//   // UPDATE ADMIN
//   // ==========================================

//   const handleSubmit = async (event) => {

//     event.preventDefault();

//     setSaving(true);
//     setError("");

//     const token =
//       localStorage.getItem("adminToken");

//     const currentRole =
//       localStorage.getItem("adminRole");

//     console.log(
//       "Updating admin:",
//       adminId
//     );

//     console.log(
//       "Frontend role:",
//       currentRole
//     );

//     console.log(
//       "Token exists:",
//       !!token
//     );

//     if (!token) {

//       setError(
//         "Your login session has expired."
//       );

//       navigate("/admin/login");

//       return;
//     }

//     if (currentRole !== "SUPER_ADMIN") {

//       setError(
//         "Only SUPER_ADMIN can edit administrators."
//       );

//       return;
//     }

//     try {

//       const response = await fetch(
//         `http://localhost:8080/api/admin/${adminId}`,
//         {
//           method: "PUT",

//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },

//           body: JSON.stringify({
//             name: formData.name,
//             email: formData.email,

//             // Empty password means keep old password
//             password:
//               formData.password.trim(),

//             role: formData.role,
//             active: formData.active,
//           }),
//         }
//       );

//       console.log(
//         `PUT /api/admin/${adminId} status:`,
//         response.status
//       );

//       const responseText =
//         await response.text();

//       console.log(
//         "PUT response:",
//         responseText
//       );

//       if (response.status === 401) {

//         throw new Error(
//           "Your login session has expired. Please login again."
//         );
//       }

//       if (response.status === 403) {

//         throw new Error(
//           responseText ||
//           "Only SUPER_ADMIN can edit administrators."
//         );
//       }

//       if (!response.ok) {

//         throw new Error(
//           responseText ||
//           "Failed to update administrator."
//         );
//       }

//       alert(
//         "Administrator updated successfully."
//       );

//       navigate("/admin/admins");

//     } catch (err) {

//       console.error(
//         "Update admin error:",
//         err
//       );

//       setError(
//         err.message ||
//         "Failed to update administrator."
//       );

//     } finally {

//       setSaving(false);

//     }
//   };


//   // ==========================================
//   // LOADING
//   // ==========================================

//   if (loading) {

//     return (
//       <main className="edit-admin-page">
//         <div className="container">
//           <p>
//             Loading administrator...
//           </p>
//         </div>
//       </main>
//     );
//   }


//   // ==========================================
//   // PAGE
//   // ==========================================

//   return (
//     <main className="edit-admin-page">

//       <section className="admin-page-header">

//         <div className="container admin-page-header-inner">

//           <div>

//             <span className="section-label">
//               ADMIN MANAGEMENT
//             </span>

//             <h1>
//               Edit Administrator
//             </h1>

//             <p>
//               Update administrator account details.
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


//       <section className="edit-admin-content">

//         <div className="container">

//           <div className="edit-admin-card">

//             {error && (
//               <div className="admin-error">
//                 {error}
//               </div>
//             )}

//             <div className="admin-edit-id">

//               <span>
//                 Admin ID
//               </span>

//               <strong>
//                 {adminId}
//               </strong>

//             </div>


//             <form
//               className="edit-admin-form"
//               onSubmit={handleSubmit}
//             >

//               <div className="form-group">

//                 <label htmlFor="name">
//                   Full Name
//                 </label>

//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   value={formData.name}
//                   onChange={handleChange}
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
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter email address"
//                   required
//                 />

//               </div>


//               <div className="form-group">

//                 <label htmlFor="password">
//                   New Password
//                 </label>

//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Leave blank to keep current password"
//                   minLength="8"
//                 />

//                 <small>
//                   Leave blank to keep the current password.
//                 </small>

//               </div>


//               <div className="form-group">

//                 <label htmlFor="role">
//                   Admin Role
//                 </label>

//                 <select
//                   id="role"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                 >
//                   <option value="ADMIN">
//                     Admin
//                   </option>
//                 </select>

//               </div>


//               <div className="form-group">

//                 <label className="checkbox-label">

//                   <input
//                     type="checkbox"
//                     name="active"
//                     checked={formData.active}
//                     onChange={handleChange}
//                   />

//                   <span>
//                     Account Active
//                   </span>

//                 </label>

//               </div>


//               <div className="edit-admin-actions">

//                 <Link
//                   to="/admin/admins"
//                   className="btn btn-secondary"
//                 >
//                   Cancel
//                 </Link>

//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={saving}
//                 >
//                   {saving
//                     ? "Saving..."
//                     : "Save Changes"}
//                 </button>

//               </div>

//             </form>

//           </div>

//         </div>

//       </section>

//     </main>
//   );
// }

// export default EditAdmin;



import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./EditAdmin.css";

function EditAdmin() {
  const { adminId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
    active: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD ADMIN
  // ==========================================

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const currentRole = localStorage.getItem("adminRole");

    console.log("EditAdmin: adminId =", adminId);
    console.log("EditAdmin: adminRole =", currentRole);
    console.log("EditAdmin: token exists =", !!token);

    if (!token) {
      navigate("/admin/login");
      return;
    }

    if (currentRole !== "SUPER_ADMIN") {
      setError("Only SUPER_ADMIN can edit administrators.");
      setLoading(false);
      return;
    }

    loadAdmin(token);
  }, [adminId]);

  // ==========================================
  // LOAD ADMIN
  // ==========================================

  const loadAdmin = async (token) => {
    try {
      setLoading(true);
      setError("");

      console.log("Loading admin:", adminId);

      const response = await fetch(
        "http://localhost:8080/api/admin/all",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log(
        "GET /api/admin/all status:",
        response.status
      );

      if (response.status === 401) {
        throw new Error(
          "Your login session has expired. Please login again."
        );
      }

      if (response.status === 403) {
        throw new Error(
          "You are not authorized to manage administrators."
        );
      }

      if (!response.ok) {
        throw new Error(
          "Failed to load administrators."
        );
      }

      const admins = await response.json();

      const admin = admins.find(
        (item) => item.adminId === adminId
      );

      if (!admin) {
        throw new Error("Admin not found.");
      }

      console.log("Admin loaded:", admin);

      // SUPER_ADMIN itself cannot be edited
      if (admin.role === "SUPER_ADMIN") {
        alert("SUPER_ADMIN cannot be edited.");
        navigate("/admin/admins");
        return;
      }

      setFormData({
        name: admin.name || "",
        email: admin.email || "",
        password: "",
        role: admin.role || "ADMIN",
        active: admin.active === true,
      });
    } catch (err) {
      console.error("Load admin error:", err);

      setError(
        err.message ||
        "Failed to load administrator."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==========================================
  // UPDATE ADMIN
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    const token =
      localStorage.getItem("adminToken");

    const currentRole =
      localStorage.getItem("adminRole");

    console.log("Updating admin:", adminId);
    console.log("Current role:", currentRole);
    console.log("Token exists:", !!token);

    // ------------------------------------------
    // AUTHENTICATION CHECK
    // ------------------------------------------

    if (!token) {
      setError(
        "Your login session has expired. Please login again."
      );

      setSaving(false);
      navigate("/admin/login");
      return;
    }

    // ------------------------------------------
    // ROLE CHECK
    // ------------------------------------------

    if (currentRole !== "SUPER_ADMIN") {
      setError(
        "Only SUPER_ADMIN can edit administrators."
      );

      setSaving(false);
      return;
    }

    try {
      // ------------------------------------------
      // CREATE UPDATE PAYLOAD
      // ------------------------------------------

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
        active: formData.active,
      };

      // IMPORTANT:
      // Do not send password when it is blank.
      // Backend will keep the existing password.
      const newPassword =
        formData.password.trim();

      if (newPassword !== "") {
        payload.password = newPassword;
      }

      console.log(
        "Sending update payload:",
        payload
      );

      // ------------------------------------------
      // PUT REQUEST
      // ------------------------------------------

      const response = await fetch(
        `http://localhost:8080/api/admin/${adminId}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      console.log(
        `PUT /api/admin/${adminId} status:`,
        response.status
      );

      const responseText =
        await response.text();

      console.log(
        "PUT response:",
        responseText
      );

      // ------------------------------------------
      // RESPONSE HANDLING
      // ------------------------------------------

      if (response.status === 401) {
        throw new Error(
          "Your login session has expired. Please login again."
        );
      }

      if (response.status === 403) {
        throw new Error(
          responseText ||
          "Only SUPER_ADMIN can edit administrators."
        );
      }

      if (!response.ok) {
        throw new Error(
          responseText ||
          "Failed to update administrator."
        );
      }

      // ------------------------------------------
      // SUCCESS
      // ------------------------------------------

      alert(
        "Administrator updated successfully."
      );

      navigate("/admin/admins");

    } catch (err) {
      console.error(
        "Update admin error:",
        err
      );

      setError(
        err.message ||
        "Failed to update administrator."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="edit-admin-page">
        <div className="container">
          <p>
            Loading administrator...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="edit-admin-page">

      <section className="admin-page-header">

        <div className="container admin-page-header-inner">

          <div>

            <span className="section-label">
              ADMIN MANAGEMENT
            </span>

            <h1>
              Edit Administrator
            </h1>

            <p>
              Update administrator account details.
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

      <section className="edit-admin-content">

        <div className="container">

          <div className="edit-admin-card">

            {error && (
              <div className="admin-error">
                {error}
              </div>
            )}

            <div className="admin-edit-id">

              <span>
                Admin ID
              </span>

              <strong>
                {adminId}
              </strong>

            </div>

            <form
              className="edit-admin-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}

              <div className="form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />

              </div>

              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />

              </div>

              {/* PASSWORD */}

              <div className="form-group">

                <label htmlFor="password">
                  New Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                  minLength={8}
                />

                <small>
                  Leave blank to keep the current password.
                </small>

              </div>

              {/* ROLE */}

              <div className="form-group">

                <label htmlFor="role">
                  Admin Role
                </label>

                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="ADMIN">
                    Admin
                  </option>
                </select>

              </div>

              {/* ACTIVE */}

              <div className="form-group">

                <label className="checkbox-label">

                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                  />

                  <span>
                    Account Active
                  </span>

                </label>

              </div>

              {/* ACTIONS */}

              <div className="edit-admin-actions">

                <Link
                  to="/admin/admins"
                  className="btn btn-secondary"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}

export default EditAdmin;

