"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import TimeTrackerChart from "@/components/TimeTrackerChart";
import PieTimeTrackerChart from "@/components/PieTimeTrackerChart";
import axios from "axios";

const DashboardPage = () => {
  const router = useRouter();
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    timesheets: 0,
    totalHours: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect to login if token is missing
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch dashboard statistics
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch clients
        const clientsResponse = await axios.get("http://localhost:5000/api/clients/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Fetch projects
        const projectsResponse = await axios.get("http://localhost:5000/api/projects/getprojects", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Fetch timesheets
        const timesheetsResponse = await axios.get("http://localhost:5000/api/timesheets/getTimesheet", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Calculate total hours from timesheets
        const totalSeconds = timesheetsResponse.data.timesheets.reduce(
          (sum, timesheet) => sum + timesheet.timerValue, 0
        );
        
        setStats({
          clients: clientsResponse.data.clients.length,
          projects: projectsResponse.data.projects.length,
          timesheets: timesheetsResponse.data.timesheets.length,
          totalHours: Math.round((totalSeconds / 3600) * 10) / 10 // Convert to hours with 1 decimal
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center mb-3">Dashboard</h1>
          <p className="text-center text-muted">
            Welcome to Moz Track - Your time tracking solution
          </p>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <div className="alert alert-danger">{error}</div>
          </Col>
        </Row>
      )}

      {/* Stats Cards */}
      <Row className="mb-5">
        <Col md={3}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-people text-primary" style={{ fontSize: "2rem" }}></i>
              </div>
              <h2>{loading ? "-" : stats.clients}</h2>
              <p className="text-muted mb-0">Clients</p>
            </Card.Body>
            <Card.Footer className="bg-white border-0">
              <Link href="/clients">
                <Button variant="outline-primary" size="sm" className="w-100">
                  View Clients
                </Button>
              </Link>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-kanban text-success" style={{ fontSize: "2rem" }}></i>
              </div>
              <h2>{loading ? "-" : stats.projects}</h2>
              <p className="text-muted mb-0">Projects</p>
            </Card.Body>
            <Card.Footer className="bg-white border-0">
              <Link href="/projects">
                <Button variant="outline-success" size="sm" className="w-100">
                  View Projects
                </Button>
              </Link>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-clock-history text-info" style={{ fontSize: "2rem" }}></i>
              </div>
              <h2>{loading ? "-" : stats.timesheets}</h2>
              <p className="text-muted mb-0">Timesheets</p>
            </Card.Body>
            <Card.Footer className="bg-white border-0">
              <Link href="/timesheet">
                <Button variant="outline-info" size="sm" className="w-100">
                  View Timesheets
                </Button>
              </Link>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-hourglass-split text-warning" style={{ fontSize: "2rem" }}></i>
              </div>
              <h2>{loading ? "-" : stats.totalHours}</h2>
              <p className="text-muted mb-0">Total Hours</p>
            </Card.Body>
            <Card.Footer className="bg-white border-0">
              <Badge bg="warning" text="dark" className="w-100 py-2">
                Hours Tracked
              </Badge>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="mb-5">
        <Col lg={6} className="mb-4 mb-lg-0">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Time Distribution</h5>
            </Card.Header>
            <Card.Body>
              <TimeTrackerChart />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Project Analytics</h5>
            </Card.Header>
            <Card.Body>
              <PieTimeTrackerChart />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4} className="mb-3 mb-md-0">
                  <Link href="/clients">
                    <Button variant="outline-primary" className="w-100">
                      <i className="bi bi-plus-circle me-2"></i> New Client
                    </Button>
                  </Link>
                </Col>
                <Col md={4} className="mb-3 mb-md-0">
                  <Link href="/projects">
                    <Button variant="outline-success" className="w-100">
                      <i className="bi bi-plus-circle me-2"></i> New Project
                    </Button>
                  </Link>
                </Col>
                <Col md={4} className="mb-3 mb-md-0">
                  <Link href="/timesheet">
                    <Button variant="outline-info" className="w-100">
                      <i className="bi bi-plus-circle me-2"></i> New Timesheet
                    </Button>
                  </Link>
                </Col>
               
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
