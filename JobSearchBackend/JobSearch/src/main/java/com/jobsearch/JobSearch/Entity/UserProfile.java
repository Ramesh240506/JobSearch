package com.jobsearch.JobSearch.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String phoneNumber;
    private String address;
    private String title;
    private String experience;
    private String bio;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

}
