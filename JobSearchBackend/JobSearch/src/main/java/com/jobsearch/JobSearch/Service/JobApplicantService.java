package com.jobsearch.JobSearch.Service;

import com.jobsearch.JobSearch.Entity.JobApplicant;
import com.jobsearch.JobSearch.Entity.JobApplication;
import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import com.jobsearch.JobSearch.Repository.JobApplicantRepo;
import com.jobsearch.JobSearch.Repository.JobApplicationRepo;
import com.jobsearch.JobSearch.Repository.JobPostRepository;
import com.jobsearch.JobSearch.Repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class JobApplicantService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JobPostRepository jobPostRepository;

    @Autowired
    JobApplicantRepo jobApplicantRepo;

    @Autowired
    JobApplicationRepo jobApplicationRepo;

    public void appliedUsers(Long id) {

        String currentlyLoggedInUser= SecurityContextHolder.getContext().
                getAuthentication().getName();

        UserEntity user=userRepository.findByEmail(currentlyLoggedInUser);


        JobPostEntity job=jobPostRepository.findById(id).orElseThrow(()->
                new RuntimeException("Job Not Found"));

        JobApplicant jobApplicant=new JobApplicant();
        jobApplicant.setUser(user);
        jobApplicant.setJobPostEntity(job);
        jobApplicant.setApplicationStatus("APPLIED");
        jobApplicantRepo.save(jobApplicant);
    }

    public List<JobPostEntity> getAppliedUserJobs() {

        String currentlyLoggedInUser=SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user=userRepository.findByEmail(currentlyLoggedInUser);

        List<JobApplicant> appliedJobs=jobApplicantRepo.findByUser(user);

        List<JobPostEntity> jobPost=new ArrayList<>();

        for (JobApplicant appliedJob:appliedJobs)
        {
            jobPost.add(appliedJob.getJobPostEntity());
        }

        return jobPost;
    }

    public List<JobApplicant> getAppliedUsers() {
            String currentlyLoggedInUser=SecurityContextHolder.getContext().getAuthentication().getName();

            UserEntity user=userRepository.findByEmail(currentlyLoggedInUser);

            List<JobApplicant> appliedJobDetails=jobApplicantRepo.findByUser(user);

            return appliedJobDetails;
        }

    public JobPostEntity getAppliedJobOfUser(Long jobid) {

        String currentlyLoggedInUser=SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user=userRepository.findByEmail(currentlyLoggedInUser);

        JobPostEntity jobdetails=jobPostRepository.findById(jobid).orElseThrow(
                ()-> new RuntimeException("Job not found"));

        JobApplicant appliedJob=jobApplicantRepo.findByUserAndJobPostEntity(user,jobdetails);

        return appliedJob.getJobPostEntity();
    }

    public JobApplicant getAppliedJobStatus(Long jobid) {

        JobPostEntity appliedJob=jobPostRepository.findById(jobid)
                .orElseThrow(()->new RuntimeException("No Job found"));

        String currentlyLoggedInUser=SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user=userRepository.findByEmail(currentlyLoggedInUser);
        return jobApplicantRepo.findByUserAndJobPostEntity(user,appliedJob);
    }

    public ResponseEntity<Boolean> getAppliedStatusOfUser(Long jobid) {
        JobPostEntity applyingJob=jobPostRepository.findById(jobid).orElseThrow(
                ()->new RuntimeException("Job Not Found")
        );

        String currentlyLoggedInUser=SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user=userRepository.findByEmail(currentlyLoggedInUser);
        JobApplicant existingData=jobApplicantRepo.findByUserAndJobPostEntity(user,applyingJob);

        if(existingData==null)
        {
            return ResponseEntity.ok(false);
        }
        else
        {
            return ResponseEntity.ok(true);
        }
    }

    @Transactional
    public void deleteAppliedJob(Long jobid) {

        JobPostEntity appliedJob=jobPostRepository.findById(jobid).orElseThrow(
                ()->new RuntimeException("No Job Found ")
        );

        String currentlyLoggedInUser=SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user=userRepository.findByEmail(currentlyLoggedInUser);

        jobApplicationRepo.deleteByUserAndJobPost(user,appliedJob);
        jobApplicantRepo.deleteByUserAndJobPostEntity(user,appliedJob);
    }

    public JobApplication getAppliedUserDetails(Long jobid, Long id) {

        JobPostEntity appliedJob=jobPostRepository.findById(jobid).orElseThrow(
                ()->new RuntimeException("Job Not Found")
        );

        UserEntity user=userRepository.findById(id).orElseThrow(
                ()->new RuntimeException("User Not Found")
        );

        return jobApplicationRepo.findByUserAndJobPost(user,appliedJob);
    }
}
