package com.jobsearch.JobSearch.config;

import com.jobsearch.JobSearch.Entity.CustomUserDetailsService;
import com.jobsearch.JobSearch.Service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    JwtService jwtService;

    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();
        if (path.startsWith("/api/jobs/register") ||
                path.startsWith("/api/jobs/login") ||
                path.startsWith("/api/jobs/forgot-password") ||
                path.startsWith("/api/jobs/verify-otp") ||
                path.startsWith("/api/jobs/reset-password")) {
            filterChain.doFilter(request, response);
            return;
        }
        String authHeader=request.getHeader("Authorization");

        if(authHeader==null||!authHeader.startsWith("Bearer "))
        {
            filterChain.doFilter(request,response);
            return;
        }

        String token=authHeader.substring(7);

        if(!token.isEmpty()) {

            String email = jwtService.extractEmail(token);


            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

                if (jwtService.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null,
                                    userDetails.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
        }
            filterChain.doFilter(request,response);
    }
}
