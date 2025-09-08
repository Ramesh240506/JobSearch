import { deleteAppliedJob, JobSeekerApplications, JobSeekerApplicationStatus } from '@/Services/JobService';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import './Jobseeker.css'
import { useNavigate } from 'react-router-dom';
const JobSeeker = () => {

  const [applications, setApplications] = useState([]);
  const [applicantDetails,setApplicantDetails]=useState([]);
  const navigate=useNavigate();

const handleDelete = async (applicationId) => {
  console.log("Deleting application with ID:", applicationId);
    const confirmDelete = window.confirm("Are you sure you want to delete this application?");
    if (!confirmDelete) return;

    try {
        await deleteAppliedJob(applicationId);
        handleRefreshButton();
    } catch (error) {
        console.error("Error deleting job:", error);
    }
}

const handleRefreshButton = async () => {
    try {
        const statusResponse = await JobSeekerApplicationStatus();
        setApplicantDetails(statusResponse.data);
        console.log("Application Status:", statusResponse.data);

        const applicationsResponse = await JobSeekerApplications();
        setApplications(applicationsResponse.data);
        console.log("User Applications:", applicationsResponse.data);
    } catch (error) {
        console.error("Error refreshing applications:", error);
    }
}

  useEffect(() => {

    handleRefreshButton();
  }, [])
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
          <p>Showing {applications.length} applications</p>
        </div>
      </div>

      <div className="user-applications-list">
        {
          applications.map((application) => (
            <div className="user-application-item" key={application.id}>
              <h3 style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                {application.jobTitle} at {application.companyName}  
                {/* <span
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
                  
                </span> */}
              </h3>
              {
                applicantDetails.filter((detail) => application.id==detail?.jobPostEntity?.id )
                .map((detail)=>(
                  <div key={detail.id}>
                    {
                     
                        <p>Applied at: 📅 {
                          detail.appliedAt &&
                          format(new Date(detail.appliedAt), 'dd MMM yyyy')
                        }</p>
                        
                      
                    }
                    <p>Status: {detail.applicationStatus}</p>
  
                  </div>
                ))
              }
              <div className="application-action-btns">
                <button onClick={()=>navigate(`/viewappliedstatus/${application.id}`)} className="view-details-button">🔍 View Details</button>
                <button onClick={()=>handleDelete(application.id)} className="withdraw-button">❌ Withdraw Application</button>
              </div>  
              </div>
              ))
            }
        
            </div>
         
        
      {/* </div> */}
    </div>
  )
}
export default JobSeeker
