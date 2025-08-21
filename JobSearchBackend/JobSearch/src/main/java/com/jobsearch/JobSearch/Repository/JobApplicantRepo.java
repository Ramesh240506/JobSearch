package com.jobsearch.JobSearch.Repository;

import com.jobsearch.JobSearch.Entity.JobApplicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobApplicantRepo extends JpaRepository<JobApplicant,Long> {
}
