//
//
//
//package com.utilityhub.config;
//
//import com.utilityhub.security.JwtAuthenticationFilter;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import org.springframework.http.HttpMethod;
//
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.List;
//
//@Configuration
//public class SecurityConfig {
//
//    private final JwtAuthenticationFilter jwtAuthenticationFilter;
//
//
//    public SecurityConfig(
//            JwtAuthenticationFilter jwtAuthenticationFilter
//    ) {
//
//        this.jwtAuthenticationFilter =
//                jwtAuthenticationFilter;
//    }
//
//
//    // =========================================================
//    // PASSWORD ENCODER
//    // =========================================================
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//
//        return new BCryptPasswordEncoder();
//    }
//
//
//    // =========================================================
//    // CORS
//    // =========================================================
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//
//        CorsConfiguration configuration =
//                new CorsConfiguration();
//
//        configuration.setAllowedOrigins(
//                List.of(
//                        "http://localhost:5173"
//                )
//        );
//
//        configuration.setAllowedMethods(
//                List.of(
//                        "GET",
//                        "POST",
//                        "PUT",
//                        "PATCH",
//                        "DELETE",
//                        "OPTIONS"
//                )
//        );
//
//        configuration.setAllowedHeaders(
//                List.of(
//                        "Authorization",
//                        "Content-Type",
//                        "Accept"
//                )
//        );
//
//        configuration.setAllowCredentials(false);
//
//
//        UrlBasedCorsConfigurationSource source =
//                new UrlBasedCorsConfigurationSource();
//
//        source.registerCorsConfiguration(
//                "/**",
//                configuration
//        );
//
//        return source;
//    }
//
//
//    // =========================================================
//    // SECURITY
//    // =========================================================
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(
//            HttpSecurity http
//    ) throws Exception {
//
//        http
//
//                // =================================================
//                // CORS
//                // =================================================
//
//                .cors(cors ->
//                        cors.configurationSource(
//                                corsConfigurationSource()
//                        )
//                )
//
//
//                // =================================================
//                // CSRF
//                // =================================================
//
//                .csrf(csrf ->
//                        csrf.disable()
//                )
//
//
//                // =================================================
//                // STATELESS JWT
//                // =================================================
//
//                .sessionManagement(session ->
//                        session.sessionCreationPolicy(
//                                SessionCreationPolicy.STATELESS
//                        )
//                )
//
//
//                // =================================================
//                // AUTHORIZATION
//                // =================================================
//
//                .authorizeHttpRequests(auth -> auth
//
//
//                        // -----------------------------------------
//                        // CORS PREFLIGHT
//                        // -----------------------------------------
//
//                        .requestMatchers(
//                                HttpMethod.OPTIONS,
//                                "/**"
//                        ).permitAll()
//
//
//                        // -----------------------------------------
//                        // PUBLIC USER AUTH
//                        // -----------------------------------------
//
//                        .requestMatchers(
//                                HttpMethod.POST,
//                                "/api/users/register",
//                                "/api/users/login"
//                        ).permitAll()
//
//
//                        // -----------------------------------------
//                        // USER PROFILE
//                        // -----------------------------------------
//
//                        .requestMatchers(
//                                HttpMethod.GET,
//                                "/api/users/profile"
//                        ).hasRole("USER")
//
//                        .requestMatchers(
//                                HttpMethod.PUT,
//                                "/api/users/profile"
//                        ).hasRole("USER")
//
//
//                        // -----------------------------------------
//                        // USER PASSWORD
//                        // -----------------------------------------
//
//                        .requestMatchers(
//                                HttpMethod.PUT,
//                                "/api/users/change-password"
//                        ).hasRole("USER")
//
//
//                        // -----------------------------------------
//                        // PUBLIC ADMIN AUTH
//                        // -----------------------------------------
//
//                        .requestMatchers(
//                                "/api/admin/setup",
//                                "/api/admin/login"
//                        ).permitAll()
//
//
//                        // =================================================
//                        // ADMIN USER MANAGEMENT
//                        // IMPORTANT: BEFORE /api/admin/**
//                        // =================================================
//
//                        .requestMatchers(
//                                "/api/admin/users",
//                                "/api/admin/users/**"
//                        ).hasAnyRole(
//                                "ADMIN",
//                                "SUPER_ADMIN"
//                        )
//
//
//                        // =================================================
//                        // SUPER ADMIN ONLY
//                        // =================================================
//
//                        .requestMatchers(
//                                HttpMethod.POST,
//                                "/api/admin/create"
//                        ).hasRole("SUPER_ADMIN")
//
//
//                        .requestMatchers(
//                                HttpMethod.GET,
//                                "/api/admin/all"
//                        ).hasRole("SUPER_ADMIN")
//
//
//                        .requestMatchers(
//                                HttpMethod.PUT,
//                                "/api/admin/**"
//                        ).hasRole("SUPER_ADMIN")
//
//
//                        .requestMatchers(
//                                HttpMethod.DELETE,
//                                "/api/admin/**"
//                        ).hasRole("SUPER_ADMIN")
//
//
//                        // -----------------------------------------
//                        // EVERYTHING ELSE
//                        // -----------------------------------------
//
//                        .anyRequest()
//                        .authenticated()
//                )
//
//
//                // =================================================
//                // JWT FILTER
//                // =================================================
//
//                .addFilterBefore(
//                        jwtAuthenticationFilter,
//                        UsernamePasswordAuthenticationFilter.class
//                );
//
//
//        return http.build();
//    }
//}
//

package com.utilityhub.config;

import com.utilityhub.security.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;


    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;
    }


    // =========================================================
    // PASSWORD ENCODER
    // =========================================================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }


    // =========================================================
    // CORS
    // =========================================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:5173"
                )
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type",
                        "Accept"
                )
        );

        configuration.setAllowCredentials(false);


        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }


    // =========================================================
    // SECURITY
    // =========================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // =================================================
                // CORS
                // =================================================

                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )


                // =================================================
                // CSRF
                // =================================================

                .csrf(csrf ->
                        csrf.disable()
                )


                // =================================================
                // STATELESS JWT
                // =================================================

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                // =================================================
                // AUTHORIZATION
                // =================================================

                .authorizeHttpRequests(auth -> auth


                        // =================================================
                        // CORS PREFLIGHT
                        // =================================================

                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()


                        // =================================================
                        // PUBLIC USER AUTH
                        // =================================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/users/register",
                                "/api/users/login"
                        ).permitAll()


                        // =================================================
                        // USER PROFILE
                        // =================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/users/profile"
                        ).hasRole("USER")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/users/profile"
                        ).hasRole("USER")


                        // =================================================
                        // USER PASSWORD
                        // =================================================

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/users/change-password"
                        ).hasRole("USER")


                        // =================================================
                        // USER TOOLS
                        //
                        // Logged-in USER can see active tools.
                        // =================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/tools"
                        ).hasAnyRole(
                                "USER",
                                "ADMIN",
                                "SUPER_ADMIN"
                        )


                        // =================================================
                        // PUBLIC ADMIN AUTH
                        // =================================================

                        .requestMatchers(
                                "/api/admin/setup",
                                "/api/admin/login"
                        ).permitAll()


                        // =================================================
                        // ADMIN USER MANAGEMENT
                        // =================================================

                        .requestMatchers(
                                "/api/admin/users",
                                "/api/admin/users/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )


                        // =================================================
                        // ADMIN TOOL MANAGEMENT
                        // =================================================

                        .requestMatchers(
                                "/api/admin/tools",
                                "/api/admin/tools/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )


                        // =================================================
                        // SUPER ADMIN - CREATE ADMIN
                        // =================================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/admin/create"
                        ).hasRole("SUPER_ADMIN")


                        // =================================================
                        // SUPER ADMIN - GET ALL ADMINS
                        // =================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/admin/all"
                        ).hasRole("SUPER_ADMIN")


                        // =================================================
                        // SUPER ADMIN - UPDATE ADMIN
                        // =================================================

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/admin/{adminId}"
                        ).hasRole("SUPER_ADMIN")


                        // =================================================
                        // SUPER ADMIN - DELETE ADMIN
                        // =================================================

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/admin/{adminId}"
                        ).hasRole("SUPER_ADMIN")


                        // =================================================
                        // EVERYTHING ELSE
                        // =================================================

                        .anyRequest()
                        .authenticated()
                )


                // =================================================
                // JWT FILTER
                // =================================================

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();
    }
}
