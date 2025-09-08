import {
  JobSeekerApplicationStatus,
  JobSeekerApplicationStatusByJobId,
  JobSeekerAppliedJobDetails,
} from "@/Services/JobService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ViewAppliedStatus.css'
const ViewAppliedStatus = () => {
  const [applicationDetails, setApplicationDetails] = useState();
  const { id } = useParams();
  const [applicationStatus, setApplicationStatus] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await JobSeekerAppliedJobDetails(id);
        console.log(response);
        setApplicationDetails(response);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }

      try {
        const response = await JobSeekerApplicationStatusByJobId(id);
        console.log(response);
        setApplicationStatus(response);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div>
      <div className="applied-job-details">
        <h2>Applied Status</h2>
        <h3>{applicationDetails?.companyName}</h3>
        
        <hr style={{marginTop:"20px", marginBottom:"20px"}}></hr>
        <div className="applied-job-information">
          <h3>Job Information</h3>
          <p>Job Title: {applicationDetails?.jobTitle}</p>
          <p>Salary: ${applicationDetails?.minSalary} - ${applicationDetails?.maxSalary}</p>
          <p>Job Location: {applicationDetails?.jobLocation}</p>
          <p>Job Type: {applicationDetails?.jobType}</p>

        </div>
        <div className="applied-job-description">
            <h3>Job Description</h3>
            <p>{applicationDetails?.jobDescription}</p>
        </div>
        <div className="applied-job-requirements">
            <h3>Requirements</h3>
            <p>{applicationDetails?.requirements}</p>
        </div>
        <div className="applied-job-skills">
            <h3>Skills</h3>
            <p>{applicationDetails?.skills}</p>
        </div>
        <div className="applied-job-status">
            <h3>Application Status</h3>
            <p><span>{applicationStatus.applicationStatus}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ViewAppliedStatus;
