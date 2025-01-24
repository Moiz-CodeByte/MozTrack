"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const GetAllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
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

        // Ensure the response data is an array
        if (response.data && Array.isArray(response.data.projects)) {
          setProjects(response.data.projects);
        } else {
          setErrorMessage("Unexpected response format.");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch projects.");
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Project List</h2>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <ul className="list-group">
        {projects.map((project) => (
          <li key={project._id} className="list-group-item">
            <h5>{project.name}</h5>
            {project.client && (
              <p>
                Client: {project.client.name} ({project.client.email})
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllProjects;