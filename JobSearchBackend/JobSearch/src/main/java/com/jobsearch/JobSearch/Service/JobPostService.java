package com.jobsearch.JobSearch.Service;

import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Repository.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobPostService {

    @Autowired
    JobPostRepository jobPostRepo;
    public void postJobData(JobPostEntity jobData) {
        jobPostRepo.save(jobData);
    }

    public List<JobPostEntity> getAllJobs() {
        return jobPostRepo.findAll();
    }

    public JobPostEntity getJobById(Long id) {

        return jobPostRepo.findById(id).
                orElseThrow(()->new RuntimeException("No id Found"));

    }
}
