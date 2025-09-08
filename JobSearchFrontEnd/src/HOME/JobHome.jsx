import React, { useEffect, useState } from "react";
import "./JobHome.css";
import { CiLocationOn, CiBookmark } from "react-icons/ci";
import { PiSuitcase } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BsSuitcaseLg } from "react-icons/bs";
import CircularIndeterminate from "./CircularIndeterminate";
import { getAllJobs } from "@/Services/JobService";
import { useNavigate } from "react-router-dom";

import { formatDistanceToNow } from "date-fns";
import { NavigationOff } from "lucide-react";
const JobHome = () => {
  const handleBookmark = (id) => {
    // if (isBookmarked === false) setBookmark(true);
    // else setBookmark(false);
    setFeaturedJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, bookmark: !job.bookmark } : job
      )
    );
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [role, setRole] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState([]);

  const [skills, setSkills] = useState([
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "CSS",
    "HTML",
  ]);

  const handleApply = (id) => {
    console.log("Job Id:", id);
    navigate(`/jobdetails/${id}`);
  };

  const handleSearch = () => {
  const keyword = searchTerm.trim();
  if (!keyword) {
    alert("Please enter a keyword to search.");
    return;
  }
  navigate(`/searchresults/${keyword}`);
};

  const getFeaturedJobs = async () => {
    const response = await getAllJobs();
    console.log(response);
    console.log("Featured Jobs:", response);
    setFeaturedJobs(response);
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    getFeaturedJobs();
    return () => clearTimeout(timer);
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
          {featuredJobs.slice(0, 7).map((job) => (
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
                <p> {job.jobType}</p>
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
              <div className="job-finderpage-job-skills">
                {skills.slice(0, 3).map((tag) => (
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
            <button disabled={role === "SEEKER"} onClick={() => navigate("/postjob")} className="cta-post">
              Post a Job
            </button>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="footer-section">
          <div className="footer-content">
            <div className="footer-logo">
              <BsSuitcaseLg />
              <h2>JobFlow</h2>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Resources</h3>
              <ul>
                <li>Blog</li>
                <li>Help Center</li>
                <li>FAQs</li>
                <li>Career Advice</li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>For Employers</h3>
              <ul>
                <li>Post a Job</li>
                <li>Employer Dashboard</li>
                <li>Pricing Plans</li>
                <li>Success Stories</li>
              </ul>
            </div>
            <div className="footer-social">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <ul>
                  <li>
                    <FaInstagram />
                  </li>
                  <li>
                    <FaFacebook />
                  </li>
                  <li>
                    <FaTwitter />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default JobHome;
