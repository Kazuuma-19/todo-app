package com.example.todo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/** created atとupdated atの自動生成に対応. */
@Configuration
@Profile("!test")
@EnableJpaAuditing
public class JpaConfig {}
