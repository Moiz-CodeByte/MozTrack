"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const GetAllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editedProjects, setEditedProjects] = useState({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Authorization token not found. Please log in.");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/projects/getprojects", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data && Array.isArray(response.data.projects)) {
        setProjects(response.data.projects);
        setErrorMessage("");
      } else {
        setErrorMessage("Unexpected response format.");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch projects.");
    }
  };

  const handleEdit = (id, field, value) => {
    setEditedProjects({
      ...editedProjects,
      [id]: {
        ...editedProjects[id],
        [field]: value,
      },
    });
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Authorization token not found. Please log in.");
        return;
      }

      const updatedData = editedProjects[id];
      if (!updatedData) {
        setErrorMessage("No changes to save.");
        return;
      }

      await axios.put(
        `http://localhost:5000/api/projects/${id}`,
        {
          name: updatedData.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("Project updated successfully.");
      setEditedProjects((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
      fetchProjects();
    } catch (error) {
      setErrorMessage("Failed to update project.");
    }
  };

  const handleCancel = (id) => {
    setEditedProjects((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Authorization token not found. Please log in.");
        return;
      }

      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Project deleted successfully.");
      fetchProjects();
    } catch (error) {
      setErrorMessage("Failed to delete project.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Project List</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Client</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            const isEditing = !!editedProjects[project._id];
            return (
              <tr key={project._id}>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editedProjects[project._id]?.name || project.name}
                      onChange={(e) => handleEdit(project._id, "name", e.target.value)}
                    />
                  ) : (
                    project.name
                  )}
                </td>
                <td>{project.client.name}</td>
                <td>
                  {isEditing ? (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleSave(project._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleCancel(project._id)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() =>
                          setEditedProjects({
                            [project._id]: { name: project.name },
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(project._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllProjects;