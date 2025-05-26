package com.example.todo.filter;

import com.example.todo.repository.UserRepository;
import com.example.todo.service.CustomUserDetailsService;
import com.example.todo.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/** JWT認証フィルター. */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  private final JwtService jwtService;
  private final UserRepository userRepository;
  private final CustomUserDetailsService userDetailsService;

  /**
   * JWT認証フィルター.
   *
   * @param request HttpServletRequest
   * @param response HttpServletResponse
   * @param filterChain FilterChain
   * @throws ServletException ServletException
   * @throws IOException IOException
   */
  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain)
      throws ServletException, IOException {

    // login, registerの場合は認証フィルターを通さないようにする
    String path = request.getServletPath();
    if (path.equals("/login") || path.equals("/register")) {
      filterChain.doFilter(request, response);
      return;
    }

    final String authHeader = request.getHeader("Authorization");
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }

    String token = authHeader.substring(7);
    String email;
    try {
      email = jwtService.extractEmail(token);
    } catch (Exception e) {
      filterChain.doFilter(request, response);
      return;
    }

    // Check if the user is already authenticated
    if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      UserDetails userDetails = userDetailsService.loadUserByUsername(email);
      if (jwtService.isTokenValid(token, userDetails)) {
        // If the token is valid, set the authentication in the security context
        UsernamePasswordAuthenticationToken authToken =
            new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);
      }
    }

    filterChain.doFilter(request, response);
  }
}
