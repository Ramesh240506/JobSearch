package com.jobsearch.JobSearch.Controller;

import com.jobsearch.JobSearch.Entity.JobApplicant;
import com.jobsearch.JobSearch.Entity.JobApplication;
import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Service.JobApplicantService;
import com.jobsearch.JobSearch.Service.JobPostService;
import jdk.dynalink.linker.LinkerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
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
    public List<JobPostEntity> getAppliedUserJobList()
    {
        return jobApplicantService.getAppliedUserJobs();
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
}
