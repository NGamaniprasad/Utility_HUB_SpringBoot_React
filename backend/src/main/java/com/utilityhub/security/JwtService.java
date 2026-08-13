

package com.utilityhub.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET =
            "UtilityHubSecretKeyForJwtAuthentication2026";

    private final SecretKey secretKey =
            Keys.hmacShaKeyFor(
                    SECRET.getBytes(StandardCharsets.UTF_8)
            );

    private static final long EXPIRATION_TIME =
            1000 * 60 * 60; // 1 hour


    public String generateToken(
            String adminId,
            String role
    ) {

        Date now = new Date();

        Date expiration =
                new Date(
                        now.getTime() + EXPIRATION_TIME
                );

        // Normalize role before putting it into JWT
        String normalizedRole =
                role == null
                        ? ""
                        : role.trim()
                            .toUpperCase();

        if (normalizedRole.startsWith("ROLE_")) {
            normalizedRole =
                    normalizedRole.substring(5);
        }

        System.out.println(
                "GENERATING JWT -> Admin: "
                        + adminId
                        + " | Role: "
                        + normalizedRole
        );

        return Jwts.builder()
                .subject(adminId)
                .claim("role", normalizedRole)
                .issuedAt(now)
                .expiration(expiration)
                .signWith(secretKey)
                .compact();
    }
}