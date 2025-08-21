package com.jobsearch.JobSearch.Repository;

import com.jobsearch.JobSearch.Entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepo extends JpaRepository<UserProfile,Long> {

    UserProfile findByUserId(Long id);

    boolean existsByUserId(Long id);
}
