package com.example.todo.controller;

import com.example.todo.dto.LoginRequest;
import com.example.todo.dto.RegisterRequest;
import com.example.todo.model.User;
import com.example.todo.security.CustomUserDetails;
import com.example.todo.service.UserService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/** ユーザーコントローラー. */
@RequiredArgsConstructor
@RestController
public class UserController {
  private final UserService userService;

  /**
   * ユーザー情報取得.
   *
   * @param userDetails 認証ユーザー情報
   * @return ユーザー情報
   */
  @GetMapping("/me")
  public ResponseEntity<Map<String, Object>> getMe(
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    if (userDetails == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    User user = userDetails.user();

    Map<String, Object> userInfo = new HashMap<>();
    userInfo.put("id", user.getId());
    userInfo.put("name", user.getName());
    userInfo.put("email", user.getEmail());

    return ResponseEntity.ok(userInfo);
  }

  /**
   * ユーザー登録.
   *
   * @param request ユーザー登録リクエスト
   * @return ユーザー登録レスポンス
   */
  @PostMapping("/register")
  public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request) {
    try {
      userService.registerUser(request);
      return ResponseEntity.ok("ユーザーが作成されました。");
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  /**
   * ユーザーログイン.
   *
   * @param request ユーザーログインリクエスト
   * @return ユーザーログインレスポンス
   */
  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody LoginRequest request) {
    try {
      String token = userService.login(request);
      return ResponseEntity.ok(token);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
