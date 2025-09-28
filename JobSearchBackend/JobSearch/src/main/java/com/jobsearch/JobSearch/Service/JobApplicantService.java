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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
        jobApplicant.setApplicationStatus("Applied");
        jobApplicantRepo.save(jobApplicant);
    }

    public Page<JobPostEntity> getAppliedUserJobs(int page,int size,String status,String keyword) {

        String currentlyLoggedInUser=SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user=userRepository.findByEmail(currentlyLoggedInUser);

        Pageable pageable= PageRequest.of(page,size);
        Page<JobApplicant> appliedJobs;
        if((status!=null&&!status.isEmpty())||(keyword!=null&&!keyword.isEmpty()))
        {
            appliedJobs=jobApplicantRepo.findByUserAndApplicationStatus(
                    user,
                    (status!=null&&!status.isEmpty()) ? status : null,
                    (keyword!=null&&!keyword.isEmpty() ? keyword : "")
                    ,pageable);
        }
        else
        {
        appliedJobs=jobApplicantRepo.findByUser(user,pageable);
        }
        return appliedJobs.map(JobApplicant::getJobPostEntity);
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

    public void setAppliedStatus(Long jobid,Long id, JobApplicant updateStatus) {
        JobPostEntity appliedJob=jobPostRepository.findById(jobid)
                .orElseThrow(()->new RuntimeException("Job Not Found"));

        UserEntity user=userRepository.findById(id).orElseThrow(
                ()->new RuntimeException("User not Found")
        );

        JobApplication jobApplication=jobApplicationRepo.findByUserAndJobPost(user,appliedJob);
        jobApplication.setApplicationStatus(updateStatus.getApplicationStatus());
        JobApplicant jobstatus=jobApplicantRepo.findByUserAndJobPostEntity(user,appliedJob);

        jobstatus.setApplicationStatus(updateStatus.getApplicationStatus());

        if(updateStatus.getInterviewDate()!=null)
        {
            jobstatus.setInterviewDate(updateStatus.getInterviewDate());
        }

        jobApplicantRepo.save(jobstatus);
    }

    public JobApplicant getAppliedUserDetailsOfAJob(Long jobid, Long id) {
        UserEntity user=userRepository.findById(id).orElseThrow(
                ()->new RuntimeException("User Not Found")
        );

        JobPostEntity appliedJob=jobPostRepository.findById(jobid)
                .orElseThrow(()->new RuntimeException("Job not found"));

        return jobApplicantRepo.findByUserAndJobPostEntity(user,appliedJob);
    }

}
