"use client";

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AboutUsPage = () => {
  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="justify-content-center text-center mb-5">
        <Col md={10}>
          <h1 className="display-3 fw-bold text-primary mb-4">About Moz Track</h1>
          <p className="lead text-muted fs-4">
            Empowering teams and individuals to track time, manage projects, and boost productivity 
            with our comprehensive time tracking solution.
          </p>
        </Col>
      </Row>

      {/* Mission Section */}
      <Row className="mb-5">
        <Col md={6} className="mb-4">
          <Card className="h-100 border-0 shadow-lg">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <i className="bi bi-bullseye fs-2"></i>
                </div>
                <h3 className="fw-bold text-primary">Our Mission</h3>
              </div>
              <p className="text-muted fs-5 text-center">
                To revolutionize how teams track time and manage projects by providing 
                intuitive, powerful tools that enhance productivity and streamline workflows.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="h-100 border-0 shadow-lg">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <i className="bi bi-eye fs-2"></i>
                </div>
                <h3 className="fw-bold text-success">Our Vision</h3>
              </div>
              <p className="text-muted fs-5 text-center">
                To become the leading time tracking platform that empowers organizations 
                worldwide to achieve their goals through better time management and project oversight.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="mb-5">
        <Col md={12} className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-3">Why Choose Moz Track?</h2>
          <p className="lead text-muted">
            Discover the features that make us the preferred choice for time tracking
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-4">
          <div className="text-center p-4">
            <div className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '70px', height: '70px'}}>
              <i className="bi bi-stopwatch fs-3"></i>
            </div>
            <h4 className="fw-bold mb-3">Accurate Time Tracking</h4>
            <p className="text-muted">
              Precise time tracking with easy start/stop functionality and detailed reporting 
              to help you understand where your time goes.
            </p>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="text-center p-4">
            <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '70px', height: '70px'}}>
              <i className="bi bi-kanban fs-3"></i>
            </div>
            <h4 className="fw-bold mb-3">Project Management</h4>
            <p className="text-muted">
              Organize your work with comprehensive project management tools that keep 
              your team aligned and productive.
            </p>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="text-center p-4">
            <div className="bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '70px', height: '70px'}}>
              <i className="bi bi-people fs-3"></i>
            </div>
            <h4 className="fw-bold mb-3">Client Management</h4>
            <p className="text-muted">
              Manage client relationships effectively with detailed client profiles 
              and project associations.
            </p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-4">
          <div className="text-center p-4">
            <div className="bg-secondary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '70px', height: '70px'}}>
              <i className="bi bi-graph-up fs-3"></i>
            </div>
            <h4 className="fw-bold mb-3">Analytics & Reports</h4>
            <p className="text-muted">
              Gain insights with powerful analytics and customizable reports that help 
              you make data-driven decisions.
            </p>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="text-center p-4">
            <div className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '70px', height: '70px'}}>
              <i className="bi bi-shield-check fs-3"></i>
            </div>
            <h4 className="fw-bold mb-3">Secure & Reliable</h4>
            <p className="text-muted">
              Your data is protected with enterprise-grade security and reliable 
              infrastructure ensuring 99.9% uptime.
            </p>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="text-center p-4">
            <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '70px', height: '70px'}}>
              <i className="bi bi-phone fs-3"></i>
            </div>
            <h4 className="fw-bold mb-3">24/7 Support</h4>
            <p className="text-muted">
              Get help when you need it with our round-the-clock customer support 
              and comprehensive documentation.
            </p>
          </div>
        </Col>
      </Row>

      {/* Stats Section */}
      <Row className="mt-5">
        <Col md={12}>
          <div className="bg-gradient text-white p-5 rounded shadow-lg text-center" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important'}}>
            <h3 className="mb-4 fw-bold">Trusted by Thousands</h3>
            <Row className="text-center">
              <Col md={3} className="mb-3">
                <h2 className="fw-bold mb-1">10,000+</h2>
                <p className="mb-0">Active Users</p>
              </Col>
              <Col md={3} className="mb-3">
                <h2 className="fw-bold mb-1">50,000+</h2>
                <p className="mb-0">Projects Managed</p>
              </Col>
              <Col md={3} className="mb-3">
                <h2 className="fw-bold mb-1">1M+</h2>
                <p className="mb-0">Hours Tracked</p>
              </Col>
              <Col md={3} className="mb-3">
                <h2 className="fw-bold mb-1">99.9%</h2>
                <p className="mb-0">Uptime</p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* Team Section */}
      <Row className="mt-5">
        <Col md={12} className="text-center">
          <h2 className="display-5 fw-bold text-dark mb-5">Our Story</h2>
          <div className="mx-auto" style={{maxWidth: '800px'}}>
            <p className="fs-5 text-muted mb-4">
              Founded in 2024, Moz Track was born from the frustration of using complex, 
              outdated time tracking tools. Our team of developers and project managers 
              came together with a simple goal: create a time tracking solution that's 
              both powerful and easy to use.
            </p>
            <p className="fs-5 text-muted mb-4">
              Today, we're proud to serve thousands of users worldwide, from freelancers 
              to large enterprises, helping them take control of their time and boost 
              their productivity.
            </p>
            <p className="fs-5 text-muted">
              We're constantly innovating and improving our platform based on user feedback, 
              ensuring that Moz Track remains the best time tracking solution available.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsPage;