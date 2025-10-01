package com.jobsearch.JobSearch.Service;

import com.jobsearch.JobSearch.Entity.JobApplicant;
import com.jobsearch.JobSearch.Entity.JobApplication;
import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import com.jobsearch.JobSearch.Repository.JobApplicantRepo;
import com.jobsearch.JobSearch.Repository.JobApplicationRepo;
import com.jobsearch.JobSearch.Repository.JobPostRepository;
import com.jobsearch.JobSearch.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class JobAppService {

    @Autowired
    JobApplicationRepo jobApplicationRepo;

    @Autowired
    JobApplicantRepo jobApplicantRepo;

    @Autowired
    JobPostService jobPostService;

    @Autowired
    JobPostRepository jobPostRepository;

    @Autowired
    UserRepository userRepository;

    public void saveApplication(JobApplication jobApplication, MultipartFile resumeFile,Long jobid) throws IOException {
        jobApplication.setResume(resumeFile.getBytes());

        JobPostEntity jobPostEntity=jobPostService.getJobById(jobid);

        jobApplication.setJobPost(jobPostEntity);
        String currentlyLoggedInUser=SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user=userRepository.findByEmail(currentlyLoggedInUser);
        jobApplication.setUser(user);
        jobApplication.setApplicationStatus("Applied");
        jobApplicationRepo.save(jobApplication);
    }

    public List<JobApplication> getApplicantDetails(Long jobid) {
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user=userRepository.findByEmail(email);

        JobPostEntity jobPostEntity=jobPostRepository.findByIdAndUser(jobid,user);

        return jobApplicationRepo.findByJobPost(jobPostEntity);
    }

    public JobApplication getApplicantDetailsByEmail(String email) {
        return jobApplicationRepo.findByEmail(email);
    }


}
