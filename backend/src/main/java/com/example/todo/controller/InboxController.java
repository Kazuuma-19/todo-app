package com.example.todo.controller;

import com.example.todo.dto.TodoCompletionRequest;
import com.example.todo.dto.TodoRequest;
import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.service.InboxService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Inboxコントローラー. */
@RequiredArgsConstructor
@RequestMapping("/inbox")
@RestController
public class InboxController {
  private final InboxService inboxService;

  /**
   * タスク一覧取得.
   *
   * @param user ユーザー
   * @return タスク一覧
   */
  @GetMapping
  public List<Todo> getTodos(@AuthenticationPrincipal User user) {
    return inboxService.getTodos(user);
  }

  /**
   * タスク作成.
   *
   * @param request タスクリクエスト
   * @param user ユーザー
   */
  @PostMapping
  public void createTodo(@RequestBody TodoRequest request, @AuthenticationPrincipal User user) {
    inboxService.createTodo(request, user);
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
    inboxService.updateTodo(id, request, user);
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
    inboxService.updateCompleted(id, request, user);
  }

  /**
   * タスク削除.
   *
   * @param id タスクID
   * @param user ユーザー
   */
  @DeleteMapping("/{id}")
  public void deleteTodo(@PathVariable Long id, @AuthenticationPrincipal User user) {
    inboxService.deleteTodo(id, user);
  }
}
