import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Projects</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
