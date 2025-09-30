import React, { useEffect, useState } from "react";
import "./JobDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, JobSeekerAppliedStatus } from "@/Services/JobService";
import { formatDistanceToNow } from "date-fns";
const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState({});

  const navigate = useNavigate();
  const [appliedStatus, setAppliedStatus] = useState(false);
  const { id } = useParams();
  const getStatus = async () => {
    const response = await JobSeekerAppliedStatus(id);
    setAppliedStatus(response);
    console.log(response);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getStatus();
    fetchJobDetails(id);
  }, []);

  const handleApply = () => {
    
    navigate(`/jobapplicationform/${id}`);
  };
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
        <p className="job-details-description-text">
          {jobDetails.jobDescription}
        </p>
      </div>

      <div className="job-details-qualifications">
        <h3 className="job-details-qualifications-title">Qualifications</h3>
        <ul className="job-details-qualifications-list">
          {jobDetails?.qualifications
            ?.split(".")
            .filter((qualification) => qualification.trim().length > 1)
            .map((qualification, i) => (
              <li key={i} className="job-details-qualification-item">
                {qualification.trim()}
              </li>
            ))}
        </ul>
      </div>
      <div className="job-details-qualifications">
        <h3 className="job-details-qualifications-title">Requirements</h3>
        <ul className="job-details-qualifications-list">
          {jobDetails?.requirements
            ?.split(".")
            .filter((requirement) => requirement.trim().length > 1)
            .map((requirement, i) => (
              <li key={i} className="job-details-qualification-item">
                {requirement.trim()}
              </li>
            ))}
        </ul>
      </div>
      <div className="job-details-tags">
        <h3 className="job-details-tags-title">Technologies We Use</h3>
        <div className="job-details-tags-list">
          {jobDetails?.skills?.split(",").map((tag, index) => (
            <span key={index} className="job-details-tag">
              {tag}{" "}
            </span>
          ))}
        </div>
      </div>
      {jobDetails?.benefits && jobDetails.benefits.length > 0 && (
        <div className="job-details-benefits">
          <h3 className="job-details-benefits-title">Benefits</h3>
          <ul className="job-details-benefits-list">
            {jobDetails?.benefits?.split(".").filter((benefit) => benefit.trim().length > 1).map((benefit, i) => (
              <li key={i} className="job-details-benefit-item">
                {benefit.trim()}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="job-details-apply">
        {appliedStatus ? (
          <button disabled className="job-details-apply-button">
            Applied
          </button>
        ) : (
          <button onClick={handleApply} className="job-details-apply-button">
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
