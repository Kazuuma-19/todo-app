package com.example.todo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/** CORS対策. */
@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Value("${cors.allowed-origins}")
  private String allowedOrigins;

  /**
   * CORSマッピングを設定.
   *
   * @param registry CorsRegistryオブジェクト
   */
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry
        .addMapping("/**")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
        .allowedHeaders("*")
        .allowedOrigins(allowedOrigins);
  }
}
