import React, { useEffect } from "react";
import "./AppliedUserDetails.css";
import { appliedUserDetailsOfAJob, getAppliedUserDetails, updateApplicantStatus } from "@/Services/JobService";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { set } from "date-fns";
const AppliedUserDetails = () => {
  const { jobid, id } = useParams();
  const [appliedUserDetails, setAppliedUserDetails] = useState();

  
  const [isScheduling, setIsScheduling] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");
  const [status, setStatus] = useState("");

  // Called when Hire or Reject buttons are clicked
  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    console.log(newStatus);
    console.log("Job Id : ", jobid);
    await updateApplicantStatus(jobid,id, newStatus,null);
  };
  
  // Called when the interview date is confirmed
  const handleInterviewSubmit = async () => {
    if (!interviewDate) {
      alert("Please select a date.");
      return;
    }
    setStatus(`Interview Scheduled for ${interviewDate}`);
    await updateApplicantStatus(jobid,id,"Interview Scheduled", interviewDate);
    setIsScheduling(false);
  };

  const getUserDetails = async () => {
    const response = await getAppliedUserDetails(jobid, id);
    setAppliedUserDetails(response);
    const statusresponse=await appliedUserDetailsOfAJob(jobid,id);
    setStatus(statusresponse.applicationStatus);
    setInterviewDate(statusresponse.interviewDate);
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
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
              new Blob(
                [
                  Uint8Array.from(atob(appliedUserDetails.resume), (c) =>
                    c.charCodeAt(0)
                  ),
                ],
                { type: "application/pdf" }
              )
            )}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
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
      {/* ✅ Action Buttons with Date Picker */}
<div className="application-actions">

  {status && status!=="Applied" ? (
    <p>
      <strong>Current Status:</strong> {status} {interviewDate}
    </p>
  ) : (
    <>
    <h3>Take Action</h3>
    <hr />
      {!isScheduling ? (
        <>
          <button onClick={() => handleStatusChange("Hired")}>Hire</button>
          <button onClick={() => handleStatusChange("Rejected")}>Reject</button>
          <button onClick={() => setIsScheduling(true)}>Schedule Interview</button>
        </>
      ) : (
        <div className="schedule-interview">
          <label>
            Select Interview Date:{" "}
            <input
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
            />
          </label>
          <button
            style={{
              marginRight: "10px",
              backgroundColor: "red",
              color: "white",
            }}
            onClick={() => setIsScheduling(false)}
          >
            Back
          </button>
          <button
            style={{ backgroundColor: "green", color: "white" }}
            onClick={handleInterviewSubmit}
          >
            Confirm
          </button>
        </div>
      )}
    </>
  )}
</div>

    </div>
  );
};

export default AppliedUserDetails;
