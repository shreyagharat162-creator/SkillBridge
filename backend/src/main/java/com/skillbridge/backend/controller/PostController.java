package com.skillbridge.backend.controller;

import com.skillbridge.backend.entity.Post;
import com.skillbridge.backend.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<Post> createPost(
            @RequestParam Long userId,
            @RequestBody Post post) {

        return postService.createPost(
                post.getTitle(),
                post.getSkill(),
                post.getDescription(),
                userId
        )
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Post>> getPostsByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                postService.getPostsByUser(userId)
        );
    }

    @GetMapping("/search")
    public ResponseEntity<List<Post>> searchPosts(
            @RequestParam String skill) {

        return ResponseEntity.ok(
                postService.searchPostsBySkill(skill)
        );
    }
}