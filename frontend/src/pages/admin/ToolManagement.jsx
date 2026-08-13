// import { Link } from "react-router-dom";
// import "./ToolManagement.css";

// function ToolManagement() {
//   const tools = [
//     {
//       id: "UH-TOL-00001",
//       name: "Age Calculator",
//       category: "Calculators",
//       status: "Active",
//     },
//     {
//       id: "UH-TOL-00002",
//       name: "Unit Converter",
//       category: "Converters",
//       status: "Active",
//     },
//   ];

//   return (
//     <main className="tool-management-page">

//       <section className="admin-page-header">
//         <div className="container admin-page-header-inner">

//           <div>
//             <span className="section-label">
//               ADMINISTRATION
//             </span>

//             <h1>Tool Management</h1>

//             <p>
//               Add and manage the utilities available on UtilityHub.
//             </p>
//           </div>

//           <Link
//             to="/admin/dashboard"
//             className="btn btn-secondary"
//           >
//             Back to Dashboard
//           </Link>

//         </div>
//       </section>

//       <section className="tool-management-content">
//         <div className="container">

//           <div className="tool-management-toolbar">

//             <div>
//               <h2>Utility Tools</h2>

//               <p>
//                 Manage available tools and their status.
//               </p>
//             </div>

//             {/* <button
//               type="button"
//               className="btn btn-primary"
//             >
//               + Add Tool
//             </button> */}
//             <Link
//   to="/admin/tools/add"
//   className="btn btn-primary"
// >
//   + Add Tool
// </Link>

//           </div>

//           <div className="tool-table-wrapper">

//             <table className="tool-table">

//               <thead>
//                 <tr>
//                   <th>Tool ID</th>
//                   <th>Tool Name</th>
//                   <th>Category</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {tools.map((tool) => (
//                   <tr key={tool.id}>

//                     <td>
//                       <strong>{tool.id}</strong>
//                     </td>

//                     <td>{tool.name}</td>

//                     <td>{tool.category}</td>

//                     <td>
//                       <span className="tool-status">
//                         {tool.status}
//                       </span>
//                     </td>

//                     <td>
//                       {/* <button
//                         type="button"
//                         className="tool-table-action"
//                       >
//                         Manage
//                       </button> */}
//                       <Link
//   to={`/admin/tools/edit/${tool.id}`}
//   className="tool-table-action"
// >
//   Edit
// </Link>
//                     </td>

//                   </tr>
//                 ))}
//               </tbody>

//             </table>

//           </div>

//         </div>
//       </section>

//     </main>
//   );
// }

// export default ToolManagement;



import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ToolManagement.css";

function ToolManagement() {
  const navigate = useNavigate();

  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD TOOLS
  // =========================================================

  const loadTools = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login", { replace: true });
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/admin/tools",
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
        localStorage.removeItem("adminId");
        localStorage.removeItem("adminName");
        localStorage.removeItem("adminRole");

        navigate("/admin/login", { replace: true });
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

    } catch (err) {
      console.error(
        "LOAD TOOLS ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to load tools."
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================================================
  // LOAD WHEN PAGE OPENS
  // =========================================================

  useEffect(() => {
    loadTools();
  }, []);


  // =========================================================
  // ACTIVATE / DEACTIVATE
  // =========================================================

  const handleStatus = async (tool) => {
    const action = tool.active
      ? "deactivate"
      : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${tool.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const token =
        localStorage.getItem("adminToken");

      const endpoint = tool.active
        ? `/api/admin/tools/${tool.toolId}/deactivate`
        : `/api/admin/tools/${tool.toolId}/activate`;

      const response = await fetch(
        `http://localhost:8080${endpoint}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
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

      if (!response.ok) {
        throw new Error(
          data?.message ||
          `Unable to ${action} tool.`
        );
      }

      setTools((currentTools) =>
        currentTools.map((item) =>
          item.toolId === tool.toolId
            ? data
            : item
        )
      );

    } catch (err) {
      console.error(
        "TOOL STATUS ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to update tool status."
      );
    }
  };


  // =========================================================
  // DELETE TOOL
  // =========================================================

  const handleDelete = async (tool) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete ${tool.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const token =
        localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:8080/api/admin/tools/${tool.toolId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const text = await response.text();

        let data = {};

        if (text) {
          try {
            data = JSON.parse(text);
          } catch {
            // Server returned non-JSON error
          }
        }

        throw new Error(
          data?.message ||
          "Unable to delete tool."
        );
      }

      setTools((currentTools) =>
        currentTools.filter(
          (item) =>
            item.toolId !== tool.toolId
        )
      );

    } catch (err) {
      console.error(
        "DELETE TOOL ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to delete tool."
      );
    }
  };


  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="tool-management-page">

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
              Tool Management
            </h1>

            <p>
              Add and manage the utilities
              available on UtilityHub.
            </p>

          </div>


          <Link
            to="/admin/dashboard"
            className="btn btn-secondary"
          >
            Back to Dashboard
          </Link>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="tool-management-content">

        <div className="container">

          <div className="tool-management-toolbar">

            <div>

              <h2>
                Utility Tools
              </h2>

              <p>
                Manage available tools and
                their status.
              </p>

            </div>


            <Link
              to="/admin/tools/add"
              className="btn btn-primary"
            >
              + Add Tool
            </Link>

          </div>


          {/* ERROR */}

          {error && (

            <div className="auth-error">
              {error}
            </div>

          )}


          {/* LOADING */}

          {loading ? (

            <div className="user-management-message">
              Loading tools...
            </div>

          ) : tools.length === 0 ? (

            <div className="user-management-message">
              No tools found.
            </div>

          ) : (

            <div className="tool-table-wrapper">

              <table className="tool-table">

                <thead>

                  <tr>

                    <th>
                      Tool ID
                    </th>

                    <th>
                      Tool Name
                    </th>

                    <th>
                      Category
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {tools.map((tool) => (

                    <tr
                      key={tool.toolId}
                    >

                      {/* TOOL ID */}

                      <td>

                        <strong>
                          {tool.toolId}
                        </strong>

                      </td>


                      {/* NAME */}

                      <td>
                        {tool.name}
                      </td>


                      {/* CATEGORY */}

                      <td>
                        {tool.category}
                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            tool.active
                              ? "tool-status"
                              : "tool-status tool-status-inactive"
                          }
                        >
                          {tool.active
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="tool-action-buttons">

                          {/* EDIT */}

                          <Link
                            to={`/admin/tools/edit/${tool.toolId}`}
                            className="tool-table-action"
                          >
                            Edit
                          </Link>


                          {/* ACTIVATE / DEACTIVATE */}

                          <button
                            type="button"
                            className="tool-table-action"
                            onClick={() =>
                              handleStatus(tool)
                            }
                          >
                            {tool.active
                              ? "Deactivate"
                              : "Activate"}
                          </button>


                          {/* DELETE */}

                          <button
                            type="button"
                            className="tool-table-action tool-delete-action"
                            onClick={() =>
                              handleDelete(tool)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default ToolManagement;

