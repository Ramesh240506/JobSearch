import React, { useEffect, useState } from "react";
import "./JobDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { appliedUsers, getJobById, getUserApplication } from "@/Services/JobService";
import { formatDistanceToNow } from "date-fns";
const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState({
    id: 1,
    jobTitle: "",
    companyName: "",
    jobLocation: "",
    minSalary: "",
    maxSalary: "",
    jobType: "",
    postedAt: "",
    jobDescription:
      "",
    requirements: "l",
    skills: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    fetchJobDetails(id);
  }, []);

  const handleApply=()=>{
    // appliedUsers(id);
    // console.log("Applying for job with ID:", id);
    navigate(`/jobapplicationform/${id}`);
  }
  const fetchJobDetails = async (jobId) => {
    const response = await getJobById(jobId);
    setJobDetails(response);
    console.log(response);
  };
  return (
    <div>
      <div className="job-details-container">
        <h1 className="job-details-title">{jobDetails.jobTitle}</h1>
        <h2 className="job-details-company">{jobDetails.companyName}</h2>

        <div className="job-details-info">
          <p className="job-details-location">📍{jobDetails.jobLocation}</p>
          <p className="job-details-type">💼{jobDetails.jobType}</p>
          <p className="job-details-posted">
            ⏰
            {jobDetails.postedAt &&
              formatDistanceToNow(new Date(jobDetails.postedAt), {
                addSuffix: true,
              })}
          </p>
        </div>
      </div>
      <div className="job-details-salary">
        <p className="job-details-salary-range">
          💰Salary: {jobDetails.minSalary} - {jobDetails.maxSalary}
        </p>
      </div>

      <div className="job-details-description">
        <h3 className="job-details-description-title">Job Description</h3>
        <p className="job-details-description-text">{jobDetails.jobDescription}</p>
      </div>

      <div className="job-details-qualifications">
        <h3 className="job-details-qualifications-title">Qualifications</h3>
        <ul className="job-details-qualifications-list">
          <li>{jobDetails.requirements}</li>
        </ul>
      </div>

      <div className="job-details-tags">
        <h3 className="job-details-tags-title">Technologies We Use</h3>
        <div className="job-details-tags-list">
          {/* {jobDetails.skills.map((tag, index) => (
                        <span key={index} className="job-details-tag">{tag} </span>
                    ))} */}
        </div>
      </div>
      <div className="job-details-benefits">
        <h3 className="job-details-benefits-title">Benefits</h3>
        <ul className="job-details-benefits-list">
          <li className="job-details-benefit-item">Health Insurance</li>
          <li className="job-details-benefit-item">401(k) Plan</li>
          <li className="job-details-benefit-item">Flexible Work Hours</li>
          <li className="job-details-benefit-item">Remote Work Options</li>
        </ul>
      </div>

      <div className="job-details-apply">
        <button onClick={handleApply} className="job-details-apply-button">Apply Now</button>
      </div>
    </div>
  );
};

export default JobDetails;
