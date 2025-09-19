import {
  deleteAppliedJob,
  JobSeekerApplications,
  JobSeekerApplicationStatus,
} from "@/Services/JobService";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import "./Jobseeker.css";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { Stack } from "@mui/material";
const JobSeeker = () => {
  const [applications, setApplications] = useState([]);
  const [applicantDetails, setApplicantDetails] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const size = 2;
  const [totalJobs, setTotalJobs] = useState(0);

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleDelete = async (applicationId) => {
    console.log("Deleting application with ID:", applicationId);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmDelete) return;

    try {
      await deleteAppliedJob(applicationId);
      handleRefreshButton();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleRefreshButton = async () => {
    try {
      const statusResponse = await JobSeekerApplicationStatus();
      setApplicantDetails(statusResponse.data);
      console.log("Application Status:", statusResponse.data);

      const applicationsResponse = await JobSeekerApplications(
        page,
        size,
        filter,keyword
      );
      setTotalPages(applicationsResponse.totalPages);
      setTotalJobs(applicationsResponse.totalElements);
      setApplications(applicationsResponse.content);

      console.log("User Applications:", applicationsResponse.content);
    } catch (error) {
      console.error("Error refreshing applications:", error);
    }
  };

  useEffect(() => {
    handleRefreshButton();
  }, [page, filter,keyword]);
  return (
    <div>
      <div className="user-applications-header">
        <div className="filter-search">
          <label>
            Filter by status:
            <select onChange={(e) => setFilter(e.target.value)}>
              <option value="">All</option>
              <option value="APPLIED">Applied</option>
              <option value="Interview Scheduled">Interviewed</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>

          <label>
            <input onChange={(e) => setKeyword(e.target.value)} type="text" placeholder="Search applications" />
          </label>
        </div>

        <div>
          <p>Showing {totalJobs} applications</p>
        </div>
      </div>

      <div className="user-applications-list">
        {applications.length === 0 ? (
          <div className="no-applications-message">
            <p>No applications found.</p>
          </div>
        ) : (
          applications.map((application) => (
            <div className="user-application-item" key={application.id}>
              <h3 style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                {application.jobTitle} at {application.companyName}
              </h3>
              {applicantDetails
                .filter((detail) => application.id == detail?.jobPostEntity?.id)
                .map((detail) => (
                  <div key={detail.id}>
                    {
                      <p>
                        Applied at: 📅{" "}
                        {detail.appliedAt &&
                          format(new Date(detail.appliedAt), "dd MMM yyyy")}
                      </p>
                    }
                    <p>Status: {detail.applicationStatus}</p>
                  </div>
                ))}
              <div className="application-action-btns">
                <button
                  onClick={() =>
                    navigate(`/viewappliedstatus/${application.id}`)
                  }
                  className="view-details-button"
                >
                  🔍 View Details
                </button>
                <button
                  onClick={() => handleDelete(application.id)}
                  className="withdraw-button"
                >
                  ❌ Withdraw Application
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {applications.length >= 1 ? (
        <Stack
          style={{
            backgroundColor: "#F2F4F8",
            marginTop: "-10px",
            paddingBottom: "20px",
          }}
        >
          <Pagination
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            count={totalPages}
            page={page + 1} // Convert zero-based to one-based for UI
            onChange={(e, value) => setPage(value - 1)} // Convert one-based UI input to zero-based page state
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      ) : null}
    </div>
  );
};
export default JobSeeker;
