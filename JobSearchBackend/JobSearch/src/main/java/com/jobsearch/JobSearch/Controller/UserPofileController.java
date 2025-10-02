package com.jobsearch.JobSearch.Controller;

import com.jobsearch.JobSearch.Entity.UserProfile;
import com.jobsearch.JobSearch.Service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
public class UserPofileController {

    @Autowired
    UserProfileService userService;

    @PutMapping("/saveprofile")
    public UserProfile saveOrUpdateProfileDetails(@RequestBody UserProfile userProfile)
    {
        return userService.saveUserProfileDetails(userProfile);
    }

    @GetMapping("/fetchuserdetails")
    public UserProfile getUserDetails()
    {
        return userService.getUserDetails();
    }
}
