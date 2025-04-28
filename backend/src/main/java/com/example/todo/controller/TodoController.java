package com.example.todo.controller;

import com.example.todo.dto.TodoCompletionRequest;
import com.example.todo.dto.TodoRequest;
import com.example.todo.model.Todo;
import com.example.todo.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/todos")
@RestController
public class TodoController {
    private final TodoService todoService;

    // constructor injection
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getTodos() {
        return todoService.getTodos();
    }

    @PostMapping
    public void createTodo(@RequestBody TodoRequest request) {
        todoService.createTodo(request);
    }

    @PutMapping("/{id}")
    public void updateTodo(@PathVariable Long id, @RequestBody TodoRequest request) {
        todoService.updateTodo(id, request);
    }

    @PatchMapping("/{id}/completed")
    public void updateCompleted(@PathVariable Long id, @RequestBody TodoCompletionRequest request) {
        todoService.updateCompleted(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }
}
