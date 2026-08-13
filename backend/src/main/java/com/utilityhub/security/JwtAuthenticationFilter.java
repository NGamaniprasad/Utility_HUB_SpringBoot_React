


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
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // ==========================================
    // ADMIN JWT SECRET
    // ==========================================

    private static final String ADMIN_SECRET =
            "UtilityHubSecretKeyForJwtAuthentication2026";

    private final SecretKey adminSecretKey =
            Keys.hmacShaKeyFor(
                    ADMIN_SECRET.getBytes(StandardCharsets.UTF_8)
            );


    // ==========================================
    // USER JWT SECRET
    // ==========================================

    private static final String USER_SECRET =
            "UtilityHubUserSecretKeyForJwtAuthentication2026";

    private final SecretKey userSecretKey =
            Keys.hmacShaKeyFor(
                    USER_SECRET.getBytes(StandardCharsets.UTF_8)
            );


    // ==========================================
    // FILTER
    // ==========================================

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


        // ==========================================
        // FIRST: TRY USER JWT
        // ==========================================

        try {

            Claims claims = Jwts.parser()
                    .verifyWith(userSecretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();


            String userId =
                    claims.getSubject();

            String type =
                    claims.get("type", String.class);


            if ("USER".equalsIgnoreCase(type)
                    && userId != null) {

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
                        "========================================"
                );

                System.out.println(
                        "JWT TYPE: USER"
                );

                System.out.println(
                        "JWT USER ID: " + userId
                );

                System.out.println(
                        "SPRING AUTHORITY: " +
                        authentication.getAuthorities()
                );

                System.out.println(
                        "REQUEST: " +
                        request.getMethod() +
                        " " +
                        request.getRequestURI()
                );

                System.out.println(
                        "========================================"
                );


                filterChain.doFilter(request, response);
                return;
            }

        } catch (Exception ignored) {

            // Not a user token.
            // Try admin JWT below.

        }


        // ==========================================
        // SECOND: TRY ADMIN JWT
        // ==========================================

        try {

            Claims claims = Jwts.parser()
                    .verifyWith(adminSecretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();


            String adminId =
                    claims.getSubject();

            String role =
                    claims.get("role", String.class);


            System.out.println(
                    "========================================"
            );

            System.out.println(
                    "JWT TYPE: ADMIN"
            );

            System.out.println(
                    "JWT ADMIN ID: " + adminId
            );

            System.out.println(
                    "JWT ROLE: " + role
            );

            System.out.println(
                    "REQUEST: " +
                    request.getMethod() +
                    " " +
                    request.getRequestURI()
            );

            System.out.println(
                    "========================================"
            );


            if (adminId == null || role == null) {

                response.setStatus(
                        HttpServletResponse.SC_UNAUTHORIZED
                );

                response.setContentType(
                        "application/json"
                );

                response.getWriter().write(
                        "{\"message\":\"Invalid JWT: admin ID or role missing.\"}"
                );

                return;
            }


            String normalizedRole =
                    role.trim().toUpperCase();


            if (normalizedRole.startsWith("ROLE_")) {

                normalizedRole =
                        normalizedRole.substring(5);
            }


            String authorityName =
                    "ROLE_" + normalizedRole;


            var authority =
                    new SimpleGrantedAuthority(
                            authorityName
                    );


            var authentication =
                    new UsernamePasswordAuthenticationToken(
                            adminId,
                            null,
                            List.of(authority)
                    );


            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);


            System.out.println(
                    "SPRING AUTHORITY: " +
                    authentication.getAuthorities()
            );


            filterChain.doFilter(request, response);
            return;


        } catch (Exception e) {

            e.printStackTrace();

            SecurityContextHolder
                    .clearContext();


            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.setContentType(
                    "application/json"
            );

            response.getWriter().write(
                    "{\"message\":\"Invalid or expired token.\"}"
            );
            

        }
    }
}

