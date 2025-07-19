package com.jobsearch.JobSearch.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "job_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String position;
    private String department;
    private String salary;
    private String startDate;
    private String experience;
    private String education;

    @Column(length = 1000)
    private String skills;

    @Column(length = 2000)
    private String coverLetter;

    @Lob
    private byte[] resume;

    private String availability;
    private String referenceName;
    private String referenceEmail;
    private String referencePhone;
    private String linkedin;
    private String portfolio;
    private String workAuthorization;
    private boolean willingToRelocate;
    private boolean agreeToTerms;
}
