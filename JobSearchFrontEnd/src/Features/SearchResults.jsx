import { getSearchResults } from "@/Services/JobService";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiLocationOn, CiBookmark } from "react-icons/ci";
import { PiSuitcase } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
import { FaBookmark } from "react-icons/fa6";
import "../HOME/JobHome.css";
import "./SearchResults.css";
const SearchResults = () => {
  const { keyword } = useParams();
  const [searchresults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const handleApply=(id)=>{
      console.log("Job Id:",id);
      navigate(`/jobdetails/${id}`);
    }
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    const fetchSearchResults = async () => {
      const response = await getSearchResults(keyword);
      setSearchResults(response);
      console.log("Search Results:", response);
    };
    fetchSearchResults();
  }, [keyword]);
  return (
    <div>
      <div className="jobsearch-results">
      <h1>Search Results Page</h1>
      <h2>Results for: {keyword}</h2>
        <div className="job-finderpage-job-list">
          {searchresults.slice(0, 7).map((job) => (
            <div className="job-finderpage-job-listvalues" key={job.id}>
              <div className="job-finderpage-companyname">
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
                      {/* {job.bookmark ? (
                              <FaBookmark size={20} onClick={() => handleBookmark(job.id)} />
                            ) : (
                              <CiBookmark size={20} onClick={() => handleBookmark(job.id)} />
                            )} */}
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

              <button disabled={role==="POSTER"} onClick={() => handleApply(job.id)}
              className="job-finderpage-apply-button">Apply Now</button>
            </div>
          ))}
          {/* <div className="job-finderpage-job-listvalues"> */}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
