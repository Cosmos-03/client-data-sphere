package com.example.client_data_sphere_backend.controller;

import com.example.client_data_sphere_backend.model.AuthRequest;
import com.example.client_data_sphere_backend.model.AuthResponse;
import com.example.client_data_sphere_backend.model.User;
import com.example.client_data_sphere_backend.service.AuthenticationService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;
    // In production, store the secret key securely (e.g., environment variable or secrets manager)
    private final String SECRET_KEY = "secretkey";

    @Autowired
    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        Optional<User> userOpt = authenticationService.authenticate(authRequest.getUsername(), authRequest.getPassword());
        if (userOpt.isPresent()) {
            // Generate JWT token valid for 1 day
            String token = Jwts.builder()
                    .setSubject(userOpt.get().getUsername())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                    .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())
                    .compact();
            return ResponseEntity.ok(new AuthResponse(token, "Login successful"));
        } else {
            return ResponseEntity.status(401).body(new AuthResponse(null, "Invalid credentials"));
        }
    }
}
