package com.jobsearch.JobSearch.Controller;

import com.jobsearch.JobSearch.Entity.JobApplication;
import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import com.jobsearch.JobSearch.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin("*")
public class UserController {

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public UserEntity registerUser(@RequestBody UserEntity user)
    {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public Map<String,String> loginUser(@RequestBody UserEntity user)
    {
        Map<String,String> response = new HashMap<>();

        response.put("accessToken",userService.verifyUser(user));

        return response;
    }

    @GetMapping("/getapplicationsdata")
    public List<JobPostEntity> getApplicantsData()
    {
        return userService.getApplicantsData();
    }

}
