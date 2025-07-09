import React, { useState } from "react";
import "./Findjobs.css";
import { CiFilter, CiLocationOn, CiBookmark } from "react-icons/ci";
import { PiSuitcase } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";

const Findjobs = () => {
  const [isBookmarked, setBookmark] = useState(false);

  const handleBookmark = () => {
    if (isBookmarked === false) setBookmark(true);
    else setBookmark(false);
  };
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
          <button>
            <CiFilter /> Filters
          </button>
          <button style={{ backgroundColor: "black", color: "white" }}>
            Search
          </button>
        </div>
        <div className="job-finderpage-job-options">
          <button>Remote Jobs</button>
          <button>Tech</button>
          <button>Design</button>
          <button>Marketing</button>
          <button>Engineering</button>
        </div>
        <div className="job-finderpage-job-list-header">
          <div>
            <h3>6 Jobs Available</h3>
          </div>
          <div className="job-finderpage-job-list-sort">
            <p>Sort:</p>
            <select>
              <option>Most Recent</option>
              <option>Most Relevant</option>
            </select>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default Findjobs;
