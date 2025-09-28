package com.jobsearch.JobSearch.Entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "jobpostings")
public class JobPostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String jobTitle;
    private String companyName;
    private String jobLocation;
    private String jobType;

    @Column(columnDefinition = "TEXT")
    private String jobDescription;
    @Column(columnDefinition = "TEXT")
    private String qualifications;
    @Column(columnDefinition = "TEXT")
    private String requirements;

    private String experienceLevel;
    private String education;
    private String skills;

    private String currency;
    private Integer minSalary;
    private Integer maxSalary;
    @Column(columnDefinition = "TEXT")
    private String benefits;

    private String workMode;
    private LocalDate deadline;
    private String status;
    @CreationTimestamp
    private LocalDateTime postedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
