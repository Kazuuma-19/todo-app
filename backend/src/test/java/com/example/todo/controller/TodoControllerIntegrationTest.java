package com.example.todo.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.repository.TodoRepository;
import com.example.todo.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@ActiveProfiles("test")
class TodoControllerIntegrationTest {

  @Container
  static PostgreSQLContainer<?> postgres =
      new PostgreSQLContainer<>("postgres:14")
          .withDatabaseName("testdb")
          .withUsername("testuser")
          .withPassword("testpass");

  @DynamicPropertySource
  static void configureProps(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  @Autowired private MockMvc mockMvc;
  @Autowired private TodoRepository todoRepository;
  @Autowired private UserRepository userRepository;

  private User authenticatedUser;
  private Todo todaysTask;
  private Todo yesterdaysTask;

  @BeforeEach
  void setup() {
    // Clean up the database before each test
    todoRepository.deleteAll();
    userRepository.deleteAll();

    // テスト用のユーザーを作成
    authenticatedUser =
        User.builder()
            .name("testUser")
            .email("test@example.com")
            .passwordHash("hashedPassword") // 実際にはハッシュ化されたパスワード
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();
    authenticatedUser = userRepository.save(authenticatedUser);

    // 今日のタスクを作成
    todaysTask =
        Todo.builder()
            .name("今日のタスク")
            .completed(false)
            .date(LocalDateTime.now()) // 今日の日付
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .user(authenticatedUser)
            .build();
    todoRepository.save(todaysTask);

    // 昨日（今日ではない）のタスクを作成
    yesterdaysTask =
        Todo.builder()
            .name("昨日のタスク")
            .completed(true)
            .date(LocalDateTime.now().minusDays(1)) // 昨日の日付
            .createdAt(LocalDateTime.now().minusDays(1))
            .updatedAt(LocalDateTime.now().minusDays(1))
            .user(authenticatedUser)
            .build();
    todoRepository.save(yesterdaysTask);

    // JwtAuthenticationFilterで注入されるはずのUserを事前にSecurityContextに設定する
    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
    securityContext.setAuthentication(
        new UsernamePasswordAuthenticationToken(authenticatedUser, null, List.of())); // 権限は空
    SecurityContextHolder.setContext(securityContext);
  }

  @Test
  void getOnlyTodaysTodo() throws Exception {
    mockMvc
        .perform(get("/todos"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(1)) // 今日のタスクのみ
        .andExpect(jsonPath("$[0].name").value(todaysTask.getName()));
  }
}
