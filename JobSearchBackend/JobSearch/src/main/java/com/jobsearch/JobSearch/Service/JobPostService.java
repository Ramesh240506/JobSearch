package com.jobsearch.JobSearch.Service;

import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import com.jobsearch.JobSearch.Repository.JobPostRepository;
import com.jobsearch.JobSearch.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobPostService {

    @Autowired
    JobPostRepository jobPostRepo;

    @Autowired
    UserRepository userRepository;

    public void postJobData(JobPostEntity jobData) {

        String CurrentlyLoggedInUserEmail= SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user=userRepository.findByEmail(CurrentlyLoggedInUserEmail);
        jobData.setUser(user);

        jobPostRepo.save(jobData);
    }

    public List<JobPostEntity> getAllJobs() {
        System.out.println(jobPostRepo.findAll());
        return jobPostRepo.findAll();
    }

    public JobPostEntity getJobById(Long id) {

        return jobPostRepo.findById(id).
                orElseThrow(()->new RuntimeException("No id Found"));

    }

    public List<JobPostEntity> searchResults(String keyword) {
        return jobPostRepo.searchJobs(keyword);
    }

    public List<JobPostEntity> sortResults(String sortby) {
        if(sortby.equals("postedAt"))
        {
            return jobPostRepo.findAll(Sort.by(Sort.Direction.DESC,sortby));
        }
        return jobPostRepo.findAll(Sort.by(Sort.Direction.ASC,sortby));
    }
}
