import axios from "axios";

const API_URL = "https://jobsearch-backend-e7av.onrender.com/api/jobs";

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

export const postJobApplication = async (formData,id)=>{
    try{
        const response = await axios.post(API_URL+'/postapplication/'+id, formData, authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error posting job application:", error);
        throw error;
    }
    
}

export const registerUser = (userData)=>{
    return axios.post(API_URL+'/register',userData);
}

export const loginUser = (userData)=>{
    return axios.post(API_URL+'/login',userData)
}

export const getAllApplicants = (jobid) =>{
    return axios.get(API_URL+'/getapplicants/'+jobid,authHeaders());
}

export const getUserApplication= async (page,size,status,keyword)=>{
    try{
        const response = await axios.get(`${API_URL}/getapplicationsdata?page=${page}&size=${size}&status=${status}&keyword=${keyword}`, authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const getSearchResults = async (page,size,keyword) => {
    try {
        const response = await axios.get(`${API_URL}/search?page=${page}&size=${size}&keyword=${keyword}`, authHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching search results:", error);
        throw error;
    }
}

export const getSortedJobs = async (sortBy) => {
    try {
        const response = await axios.get(`${API_URL}/sorting/${sortBy}`, authHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching sorted jobs:", error);
        throw error;
    }
}

export const SaveUserProfile =(userData) => {
    return axios.put(API_URL+'/saveprofile', userData, authHeaders())
    .then(response => response.data)
    .catch(error => {
        console.error("Error saving user profile:", error);
        throw error;
    });
}

export const getUserProfile = async () => {
    try {
        const response = await axios.get(API_URL+'/fetchuserdetails', authHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}

export const appliedUsers= async (id) => {
    try {
        const response = await axios.post(`${API_URL}/appliedusers/${id}`,{}, authHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching user applications:", error);
        throw error;
    }
}

export const JobSeekerApplications = async (page,size,filter,keyword) => {
  
    try{
        const response = await axios.get(`${API_URL}/getapplieduserjobs?page=${page}&size=${size}&status=${filter}&keyword=${keyword}`, authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const JobSeekerApplicationStatus = () => {
    return axios.get(API_URL+'/getappliedusersstatus', authHeaders());
}

export const JobSeekerAppliedJobDetails = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/getappliedjobofuserbyid/${id}`, authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const JobSeekerApplicationStatusByJobId = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/getapplieduserstatusbyjobid/${id}`, authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const JobSeekerApplicationStatusByUserId = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/getapplieduserstatusbyjobid/${id}`, authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const JobSeekerAppliedStatus = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/checkappliedstatus/${id}`, authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const deleteAppliedJob = async (id) => {
    try{
        
        const response = await axios.delete(`${API_URL}/deleteappliedjob/${id}`, authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error deleting applied job:", error);
        throw error;
    }
}

export const getAppliedUserDetails = async (jobid,id) => {
    try{
        const response = await axios.get(`${API_URL}/getapplieduserdetails/${jobid}/${id}`, authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const updateApplicantStatus = async (jobid,id,status,interview) => {
    try{
       const data = { applicationStatus: status, interviewDate: interview };

        const response = await axios.put(`${API_URL}/setappliedstatus/${jobid}/${id}`,data, authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const appliedUserDetailsOfAJob = async (jobid,id) => {
    try{
        const response = await axios.get(`${API_URL}/applieduserdetails/${jobid}/${id}`, authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const getApplicationsByStatus = async (status) => {
    try{
        const response = await axios.get(`${API_URL}/getapplicationsbystatus/${status}`, authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const paginate = async (page,size,sortBy,filter) => {
    try{
        const response = await axios.get(`${API_URL}/pagination?page=${page}&size=${size}&sortBy=${sortBy}&mode=${filter}`, authHeaders())
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const forgotPassword = async (email) => {
    try{
        const response = await axios.post(`${API_URL}/forgot-password?email=${email}`);
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const validateOtp = async (email,otp) => {
    try{
        const response = await axios.post(`${API_URL}/verify-otp?email=${email}&otp=${otp}`);
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const ResetPassword = async (email,password) => {
    try{
        const data={
            email:email,
            newPassword:password
        }
        const response = await axios.post(`${API_URL}/reset-password`,data);
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const sendFeedBack = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/contact`,data,authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}

export const jobsCount = async () => {
    try{
        const response = await axios.get(`${API_URL}/getjobscount`,authHeaders());
        return response.data;
      }
    catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
}
