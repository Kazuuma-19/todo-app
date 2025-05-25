package com.example.todo.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.util.function.Function;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

/** JWTサービス. */
@Service
public class JwtService {
  @Value("${jwt.secret}")
  private String secretKey;

  @Value("${jwt.expiration-ms:86400000}") // 24時間 デフォルト値
  private long jwtExpirationMs;

  /**
   * シークレットキーを取得.
   *
   * @return シークレットキー
   */
  public SecretKey getSecretKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  /**
   * トークン生成.
   *
   * @param email メールアドレス
   * @return トークン
   */
  public String generateToken(String email) {
    return Jwts.builder()
        .subject(email)
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
        .signWith(getSecretKey())
        .compact();
  }

  /**
   * トークンからメールアドレスを抽出.
   *
   * @param token JWTトークン
   * @return メールアドレス
   */
  public String extractEmail(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  /**
   * トークンがユーザーに対応し、有効か判定.
   *
   * @param token JWTトークン
   * @param userDetails ユーザー詳細
   * @return 有効かどうか
   */
  public boolean isTokenValid(String token, UserDetails userDetails) {
    final String email = extractEmail(token);
    return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
  }

  /** トークンからPayloadを取得. */
  private Claims parseToken(String token) {
    return Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(token).getPayload();
  }

  /** Payloadからクレームの抽出（汎用）. */
  private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = parseToken(token);
    return claimsResolver.apply(claims);
  }

  /** トークンから有効期限を取得. */
  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  /**
   * トークンが期限切れかどうか.
   *
   * @param token JWTトークン
   * @return 期限切れなら true
   */
  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }
}
