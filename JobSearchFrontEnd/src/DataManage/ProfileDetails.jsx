import { getUserProfile, SaveUserProfile } from "@/Services/JobService";
import { Save } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
    const [userdetails, setUserDetails] =useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            address: "",
            title: "",
            experience: "",
            bio: ""
        }
    );
    useEffect(() => {
        // Fetch user details from an API or local storage
        const fetchUserDetails = async () => {
            try {
                const response = await getUserProfile();
                setUserDetails(response);
                console.log("User details fetched:", response);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchUserDetails();
    },[]);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userdetails,
            [name]: value
        });
    }

    const handleSave = (e) => {
        // Logic to save user details
        e.preventDefault();
        SaveUserProfile(userdetails);
        console.log("User details saved:", userdetails);
        navigate('/userprofile'); 
    }
  return (
    
    <div>
      <div className="profile-details">
        <h1>Personal Information</h1>
        <label>
          First Name
          <input name="firstName" onChange={handleChange} value={userdetails.firstName} type="text" placeholder="First Name" />
        </label>
        <label>
          Last Name
          <input name="lastName" onChange={handleChange} value={userdetails.lastName} type="text" placeholder="Last Name" />
        </label>
        <label>
          Email
          <input name="email" onChange={handleChange} value={userdetails.email} type="email" placeholder="Email" />
        </label>
        <label>
          Phone Number
          <input name="phoneNumber" onChange={handleChange} value={userdetails.phoneNumber} type="tel" placeholder="Phone Number" />
        </label>
        <label>
          Address
          <input name="address" onChange={handleChange} value={userdetails.address} type="text" placeholder="Address" />
        </label>
        <label>
          Title
          <input name="title" onChange={handleChange} value={userdetails.title} type="text" placeholder="Title" />
        </label>
        <label>
          Experience
          <input name="experience" onChange={handleChange} value={userdetails.experience} type="text" placeholder="Experience" />
        </label>

        <label className="profile-bio">
          Bio
            <textarea name="bio" onChange={handleChange} value={userdetails.bio} placeholder="Tell us about yourself" rows="4"></textarea>

        </label>
      </div>
      <div className="profile-actions">
        <button onClick={handleSave} className="save-profile-button">Save Changes</button>
        <button onClick={()=>navigate('/userprofile')} className="cancel-button">Cancel</button>
      </div>

      <style>
        {
            `
            .profile-details {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.profile-details h1 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.profile-details label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: #444;
  margin-bottom: 15px;
}

.profile-details input {
  margin-top: 6px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  transition: border 0.3s;
}

.profile-details input:focus {
  border-color: #007bff;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
}

.profile-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px;
}

.save-profile-button,
.cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}

.save-profile-button {
  background-color: #007bff;
  color: #fff;
}

.save-profile-button:hover {
  background-color: #0056b3;
}

.cancel-button {
  background-color: #f0f0f0;
  color: #333;
}

.cancel-button:hover {
  background-color: #d6d6d6;
}

.profile-bio textarea{
    margin-top: 6px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    font-size: 14px;
    resize: vertical; /* Allow resizing only up/down */
    transition: border 0.3s;
    font-family: inherit; /* Matches rest of form */
  }

  .profile-bio textarea:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
  }
            `
        }
      </style>
    </div>
  );
};

export default ProfileDetails;
