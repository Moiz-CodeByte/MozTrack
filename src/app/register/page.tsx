"use client";

import { useState, ChangeEvent, FormEvent, useEffect, useContext } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const auth = useContext(AuthContext);

  if (!auth) {
    return null; // If the AuthContext is null, don't render anything
  }

  const { isAuthenticated, login } = auth;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        formData
      );
      setMessage(response.data.message);

      if (response.data.token) {
        login(response.data.token); // Use the login method from AuthContext
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      setMessage("Registration failed");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="card shadow-lg border-0" style={{
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)'
            }}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                  }}>
                    <i className="bi bi-person-plus-fill fs-2"></i>
                  </div>
                  <h2 className="fw-bold text-dark mb-2">Create Account</h2>
                  <p className="text-muted">Join us and start tracking your time</p>
                </div>

                {message && (
                  <Alert variant="success" className="border-0 rounded-3 mb-4" style={{
                    backgroundColor: 'rgba(25, 135, 84, 0.1)',
                    color: '#198754'
                  }}>
                    <i className="bi bi-check-circle-fill me-2"></i>
                    {message}
                  </Alert>
                )}
                
                {error && (
                  <Alert variant="danger" className="border-0 rounded-3 mb-4" style={{
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    color: '#dc3545'
                  }}>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName" className="mb-4">
                    <Form.Label className="fw-semibold text-dark">
                      <i className="bi bi-person-fill me-2 text-success"></i>
                      Full Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-control-lg border-0 shadow-sm"
                      style={{
                        borderRadius: '15px',
                        backgroundColor: 'rgba(248, 249, 250, 0.8)',
                        padding: '15px 20px'
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-4">
                    <Form.Label className="fw-semibold text-dark">
                      <i className="bi bi-envelope-fill me-2 text-success"></i>
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control-lg border-0 shadow-sm"
                      style={{
                        borderRadius: '15px',
                        backgroundColor: 'rgba(248, 249, 250, 0.8)',
                        padding: '15px 20px'
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-4">
                    <Form.Label className="fw-semibold text-dark">
                      <i className="bi bi-lock-fill me-2 text-success"></i>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create a strong password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="form-control-lg border-0 shadow-sm"
                      style={{
                        borderRadius: '15px',
                        backgroundColor: 'rgba(248, 249, 250, 0.8)',
                        padding: '15px 20px'
                      }}
                    />
                  </Form.Group>

                  <Button 
                    type="submit"
                    className="btn-lg w-100 text-white fw-semibold mb-4 border-0"
                    style={{
                      background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                      borderRadius: '15px',
                      padding: '15px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(40, 167, 69, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <i className="bi bi-person-plus-fill me-2"></i>
                    Create Account
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Already have an account? 
                      <a href="/login" className="text-success fw-semibold text-decoration-none ms-1">
                        Sign in here
                      </a>
                    </p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;