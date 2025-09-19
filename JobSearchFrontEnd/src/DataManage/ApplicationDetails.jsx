import React, { useEffect } from "react";
import "./ApplicationDetails.css";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { FiDollarSign } from "react-icons/fi";
import { CiCalendarDate } from "react-icons/ci";
import { getApplicationsByStatus, getUserApplication } from "@/Services/JobService";
import { useState } from "react";
const ApplicationDetails = () => {
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  const getApplicationsByFilter = async (status) => {
    try {
      console.log(status);
      const response = await getApplicationsByStatus(status);
      const applications = response.map((job) => ({
        id: job.id,
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        jobLocation: job.jobLocation,
        minsalary: job.minSalary,
        maxsalary: job.maxSalary,
        postedAt: formatDistanceToNow(new Date(job.postedAt), {
          addSuffix: true,
        }),
      }));
      console.log(applications);
      setApplications(applications);
    } catch (error) {
      console.error("Failed to fetch job applications", error);
    }
  }

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    if(e.target.value === "all") {
      getApplications();
    }
    else
    {
      getApplicationsByFilter(e.target.value);
    }
  }
  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    try {
      const response = await getUserApplication();
      const applications = response.data.map((job) => ({
        id: job.id,
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        jobLocation: job.jobLocation,
        minsalary: job.minSalary,
        maxsalary: job.maxSalary,
        postedAt: formatDistanceToNow(new Date(job.postedAt), {
          addSuffix: true,
        }),
      }));
      setApplications(applications);
    } catch (error) {
      console.error("Failed to fetch job applications", error);
    }
  };

  return (
    <div>
      
      <div className="filter-select">
        <label htmlFor="statusFilter">Filter by: </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => handleFilterChange(e)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {applications.map((application) => (
        <div className="application-details" key={application.id}>
          <div className="application-list">
            <div className="application-item">
              <h3>{application.jobTitle}</h3>
              <p style={{ fontWeight: "500" }}>{application.companyName}</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <CiLocationOn  />
                <p style={{ margin: 0 }}>{application.jobLocation}</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <FiDollarSign />
              <p style={{ margin: 0 }}>
                ${application.minsalary}k - ${application.maxsalary}k
              </p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <CiCalendarDate />
                <p style={{ margin: 0 }}>{application.postedAt}</p>
              </div>
              
              <div className="application-actions">
                <button
                  onClick={() => navigate(`/viewapplicants/${application.id}`)}
                  className="view-application"
                >
                🔍 View Applicants
                </button>
                {/* <button className="edit-application">✏️ Edit</button> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationDetails;
