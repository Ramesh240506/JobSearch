package com.jobsearch.JobSearch.Service;

import com.jobsearch.JobSearch.Entity.JobApplication;
import com.jobsearch.JobSearch.Entity.JobPostEntity;
import com.jobsearch.JobSearch.Entity.UserEntity;
import com.jobsearch.JobSearch.Entity.UserProfile;
import com.jobsearch.JobSearch.Repository.JobPostRepository;
import com.jobsearch.JobSearch.Repository.UserProfileRepo;
import com.jobsearch.JobSearch.Repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.naming.ldap.PagedResultsControl;
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

    @Autowired
    UserProfileRepo userProfileRepo;

    @Autowired
    EmailService emailService;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    public UserEntity registerUser(UserEntity user) throws MessagingException {
        if(userRepository.existsByEmail(user.getEmail()))
        {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Email already exists. Please login.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserEntity savedUser=userRepository.save(user);

        UserProfile userProfile=new UserProfile();
        userProfile.setUsername(user.getUsername());
        userProfile.setEmail(user.getEmail());
        userProfile.setUser(user);

        userProfileRepo.save(userProfile);
        emailService.sendRegistrationEmail(user.getEmail(), user.getUsername());
        return savedUser;
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

    public Page<JobPostEntity> getApplicantsData(int page,int size,String status,String keyword) {
        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user=userRepository.findByEmail(email);

        Pageable pageable= PageRequest.of(page,size);
        Page<JobPostEntity> postedJobs;

        boolean hasStatus = status != null && !status.isEmpty();
        boolean hasKeyword = keyword != null && !keyword.isEmpty();

        if (hasStatus && hasKeyword) {
            postedJobs = jobRepo.findByUserAndStatusAndKeyword(user, status, keyword, pageable);
        } else if (hasStatus) {
            postedJobs = jobRepo.findByUserAndStatus(user, status, pageable);
        } else if (hasKeyword) {
            postedJobs = jobRepo.searchJobs(user,keyword, pageable);
        } else {
            postedJobs = jobRepo.findByUser(user, pageable);
        }
        System.out.println(postedJobs);
        return postedJobs;
    }


    public UserEntity findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}

