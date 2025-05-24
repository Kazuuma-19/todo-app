package com.example.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/** アプリケーションクラス. */
@SpringBootApplication
public class TodoAppApplication {
  /**
   * アプリケーションを起動する.
   *
   * @param args 引数
   */
  public static void main(String[] args) {
    SpringApplication.run(TodoAppApplication.class, args);
  }
}
