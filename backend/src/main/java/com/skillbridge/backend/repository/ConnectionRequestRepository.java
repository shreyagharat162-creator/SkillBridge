package com.skillbridge.backend.repository;

import com.skillbridge.backend.entity.ConnectionRequest;
import com.skillbridge.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConnectionRequestRepository
        extends JpaRepository<ConnectionRequest, Long> {

    List<ConnectionRequest> findByReceiver(User receiver);

    List<ConnectionRequest> findBySender(User sender);
}