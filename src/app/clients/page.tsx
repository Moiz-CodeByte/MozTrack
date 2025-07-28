"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Tabs, Tab, Alert, Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import AddNewClient from "@/components/AddNewClient";

const ClientListPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState('list');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  const showAlert = (message, variant = 'success') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setTimeout(() => setAlertMessage(''), 5000);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authorization token not found. Please log in.");
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${apiUrl}/clients/`, {
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

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await axios.put(
        `${apiUrl}/clients/${clientId}`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      showAlert("Client updated successfully!", "success");
      
      setClients((prevClients) =>
        prevClients.map((client) =>
          client._id === clientId ? { ...client, name, email } : client
        )
      );
    } catch (err: any) {
      console.error(err);
      showAlert(err.response?.data?.message || "Failed to update client.", "danger");
    }
  };

  const handleDelete = async (clientId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token not found. Please log in.");
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await axios.delete(`${apiUrl}/clients/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      showAlert("Client deleted successfully!", "success");
      
      setClients((prevClients) =>
        prevClients.filter((client) => client._id !== clientId)
      );
    } catch (err: any) {
      console.log(err);
      showAlert(err.response?.data?.message || "Failed to delete client.", "danger");
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center mb-4">Client Management</h1>
          <p className="text-center text-muted">
            Add, edit, and manage your clients in one place
          </p>
        </Col>
      </Row>

      {alertMessage && (
        <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </Alert>
      )}

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-4"
              >
                <Tab eventKey="list" title="Client List">
                  {loading && (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  
                  {error && <Alert variant="danger">{error}</Alert>}
                  
                  {!loading && !error && clients.length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-muted mb-0">No clients found</p>
                    </div>
                  )}
                  
                  {!loading && !error && clients.length > 0 && (
                    <div className="table-responsive">
                      <Table hover className="align-middle">
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
                                <Form.Control
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
                                />
                              </td>
                              <td>
                                <Form.Control
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
                                />
                              </td>
                              <td>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  className="me-2"
                                  onClick={() =>
                                    handleUpdate(client._id, client.editName, client.editEmail)
                                  }
                                >
                                  <i className="bi bi-pencil"></i> Update
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleDelete(client._id)}
                                >
                                  <i className="bi bi-trash"></i> Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="add" title="Add New Client">
                  <div className="py-3">
                    <AddNewClient />
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientListPage;