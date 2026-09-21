package com.skillbridge.backend.service;

import com.skillbridge.backend.entity.ConnectionRequest;
import com.skillbridge.backend.entity.User;
import com.skillbridge.backend.repository.ConnectionRequestRepository;
import com.skillbridge.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConnectionRequestService {

    private final ConnectionRequestRepository requestRepository;
    private final UserRepository userRepository;

    public ConnectionRequestService(
            ConnectionRequestRepository requestRepository,
            UserRepository userRepository) {

        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
    }

    public Optional<ConnectionRequest> sendRequest(
            Long senderId,
            Long receiverId) {

        Optional<User> sender = userRepository.findById(senderId);
        Optional<User> receiver = userRepository.findById(receiverId);

        if (sender.isEmpty() || receiver.isEmpty()) {
            return Optional.empty();
        }

        ConnectionRequest request = new ConnectionRequest(
                sender.get(),
                receiver.get(),
                "PENDING"
        );

        return Optional.of(requestRepository.save(request));
    }

    public List<ConnectionRequest> getReceivedRequests(Long userId) {

        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return List.of();
        }

        return requestRepository.findByReceiver(user.get());
    }

    public List<ConnectionRequest> getSentRequests(Long userId) {

        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return List.of();
        }

        return requestRepository.findBySender(user.get());
    }

    public Optional<ConnectionRequest> acceptRequest(Long requestId) {

        Optional<ConnectionRequest> request =
                requestRepository.findById(requestId);

        if (request.isPresent()) {
            request.get().setStatus("ACCEPTED");
            requestRepository.save(request.get());
        }

        return request;
    }

    public Optional<ConnectionRequest> rejectRequest(Long requestId) {

        Optional<ConnectionRequest> request =
                requestRepository.findById(requestId);

        if (request.isPresent()) {
            request.get().setStatus("REJECTED");
            requestRepository.save(request.get());
        }

        return request;
    }

    // Return contact information only after the request is accepted
    public Optional<User> getContactInformation(Long requestId) {

        Optional<ConnectionRequest> request =
                requestRepository.findById(requestId);

        if (request.isEmpty()) {
            return Optional.empty();
        }

        ConnectionRequest connectionRequest = request.get();

        // Contact information is available only after acceptance
        if (!"ACCEPTED".equals(connectionRequest.getStatus())) {
            return Optional.empty();
        }

        // The sender is the student who originally sent the request
        User sender = connectionRequest.getSender();

        if (sender == null) {
            return Optional.empty();
        }

        return Optional.of(sender);
    }
}