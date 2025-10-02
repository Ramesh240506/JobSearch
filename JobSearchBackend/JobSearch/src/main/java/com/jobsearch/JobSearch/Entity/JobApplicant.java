package com.jobsearch.JobSearch.Entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class JobApplicant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userid")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "jobid")
    private JobPostEntity jobPostEntity;

    @CreationTimestamp
    private LocalDateTime appliedAt;

    private String applicationStatus;

    private LocalDate interviewDate;
}
