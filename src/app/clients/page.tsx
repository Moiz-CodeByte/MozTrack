"use client";
import React, { useEffect, useState } from "react";
import {Alert} from "react-bootstrap";
import axios from "axios";

const ClientListPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authorization token not found. Please log in.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/clients/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setClients(
          response.data.clients.map((client: any) => ({
            ...client,
            editName: client.name,
            editEmail: client.email,
          }))
        );
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch clients.");
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleUpdate = async (clientId: string, name: string, email: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token not found. Please log in.");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/clients/${clientId}`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      <Alert variant="success">{"Client updated successfully!"}</Alert>
     { setClients((prevClients) =>
        prevClients.map((client) =>
          client._id === clientId ? { ...client, name, email } : client
        )
      );
    }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update client.");
    }
  };

  const handleDelete = async (clientId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token not found. Please log in.");
        return;
      }

      await axios.delete(`http://localhost:5000/api/clients/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      <Alert variant="success">{"Client deleted successfully!"}</Alert>
      setClients((prevClients) =>
        prevClients.filter((client) => client._id !== clientId)
      );
    } catch (err: any) {
      console.log(err);
      <Alert variant="alert">{"Failed to delete client."}</Alert>
      setError(err.response?.data?.message || "Failed to delete client.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h3 className="text-center mb-4">Client List</h3>
          {loading && <p>Loading...</p>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && clients.length === 0 && <p>No clients found.</p>}
          {!loading && !error && clients.length > 0 && (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client: any, index: number) => (
                  <tr key={client._id}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        value={client.editName}
                        onChange={(e) =>
                          setClients((prevClients) =>
                            prevClients.map((c) =>
                              c._id === client._id
                                ? { ...c, editName: e.target.value }
                                : c
                            )
                          )
                        }
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        value={client.editEmail}
                        onChange={(e) =>
                          setClients((prevClients) =>
                            prevClients.map((c) =>
                              c._id === client._id
                                ? { ...c, editEmail: e.target.value }
                                : c
                            )
                          )
                        }
                        className="form-control"
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() =>
                          handleUpdate(client._id, client.editName, client.editEmail)
                        }
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(client._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientListPage;