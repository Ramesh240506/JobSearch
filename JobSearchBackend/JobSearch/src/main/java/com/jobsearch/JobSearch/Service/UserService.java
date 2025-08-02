package com.jobsearch.JobSearch.Service;

import com.jobsearch.JobSearch.Entity.JobApplication;
import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import com.jobsearch.JobSearch.Repository.JobPostRepository;
import com.jobsearch.JobSearch.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JwtService jwtService;

    @Autowired
    JobPostRepository jobRepo;

    @Autowired
    UserRepository userRepository;
    public UserEntity registerUser(UserEntity user) {
        return userRepository.save(user);
    }

    public String verifyUser(UserEntity user) {
        Authentication authentication=authManager.authenticate(
                new UsernamePasswordAuthenticationToken
                        (user.getEmail(),user.getPassword())
        );

        if(authentication.isAuthenticated())
        {
            return jwtService.generateToken(user.getEmail());
        }
        return "Failed";
        }

    public List<JobPostEntity> getApplicantsData() {
        String email= SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user=userRepository.findByEmail(email);

        return jobRepo.findAllByUserId(user.getId());
    }

}

