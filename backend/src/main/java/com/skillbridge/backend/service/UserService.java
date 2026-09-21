package com.skillbridge.backend.service;

import com.skillbridge.backend.dto.LoginRequest;
import com.skillbridge.backend.entity.User;
import com.skillbridge.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register a new user
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // Find user by email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Find user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Login user
    public Optional<User> loginUser(LoginRequest loginRequest) {

        Optional<User> user =
                userRepository.findByEmail(loginRequest.getEmail());

        if (user.isPresent()
                && user.get().getPassword().equals(loginRequest.getPassword())) {

            return user;
        }

        return Optional.empty();
    }

    // Search users by the skill they can teach
    public List<User> searchBySkill(String skill) {
        return userRepository.findBySkillsToTeachContainingIgnoreCase(skill);
    }
}