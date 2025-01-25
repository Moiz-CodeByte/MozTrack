import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Moz Track</h5>
            <p>&copy; {new Date().getFullYear()} Moz Track. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <a
              href="/privacy"
              className="text-light text-decoration-none me-3"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-light text-decoration-none"
            >
              Terms of Service
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;