package com.jobsearch.JobSearch.Repository;

import com.jobsearch.JobSearch.Entity.PasswordReset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface PasswordResetRepo extends JpaRepository<PasswordReset,Long> {
    void deleteAllByExpiryBefore(LocalDateTime now);

    PasswordReset findByEmail(String email);

    void deleteByEmail(String email);
}
