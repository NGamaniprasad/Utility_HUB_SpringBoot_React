// // import { Link } from "react-router-dom";
// // import "./AdminManagement.css";

// // function AdminManagement() {
// //   const admins = [
// //     {
// //       id: "UH-ADM-00001",
// //       name: "Primary Administrator",
// //       email: "admin@example.com",
// //       role: "Super Admin",
// //       status: "Active",
// //     },
// //   ];

// //   return (
// //     <main className="admin-management-page">

// //       <section className="admin-page-header">
// //         <div className="container admin-page-header-inner">

// //           <div>
// //             <span className="section-label">
// //               ADMINISTRATION
// //             </span>

// //             <h1>Admin Management</h1>

// //             <p>
// //               Create and manage administrator accounts.
// //             </p>
// //           </div>

// //           <Link
// //             to="/admin/dashboard"
// //             className="btn btn-secondary"
// //           >
// //             Back to Dashboard
// //           </Link>

// //         </div>
// //       </section>

// //       <section className="admin-management-content">
// //         <div className="container">

// //           <div className="admin-management-toolbar">

// //             <div>
// //               <h2>Administrators</h2>

// //               <p>
// //                 Manage authorized administrators of UtilityHub.
// //               </p>
// //             </div>

// //             {/* <button
// //               type="button"
// //               className="btn btn-primary"
// //             >
// //               + Create Admin
// //             </button> */}
// //             <Link
// //   to="/admin/admins/create"
// //   className="btn btn-primary"
// // >
// //   + Create Admin
// // </Link>

// //           </div>

// //           <div className="admin-table-wrapper">

// //             <table className="admin-table">

// //               <thead>
// //                 <tr>
// //                   <th>Admin ID</th>
// //                   <th>Name</th>
// //                   <th>Email</th>
// //                   <th>Role</th>
// //                   <th>Status</th>
// //                   <th>Action</th>
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {admins.map((admin) => (
// //                   <tr key={admin.id}>

// //                     <td>
// //                       <strong>{admin.id}</strong>
// //                     </td>

// //                     <td>{admin.name}</td>

// //                     <td>{admin.email}</td>

// //                     <td>{admin.role}</td>

// //                     <td>
// //                       <span className="status-badge">
// //                         {admin.status}
// //                       </span>
// //                     </td>

// //                     <td>
// //                       <button
// //                         type="button"
// //                         className="table-action"
// //                       >
// //                         Manage
// //                       </button>
// //                     </td>

// //                   </tr>
// //                 ))}
// //               </tbody>

// //             </table>

// //           </div>

// //         </div>
// //       </section>

// //     </main>
// //   );
// // }

// // export default AdminManagement;

// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./AdminManagement.css";

// function AdminManagement() {
//   const navigate = useNavigate();

//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("adminToken");
//   const role = localStorage.getItem("adminRole");

//   // ==========================================
//   // LOAD ALL ADMINS
//   // ==========================================

//   const loadAdmins = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       if (!token) {
//         navigate("/admin/login");
//         return;
//       }

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

//       if (response.status === 401 || response.status === 403) {
//         setError("You are not authorized to view admins.");
//         return;
//       }

//       if (!response.ok) {
//         throw new Error("Failed to load admins.");
//       }

//       const data = await response.json();

//       setAdmins(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (role !== "SUPER_ADMIN") {
//       navigate("/admin/dashboard");
//       return;
//     }

//     loadAdmins();
//   }, []);

//   // ==========================================
//   // DELETE ADMIN
//   // ==========================================

//   const handleDelete = async (adminId, name) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to delete ${name}?`
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/admin/${adminId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 401 || response.status === 403) {
//         alert("You are not authorized to delete this admin.");
//         return;
//       }

//       if (!response.ok) {
//         const message = await response.text();
//         throw new Error(
//           message || "Failed to delete admin."
//         );
//       }

//       // Remove deleted admin from screen
//       setAdmins((currentAdmins) =>
//         currentAdmins.filter(
//           (admin) => admin.adminId !== adminId
//         )
//       );

//       alert("Admin deleted successfully.");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // ==========================================
//   // LOADING
//   // ==========================================

//   if (loading) {
//     return (
//       <main className="admin-management-page">
//         <div className="container">
//           <p>Loading admins...</p>
//         </div>
//       </main>
//     );
//   }

//   // ==========================================
//   // PAGE
//   // ==========================================

//   return (
//     <main className="admin-management-page">

//       <section className="admin-page-header">
//         <div className="container admin-page-header-inner">

//           <div>
//             <span className="section-label">
//               ADMIN MANAGEMENT
//             </span>

//             <h1>Administrators</h1>

//             <p>
//               View and manage UtilityHub administrator accounts.
//             </p>
//           </div>

//           <div className="admin-page-actions">

//             <Link
//               to="/admin/dashboard"
//               className="btn btn-secondary"
//             >
//               Dashboard
//             </Link>

//             <Link
//   to="/admin/admins/create"
//   className="btn btn-primary"
// >
//   + Create Admin
// </Link>

//           </div>

//         </div>
//       </section>


//       <section className="admin-management-content">
//         <div className="container">

//           {error && (
//             <div className="admin-error">
//               {error}
//             </div>
//           )}


//           <div className="admin-list-card">

//             <div className="admin-list-header">

//               <div>
//                 <h2>All Administrators</h2>

//                 <p>
//                   {admins.length} administrator
//                   {admins.length !== 1 ? "s" : ""}
//                 </p>
//               </div>

//             </div>


//             {admins.length === 0 ? (

//               <div className="admin-empty">
//                 No administrators found.
//               </div>

//             ) : (

//               <div className="admin-table-wrapper">

//                 <table className="admin-table">

//                   <thead>
//                     <tr>
//                       <th>Admin ID</th>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Role</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>

//                   <tbody>

//                     {admins.map((admin) => (

//                       <tr key={admin.adminId}>

//                         <td>
//                           <strong>
//                             {admin.adminId}
//                           </strong>
//                         </td>

//                         <td>
//                           {admin.name}
//                         </td>

//                         <td>
//                           {admin.email}
//                         </td>

//                         <td>
//                           <span className="admin-role">
//                             {admin.role}
//                           </span>
//                         </td>

//                         <td>

//                           <span
//                             className={
//                               admin.active
//                                 ? "admin-status active"
//                                 : "admin-status inactive"
//                             }
//                           >
//                             {admin.active
//                               ? "Active"
//                               : "Inactive"}
//                           </span>

//                         </td>

//                         <td>

//                           <div className="admin-actions">

//                             {admin.role !== "SUPER_ADMIN" && (
//                               <>
//                                 <button
//                                   type="button"
//                                   className="btn btn-secondary"
//                                   onClick={() =>
//                                     navigate(
//                                       `/admin/edit/${admin.adminId}`
//                                     )
//                                   }
//                                 >
//                                   Edit
//                                 </button>

//                                 <button
//                                   type="button"
//                                   className="btn btn-danger"
//                                   onClick={() =>
//                                     handleDelete(
//                                       admin.adminId,
//                                       admin.name
//                                     )
//                                   }
//                                 >
//                                   Delete
//                                 </button>
//                               </>
//                             )}

//                             {admin.role === "SUPER_ADMIN" && (
//                               <span className="protected-admin">
//                                 Protected
//                               </span>
//                             )}

//                           </div>

//                         </td>

//                       </tr>

//                     ))}

//                   </tbody>

//                 </table>

//               </div>

//             )}

//           </div>

//         </div>
//       </section>

//     </main>
//   );
// }

// export default AdminManagement;



import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminManagement.css";

function AdminManagement() {
  const navigate = useNavigate();

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // SUPER ADMIN
  // ==========================================

  const SUPER_ADMIN_ID = "ADM-000001";

  // ==========================================
  // LOAD ALL ADMINS
  // ==========================================

  const loadAdmins = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");
      const role = localStorage.getItem("adminRole");

      console.log("AdminManagement role:", role);
      console.log("AdminManagement token exists:", !!token);

      if (!token) {
        navigate("/admin/login");
        return;
      }

      if (role !== "SUPER_ADMIN") {
        navigate("/admin/dashboard");
        return;
      }

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
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRole");
        localStorage.removeItem("adminId");

        navigate("/admin/login");
        return;
      }

      if (response.status === 403) {
        throw new Error(
          "You are not authorized to view administrators."
        );
      }

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message || "Failed to load administrators."
        );
      }

      const data = await response.json();

      console.log("Administrators:", data);

      setAdmins(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error(
        "Load admins error:",
        err
      );

      setError(
        err.message ||
        "Failed to load administrators."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadAdmins();
  }, []);

  // ==========================================
  // EDIT ADMIN
  // ==========================================

  const handleEdit = (admin) => {
    // SUPER_ADMIN cannot be edited
    if (
      admin.adminId === SUPER_ADMIN_ID ||
      admin.role === "SUPER_ADMIN"
    ) {
      alert(
        "The SUPER_ADMIN account cannot be edited."
      );
      return;
    }

    navigate(
      `/admin/edit/${admin.adminId}`
    );
  };

  // ==========================================
  // DELETE ADMIN
  // ==========================================

  const handleDelete = async (adminId, name) => {
    // Never allow deleting SUPER_ADMIN
    if (adminId === SUPER_ADMIN_ID) {
      alert(
        "The SUPER_ADMIN account cannot be deleted."
      );
      return;
    }

    const targetAdmin = admins.find(
      (admin) => admin.adminId === adminId
    );

    if (targetAdmin?.role === "SUPER_ADMIN") {
      alert(
        "The SUPER_ADMIN account cannot be deleted."
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const token =
        localStorage.getItem("adminToken");

      const currentRole =
        localStorage.getItem("adminRole");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      if (currentRole !== "SUPER_ADMIN") {
        alert(
          "Only SUPER_ADMIN can delete administrators."
        );
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/admin/${adminId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log(
        `DELETE /api/admin/${adminId} status:`,
        response.status
      );

      const responseText =
        await response.text();

      console.log(
        "DELETE response:",
        responseText
      );

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRole");
        localStorage.removeItem("adminId");

        navigate("/admin/login");
        return;
      }

      if (response.status === 403) {
        throw new Error(
          responseText ||
          "Only SUPER_ADMIN can delete administrators."
        );
      }

      if (!response.ok) {
        throw new Error(
          responseText ||
          "Failed to delete administrator."
        );
      }

      // Remove deleted admin from UI
      setAdmins((currentAdmins) =>
        currentAdmins.filter(
          (admin) =>
            admin.adminId !== adminId
        )
      );

      alert(
        "Administrator deleted successfully."
      );

    } catch (err) {
      console.error(
        "Delete admin error:",
        err
      );

      alert(
        err.message ||
        "Failed to delete administrator."
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="admin-management-page">

        <div className="container">

          <p>
            Loading administrators...
          </p>

        </div>

      </main>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="admin-management-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <section className="admin-page-header">

        <div className="container admin-page-header-inner">

          <div>

            <span className="section-label">
              ADMIN MANAGEMENT
            </span>

            <h1>
              Administrators
            </h1>

            <p>
              View and manage UtilityHub
              administrator accounts.
            </p>

          </div>

          <div className="admin-page-actions">

            <Link
              to="/admin/dashboard"
              className="btn btn-secondary"
            >
              Dashboard
            </Link>

            <Link
              to="/admin/admins/create"
              className="btn btn-primary"
            >
              + Create Admin
            </Link>

          </div>

        </div>

      </section>

      {/* ======================================
          CONTENT
      ====================================== */}

      <section className="admin-management-content">

        <div className="container">

          {/* ERROR */}

          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}

          {/* ADMIN LIST */}

          <div className="admin-list-card">

            <div className="admin-list-header">

              <div>

                <h2>
                  All Administrators
                </h2>

                <p>
                  {admins.length} administrator
                  {admins.length !== 1
                    ? "s"
                    : ""}
                </p>

              </div>

            </div>

            {/* EMPTY */}

            {admins.length === 0 ? (

              <div className="admin-empty">

                No administrators found.

              </div>

            ) : (

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>

                    <tr>

                      <th>
                        Admin ID
                      </th>

                      <th>
                        Name
                      </th>

                      <th>
                        Email
                      </th>

                      <th>
                        Role
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {admins.map((admin) => {

                      const isSuperAdmin =
                        admin.adminId ===
                          SUPER_ADMIN_ID ||
                        admin.role ===
                          "SUPER_ADMIN";

                      return (

                        <tr
                          key={admin.adminId}
                        >

                          {/* ADMIN ID */}

                          <td>

                            <strong>
                              {admin.adminId}
                            </strong>

                          </td>

                          {/* NAME */}

                          <td>
                            {admin.name}
                          </td>

                          {/* EMAIL */}

                          <td>
                            {admin.email}
                          </td>

                          {/* ROLE */}

                          <td>

                            <span className="admin-role">
                              {admin.role}
                            </span>

                          </td>

                          {/* STATUS */}

                          <td>

                            <span
                              className={
                                admin.active
                                  ? "admin-status active"
                                  : "admin-status inactive"
                              }
                            >

                              {admin.active
                                ? "Active"
                                : "Inactive"}

                            </span>

                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div className="admin-actions">

                              {isSuperAdmin ? (

                                <span className="protected-admin">
                                  Protected
                                </span>

                              ) : (

                                <>

                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                      handleEdit(
                                        admin
                                      )
                                    }
                                  >
                                    Edit
                                  </button>

                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleDelete(
                                        admin.adminId,
                                        admin.name
                                      )
                                    }
                                  >
                                    Delete
                                  </button>

                                </>

                              )}

                            </div>

                          </td>

                        </tr>

                      );

                    })}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default AdminManagement;

