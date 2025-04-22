package com.example.todo.controller;

import com.example.todo.dto.TodoCompletionRequest;
import com.example.todo.dto.TodoRequest;
import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@RequestMapping("/todos")
@RestController
public class TodoController {
    private final TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping
    public List<Todo> getTodos() {
        return todoRepository.findAll();
    }

    @PostMapping
    public void createTodo(@RequestBody TodoRequest request) {
        Todo todo = new Todo();
        todo.setName(request.getName());
        if (request.getDate() != null) {
            todo.setDate(LocalDateTime.parse(request.getDate()));
        }
        todoRepository.save(todo);
    }

    @PutMapping("/{id}")
    public void updateTodo(@PathVariable Long id, @RequestBody TodoRequest request) {
        Todo existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));

        existingTodo.setName(request.getName());
        if (request.getDate() != null) {
            existingTodo.setDate(LocalDateTime.parse(request.getDate()));
        }

        todoRepository.save(existingTodo);
    }

    @PatchMapping("/{id}/completed")
    public void updateCompleted(@PathVariable Long id, @RequestBody TodoCompletionRequest request) {
        Todo existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));

        existingTodo.setCompleted(request.getCompleted());
        todoRepository.save(existingTodo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }
}
