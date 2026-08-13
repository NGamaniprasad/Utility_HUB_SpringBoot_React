
package com.utilityhub.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class UserJwtAuthenticationFilter
        extends OncePerRequestFilter {

    private static final String SECRET =
            "UtilityHubUserSecretKeyForJwtAuthentication2026";

    private final SecretKey secretKey =
            Keys.hmacShaKeyFor(
                    SECRET.getBytes(StandardCharsets.UTF_8)
            );


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authorizationHeader =
                request.getHeader("Authorization");


        // ==========================================
        // NO TOKEN
        // ==========================================

        if (authorizationHeader == null ||
                !authorizationHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }


        String token =
                authorizationHeader.substring(7);


        try {

            Claims claims =
                    Jwts.parser()
                            .verifyWith(secretKey)
                            .build()
                            .parseSignedClaims(token)
                            .getPayload();


            String userId =
                    claims.getSubject();

            String type =
                    claims.get("type", String.class);


            // ==========================================
            // VALIDATE USER TOKEN
            // ==========================================

            if (userId == null ||
                    type == null ||
                    !"USER".equalsIgnoreCase(type)) {

                filterChain.doFilter(request, response);
                return;
            }


            // ==========================================
            // CREATE USER AUTHENTICATION
            // ==========================================

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            userId,
                            null,
                            List.of(
                                    new SimpleGrantedAuthority(
                                            "ROLE_USER"
                                    )
                            )
                    );


            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);


            System.out.println(
                    "USER JWT AUTHENTICATED: " + userId
            );


        } catch (Exception e) {

            System.out.println(
                    "USER JWT INVALID: " +
                    e.getMessage()
            );

        }


        filterChain.doFilter(request, response);
    }
}

