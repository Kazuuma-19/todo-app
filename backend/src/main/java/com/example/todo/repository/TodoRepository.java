package com.example.todo.repository;

import com.example.todo.model.Todo;
import com.example.todo.model.User;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/** タスクリポジトリ. */
public interface TodoRepository extends JpaRepository<Todo, Long> {
  /**
   * 今日のタスクを取得する.
   *
   * @param user ユーザー
   * @param start 開始日
   * @param end 終了日
   * @return タスクリスト
   */
  @Query(
      """
        SELECT t
        FROM Todo t
        WHERE t.user = :user
          AND :start <= t.date
          AND t.date < :end
        ORDER BY t.completed ASC, t.id ASC
      """)
  List<Todo> findAllByDateToday(
      @Param("user") User user,
      @Param("start") LocalDateTime start,
      @Param("end") LocalDateTime end);

  /**
   * ユーザーのタスクを完了してないものから並べて取得する.
   *
   * @param user ユーザー
   * @return タスクリスト
   */
  List<Todo> findByUserOrderByCompletedAscDateAsc(User user);

  /**
   * keywordから曖昧検索を行い、一致する今日のタスクを取得する.
   *
   * @param user ユーザー
   * @param keyword キーワード
   * @param start 開始日
   * @param end 終了日
   * @return タスクリスト
   */
  @Query(
      """
        SELECT t
        FROM Todo t
        WHERE t.user = :user
          AND LOWER(t.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
          AND :start <= t.date
          AND t.date < :end
        ORDER BY t.completed ASC, t.id ASC
      """)
  List<Todo> findByUserAndNameContainingIgnoreCaseAndDateToday(
      @Param("user") User user,
      @Param("keyword") String keyword,
      @Param("start") LocalDateTime start,
      @Param("end") LocalDateTime end);
}
