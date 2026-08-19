




import { Routes, Route } from "react-router-dom";
import AgeCalculator from "../pages/tools/AgeCalculator";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import AdminSetup from "../pages/auth/AdminSetup";
import AdminLogin from "../pages/auth/AdminLogin";

import UserDashboard from "../pages/user/UserDashboard";
import EditProfile from "../pages/user/EditProfile";
import ChangePassword from "../pages/user/ChangePassword";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminManagement from "../pages/admin/AdminManagement";
import UserManagement from "../pages/admin/UserManagement";
import ToolManagement from "../pages/admin/ToolManagement";
import AddTool from "../pages/admin/AddTool";
import EditTool from "../pages/admin/EditTool";
import CreateAdmin from "../pages/admin/CreateAdmin";
import EditAdmin from "../pages/admin/EditAdmin";
import NumberToWords from "../pages/tools/NumberToWords";
import AdminProtectedRoute from "./AdminProtectedRoute";
import EMICalculator from "../pages/tools/EMICalculator";
import WordsToNumber from "../pages/tools/WordsToNumber";
import PercentageCalculator
  from "../pages/tools/PercentageCalculator";

import GSTCalculator from "../pages/tools/GSTCalculator";
function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/terms"
        element={<Terms />}
      />

      <Route
        path="/privacy"
        element={<Privacy />}
      />


      {/* ================= USER AUTH ================= */}

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />


      {/* ================= USER ================= */}

      <Route
        path="/user/dashboard"
        element={<UserDashboard />}
      />

      <Route
        path="/user/profile"
        element={<EditProfile />}
      />

      <Route
        path="/user/change-password"
        element={<ChangePassword />}
      />


      {/* ================= ADMIN AUTH ================= */}

      <Route
        path="/admin/setup"
        element={<AdminSetup />}
      />

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* ================= PROTECTED ADMIN ================= */}

      <Route element={<AdminProtectedRoute />}>

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/admins"
          element={<AdminManagement />}
        />

        <Route
          path="/admin/admins/create"
          element={<CreateAdmin />}
        />

        <Route
          path="/admin/edit/:adminId"
          element={<EditAdmin />}
        />

        <Route
          path="/admin/users"
          element={<UserManagement />}
        />

        <Route
          path="/admin/tools"
          element={<ToolManagement />}
        />

        <Route
          path="/admin/tools/add"
          element={<AddTool />}
        />

        <Route
          path="/admin/tools/edit/:toolId"
          element={<EditTool />}
        />
        <Route
  path="/tools/age-calculator"
  element={<AgeCalculator />}
/>

      </Route>
      <Route
  path="/tools/number-to-words"
  element={<NumberToWords />}
/>
<Route
  path="/tools/emi-calculator"
  element={<EMICalculator />}
/>
<Route
  path="tools/words-to-number"
  element={<WordsToNumber />}
/>
<Route
  path="/tools/gst-calculator"
  element={<GSTCalculator />}
/>

<Route
  path="/tools/percentage-calculator"
  element={<PercentageCalculator />}
/>

    </Routes>
  );
}

export default AppRoutes;

