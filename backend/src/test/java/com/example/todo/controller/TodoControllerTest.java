package com.example.todo.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.repository.UserRepository;
import com.example.todo.service.JwtService;
import com.example.todo.service.TodoService;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(TodoController.class)
@ActiveProfiles("test")
class TodoControllerTest {
  @Autowired private MockMvc mockMvc;

  @MockitoBean private TodoService todoService;
  @MockitoBean private JwtService jwtService;
  @MockitoBean private UserRepository userRepository;

  private Todo todo1;
  private Todo todo2;

  @BeforeEach
  void setUp() {
    User user = new User();
    user.setId(1L);
    user.setEmail("test@example.com");

    // モックするTodoリスト
    todo1 = new Todo();
    todo1.setId(1L);
    todo1.setName("Task 1");

    todo2 = new Todo();
    todo2.setId(2L);
    todo2.setName("Task 2");

    // JwtAuthenticationFilter で注入されるはずの User を事前に SecurityContext に設定する
    UsernamePasswordAuthenticationToken auth =
        new UsernamePasswordAuthenticationToken(
            user, null, List.of(new SimpleGrantedAuthority("ROLE_USER")));
    SecurityContextHolder.getContext().setAuthentication(auth);
  }

  @Test
  void testGetTodos() throws Exception {
    List<Todo> mockTodos = Arrays.asList(todo1, todo2);

    // Service の振る舞いをモック
    when(todoService.getTodos(any(User.class))).thenReturn(mockTodos);

    // API呼び出しと検証
    mockMvc
        .perform(get("/todos"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(2))
        .andExpect(jsonPath("$[0].name").value("Task 1"))
        .andExpect(jsonPath("$[1].name").value("Task 2"));

    // getTodosが呼び出されたか確認
    verify(todoService).getTodos(any(User.class));
  }

  @Test
  void searchTodos() throws Exception {
    List<Todo> mockTodos = List.of(todo1, todo2);

    when(todoService.searchTodosByName(any(User.class), any(String.class))).thenReturn(mockTodos);

    mockMvc
        .perform(get("/todos/search").param("q", "Task"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(2))
        .andExpect(jsonPath("$[0].name").value("Task 1"))
        .andExpect(jsonPath("$[1].name").value("Task 2"));

    verify(todoService).searchTodosByName(any(User.class), any(String.class));
  }
}
