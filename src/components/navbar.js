import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true); // State for navbar collapse
  let data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed); // Toggle navbar state
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar} // Handle toggle manually
            aria-controls="navbarNav"
            aria-expanded={!isNavbarCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${
              isNavbarCollapsed ? "collapse" : "show"
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                  onClick={() => setIsNavbarCollapsed(true)} // Collapse on navigation
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrder"
                    onClick={() => setIsNavbarCollapsed(true)} // Collapse on navigation
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/login"
                  onClick={() => setIsNavbarCollapsed(true)} // Collapse on navigation
                >
                  Login
                </Link>

                <Link
                  className="btn bg-white text-success mx-1"
                  to="/creatuser"
                  onClick={() => setIsNavbarCollapsed(true)} // Collapse on navigation
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={() => setCartView(true)}
                >
                  My Cart <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
