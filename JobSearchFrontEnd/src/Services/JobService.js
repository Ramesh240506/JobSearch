import axios from "axios";

const API_URL = "http://localhost:8080/api/jobs";

export const createJob = async (jobData) => {
  try {
    const response = await axios.post(API_URL+'/jobpost', jobData);
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
}

export const getAllJobs = async () => {
    try {
        const response = await axios.get(API_URL+'/getalljobs');
        return response.data;
    }
    catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
}

export const getJobById = async (jobId) => {
    try {
        const response = await axios.get(`${API_URL}/getjob/${jobId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        throw error;
    }
}