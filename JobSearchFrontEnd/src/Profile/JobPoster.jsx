import React, { useEffect } from "react";

import { FaRegFileAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { TbUsers } from "react-icons/tb";
import { CgInsights } from "react-icons/cg";
import ApplicationDetails from "@/DataManage/ApplicationDetails";
import { useState } from "react";
import "./JobPoster.css";
import { Stack, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jobsCount } from "@/Services/JobService";
const JobPoster = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [jobs,setJobs] = useState([]);
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((job) => job.status === "active").length;
  const navigate = useNavigate();

  const getJobs = async () => {
    
    const response = await jobsCount();
    setJobs(response);
  }
  useEffect(() => {
    getJobs();
  }, []);
  return (
    <div>
      <div className="job-employer-dashboard">
        <h1>Hiring Dashboard</h1>
        <nav style={{ display: "flex", justifyContent: "space-between" }}>
          <ul className="dashboard-nav-tabs">
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
          <button
            onClick={() => navigate("/postjob")}
            style={{
              background: "black",
              cursor: "pointer",
              color: "white",
              padding: "15px 35px",
              borderRadius: "7px",
            }}
          >
            Post Job
          </button>
        </nav>
        {activeTab === "joblistings" ? (
          <>
            <ApplicationDetails></ApplicationDetails>
          </>
        ) : (
          <div className="job-employer-overview">
            <div className="job-employer-overview-item">
              <div>
                <h4>Total Jobs</h4>
                <h2>{totalJobs}</h2>
              </div>
            </div>
            <div className="job-employer-overview-item">
              <div>
                <h4>Active Jobs</h4>
                <h2>{activeJobs}</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPoster;
