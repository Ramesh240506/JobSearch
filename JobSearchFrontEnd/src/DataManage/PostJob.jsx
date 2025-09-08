import React, { useState } from "react";

import "./PostJob.css";
import { PiSuitcase } from "react-icons/pi";
import { FaFileAlt } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import BasicAlerts from "@/UIComponents/BasicALerts";
import { createJob } from "@/Services/JobService";
import { useNavigate } from "react-router-dom";
import PositionedSnackbar from "@/UIComponents/PositionedSnackbar";
const PostJob = () => {
  const [snackbar, setSnackbar] = useState(false);
  const [jobFormData, setJobFormData] = React.useState({
    // Basic Job Information
    jobTitle: "",
    companyName: "",
    jobLocation: "",
    jobType: "",

    // Job Description
    jobDescription: "",
    qualifications: "",
    requirements: "",

    // Experience & Education
    experienceLevel: "",
    education: "",
    skills: "",

    // Compensation
    currency: "",
    minSalary: "",
    maxSalary: "",
    benefits: "",
  });
  const [errors, setErrors] = useState({
    jobTitle: "",
    companyName: "",
    jobLocation: "",
    jobType: "",
    jobDescription: "",
    qualifications: "",
    requirements: "",
    experienceLevel: "",
    education: "",
    skills: "",
    currency: "",
    minSalary: "",
    maxSalary: "",
    benefits: "",
  });

  const navigate = useNavigate();
  const validateForm = () => {
    const errorsCopy = { ...errors };
    let isValid = true;

    const requiredFields = [
      "jobTitle",
      "companyName",
      "jobLocation",
      "jobType",
      "jobDescription",
      "qualifications",
      "requirements",
      "experienceLevel",
      "education",
      "skills",
      "currency",
      "minSalary",
      "maxSalary",
      "benefits",
    ];

    requiredFields.forEach((field) => {
      const value = jobFormData[field];
      if (typeof value === "string" && value.trim()) {
        errorsCopy[field] = "";
      } else {
        errorsCopy[field] = `${field} is required`;
        isValid = false;
      }
    });
    setErrors(errorsCopy);
    return isValid;
  };

  const onInputChange = (e) => {
    // e.target refers to the input element
    // id is the name of the input field, value is the input value
    // setJobFormData updates the state with the new value for the input field

    const { id, value } = e.target;
    setJobFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await createJob(jobFormData);
        // setJobFormData(response.data);
        alert("Job posted successfully!");
        navigate("/jobhome"); // Redirect to the jobs page after successful post
        setJobFormData({
          // Reset form data
          jobTitle: "",
          companyName: "",
          jobLocation: "",
          jobType: "",
          jobDescription: "",
          qualifications: "",
          requirements: "",
          experienceLevel: "",
          education: "",
          skills: "",
          currency: "",
          minSalary: "",
          maxSalary: "",
          benefits: "",
        });
      } catch (error) {
        console.error("Error posting job:", error);
        alert("Failed to post job. Please try again later.");
      }
    } else {
      // <PositionedSnackbar></PositionedSnackbar>
      setSnackbar(true);
    }
  };
  return (
    <div>
      {snackbar && (
        <PositionedSnackbar
          open={snackbar}
          message="Please fill all required fields"
          onClose={() => setSnackbar(false)}
        />
      )}

      <div className="postjob-header">
        <h1>Post a Job</h1>
        <p>Reach top talent by posting your job on our platform.</p>
      </div>
      <form>
        <div className="postjob-form">
          <div className="postjob-form-group">
            <div className="postjob-form-header">
              <div>
                <PiSuitcase size={25}></PiSuitcase>
              </div>
              <div>
                <h1> Basic Job Information</h1>
              </div>
            </div>

            <label htmlFor="jobTitle">Job Title * </label>
            <input
              type="text"
              id="jobTitle"
              value={jobFormData.jobTitle}
              onChange={onInputChange}
              placeholder="Enter job title"
              required
            ></input>
            {errors.jobTitle && (
              <BasicAlerts severity="error" message="Job Title is required" />
            )}
            <label htmlFor="companyName">Company Name *</label>
            <input
              type="text"
              value={jobFormData.companyName}
              id="companyName"
              onChange={onInputChange}
              placeholder="Enter company name"
              required
            ></input>
            {errors.companyName && (
              <BasicAlerts
                severity="error"
                message="Company name is required"
              />
            )}
            <label htmlFor="jobLocation">Job Location *</label>
            <input
              type="text"
              value={jobFormData.jobLocation}
              id="jobLocation"
              onChange={onInputChange}
              placeholder="Enter job location"
              required
            ></input>
            {errors.jobLocation && (
              <BasicAlerts
                severity="error"
                message="Job Location is required"
              />
            )}

            <label htmlFor="jobType">Job Type *</label>
            <select
              value={jobFormData.jobType}
              id="jobType"
              onChange={onInputChange}
              required
            >
              <option value="">Select job type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="temporary">Temporary</option>
            </select>
          </div>

          <div className="postjob-form-group">
            <div className="postjob-form-header">
              {/* <div><PiSuitcase size={25}></PiSuitcase></div> */}
              <div>
                <FaFileAlt size={25}></FaFileAlt>
              </div>
              <div>
                <h1> Job Description</h1>
              </div>
            </div>

            <label htmlFor="jobDescription">Job Description *</label>
            <textarea
              id="jobDescription"
              value={jobFormData.jobDescription}
              onChange={onInputChange}
              placeholder="Enter job description"
              required
            ></textarea>
            {errors.jobDescription && (
              <BasicAlerts
                severity="error"
                message="Job Description is required"
              />
            )}

            <label htmlFor="qualifications">Qualifications *</label>
            <textarea
              id="qualifications"
              value={jobFormData.qualifications}
              onChange={onInputChange}
              placeholder="Enter qualifications"
              required
            ></textarea>
            {errors.qualifications && (
              <BasicAlerts
                severity="error"
                message="Qualifications is required"
              />
            )}

            <label className="requirements">Requirements *</label>
            <textarea
              id="requirements"
              value={jobFormData.requirements}
              onChange={onInputChange}
              placeholder="Enter requirements"
              required
            ></textarea>
            {errors.requirements && (
              <BasicAlerts
                severity="error"
                message="Job Requirements is required"
              />
            )}
          </div>

          <div className="postjob-form-group">
            <div className="postjob-form-header">
              <div>
                <LuGraduationCap size={25} />
              </div>
              <div>
                <h1>Experience & Education</h1>
              </div>
            </div>
            <label htmlFor="">Experience level</label>
            <select
              value={jobFormData.experienceLevel}
              onChange={onInputChange}
              id="experienceLevel"
              required
            >
              <option value="">Select experience level</option>
              <option value="entry-level">Entry Level</option>
              <option value="mid-level">Mid Level</option>
              <option value="senior-level">Senior Level</option>
            </select>
            {errors.experienceLevel && (
              <BasicAlerts
                severity="error"
                message="Experience Level is required"
              />
            )}

            <label htmlFor="education">Education Level *</label>
            <select
              value={jobFormData.education}
              onChange={onInputChange}
              id="education"
              required
            >
              <option value="">Select education level</option>
              <option value="high-school">High School</option>
              <option value="associate-degree">Associate Degree</option>
              <option value="bachelor-degree">Bachelor's Degree</option>
              <option value="master-degree">Master's Degree</option>
              <option value="phd">PhD</option>
            </select>

            <label htmlFor="skills">Skills *</label>
            <input
              type="text"
              value={jobFormData.skills}
              onChange={onInputChange}
              id="skills"
              placeholder="Enter required skills (comma separated)"
              required
            ></input>
          </div>

          <div className="postjob-form-group">
            <div className="postjob-form-header">
              <div>
                <FaFileAlt size={25}></FaFileAlt>
              </div>
              <div>
                <h1> Compensation</h1>
              </div>
            </div>
            <label htmlFor="salary">Currency</label>
            <select
              value={jobFormData.currency}
              onChange={onInputChange}
              id="currency"
              required
            >
              <option value="">Select currency</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
              <option value="inr">INR</option>
            </select>
            <label htmlFor="salary">Minimum Salary</label>
            <input
              type="number"
              value={jobFormData.minSalary}
              onChange={onInputChange}
              id="minSalary"
              placeholder="Enter minimum salary"
              required
            ></input>
            <label htmlFor="maxSalary">Maximum Salary</label>
            <input
              type="number"
              value={jobFormData.maxSalary}
              onChange={onInputChange}
              id="maxSalary"
              placeholder="Enter maximum salary"
              required
            ></input>
            <label htmlFor="benefits">Benefits</label>
            <textarea
              value={jobFormData.benefits}
              onChange={onInputChange}
              id="benefits"
              placeholder="Enter benefits (e.g., health insurance, retirement plans)"
            ></textarea>
          </div>
        </div>
        <div className="postjob-form-actions">
          <button
            onClick={handleSubmit}
            type="submit"
            className="postjob-submit-button"
          >
            Post Job
          </button>
          <button type="reset" className="postjob-reset-button">
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
