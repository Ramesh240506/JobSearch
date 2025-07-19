import React from 'react'

import './NavComp.css'
import { NavLink } from 'react-router-dom'
const NavComp = () => {
  return (
    <div>
      <div className="job-navcomp-options">
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
                  <NavLink
                  to={"/contact"}
                  className={({ isActive }) =>
                    isActive ? "job-nav-activepage" : "job-nav-line"
                  }>
                    <li>Register</li>
                  </NavLink>
                  <NavLink
                  to={"/contact"}
                  className={({ isActive }) =>
                    isActive ? "job-nav-activepage" : "job-nav-line"
                  }>
                    <li>Login</li>
                  </NavLink>
                </ul>
              </div>
    </div>
  )
}

export default NavComp
