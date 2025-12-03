package com.pcp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pcp.entities.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    User findByEmail(String email);

    Optional<User> findByEmailAndPassword(String email, String password);
}
