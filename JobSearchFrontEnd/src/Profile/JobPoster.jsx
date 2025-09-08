import React from 'react'

import { FaRegFileAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { TbUsers } from "react-icons/tb";
import { CgInsights } from "react-icons/cg";
import ApplicationDetails from "@/DataManage/ApplicationDetails";
import { useState } from 'react';
import "./JobPoster.css";
const JobPoster = () => {
    const [activeTab, setActiveTab] = useState("overview");
  return (
    <div>
      <div className="job-employer-dashboard">
          <h1>Hiring Dashboard</h1>
          <nav>
            <ul>
              <li
                className={activeTab === "overview" ? "active" : ""}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </li>
              <li
                className={activeTab === "joblistings" ? "active" : ""}
                onClick={() => setActiveTab("joblistings")}
              >
                Job Listings
              </li>
            </ul>
          </nav>
          {activeTab === "joblistings" ? (
            <ApplicationDetails></ApplicationDetails>
          ) : (
            <div className="job-employer-overview">
              <div className="job-employer-overview-item">
                <div>
                  <h4>Total Jobs</h4>
                  <h2>5</h2>
                </div>
              </div>
              <div className="job-employer-overview-item">
                <div>
                  <h4>Active Jobs</h4>
                  <h2>3</h2>
                </div>
              </div>
              <div className="job-employer-overview-item">
                <div>
                  <h4>Total Applicants</h4>
                  <h2>10</h2>
                </div>
              </div>
            </div>
          )}
        </div>
       
    </div>
  )
}

export default JobPoster
