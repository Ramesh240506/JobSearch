package com.jobsearch.JobSearch.Controller;

import com.jobsearch.JobSearch.Service.PasswordResetService;
import com.jobsearch.JobSearch.dto.ResetPwdRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestParam String email)
    {
        passwordResetService.generateAndSendOtp(email);
    }

    @PostMapping("/verify-otp")
    public Boolean veifyOtp(@RequestParam String email,@RequestParam String otp)
    {
        boolean valid=passwordResetService.validateOtp(email,otp);
        return valid;
    }

    @PostMapping("/reset-password")
    public void resetPassword(@RequestBody ResetPwdRequest request)
    {
        passwordResetService.resetPassword(request);
    }
}
