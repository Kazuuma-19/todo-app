package com.example.todo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** タスク完了リクエスト. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoCompletionRequest {
  private Boolean completed;
}
