

// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "./Login.css";

// function Login() {

//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);


//   const handleSubmit = async (event) => {

//     event.preventDefault();

//     setError("");
//     setLoading(true);

//     try {

//       const response = await fetch(
//         "http://localhost:8080/api/users/login",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//           },

//           body: JSON.stringify({
//             email,
//             password,
//           }),
//         }
//       );


//       const text =
//         await response.text();

//       let data;

//       try {
//         data = text
//           ? JSON.parse(text)
//           : {};
//       } catch {
//         throw new Error(
//           "Server returned an invalid response."
//         );
//       }


//       if (!response.ok) {

//         throw new Error(
//           data.message ||
//           "Invalid email or password."
//         );
//       }


//       // ======================================
//       // SAVE USER LOGIN
//       // ======================================

//       localStorage.setItem(
//         "userToken",
//         data.token
//       );

//       localStorage.setItem(
//         "userId",
//         data.userId
//       );

//       localStorage.setItem(
//         "userName",
//         data.name
//       );

//       localStorage.setItem(
//         "userEmail",
//         data.email
//       );

//       localStorage.setItem(
//         "userLoggedIn",
//         "true"
//       );


//       // ======================================
//       // DASHBOARD
//       // ======================================

//       navigate("/dashboard");

//     } catch (error) {

//       console.error(
//         "User login error:",
//         error
//       );

//       setError(
//         error.message ||
//         "Login failed."
//       );

//     } finally {

//       setLoading(false);
//     }
//   };


//   return (
//     <main className="auth-page">

//       <div className="auth-card">

//         <div className="auth-header">

//           <Link
//             to="/"
//             className="auth-logo"
//           >
//             UtilityHub
//           </Link>

//           <span className="section-label">
//             USER LOGIN
//           </span>

//           <h1>
//             Welcome back
//           </h1>

//           <p>
//             Login to access your UtilityHub
//             dashboard and tools.
//           </p>

//         </div>


//         {error && (
//           <div className="auth-error">
//             {error}
//           </div>
//         )}


//         <form
//           className="auth-form"
//           onSubmit={handleSubmit}
//         >

//           <div className="form-group">

//             <label htmlFor="email">
//               Email
//             </label>

//             <input
//               id="email"
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(event) =>
//                 setEmail(event.target.value)
//               }
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
//               placeholder="Enter your password"
//               value={password}
//               onChange={(event) =>
//                 setPassword(event.target.value)
//               }
//               required
//             />

//           </div>


//           <button
//             type="submit"
//             className="btn btn-primary auth-submit"
//             disabled={loading}
//           >
//             {loading
//               ? "Logging in..."
//               : "Login"}
//           </button>

//         </form>


//         <div className="auth-footer">

//           <p>
//             Don't have an account?

//             <Link to="/register">
//               {" "}Create Account
//             </Link>
//           </p>

//         </div>

//       </div>

//     </main>
//   );
// }

// export default Login;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed."
        );
      }

      // ==========================================
      // SAVE USER LOGIN INFORMATION
      // ==========================================

      localStorage.setItem(
        "userLoggedIn",
        "true"
      );

      localStorage.setItem(
        "userToken",
        data.token
      );

      localStorage.setItem(
        "userId",
        data.userId
      );

      localStorage.setItem(
        "userName",
        data.name
      );

      localStorage.setItem(
        "userEmail",
        data.email
      );

      console.log(
        "USER LOGIN SAVED SUCCESSFULLY"
      );

      // ==========================================
      // GO TO USER DASHBOARD
      // ==========================================

      navigate("/user/dashboard");

    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to login."
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
            to="/"
            className="auth-logo"
          >
            UtilityHub
          </Link>

          <span className="section-label">
            USER LOGIN
          </span>

          <h1>
            Welcome back
          </h1>

          <p>
            Login to access your UtilityHub
            dashboard and tools.
          </p>

        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
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
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
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
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <div className="auth-footer">

          <p>
            Don't have an account?

            <Link to="/register">
              {" "}Create Account
            </Link>
          </p>

        </div>

      </div>

    </main>
  );
}

export default Login;

