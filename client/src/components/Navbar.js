import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom"
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = event => {
    auth.logout();
    history.push("/")
  };

  return(
    <nav>
      <div className="nav-wrapper blue lighten-2">
        <span className="brand-logo">LinkMe</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Create Link</NavLink></li>
          <li><NavLink to="/links">Links</NavLink></li>
          <li><a onClick={logoutHandler} >Logout</a></li>
        </ul>
      </div>
    </nav>
  )
}