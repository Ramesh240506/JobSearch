import React, { useEffect, useState } from "react";
import "./Findjobs.css";
import { CiFilter, CiLocationOn, CiBookmark } from "react-icons/ci";
import { PiSuitcase } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";
import { getAllJobs, getSortedJobs } from "@/Services/JobService";
import { useNavigate } from "react-router-dom";

const Findjobs = () => {
  const [isBookmarked, setBookmark] = useState(false);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [role, setRole] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleBookmark = () => {
    if (isBookmarked === false) setBookmark(true);
    else setBookmark(false);
  };

  const handleApply = (id) => {
    console.log("Job Id:", id);
    navigate(`/jobdetails/${id}`);
  };
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    const fetchJobs = async () => {
      try {
        if (sortBy) {
          const response = await getSortedJobs(sortBy);
          setJobs(response);
          console.log("Jobs sorted by:", sortBy, response);
        } else {
          const response = await getAllJobs();
          setJobs(response);
          console.log("Jobs:", response);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [sortBy]);

  return (
    <div>
      <div className="job-finderpage">
        <div className="job-finderpage-header">
          <h1>Find Your Dream Job</h1>
          <p>Discover opportunities that match your skills and carrer goals</p>
        </div>
        <div className="job-finderpage-searchfield">
          <input placeholder="Job title, company, or keywords"></input>
          <select>
            <option>Hybrid</option>
            <option>Remote</option>
            <option>Onsite</option>
          </select>

          <button style={{ backgroundColor: "black", color: "white" }}>
            Search
          </button>
        </div>

        <div className="job-finderpage-job-list-header">
          <div>
            <h3>{jobs.length} Jobs Available</h3>
          </div>
          <div className="job-finderpage-job-list-sort">
            <p>Sort:</p>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="postedAt">Most Recent</option>
              <option value="maxSalary">Highest Salary</option>
              <option value="minSalary">Lowest Salary</option>
              <option value="companyName">Company Name (A–Z)</option>
              <option value="jobLocation">Location</option>
            </select>
          </div>
        </div>

        <div className="job-finderpage-job-list">
          {jobs.slice(0, 7).map((job) => (
            <div className="job-finderpage-job-listvalues" key={job.id}>
              <div className="job-finderpage-companyname">
                {/* <div>
                  <img src={"/public/vite.svg"} alt="no"></img>
                </div> */}
                <div style={{ width: "100%" }}>
                  <div className="job-finderpage-bookmark">
                    <div>
                      <h4>{job.jobTitle}</h4>
                      <p>{job.companyName}</p>
                    </div>
                    <div
                      className="bookmark-icon"
                      style={{ cursor: "pointer" }}
                    >
                      {job.bookmark ? (
                        <FaBookmark
                          size={20}
                          onClick={() => handleBookmark(job.id)}
                        />
                      ) : (
                        <CiBookmark
                          size={20}
                          onClick={() => handleBookmark(job.id)}
                        />
                      )}
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
                <p> Full Time</p>
              </div>
              <h5>
                {job.minSalary}-{job.maxSalary}
              </h5>
              <p>
                <IoMdTime />
                {job.postedAt &&
                  formatDistanceToNow(new Date(job.postedAt), {
                    addSuffix: true,
                  })}
              </p>
              {/* <div className="job-finderpage-job-skills">
                      {skills.slice(0,3).map((tag) => (
                        <button key={tag}>{tag}</button>
                      ))}
                    </div> */}

              <button
                onClick={() => handleApply(job.id)}
                disabled={role === "POSTER"}
                className="job-finderpage-apply-button"
              >
                Apply Now
              </button>
            </div>
          ))}
          {/* <div className="job-finderpage-job-listvalues"> */}
        </div>
      </div>
    </div>
  );
};

export default Findjobs;
