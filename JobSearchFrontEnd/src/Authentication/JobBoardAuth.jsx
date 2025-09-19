import React, { useEffect, useState } from "react";
import "./JobBoardAuth.css";
import { loginUser, registerUser } from "@/Services/JobService";
import { useNavigate } from "react-router-dom";

const JobBoardAuth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:"SEEKER",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
   
},[formData]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoginMode) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Registration
      registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      }).then(() => {
        alert(`Registered successfully for: ${formData.username}`);
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
        setIsLoginMode(true);
      });
    } else {
      // Login
      loginUser({
        email: formData.email,
        password: formData.password,
      }).then((response) => {
        if (response.data && response.data.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("role", response.data.role);
          console.log("role:", response.data.role);
          alert("Login successful!");
          navigate("/jobhome");
        } else {
          alert("Login failed: " + response.message);
        }
      });
    }
  };

  const switchMode = (loginMode) => {
    setIsLoginMode(loginMode);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role:""
    });
  };

  const showForgotPassword = () => {
    alert("Password reset functionality would be implemented here.");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>JobBoard Portal</h1>
          <p>Find your dream job today</p>
        </div>

        <div className="auth-form-container">
          <div className="toggle-buttons">
            <div className={`toggle-slider ${!isLoginMode ? "register" : ""}`} />
            <button
              type="button"
              onClick={() => switchMode(true)}
              className={`toggle-btn ${isLoginMode ? "active" : ""}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => switchMode(false)}
              className={`toggle-btn ${!isLoginMode ? "active" : ""}`}
            >
              Register
            </button>
          </div>

          <div>
            {/* Username - Register only */}
            {!isLoginMode && (
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder=" "
                  required={!isLoginMode}
                  className="form-input"
                />
                <label className="form-label">Username</label>
              </div>
            )}

            {/* Email */}
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder=" "
                required
                className="form-input"
              />
              <label className="form-label">Email</label>
            </div>

            {/* Password */}
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder=" "
                required
                className="form-input"
              />
              <label className="form-label">Password</label>
            </div>

            {/* Confirm Password - Register only */}
            {!isLoginMode && (
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder=" "
                  required
                  className="form-input"
                />
                <label className="form-label">Confirm Password</label>
              </div>
            )}

            {
              !isLoginMode && (
              <div className="form-group">
                <select className="form-input" name="role" value={formData.role} 
                onChange={handleInputChange} required>
                  <option value="SEEKER">Job Seeker</option>
                  <option value="POSTER">Job Poster</option>
                </select>
                <label className="form-label">Role</label>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              className="submit-btn"
            >
              {isLoginMode ? "Sign In" : "Create Account"}
            </button>

            {isLoginMode && (
              <div className="forgot-password">
                <button type="button" onClick={showForgotPassword}>
                  Forgot your password?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBoardAuth;
