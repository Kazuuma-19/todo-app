package com.example.todo.controller;

import com.example.todo.dto.TodoCompletionRequest;
import com.example.todo.dto.TodoRequest;
import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.service.TodoService;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** Todoコントローラー. */
@RequestMapping("/todos")
@RestController
public class TodoController {
  private final TodoService todoService;

  /**
   * constructor injection.
   *
   * @param todoService todoService
   */
  public TodoController(TodoService todoService) {
    this.todoService = todoService;
  }

  /**
   * タスク一覧取得.
   *
   * @param user ユーザー
   * @param keyword 検索キーワード
   * @return タスク一覧
   */
  @GetMapping
  public List<Todo> getTodos(
      @AuthenticationPrincipal User user,
      @RequestParam(value = "q", required = false) String keyword) {
    return todoService.getTodos(user, keyword);
  }

  /**
   * タスク作成.
   *
   * @param request タスクリクエスト
   * @param user ユーザー
   */
  @PostMapping
  public void createTodo(@RequestBody TodoRequest request, @AuthenticationPrincipal User user) {
    todoService.createTodo(request, user);
  }

  /**
   * タスク更新.
   *
   * @param id タスクID
   * @param request タスクリクエスト
   * @param user ユーザー
   */
  @PutMapping("/{id}")
  public void updateTodo(
      @PathVariable Long id, @RequestBody TodoRequest request, @AuthenticationPrincipal User user) {
    todoService.updateTodo(id, request, user);
  }

  /**
   * タスク完了更新.
   *
   * @param id タスクID
   * @param request タスクリクエスト
   * @param user ユーザー
   */
  @PatchMapping("/{id}/completed")
  public void updateCompleted(
      @PathVariable Long id,
      @RequestBody TodoCompletionRequest request,
      @AuthenticationPrincipal User user) {
    todoService.updateCompleted(id, request, user);
  }

  /**
   * タスク削除.
   *
   * @param id タスクID
   * @param user ユーザー
   */
  @DeleteMapping("/{id}")
  public void deleteTodo(@PathVariable Long id, @AuthenticationPrincipal User user) {
    todoService.deleteTodo(id, user);
  }
}
