package com.skillbridge.backend.repository;

import com.skillbridge.backend.entity.Post;
import com.skillbridge.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUser(User user);

    List<Post> findBySkillContainingIgnoreCase(String skill);
}