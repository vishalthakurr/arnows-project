import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { removeUserSession } from "../utils/Common";

export default function Navbar() {
  let history = useHistory();

  const userlogout = () => {
    removeUserSession();
    history.push("/login");
  };
  let location = useLocation();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light bottom-1  ">
        <div className="container-fluid">
          <div className="navbar-brand">Assignment</div>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/dashboard" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/createBlog" ? "active" : ""
                  }`}
                  to="/createBlog"
                >
                  Add Blog
                </Link>
              </li>
            </ul>
            <Link to="/profile">
              <button className="btn btn-outline-primary">
                <div> Profile</div>
              </button>
            </Link>
            <button className="btn btn-outline-danger mx-2" onClick={userlogout}>
              <span>logout</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
