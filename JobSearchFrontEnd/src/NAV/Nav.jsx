import React, { useState } from "react";
import "./Nav.css";
import { NavLink, useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
const Nav = () => {
  const [menuBar,setmenuBar]=useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  }
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
              to={"/jobhome"}
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
          <div onClick={()=>navigate('/userprofile')} className="user-profile" style={{ display: "flex", alignItems: "center" ,marginRight: "10px"}}>
          <CgProfile size={35}></CgProfile>
          </div>
          <div className="job-log-btn">
            <button onClick={handleLogout}>Logout</button>
          </div>
      </div>
          {menuBar && (
  <div className="mobile-nav-menu">
    <ul>
      <NavLink to={"/jobhome"} className={({ isActive }) => isActive ? "job-nav-activepage" : "job-nav-line"} onClick={() => setmenuBar(false)}>
        <li>Home</li>
      </NavLink>
      <NavLink to={"/findjobs"} className={({ isActive }) => isActive ? "job-nav-activepage" : "job-nav-line"} onClick={() => setmenuBar(false)}>
        <li>Find Jobs</li>
      </NavLink>
      <NavLink to={"/favouritejobs"} className={({ isActive }) => isActive ? "job-nav-activepage" : "job-nav-line"} onClick={() => setmenuBar(false)}>
        <li>Favourites</li>
      </NavLink>
      <NavLink to={"/contact"} className={({ isActive }) => isActive ? "job-nav-activepage" : "job-nav-line"} onClick={() => setmenuBar(false)}>
        <li>Contact</li>
      </NavLink>
    </ul>
  </div>
)}
        </div>

    </div>
  );
};

export default Nav;
