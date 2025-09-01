package com.jgc.trading.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for frontend testing
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**", "/api/health").permitAll() // allow auth and health endpoints
                .anyRequest().authenticated()
            );

        return http.build();
    }
}
