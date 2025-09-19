package com.jobsearch.JobSearch.Repository;

import com.jobsearch.JobSearch.Entity.JobApplicant;
import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicantRepo extends JpaRepository<JobApplicant,Long> {

    JobApplicant findByUserAndJobPostEntity(UserEntity user, JobPostEntity jobdetails);

    void deleteByUserAndJobPostEntity(UserEntity user, JobPostEntity appliedJob);

    Page<JobApplicant> findByUser(UserEntity user, Pageable pageable);

    List<JobApplicant> findByUser(UserEntity user);

    @Query("select j from JobApplicant j "+
    "where j.user = :user " +
    "and (:status is NULL or j.applicationStatus = :status) "+
    "and (lower(j.jobPostEntity.jobTitle) like lower(concat('%',:keyword,'%'))"+
    " or lower(j.jobPostEntity.companyName) like lower(concat('%',:keyword,'%')))")
    Page<JobApplicant> findByUserAndApplicationStatus(UserEntity user, String status,
                                                      String keyword, Pageable pageable);
}
