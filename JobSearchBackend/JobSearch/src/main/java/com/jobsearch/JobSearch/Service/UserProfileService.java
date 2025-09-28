package com.jobsearch.JobSearch.Service;

import com.jobsearch.JobSearch.Entity.UserEntity;
import com.jobsearch.JobSearch.Entity.UserProfile;
import com.jobsearch.JobSearch.Repository.UserProfileRepo;
import com.jobsearch.JobSearch.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    @Autowired
    UserProfileRepo userProfileRepo;

    @Autowired
    UserRepository userRepository;

    public UserProfile saveUserProfileDetails(UserProfile userProfile) {
        String userEmail= SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user=userRepository.findByEmail(userEmail);

        if(userProfileRepo.existsByUserId(user.getId()))
        {
            UserProfile existingProfile=userProfileRepo.findByUserId(user.getId());

            existingProfile.setUsername(userProfile.getUsername());
            existingProfile.setPhoneNumber(userProfile.getPhoneNumber());
            existingProfile.setBio(userProfile.getBio());
            existingProfile.setTitle(userProfile.getTitle());
            existingProfile.setAddress(userProfile.getAddress());
            existingProfile.setEmail(userProfile.getEmail());
            existingProfile.setExperience(userProfile.getExperience());

            user.setUsername(userProfile.getUsername());
            userRepository.save(user);
            return userProfileRepo.save(existingProfile);
        }

        userProfile.setUser(user);
        return userProfileRepo.save(userProfile);
    }

    public UserProfile getUserDetails() {
        String userEmail= SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user=userRepository.findByEmail(userEmail);

        if(userProfileRepo.existsByUserId(user.getId()))
        {
            return userProfileRepo.findByUserId(user.getId());
        }
        return null;
    }
}
