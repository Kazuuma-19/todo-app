package com.example.todo.controller;

import com.example.todo.dto.TodoCompletionRequest;
import com.example.todo.dto.TodoRequest;
import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.service.InboxService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/inbox")
@RestController
public class InboxController {
  private final InboxService inboxService;

  @GetMapping
  public List<Todo> getTodos(@AuthenticationPrincipal User user) {
    return inboxService.getTodos(user);
  }

  @PostMapping
  public void createTodo(@RequestBody TodoRequest request, @AuthenticationPrincipal User user) {
    inboxService.createTodo(request, user);
  }

  @PutMapping("/{id}")
  public void updateTodo(
      @PathVariable Long id, @RequestBody TodoRequest request, @AuthenticationPrincipal User user) {
    inboxService.updateTodo(id, request, user);
  }

  @PatchMapping("/{id}/completed")
  public void updateCompleted(
      @PathVariable Long id,
      @RequestBody TodoCompletionRequest request,
      @AuthenticationPrincipal User user) {
    inboxService.updateCompleted(id, request, user);
  }

  @DeleteMapping("/{id}")
  public void deleteTodo(@PathVariable Long id, @AuthenticationPrincipal User user) {
    inboxService.deleteTodo(id, user);
  }
}
