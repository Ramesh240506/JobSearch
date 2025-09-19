package com.jobsearch.JobSearch.Repository;

import com.jobsearch.JobSearch.Entity.JobApplicant;
import com.jobsearch.JobSearch.Entity.JobApplication;
import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import lombok.Lombok;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepo extends JpaRepository<JobApplication,Long> {
    JobApplication findByEmail(String email);

    List<JobApplication> findByJobPost(JobPostEntity jobPostEntity);

    void deleteByUserAndJobPost(UserEntity user, JobPostEntity appliedJob);

    JobApplication findByUserAndJobPost(UserEntity user, JobPostEntity appliedJob);

}
