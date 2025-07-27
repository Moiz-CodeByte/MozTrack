import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";
const Header: React.FC = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* Logo */}
          <Link href="/" className="navbar-brand">
            Moz Track
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links and Buttons */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/contact-us" className="nav-link">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about-us" className="nav-link">
                  About Us
                </Link>
              </li>
            </ul>

            {/* Login and Sign Up Buttons */}
            <Navbar/>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
