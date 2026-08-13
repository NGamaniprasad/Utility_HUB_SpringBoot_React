
package com.utilityhub.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class UserJwtService {

    private static final String SECRET =
            "UtilityHubUserSecretKeyForJwtAuthentication2026";

    private final SecretKey secretKey =
            Keys.hmacShaKeyFor(
                    SECRET.getBytes(StandardCharsets.UTF_8)
            );

    // Token validity: 24 hours
    private static final long EXPIRATION =
            24 * 60 * 60 * 1000L;


    public String generateToken(
            String userId,
            String email
    ) {

        Date now = new Date();

        Date expiration =
                new Date(
                        now.getTime() + EXPIRATION
                );

        return Jwts.builder()

                .subject(userId)

                .claim("email", email)

                .claim("type", "USER")

                .issuedAt(now)

                .expiration(expiration)

                .signWith(secretKey)

                .compact();
    }
}

