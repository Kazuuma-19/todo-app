package com.example.todo.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/** JWTサービス. */
@Service
public class JwtService {
  @Value("${jwt.secret}")
  private String secretKey;

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
    SecretKey key = getSecretKey();
    return Jwts.builder().subject(email).issuedAt(new Date()).signWith(key).compact();
  }

  /**
   * トークンからメールアドレスを抽出.
   *
   * @param token トークン
   * @return メールアドレス
   */
  public String extractEmail(String token) {
    SecretKey key = getSecretKey();
    return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject();
  }
}
