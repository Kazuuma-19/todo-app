package com.example.todo.controller;

import com.example.todo.dto.TodoCompletionRequest;
import com.example.todo.dto.TodoRequest;
import com.example.todo.model.Todo;
import com.example.todo.service.InboxService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/inbox")
@RestController
public class InboxController {
    private final InboxService inboxService;

    @GetMapping
    public List<Todo> getTodos() {
        return inboxService.getTodos();
    }

    @PostMapping
    public void createTodo(@RequestBody TodoRequest request) {
        inboxService.createTodo(request);
    }

    @PutMapping("/{id}")
    public void updateTodo(@PathVariable Long id, @RequestBody TodoRequest request) {
        inboxService.updateTodo(id, request);
    }

    @PatchMapping("/{id}/completed")
    public void updateCompleted(@PathVariable Long id, @RequestBody TodoCompletionRequest request) {
        inboxService.updateCompleted(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        inboxService.deleteTodo(id);
    }
}
