import Link from "next/link";
import React from "react";

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
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link href="/services" className="dropdown-item">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="dropdown-item">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Login and Sign Up Buttons */}
            <div className="d-flex ms-3">
              <Link href="/login" className="btn btn-outline-primary me-2">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
