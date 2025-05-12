package com.example.todo.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.todo.dto.TodoCompletionRequest;
import com.example.todo.dto.TodoRequest;
import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.repository.TodoRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

@ExtendWith(MockitoExtension.class)
class TodoServiceTest {

  @Mock private TodoRepository todoRepository;

  @InjectMocks private TodoService todoService;

  private User user;

  @BeforeEach
  void setup() {
    user = new User();
    user.setId(1L);
  }

  @Test
  void getTodos_returnsList() {
    LocalDateTime start = LocalDate.now().atStartOfDay();
    LocalDateTime end = start.plusDays(1);

    when(todoRepository.findAllByDateToday(eq(user), any(), any())).thenReturn(List.of(new Todo()));

    List<Todo> result = todoService.getTodos(user);

    assertThat(result).hasSize(1);
    verify(todoRepository).findAllByDateToday(eq(user), any(), any());
  }

  @Test
  void createTodo_savesNewTodo() {
    TodoRequest request = new TodoRequest();
    request.setName("Test Todo");
    request.setDate("2025-05-12T10:00:00");

    todoService.createTodo(request, user);

    ArgumentCaptor<Todo> captor = ArgumentCaptor.forClass(Todo.class);
    verify(todoRepository).save(captor.capture());

    Todo saved = captor.getValue();
    assertThat(saved.getName()).isEqualTo("Test Todo");
    assertThat(saved.getUser()).isEqualTo(user);
    assertThat(saved.getCompleted()).isFalse();
    assertThat(saved.getDate()).isEqualTo(LocalDateTime.parse("2025-05-12T10:00:00"));
  }

  @Test
  void updateTodo_updatesNameAndDate() {
    Todo existing = new Todo();
    existing.setId(1L);
    existing.setUser(user);

    when(todoRepository.findById(1L)).thenReturn(Optional.of(existing));

    TodoRequest request = new TodoRequest();
    request.setName("Updated Name");
    request.setDate("2025-05-12T12:00:00");

    todoService.updateTodo(1L, request, user);

    assertThat(existing.getName()).isEqualTo("Updated Name");
    assertThat(existing.getDate()).isEqualTo(LocalDateTime.parse("2025-05-12T12:00:00"));
    verify(todoRepository).save(existing);
  }

  @Test
  void updateCompleted_updatesStatus() {
    Todo existing = new Todo();
    existing.setId(1L);
    existing.setUser(user);

    when(todoRepository.findById(1L)).thenReturn(Optional.of(existing));

    TodoCompletionRequest request = new TodoCompletionRequest();
    request.setCompleted(true);

    todoService.updateCompleted(1L, request, user);

    assertThat(existing.getCompleted()).isTrue();
    verify(todoRepository).save(existing);
  }

  @Test
  void deleteTodo_deletesIfOwnerMatches() {
    Todo existing = new Todo();
    existing.setId(1L);
    existing.setUser(user);

    when(todoRepository.findById(1L)).thenReturn(Optional.of(existing));

    todoService.deleteTodo(1L, user);

    verify(todoRepository).delete(existing);
  }

  @Test
  void deleteTodo_throwsExceptionIfNotOwner() {
    User otherUser = new User();
    otherUser.setId(2L);

    Todo existing = new Todo();
    existing.setId(1L);
    existing.setUser(otherUser);

    when(todoRepository.findById(1L)).thenReturn(Optional.of(existing));

    assertThatThrownBy(() -> todoService.deleteTodo(1L, user))
        .isInstanceOf(ResponseStatusException.class)
        .hasMessageContaining("Not your todo");
  }
}
