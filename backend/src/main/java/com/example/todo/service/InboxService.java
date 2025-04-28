package com.example.todo.service;

import com.example.todo.dto.TodoCompletionRequest;
import com.example.todo.dto.TodoRequest;
import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class InboxService {
    private final TodoRepository todoRepository;

    public List<Todo> getTodos() {
        return todoRepository.findAllByOrderByCompletedAscDateAsc();
    }

    public void createTodo(TodoRequest request) {
        Todo todo = new Todo();
        todo.setName(request.getName());
        todo.setCompleted(false);
        if (request.getDate() != null) {
            todo.setDate(LocalDateTime.parse(request.getDate()));
        }
        todoRepository.save(todo);
    }

    public void updateTodo(Long id, TodoRequest request) {
        Todo existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));

        existingTodo.setName(request.getName());
        if (request.getDate() != null) {
            existingTodo.setDate(LocalDateTime.parse(request.getDate()));
        }

        todoRepository.save(existingTodo);
    }

    public void updateCompleted(Long id, TodoCompletionRequest request) {
        Todo existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));

        existingTodo.setCompleted(request.getCompleted());
        todoRepository.save(existingTodo);
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
