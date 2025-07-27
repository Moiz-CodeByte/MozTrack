"use client";

import React, { useState } from 'react';
import { Container, Row, Col, Card, Tabs, Tab, Alert } from 'react-bootstrap';
import AddProject from '@/components/AddProject';
import GetAllProjects from '@/components/GetAllProjects';

function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('list');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  const showAlert = (message, variant = 'success') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setTimeout(() => setAlertMessage(''), 5000);
  };

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center mb-4">Project Management</h1>
          <p className="text-center text-muted">
            Create and manage your projects efficiently
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
                <Tab eventKey="list" title="Project List">
                  <GetAllProjects />
                </Tab>
                <Tab eventKey="add" title="Add New Project">
                  <div className="py-3">
                    <AddProject />
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>

   
    </Container>
  );
}

export default ProjectsPage;
