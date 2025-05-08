package com.example.todo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoRequest {
  private String name;
  private String date;
}
