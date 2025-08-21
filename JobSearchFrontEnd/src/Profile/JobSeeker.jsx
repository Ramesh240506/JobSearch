import React from 'react'

import { FaCircleExclamation } from "react-icons/fa6";
const JobSeeker = () => {
  return (
    <div>
      <div className="user-applications-header">
        <div>
          <label>
            Filter by status:
            <select>
              <option value="all">All</option>
              <option value="applied">Applied</option>
              <option value="interviewed">Interviewed</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
            </select>
          </label>
        </div>
        <div>
          <p>Showing 5 out of 5 applications</p>
        </div>
      </div>

      <div className="user-applications-list">
        <div className="user-application-item">
          <h3 style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            Software Engineer at XYZ Corp
            <span
              style={{
                backgroundColor: "black",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                borderRadius: "5px",
                padding: "2px 5px",
              }}
            >
              <FaCircleExclamation /> Interview
            </span>
          </h3>
          <p>Status: Applied</p>
          <p>Date Applied: 2023-10-01</p>
        </div>
        <div className="user-application-item">
          <h3 style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            Data Analyst at ABC Inc
            <span
              style={{
                backgroundColor: "black",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                borderRadius: "5px",
                padding: "2px 5px",
              }}
            >
              <FaCircleExclamation /> Interview
            </span>
          </h3>
          <p>Status: Interviewed</p>
          <p>Date Applied: 2023-09-15</p>
        </div>
      </div>
    </div>
  )
}

export default JobSeeker
