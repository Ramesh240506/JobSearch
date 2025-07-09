import React from "react";
import "./ForEmployers.css";
import { FaRegFileAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { TbUsers } from "react-icons/tb";
import { CgInsights } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
const ForEmployers = () => {
  const navigate=useNavigate();
  return (
    <div>
      <div className="job-employer-page">
        <div className="job-employer-header">
          <h1>Find the perfect talent for your team</h1>
          <p>
            Post jobs,screen candidates and build your dream team with our
            powerful employer tools
          </p>
          <div className="job-employer-btn">
            <button onClick={()=>{navigate('/postjob')}}>Post a Job</button>
          </div>
        </div>
        <div className="job-employer-content">
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
            <p style={{opacity:"0.6"}}>
              Created detailed job listings with custom screening questions and
              requirements
            </p>
            <div className="job-employer-steps-list">
            <p><TiTick/> Branded company profile</p>
            <p><TiTick/> Custom application forms</p>
            <p><TiTick/> Job Description help</p>
            </div>
          </div>
          <div className="job-employer-main">
            <TbUsers size={30} />
            <h3>Candidate Management</h3>
            <p style={{opacity:"0.6"}}>
              Organize,evaluate and communicate with applicants efficiently
            </p>
            <div className="job-employer-steps-list">
            <p><TiTick/> Collaborative Hiring pipeline</p>
            <p><TiTick/> Automated Resume Screening</p>
            <p><TiTick/> Interview Scheduling tools</p>
            </div>
          </div>
          <div className="job-employer-main">
            <CgInsights size={30} />
            <h3>Analytics and insights</h3>
            <p style={{opacity:"0.6"}}>
              Track performance and optimize your recruitment strategy
            </p>
            <div className="job-employer-steps-list">
            <p><TiTick/>Branded company profile</p>
            <p><TiTick/> Custom application forms</p>
            <p><TiTick/> Job Description help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForEmployers;
