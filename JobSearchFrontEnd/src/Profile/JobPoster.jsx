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
        {/* <div className="job-employer-content">
          <h1>Powerful Employer Tools</h1>
          <p>
            Everything you need to streamline your hiring process and find the
            best candidates.
          </p>
        </div>
        <div className="job-employer-steps">
          <div className="job-employer-main">
            <FaRegFileAlt size={30} />
            <h3>Job Posting</h3>
            <p style={{ opacity: "0.6" }}>
              Created detailed job listings with custom screening questions and
              requirements
            </p>
            <div className="job-employer-steps-list">
              <p>
                <TiTick /> Branded company profile
              </p>
              <p>
                <TiTick /> Custom application forms
              </p>
              <p>
                <TiTick /> Job Description help
              </p>
            </div>
          </div>
          <div className="job-employer-main">
            <TbUsers size={30} />
            <h3>Candidate Management</h3>
            <p style={{ opacity: "0.6" }}>
              Organize,evaluate and communicate with applicants efficiently
            </p>
            <div className="job-employer-steps-list">
              <p>
                <TiTick /> Collaborative Hiring pipeline
              </p>
              <p>
                <TiTick /> Automated Resume Screening
              </p>
              <p>
                <TiTick /> Interview Scheduling tools
              </p>
            </div>
          </div>
          <div className="job-employer-main">
            <CgInsights size={30} />
            <h3>Analytics and insights</h3>
            <p style={{ opacity: "0.6" }}>
              Track performance and optimize your recruitment strategy
            </p>
            <div className="job-employer-steps-list">
              <p>
                <TiTick />
                Branded company profile
              </p>
              <p>
                <TiTick /> Custom application forms
              </p>
              <p>
                <TiTick /> Job Description help
              </p>
            </div>
          </div>
        </div> */}
    </div>
  )
}

export default JobPoster
