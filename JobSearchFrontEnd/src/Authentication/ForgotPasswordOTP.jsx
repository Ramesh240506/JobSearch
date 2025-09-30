import { useState } from "react";
import "./ForgotPasswordOTP.css";
import { forgotPassword, ResetPassword, validateOtp } from "@/Services/JobService";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordOTP() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); // store as string
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const navigate=useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    await forgotPassword(email);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 200);
  };

  const handleOtpChange = (value) => {
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      setLoading(false);
      return;
    }

    try {
      const isValid = await validateOtp(email, otp);

      if (isValid) {
        setTimeout(() => {
          setLoading(false);
          setStep(3);
        }, 1500);
      } else {
        setError("Invalid OTP");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    await ResetPassword(email, newPassword);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setSuccess(false);
      }, 1500);
    }, 1500);
  };

  const handleResendOtp = async () => {
    setError("");
    setOtp("");
    setResendDisabled(true);
    setResendTimer(60); // start from 60 seconds

    alert("OTP has been resent to your email");

    const timerInterval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setResendDisabled(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    //   await forgotPassword(email);
  };

  return (
    <div className="pwdcontainer">
      <div className="card">
        <div className="header">
          <div className="iconCircle">
            <span className="lockIcon">🔒</span>
          </div>
          <h1 className="title">Forgot Password</h1>
          <p className="subtitle">
            {step === 1 && "Enter your email to receive OTP"}
            {step === 2 && "Enter the 6-digit code sent to your email"}
            {step === 3 && "Create your new password"}
          </p>
        </div>

        {success && (
          <div className="successBox">
            <span className="successIcon">✓</span>
            <p className="successText">Password reset successfully!</p>
          </div>
        )}

        {error && (
          <div className="errorBox">
            <p className="errorText">{error}</p>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="formGroup">
              <label className="label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleEmailSubmit(e)}
                className="input"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleEmailSubmit}
              disabled={loading}
              className={`button${loading ? " buttonDisabled" : ""}`}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="formGroup">
              <label className="otpLabel">Enter OTP sent to {email}</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => handleOtpChange(e.target.value)}
                className="otpInput"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                disabled={loading}
              />
              <p style={{ color: "green" }}>
                If an account with that email exists, an OTP has been sent.
              </p>
            </div>
            <button
              onClick={handleOtpSubmit}
              disabled={loading}
              className={`button${loading ? " buttonDisabled" : ""}`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={handleResendOtp}
              className="linkButton"
              disabled={resendDisabled}
            >
              {resendDisabled ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
            </button>

            {/* <button onClick={() => setStep(1)} className="backButton">
              ← Back
            </button> */}
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="formGroup">
              <label className="label">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input"
                placeholder="Enter new password"
                disabled={loading}
              />
            </div>
            <div className="formGroup">
              <label className="label">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handlePasswordReset(e)}
                className="input"
                placeholder="Confirm new password"
                disabled={loading}
              />
            </div>
            <button
              onClick={handlePasswordReset}
              disabled={loading}
              className={`button${loading ? " buttonDisabled" : ""}`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}

        <div className="footer">
          <p style={{cursor:'pointer'}} onClick={()=>navigate('/')}>

            Back to Login
          </p>
          
        </div>
      </div>
    </div>
  );
}
