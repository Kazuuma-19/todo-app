package com.example.todo.controller;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.nullable;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.repository.UserRepository;
import com.example.todo.security.CustomUserDetails;
import com.example.todo.service.CustomUserDetailsService;
import com.example.todo.service.InboxService;
import com.example.todo.service.JwtService;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(InboxController.class)
class InboxControllerTest {
  @Autowired private MockMvc mockMvc;

  @MockitoBean private InboxService inboxService;
  @MockitoBean private JwtService jwtService;
  @MockitoBean private UserRepository userRepository;
  @MockitoBean private CustomUserDetailsService customUserDetailsService;

  @BeforeEach
  void setUp() {
    User user = User.builder().id(1L).email("test@test.com").passwordHash("test").build();
    CustomUserDetails userDetails = new CustomUserDetails(user);
    // ユーザー情報をセキュリティコンテキストにセットし、擬似的に認証状態を作成
    UsernamePasswordAuthenticationToken auth =
        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    SecurityContextHolder.getContext().setAuthentication(auth);
  }

  @Test
  void todoServiceからタスクを取得できるかをテスト() throws Exception {
    Todo todo1 = Todo.builder().id(1L).name("Task 1").build();
    Todo todo2 = Todo.builder().id(2L).name("Task 2").build();
    List<Todo> todos = List.of(todo1, todo2);

    when(inboxService.getTodos(any(User.class), nullable(String.class))).thenReturn(todos);

    mockMvc
        .perform(get("/inbox"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(2))
        .andExpect(jsonPath("$[0].name").value("Task 1"))
        .andExpect(jsonPath("$[1].name").value("Task 2"));
  }
}
