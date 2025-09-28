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
import { Pagination } from "@mui/material";
import {Stack} from "@mui/material";
const SearchResults = () => {
  const { keyword } = useParams();
  const [searchresults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const size=1;
  const handleApply=(id)=>{
      console.log("Job Id:",id);
      navigate(`/jobdetails/${id}`);
    }

    const fetchSearchResults = async () => {
      const response = await getSearchResults(page,size,keyword);
      setSearchResults(response.content);
      setTotalPages(response.totalPages);

      console.log("Search Results:", response);
    };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    fetchSearchResults();
  }, [keyword,page]);
  return (
    <div>
      <div className="jobsearch-results">
    
      <h2 style={{marginTop:'10px'}}>Results for: {keyword}</h2>
          {
            searchresults.length === 0 && (
              
                <h2 style={{textAlign:'center'}}>No Results Found</h2>
              
            )
           
          }
        <div className="job-finderpage-job-list">
          {searchresults.map((job) => (
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
              <p>
                ⏳ 
                {
                  job.deadline &&
                  formatDistanceToNow(new Date(job.deadline), {
                    addSuffix: true,
                  })
                }
              </p>
              <div className="job-finderpage-job-skills">
                      {job.skills.split(",").slice(0,3).map((tag) => (
                        <button key={tag}>{tag}</button>
                      ))}
                    </div>

              <button disabled={role==="POSTER"} onClick={() => handleApply(job.id)}
              className="job-finderpage-apply-button">Apply Now</button>
            </div>
          ))}
          
        </div>
      </div>
      {
        searchresults.length !== 0 &&
        (

       <Stack
              style={{
                
                marginTop: "-150px",
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
        )
      }
    </div>
  );
};

export default SearchResults;
