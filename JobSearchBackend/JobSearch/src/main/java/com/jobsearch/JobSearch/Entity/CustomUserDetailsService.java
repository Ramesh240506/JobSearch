package com.jobsearch.JobSearch.Entity;

import com.jobsearch.JobSearch.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user=userRepository.findByEmail(email);

        if(user==null)
        {
            throw new UsernameNotFoundException("User Not Found");
        }

        return new User(user.getEmail(),user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_"+user.getRole())));
    }
}
