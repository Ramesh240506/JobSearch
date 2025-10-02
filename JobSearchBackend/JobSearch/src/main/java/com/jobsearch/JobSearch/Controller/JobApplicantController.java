package com.jobsearch.JobSearch.Controller;

import com.jobsearch.JobSearch.Entity.JobApplicant;
import com.jobsearch.JobSearch.Entity.JobApplication;
import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Service.JobApplicantService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobApplicantController {

    @Autowired
    JobApplicantService jobApplicantService;

    @PostMapping("/appliedusers/{jobid}")
    public void saveAppliedUsers(@PathVariable Long jobid)
    {
        jobApplicantService.appliedUsers(jobid);
    }


    @GetMapping("/getapplieduserjobs")
    public Page<JobPostEntity> getAppliedUserJobList(
            @RequestParam int page,@RequestParam int size,
            @RequestParam String status,@RequestParam String keyword
    )
    {
        return jobApplicantService.getAppliedUserJobs(page,size,status,keyword);
    }

    @GetMapping("/getappliedusersstatus")
    public List<JobApplicant> getAppliedUsers()
    {
        return jobApplicantService.getAppliedUsers();
    }

    @GetMapping("/getappliedjobofuserbyid/{jobid}")
    public JobPostEntity getAppliedJobOfUser(@PathVariable Long jobid)
    {
        return jobApplicantService.getAppliedJobOfUser(jobid);
    }

    @GetMapping("/getapplieduserstatusbyjobid/{jobid}")
    public JobApplicant getAppliedJobStatus(@PathVariable Long jobid)
    {
        return jobApplicantService.getAppliedJobStatus(jobid);
    }

    @GetMapping("/checkappliedstatus/{jobid}")
    public ResponseEntity<Boolean> checkAppliedStatusOfUser(@PathVariable Long jobid)
    {
        return jobApplicantService.getAppliedStatusOfUser(jobid);
    }

    @DeleteMapping("/deleteappliedjob/{jobid}")
    public void deleteAppliedJob(@PathVariable Long jobid)
    {
        jobApplicantService.deleteAppliedJob(jobid);
    }

    @GetMapping("/getapplieduserdetails/{jobid}/{id}")
    public JobApplication getAppliedUserDetails(@PathVariable Long jobid,@PathVariable Long id)
    {
        return jobApplicantService.getAppliedUserDetails(jobid,id);
    }

    @PutMapping("/setappliedstatus/{jobid}/{id}")
    public void setAppliedStatus(@PathVariable Long jobid,@PathVariable Long id,
                                 @RequestBody JobApplicant updateStatus) throws MessagingException {
        jobApplicantService.setAppliedStatus(jobid,id,updateStatus);
    }

    @GetMapping("/applieduserdetails/{jobid}/{id}")
    public JobApplicant AppliedUserDetailsOfAJob(@PathVariable Long jobid,@PathVariable Long id)
    {
        return jobApplicantService.getAppliedUserDetailsOfAJob(jobid,id);
    }


}
