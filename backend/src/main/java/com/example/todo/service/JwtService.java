package com.example.todo.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey;

    public String generateToken(String email) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", email);
        claims.put("iat", new Date()); // 発行時間

        return Jwts.builder()
                .claims(claims)
                .expiration(new Date(System.currentTimeMillis() + 3600_000)) // 1時間有効
                .signWith(key)
                .compact();
    }
}
