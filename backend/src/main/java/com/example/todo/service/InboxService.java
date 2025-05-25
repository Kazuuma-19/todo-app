package com.example.todo.service;

import com.example.todo.dto.TodoCompletionRequest;
import com.example.todo.dto.TodoRequest;
import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.repository.TodoRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/** Inboxサービス. */
@RequiredArgsConstructor
@Service
public class InboxService {
  private final TodoRepository todoRepository;

  /**
   * タスクを取得し、所有者を確認.
   *
   * @param id タスクID
   * @param user ユーザー
   * @return タスク
   */
  private Todo findAndCheckOwner(Long id, User user) {
    Todo todo =
        todoRepository
            .findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));

    if (!todo.getUser().getId().equals(user.getId())) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not your todo");
    }

    return todo;
  }

  /**
   * タスク一覧取得.
   *
   * @param user ユーザー
   * @return タスク一覧
   */
  public List<Todo> getTodos(User user, String keyword) {
    if (keyword == null || keyword.isBlank()) {
      return todoRepository.findByUserOrderByCompletedAscDateAsc(user);
    }
    return todoRepository.findByUserAndNameContainingIgnoreCase(user, keyword);
  }

  /**
   * タスク作成.
   *
   * @param request タスクリクエスト
   * @param user ユーザー
   */
  public void createTodo(TodoRequest request, User user) {
    Todo todo = new Todo();
    todo.setName(request.getName());
    todo.setCompleted(false);
    if (request.getDate() != null) {
      todo.setDate(LocalDateTime.parse(request.getDate()));
    }
    todo.setUser(user);
    todoRepository.save(todo);
  }

  /**
   * タスク更新.
   *
   * @param id タスクID
   * @param request タスクリクエスト
   * @param user ユーザー
   */
  public void updateTodo(Long id, TodoRequest request, User user) {
    Todo existingTodo = findAndCheckOwner(id, user);

    existingTodo.setName(request.getName());
    if (request.getDate() != null) {
      existingTodo.setDate(LocalDateTime.parse(request.getDate()));
    }

    todoRepository.save(existingTodo);
  }

  /**
   * タスク完了更新.
   *
   * @param id タスクID
   * @param request タスクリクエスト
   * @param user ユーザー
   */
  public void updateCompleted(Long id, TodoCompletionRequest request, User user) {
    Todo existingTodo = findAndCheckOwner(id, user);
    existingTodo.setCompleted(request.getCompleted());
    todoRepository.save(existingTodo);
  }

  /**
   * タスク削除.
   *
   * @param id タスクID
   * @param user ユーザー
   */
  public void deleteTodo(Long id, User user) {
    Todo existingTodo = findAndCheckOwner(id, user);
    todoRepository.delete(existingTodo);
  }
}
