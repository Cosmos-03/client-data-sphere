package com.example.client_data_sphere_backend.service;


import com.example.client_data_sphere_backend.model.User;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {
    // Hard-coded users (simulate fixed users)
    private final List<User> users = Arrays.asList(
            new User("user1", "password1"),
            new User("user2", "password2"),
            new User("user3", "password3")
    );

    public Optional<User> authenticate(String username, String password) {
        return users.stream()
                .filter(u -> u.getUsername().equals(username) && u.getPassword().equals(password))
                .findFirst();
    }
}