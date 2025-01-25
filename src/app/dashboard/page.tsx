"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect to login if token is missing
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Welcome to Moz Track</h1>
      <p className="text-center mb-5">
        Your one-stop solution for managing clients, projects, and timesheets effortlessly.
      </p>
      <div className="row justify-content-center">
        {/* Client Box */}
        <div className="col-md-3 mx-3">
          <div className="card text-center border shadow-sm" style={{ height: '250px' }}>
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">Clients</h5>
              <p className="card-text">Add and manage your clients seamlessly.</p>
              <Link href="/clients">
                <button className="btn btn-primary mt-auto">Go to Clients</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Project Box */}
        <div className="col-md-3 mx-3">
          <div className="card text-center border shadow-sm" style={{ height: '250px' }}>
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">Projects</h5>
              <p className="card-text">Add and manage your projects effortlessly.</p>
              <Link href="/projects">
                <button className="btn btn-success mt-auto">Go to Projects</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Timesheet Box */}
        <div className="col-md-3 mx-3">
          <div className="card text-center border shadow-sm" style={{ height: '250px' }}>
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">Timesheet</h5>
              <p className="card-text">Track and manage time efficiently.</p>
              <Link href="/timesheet" >
              <button className="btn btn-warning mt-auto"> Go to Timesheet</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default page;
