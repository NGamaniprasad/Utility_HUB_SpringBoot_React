
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./EditTool.css";

function EditTool() {
  const navigate = useNavigate();
  const { toolId } = useParams();

  const [tool, setTool] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [route, setRoute] = useState("");
  const [icon, setIcon] = useState("");
  const [active, setActive] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD TOOL
  // =========================================================

  const loadTool = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login", { replace: true });
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/admin/tools/${toolId}`,
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
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminId");
        localStorage.removeItem("adminName");
        localStorage.removeItem("adminRole");

        navigate("/admin/login", { replace: true });
        return;
      }

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

      if (!response.ok) {
        throw new Error(
          data?.message ||
          "Unable to load tool."
        );
      }

      setTool(data);

      setName(data.name || "");
      setDescription(data.description || "");
      setCategory(data.category || "");
      setRoute(data.route || "");
      setIcon(data.icon || "");
      setActive(data.active);

    } catch (err) {
      console.error(
        "LOAD TOOL ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to load tool."
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================================================
  // LOAD WHEN PAGE OPENS
  // =========================================================

  useEffect(() => {
    loadTool();
  }, [toolId]);


  // =========================================================
  // SAVE TOOL
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
        `http://localhost:8080/api/admin/tools/${toolId}`,
        {
          method: "PUT",

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
            active: active,
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

      if (
        response.status === 401 ||
        response.status === 403
      ) {
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
          "Unable to update tool."
        );
      }

      navigate("/admin/tools");

    } catch (err) {
      console.error(
        "UPDATE TOOL ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to update tool."
      );

    } finally {
      setSaving(false);
    }
  };


  // =========================================================
  // DELETE TOOL
  // =========================================================

  const handleDelete = async () => {
    if (!tool) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to permanently delete ${tool.name}?`
    );

    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/tools/${toolId}`,
        {
          method: "DELETE",

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
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminId");
        localStorage.removeItem("adminName");
        localStorage.removeItem("adminRole");

        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok) {
        const text = await response.text();

        let data = {};

        if (text) {
          try {
            data = JSON.parse(text);
          } catch {
            // Non-JSON error response.
          }
        }

        throw new Error(
          data?.message ||
          "Unable to delete tool."
        );
      }

      navigate("/admin/tools");

    } catch (err) {
      console.error(
        "DELETE TOOL ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to delete tool."
      );

      setSaving(false);
    }
  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="edit-tool-page">

        <section className="edit-tool-content">

          <div className="container">

            <div className="user-management-message">
              Loading tool...
            </div>

          </div>

        </section>

      </main>
    );
  }


  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="edit-tool-page">

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
              Edit Tool
            </h1>

            <p>
              Update the selected UtilityHub tool.
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
          CONTENT
      ===================================================== */}

      <section className="edit-tool-content">

        <div className="container">

          <div className="edit-tool-card">

            <div className="edit-tool-heading">

              <span className="section-label">
                TOOL MANAGEMENT
              </span>

              <h2>
                Tool Details
              </h2>

              <p>
                Modify the information for this utility.
              </p>

            </div>


            {/* ERROR */}

            {error && (

              <div className="auth-error">
                {error}
              </div>

            )}


            <form
              className="edit-tool-form"
              onSubmit={handleSubmit}
            >

              {/* TOOL ID */}

              <div className="form-group">

                <label>
                  Tool ID
                </label>

                <input
                  type="text"
                  value={tool?.toolId || ""}
                  disabled
                />

              </div>


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
                  disabled={saving}
                />

              </div>


              {/* STATUS */}

              <div className="form-group">

                <label htmlFor="tool-active">
                  Status
                </label>

                <select
                  id="tool-active"
                  value={active ? "active" : "inactive"}
                  onChange={(event) =>
                    setActive(
                      event.target.value === "active"
                    )
                  }
                  disabled={saving}
                >

                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>

                </select>

              </div>


              {/* ACTIONS */}

              <div className="edit-tool-actions">

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
                    ? "Saving..."
                    : "Save Changes"}
                </button>


                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={saving}
                >
                  Delete Tool
                </button>

              </div>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}

export default EditTool;

