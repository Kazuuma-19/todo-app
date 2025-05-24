package com.example.todo.dto;

import lombok.*;

/** ユーザー登録リクエスト. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
  private String name;
  private String email;
  private String password;
}
