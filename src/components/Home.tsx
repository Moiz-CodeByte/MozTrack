// pages/index.tsx
import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section with Gradient Background */}
      <section className="hero text-white text-left py-5" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)', minHeight: '500px', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">Welcome to Moz Track</h1>
              <p className="lead mb-4" style={{ fontSize: '1.25rem' }}>
                Effortlessly manage your clients, projects, and timesheets with Moz Track—your all-in-one solution for project management.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a href="#about" className="btn btn-light btn-lg px-4 py-2">
                  <i className="bi bi-rocket-takeoff me-2"></i>Get Started
                </a>
                <a href="#features" className="btn btn-outline-light btn-lg px-4 py-2">
                  <i className="bi bi-play-circle me-2"></i>Learn More
                </a>
              </div>
            </div>
            <div className="col-lg-4 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <div className="bg-white bg-opacity-10 rounded-circle p-4 mb-3" style={{ width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-graph-up-arrow text-white" style={{ fontSize: '5rem' }}></i>
                </div>
                <h5 className="text-white">Boost Productivity</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2>What is Moz Track?</h2>
              <p className="lead">
                Moz Track is designed to simplify the way businesses manage their workflow. Whether you're a freelancer or part of a team, Moz Track enables you to organize your client data, track projects, and manage timesheets in a single intuitive platform.
              </p>
              <p className="mb-4">
                Our platform combines simplicity with power, helping you save time and focus on what truly matters—delivering results.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="text-center p-4 bg-light rounded shadow-sm h-100">
                <div className="mb-3">
                  <i className="bi bi-speedometer2 text-primary" style={{ fontSize: '3rem' }}></i>
                </div>
                <h5 className="mb-3">Lightning Fast</h5>
                <p>Experience blazing-fast performance with our optimized platform designed for efficiency.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="text-center p-4 bg-light rounded shadow-sm h-100">
                <div className="mb-3">
                  <i className="bi bi-shield-check text-success" style={{ fontSize: '3rem' }}></i>
                </div>
                <h5 className="mb-3">Secure & Reliable</h5>
                <p>Your data is protected with enterprise-grade security and 99.9% uptime guarantee.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="text-center p-4 bg-light rounded shadow-sm h-100">
                <div className="mb-3">
                  <i className="bi bi-gear text-warning" style={{ fontSize: '3rem' }}></i>
                </div>
                <h5 className="mb-3">Easy Integration</h5>
                <p>Seamlessly integrate with your existing tools and workflows without any hassle.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Key Features</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm" style={{ height: '100%' }}>
                <div className="card-body">
                  <h5 className="card-title">Client Management</h5>
                  <p className="card-text">
                    Organize all your client information in one place, including project histories, communication, and deadlines.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm" style={{ height: '100%' }}>
                <div className="card-body">
                  <h5 className="card-title">Project Tracking</h5>
                  <p className="card-text">
                    Track all of your ongoing projects with detailed timelines, task assignments, and progress tracking.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm" style={{ height: '100%' }}>
                <div className="card-body">
                  <h5 className="card-title">Timesheet Management</h5>
                  <p className="card-text">
                    Manage your team's working hours and track time spent on tasks with easy-to-use timesheet integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appeal Section */}
      <section id="appeal" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2>Why Choose Moz Track?</h2>
              <p className="lead">
                Moz Track is not just a project management tool—it's a complete solution that evolves with your business. Say goodbye to messy spreadsheets and fragmented systems. With Moz Track, everything you need to run your projects efficiently is at your fingertips.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="text-center p-4 border rounded h-100 bg-white shadow-sm">
                <div className="mb-3">
                  <i className="bi bi-people-fill text-info" style={{ fontSize: '3rem' }}></i>
                </div>
                <h5 className="mb-3">Collaborate Seamlessly</h5>
                <p>Work together with your team in real-time, share updates, and stay synchronized across all projects.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="text-center p-4 border rounded h-100 bg-white shadow-sm">
                <div className="mb-3">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
                </div>
                <h5 className="mb-3">Track Progress Effortlessly</h5>
                <p>Monitor project milestones, deadlines, and deliverables with our intuitive progress tracking system.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="text-center p-4 border rounded h-100 bg-white shadow-sm">
                <div className="mb-3">
                  <i className="bi bi-clock-fill text-warning" style={{ fontSize: '3rem' }}></i>
                </div>
                <h5 className="mb-3">Save Time and Focus</h5>
                <p>Automate repetitive tasks and streamline workflows to focus on what matters most to your business.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="text-center p-4 border rounded h-100 bg-white shadow-sm">
                <div className="mb-3">
                  <i className="bi bi-graph-up-arrow text-primary" style={{ fontSize: '3rem' }}></i>
                </div>
                <h5 className="mb-3">Scale Your Business</h5>
                <p>Grow your operations with confidence using our scalable platform that adapts to your needs.</p>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12">
              <div className="bg-gradient text-white p-5 rounded shadow-lg text-center" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important' }}>
                <h3 className="mb-4">Ready to Transform Your Workflow?</h3>
                <p className="lead mb-4">Join thousands of professionals who have already revolutionized their project management with Moz Track.</p>
                <div className="row text-center">
                  <div className="col-md-3 col-6 mb-3">
                    <h4 className="mb-1">10,000+</h4>
                    <small>Active Users</small>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <h4 className="mb-1">99.9%</h4>
                    <small>Uptime</small>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <h4 className="mb-1">24/7</h4>
                    <small>Support</small>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <h4 className="mb-1">5★</h4>
                    <small>User Rating</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto text-center">
              <h2 className="mb-4">Get in Touch</h2>
              <p className="lead mb-4">
                Have questions or want to learn more about how Moz Track can streamline your work? Reach out to us!
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <a href="mailto:info@moztrack.com" className="btn btn-dark btn-lg">
                  <i className="bi bi-envelope me-2"></i>Email Us
                </a>
                <a href="#about" className="btn btn-outline-dark btn-lg">
                  <i className="bi bi-info-circle me-2"></i>Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;