import React, { useState } from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import NavComp from "./NavComp";
const Nav = () => {
  const [menuBar,setmenuBar]=useState(false);

  return (
    <div>
      <div className="job-nav">
        <div className="job-navbar-menubar">
        <div className="job-title">
          <h1>Job Flow</h1>
        </div>
        <div className="m">
          <CiMenuFries color="orange" size={30} onClick={()=>setmenuBar(!menuBar)}/>
        </div>
        </div>
        
        <div className={"job-nav-options"}>
          <ul>
            <NavLink
              to={"/"}
              end
              className={({ isActive }) =>
                isActive ? "job-nav-activepage" : "job-nav-line"
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/findjobs"}
              className={({ isActive }) =>
                isActive ? "job-nav-activepage" : "job-nav-line"
              }
            >
              <li>Find Jobs</li>
            </NavLink>
            <NavLink
              to={"/foremployers"}
              className={({ isActive }) =>
                isActive ? "job-nav-activepage" : "job-nav-line"
              }
            >
              <li>For Employers</li>
            </NavLink>
            <NavLink
              to={"/favouritejobs"}
              className={({ isActive }) =>
                isActive ? "job-nav-activepage" : "job-nav-line"
              }
            >
              <li>Favourites</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                isActive ? "job-nav-activepage" : "job-nav-line"
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
        </div>
        <div className="job-nav-btn">
          <div className="job-reg-btn">
            <button>Register</button>
          </div>
          <div className="job-log-btn">
            <button>Login</button>
          </div>
        </div>
      </div>
        {menuBar ? <NavComp></NavComp> : null}
    </div>
  );
};

export default Nav;
