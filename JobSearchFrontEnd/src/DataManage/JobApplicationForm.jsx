import { useEffect, useState } from "react";

import "./JobApplicationForm.css";
import PositionedSnackbar from "@/UIComponents/PositionedSnackbar";
import { appliedUsers, postJobApplication } from "@/Services/JobService";
import { useParams } from "react-router-dom";
export default function JobApplicationForm() {
  const [jobFormData, setjobFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    position: "",
    department: "",
    salary: "",
    startDate: "",
    experience: "",
    education: "",
    skills: "",
    coverLetter: "",
    resume: null,
    availability: "",
    referenceName: "",
    referenceEmail: "",
    referencePhone: "",
    linkedin: "",
    portfolio: "",
    workAuthorization: "",
    willingToRelocate: false,
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [resumeFile, setResumeFile] = useState(null);
  const { id } = useParams();
  const [snackbar, setSnackbar] = useState(false);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setjobFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setjobFormData((prev) => ({ ...prev, resume: file }));
    setResumeFile(file);
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "position",
      "experience",
      "education",
      "coverLetter",
      "resume",
      "workAuthorization",
      "agreeToTerms",
    ];

    requiredFields.forEach((field) => {
      const value = jobFormData[field];

      if (
        (typeof value === "string" && value.trim()) ||
        typeof value === "boolean" && value ||
        (field === "resume" && value instanceof File) // check file
      ) {
        newErrors[field] = "";
      } else {
        newErrors[field] =
          field.charAt(0).toUpperCase() + field.slice(1) + " is required";
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      appliedUsers(id);
      setIsSubmitted(true);
      const formData = new FormData();

      formData.append("resume", resumeFile);
      formData.append(
        "application",
        new Blob([JSON.stringify({ ...jobFormData, resume: null })], {
          type: "application/json",
        })
      );

      postJobApplication(formData, id)
        .then((response) => {
          console.log("Application submitted successfully:", response);
        })
        .catch((error) => {
          console.error("Error submitting application:", error);
        });

      console.log("Form submitted:", jobFormData);
    } else {
      setSnackbar(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setjobFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      position: "",
      department: "",
      salary: "",
      startDate: "",
      experience: "",
      education: "",
      skills: "",
      coverLetter: "",
      resume: null,
      availability: "",
      referenceName: "",
      referenceEmail: "",
      referencePhone: "",
      linkedin: "",
      portfolio: "",
      workAuthorization: "",
      willingToRelocate: false,
      agreeToTerms: false,
    });
    setErrors({});
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (isSubmitted) {
    return (
      <div className="container">
        <div className="successMessage">
          <h2 className="successTitle">Application Submitted Successfully!</h2>
          <p className="successText">
            Thank you for your application. We will review your information and
            contact you soon.
          </p>
          
        </div>
      </div>
    );
  }

  return (
    <div className="application-container">
      {snackbar && (
        <PositionedSnackbar
          open={snackbar}
          message="Please fill all required fields"
          onClose={() => setSnackbar(false)}
        />
      )}

      <div className="application-form">
        <div className="application-header">
          <h1 className="application-title">Job Application Form</h1>
          <p className="application-subtitle">
            Please fill out all required fields marked with *
          </p>
        </div>

        {/* Personal Info */}
        <div className="application-section">
          <h2 className="application-sectionTitle">Personal Information</h2>

          <div className="application-row">
            <div className="application-inputGroup">
              <label className="application-label">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={jobFormData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? "input inputError" : "application-input"}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <span className="errorText">{errors.firstName}</span>
              )}
            </div>

            <div className="application-inputGroup">
              <label className="application-label">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={jobFormData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? "input inputError" : "application-input"}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <span className="errorText">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="application-row">
            <div className="application-inputGroup">
              <label className="application-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={jobFormData.email}
                onChange={handleInputChange}
                className={errors.email ? "input inputError" : "application-input"}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <span className="errorText">{errors.email}</span>
              )}
            </div>

            <div className="application-inputGroup">
              <label className="application-label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={jobFormData.phone}
                onChange={handleInputChange}
                className={errors.phone ? "input inputError" : "application-input"}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <span className="errorText">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="application-inputGroup">
            <label className="application-label">Address</label>
            <input
              type="text"
              name="address"
              value={jobFormData.address}
              onChange={handleInputChange}
              className="application-input"
              placeholder="Enter your street address"
            />
          </div>

          <div className="application-row">
            <div className="application-inputGroup">
              <label className="application-label">City</label>
              <input
                type="text"
                name="city"
                value={jobFormData.city}
                onChange={handleInputChange}
                className="application-input"
                placeholder="Enter your city"
              />
            </div>

            <div className="application-inputGroup">
              <label className="application-label">State</label>
              <input
                type="text"
                name="state"
                value={jobFormData.state}
                onChange={handleInputChange}
                className="application-input"
                placeholder="Enter your state"
              />
            </div>

            <div className="application-inputGroup">
              <label className="application-label">ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={jobFormData.zipCode}
                onChange={handleInputChange}
                className="application-input"
                placeholder="Enter your ZIP code"
              />
            </div>
          </div>
        </div>

        {/* Job Information */}
        <div className="application-section">
          <h2 className="application-sectionTitle">Job Information</h2>

          <div className="application-row">
            <div className="application-inputGroup">
              <label className="application-label">Position Applied For *</label>
              <input
                type="text"
                name="position"
                value={jobFormData.position}
                onChange={handleInputChange}
                className={errors.position ? "input inputError" : "application-input"}
                placeholder="Enter the position you're applying for"
              />
              {errors.position && (
                <span className="errorText">{errors.position}</span>
              )}
            </div>

            <div className="application-inputGroup">
              <label className="application-label">Department</label>
              <select
                name="department"
                value={jobFormData.department}
                onChange={handleInputChange}
                className="select"
              >
                <option value="">Select Department</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
                <option value="operations">Operations</option>
                <option value="design">Design</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="application-row">
            <div className="application-inputGroup">
              <label className="application-label">Expected Salary</label>
              <input
                type="text"
                name="salary"
                value={jobFormData.salary}
                onChange={handleInputChange}
                className="application-input"
                placeholder="Enter expected salary"
              />
            </div>

            <div className="application-inputGroup">
              <label className="application-label">Available Start Date</label>
              <input
                type="date"
                name="startDate"
                value={jobFormData.startDate}
                onChange={handleInputChange}
                className="application-input"
              />
            </div>
          </div>

          <div className="application-inputGroup">
            <label className="application-label">Availability</label>
            <select
              name="availability"
              value={jobFormData.availability}
              onChange={handleInputChange}
              className="select"
            >
              <option value="">Select Availability</option>
              <option value="Full time">Full-time</option>
              <option value="Part time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        {/* Professional Information */}
        <div className="application-section">
          <h2 className="application-sectionTitle">Professional Information</h2>

          <div className="application-inputGroup">
            <label className="application-label">Work Experience *</label>
            <textarea
              name="experience"
              value={jobFormData.experience}
              onChange={handleInputChange}
              className={errors.experience ? "textarea inputError" : "textarea"}
              placeholder="Describe your relevant work experience..."
              rows="4"
            />
            {errors.experience && (
              <span className="errorText">{errors.experience}</span>
            )}
          </div>

          <div className="application-inputGroup">
            <label className="application-label">Education *</label>
            <textarea
              name="education"
              value={jobFormData.education}
              onChange={handleInputChange}
              className={errors.education ? "textarea inputError" : "textarea"}
              placeholder="Describe your educational background..."
              rows="3"
            />
            {errors.education && (
              <span className="errorText">{errors.education}</span>
            )}
          </div>

          <div className="application-inputGroup">
            <label className="application-label">Skills & Qualifications</label>
            <textarea
              name="skills"
              value={jobFormData.skills}
              onChange={handleInputChange}
              className="textarea"
              placeholder="List your relevant skills and qualifications..."
              rows="3"
            />
          </div>

          <div className="application-inputGroup">
            <label className="application-label">Cover Letter *</label>
            <textarea
              name="coverLetter"
              value={jobFormData.coverLetter}
              onChange={handleInputChange}
              className={
                errors.coverLetter ? "textarea inputError" : "textarea"
              }
              placeholder="Write your cover letter..."
              rows="6"
            />
            {errors.coverLetter && (
              <span className="errorText">{errors.coverLetter}</span>
            )}
          </div>

          <div className="application-inputGroup">
            <label className="application-label">Resume Upload</label>
            <input
              type="file"
              name="resume"
              onChange={handleFileChange}
              className="fileInput"
              accept=".pdf,.doc,.docx"
              required
            />
            <small className="helpText">Accepted formats: PDF, DOC, DOCX</small>
            {errors.resume && (
              <span className="errorText">{errors.resume}</span>
            )}
          </div>
        </div>

        {/* References */}
        <div className="application-section">
          <h2 className="application-sectionTitle">References</h2>

          <div className="referenceGroup">
            <h3 className="referenceTitle">Reference </h3>
            <div className="application-row">
              <div className="application-inputGroup">
                <label className="application-label">Name</label>
                <input
                  type="text"
                  name="referenceName"
                  value={jobFormData.referenceName}
                  onChange={handleInputChange}
                  className="application-input"
                  placeholder="Reference name"
                />
              </div>

              <div className="application-inputGroup">
                <label className="application-label">Email</label>
                <input
                  type="email"
                  name="referenceEmail"
                  value={jobFormData.referenceEmail}
                  onChange={handleInputChange}
                  className="application-input"
                  placeholder="Reference email"
                />
              </div>

              <div className="application-inputGroup">
                <label className="application-label">Phone</label>
                <input
                  type="tel"
                  name="referencePhone"
                  value={jobFormData.referencePhone}
                  onChange={handleInputChange}
                  className="application-input"
                  placeholder="Reference phone"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="application-section">
          <h2 className="application-sectionTitle">Additional Information</h2>

          <div className="application-row">
            <div className="application-inputGroup">
              <label className="application-label">LinkedIn Profile</label>
              <input
                type="url"
                name="linkedin"
                value={jobFormData.linkedin}
                onChange={handleInputChange}
                className="application-input"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div className="application-inputGroup">
              <label className="application-label">Portfolio/Website</label>
              <input
                type="url"
                name="portfolio"
                value={jobFormData.portfolio}
                onChange={handleInputChange}
                className="application-input"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>

          <div className="application-inputGroup">
            <label className="application-label">Work Authorization *</label>
            <select
              name="workAuthorization"
              value={jobFormData.workAuthorization}
              onChange={handleInputChange}
              className={
                errors.workAuthorization ? "select inputError" : "select"
              }
            >
              <option value="">Select work authorization status</option>
              <option value="citizen">U.S. Citizen</option>
              <option value="permanent-resident">Permanent Resident</option>
              <option value="work-visa">Work Visa</option>
              <option value="student-visa">Student Visa</option>
              <option value="other">Other</option>
            </select>
            {errors.workAuthorization && (
              <span className="errorText">{errors.workAuthorization}</span>
            )}
          </div>

          <div className="checkboxGroup">
            <label className="checkboxLabel">
              <input
                type="checkbox"
                name="willingToRelocate"
                checked={jobFormData.willingToRelocate}
                onChange={handleInputChange}
                className="checkbox"
              />
              I am willing to relocate if necessary
            </label>
          </div>

          <div className="checkboxGroup">
            <label className="checkboxLabel">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={jobFormData.agreeToTerms}
                onChange={handleInputChange}
                className="checkbox"
              />
              I agree to the terms and conditions and privacy policy *
            </label>
            {errors.agreeToTerms && (
              <span className="errorText">{errors.agreeToTerms}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="submitSection">
          <button onClick={handleSubmit} className="submitButton">
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
