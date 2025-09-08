import React, { useEffect } from "react";
import "./AppliedUserDetails.css";
import { getAppliedUserDetails } from "@/Services/JobService";
import { useParams } from "react-router-dom";
import { useState } from "react";
const AppliedUserDetails = () => {
  const { jobid, id } = useParams();
  const [appliedUserDetails, setAppliedUserDetails] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    const getUserDetails = async () => {
      const response = await getAppliedUserDetails(jobid, id);
      setAppliedUserDetails(response);
      console.log(response);
    };
    getUserDetails();
  }, []);
  return (
    <div className="applied-user-details-container">
      <h1>AppliedUserDetails</h1>

      <div className="applied-user-inforamtion">
        <h3>Application Information</h3>
        <hr></hr>
        <p>APPLIED FOR: {appliedUserDetails?.jobPost?.jobTitle}</p>
        <p>COMPANY: {appliedUserDetails?.jobPost?.companyName}</p>
        <p>
          APPLIED DATE:{" "}
          {appliedUserDetails?.appliedAt
            ? new Date(appliedUserDetails?.appliedAt).toLocaleDateString()
            : "N/A"}
        </p>
        <p>CURRENT STATUS:</p>
        <p>EXPECTED SALARY: {appliedUserDetails?.salary}</p>
        <p>AVAILABLE FROM: {appliedUserDetails?.startDate}</p>
      </div>
      <div className="applied-user-professional">
        <h3>Professional Background</h3>
        <hr></hr>
        <h4>Experience</h4>
        <p>{appliedUserDetails?.experience}</p>
        <h4>Education</h4>
        <p>{appliedUserDetails?.education}</p>
        <h4>Skills</h4>
        <p>{appliedUserDetails?.skills}</p>
      </div>
      <div className="applied-user-coverletter">
        <h3>Cover Letter</h3>
        <p>{appliedUserDetails?.coverLetter}</p>
      </div>
      <div className="applied-user-links">
        <h3>External Links</h3>
        <hr></hr>

        {appliedUserDetails?.linkedin && (
          <a
            href={appliedUserDetails.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>LinkedIn</p>
          </a>
        )}

        {appliedUserDetails?.github && (
          <a
            href={appliedUserDetails.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>GitHub</p>
          </a>
        )}

       {appliedUserDetails?.resume && (
  <a
    href={URL.createObjectURL(
      new Blob([Uint8Array.from(atob(appliedUserDetails.resume), c => c.charCodeAt(0))], { type: 'application/pdf' })
    )}
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: 'none' }}
  >
    <p>Resume</p>
  </a>
)}

        {appliedUserDetails?.portfolio && (
          <a
            href={appliedUserDetails.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>Portfolio</p>
          </a>
        )}
      </div>
    </div>
  );
};

export default AppliedUserDetails;
