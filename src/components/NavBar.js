import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/tasks">Tasks</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Link to="/">HomePage</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
