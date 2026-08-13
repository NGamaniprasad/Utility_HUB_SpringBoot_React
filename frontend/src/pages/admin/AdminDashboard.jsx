// import { Link, useNavigate } from "react-router-dom";
// import "./AdminDashboard.css";

// function AdminDashboard() {
//   const navigate = useNavigate();

//   const stats = [
//     {
//       label: "Total Users",
//       value: "0",
//     },
//     {
//       label: "Total Tools",
//       value: "0",
//     },
//     {
//       label: "Active Tools",
//       value: "0",
//     },
//     {
//       label: "Total Admins",
//       value: "1",
//     },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     localStorage.removeItem("adminId");
//     localStorage.removeItem("adminName");
//     localStorage.removeItem("adminRole");

//     navigate("/admin/login", { replace: true });
//   };

//   return (
//     <main className="admin-dashboard">

//       {/* Header */}
//       <section className="admin-dashboard-header">
//         <div className="container admin-dashboard-header-inner">

//           <div>
//             <span className="section-label">
//               ADMIN DASHBOARD
//             </span>

//             <h1>Welcome, Administrator</h1>

//             <p>
//               Manage UtilityHub from one centralized dashboard.
//             </p>
//           </div>

//           <div className="admin-dashboard-actions">

//             <Link
//               to="/"
//               className="btn btn-secondary"
//             >
//               Home
//             </Link>

//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>

//           </div>

//         </div>
//       </section>


//       {/* Statistics */}
//       <section className="admin-dashboard-content">
//         <div className="container">

//           <div className="admin-stats-grid">

//             {stats.map((stat) => (
//               <div
//                 className="admin-stat-card"
//                 key={stat.label}
//               >
//                 <span>{stat.label}</span>

//                 <strong>{stat.value}</strong>
//               </div>
//             ))}

//           </div>


//           {/* Management */}
//           <div className="admin-management">

//             <div className="admin-section-heading">
//               <h2>Management</h2>

//               <p>
//                 Manage users, administrators and utility tools.
//               </p>
//             </div>


//             <div className="admin-management-grid">

//               {/* User Management */}
//               <Link
//                 to="/admin/users"
//                 className="admin-management-card"
//               >
//                 <span className="management-number">
//                   01
//                 </span>

//                 <h3>User Management</h3>

//                 <p>
//                   View and manage registered users.
//                 </p>

//                 <span className="management-button">
//                   Manage Users →
//                 </span>
//               </Link>


//               {/* Admin Management */}
//               <Link
//                 to="/admin/admins"
//                 className="admin-management-card"
//               >
//                 <span className="management-number">
//                   02
//                 </span>

//                 <h3>Admin Management</h3>

//                 <p>
//                   Create and manage administrator accounts.
//                 </p>

//                 <span className="management-button">
//                   Manage Admins →
//                 </span>
//               </Link>


//               {/* Tool Management */}
//               <Link
//                 to="/admin/tools"
//                 className="admin-management-card"
//               >
//                 <span className="management-number">
//                   03
//                 </span>

//                 <h3>Tool Management</h3>

//                 <p>
//                   Add, edit and manage utility tools.
//                 </p>

//                 <span className="management-button">
//                   Manage Tools →
//                 </span>
//               </Link>

//             </div>

//           </div>

//         </div>
//       </section>

//     </main>
//   );
// }

// export default AdminDashboard;
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [totalAdmins, setTotalAdmins] = useState(0);
  const [loading, setLoading] = useState(true);

  const [adminName, setAdminName] = useState(
    localStorage.getItem("adminName") || "Administrator"
  );

  const [adminRole, setAdminRole] = useState(
    localStorage.getItem("adminRole") || ""
  );

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    const fetchAdmins = async () => {
      try {
        setLoading(true);

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

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("adminToken");
          navigate("/admin/login", { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load administrators.");
        }

        const data = await response.json();

        setTotalAdmins(data.length);

      } catch (error) {
        console.error("Admin dashboard error:", error);
        setTotalAdmins(0);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();

    setAdminName(
      localStorage.getItem("adminName") || "Administrator"
    );

    setAdminRole(
      localStorage.getItem("adminRole") || ""
    );
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminRole");

    navigate("/admin/login", { replace: true });
  };

  const stats = [
    {
      label: "Total Users",
      value: "0",
    },
    {
      label: "Total Tools",
      value: "0",
    },
    {
      label: "Active Tools",
      value: "0",
    },
    {
      label: "Total Admins",
      value: loading ? "..." : totalAdmins,
    },
  ];

  return (
    <main className="admin-dashboard">

      {/* HEADER */}
      <section className="admin-dashboard-header">

        <div className="container admin-dashboard-header-inner">

          <div>

            <span className="section-label">
              ADMIN DASHBOARD
            </span>

            <h1>
              Welcome, {adminName}
            </h1>

            <p>
              Manage UtilityHub from one centralized dashboard.
            </p>

            {adminRole && (
              <small>
                Role: {adminRole}
              </small>
            )}

          </div>


          <div className="admin-dashboard-actions">

            {/* <Link
              to="/"
              className="btn btn-secondary"
            >
              Home
            </Link> */}

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

      </section>


      {/* STATISTICS */}
      <section className="admin-dashboard-content">

        <div className="container">

          <div className="admin-stats-grid">

            {stats.map((stat) => (

              <div
                className="admin-stat-card"
                key={stat.label}
              >

                <span>
                  {stat.label}
                </span>

                <strong>
                  {stat.value}
                </strong>

              </div>

            ))}

          </div>


          {/* MANAGEMENT */}
          <div className="admin-management">

            <div className="admin-section-heading">

              <h2>
                Management
              </h2>

              <p>
                Manage users, administrators and utility tools.
              </p>

            </div>


            <div className="admin-management-grid">


              {/* USERS */}
              <Link
                to="/admin/users"
                className="admin-management-card"
              >

                <span className="management-number">
                  01
                </span>

                <h3>
                  User Management
                </h3>

                <p>
                  View and manage registered users.
                </p>

                <span className="management-button">
                  Manage Users →
                </span>

              </Link>


              {/* ADMINS */}
              {adminRole === "SUPER_ADMIN" && (
                <Link
                  to="/admin/admins"
                  className="admin-management-card"
                >

                  <span className="management-number">
                    02
                  </span>

                  <h3>
                    Admin Management
                  </h3>

                  <p>
                    Create and manage administrator accounts.
                  </p>

                  <span className="management-button">
                    Manage Admins →
                  </span>

                </Link>
              )}


              {/* TOOLS */}
              <Link
                to="/admin/tools"
                className="admin-management-card"
              >

                <span className="management-number">
                  03
                </span>

                <h3>
                  Tool Management
                </h3>

                <p>
                  Add, edit and manage utility tools.
                </p>

                <span className="management-button">
                  Manage Tools →
                </span>

              </Link>


            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default AdminDashboard;