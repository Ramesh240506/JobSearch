import React, { useEffect, useState } from "react";
import "./Findjobs.css";
import { CiLocationOn} from "react-icons/ci";
import { PiSuitcase } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
import { formatDistanceToNow } from "date-fns";
import { paginate } from "@/Services/JobService";
import { useNavigate } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";
import { CgSandClock } from "react-icons/cg";
import CircularIndeterminate from "@/HOME/CircularIndeterminate";
const Findjobs = () => {
  
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [role, setRole] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const size = 6;
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);

  

  const handleApply = (id) => {
    console.log("Job Id:", id);
    navigate(`/jobdetails/${id}`);
  };

  const handleSearch = () => {
    const keyword = searchTerm.trim();
    if (!keyword) {
      // alert("Please enter a keyword to search.");
      return;
    }
    navigate(`/searchresults/${keyword}`);
  };

  const fetchJobs = async () => {
    try {
      const response = await paginate(page, size, sortBy, filter);
      setTotalPages(response.totalPages);
      setTotalJobs(response.totalElements);
      setJobs(response.content);
      console.log("Jobs:", response.content);
    } catch (error) {
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
    fetchJobs();
    // return () => clearTimeout(timer);
  }, [sortBy, page, filter]);


  if(loading)
  {
    return <CircularIndeterminate/>
  }
  return (
    <div>
      <div className="job-finderpage">
        <div className="job-finderpage-header">
          <h1>Find Your Dream Job</h1>
          <p>Discover opportunities that match your skills and carrer goals</p>
        </div>
        <div className="job-finderpage-searchfield">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Job title, company, or keywords"
          ></input>
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value={"Hybrid"}>Hybrid</option>
            <option value={"Remote"}>Remote</option>
            <option value={"Onsite"}>Onsite</option>
          </select>

          <button
            onClick={handleSearch}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Search
          </button>
        </div>

        <div className="job-finderpage-job-list-header">
          <div>
            <h3>{totalJobs} Jobs Available</h3>
          </div>
          <div className="job-finderpage-job-list-sort">
            <p>Sort:</p>
            <select
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(0);
              }}
            >
              <option value="postedAt">Most Recent</option>
              <option value="maxSalary">Highest Salary</option>
              <option value="minSalary">Lowest Salary</option>
              <option value="companyName">Company Name (A–Z)</option>
              <option value="jobLocation">Location</option>
            </select>
          </div>
        </div>

        <div className="job-finderpage-job-list">
          {jobs.map((job) => (
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
                <p> Full Time</p>
              </div>
              <p style={{ display: "flex", alignItems: "center"}}>
                 {job.currency === "usd" ? "$" : "R"} 
                <span style={{marginLeft: "10px"}}>
                  {job.minSalary}-
                {job.maxSalary}
                  </span>
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "5px"}}>
                <IoMdTime />
                {job.postedAt &&
                  formatDistanceToNow(new Date(job.postedAt), {
                    addSuffix: true,
                  })}
              </p>
              
                <div>
                  <span style={{marginRight: "5px"}}>
                    <CgSandClock />
                    </span>
                  {job.deadline && 
                    formatDistanceToNow(new Date(job.deadline), {
                      addSuffix: true,
                    })
                  }
                </div>

              <div className="job-finderpage-job-skills">
                {job.skills
                  .split(",")
                  .slice(0, 3)
                  .map((tag) => (
                    <button key={tag}>{tag}</button>
                  ))}
              </div>

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
      <Stack
        style={{
          backgroundColor: "#F2F4F8",
          marginTop: "-100px",
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
          color="primary"
          shape="rounded"
        />
      </Stack>
      </div>

    </div>
  );
};

export default Findjobs;
