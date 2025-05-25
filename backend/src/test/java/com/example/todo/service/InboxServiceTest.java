package com.example.todo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.repository.TodoRepository;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class InboxServiceTest {
  @Mock private TodoRepository todoRepository;
  @InjectMocks private InboxService inboxService;

  private String blankKeyword;
  private String nullKeyword;
  private String keyword;

  @BeforeEach
  void setup() {
    blankKeyword = " ";
    nullKeyword = null;
    keyword = "test";
  }

  @Test
  void todoRepositoryが呼ばれ正しく値が返却されるかをテスト() {
    Todo todo = new Todo();
    todo.setId(1L);
    todo.setName("Test Todo");

    when(todoRepository.findByUserOrderByCompletedAscDateAsc(any(User.class)))
        .thenReturn(List.of(todo));

    List<Todo> getAllTodo = inboxService.getTodos(new User(), blankKeyword);

    assertThat(getAllTodo.getFirst().getId()).isEqualTo(1L);
    assertThat(getAllTodo.getFirst().getName()).isEqualTo("Test Todo");
  }

  @Test
  void keywordの有無によって呼ばれるメソッドが変更されるかをテスト() {
    User user = User.builder().id(1L).email("test@example.com").build();

    inboxService.getTodos(user, blankKeyword);
    inboxService.getTodos(user, nullKeyword);
    inboxService.getTodos(user, keyword);

    verify(todoRepository, times(2)).findByUserOrderByCompletedAscDateAsc(any(User.class));
    verify(todoRepository, times(1))
        .findByUserAndNameContainingIgnoreCase(any(User.class), any(String.class));
  }
}
