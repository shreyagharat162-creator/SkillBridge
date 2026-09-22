package com.skillbridge.backend.controller;

import com.skillbridge.backend.entity.Message;
import com.skillbridge.backend.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    // Send a message
    @PostMapping
    public ResponseEntity<Message> sendMessage(
            @RequestParam Long senderId,
            @RequestParam Long receiverId,
            @RequestBody Map<String, String> request) {

        String content = request.get("content");

        return messageService
                .sendMessage(senderId, receiverId, content)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }


    // Get conversation between two connected students
    @GetMapping("/conversation")
    public ResponseEntity<List<Message>> getConversation(
            @RequestParam Long userId,
            @RequestParam Long otherUserId) {

        return messageService
                .getConversation(userId, otherUserId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(403).build());
    }
    // Delete a message
@DeleteMapping("/{messageId}")
public ResponseEntity<String> deleteMessage(
        @PathVariable Long messageId,
        @RequestParam Long userId) {

    boolean deleted =
            messageService.deleteMessage(messageId, userId);

    if (deleted) {
        return ResponseEntity.ok("Message deleted successfully.");
    }

    return ResponseEntity.status(403)
            .body("You can delete only your own messages.");
}
}