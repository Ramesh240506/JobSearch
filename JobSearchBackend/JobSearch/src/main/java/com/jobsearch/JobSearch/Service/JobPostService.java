package com.jobsearch.JobSearch.Service;

import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import com.jobsearch.JobSearch.Repository.JobPostRepository;
import com.jobsearch.JobSearch.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
        return jobPostRepo.findByStatus("active");
    }

    public JobPostEntity getJobById(Long id) {

        return jobPostRepo.findById(id).
                orElseThrow(()->new RuntimeException("No id Found"));

    }

//    public Page<JobPostEntity> searchResults(String keyword) {
//        return jobPostRepo.searchJobs(keyword);
//    }


    public Page<JobPostEntity> getJobsByPaginate(int page, int size,String sortBy,String mode) {
        Pageable pageable=null;
        if(sortBy!=null&&!sortBy.isEmpty())
        {
            if(sortBy.equals("postedAt"))
            {
            pageable= PageRequest.of(page,size,Sort.by(sortBy).descending());
            }
            else if(sortBy.equals("minSalary"))
            pageable= PageRequest.of(page,size,Sort.by(sortBy).ascending());
            else if(sortBy.equals("maxSalary"))
            pageable= PageRequest.of(page,size,Sort.by(sortBy).descending());
        }
        else
        {
            pageable= PageRequest.of(page,size);
        }
        if(mode!=null&&!mode.isEmpty())
        {
            return jobPostRepo.findByStatusAndWorkMode("active",mode,pageable);
        }
        return jobPostRepo.findByStatus("active",pageable);
    }

    public Page<JobPostEntity> searchResults(int page,int size,String keyword) {

        Pageable pageable=PageRequest.of(page,size);

        if(keyword!=null&&!keyword.isEmpty())
        {
            return jobPostRepo.searchJobsGlobal(keyword,pageable);
        }
        else
            return jobPostRepo.findAll(pageable);
    }
}
