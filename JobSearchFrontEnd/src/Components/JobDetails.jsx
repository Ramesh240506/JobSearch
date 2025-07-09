import React, { useState } from 'react'
import './JobDetails.css'
import { useParams } from 'react-router-dom';
const JobDetails = () => {

    const [jobDetails, setJobDetails] = useState(
        {
            id: 1,
            jobTitle: "Senior Frontend Developer",
            companyName: "TechCorp Inc.",
            jobLocation: "San Francisco, CA",
            minSalary: "$100k",
            maxSalary: "$150k",
            jobType: "Full-time",
            posted: "2 days ago",
            description: "We are looking for a Senior Frontend Developer with expertise in React and TypeScript. The ideal candidate will have a strong understanding of modern web development practices and a passion for building user-friendly applications.",
            requirements: [
                "5+ years of experience in frontend development",
                "Proficiency in React and TypeScript",
                "Experience with RESTful APIs and modern build tools",
                "Strong problem-solving skills and attention to detail"
            ],
            tags: ["React", "TypeScript", "Remote OK"]
        }
    );

    
  return (
    <div>
        <div className="job-details-container">
            <h1 className="job-details-title">{jobDetails.jobTitle}</h1>
            <h2 className="job-details-company">{jobDetails.companyName}</h2>
            
            <div className="job-details-info">
                <p className="job-details-location">
                     📍{jobDetails.jobLocation}</p>
                <p className="job-details-type">💼{jobDetails.jobType}</p>
                <p className="job-details-posted">⏰{jobDetails.posted}</p>
            </div>

        </div>
            <div className="job-details-salary">
                <p className="job-details-salary-range">
                    💰Salary: {jobDetails.minSalary} - {jobDetails.maxSalary}</p>
            </div>

            <div className="job-details-description">
                <h3 className="job-details-description-title">Job Description</h3>
                <p className="job-details-description-text">{jobDetails.description}</p>
            </div>

            <div className="job-details-qualifications">
                <h3 className="job-details-qualifications-title">Qualifications</h3>
                <ul className="job-details-qualifications-list">
                    {jobDetails.requirements.map((req, index) => (
                        <li key={index} className="job-details-qualification-item">{req}</li>
                    ))}
                </ul>
            </div>

            <div className="job-details-tags">
                <h3 className="job-details-tags-title">Technologies We Use</h3>
                <div className="job-details-tags-list">
                    {jobDetails.tags.map((tag, index) => (
                        <span key={index} className="job-details-tag">{tag} </span>
                    ))}
                </div>
            </div>
            <div className="job-details-benefits">
                <h3 className="job-details-benefits-title">Benefits</h3>
                <ul className="job-details-benefits-list">
                    <li className="job-details-benefit-item">Health Insurance</li>
                    <li className="job-details-benefit-item">401(k) Plan</li>
                    <li className="job-details-benefit-item">Flexible Work Hours</li>
                    <li className="job-details-benefit-item">Remote Work Options</li>
                </ul>
            </div>

            <div className="job-details-apply">
                <button className="job-details-apply-button">Apply Now</button>
            </div>
    </div>
  )
}

export default JobDetails
