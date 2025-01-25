// pages/index.tsx
import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="hero text-white text-left py-5" style={{ backgroundImage: 'url(/hero-image.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container">
          <h1>Welcome to Moz Track</h1>
          <p className="lead col-md-6">
            Effortlessly manage your clients, projects, and timesheets with Moz Track—your all-in-one solution for project management.
          </p>
          <a href="#about" className="btn btn-light btn-lg">Get Started</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container d-flex justify-content-between">
          <div className="col-md-6">
            <h2>What is Moz Track?</h2>
            <p>
              Moz Track is designed to simplify the way businesses manage their workflow. Whether you’re a freelancer or part of a team, Moz Track enables you to organize your client data, track projects, and manage timesheets in a single intuitive platform.
            </p>
            <p>
              Our platform combines simplicity with power, helping you save time and focus on what truly matters—delivering results.
            </p>
          </div>
          <div className="col-md-5">
            <img src="/about-image.jpg" alt="About Moz Track" className="img-fluid rounded shadow-sm" />
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
                    Manage your team’s working hours and track time spent on tasks with easy-to-use timesheet integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appeal Section */}
      <section id="appeal" className="py-5">
        <div className="container d-flex justify-content-between">
          <div className="col-md-6">
            <h2>Why Choose Moz Track?</h2>
            <p className="lead">
              Moz Track is not just a project management tool—it’s a complete solution that evolves with your business. Say goodbye to messy spreadsheets and fragmented systems. With Moz Track, everything you need to run your projects efficiently is at your fingertips.
            </p>
            <div className="row">
              <div className="col-md-4">
                <div className="border p-3 text-center rounded" style={{height: '100%'}}>
                  <h3><i className="bi bi-people-fill"></i></h3>
                  <p>Collaborate Seamlessly</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="border p-3 text-center rounded" style={{height: '100%'}}>
                  <h3><i className="bi bi-check-circle-fill"></i></h3>
                  <p>Track Progress Effortlessly</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="border p-3 text-center rounded" style={{height: '100%'}}>
                  <h3><i className="bi bi-clock-fill"></i></h3>
                  <p>Save Time and Focus</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <img src="/appeal-image.jpg" alt="Why Choose Moz Track" className="img-fluid rounded shadow-sm" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4">Get in Touch</h2>
          <p className="lead">
            Have questions or want to learn more about how Moz Track can streamline your work? Reach out to us!
          </p>
          <a href="mailto:info@moztrack.com" className="btn btn-dark btn-lg">Email Us</a>
        </div>
      </section>
    </div>
  );
};

export default Home;