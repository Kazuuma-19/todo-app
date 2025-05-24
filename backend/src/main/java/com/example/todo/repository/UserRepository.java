package com.example.todo.repository;

import com.example.todo.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/** ユーザーリポジトリ. */
public interface UserRepository extends JpaRepository<User, Long> {
  /**
   * メールアドレスが存在するかどうかを確認する.
   *
   * @param email メールアドレス
   * @return 存在するかどうか
   */
  boolean existsByEmail(String email);

  /**
   * メールアドレスからユーザーを取得する. o
   *
   * @param email メールアドレス
   * @return ユーザー
   */
  Optional<User> findByEmail(String email);
}
