package com.jobsearch.JobSearch.Controller;

import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Service.JobApplicantService;
import com.jobsearch.JobSearch.Service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/jobs")
public class JobApplicantController {

    @Autowired
    JobApplicantService jobApplicantService;

    @PostMapping("/appliedusers/{jobid}")
    public void appliedUsers(@PathVariable Long jobid)
    {
        jobApplicantService.appliedUsers(jobid);
    }
}
