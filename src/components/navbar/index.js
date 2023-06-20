/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import LogoHTA from "../../assets/images/logo-hta.png";
import { Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { user, role } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

      setUser(user);
      setRole(role);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <section>
      <nav
        className="navbar navbar-expand-lg"
        style={{ background: "#DDE6ED" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand ms-4" href="/">
            <img src={LogoHTA} height="40" width="40" />
          </a>
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
              <NavLink to="/dashboard" exact className="nav-item" activeClassName = "active">
                Dashboard
              </NavLink>
              <NavLink to="/work-order-page" className="nav-item" activeClassName = "active">
                Work Order
              </NavLink>
              <NavLink to="/changeSparepart-page" className="nav-item" activeClassName = "active">
                Change Sparepart
              </NavLink>
              <NavLink to="/register-page" className="nav-item" activeClassName = "active">
                Register User
              </NavLink>
              <NavLink to="/departement-page" className="nav-item" activeClassName = "active">
                Departement
              </NavLink>
              <NavLink to="/group-page" className="nav-item" activeClassName = "active">
                Group
              </NavLink>
            </ul>
            <Badge badgeContent={4} color="primary" className="me-4">
              <MailIcon color="action" />
            </Badge>
            <ul class="navbar-nav">
              <li class="nav-item dropdown me-4">
                <h6
                  className="fw-semibold text-lg color-palette-1 me-3 mt-1 dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Hello, {user}
                </h6>
                <h6 className="fw-semibold text-lg color-palette-1">
                  Role: {role}
                </h6>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a class="dropdown-item" href="#">
                      Profile Settings
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Change Password
                    </a>
                  </li>
                  <li>
                    <Link
                      class="dropdown-item"
                      href="#"
                      onClick={() => handleLogout()}
                    >
                      Log Out
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Navbar;
