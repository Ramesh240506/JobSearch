import React, { useEffect, useState } from "react";
import "./JobHome.css";
import { CiLocationOn, CiBookmark } from "react-icons/ci";
import { PiSuitcase } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
import CircularIndeterminate from "./CircularIndeterminate";
import { getAllJobs } from "@/Services/JobService";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { CgSandClock } from "react-icons/cg";
import Footer from "./Footer";
const JobHome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [role, setRole] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState([]);

  const handleApply = (id) => {
    console.log("Job Id:", id);
    navigate(`/jobdetails/${id}`);
  };

  const handleSearch = () => {
    const keyword = searchTerm.trim();
    if (!keyword) {
      return;
    }
    navigate(`/searchresults/${keyword}`);
  };

  const getFeaturedJobs = async () => {
    try
    {
      const response = await getAllJobs();
      setFeaturedJobs(response);
    }
    catch (error) {
      console.error("Error fetching jobs:", error);
    }
    finally
    {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    // const timer = setTimeout(() => {
    //   setLoading(false);
    // }, 500);
    getFeaturedJobs();
    // return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <CircularIndeterminate />;
  }

  return (
    <div>
      <div className="container1">
        {/* Hero section */}
        <section className="hero1">
          <h1>
            Find Your <span>Dream Job </span>
            <br></br>Today
          </h1>
          <p>
            Discover thousands of job opportunities from top companies
            worldwide. Your next career move is just a search away.
          </p>

          <div className="jobsearch-bar">
            <input
              type="text"
              placeholder="Search for jobs, companies, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
          </div>
        </section>

        {/* Featured Jobs */}
        <div className="job-finderpage-job-list">
          {featuredJobs.slice(0, 3).map((job) => (
            <div className="job-finderpage-job-listvalues" key={job.id}>
              <div className="job-finderpage-companyname">
                <div style={{ width: "100%" }}>
                  <div className="job-finderpage-bookmark">
                    <div>
                      <h4>{job.jobTitle}</h4>
                      <p>{job.companyName}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="job-finderpage-iconset">
                <CiLocationOn />
                <p> {job.jobLocation}</p>
              </div>
              <div className="job-finderpage-iconset">
                <PiSuitcase />
                <p> {job.jobType}</p>
              </div>
              <p style={{ display: "flex", alignItems: "center" }}>
                {job.currency === "usd" ? "$" : "R"}
                <span style={{ marginLeft: "10px" }}>
                  {job.minSalary}-{job.maxSalary}
                </span>
              </p>

              <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <IoMdTime />
                {job.postedAt &&
                  formatDistanceToNow(new Date(job.postedAt), {
                    addSuffix: true,
                  })}
              </p>
              <p>
                <span style={{ marginRight: "5px" }}>
                  <CgSandClock />
                </span>
                {job.deadline &&
                  formatDistanceToNow(new Date(job.deadline), {
                    addSuffix: true,
                  })}
              </p>
              <div className="job-finderpage-job-skills">
                {job.skills
                  .split(",")
                  .slice(0, 3)
                  .map((tag) => (
                    <button key={tag}>{tag}</button>
                  ))}
              </div>

              <button
                disabled={role === "POSTER"}
                onClick={() => handleApply(job.id)}
                className="job-finderpage-apply-button"
              >
                Apply Now
              </button>
            </div>
          ))}
          {/* <div className="job-finderpage-job-listvalues"> */}
        </div>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Ready to take the next step in your career?</h2>
          <p>
            Join thousands of professionals who have found their dream jobs
            through JobFlow
          </p>
          <div className="cta-section-btn">
            <button
              onClick={() => navigate("/findjobs")}
              style={{ backgroundColor: "white", color: "blue" }}
            >
              Browse Jobs
            </button>
            {
              role === "POSTER" && 
            <button
              disabled={role === "POSTER"}
              onClick={() => navigate("/postjob")}
              className="cta-post"
            >
              Post a Job
            </button>
            }
          </div>
        </section>

        {/* Footer Section */}
        <Footer />
      </div>
    </div>
  );
};
export default JobHome;
