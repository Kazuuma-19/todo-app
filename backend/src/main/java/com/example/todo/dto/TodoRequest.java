package com.example.todo.dto;

import lombok.*;

/** タスクリクエスト. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoRequest {
  private String name;
  private String date;
}
