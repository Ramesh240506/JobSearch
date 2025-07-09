package com.jobsearch.JobSearch.Repository;

import com.jobsearch.JobSearch.Entity.JobPostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostRepository extends JpaRepository<JobPostEntity,Long> {

}
