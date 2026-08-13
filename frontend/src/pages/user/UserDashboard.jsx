
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./UserDashboard.css";

// function UserDashboard() {
//   const navigate = useNavigate();

//   // ==========================================
//   // LOAD USER FROM LOCAL STORAGE
//   // ==========================================

//   const [user] = useState({
//     userId:
//       localStorage.getItem("userId") ||
//       "UH-USR-000001",

//     name:
//       localStorage.getItem("userName") ||
//       "User",

//     email:
//       localStorage.getItem("userEmail") ||
//       "user@example.com",
//   });


//   // ==========================================
//   // LOGOUT
//   // ==========================================

//   const handleLogout = () => {
//     localStorage.removeItem("userId");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userLoggedIn");
//     localStorage.removeItem("userToken");

//     navigate("/login");
//   };


//   return (
//     <main className="user-dashboard-page">

//       {/* ======================================
//           HEADER
//       ====================================== */}

//       <section className="user-dashboard-header">

//         <div className="container user-dashboard-header-inner">

//           <div>

//             <span className="section-label">
//               USER DASHBOARD
//             </span>

//             <h1>
//               Welcome, {user.name}
//             </h1>

//             <p>
//               Access your UtilityHub tools and
//               account information.
//             </p>

//           </div>


//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>

//         </div>

//       </section>


//       {/* ======================================
//           CONTENT
//       ====================================== */}

//       <section className="user-dashboard-content">

//         <div className="container">

//           {/* ==================================
//               ACCOUNT
//           ================================== */}

//           <div className="user-account-card">

//             <div className="user-account-header">

//               <div>

//                 <span className="section-label">
//                   MY ACCOUNT
//                 </span>

//                 <h2>
//                   Account Information
//                 </h2>

//               </div>


//               {/* ==================================
//                   ACCOUNT ACTIONS
//               ================================== */}

//               <div className="user-account-actions">

//                 <Link
//                   to="/user/profile"
//                   className="btn btn-primary"
//                 >
//                   Edit Profile
//                 </Link>

//                 <Link
//                   to="/user/change-password"
//                   className="btn btn-secondary"
//                 >
//                   Change Password
//                 </Link>

//               </div>

//             </div>


//             <div className="user-account-details">

//               <div className="user-detail">

//                 <span>
//                   User ID
//                 </span>

//                 <strong>
//                   {user.userId}
//                 </strong>

//               </div>


//               <div className="user-detail">

//                 <span>
//                   Full Name
//                 </span>

//                 <strong>
//                   {user.name}
//                 </strong>

//               </div>


//               <div className="user-detail">

//                 <span>
//                   Email
//                 </span>

//                 <strong>
//                   {user.email}
//                 </strong>

//               </div>


//               <div className="user-detail">

//                 <span>
//                   Account Status
//                 </span>

//                 <strong className="user-active-status">
//                   Active
//                 </strong>

//               </div>

//             </div>

//           </div>


//           {/* ==================================
//               TOOLS
//           ================================== */}

//           <div className="user-tools-section">

//             <div className="user-section-heading">

//               <span className="section-label">
//                 UTILITYHUB
//               </span>

//               <h2>
//                 Your Tools
//               </h2>

//               <p>
//                 Choose a utility tool to get started.
//               </p>

//             </div>


//             <div className="user-tools-grid">

//               <Link
//                 to="/"
//                 className="user-tool-card"
//               >

//                 <div className="user-tool-icon">
//                   %
//                 </div>

//                 <h3>
//                   Percentage Calculator
//                 </h3>

//                 <p>
//                   Quickly calculate percentages
//                   and related values.
//                 </p>

//                 <span>
//                   Open Tool →
//                 </span>

//               </Link>


//               <Link
//                 to="/"
//                 className="user-tool-card"
//               >

//                 <div className="user-tool-icon">
//                   +
//                 </div>

//                 <h3>
//                   Calculator
//                 </h3>

//                 <p>
//                   Perform quick everyday
//                   calculations.
//                 </p>

//                 <span>
//                   Open Tool →
//                 </span>

//               </Link>


//               <Link
//                 to="/"
//                 className="user-tool-card"
//               >

//                 <div className="user-tool-icon">
//                   →
//                 </div>

//                 <h3>
//                   More Tools
//                 </h3>

//                 <p>
//                   Explore available
//                   UtilityHub tools.
//                 </p>

//                 <span>
//                   Explore Tools →
//                 </span>

//               </Link>

//             </div>

//           </div>

//         </div>

//       </section>

//     </main>
//   );
// }

// export default UserDashboard;



import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();

  // ==========================================
  // USER
  // ==========================================

  const [user] = useState({
    userId:
      localStorage.getItem("userId") ||
      "UH-USR-000001",

    name:
      localStorage.getItem("userName") ||
      "User",

    email:
      localStorage.getItem("userEmail") ||
      "user@example.com",
  });


  // ==========================================
  // TOOLS
  // ==========================================

  const [tools, setTools] = useState([]);
  const [loadingTools, setLoadingTools] = useState(true);
  const [toolError, setToolError] = useState("");


  // ==========================================
  // LOAD ACTIVE TOOLS
  // ==========================================

  useEffect(() => {
    const loadTools = async () => {
      setLoadingTools(true);
      setToolError("");

      try {
        const token =
          localStorage.getItem("userToken");

        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        const response = await fetch(
          "http://localhost:8080/api/tools",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (
          response.status === 401 ||
          response.status === 403
        ) {
          localStorage.removeItem("userToken");
          localStorage.removeItem("userLoggedIn");

          navigate("/login", { replace: true });
          return;
        }

        const text = await response.text();

        let data = [];

        if (text) {
          try {
            data = JSON.parse(text);
          } catch {
            throw new Error(
              "Server returned an invalid response."
            );
          }
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
            "Unable to load tools."
          );
        }

        setTools(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {
        console.error(
          "LOAD USER TOOLS ERROR:",
          error
        );

        setToolError(
          error.message ||
          "Unable to load tools."
        );

      } finally {
        setLoadingTools(false);
      }
    };

    loadTools();
  }, [navigate]);


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userToken");

    navigate("/login");
  };


  // ==========================================
  // RENDER
  // ==========================================

  return (
    <main className="user-dashboard-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <section className="user-dashboard-header">

        <div className="container user-dashboard-header-inner">

          <div>

            <span className="section-label">
              USER DASHBOARD
            </span>

            <h1>
              Welcome, {user.name}
            </h1>

            <p>
              Access your UtilityHub tools and
              account information.
            </p>

          </div>


          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </section>


      {/* ======================================
          CONTENT
      ====================================== */}

      <section className="user-dashboard-content">

        <div className="container">

          {/* ==================================
              ACCOUNT
          ================================== */}

          <div className="user-account-card">

            <div className="user-account-header">

              <div>

                <span className="section-label">
                  MY ACCOUNT
                </span>

                <h2>
                  Account Information
                </h2>

              </div>


              <div className="user-account-actions">

                <Link
                  to="/user/profile"
                  className="btn btn-primary"
                >
                  Edit Profile
                </Link>

                <Link
                  to="/user/change-password"
                  className="btn btn-secondary"
                >
                  Change Password
                </Link>

              </div>

            </div>


            <div className="user-account-details">

              <div className="user-detail">

                <span>
                  User ID
                </span>

                <strong>
                  {user.userId}
                </strong>

              </div>


              <div className="user-detail">

                <span>
                  Full Name
                </span>

                <strong>
                  {user.name}
                </strong>

              </div>


              <div className="user-detail">

                <span>
                  Email
                </span>

                <strong>
                  {user.email}
                </strong>

              </div>


              <div className="user-detail">

                <span>
                  Account Status
                </span>

                <strong className="user-active-status">
                  Active
                </strong>

              </div>

            </div>

          </div>


          {/* ==================================
              TOOLS
          ================================== */}

          <div className="user-tools-section">

            <div className="user-section-heading">

              <span className="section-label">
                UTILITYHUB
              </span>

              <h2>
                Your Tools
              </h2>

              <p>
                Choose a utility tool to get started.
              </p>

            </div>


            {/* TOOL ERROR */}

            {toolError && (

              <div className="auth-error">
                {toolError}
              </div>

            )}


            {/* TOOL LOADING */}

            {loadingTools ? (

              <div className="user-management-message">
                Loading tools...
              </div>

            ) : tools.length === 0 ? (

              <div className="user-management-message">
                No active tools are currently available.
              </div>

            ) : (

              <div className="user-tools-grid">

                {tools.map((tool) => (

                  <Link
                    key={tool.toolId}
                    to={tool.route}
                    className="user-tool-card"
                  >

                    <div className="user-tool-icon">
                      {tool.icon || "🔧"}
                    </div>

                    <h3>
                      {tool.name}
                    </h3>

                    <p>
                      {tool.description ||
                        "Open this UtilityHub tool."}
                    </p>

                    <span>
                      Open Tool →
                    </span>

                  </Link>

                ))}

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default UserDashboard;

