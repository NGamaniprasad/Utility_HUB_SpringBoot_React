
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddTool.css";

function AddTool() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [route, setRoute] = useState("");
  const [icon, setIcon] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // CREATE TOOL
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Tool name is required.");
      return;
    }

    if (!category.trim()) {
      setError("Category is required.");
      return;
    }

    if (!route.trim()) {
      setError("Route is required.");
      return;
    }

    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/tools",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            description: description.trim(),
            category: category.trim(),
            route: route.trim(),
            icon: icon.trim(),
          }),
        }
      );

      const text = await response.text();

      let data = null;

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(
            "Server returned an invalid response."
          );
        }
      }

      if (response.status === 401 ||
          response.status === 403) {

        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminId");
        localStorage.removeItem("adminName");
        localStorage.removeItem("adminRole");

        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
          "Unable to create tool."
        );
      }

      // Tool successfully created.
      navigate("/admin/tools");

    } catch (err) {
      console.error(
        "CREATE TOOL ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to create tool."
      );

    } finally {
      setSaving(false);
    }
  };


  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="add-tool-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="admin-page-header">

        <div className="container admin-page-header-inner">

          <div>

            <span className="section-label">
              ADMINISTRATION
            </span>

            <h1>
              Add Tool
            </h1>

            <p>
              Add a new utility tool to UtilityHub.
            </p>

          </div>


          <Link
            to="/admin/tools"
            className="btn btn-secondary"
          >
            Back to Tools
          </Link>

        </div>

      </section>


      {/* =====================================================
          FORM
      ===================================================== */}

      <section className="add-tool-content">

        <div className="container">

          <div className="add-tool-card">

            <div className="add-tool-heading">

              <span className="section-label">
                NEW TOOL
              </span>

              <h2>
                Tool Details
              </h2>

              <p>
                Enter the information for the new utility.
              </p>

            </div>


            {/* ERROR */}

            {error && (

              <div className="auth-error">
                {error}
              </div>

            )}


            <form
              className="add-tool-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}

              <div className="form-group">

                <label htmlFor="tool-name">
                  Tool Name
                </label>

                <input
                  id="tool-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Example: Age Calculator"
                  disabled={saving}
                />

              </div>


              {/* DESCRIPTION */}

              <div className="form-group">

                <label htmlFor="tool-description">
                  Description
                </label>

                <textarea
                  id="tool-description"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Describe what this tool does."
                  rows="4"
                  disabled={saving}
                />

              </div>


              {/* CATEGORY */}

              <div className="form-group">

                <label htmlFor="tool-category">
                  Category
                </label>

                <input
                  id="tool-category"
                  type="text"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  placeholder="Example: Calculators"
                  disabled={saving}
                />

              </div>


              {/* ROUTE */}

              <div className="form-group">

                <label htmlFor="tool-route">
                  Route
                </label>

                <input
                  id="tool-route"
                  type="text"
                  value={route}
                  onChange={(event) =>
                    setRoute(event.target.value)
                  }
                  placeholder="Example: /tools/age-calculator"
                  disabled={saving}
                />

              </div>


              {/* ICON */}

              <div className="form-group">

                <label htmlFor="tool-icon">
                  Icon
                </label>

                <input
                  id="tool-icon"
                  type="text"
                  value={icon}
                  onChange={(event) =>
                    setIcon(event.target.value)
                  }
                  placeholder="Example: calculator"
                  disabled={saving}
                />

              </div>


              {/* BUTTONS */}

              <div className="add-tool-actions">

                <Link
                  to="/admin/tools"
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
                    ? "Creating..."
                    : "Create Tool"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}

export default AddTool;

