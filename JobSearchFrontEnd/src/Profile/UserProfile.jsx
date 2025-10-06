import React, { useEffect } from "react";

import "./UserProfile.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserProfile } from "@/Services/JobService";
import JobSeeker from "@/Profile/JobSeeker";
import JobPoster from "./JobPoster";
import CircularIndeterminate from "@/HOME/CircularIndeterminate";
const UserProfile = () => {
  const navigate = useNavigate();
  const [userdetails, setUserDetails] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    title: "",
    experience: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState();
  const fetchUserDetails = async () => {
    try {
      const response = await getUserProfile();
      setUserDetails(response);
      console.log("User details fetched:", response);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
    finally
    {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
   
    fetchUserDetails();
  }, []);

  if(loading)
  {
    return <CircularIndeterminate/>
  }

  return (
    <div className="user-profile-container">
      <div className="profile-details">
        <div className="profile-image">
          <h2>{userdetails.username}</h2>
          <p>{userdetails.title}</p>
          <p>{userdetails.email}</p>
        </div>
        <div className="profile-actions">
          <button
            onClick={() => navigate("/userdetails")}
            className="edit-profile-button"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="main-content">
        {role === "SEEKER" ? <JobSeeker /> : <JobPoster />}
      </div>
    </div>
  );
};

export default UserProfile;
