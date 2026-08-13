
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "./Register.css";

// function Register() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((current) => ({
//       ...current,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");
//     setSuccess("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/users/register",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//           body: JSON.stringify({
//             name: formData.fullName,
//             email: formData.email,
//             password: formData.password,
//             confirmPassword: formData.confirmPassword,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Registration failed."
//         );
//       }

//       setSuccess(
//         `Account created successfully. Your User ID is ${data.userId}.`
//       );

//       setFormData({
//         fullName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       });

//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);

//     } catch (error) {
//       setError(
//         error.message ||
//         "Unable to create account."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="auth-page">

//       <div className="auth-card">

//         <div className="auth-header">

//           <Link to="/" className="auth-logo">
//             UtilityHub
//           </Link>

//           <span className="section-label">
//             CREATE ACCOUNT
//           </span>

//           <h1>Create your account</h1>

//           <p>
//             Register to access UtilityHub tools and your
//             personal dashboard.
//           </p>

//         </div>


//         {error && (
//           <div className="admin-error">
//             {error}
//           </div>
//         )}


//         {success && (
//           <div className="admin-success">
//             {success}
//           </div>
//         )}


//         <form
//           className="auth-form"
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
//               placeholder="Enter your full name"
//               value={formData.fullName}
//               onChange={handleChange}
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
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
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
//               placeholder="Create a password"
//               value={formData.password}
//               onChange={handleChange}
//               minLength="8"
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
//               placeholder="Confirm your password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               minLength="8"
//               required
//             />

//           </div>


//           <button
//             type="submit"
//             className="btn btn-primary auth-submit"
//             disabled={loading}
//           >
//             {loading
//               ? "Creating Account..."
//               : "Create Account"}
//           </button>

//         </form>


//         <div className="auth-footer">

//           <p>
//             Already have an account?
//             <Link to="/login"> Login</Link>
//           </p>

//         </div>

//       </div>

//     </main>
//   );
// }

// export default Register;



import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };


  // ==========================================
  // REGISTER
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // Check password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check password length
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      console.log("Registering user...");
      console.log("Name:", formData.fullName);
      console.log("Email:", formData.email);

      const response = await fetch(
        "http://localhost:8080/api/users/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        }
      );

      console.log(
        "POST /api/users/register status:",
        response.status
      );


      // ==========================================
      // READ RESPONSE SAFELY
      // ==========================================

      const responseText = await response.text();

      console.log(
        "Register response:",
        responseText
      );

      let data = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          // Backend returned plain text
          data = {
            message: responseText,
          };
        }
      }


      // ==========================================
      // ERROR
      // ==========================================

      if (!response.ok) {

        throw new Error(
          data.message ||
          data.error ||
          responseText ||
          "Registration failed."
        );
      }


      // ==========================================
      // SUCCESS
      // ==========================================

      const userId =
        data.userId ||
        data.id ||
        "";

      const successMessage = userId
        ? `Account created successfully. Your User ID is ${userId}.`
        : data.message ||
          "Account created successfully.";

      setSuccess(successMessage);


      // Clear form

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });


      // Go to login after 2 seconds

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      setError(
        error.message ||
        "Unable to create account."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // PAGE
  // ==========================================

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
            CREATE ACCOUNT
          </span>

          <h1>
            Create your account
          </h1>

          <p>
            Register to access UtilityHub tools
            and your personal dashboard.
          </p>

        </div>


        {/* ERROR */}

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}


        {/* SUCCESS */}

        {success && (
          <div className="admin-success">
            {success}
          </div>
        )}


        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* FULL NAME */}

          <div className="form-group">

            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

          </div>


          {/* EMAIL */}

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
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
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              minLength="8"
              required
            />

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength="8"
              required
            />

          </div>


          {/* BUTTON */}

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>


        {/* FOOTER */}

        <div className="auth-footer">

          <p>
            Already have an account?

            <Link to="/login">
              {" "}Login
            </Link>
          </p>

        </div>

      </div>

    </main>
  );
}

export default Register;

