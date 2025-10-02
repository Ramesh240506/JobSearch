package com.jobsearch.JobSearch.Service;

import com.jobsearch.JobSearch.Repository.JobPostRepository;
import com.jobsearch.JobSearch.Repository.PasswordResetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobExpiryScheduler {

    @Autowired
    private JobPostRepository jobPostRepository;

    @Autowired
    private PasswordResetRepo passwordResetRepo;

    @Scheduled(cron = "0 0 * * * ?")
    public void markExpiredJobs()
    {
        jobPostRepository.markExpiredJobsBulk(LocalDate.now());
    }

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void deleteExpiredOtps()
    {
        LocalDateTime now=LocalDateTime.now();
        passwordResetRepo.deleteAllByExpiryBefore(now);
    }
}
