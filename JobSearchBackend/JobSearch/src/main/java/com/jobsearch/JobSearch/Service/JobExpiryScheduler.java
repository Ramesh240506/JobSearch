package com.jobsearch.JobSearch.Service;

import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Repository.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class JobExpiryScheduler {

    @Autowired
    private JobPostRepository jobPostRepository;

    @Scheduled(cron = "0 0 * * * ?")
    public void markExpiredJobs()
    {
        jobPostRepository.markExpiredJobsBulk(LocalDate.now());
    }
}
