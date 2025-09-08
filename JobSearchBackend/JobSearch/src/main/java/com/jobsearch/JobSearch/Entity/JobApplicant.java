package com.jobsearch.JobSearch.Entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
public class JobApplicant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userid")
    UserEntity user;

    @ManyToOne
    @JoinColumn(name = "jobid")
    JobPostEntity jobPostEntity;

    @CreationTimestamp
    private LocalDateTime appliedAt;

    private String applicationStatus;


}
