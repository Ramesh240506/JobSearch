package com.jobsearch.JobSearch.Controller;

import com.jobsearch.JobSearch.Entity.JobApplication;
import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import com.jobsearch.JobSearch.Service.EmailService;
import com.jobsearch.JobSearch.Service.UserService;
import com.jobsearch.JobSearch.dto.FeedBack;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class UserController {

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;

    @Autowired
    EmailService emailService;

    @PostMapping("/register")
    public UserEntity registerUser(@RequestBody UserEntity user) throws MessagingException {


        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public Map<String,String> loginUser(@RequestBody UserEntity user)
    {
        Map<String,String> response = new HashMap<>();

        UserEntity userData=userService.findUserByEmail(user.getEmail());

        response.put("accessToken",userService.verifyUser(user));
        response.put("role",userData.getRole());
        return response;
    }

    @GetMapping("/getapplicationsdata")
    public Page<JobPostEntity> getApplicantsData
            (@RequestParam int page, @RequestParam int size,
             @RequestParam String status,@RequestParam String keyword)
    {
        return userService.getApplicantsData(page, size, status, keyword);
    }

    @PostMapping("/contact")
    public void sendFeedBack(@RequestBody FeedBack feedBack)
    {
        emailService.sendFeedBack(feedBack);
    }

}
