"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Navbar as BootstrapNavbar, Container } from "react-bootstrap";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Function to check if token exists
  const checkToken = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Update state based on token presence
  };

  useEffect(() => {
    // Check token on initial render
    checkToken();
  }, []);

  const handleSignOut = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Update state
    setIsLoggedIn(false);

    // Redirect to login page
    router.push("/login");
  };

  return (
   
       
        <div>
          {isLoggedIn ? (
            <Button variant="danger" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                variant="primary"
                href="/login"
                className="me-2"
                onClick={checkToken} // Update state after login
              >
                Login
              </Button>
              <Button
                variant="success"
                href="/register"
                onClick={checkToken} // Update state after registration
              >
                Register
              </Button>
            </>
          )}
        </div>
     
  );
}
