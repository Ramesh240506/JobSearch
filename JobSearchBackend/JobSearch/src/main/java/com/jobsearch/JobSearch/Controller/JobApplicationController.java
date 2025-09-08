package com.jobsearch.JobSearch.Controller;

import com.jobsearch.JobSearch.Entity.JobApplicant;
import com.jobsearch.JobSearch.Entity.JobApplication;
import com.jobsearch.JobSearch.Service.JobAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin("*")
public class JobApplicationController {

    @Autowired
    JobAppService jobAppService;

    @PostMapping("/postapplication/{jobid}")
    public void saveApplication(@RequestPart("application") JobApplication jobApplication
    , @RequestPart("resume")MultipartFile resumeFile,@PathVariable Long jobid) throws IOException {
        jobAppService.saveApplication(jobApplication,resumeFile,jobid);
    }

    @GetMapping("/getapplicants/{jobid}")
    public List<JobApplication> getApplicantsDetails(@PathVariable Long jobid)
    {
        return jobAppService.getApplicantDetails(jobid);
    }


}
