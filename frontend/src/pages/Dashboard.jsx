import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to UtilityHub</h1>

      <p>
        Hello, {username}
      </p>

      <p>
        You are successfully logged in.
      </p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;