package com.jobsearch.JobSearch.Repository;

import com.jobsearch.JobSearch.Entity.JobApplicant;
import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicantRepo extends JpaRepository<JobApplicant,Long> {
    List<JobApplicant> findByUser(UserEntity user);

    JobApplicant findByUserAndJobPostEntity(UserEntity user, JobPostEntity jobdetails);

    void deleteByUserAndJobPostEntity(UserEntity user, JobPostEntity appliedJob);
}
