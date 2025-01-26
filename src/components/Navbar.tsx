"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Navbar as BootstrapNavbar, Nav, Button, Container } from "react-bootstrap";

export default function Navbar() {
  const auth = useContext(AuthContext);

  if (!auth) {
    return null; // If the AuthContext is null, don't render anything
  }

  const { isAuthenticated, logout } = auth;
  

  return (
    <>   
            {isAuthenticated ? (
              <Button
                variant="danger"
                onClick={logout}
                className="me-2"
              >
                Sign Out
              </Button>
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
