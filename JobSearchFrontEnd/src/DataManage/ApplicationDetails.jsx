import React, { useEffect } from "react";
import "./ApplicationDetails.css";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { FiDollarSign } from "react-icons/fi";
import { CiCalendarDate } from "react-icons/ci";
import { getUserApplication } from "@/Services/JobService";
const ApplicationDetails = () => {
  const [applications, setApplications] = React.useState([]);

  const navigate = useNavigate();
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
                  onClick={() => navigate("/viewapplicants")}
                  className="view-application"
                >
                  View Applicants
                </button>
                <button className="edit-application">Edit</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationDetails;
