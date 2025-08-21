package com.jobsearch.JobSearch.Service;

import com.jobsearch.JobSearch.Entity.JobApplicant;
import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import com.jobsearch.JobSearch.Repository.JobApplicantRepo;
import com.jobsearch.JobSearch.Repository.JobPostRepository;
import com.jobsearch.JobSearch.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class JobApplicantService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JobPostRepository jobPostRepository;

    @Autowired
    JobApplicantRepo jobApplicantRepo;

    public void appliedUsers(Long id) {

        String currentlyLoggedInUser= SecurityContextHolder.getContext().
                getAuthentication().getName();

        UserEntity user=userRepository.findByEmail(currentlyLoggedInUser);


        JobPostEntity job=jobPostRepository.findById(id).orElseThrow(()->
                new RuntimeException("Job Not Found"));

        JobApplicant jobApplicant=new JobApplicant();
        jobApplicant.setUser(user);
        jobApplicant.setJobPostEntity(job);

        jobApplicantRepo.save(jobApplicant);
    }
}
