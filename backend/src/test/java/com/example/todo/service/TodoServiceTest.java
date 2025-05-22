package com.example.todo.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.todo.dto.TodoCompletionRequest;
import com.example.todo.dto.TodoRequest;
import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.repository.TodoRepository;
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
  private Todo todo;

  @BeforeEach
  void setup() {
    user = new User();
    user.setId(1L);

    todo = new Todo();
    todo.setId(1L);
    todo.setCompleted(false);
    todo.setName("Test Todo");
    todo.setDate(LocalDateTime.now());
    todo.setUser(user);
  }

  @Test
  void createTodo_savesNewTodo() {
    TodoRequest request = new TodoRequest();
    String date = "2025-05-12T10:00:00";
    request.setName("Test Todo");
    request.setDate(date);

    todoService.createTodo(request, user);

    ArgumentCaptor<Todo> captor = ArgumentCaptor.forClass(Todo.class);
    verify(todoRepository).save(captor.capture());

    Todo saved = captor.getValue();
    assertThat(saved.getName()).isEqualTo("Test Todo");
    assertThat(saved.getUser()).isEqualTo(user);
    assertThat(saved.getCompleted()).isFalse();
    assertThat(saved.getDate()).isEqualTo(LocalDateTime.parse(date));
  }

  @Test
  void createTodo_savesNewTodoWithoutDate() {
    TodoRequest request = new TodoRequest();
    request.setName("Test Todo");

    todoService.createTodo(request, user);

    ArgumentCaptor<Todo> captor = ArgumentCaptor.forClass(Todo.class);
    verify(todoRepository).save(captor.capture());

    Todo saved = captor.getValue();
    assertThat(saved.getName()).isEqualTo("Test Todo");
    assertThat(saved.getUser()).isEqualTo(user);
    assertThat(saved.getCompleted()).isFalse();
    assertThat(saved.getDate()).isNull();
  }

  @Test
  void updateTodo_updatesNameAndDate() {
    Long checkId = 1L;
    Todo existing = new Todo();
    existing.setId(checkId);
    existing.setUser(user);

    when(todoRepository.findById(checkId)).thenReturn(Optional.of(existing));

    TodoRequest request = new TodoRequest();
    String name = "Updated Name";
    String date = "2025-05-12T12:00:00";
    request.setName(name);
    request.setDate(date);

    todoService.updateTodo(checkId, request, user);

    assertThat(existing.getName()).isEqualTo(name);
    assertThat(existing.getDate()).isEqualTo(LocalDateTime.parse(date));
    verify(todoRepository).save(existing);
  }

  @Test
  void updateTodo_throwsExceptionIfNotOwner() {
    Long checkId = 1L;
    Todo existing = new Todo();
    existing.setId(checkId);
    existing.setUser(user);

    when(todoRepository.findById(checkId)).thenReturn(Optional.of(existing));

    TodoRequest request = new TodoRequest();
    request.setName("Updated Name");
    request.setDate("2025-05-12T12:00:00");

    User notOwner = new User();
    notOwner.setId(2L);

    assertThatThrownBy(() -> todoService.updateTodo(checkId, request, notOwner))
        .isInstanceOf(ResponseStatusException.class);
  }

  @Test
  void updateCompleted_updatesStatus() {
    Long checkId = 1L;
    Todo existingTodo = new Todo();
    existingTodo.setId(checkId);
    existingTodo.setUser(user);

    when(todoRepository.findById(checkId)).thenReturn(Optional.of(existingTodo));

    TodoCompletionRequest request = new TodoCompletionRequest();
    request.setCompleted(true);

    todoService.updateCompleted(checkId, request, user);

    assertThat(existingTodo.getCompleted()).isTrue();
    verify(todoRepository).save(existingTodo);
  }

  @Test
  void deleteTodo_deletesIfOwnerMatches() {
    Todo existingTodo = new Todo();
    existingTodo.setId(1L);
    existingTodo.setUser(user);

    when(todoRepository.findById(1L)).thenReturn(Optional.of(existingTodo));

    todoService.deleteTodo(1L, user);

    verify(todoRepository).delete(existingTodo);
  }

  @Test
  void deleteTodo_throwsExceptionIfNotOwner() {
    Long deleteId = 1L;
    Todo existing = new Todo();
    existing.setId(deleteId);
    existing.setUser(user);

    when(todoRepository.findById(deleteId)).thenReturn(Optional.of(existing));

    User notOwner = new User();
    notOwner.setId(2L);

    assertThatThrownBy(() -> todoService.deleteTodo(deleteId, notOwner))
        .isInstanceOf(ResponseStatusException.class);
  }

  @Test
  void searchTodoByName_returnsMatchingTodos() {
    String keyword = "test";
    List<Todo> todos = List.of(this.todo, new Todo());
    when(todoRepository.findByUserAndNameContainingIgnoreCase(this.user, keyword))
        .thenReturn(todos);

    assertThat(todoService.searchTodosByName(this.user, keyword)).isEqualTo(todos);
  }
}
