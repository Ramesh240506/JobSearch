import React from "react";
import "./ApplicationDetails.css";
const ApplicationDetails = () => {
  return (
    <div>
      <div className="application-details">
        <h2>Application Details</h2>
        <p>Here you can view and manage application details.</p>
        <div className="application-list">
          <div className="application-item">
            <h3>Application #1</h3>
            <p>Location</p>
            <p>Salary</p>
            <p>Posted</p>
            <div className="application-actions">
              <button className="view-application">View Applicants</button>
              <button className="edit-application">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
