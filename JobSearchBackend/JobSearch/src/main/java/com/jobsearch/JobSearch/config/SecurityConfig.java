    package com.jobsearch.JobSearch.config;

    import com.jobsearch.JobSearch.Entity.CustomUserDetailsService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
    import org.springframework.security.config.Customizer;
    import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.config.http.SessionCreationPolicy;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

    @Configuration
    @EnableWebSecurity
    public class SecurityConfig {

        @Autowired
        JwtFilter jwtFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http.authorizeHttpRequests(
                    authz->
                authz.requestMatchers("/api/jobs/register", "/api/jobs/login")
                        .permitAll()
                        .requestMatchers("/api/jobs/postapplication").hasRole("SEEKER")
                        .requestMatchers("/api/jobs/jobpost").hasRole("POSTER")
                            .anyRequest().authenticated()
            );
            http.httpBasic(Customizer.withDefaults());
            http.csrf(customizer->customizer.disable());
            http.sessionManagement(session->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
            http.cors(Customizer.withDefaults());
            http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
            return http.build();
        }
        @Bean
        public UserDetailsService userDetails()
        {
            return new CustomUserDetailsService();
        }

        @Bean
        public DaoAuthenticationProvider authenticationProvider()
        {
            DaoAuthenticationProvider authProvider=new DaoAuthenticationProvider();
            authProvider.setUserDetailsService(userDetails());
            authProvider.setPasswordEncoder(passwordEncoder());
            return authProvider;
        }

        @Bean
        public AuthenticationManager authManger(AuthenticationConfiguration config) throws Exception {
            return config.getAuthenticationManager();
        }

        @Bean
        public BCryptPasswordEncoder passwordEncoder()
        {
            return new BCryptPasswordEncoder();
        }
    }
