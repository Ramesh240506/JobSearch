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
    role: "SEEKER",
  });

  const [loading, setLoading] = useState(false);

  // State for errors
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-specific error when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before submit

    if (!isLoginMode) {
      // Registration validation
      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match!" });
        return;
      }

      if (formData.password.length < 8) {
        setErrors({ password: "Password should be at least 8 characters" });
        return;
      }
      
      if(formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)===null)
      {
        setErrors({ email: "Invalid email format" });
        return;
      }

      registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })
        .then(() => {
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "SEEKER",
          });
          setIsLoginMode(true);
        })
        .catch(() => {
          setErrors({ form: "Email already exists ! Please login" });
        });
    } else {
      // Login
      loginUser({
        email: formData.email,
        password: formData.password,
      })
        .then((response) => {
          if (response.data && response.data.accessToken) {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("role", response.data.role);
            navigate("/jobhome");
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            setErrors({ form: err.response.data.message });
          } else {
            setErrors({ form: "Invalid email or password" });
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
      role: loginMode ? "" : "SEEKER",
    });
    setErrors({});
  };

  const showForgotPassword = () => {
    navigate("/forgotpassword");
  };

  useEffect(() => {
    setLoading(true);
    const token=localStorage.getItem("accessToken");
    
    if(token)
    {
      try
      {
      const payload=JSON.parse(atob(token.split('.')[1]));
      const isExpired=Date.now()/1000>=payload.exp;
      if(!isExpired)
      {
        navigate("/jobhome");
      }
      else
      {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
      }
    } catch (e) {
      console.log(e);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
    }
  }
    setLoading(false);
  },[]);

  if(loading)
  {
    return <div>Loading...</div>;
  }
  return (

    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>JobBoard Portal</h1>
          <p>Find your dream job today</p>
        </div>

        <div className="auth-form-container">
          <div className="toggle-buttons">
            <div
              className={`toggle-slider ${!isLoginMode ? "register" : ""}`}
            />
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

          <form>
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
                {errors.username && (
                  <div className="field-error">{errors.username}</div>
                )}
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
              {errors.email && (
                <div className="field-error">{errors.email}</div>
              )}
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
              {errors.password && (
                <div className="field-error">{errors.password}</div>
              )}
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
                {errors.confirmPassword && (
                  <div className="field-error">{errors.confirmPassword}</div>
                )}
              </div>
            )}

            {/* Role - Register only */}
            {!isLoginMode && (
              <div className="form-group">
                <select
                  className="form-input"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="SEEKER">Job Seeker</option>
                  <option value="POSTER">Job Poster</option>
                </select>
                <label className="form-label">Role</label>
              </div>
            )}

            {/* Form-level error (e.g., login failure) */}
            {errors.form && <div className="form-error">{errors.form}</div>}

            <button type="submit" onClick={handleSubmit} className="submit-btn">
              {isLoginMode ? "Sign In" : "Create Account"}
            </button>

            {isLoginMode && (
              <div className="forgot-password">
                <button type="button" onClick={showForgotPassword}>
                  Forgot your password?
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobBoardAuth;
