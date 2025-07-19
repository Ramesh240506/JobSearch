package com.jobsearch.JobSearch.Repository;

import com.jobsearch.JobSearch.Entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobApplicationRepo extends JpaRepository<JobApplication,Long> {
}
