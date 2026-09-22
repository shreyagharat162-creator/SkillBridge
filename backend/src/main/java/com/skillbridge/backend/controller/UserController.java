package com.skillbridge.backend.controller;

import com.skillbridge.backend.dto.LoginRequest;
import com.skillbridge.backend.entity.User;
import com.skillbridge.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(
            @RequestBody LoginRequest loginRequest) {

        return userService.loginUser(loginRequest)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable Long id) {

        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Search users by skill
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(
            @RequestParam String skill) {

        return ResponseEntity.ok(
                userService.searchBySkill(skill)
        );
    }
}