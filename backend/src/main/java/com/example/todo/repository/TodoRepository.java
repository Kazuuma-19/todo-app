package com.example.todo.repository;

import com.example.todo.model.Todo;
import com.example.todo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    @Query("SELECT t FROM Todo t WHERE t.user = :user AND :start <= t.date AND t.date < :end ORDER BY t.completed ASC, t.id ASC")
    List<Todo> findAllByDateToday(@Param("user") User user, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    List<Todo> findByUserOrderByCompletedAscDateAsc(User user);
}
