package com.example.todo.dto;

import lombok.*;

/** タスク完了リクエスト. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoCompletionRequest {
  private Boolean completed;
}
