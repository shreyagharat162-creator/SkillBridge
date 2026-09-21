package com.skillbridge.backend.controller;

import com.skillbridge.backend.entity.ConnectionRequest;
import com.skillbridge.backend.service.ConnectionRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class ConnectionRequestController {

    private final ConnectionRequestService requestService;

    public ConnectionRequestController(
            ConnectionRequestService requestService) {

        this.requestService = requestService;
    }

    @PostMapping
    public ResponseEntity<ConnectionRequest> sendRequest(
            @RequestParam Long senderId,
            @RequestParam Long receiverId) {

        return requestService.sendRequest(senderId, receiverId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping("/received/{userId}")
    public ResponseEntity<List<ConnectionRequest>> getReceivedRequests(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                requestService.getReceivedRequests(userId)
        );
    }

    @GetMapping("/sent/{userId}")
    public ResponseEntity<List<ConnectionRequest>> getSentRequests(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                requestService.getSentRequests(userId)
        );
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<ConnectionRequest> acceptRequest(
            @PathVariable Long id) {

        return requestService.acceptRequest(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<ConnectionRequest> rejectRequest(
            @PathVariable Long id) {

        return requestService.rejectRequest(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Contact information is available only after acceptance
    @GetMapping("/{id}/contact")
    public ResponseEntity<Map<String, String>> getContactInformation(
            @PathVariable Long id) {

        return requestService.getContactInformation(id)
                .map(user -> {

                    Map<String, String> contact =
                            new java.util.HashMap<>();

                    contact.put("email", user.getEmail());

                    if (user.getPhoneNumber() != null
                            && !user.getPhoneNumber().trim().isEmpty()) {

                        contact.put(
                                "phoneNumber",
                                user.getPhoneNumber()
                        );
                    }

                    return ResponseEntity.ok(contact);
                })
                .orElse(ResponseEntity.status(403).build());
    }
}