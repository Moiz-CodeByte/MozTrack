"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Navbar as BootstrapNavbar, Nav, Button, Container } from "react-bootstrap";
import Link from "next/link";

export default function Navbar() {
  const auth = useContext(AuthContext);

  if (!auth) {
    return null; // If the AuthContext is null, don't render anything
  }

  const { isAuthenticated, logout } = auth;
  

  return (
    <>   
            {isAuthenticated ? (
              <>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
             
                  <li className="nav-item">
                <Link href="/dashboard" className="nav-link bold text-dark">
                  Dashboard
                </Link>
              </li>
                </ul>
              </div>

              <Button
                variant="danger"
                onClick={logout}
                className="me-2"
              >
                Sign Out
              </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  href="/login"
                  className="me-2"
                >
                  Login
                </Button>
                <Button variant="success" href="/register">
                  Register
                </Button>
              </>
            )}
         </>
  );
}
