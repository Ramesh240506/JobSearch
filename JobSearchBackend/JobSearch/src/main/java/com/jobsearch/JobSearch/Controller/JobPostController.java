package com.jobsearch.JobSearch.Controller;

import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin("*")
public class JobPostController {

    @Autowired
    JobPostService postService;

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
}
