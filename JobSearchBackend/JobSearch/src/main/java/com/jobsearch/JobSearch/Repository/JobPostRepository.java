package com.jobsearch.JobSearch.Repository;

import com.jobsearch.JobSearch.Entity.JobApplication;
import com.jobsearch.JobSearch.Entity.JobPostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPostRepository extends JpaRepository<JobPostEntity,Long> {

    List<JobPostEntity> findAllByUserId(Long id);

    @Query("select e from JobPostEntity e where "+
    "lower(e.jobTitle) like lower(concat('%',:keyword,'%')) or "+
    "lower(e.companyName) like lower(concat('%',:keyword,'%'))"
    )
    List<JobPostEntity> searchJobs(String keyword);
}
