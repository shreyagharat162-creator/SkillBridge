package com.skillbridge.backend.service;

import com.skillbridge.backend.entity.ConnectionRequest;
import com.skillbridge.backend.entity.Message;
import com.skillbridge.backend.entity.User;
import com.skillbridge.backend.repository.ConnectionRequestRepository;
import com.skillbridge.backend.repository.MessageRepository;
import com.skillbridge.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ConnectionRequestRepository connectionRequestRepository;

    public MessageService(
            MessageRepository messageRepository,
            UserRepository userRepository,
            ConnectionRequestRepository connectionRequestRepository) {

        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.connectionRequestRepository = connectionRequestRepository;
    }

    // Send a message only if both students are connected
    public Optional<Message> sendMessage(
            Long senderId,
            Long receiverId,
            String content) {

        Optional<User> sender =
                userRepository.findById(senderId);

        Optional<User> receiver =
                userRepository.findById(receiverId);

        if (sender.isEmpty() || receiver.isEmpty()) {
            return Optional.empty();
        }

        boolean connected =
                areUsersConnected(
                        sender.get(),
                        receiver.get()
                );

        if (!connected) {
            return Optional.empty();
        }

        if (content == null || content.trim().isEmpty()) {
            return Optional.empty();
        }

        Message message = new Message(
                sender.get(),
                receiver.get(),
                content.trim()
        );

        return Optional.of(
                messageRepository.save(message)
        );
    }

    // Get all messages exchanged between two connected students
    public Optional<List<Message>> getConversation(
            Long userId1,
            Long userId2) {

        Optional<User> user1 =
                userRepository.findById(userId1);

        Optional<User> user2 =
                userRepository.findById(userId2);

        if (user1.isEmpty() || user2.isEmpty()) {
            return Optional.empty();
        }

        boolean connected =
                areUsersConnected(
                        user1.get(),
                        user2.get()
                );

        if (!connected) {
            return Optional.empty();
        }

        List<Message> messages =
                messageRepository
                        .findBySenderAndReceiverOrSenderAndReceiverOrderByTimestampAsc(
                                user1.get(),
                                user2.get(),
                                user2.get(),
                                user1.get()
                        );

        return Optional.of(messages);
    }

    // Check whether two students have an accepted connection
    private boolean areUsersConnected(
            User user1,
            User user2) {

        List<ConnectionRequest> user1Sent =
                connectionRequestRepository
                        .findBySender(user1);

        for (ConnectionRequest request : user1Sent) {

            if (request.getReceiver().getId().equals(user2.getId())
                    && "ACCEPTED".equals(request.getStatus())) {

                return true;
            }
        }

        List<ConnectionRequest> user2Sent =
                connectionRequestRepository
                        .findBySender(user2);

        for (ConnectionRequest request : user2Sent) {

            if (request.getReceiver().getId().equals(user1.getId())
                    && "ACCEPTED".equals(request.getStatus())) {

                return true;
            }
        }

        return false;
    }

    // Delete a message only if the logged-in user is the sender
    public boolean deleteMessage(
            Long messageId,
            Long userId) {

        Optional<Message> messageOptional =
                messageRepository.findById(messageId);

        if (messageOptional.isEmpty()) {
            return false;
        }

        Message message = messageOptional.get();

        if (message.getSender() == null
                || !message.getSender().getId().equals(userId)) {

            return false;
        }

        messageRepository.delete(message);

        return true;
    }
}