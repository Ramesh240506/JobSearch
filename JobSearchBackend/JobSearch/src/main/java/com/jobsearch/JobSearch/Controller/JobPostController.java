package com.jobsearch.JobSearch.Controller;

import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import com.jobsearch.JobSearch.Service.JobPostService;
import com.jobsearch.JobSearch.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin("*")
public class JobPostController {

    @Autowired
    JobPostService postService;

    @Autowired
    UserService userService;

    @PostMapping("/jobpost")
    public void PostJobs(@RequestBody JobPostEntity jobData)
    {

        postService.postJobData(jobData);
    }

    @GetMapping("/getalljobs")
    public List<JobPostEntity> fetchJobs()
    {
        return postService.getAllJobs();
    }

    @GetMapping("/getjob/{id}")
    public JobPostEntity getJobById(@PathVariable Long id)
    {
        return postService.getJobById(id);
    }
}
