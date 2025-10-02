package com.jobsearch.JobSearch.Controller;

import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobPostController {

    @Autowired
    JobPostService postService;



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

    @GetMapping("/search")
    public Page<JobPostEntity> searchResults(@RequestParam int page,@RequestParam int size,@RequestParam String keyword)
    {
        return postService.searchResults(page,size,keyword);
    }

    @GetMapping("/pagination")
    public Page<JobPostEntity> paginateResults(
            @RequestParam int page,@RequestParam int size,@RequestParam String sortBy
            ,@RequestParam String mode)
    {
        return postService.getJobsByPaginate(page,size,sortBy,mode);
    }

    @GetMapping("/getjobscount")
    public List<JobPostEntity> jobsCount()
    {
        return postService.jobsCount();
    }
}
