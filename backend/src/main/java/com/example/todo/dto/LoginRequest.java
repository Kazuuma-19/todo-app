package com.example.todo.dto;

import lombok.*;

/** ログインリクエスト. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequest {
  private String email;
  private String password;
}
