"use client";
import React, { useState } from "react";
import axios from "axios";

const AddNewClient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMessage("");

    try {
      const token = localStorage.getItem("token"); // Fetch token from localStorage
      if (!token) {
        setResponseMessage("Authorization token not found. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/clients/add",
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponseMessage(response.data.message || "Client added successfully!");
      setName("");
      setEmail("");
    } catch (err: any) {
      console.error(err);
      setResponseMessage(err.response?.data?.message || "Failed to add client.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center mb-4">Add Client</h3>
          {responseMessage && (
            <div
              className={`alert ${
                responseMessage.includes("successfully")
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {responseMessage}
            </div>
          )}
          <form onSubmit={handleAddClient}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter client name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter client email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Client
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewClient;
