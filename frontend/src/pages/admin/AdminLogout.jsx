import { useNavigate } from "react-router-dom";

function AdminLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove admin authentication data
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminRole");

    // Go back to admin login
    navigate("/admin/login", { replace: true });
  };

  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default AdminLogout;