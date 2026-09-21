package com.skillbridge.backend.service;

import com.skillbridge.backend.entity.Post;
import com.skillbridge.backend.entity.User;
import com.skillbridge.backend.repository.PostRepository;
import com.skillbridge.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(
            PostRepository postRepository,
            UserRepository userRepository) {

        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public Optional<Post> createPost(
            String title,
            String skill,
            String description,
            Long userId) {

        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isEmpty()) {
            return Optional.empty();
        }

        User user = userOptional.get();

        // Create the skill post
        Post post = new Post(
                title,
                skill,
                description,
                user
        );

        Post savedPost = postRepository.save(post);

        // Add the uploaded skill to the user's teaching skills
        String currentSkills = user.getSkillsToTeach();

        if (currentSkills == null || currentSkills.trim().isEmpty()) {

            user.setSkillsToTeach(skill);

        } else {

            boolean alreadyExists = Arrays.stream(
                    currentSkills.split(",")
            )
            .map(String::trim)
            .anyMatch(
                    existingSkill ->
                            existingSkill.equalsIgnoreCase(skill.trim())
            );

            if (!alreadyExists) {
                user.setSkillsToTeach(
                        currentSkills + ", " + skill
                );
            }
        }

        userRepository.save(user);

        return Optional.of(savedPost);
    }

    public List<Post> getPostsByUser(Long userId) {

        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return List.of();
        }

        return postRepository.findByUser(user.get());
    }

    public List<Post> searchPostsBySkill(String skill) {
        return postRepository.findBySkillContainingIgnoreCase(skill);
    }
}