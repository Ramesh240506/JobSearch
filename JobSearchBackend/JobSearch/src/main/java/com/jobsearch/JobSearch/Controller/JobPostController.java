package com.jobsearch.JobSearch.Controller;

import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import com.jobsearch.JobSearch.Service.JobPostService;
import com.jobsearch.JobSearch.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobPostController {

    @Autowired
    JobPostService postService;

    @Autowired
    UserService userService;

    @PostMapping("/jobpost")
    public void PostJobs(@RequestBody JobPostEntity jobData)
    {
        jobData.setStatus("active");
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

    @GetMapping("/search/{keyword}")
    public List<JobPostEntity> searchResults(@PathVariable String keyword)
    {
        return postService.searchResults(keyword);
    }

    @GetMapping("/pagination")
    public Page<JobPostEntity> paginateResults(
            @RequestParam int page,@RequestParam int size,@RequestParam String sortBy
            ,@RequestParam String mode)
    {
        return postService.getJobsByPaginate(page,size,sortBy,mode);
    }
}
