package com.jobsearch.JobSearch.Repository;

import com.jobsearch.JobSearch.Entity.JobApplication;
import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface JobPostRepository extends JpaRepository<JobPostEntity,Long> {

    List<JobPostEntity> findAllByUserId(Long id);

    @Query("select e from JobPostEntity e where e.user = :user and " +
            "(lower(e.jobTitle) like lower(concat('%',:keyword,'%')) or " +
            "lower(e.companyName) like lower(concat('%',:keyword,'%')))")
    Page<JobPostEntity> searchJobs(UserEntity user, String keyword, Pageable pageable);


    Page<JobPostEntity> findByUserAndStatus(UserEntity user, String status,Pageable pageable);

    @Query("select e from JobPostEntity e where e.user = :user and e.status = :status and " +
            "(lower(e.jobTitle) like lower(concat('%',:keyword,'%')) or " +
            "lower(e.companyName) like lower(concat('%',:keyword,'%')))")
    Page<JobPostEntity> findByUserAndStatusAndKeyword(UserEntity user, String status, String keyword, Pageable pageable);

    Page<JobPostEntity> findByWorkMode(String mode, Pageable pageable);

    @Modifying
    @Transactional
    @Query("update JobPostEntity j set j.status='expired' where j.status = 'active' and j.deadline <:today")
    void markExpiredJobsBulk(LocalDate today);

    List<JobPostEntity> findByStatus(String active);
    Page<JobPostEntity> findByStatus(String active,Pageable pageable);

    Page<JobPostEntity> findByStatusAndWorkMode(String active, String mode, Pageable pageable);

    Page<JobPostEntity> findByUser(UserEntity user, Pageable pageable);
    List<JobPostEntity> findByUser(UserEntity user);

    @Query("select e from JobPostEntity e where " +
            "lower(e.jobTitle) like lower(concat('%',:keyword,'%')) or " +
            "lower(e.companyName) like lower(concat('%',:keyword,'%'))")
    Page<JobPostEntity> searchJobsGlobal(String keyword, Pageable pageable);

    JobPostEntity findByIdAndUser(Long jobid, UserEntity user);
}
