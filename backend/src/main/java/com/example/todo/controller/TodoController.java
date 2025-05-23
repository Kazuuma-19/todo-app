package com.example.todo.controller;

import com.example.todo.dto.TodoCompletionRequest;
import com.example.todo.dto.TodoRequest;
import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.service.TodoService;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/todos")
@RestController
public class TodoController {
  private final TodoService todoService;

  // constructor injection
  public TodoController(TodoService todoService) {
    this.todoService = todoService;
  }

  @GetMapping
  public List<Todo> getTodos(
      @AuthenticationPrincipal User user,
      @RequestParam(value = "q", required = false) String keyword) {
    return todoService.getTodos(user, keyword);
  }

  @PostMapping
  public void createTodo(@RequestBody TodoRequest request, @AuthenticationPrincipal User user) {
    todoService.createTodo(request, user);
  }

  @PutMapping("/{id}")
  public void updateTodo(
      @PathVariable Long id, @RequestBody TodoRequest request, @AuthenticationPrincipal User user) {
    todoService.updateTodo(id, request, user);
  }

  @PatchMapping("/{id}/completed")
  public void updateCompleted(
      @PathVariable Long id,
      @RequestBody TodoCompletionRequest request,
      @AuthenticationPrincipal User user) {
    todoService.updateCompleted(id, request, user);
  }

  @DeleteMapping("/{id}")
  public void deleteTodo(@PathVariable Long id, @AuthenticationPrincipal User user) {
    todoService.deleteTodo(id, user);
  }
}
