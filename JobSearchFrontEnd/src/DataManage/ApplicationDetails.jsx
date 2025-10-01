import React, { useEffect, useState } from "react";
import "./ApplicationDetails.css";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { CiLocationOn, CiCalendarDate } from "react-icons/ci";
import { FiDollarSign } from "react-icons/fi";
import {
  getApplicationsByStatus,
  getUserApplication,
} from "@/Services/JobService";
import { Pagination } from "@mui/material";
import { Stack } from "@mui/material";

const ApplicationDetails = () => {
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // just for UI
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const size = 1;



  const getApplications = async () => {
    try {
      const response = await getUserApplication(
        page,
        size,
        filterStatus,
        searchTerm
      );
      const applications = response.content.map((job) => ({
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
      console.log("Applications:", applications);
      setApplications(applications);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch job applications", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  useEffect(() => {
    getApplications();
  }, [page, filterStatus, searchTerm]);

  return (
    <div>
      {/* Filter + Search */}
      <div
        className="filter-select"
        style={{ display: "flex", gap: "12px", marginBottom: "16px" }}
      >
        <div>
          <label htmlFor="statusFilter">Filter by: </label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Search Input (UI only, backend handles filtering) */}
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            flex: "1",
          }}
        />
      </div>

      {/* Applications */}
      {
        applications.length === 0 ? (
          <div className="no-applications-message">
            <p>No applications found.</p>
          </div>
        ) : (

      applications.map((application) => (
        <div className="application-details" key={application.id}>
          <div className="application-list">
            <div className="application-item">
              <h3>{application.jobTitle}</h3>
              <p style={{ fontWeight: "500" }}>{application.companyName}</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <CiLocationOn />
                <p style={{ margin: 0 }}>{application.jobLocation}</p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <FiDollarSign />
                <p style={{ margin: 0 }}>
                  ${application.minsalary}k - ${application.maxsalary}k
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <CiCalendarDate />
                <p style={{ margin: 0 }}>{application.postedAt}</p>
              </div>

              <div className="application-action">
                <button
                  onClick={() => navigate(`/viewapplicants/${application.id}`)}
                  className="view-application"
                >
                  🔍 View Applicants
                </button>
              </div>
            </div>
          </div>
        </div>
        
      ))
    )}
   {
    applications.length>0 &&

    <Pagination
      style={{ display: "flex", justifyContent: "center" }}
      count={totalPages}
      page={page + 1}
      onChange={(e, value) => setPage(value - 1)}
      variant="outlined"
      shape="rounded"
    />
   }
   
      <div>

      </div>

    </div>
  );
};

export default ApplicationDetails;
