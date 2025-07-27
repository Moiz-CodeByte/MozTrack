"use client";

import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setShowAlert(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-3">Contact Us</h1>
            <p className="lead text-muted">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {showAlert && (
            <Alert variant="success" className="mb-4">
              <i className="bi bi-check-circle-fill me-2"></i>
              Thank you for your message! We'll get back to you soon.
            </Alert>
          )}

          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        <i className="bi bi-person-fill me-2 text-primary"></i>
                        Full Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        <i className="bi bi-envelope-fill me-2 text-primary"></i>
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    <i className="bi bi-chat-text-fill me-2 text-primary"></i>
                    Subject
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    <i className="bi bi-pencil-fill me-2 text-primary"></i>
                    Message
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    required
                    className="form-control-lg"
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="btn-primary px-5 py-3 fw-semibold"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '50px'
                    }}
                  >
                    <i className="bi bi-send-fill me-2"></i>
                    Send Message
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Contact Information */}
          <Row className="mt-5">
            <Col md={4} className="text-center mb-4">
              <div className="p-4">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                  <i className="bi bi-envelope-fill fs-4"></i>
                </div>
                <h5 className="fw-bold">Email Us</h5>
                <p className="text-muted">info@moztrack.com</p>
              </div>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="p-4">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                  <i className="bi bi-telephone-fill fs-4"></i>
                </div>
                <h5 className="fw-bold">Call Us</h5>
                <p className="text-muted">+1 (555) 123-4567</p>
              </div>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="p-4">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                  <i className="bi bi-clock-fill fs-4"></i>
                </div>
                <h5 className="fw-bold">Support Hours</h5>
                <p className="text-muted">24/7 Available</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUsPage;