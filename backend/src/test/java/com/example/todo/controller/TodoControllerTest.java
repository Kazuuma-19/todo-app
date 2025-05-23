package com.example.todo.controller;

import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
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
  private List<Todo> todoList;

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

    todoList = Arrays.asList(todo1, todo2);

    // JwtAuthenticationFilter で注入されるはずの User を事前に SecurityContext に設定する
    UsernamePasswordAuthenticationToken auth =
        new UsernamePasswordAuthenticationToken(
            user, null, List.of(new SimpleGrantedAuthority("ROLE_USER")));
    SecurityContextHolder.getContext().setAuthentication(auth);
  }

  /**
   * クエリパラメータを指定しない場合に正常に動作するか
   *
   * @throws Exception
   */
  @Test
  void testGetTodos() throws Exception {
    when(todoService.getTodos(any(User.class), nullable(String.class))).thenReturn(todoList);

    mockMvc
        .perform(get("/todos"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(2))
        .andExpect(jsonPath("$[0].name").value("Task 1"))
        .andExpect(jsonPath("$[1].name").value("Task 2"));

    verify(todoService).getTodos(any(User.class), nullable(String.class));
  }

  /**
   * クエリパラメータを指定した場合に正常に動作するか
   *
   * @throws Exception
   */
  @Test
  void testGetTodosWithKeyword() throws Exception {
    String keyword = "Task";

    when(todoService.getTodos(any(User.class), eq(keyword))).thenReturn(todoList);

    mockMvc
        .perform(get("/todos").param("q", keyword))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(2))
        .andExpect(jsonPath("$[0].name").value("Task 1"))
        .andExpect(jsonPath("$[1].name").value("Task 2"));

    verify(todoService).getTodos(any(User.class), eq(keyword));
  }
}
