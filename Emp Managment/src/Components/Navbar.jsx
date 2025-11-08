import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ background: "#007bff", padding: "10px" }}>
    <Link to="/" >
      Employees
    </Link>
    <Link to="/add" style={{ color: "white" }}>
      Add Employee
    </Link>
  </nav>
);

export default Navbar;
