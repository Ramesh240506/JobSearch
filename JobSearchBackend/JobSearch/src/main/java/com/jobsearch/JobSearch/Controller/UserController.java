package com.jobsearch.JobSearch.Controller;

import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import com.jobsearch.JobSearch.Service.EmailService;
import com.jobsearch.JobSearch.Service.UserService;
import com.jobsearch.JobSearch.dto.FeedBack;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public ResponseEntity<?> registerUser(@RequestBody UserEntity user) {
        try {
            UserEntity savedUser = userService.registerUser(user);
            return ResponseEntity.ok(Map.of(
                    "message", "Registration successful!",
                    "userId", savedUser.getId()
            ));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(Map.of(
                    "message", e.getReason()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "message", "Something went wrong"
            ));
        }
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
