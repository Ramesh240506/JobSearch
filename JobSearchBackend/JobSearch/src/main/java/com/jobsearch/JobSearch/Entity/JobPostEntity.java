package com.jobsearch.JobSearch.Entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "jobpostings")
public class JobPostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    Basic Job Info
    private String jobTitle;
    private String companyName;
    private String jobLocation;
    private String jobType;

//       Job Description
    private String jobDescription;
    private String qualifications;
    private String requirements;

//    Exp & Ed
    private String experienceLevel;
    private String education;
    private String skills;

//  Compensation
    private String currency;
    private String minSalary;
    private String maxSalary;
    private String benefits;

    @CreationTimestamp
    private LocalDateTime postedAt;
}
