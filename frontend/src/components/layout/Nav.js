import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/components/layout/Nav.css';

const Nav = (props) => {
  return (
    <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <NavLink to="/notes" className={({ isActive })  => isActive ? 'active' : "a"}>Active Notes</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/archived" className={({ isActive })  => isActive ? 'active' : "a"}>Archived Notes</NavLink>
          </li>
        </ul>
    </nav>
  );
}

export default Nav;
