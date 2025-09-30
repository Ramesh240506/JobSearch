package com.jobsearch.JobSearch.Service;

import com.jobsearch.JobSearch.Entity.PasswordReset;
import com.jobsearch.JobSearch.Entity.UserEntity;
import com.jobsearch.JobSearch.Repository.PasswordResetRepo;
import com.jobsearch.JobSearch.Repository.UserRepository;
import com.jobsearch.JobSearch.dto.ResetPwdRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PasswordResetService {

    @Autowired
    PasswordResetRepo passwordResetRepo;

    @Autowired
    JavaMailSender mailSender;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    public void generateAndSendOtp(String email) {

        UserEntity user=userRepository.findByEmail(email);
        if(user==null)
            return ;
        passwordResetRepo.deleteByEmail(email);
        String otp=String.valueOf((int)(Math.random()*900000)+100000);
        PasswordReset token=new PasswordReset();

        token.setEmail(email);
        token.setOtp(otp);
        token.setExpiry(LocalDateTime.now().plusMinutes(1));

        passwordResetRepo.save(token);

        SimpleMailMessage msg=new SimpleMailMessage();

        msg.setTo(email);
        msg.setSubject("Your Password Reset OTP");
        msg.setText("Use this OTP to reset your password: " + otp + "\n\nValid for 1 minute.");
        mailSender.send(msg);


    }

    public boolean validateOtp(String email, String otp) {
        PasswordReset credentials=passwordResetRepo.findByEmail(email);

        return credentials != null &&
                credentials.getOtp().equals(otp) &&
                credentials.getExpiry().isAfter(LocalDateTime.now());

    }

    public void resetPassword(ResetPwdRequest request) {
        UserEntity user=userRepository.findByEmail(request.getEmail());
        if(user==null)
            return ;

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}
