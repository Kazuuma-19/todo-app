package com.example.todo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class WebSecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // POSTテスト時にCSRFで弾かれないように
                .authorizeHttpRequests()
                .requestMatchers("/register", "/users", "/todos/**").permitAll() // 認証不要で通したいパスを列挙
                .anyRequest().authenticated()
                .and()
                .formLogin().disable(); // デフォルトのログイン画面も無効化
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
