package com.jobsearch.JobSearch.Service;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtService {

    @Value("${jwt.secret}")
    private String SECRET_KEY_STRING;

    public String generateToken(String email)
    {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+1000*60*60*24))
                .signWith(getSignKey())
                .compact();
    }

    private SecretKey getSignKey()
    {
        byte []keyBytes= Decoders.BASE64.decode(SECRET_KEY_STRING);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractEmail(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        return extractEmail(token).equals(userDetails.getUsername());
    }
}
