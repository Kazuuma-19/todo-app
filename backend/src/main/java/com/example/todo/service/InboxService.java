package com.example.todo.service;

import com.example.todo.dto.TodoCompletionRequest;
import com.example.todo.dto.TodoRequest;
import com.example.todo.model.Todo;
import com.example.todo.model.User;
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

    private Todo findAndCheckOwner(Long id, User user) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));

        if (!todo.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not your todo");
        }

        return todo;
    }

    public List<Todo> getTodos(User user) {
        return todoRepository.findByUserOrderByCompletedAscDateAsc(user);
    }

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

    public void updateTodo(Long id, TodoRequest request, User user) {
        Todo existingTodo = findAndCheckOwner(id, user);

        existingTodo.setName(request.getName());
        if (request.getDate() != null) {
            existingTodo.setDate(LocalDateTime.parse(request.getDate()));
        }

        todoRepository.save(existingTodo);
    }

    public void updateCompleted(Long id, TodoCompletionRequest request, User user) {
        Todo existingTodo = findAndCheckOwner(id, user);
        existingTodo.setCompleted(request.getCompleted());
        todoRepository.save(existingTodo);
    }

    public void deleteTodo(Long id, User user) {
        Todo existingTodo = findAndCheckOwner(id, user);
        todoRepository.delete(existingTodo);
    }
}
