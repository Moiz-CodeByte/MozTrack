"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProject = () => {
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        if (!token) {
          setErrorMessage("Authorization token not found. Please log in.");
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${apiUrl}/clients/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Access the clients array from the response
        if (response.data && Array.isArray(response.data.clients)) {
          setClients(response.data.clients);
        } else {
          setErrorMessage("Unexpected response format.");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch clients.");
      }
    };

    fetchClients();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      if (!token) {
        setErrorMessage("Authorization token not found. Please log in.");
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await axios.post(
        `${apiUrl}/projects/add/`,
        { name, clientId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Project added successfully!");
      setName("");
      setClientId("");
    } catch (error) {
      setErrorMessage("Failed to add project.");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientId">Client:</label>
          <select
            id="clientId"
            className="form-control"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Project</button>
      </form>
      {successMessage && <p className="alert alert-success mt-3">{successMessage}</p>}
      {errorMessage && <p className="alert alert-danger mt-3">{errorMessage}</p>}
    </div>
  );
};

export default AddProject;