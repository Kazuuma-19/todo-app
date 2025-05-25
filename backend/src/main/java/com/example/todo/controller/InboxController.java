package com.example.todo.controller;

import com.example.todo.dto.TodoCompletionRequest;
import com.example.todo.dto.TodoRequest;
import com.example.todo.model.Todo;
import com.example.todo.security.CustomUserDetails;
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
import org.springframework.web.bind.annotation.RequestParam;
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
   * @param userDetails 認証ユーザー情報
   * @return タスク一覧
   */
  @GetMapping
  public List<Todo> getTodos(
      @AuthenticationPrincipal CustomUserDetails userDetails,
      @RequestParam(value = "q", required = false) String keyword) {
    return inboxService.getTodos(userDetails.getUser(), keyword);
  }

  /**
   * タスク作成.
   *
   * @param request タスクリクエスト
   * @param userDetails 認証ユーザー情報
   */
  @PostMapping
  public void createTodo(
      @RequestBody TodoRequest request, @AuthenticationPrincipal CustomUserDetails userDetails) {
    inboxService.createTodo(request, userDetails.getUser());
  }

  /**
   * タスク更新.
   *
   * @param id タスクID
   * @param request タスクリクエスト
   * @param userDetails 認証ユーザー情報
   */
  @PutMapping("/{id}")
  public void updateTodo(
      @PathVariable Long id,
      @RequestBody TodoRequest request,
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    inboxService.updateTodo(id, request, userDetails.getUser());
  }

  /**
   * タスク完了更新.
   *
   * @param id タスクID
   * @param request タスクリクエスト
   * @param userDetails 認証ユーザー情報
   */
  @PatchMapping("/{id}/completed")
  public void updateCompleted(
      @PathVariable Long id,
      @RequestBody TodoCompletionRequest request,
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    inboxService.updateCompleted(id, request, userDetails.getUser());
  }

  /**
   * タスク削除.
   *
   * @param id タスクID
   * @param userDetails 認証ユーザー情報
   */
  @DeleteMapping("/{id}")
  public void deleteTodo(
      @PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
    inboxService.deleteTodo(id, userDetails.getUser());
  }
}
