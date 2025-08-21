package com.jobsearch.JobSearch.Entity;

import jakarta.persistence.*;
import lombok.Data;

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




}
