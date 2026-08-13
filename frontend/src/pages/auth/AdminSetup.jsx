// import { Link } from "react-router-dom";
// import "./AdminSetup.css";

// function AdminSetup() {
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // First-admin API will be connected in Phase 2.
//     alert("First admin API will be connected soon.");
//   };

//   return (
//     <main className="admin-setup-page">

//       <div className="admin-setup-card">

//         <div className="admin-setup-header">
//           <Link to="/" className="admin-setup-logo">
//             UtilityHub
//           </Link>

//           <span className="section-label">
//             INITIAL ADMIN SETUP
//           </span>

//           <h1>Create First Admin</h1>

//           <p>
//             Create the first administrator account for UtilityHub.
//           </p>
//         </div>

//         <div className="admin-notice">
//           <strong>Important</strong>

//           <p>
//             This registration is available only when no administrator
//             account exists.
//           </p>
//         </div>

//         <form
//           className="admin-setup-form"
//           onSubmit={handleSubmit}
//         >

//           <div className="form-group">
//             <label htmlFor="fullName">
//               Full Name
//             </label>

//             <input
//               id="fullName"
//               type="text"
//               name="fullName"
//               placeholder="Enter admin name"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">
//               Email
//             </label>

//             <input
//               id="email"
//               type="email"
//               name="email"
//               placeholder="Enter admin email"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">
//               Password
//             </label>

//             <input
//               id="password"
//               type="password"
//               name="password"
//               placeholder="Create admin password"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="confirmPassword">
//               Confirm Password
//             </label>

//             <input
//               id="confirmPassword"
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm admin password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary admin-setup-submit"
//           >
//             Create First Admin
//           </button>

//         </form>

//         <div className="admin-setup-footer">
//           <Link to="/admin/login">
//             Already have an Admin ID? Admin Login
//           </Link>
//         </div>

//       </div>

//     </main>
//   );
// }

// export default AdminSetup;

import { Link } from "react-router-dom";
import "./AdminSetup.css";

function AdminSetup() {
  const handleSubmit = (event) => {
    event.preventDefault();

    // Backend will check whether an admin already exists.
    // Backend will generate the unique Admin ID.
    alert("First admin will be created through the backend.");
  };

  return (
    <main className="admin-setup-page">

      <section className="admin-page-header">
        <div className="container admin-page-header-inner">

          <div>
            <span className="section-label">
              INITIAL SETUP
            </span>

            <h1>Create First Admin</h1>

            <p>
              Create the first administrator account for UtilityHub.
            </p>
          </div>

          <Link
            to="/admin/login"
            className="btn btn-secondary"
          >
            Admin Login
          </Link>

        </div>
      </section>

      <section className="admin-setup-content">
        <div className="container">

          <div className="admin-setup-card">

            <div className="setup-notice">
              <strong>One-time setup</strong>

              <p>
                This registration is only available when
                no administrator account exists.
              </p>
            </div>

            <form
              className="admin-setup-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">
                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create admin password"
                  required
                  minLength="8"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm admin password"
                  required
                  minLength="8"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large"
              >
                Create First Admin
              </button>

            </form>

          </div>

        </div>
      </section>

    </main>
  );
}

export default AdminSetup;