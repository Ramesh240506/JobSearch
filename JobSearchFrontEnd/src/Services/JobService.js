import axios from "axios";

const API_URL = "http://localhost:8080/api/jobs";

const authHeaders = () => ({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    }
});

export const createJob = async (jobData) => {
  try {
    const response = await axios.post(API_URL+'/jobpost', jobData,authHeaders());
    return response.data;

  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
}

export const getAllJobs = async () => {
    try {
        const response = await axios.get(API_URL+'/getalljobs', authHeaders());
         console.log("Full Axios response:", response);
    console.log("All Jobs (response.data):", response.data);
    
        return response.data;
    }
    catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
}

export const getJobById = async (jobId) => {
    try {
        const response = await axios.get(API_URL+'/getjob/'+jobId, authHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        throw error;
    }
}

export const postJobApplication = async (formData)=>{
    try{
        const response = await axios.post(API_URL+'/postapplication', formData, authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error posting job application:", error);
        throw error;
    }
    
}

export const registerUser = (userData)=>{
    return axios.post(API_URL+'/register',userData)
    .then(response => response.data)
    .catch(error => {
        console.error("Error registering user:", error);
        throw error;
    });
}

export const loginUser = (userData)=>{
    return axios.post(API_URL+'/login',userData)
}

export const getAllApplicants = () =>{
    return axios.get(API_URL+'/getapplicants',authHeaders());
}

export const getUserApplication=()=>{
    return axios.get(API_URL+'/getapplicationsdata',authHeaders())
}