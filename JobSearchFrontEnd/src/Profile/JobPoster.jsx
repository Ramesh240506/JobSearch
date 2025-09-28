import React from "react";

import { FaRegFileAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { TbUsers } from "react-icons/tb";
import { CgInsights } from "react-icons/cg";
import ApplicationDetails from "@/DataManage/ApplicationDetails";
import { useState } from "react";
import "./JobPoster.css";
import { Stack, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
const JobPoster = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const size = 3;
  const navigate=useNavigate();

  return (
    <div>
      <div className="job-employer-dashboard">
        <h1>Hiring Dashboard</h1>
        <nav style={{display:'flex',justifyContent:'space-between'}}>
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
          <button onClick={()=>navigate('/postjob')} style={{background:"black",cursor:'pointer',color:"white",padding:"15px 30px",borderRadius:"7px"}}>Post Job</button>
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
                <h2>5</h2>
              </div>
            </div>
            <div className="job-employer-overview-item">
              <div>
                <h4>Active Jobs</h4>
                <h2>3</h2>
              </div>
            </div>
          
          </div>
        )}
        
      </div>
    </div>
  );
};

export default JobPoster;
