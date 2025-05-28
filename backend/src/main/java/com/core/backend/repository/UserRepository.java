package com.core.backend.repository;
import com.core.backend.models.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    // Optional<User> findByEmail(String email);
    User findByEmailAndPassword(String email, String password);
}


