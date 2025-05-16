package com.example.todo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoCompletionRequest {
  private Boolean completed;
}
